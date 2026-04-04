<div align="center">
  <img src="./public/favicon.ico" alt="ChainPulse Logo" width="80" />
  <h1 align="center">ChainPulse</h1>
  <p align="center">
    <strong>Omniscience over your portfolio.</strong>
    <br />
    A next-generation Web3 analytics terminal built for speed, depth, and ultimate cross-chain visibility.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/THREE.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="ThreeJS" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  </p>

  <h3>
    <a href="https://chain-pulse-crypto.vercel.app/" target="_blank">Live Demo</a>
    <span> | </span>
    <a href="#-core-features">Features</a>
    <span> | </span>
    <a href="#-installation--usage">Installation</a>
  </h3>
</div>

<br />

## 🪐 About The Project

**ChainPulse** is a premium, futuristic SaaS landing page template engineered for Web3 & crypto-analytics platforms. Moving away from generic flat interfaces, ChainPulse acts as a "digital instrument"—combining real-time micro-interactions, dark neon-acid aesthetics, and heavy 3D GPU acceleration to instantly build trust and authority with DeFi native users.

<p align="center">
  <a href="https://chain-pulse-crypto.vercel.app/" target="_blank">
    <img src="https://images.unsplash.com/photo-1639762681485-074b7f4f4b9c?q=80&w=2664&auto=format&fit=crop" alt="ChainPulse High-Tech Web3 Preview" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
  </a>
</p>
<p align="center"><i>(Click image to view the live Vercel deployment)</i></p>

## ✨ Core Features

ChainPulse stands out by heavily intertwining UI design with raw engineering mechanics:

*   🌐 **Immersive 3D Space:** A fully interactive, GPU-accelerated Spline 3D background layered natively behind glassmorphism DOM nodes.
*   ⚡ **Fluid Locomotion:** Engineered with `Lenis` smooth-scroll physics and deeply integrated **GSAP** ScrollTriggers to make data blocks physically materialize on scroll.
*   🤖 **AI "Oracle" Terminal:** A completely functional, draggable chatbot modal built into the layout to simulate real-time API queries and blockchain analytics conversations.
*   🔥 **Alpha Leaks Carousel:** A highly complex, staggered 3D-math testimonial slider designed around sleek data cards to provide absolute Web3 social proof.
*   🖱️ **Magnetic Interactions:** Global custom cursor tracking with state-based hover anomalies and sticky magnetic physics across all major CTAs.
*   📱 **Responsive Glassmorphism:** Heavy utilization of CSS backdrop-filters, custom pseudo-element noise textures, and nested border gradients that auto-scale perfectly to mobile.

## 🛠️ Tech Stack

This project was bootstrapped utilizing modern bleeding-edge tooling:

*   **Runtime / Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
*   **Animation Engine:** [GSAP (GreenSock)](https://gsap.com/)
*   **Scroll Physics:** [Lenis](https://lenis.studiofreight.com/)
*   **3D Rendering:** [Spline](https://spline.design/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Installation & Usage

To get this protocol running locally on your node, follow these exact steps:

### Prerequisites
*   Node.js (v18.0.0 or higher recommended)
*   npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Abhichy18/Chain-Pulse-Crypto.git
cd Chain-Pulse-Crypto
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize local sub-server
```bash
npm run dev
```
The terminal UI will now be active at `http://localhost:5173/`.

## 📁 Architecture Overview

```text
chainpulse/
├── public/                 # Static assets (Favicons, OpenGraph)
├── src/
│   ├── assets/             # Component-specific media
│   ├── components/         # Core React architecture
│   │   ├── ui/             # Standardized atomic micro-components
│   │   ├── Hero.jsx        # Landing telemetry & GSAP loaders
│   │   ├── ChatbotWidget.jsx # AI Oracle logic
│   │   └── ... 
│   ├── lib/
│   │   └── utils.js        # Global Shadcn/clsx class mergers
│   ├── App.jsx             # Main routing & layout sequence
│   ├── index.css           # Global custom CSS properties & noise injection
│   └── main.jsx            # React root mount
├── tailwind.config.js      # Global layout themes (Void, Acid, Electric)
└── package.json            # Protocol manifests
```

## 🎯 Use Cases
- Web3 Portfolio Tracking  
- Cross-chain Wallet Analytics  
- DeFi Monitoring Dashboard  
- Trading Intelligence & Insights

## 🔮 Future Upgrades
- [ ] Connect the "Connect Wallet" CTA via Wagmi / Web3Modal.
- [ ] Replace placeholder API routes in the Oracle Chatbot with direct OpenAI/Anthropic stream connections.
- [ ] Implement fully dynamic real-time price feeds in the stats blocks.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Abhichy118/Chain-Pulse-Crypto/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🧑‍💻 Author
- **Name:** Abhishek Choudhary  
- **GitHub:** [https://github.com/Abhichy18](https://github.com/Abhichy18)  
- **LinkedIn:** [https://www.linkedin.com/in/abhishek-choudhary18/](https://www.linkedin.com/in/abhishek-choudhary18/)

---
<p align="center">Designed and engineered as a showcase of what modern interactive Web3 frontend development can look like when UI meets raw physics.</p>
