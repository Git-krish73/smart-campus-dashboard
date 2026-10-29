# CampusVision AI — Smart Campus Indoor Scene Recognition Dashboard

A high-performance, responsive AI Dashboard for Edge AI Indoor Scene Recognition and Localization, built for the **MobileNetV3-Large** Capstone Project.

![CampusVision AI Dashboard](assets/samples/corridor.jpg)

---

## 🌟 Key Highlights & Evaluated Metrics

- **Top-1 Test Accuracy**: **86.25%** (138 / 160 correct)
- **Top-3 Test Accuracy**: **98.12%** (157 / 160 top-3 hit rate)
- **Macro-F1 Score**: **0.8663** (Weighted F1: 0.87)
- **Inference Speed**: **30.30 ms / image** (~33.0 FPS on standard CPU)
- **Target Classes**: 6 University Indoor Environments (`Classroom`, `Common_Canteen`, `Corridor`, `Laboratory`, `Library`, `Office`)
- **Dataset Composition**: 800 curated campus images (640 Train / 160 Test)
- **Model Size**: ~21.1 MB (MobileNetV3-Large ImageNet backbone + custom 6-class linear head)

---

## 🚀 Live Local Deployment

### Option A: Ultra-Fast Static Dashboard
```bash
# Inside smart-campus-dashboard folder
npx -y serve . -l 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Python FastAPI & PyTorch Server
```bash
pip install fastapi uvicorn torchvision pillow
python server.py
```
Open [http://localhost:8000](http://localhost:8000) to view the dashboard and access the REST API endpoints:
- `POST /predict` — Image file upload inference
- `GET /api/metrics` — JSON evaluation benchmarks
- `GET /api/health` — Hardware & runtime status

---

## 🌐 1-Click Cloud Deployment

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npx netlify deploy --prod --dir .
```

---

## 📁 Project Architecture
```
smart-campus-dashboard/
├── index.html              # Main HTML5 Dashboard
├── vercel.json             # Vercel deployment configuration
├── package.json            # Node.js project file
├── server.py               # Python FastAPI backend & PyTorch inference
├── css/
│   └── style.css           # Modern Dark Glassmorphic CSS Design System
├── js/
│   ├── app.js              # Application logic & interactive inference engine
│   └── charts.js           # Dynamic Chart.js visualizations
└── assets/
    ├── extracted/          # Authentic notebook charts (Loss, Confusion Matrix, Grids)
    └── samples/            # 6 High-resolution campus scene presets
```
