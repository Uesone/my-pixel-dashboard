# 🎮 my-pixel-dashboard

 Interactive pixel-art portfolio (desktop & mobile) with integrated AI chatbot (Golem). Deployed on Vercel.

---

## 🚀 Overview

**my-pixel-dashboard** is an open-source, retro-inspired portfolio built with **React** and custom pixel art graphics.  
It showcases my projects, skills, and experience through a fully interactive, animated dashboard and a steampunk-themed AI chatbot (UmbyBot/Golem).

---

## 🖼 Live Demo

🌐 **[Try it live on Vercel!](https://uesone.vercel.app/)**

---

## 🕹 Key Features

- Fully custom pixel-art UI with retro animations (GSAP/Framer Motion)
- Animated sidebar and PowerHub, modals, overlays.
- **UmbyBot Chatbot** (OpenAI API) — RPG-style interaction on desktop & mobile
- Multi-language (IT/EN) with automatic language detection
- Dynamic routing (React Router DOM 7)
- Mobile-first & responsive design
- Modular React components, optimized assets
- Fast deployment and auto-previews via **Vercel**
- Direct email sending via EmailJS integration

---

## 📱 Mobile Version & GolemBot RPG

In addition to the desktop dashboard, **the mobile version** has a **dedicated layout** optimized for smartphones and tablets:

- **Golem RPG Chatbot**  
  On mobile, the chatbot turns into an RPG-style dialogue:
    - Typewriter animation and animated mouth
    - Minimal UI inspired by retro handheld consoles
    - Replies in both **Italian and English**, can list my GitHub projects on request

#### ⚠️ Question Limitations in the Bot

- **Max 200 characters per question**  
  User questions are limited to 200 characters.
- **Rate limit on messages**  
  The bot enforces a cooldown between messages to avoid spam and accidental API overuse.

**Why?**
- To keep **API costs** under control (OpenAI charges per token/request).
- To ensure **fast, responsive chat** and prevent **server overload**.
- To maintain a **game-like experience** — short, snappy dialogues, like in classic RPGs!
- To prevent **truncated prompts/responses** and ensure quality, especially on mobile devices.

---

## 🖥 Desktop Features

The desktop version of **my-pixel-dashboard** offers a fully interactive **dashboard** with retro animations and rich user experience:

- **Interactive Sidebar**:  
  Full navigation with pixel-art style icons, smooth hover effects, and tooltips. Clickable links to projects, skills, and experience.

- **PowerHub Animation**:  
  A central feature representing the "power" of your profile with custom animations.

- **Modals and Overlay Effects**:  
  Smooth transitions for additional content, pop-ups for detailed views, and background dimming effects for a gaming experience.

---

## 🛠️ Tech Stack

| Area              | Main Tech                                                        | Details                                            |
|-------------------|------------------------------------------------------------------|----------------------------------------------------|
| **Frontend**      | [React 19](https://react.dev/), [Vite 6](https://vitejs.dev/)    | SPA app, fast builds, ES modules                   |
|                   | [Framer Motion 12](https://www.framer.com/motion/)               | Smooth pixel/retro animations                      |
|                   | [GSAP 3](https://greensock.com/gsap/)                            | Pixel micro-animations and transitions             |
|                   | [React Router DOM 7](https://reactrouter.com/)                   | Dynamic SPA routing                                |
|                   | [NES.css](https://nostalgic-css.github.io/NES.css/)              | Extra 8bit UI components                           |
|                   | [@emailjs/browser](https://www.emailjs.com/)                     | Direct email from the dashboard                    |
| **Mobile**        | Custom responsive UI, typewriter/mouth animations                | All integrated into the main React code            |
| **Chatbot**       | GolemBot (React + OpenAI API via backend proxy)                   | Dynamic prompt, localization, pixel-art bot sprite |
| **Backend Proxy** | Node.js (Vercel Serverless/Edge), `openai-proxy`                 | Secure OpenAI API calls, no exposed API key        |
| **Build/Dev**     | Vite, ESLint, @vitejs/plugin-react                               | Fast build, linting, dev server                    |
| **Deploy**        | [Vercel](https://vercel.com/)                                    | CI/CD, previews for each push/PR, global CDN       |

**Main dependencies (`package.json`):**
- **react, react-dom, vite, framer-motion, gsap, nes.css, react-router-dom, @emailjs/browser, @vitejs/plugin-react, eslint**

**Backend proxy:**  
- Minimal node.js for secure OpenAI API forwarding (no exposed keys, serverless-ready)

---

## 🖥️ Local Setup

> Requires **Node.js v18+**

```bash
git clone https://github.com/Uesone/my-pixel-dashboard.git
cd my-pixel-dashboard
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

For the chatbot:
Configure the OpenAI proxy as described in /proxy/ or use the built-in Vercel serverless function.
---
⚡ Deployment: Vercel
The site is deployed on Vercel for these reasons:

Instant CI/CD: Automatic deploy on every GitHub push

Excellent performance: CDN, optimized builds, and caching

Zero server maintenance: No need for manual server configuration

Preview URLs: Automatically generated preview URLs for each PR/branch (ideal for mobile testing)

Full React SPA & API proxy support: Seamless integration for both frontend and backend.

Vercel was chosen for its fast deployment, secure API proxy, ease of use, and zero-cost hosting, making it perfect for a personal portfolio.
---
👤 Author
Umberto Amoroso
---
📜 License
Open-source, MIT License.

Pixel-art, retro vibes, and modern frontend by Umberto Amoroso

