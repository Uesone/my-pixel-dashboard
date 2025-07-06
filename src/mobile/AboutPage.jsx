// src/mobile/AboutPage.jsx

import React from "react";

// === TESTI MULTILINGUA ===
const TEXTS = {
  it: {
    title: "About",
    close: "Chiudi",
    who: <>
      Sono <b style={{ color: "#ffe066" }}>Umberto Amoroso</b>, Full Stack Developer con base a Milano.<br />
      <span style={{ color: "#8ef6e2" }}>Pixel Art Enthusiast</span> — creativo per natura, tecnico per scelta.
    </>,
    exp: <>
      Ho vissuto e lavorato tra <b style={{ color: "#00ffe1" }}>Australia, Cina e Sud-Est Asiatico</b>: questa prospettiva globale arricchisce ogni progetto che realizzo.
    </>,
    what: <>
      Creo web app con architettura pulita, attenzione all’UX e uno stile ispirato al mondo <b>pixel/retro-gaming</b>.
    </>,
    focus: <>
      <span style={{ color: "#00ffe1" }}>Mi sto specializzando su Flutter & Dart</span> per lo sviluppo di app mobile e multipiattaforma.<br />
      Attualmente sto lavorando alla mia prima app proprietaria, integrando UI creativa e funzionalità avanzate.
    </>,
    inspiration: <>
      Amo la <b style={{ color: "#00ffe1" }}>pixel art</b> e le interfacce che sorprendono:<br />
      il codice, per me, deve risolvere problemi e rendere ogni interazione piacevole e unica.
    </>,
    soft: <>
      Lavoro volentieri in team, scrivo codice pulito e costruisco prodotti che siano utili e belli da usare.<br />
      <span style={{ color: "#8fffc4", fontWeight: 500 }}>
        In questo periodo mi sto concentrando soprattutto su progetti freelance, ma resto curioso e disponibile a valutare altre proposte!
      </span>
    </>,
    stack: {
      title: "Stack Tecnico",
      fe: "Front-End",
      feList: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Sass", "Redux", "Bootstrap", "Vite"],
      be: "Back-End",
      beList: ["Java", "Spring Boot", "PostgreSQL"],
      mobile: "Mobile",
      mobileList: ["Flutter", "Dart"],
      tools: "Tools",
      toolsList: ["Git", "GitHub", "VS Code", "Postman"],
    }
  },
  en: {
    title: "About",
    close: "Close",
    who: <>
      I'm <b style={{ color: "#ffe066" }}>Umberto Amoroso</b>, a Full Stack Developer based in Milan.<br />
      <span style={{ color: "#8ef6e2" }}>Pixel Art Enthusiast</span> — creative by nature, technical by choice.
    </>,
    exp: <>
      I’ve lived and worked across <b style={{ color: "#00ffe1" }}>Australia, China and Southeast Asia</b>: this global perspective enriches everything I build.
    </>,
    what: <>
      I create web apps with clean architecture, strong UX focus and a style inspired by the <b>pixel/retro-gaming</b> world.
    </>,
    focus: <>
      <span style={{ color: "#00ffe1" }}>Currently focusing on Flutter & Dart</span> for cross-platform/mobile app development.<br />
      I'm working on my first own app, integrating creative UI and advanced features.
    </>,
    inspiration: <>
      I love <b style={{ color: "#00ffe1" }}>pixel art</b> and surprising interfaces:<br />
      for me, code should solve real problems and make every interaction delightful and unique.
    </>,
    soft: <>
      I enjoy working in teams, writing clean code and building products that are both useful and enjoyable to use.<br />
      <span style={{ color: "#8fffc4", fontWeight: 500 }}>
        Right now I’m mostly working on freelance projects, but I’m curious and open to hearing about other possibilities as well!


      </span>
    </>,
    stack: {
      title: "Tech Stack",
      fe: "Front-End",
      feList: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Sass", "Redux", "Bootstrap", "Vite"],
      be: "Back-End",
      beList: ["Java", "Spring Boot", "PostgreSQL"],
      mobile: "Mobile",
      mobileList: ["Flutter", "Dart"],
      tools: "Tools",
      toolsList: ["Git", "GitHub", "VS Code", "Postman"],
    }
  }
};

// --- Stili riutilizzabili (simili a quelli dei servizi) ---
const sectionStyle = {
  margin: "15px 0",
  borderRadius: 11,
  padding: "15px 13px 13px 13px",
  background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};
const iconStyle = {
  fontSize: 27,
  verticalAlign: "middle",
  marginRight: 8,
  marginBottom: 1,
};
const titleStyle = {
  color: "#00ffe1",
  fontSize: 18,
  letterSpacing: 1,
  fontFamily: "'VT323', monospace"
};
const descStyle = {
  color: "#b8ffd9",
  fontSize: 15.5,
  marginTop: 3,
  lineHeight: 1.7
};

