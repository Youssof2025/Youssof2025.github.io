// Builds a web-ready 3D board (.glb) from an Altium STEP export + Gerber set.
//
//   npm run model:pcb -- --step "cad/ADC PCB.step" --gerbers "cad/Gerbers" --out public/models/adc-analog-board.glb
//
// Steps: tessellate the STEP (OpenCascade wasm) -> merge parts by color -> render the
// Gerbers into top/bottom board images (pcb-stackup) -> lay those images on the board's
// faces -> compress with meshopt (gltf-transform). See README.md for details.
import occtimportjs from "occt-import-js";
import pcbStackup from "pcb-stackup";
import gerberToSvg from "gerber-to-svg";
import sharp from "sharp";
import { Document, NodeIO } from "@gltf-transform/core";
import { EXTTextureWebP } from "@gltf-transform/extensions";
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { values: args } = parseArgs({
  options: {
    step: { type: "string" },
    gerbers: { type: "string" },
    out: { type: "string" },
    mask: { type: "string", default: "green" },
    "texture-size": { type: "string", default: "2048" },
    "keep-images": { type: "boolean", default: false },
  },
});
if (!args.step || !args.gerbers || !args.out) {
  console.error('Usage: npm run model:pcb -- --step <board.step> --gerbers <gerber folder> --out <public/models/name.glb> [--mask green|black|blue|red|white|purple] [--texture-size 2048] [--keep-images]');
  process.exit(1);
}

// Soldermask presets: sm = mask over copper, fr4 = bare board under it, edge = board side color (0-1 RGB)
const MASKS = {
  green: { sm: "rgba(0,70,20,0.82)", fr4: "#3d4a22", edge: [0.0, 0.24, 0.08] },
  black: { sm: "rgba(10,10,10,0.88)", fr4: "#4a3d22", edge: [0.04, 0.04, 0.04] },
  blue: { sm: "rgba(0,30,110,0.82)", fr4: "#3d4a22", edge: [0.0, 0.1, 0.4] },
  red: { sm: "rgba(130,10,10,0.82)", fr4: "#3d4a22", edge: [0.45, 0.04, 0.04] },
  white: { sm: "rgba(235,235,235,0.9)", fr4: "#3d4a22", edge: [0.9, 0.9, 0.9] },
  purple: { sm: "rgba(60,0,90,0.82)", fr4: "#3d4a22", edge: [0.22, 0.0, 0.32] },
};
const mask = MASKS[args.mask];
if (!mask) throw new Error(`Unknown --mask "${args.mask}". Options: ${Object.keys(MASKS).join(", ")}`);

const DEFAULT_COLOR = [0.62, 0.62, 0.62]; // parts the STEP gives no color
const LIFT = 0.03;                         // mm the board images float above/below the board faces (avoids flicker)
const textureSize = Number(args["texture-size"]);

// ---------------------------------------------------------------- 1. STEP -> triangles
console.log("1/5 Reading STEP…");
const occt = await occtimportjs();
const step = occt.ReadStepFile(new Uint8Array(fs.readFileSync(args.step)), {
  linearUnit: "millimeter",
  linearDeflectionType: "bounding_box_ratio",
  linearDeflection: 0.0005,
  angularDeflection: 0.5,
});
if (!step.success) throw new Error("Could not read the STEP file");

const parts = step.meshes.map((m) => {
  const p = m.attributes.position.array;
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (let k = 0; k < p.length; k++) { mn[k % 3] = Math.min(mn[k % 3], p[k]); mx[k % 3] = Math.max(mx[k % 3], p[k]); }
  return { mesh: m, mn, mx };
});

// ---------------------------------------------------------------- 2. find the bare board
// The board is the part with the biggest footprint that is still PCB-thin (Altium exports Z-up, mm)
const board = parts
  .filter(({ mn, mx }) => mx[2] - mn[2] > 0.3 && mx[2] - mn[2] < 3.5)
  .sort((a, b) => (b.mx[0] - b.mn[0]) * (b.mx[1] - b.mn[1]) - (a.mx[0] - a.mn[0]) * (a.mx[1] - a.mn[1]))[0];
if (!board) throw new Error("Couldn't find a PCB-shaped part in the STEP file");
const size = board.mx.map((v, i) => +(v - board.mn[i]).toFixed(2));
console.log(`2/5 Board found: ${size[0]} x ${size[1]} x ${size[2]} mm (${parts.length} parts total)`);

