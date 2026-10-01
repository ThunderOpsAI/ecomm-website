# HANDOFF2 — ComfyUI Mousepad Product Image Pack

## TASK

You are given a **single mousepad design image** in your working folder.
Your job is to use ComfyUI (local) to generate a full **8-image product listing pack** from that design.

Do this for **every design you receive** — the workflow is always the same.

---

## INPUT

- Find the design file automatically: look for any `.png`, `.jpg`, or `.webp` in the current folder that is NOT a previously generated output.
- Treat that file as `INPUT_DESIGN`.

---

## OUTPUT — 8 Images to Generate

For each image, use ComfyUI's **img2img** or **inpaint/composite** workflow with the INPUT_DESIGN as the reference texture. Use a **high-quality photorealistic checkpoint** (e.g. RealVisXL, Juggernaut XL, or similar).

---

### Image 1 — The Cutout (Base Asset)
**Filename:** `01_cutout.png`

**Prompt:**
> Product photo of a gaming mousepad, flat lay, perfectly rectangular, the mousepad artwork fills the entire surface, photographed from directly above (top-down 90°), pure white background, no shadows, no props, crisp clean edges, studio lighting, ultra sharp, 4K, commercial product photography

**ControlNet:** Use the INPUT_DESIGN as the reference image (tile or reference mode). Maintain all artwork colours exactly.

**Post-process:** Remove background to pure white or transparent. Output at 2000×2000px.

---

### Image 2 — The Lifestyle Desk Shot
**Filename:** `02_lifestyle_desk.png`

**Prompt:**
> Gaming mousepad on a clean modern desk, the mousepad surface shows [DESIGN ARTWORK], RGB mechanical keyboard placed on top-left of mousepad, gaming mouse on the right side, soft bokeh background showing a dark gaming room with subtle RGB lighting glow, professional lifestyle photography, shallow depth of field, warm studio lighting, 16:9 crop, 4K commercial quality

**ControlNet:** Reference INPUT_DESIGN for the mousepad surface texture.

---

### Image 3 — Floating Studio Packshot (Hero Angle)
**Filename:** `03_hero_packshot.png`

**Prompt:**
> Floating mousepad product shot, isometric 45-degree angle, the mousepad is elevated and floating in the air, pure gradient background (dark charcoal to black), the top surface shows the full artwork, bottom surface shows the anti-slip rubber base, dramatic rim lighting, specular highlights on edges, commercial hero shot, 3D render quality, 4K

**ControlNet:** Use INPUT_DESIGN as surface reference.

---

### Image 4 — The Feature Infographic
**Filename:** `04_infographic.png`

**Prompt:**
> Product infographic mousepad, flat lay angled at 30 degrees, four callout arrows pointing to: (1) "Micro-weave fabric surface" top-left, (2) "3mm natural rubber base" bottom-left, (3) "Anti-slip grip" bottom-right, (4) "Stitched edges" top-right, clean sans-serif white labels, dark background, professional marketing graphic, product photography with text overlay space, commercial quality

**ControlNet:** Reference INPUT_DESIGN for surface.

**Note:** Add the label text in post using PIL/ImageDraw if ComfyUI cannot render clean text. See post-processing step below.

---

### Image 5 — 3mm Edge Thickness Macro
**Filename:** `05_edge_macro.png`

**Prompt:**
> Extreme close-up macro photo of a mousepad edge, side profile view, showing the stitched edge binding in detail, fabric texture visible on top, 3mm thick rubber base visible underneath, ruler or scale reference optional, sharp focus on stitching thread, soft background blur, studio macro photography, commercial product quality, 4K

---

### Image 6 — Micro-Weave Fabric Macro
**Filename:** `06_fabric_macro.png`

**Prompt:**
> Extreme macro close-up of mousepad fabric surface, top-down view, the micro-weave textile pattern is clearly visible, individual fibres and weave structure in sharp focus, the artwork colour from the design is subtly visible underneath the fabric texture, shallow depth of field, studio macro lighting, 4K, commercial product photography