export default function AboutPage({ onClose, lang = "it" }) {
  const t = TEXTS[lang] || TEXTS.it;
  const s = t.stack;

  return (
    <div
      style={{
        minWidth: 0,
        position: "relative",
        padding: "2px 0 18px 0",
        maxWidth: 470,
        margin: "0 auto"
      }}
    >
      {/* X di chiusura sobria opzionale */}
      {onClose && (
        <button
          className="close-x-btn"
          aria-label={t.close}
          onClick={onClose}
          tabIndex={0}
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            fontSize: 26,
            color: "#ffe066",
            background: "transparent",
            border: "none",
            borderRadius: "7px",
            fontFamily: "'VT323', monospace",
            padding: "0 9px",
            lineHeight: "32px",
            cursor: "pointer",
            zIndex: 10,
            transition: "color 0.17s, background 0.15s, box-shadow 0.14s",
            boxShadow: "0 0 0 1px #ffe06633",
            outline: "none",
          }}
          onMouseOver={e => (e.currentTarget.style.color = "#00ffe1")}
          onMouseOut={e => (e.currentTarget.style.color = "#ffe066")}
          onFocus={e => (e.currentTarget.style.color = "#00ffe1")}
          onBlur={e => (e.currentTarget.style.color = "#ffe066")}
        >×</button>
      )}

      <h2 style={{
        color: "#ffe066",
        fontSize: 28,
        marginBottom: 12,
        fontFamily: "'VT323', monospace",
        letterSpacing: 2,
        textShadow: "0 2px 6px #ffe06648"
      }}>
        {t.title}
      </h2>

      {/* Chi sono */}
      <div style={sectionStyle}>
        <div style={descStyle}>{t.who}</div>
      </div>
      {/* Esperienza internazionale */}
      <div style={sectionStyle}>
        <span style={iconStyle}>🌏</span>
        <b style={titleStyle}>{lang === "it" ? "Esperienza internazionale" : "International Experience"}</b>
        <div style={descStyle}>{t.exp}</div>
      </div>
      {/* Cosa faccio */}
      <div style={sectionStyle}>
        <span style={iconStyle}>💻</span>
        <b style={titleStyle}>{lang === "it" ? "Cosa faccio" : "What I do"}</b>
        <div style={descStyle}>{t.what}</div>
      </div>
      {/* Focus attuale */}
      <div style={sectionStyle}>
        <span style={iconStyle}>📱</span>
        <b style={titleStyle}>{lang === "it" ? "Focus attuale" : "Current Focus"}</b>
        <div style={descStyle}>{t.focus}</div>
      </div>
      {/* Ispirazione */}
      <div style={sectionStyle}>
        <span style={iconStyle}>🎮</span>
        <b style={titleStyle}>{lang === "it" ? "Cosa mi ispira" : "What inspires me"}</b>
        <div style={descStyle}>{t.inspiration}</div>
      </div>
      {/* Soft skills & Disponibilità */}
      <div style={sectionStyle}>
        <span style={iconStyle}>🤝</span>
        <b style={titleStyle}>{lang === "it" ? "Lavoro e disponibilità" : "Work & Availability"}</b>
        <div style={descStyle}>{t.soft}</div>
      </div>
      {/* Stack Tecnico */}
      <div style={{
        ...sectionStyle,
        marginBottom: 4,
        padding: "13px 13px 7px 13px",
        background: "rgba(46,64,54,0.24)"
      }}>
        <span style={iconStyle}>🛠️</span>
        <b style={titleStyle}>{s.title}</b>
        <div style={{ ...descStyle, marginBottom: 2 }}>
          <span style={{ color: "#7de2ff" }}>{s.fe}:</span>{" "}
          {s.feList.map((tech, i) => (
            <span key={tech} style={{ color: "#00ffe1" }}>
              {tech}{i < s.feList.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div style={{ ...descStyle, marginBottom: 2 }}>
          <span style={{ color: "#7de2ff" }}>{s.be}:</span>{" "}
          {s.beList.map((tech, i) => (
            <span key={tech} style={{ color: "#00ffe1" }}>
              {tech}{i < s.beList.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div style={{ ...descStyle, marginBottom: 2 }}>
          <span style={{ color: "#7de2ff" }}>{s.mobile}:</span>{" "}
          {s.mobileList.map((tech, i) => (
            <span key={tech} style={{ color: "#00ffe1" }}>
              {tech}{i < s.mobileList.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div style={descStyle}>
          <span style={{ color: "#7de2ff" }}>{s.tools}:</span>{" "}
          {s.toolsList.map((tool, i) => (
            <span key={tool} style={{ color: "#00ffe1" }}>
              {tool}{i < s.toolsList.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
