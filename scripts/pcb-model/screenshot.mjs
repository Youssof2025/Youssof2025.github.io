// Takes a real-time screenshot of a page (e.g. one showing a 3D model) using headless Edge or Chrome.
//
//   npm run model:screenshot -- http://localhost:5173/ shot.png [waitMs=15000] [width=1400] [height=900]
//
// Real time matters: --virtual-time-budget screenshots don't wait for WebP textures to decode.
// Console errors and uncaught exceptions from the page are printed.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [url, out, waitMs = "15000", width = "1400", height = "900"] = process.argv.slice(2);
if (!url || !out) {
  console.error("Usage: npm run model:screenshot -- <url> <out.png> [waitMs] [width] [height]");
  process.exit(1);
}

const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];
const browser = BROWSERS.find((b) => fs.existsSync(b));
if (!browser) throw new Error("No Edge or Chrome install found");

const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "pcb-shot-"));
const proc = spawn(browser, [
  "--headless=new", "--disable-gpu-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
  "--hide-scrollbars", `--window-size=${width},${height}`, `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50 && !targets; i++) {
  await sleep(200);
  targets = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).catch(() => null);
}
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  if (msg.method === "Runtime.exceptionThrown") console.log("EXCEPTION", msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    console.log("ERROR", msg.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 300));
  }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(Number(waitMs));
const { data } = await send("Page.captureScreenshot", { format: "png" });
fs.writeFileSync(out, Buffer.from(data, "base64"));

ws.close();
await new Promise((r) => { proc.once("exit", r); proc.kill(); });
// Edge's helper processes can hold the profile a moment longer on Windows; cleanup is best-effort
try {
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
} catch {
  console.warn("Couldn't remove temp profile", profile);
}
console.log("Saved", out);
