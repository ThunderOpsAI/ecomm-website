# Project Handoff: AI Image Enhancement & E-Commerce Pipeline

## 1. Goal of Next Session
A fresh agent will verify that the AI image enhancement models, pipelines, and tools are completely operational and ready for mousepad artwork production on this Windows machine.

---

## 2. Machine & Hardware Context
- **Operating System**: Windows 11 (x64)
- **GPU**: NVIDIA GeForce RTX 5060 Ti (8 GB VRAM, compute capability `sm_120` / Blackwell architecture)
- **CUDA Runtime**: CUDA 13.2 / 13.3 driver active
- **Python**: Python 3.13 via dedicated virtual environment at `ai-tools/.venv`

---

## 3. Installed Components & Model Status

### A. Python Virtual Environment
- **Path**: `ai-tools/.venv`
- **Interpreter**: `.\ai-tools\.venv\Scripts\python.exe`
- **PyTorch**: `torch==2.14.0+cu132`, `torchvision==0.29.0+cu132` (compiled with native `sm_120` Blackwell kernel support; tensor execution confirmed on `cuda:0`)

### B. Pretrained Weights Downloaded
- **Real-ESRGAN x4plus**: `ai-tools/Real-ESRGAN/weights/RealESRGAN_x4plus.pth` (67 MB)
- **Real-ESRGAN x4plus anime**: `ai-tools/Real-ESRGAN/weights/RealESRGAN_x4plus_anime_6B.pth` (18 MB)
- **GFPGAN v1.4**: `ai-tools/GFPGAN/experiments/pretrained_models/GFPGANv1.4.pth` (348.6 MB)
- **ComfyUI Upscale Models**: Mirrored into `ai-tools/ComfyUI/models/upscale_models/`

### C. Configured Repositories & Packages
- `ai-tools/ComfyUI`: Core dependencies installed (`transformers`, `safetensors`, `aiohttp`, `spandrel`, `kornia`, etc.). CLI verified with `main.py --help`.
- `ai-tools/BasicSR`: Cloned into `ai-tools/BasicSR`, patched for Python 3.13 PEP 667 `setup.py`, installed in editable mode (`basicsr-1.4.2`).
- `ai-tools/Real-ESRGAN`: Patched for Python 3.13 PEP 667, installed in editable mode (`realesrgan-0.3.0`).
- `ai-tools/GFPGAN`: Patched for Python 3.13 PEP 667, installed in editable mode (`gfpgan-1.3.8`).
- `facexlib`, `opencv-python`, `pillow`, `scipy`: Fully installed.

### D. GUI Applications (Winget)
- `winget install Upscayl.Upscayl` & `winget install chaiNNer-org.chaiNNer` were initiated via background process.

---

## 4. Key Scripts & Integration Points
- **ComfyUI API Client**: `lib/comfyui.ts` &mdash; Client class for queuing workflows, polling history, and retrieving output URLs.
- **Mousepad Image Processing**: `Mousepads/fit_images.py` &mdash; Cropping and ratio adjustment for mousepad template fitting (updated to use relative paths rather than macOS hardcoded paths).
- **ESRGAN Inference CLI**: `ai-tools/Real-ESRGAN/inference_realesrgan.py` &mdash; Tested with `ai-tools/Real-ESRGAN/inputs/0014.jpg`, generated output in `ai-tools/Real-ESRGAN/results/0014_out.jpg`.

---

## 5. Verification Checklist for the Fresh Agent

Run the following checks to confirm everything is operational:

1. **Verify PyTorch GPU Execution**:
   ```powershell
   .\ai-tools\.venv\Scripts\python.exe -c "import torch; print('CUDA available:', torch.cuda.is_available()); print('Device:', torch.cuda.get_device_name(0)); x = torch.ones(2, 2, device='cuda'); print('Tensor check:', (x * 3).cpu())"
   ```

2. **Verify Real-ESRGAN Inference**:
   ```powershell
   .\ai-tools\.venv\Scripts\python.exe ai-tools/Real-ESRGAN/inference_realesrgan.py -n RealESRGAN_x4plus -i ai-tools/Real-ESRGAN/inputs/0014.jpg -o ai-tools/Real-ESRGAN/results
   ```

3. **Verify GFPGAN Inference**:
   ```powershell
   .\ai-tools\.venv\Scripts\python.exe ai-tools/GFPGAN/inference_gfpgan.py -i ai-tools/GFPGAN/inputs/whole_imgs -o ai-tools/GFPGAN/results -v 1.4 -s 2 --bg_upsampler realesrgan
   ```

4. **Verify ComfyUI Headless Check**:
   ```powershell
   .\ai-tools\.venv\Scripts\python.exe ai-tools/ComfyUI/main.py --quick-test-for-ci --cpu
   ```

5. **Verify Mousepad Image Resizing**:
   ```powershell
   .\ai-tools\.venv\Scripts\python.exe Mousepads/fit_images.py
   ```

6. **Verify Desktop Apps (Upscayl & chaiNNer)**:
   ```powershell
   winget list --id Upscayl.Upscayl
   winget list --id chaiNNer-org.chaiNNer
   ```

---

## 6. Suggested Skills
- `verify`: Use to run and validate the checklist steps above.
- `explore-codebase`: Use to query graph nodes, flows, and module dependencies in the repo.
