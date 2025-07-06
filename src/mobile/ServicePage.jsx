// src/mobile/ServicesPage.jsx

import React from "react";

// === SERVIZI MULTILINGUA ===
const SERVICES = {
  it: [
    {
      icon: "🕹️",
      title: "Siti web custom & portfolio",
      desc: (
        <>
          Realizzazione di siti web moderni, responsive e ottimizzati SEO, in stile <b>pixel-art</b> o classico. <br />
          Landing page, portfolio personale, blog o siti aziendali.
          <br /><span style={{ color: "#ffd24c" }}>Tech:</span> React, Vite, Bootstrap, Tailwind.
        </>
      )
    },
    {
      icon: "📱",
      title: "App mobile Flutter",
      desc: (
        <>
          Sviluppo di app Android/iOS con <b>Flutter</b>.<br />
          Progettazione UI, sviluppo completo, collegamento a backend personalizzato o servizi esistenti.
          <br /><span style={{ color: "#ffd24c" }}>Tech:</span> Flutter, Dart, REST API.
        </>
      )
    },
    {
      icon: "⚙️",
      title: "Backend & API personalizzate",
      desc: (
        <>
          Progettazione e sviluppo di backend robusti, sicuri e scalabili.<br />
          Autenticazione JWT, dashboard, notifiche e database SQL.
          <br /><span style={{ color: "#ffd24c" }}>Tech:</span> Java, Spring Boot, PostgreSQL.
        </>
      )
    },
    {
      icon: "🎨",
      title: "UI Custom",
      desc: (
        <>
          Progettazione interfacce originali in <b>pixel-art</b>, retro, etc.<br />
          Design di sprite custom, componenti, avatar, micro-animazioni.
          <br /><span style={{ color: "#ffd24c" }}>Extra:</span> Personalizzazioni UX/UI, effetti sonori e minigiochi.
        </>
      )
    }
  ],
  en: [
    {
      icon: "🕹️",
      title: "Custom websites & portfolios",
      desc: (
        <>
          Creation of modern, responsive and SEO-optimized websites in <b>pixel-art</b> or classic style.<br />
          Landing pages, personal portfolios, blogs or business sites.
          <br /><span style={{ color: "#ffd24c" }}>Tech:</span> React, Vite, Bootstrap, Tailwind.
        </>
      )
    },
    {
      icon: "📱",
      title: "Flutter mobile apps",
      desc: (
        <>
          Development of Android/iOS apps with <b>Flutter</b>.<br />
          UI design, complete development, connection to custom backend or existing services.
          <br /><span style={{ color: "#ffd24c" }}>Tech:</span> Flutter, Dart, REST API.
        </>
      )
    },
    {
      icon: "⚙️",
      title: "Backend & custom APIs",
      desc: (
        <>
          Design and development of robust, secure and scalable backends.<br />
          JWT authentication, dashboard, notifications and SQL database.
          <br /><span style={{ color: "#ffd24c" }}>Tech:</span> Java, Spring Boot, PostgreSQL.
        </>
      )
    },
    {
      icon: "🎨",
      title: "Custom UI",
      desc: (
        <>
          Original interface design in <b>pixel-art</b>, retro, etc.<br />
          Custom sprite design, components, avatars, micro-animations.
          <br /><span style={{ color: "#ffd24c" }}>Extra:</span> UX/UI customization, sound effects and mini-games.
        </>
      )
    }
  ]
};

const LABELS = {
  it: {
    title: "Servizi offerti",
    final: <>Tutti i servizi sono <b>personalizzabili</b>.<br />Per preventivi o proposte: usa la chat o la pagina <b>Contatti</b>!</>,
    close: "Chiudi",
  },
  en: {
    title: "Services",
    final: <>All services are <b>customizable</b>.<br />For quotes or proposals: use the chat or the <b>Contact</b> page!</>,
    close: "Close",
  }
};

// --- Stili riutilizzabili ---
const serviceItemStyle = {
  margin: "15px 0",
  borderRadius: 11,
  padding: "15px 11px 15px 11px",
  background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};
const iconStyle = {
  fontSize: 27,
  verticalAlign: "middle",
  marginRight: 8,
  marginBottom: 1
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
  marginTop: 3
};

export default function ServicesPage({ onClose, lang = "it" }) {
  const list = SERVICES[lang] || SERVICES.it;
  const labels = LABELS[lang] || LABELS.it;

  return (
    <div style={{ minWidth: 0, position: "relative", padding: "2px 0 8px 0" }}>
      {/* X CHIUSURA se richiesto dal parent */}
      {onClose && (
        <button
          className="close-x-btn"
          aria-label={labels.close}
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
        {labels.title}
      </h2>

      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        minWidth: 0
      }}>
        {list.map((serv, idx) => (
          <li key={serv.title} style={serviceItemStyle}>
            <span style={iconStyle}>{serv.icon}</span>
            <b style={titleStyle}>{serv.title}</b>
            <div style={descStyle}>{serv.desc}</div>
          </li>
        ))}
      </ul>

      <div style={{
        marginTop: 16,
        color: "#b8ffd9",
        fontSize: 15,
        lineHeight: 1.5,
        background: "rgba(40,48,44,0.19)",
        borderRadius: 9,
        padding: "9px 11px"
      }}>
        {labels.final}
      </div>
    </div>
  );
}