// ---------------------------------------------------------------- 3. Gerbers -> images
console.log("3/5 Rendering Gerbers…");
const LAYERS = {
  gtl: ["top", "copper"], gbl: ["bottom", "copper"],
  gts: ["top", "soldermask"], gbs: ["bottom", "soldermask"],
  gto: ["top", "silkscreen"], gbo: ["bottom", "silkscreen"],
};
const files = fs.readdirSync(args.gerbers).map((f) => path.join(args.gerbers, f));
const ext = (f) => path.extname(f).slice(1).toLowerCase();

// Width x height of a Gerber's drawn extents, in mm
const gerberSize = (file) => new Promise((resolve) => {
  const conv = gerberToSvg(fs.createReadStream(file), {}, (err) => {
    if (err) return resolve(null);
    const k = conv.units === "in" ? 25.4 : 1;
    resolve([conv.viewBox[2], conv.viewBox[3]].map((v) => (v / 1000) * k));
  });
});

const layers = files.filter((f) => LAYERS[ext(f)]).map((f) => ({ filename: path.basename(f), side: LAYERS[ext(f)][0], type: LAYERS[ext(f)][1] }));
// Altium puts the board outline on keep-out or any mechanical layer, and other mechanical layers hold
// courtyards, 3D bodies, etc. Use the one whose extents match the STEP board.
const OUTLINE_TOLERANCE = 0.5; // mm
const candidates = [];
for (const f of files.filter((f) => /^(gko|gm\d*)$/.test(ext(f)))) {
  const s = await gerberSize(f);
  if (s) candidates.push({ file: f, size: s, off: Math.max(Math.abs(s[0] - size[0]), Math.abs(s[1] - size[1])) });
}
const outline = candidates.sort((a, b) => a.off - b.off)[0];
if (!outline || outline.off > OUTLINE_TOLERANCE) {
  const found = candidates.map((c) => `${path.basename(c.file)} ${c.size.map((v) => v.toFixed(2)).join(" x ")} mm`).join(", ") || "none";
  throw new Error(`No Gerber layer matches the ${size[0]} x ${size[1]} mm STEP board (checked keep-out and mechanical layers: ${found}). `
    + "Export the layer holding the board outline, and check the STEP and Gerbers come from the same board.");
}
layers.push({ filename: path.basename(outline.file), side: "all", type: "outline" });
// Excellon drill files start with "M48"; Altium names them *.TXT / *.DRL
for (const f of files.filter((f) => ["txt", "drl", "xln"].includes(ext(f)))) {
  if (fs.readFileSync(f, "utf8").trimStart().startsWith("M48")) layers.push({ filename: path.basename(f), side: "all", type: "drill" });
}
console.log(`    layers: ${layers.map((l) => `${l.filename} (${l.side} ${l.type})`).join(", ")}`);

const stackup = await pcbStackup(
  layers.map((l) => ({ ...l, gerber: fs.createReadStream(path.join(args.gerbers, l.filename)) })),
  { useOutline: true, color: { fr4: mask.fr4, cu: "#c9a13b", cf: "#d4af37", sm: mask.sm, ss: "#f2f2f2", sp: "#999999", out: "#000000" } },
);

const images = {};
for (const side of ["top", "bottom"]) {
  const png = await sharp(Buffer.from(stackup[side].svg), { density: 600, limitInputPixels: false })
    .resize(4096, 4096, { fit: "inside" }).png().toBuffer();
  images[side] = await sharp(png).resize(textureSize, textureSize, { fit: "inside" })
    .webp({ quality: 85, alphaQuality: 90 }).toBuffer();
  if (args["keep-images"]) fs.writeFileSync(args.out.replace(/\.glb$/i, `-${side}.png`), png);
}
const gerberMm = [stackup.top.width, stackup.top.height].map((v) => (stackup.top.units === "in" ? v * 25.4 : v));
const mismatch = Math.max(Math.abs(gerberMm[0] - size[0]), Math.abs(gerberMm[1] - size[1]));
if (mismatch > 0.5) {
  console.warn(`    ⚠ Gerber outline is ${gerberMm.map((v) => v.toFixed(2)).join(" x ")} mm but the STEP board is ${size[0]} x ${size[1]} mm; the images may not line up`);
}

// ---------------------------------------------------------------- 4. assemble the GLB
console.log("4/5 Assembling model…");
const toGl = (x, y, z) => [x, z, -y]; // STEP is Z-up, glTF is Y-up
const doc = new Document();
const buffer = doc.createBuffer();
const root = doc.createNode("Board").setScale([0.001, 0.001, 0.001]); // mm -> m
doc.createScene("Scene").addChild(root);

