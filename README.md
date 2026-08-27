# ⚡ Mehmet Karabulut — Vercel-Style Personal Portfolio

A sleek, ultra-fast personal developer portfolio inspired by Vercel's signature design language. Features an interactive 3D rotating geometry cube with Three.js mouse-tracking parallax, spotlight glow cards, interactive terminal CLI, Cmd+K command palette, and real-time edge telemetry.

## ✨ Key Features

- **🌐 Interactive 3D Vercel Cube**: Built with WebGL/Three.js featuring mouse parallax tilt, drag-to-spin controls, and Neon/Cyber/Monochrome color modes.
- **💻 Interactive CLI & Terminal**: Live interactive terminal with commands (`whoami`, `skills`, `projects`, `stats`, `contact`, `clear`) and tabs (`CLI`, `package.json`, `build.log`).
- **🔍 ⌘K Command Palette**: Full keyboard-accessible command menu for instant site navigation, email copying, and theme toggling.
- **✨ Spotlight Hover Cards**: Mouse-following radial gradient glow borders and reflections.
- **🚀 Vercel Deployment Cards**: Project cards styled like Vercel dashboard deployments with live badges, git branch indicators, and tech stack tags.
- **📊 Real-time Edge Telemetry**: Live Istanbul clock, edge region latency simulation, uptime tracker, and GitHub commit heatmap.
- **🌓 Dark & Light Modes**: Seamless monochrome theme switching.
- **📱 Fully Responsive**: Flawless experience across mobile, tablet, and ultra-wide displays.

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Geist Typography + Custom Grids
- **3D Graphics**: Three.js (WebGL)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS Shaders

## 🚀 Quick Start

### 1. Run Locally
```bash
cd /Users/mehmetkarabul7tt/.gemini/antigravity/scratch/vercel-portfolio
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy to Vercel (1-Click)
```bash
npx vercel
```
or push to GitHub and import into [Vercel Dashboard](https://vercel.com).

## 📝 Customizing Your Information
All personal details, projects, career experience, and skills can be easily modified in a single file:
👉 `src/data/portfolio.ts`