**ControlNet:** Colour-match to INPUT_DESIGN dominant colours.

---

### Image 7 — Anti-Slip Base Reveal (Corner Flip)
**Filename:** `07_base_reveal.png`

**Prompt:**
> Mousepad photographed from underneath at a 45-degree angle, one corner is flipped up to reveal the anti-slip natural rubber base, the underside shows a uniform dark grey/black textured rubber surface, the top artwork is partially visible where the corner flips, studio lighting, white or light grey background, commercial product photography, 4K

---

### Image 8 — Split Material & Build Showcase
**Filename:** `08_split_showcase.png`

**Prompt:**
> Split-view product photo, left half shows the mousepad top surface with full artwork design, right half shows an exploded cross-section diagram with three labelled layers: top layer "Micro-weave Fabric", middle layer "High-density Foam", bottom layer "Natural Rubber Anti-slip Base", clean white background, technical product illustration style meets commercial photography, 4K

**ControlNet:** Use INPUT_DESIGN for the left-half surface.

---

## COMFYUI WORKFLOW INSTRUCTIONS

### Setup (do once per session)
1. Launch ComfyUI — confirm it is running at `http://127.0.0.1:8188`
2. Load a photorealistic SDXL checkpoint (RealVisXL V4, Juggernaut XL, or DreamShaper XL preferred)
3. Enable **ControlNet** with a **Tile** or **Reference-Only** preprocessor for artwork fidelity

### Per-Image Workflow
For each of the 8 images:
1. Load INPUT_DESIGN into the ControlNet image node
2. Set the positive prompt from above
3. Set negative prompt: `cartoon, illustration, painting, low quality, blurry, distorted, watermark, text errors, ugly, deformed, unrealistic, oversaturated`
4. **Sampler:** DPM++ 2M Karras, 30 steps, CFG 7.0
5. **Resolution:** 1024×1024 (upscale to 2000×2000 after)
6. Run — save output as the filename listed above

### Post-Processing (Image 4 — Infographic only)
If ComfyUI cannot embed clean text labels, after generating the base image run this Python snippet:

```python
from PIL import Image, ImageDraw, ImageFont
import os

img = Image.open("04_infographic.png")
draw = ImageDraw.Draw(img)
# Adjust coordinates to match your generated image layout
labels = [
    ((80, 120), "Micro-weave fabric surface"),
    ((80, 680), "3mm natural rubber base"),
    ((900, 680), "Anti-slip grip"),
    ((900, 120), "Stitched edges"),
]
for pos, text in labels:
    draw.text(pos, text, fill="white")
img.save("04_infographic_final.png")
```

---

## AUTOMATION SCRIPT (Optional — run all 8 via API)

If you want to trigger ComfyUI programmatically instead of using the UI:

```python
import requests, json, time, os, glob

# Find input design
designs = glob.glob("*.png") + glob.glob("*.jpg") + glob.glob("*.webp")
input_design = [f for f in designs if not f.startswith("0")][0]
print(f"Using design: {input_design}")

COMFY_URL = "http://127.0.0.1:8188"

# Load your saved workflow JSON and inject the design path + prompt
# then POST to /prompt endpoint for each of the 8 images
# See ComfyUI API docs: https://github.com/comfyanonymous/ComfyUI/blob/master/script_examples/basic_api_example.py
```

---

## CHECKLIST — Before Handing Off to Client

- [ ] `01_cutout.png` — clean white/transparent background
- [ ] `02_lifestyle_desk.png` — keyboard + mouse props visible
- [ ] `03_hero_packshot.png` — floating hero angle
- [ ] `04_infographic.png` — all 4 labels readable
- [ ] `05_edge_macro.png` — stitching + 3mm thickness visible
- [ ] `06_fabric_macro.png` — weave texture sharp
- [ ] `07_base_reveal.png` — rubber base visible, corner flipped
- [ ] `08_split_showcase.png` — split view with layer labels

All 8 images → export at **2000×2000px minimum**, sRGB, PNG.

---
