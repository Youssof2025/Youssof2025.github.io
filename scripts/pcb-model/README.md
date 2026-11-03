# PCB model pipeline

Turns an Altium board into the spinning 3D models used on the site (`public/models/*.glb`).

The model is built from two exports:
- **STEP**: the board shape and every component body.
- **Gerbers**: copper, soldermask, silkscreen and drills. These are rendered into top and bottom images of the board and laid onto its faces.

Altium's STEP export doesn't include copper, so the Gerber images are what make traces, pads and silkscreen show up. They also keep the file small: the ADC board is 1.26 MB.

## Adding a board

1. **Export from Altium** into `cad/<board>/`. The `cad/` folder is git-ignored, so it never gets committed or deployed.
   - File → Export → **STEP 3D**
   - Your usual **Gerber + NC Drill** outputs (the fab set). Unzip them into a folder.
2. **Build the model:**
   ```sh
   npm run model:pcb -- --step "cad/ADC/ADC PCB.step" --gerbers "cad/ADC/Gerbers" --out public/models/adc-analog-board.glb
   ```
   Options:
   | Flag | Default | |
   |---|---|---|
   | `--mask` | `green` | Soldermask color: `green`, `black`, `blue`, `red`, `white`, `purple` |
   | `--texture-size` | `2048` | Pixel width of the board images. Larger is sharper but heavier |
   | `--keep-images` | off | Also saves the full-size top/bottom PNG renders next to the `.glb`, for checking |
3. **Use it on the site.** Add a section to the project in `src/data/projects.ts`:
   ```ts
   { type: "model", modelPath: "/models/adc-analog-board.glb", imagePath: "/images/projects/.../preview.webp", text: "Drag to rotate the board" }
   ```
   Or use it directly: `<PCBModel src="/models/adc-analog-board.glb" autoRotate />`.

The script prints each step. It warns if the Gerber outline and the STEP board sizes differ by more than 0.5 mm, which means the images won't line up.

## What the script expects

- **Gerber names:** Altium's default extensions are detected automatically.
  - `.GTL`/`.GBL`: copper
  - `.GTS`/`.GBS`: soldermask
  - `.GTO`/`.GBO`: silkscreen
  - Board outline: the keep-out (`.GKO`) or mechanical (`.GM`, `.GM1`, `.GM13`…) layer whose size matches the STEP board. Other mechanical layers (courtyards, 3D bodies) are skipped. If none match, the script stops and lists what it found.
  - Drill files: any `.TXT`, `.DRL` or `.XLN` file that starts with `M48` (Excellon format)
  - Paste layers and inner copper are ignored, because they're hidden under the soldermask.
- **The board itself:** the script picks the STEP part with the largest footprint that is between 0.3 and 3.5 mm thick.

## Other models

To compress a `.glb` that didn't come from this pipeline (e.g. exported from Blender):
```sh
npm run model:compress -- input.glb public/models/name.glb
```

## Checking a render

To screenshot a page in headless Edge or Chrome, with real-time waiting so 3D textures finish loading:
```sh
npm run dev
npm run model:screenshot -- http://localhost:5173/ shot.png 15000 1280 900
```
The arguments are `url`, `out.png`, then optional `waitMs`, `width` and `height`. Console errors from the page are printed.
