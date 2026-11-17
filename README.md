# LUNA-SAFE
**Lunar Understanding and Navigation Assessment for Surface Entry**

Research prototype for detecting boulders in lunar imagery, estimating apparent ground dimensions from image scale metadata, and producing configurable terrain-hazard layers.

> Current status: repository foundation. This release has a working API health check and frontend status dashboard. Detection, scientific scale conversion, hazard scoring, and model evaluation are subsequent stages. No model accuracy is claimed.

## Requirements
- Python 3.11
- Node.js 20+
- Git
- Windows PowerShell or macOS Terminal
- Optional later: NVIDIA GPU with compatible CUDA/PyTorch, or cloud GPU

## Run locally

### Backend — Windows PowerShell
```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload
```
If activation is blocked:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### Backend — macOS
```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend: http://127.0.0.1:8000  
Health: http://127.0.0.1:8000/api/v1/health  
API docs: http://127.0.0.1:8000/docs

### Frontend
Open a second terminal from the repository root:
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173. The frontend calls `http://127.0.0.1:8000` by default.

## Docker
From the repository root:
```bash
docker compose up --build
```
Frontend: http://localhost:5173  
Backend docs: http://localhost:8000/docs

## GitHub
```bash
git init
git add .
git commit -m "chore: initialize LUNA-SAFE foundation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/luna-safe.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. Create an empty GitHub repository first.

## Repository layout
```text
luna-safe/
├── backend/app/api/routes/health.py
├── backend/app/core/config.py
├── backend/app/main.py
├── backend/requirements.txt
├── backend/Dockerfile
├── frontend/src/App.jsx
├── frontend/src/main.jsx
├── frontend/src/styles.css
├── frontend/index.html
├── frontend/package.json
├── data/raw/
├── data/processed/
├── data/annotations/
├── models/
├── reports/
├── .env.example
├── .gitignore
├── compose.yaml
└── README.md
```

## Scientific integrity rules
1. Preserve original imagery in `data/raw/`; never overwrite source files.
2. Record source product ID, URL, acquisition metadata, pixel scale, coordinate reference system, and usage terms.
3. Split train/validation/test by original image or geographic scene, not randomly by adjacent tiles.
4. Never infer metres-per-pixel from image dimensions alone. Use valid metadata or documented calibration.
5. Bounding-box dimensions are apparent projected dimensions, not true 3-D boulder diameter.
6. Missing imagery, poor resolution, or low confidence must not automatically mean safe.
7. Keep model predictions separate from engineering hazard thresholds.
8. This prototype is not certified lunar landing guidance.

## Planned implementation sequence
1. Repository foundation and local verification.
2. LROC imagery ingestion, metadata manifest, tiling, annotation format.
3. YOLO training/inference and reproducible evaluation.
4. Pixel-to-ground-scale estimation and spatial density.
5. Lander/rover hazard profiles and map generation.
6. FastAPI analysis endpoints and interactive frontend integration.
7. Tests, benchmark report, packaging, and competition demo.

## Current API
`GET /api/v1/health` returns service status and explicitly reports that the ML pipeline is not connected yet.