// Merge every triangle into one mesh per color (hundreds of parts -> a couple dozen draw calls)
const buckets = new Map();
const bucket = (color) => {
  const key = color.map((c) => c.toFixed(3)).join(",");
  if (!buckets.has(key)) buckets.set(key, { color, pos: [], nrm: [] });
  return buckets.get(key);
};
for (const part of parts) {
  const { mesh: m } = part;
  const p = m.attributes.position.array, n = m.attributes.normal?.array, idx = m.index.array;
  const triColor = new Array(idx.length / 3).fill(m.color ?? DEFAULT_COLOR);
  for (const f of m.brep_faces ?? []) if (f.color) for (let t = f.first; t <= f.last; t++) triColor[t] = f.color;
  for (let t = 0; t < idx.length / 3; t++) {
    const b = bucket(part === board ? mask.edge : triColor[t]);
    for (let c = 0; c < 3; c++) {
      const v = idx[t * 3 + c];
      b.pos.push(...toGl(p[v * 3], p[v * 3 + 1], p[v * 3 + 2]));
      if (n) b.nrm.push(...toGl(n[v * 3], n[v * 3 + 1], n[v * 3 + 2]));
    }
  }
}
const accessor = (type, array) => doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);
for (const [key, b] of buckets) {
  const prim = doc.createPrimitive()
    .setAttribute("POSITION", accessor("VEC3", new Float32Array(b.pos)))
    .setMaterial(doc.createMaterial(key).setBaseColorFactor([...b.color, 1]).setMetallicFactor(0.1).setRoughnessFactor(0.6));
  if (b.nrm.length === b.pos.length) prim.setAttribute("NORMAL", accessor("VEC3", new Float32Array(b.nrm)));
  root.addChild(doc.createNode(key).setMesh(doc.createMesh(key).addPrimitive(prim)));
}

// Board images as two flat planes; image top-left = board (min X, max Y)
doc.createExtension(EXTTextureWebP).setRequired(true);
const { mn, mx } = board;
function facePlane(name, image, z, fromBelow) {
  const texture = doc.createTexture(name).setImage(image).setMimeType("image/webp");
  const material = doc.createMaterial(name).setBaseColorTexture(texture)
    .setAlphaMode("MASK").setAlphaCutoff(0.5).setMetallicFactor(0.15).setRoughnessFactor(0.55);
  const pos = [], uv = [], nrm = [];
  for (const [x, y] of [[mn[0], mn[1]], [mx[0], mn[1]], [mx[0], mx[1]], [mn[0], mx[1]]]) {
    pos.push(...toGl(x, y, z));
    // pcb-stackup draws the bottom as seen from below, i.e. mirrored left-right
    const u = fromBelow ? (mx[0] - x) / (mx[0] - mn[0]) : (x - mn[0]) / (mx[0] - mn[0]);
    uv.push(u, (mx[1] - y) / (mx[1] - mn[1]));
    nrm.push(0, fromBelow ? -1 : 1, 0);
  }
  const prim = doc.createPrimitive()
    .setAttribute("POSITION", accessor("VEC3", new Float32Array(pos)))
    .setAttribute("TEXCOORD_0", accessor("VEC2", new Float32Array(uv)))
    .setAttribute("NORMAL", accessor("VEC3", new Float32Array(nrm)))
    .setIndices(accessor("SCALAR", new Uint16Array(fromBelow ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3])))
    .setMaterial(material);
  root.addChild(doc.createNode(name).setMesh(doc.createMesh(name).addPrimitive(prim)));
}
facePlane("board-top", images.top, mx[2] + LIFT, false);
facePlane("board-bottom", images.bottom, mn[2] - LIFT, true);

// ---------------------------------------------------------------- 5. compress
console.log("5/5 Compressing…");
const raw = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "pcb-model-")), "raw.glb");
await new NodeIO().registerExtensions([EXTTextureWebP]).write(raw, doc);
// The CLI package doesn't export its bin file, so locate it next to this repo's node_modules
const cli = path.resolve(import.meta.dirname, "../../node_modules/@gltf-transform/cli/bin/cli.js");
fs.mkdirSync(path.dirname(args.out), { recursive: true });
const run = spawnSync(process.execPath, [cli, "optimize", raw, args.out, "--compress", "meshopt", "--texture-compress", "false"], { stdio: "inherit" });
fs.rmSync(path.dirname(raw), { recursive: true, force: true });
if (run.status !== 0) process.exit(run.status ?? 1);

console.log(`Done: ${args.out} (${(fs.statSync(args.out).size / 1e6).toFixed(2)} MB)`);
