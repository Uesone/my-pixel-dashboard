// src/mobile/ContactPage.jsx

import React from "react";

// === TESTI MULTILINGUA ===
const TEXTS = {
  it: {
    title: "Contatti",
    emailLabel: "Email",
    email: "umberto12amoroso@gmail.com",
    emailCopyBtn: "Copia",
    emailCopiedAlert: "Email copiata negli appunti!",
    linkedinLabel: "LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/umberto-amoroso-387394167/",
    linkedinText: "linkedin.com/in/umberto-amoroso",
    githubLabel: "GitHub",
    githubUrl: "https://github.com/Uesone",
    githubText: "github.com/Uesone",
    instagramLabel: "Instagram",
    instagramUrl: "https://www.instagram.com/ues.one/",
    instagramText: "instagram.com/ues.one",
    finalInfo: <>
      Per richieste, collaborazioni o preventivi:<br />
      <b>Scrivimi una mail</b> o mandami un messaggio su LinkedIn / Instagram.<br />
      Rispondo sempre entro 24h!
    </>,
    close: "Chiudi",
  },
  en: {
    title: "Contact",
    emailLabel: "Email",
    email: "umberto12amoroso@gmail.com",
    emailCopyBtn: "Copy",
    emailCopiedAlert: "Email copied to clipboard!",
    linkedinLabel: "LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/umberto-amoroso-387394167/",
    linkedinText: "linkedin.com/in/umberto-amoroso",
    githubLabel: "GitHub",
    githubUrl: "https://github.com/Uesone",
    githubText: "github.com/Uesone",
    instagramLabel: "Instagram",
    instagramUrl: "https://www.instagram.com/ues.one/",
    instagramText: "instagram.com/ues.one",
    finalInfo: <>
      For inquiries, collaborations or quotes:<br />
      <b>Send me an email</b> or write on LinkedIn / Instagram.<br />
      I always reply within 24h!
    </>,
    close: "Close",
  },
};

// --- Stili riutilizzabili ---
const contactItemStyle = {
  margin: "15px 0",
  borderRadius: 11,
  padding: "15px 13px 13px 13px",
  background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  minHeight: 44
};
const iconStyle = {
  fontSize: 24,
  minWidth: 30,
  marginTop: 1,
};
const linkStyle = {
  color: "#00ffe1",
  textDecoration: "underline",
  fontFamily: "'VT323', monospace",
  fontSize: 17,
  wordBreak: "break-all",
  marginLeft: 3,
  marginRight: 3,
  transition: "color 0.14s",
};
const copyBtnStyle = {
  fontSize: 14,
  marginLeft: 8,
  background: "rgba(40,48,44,0.18)",
  color: "#ffe066",
  border: "1px solid #ffe06655",
  borderRadius: 6,
  cursor: "pointer",
  fontFamily: "'VT323', monospace",
  padding: "0 7px",
  lineHeight: "23px",
};

export default function ContactPage({ onClose, lang = "it" }) {
  const t = TEXTS[lang] || TEXTS.it;

  function copyEmail() {
    navigator.clipboard.writeText(t.email);
    alert(t.emailCopiedAlert);
  }

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

      {/* EMAIL */}
      <div style={contactItemStyle}>
        <span style={iconStyle}>📧</span>
        <div>
          <b style={{ color: "#ffd24c", fontSize: 16 }}>{t.emailLabel}</b>
          <div>
            <a
              href={`mailto:${t.email}`}
              style={linkStyle}
              tabIndex={0}
            >
              {t.email}
            </a>
            <button style={copyBtnStyle} onClick={copyEmail} title={t.emailCopyBtn}>
              {t.emailCopyBtn}
            </button>
          </div>
        </div>
      </div>

      {/* LINKEDIN */}
      <div style={contactItemStyle}>
        <span style={iconStyle}>💼</span>
        <div>
          <b style={{ color: "#ffd24c", fontSize: 16 }}>{t.linkedinLabel}</b>
          <div>
            <a
              href={t.linkedinUrl}
              style={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.linkedinText}
            </a>
          </div>
        </div>
      </div>

      {/* GITHUB */}
      <div style={contactItemStyle}>
        <span style={iconStyle}>🐙</span>
        <div>
          <b style={{ color: "#ffd24c", fontSize: 16 }}>{t.githubLabel}</b>
          <div>
            <a
              href={t.githubUrl}
              style={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.githubText}
            </a>
          </div>
        </div>
      </div>

      {/* INSTAGRAM */}
      <div style={contactItemStyle}>
        <span style={iconStyle}>📸</span>
        <div>
          <b style={{ color: "#ffd24c", fontSize: 16 }}>{t.instagramLabel}</b>
          <div>
            <a
              href={t.instagramUrl}
              style={linkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.instagramText}
            </a>
          </div>
        </div>
      </div>

      {/* INFO FINALE */}
      <div style={{
        marginTop: 17,
        color: "#b8ffd9",
        fontSize: 15,
        lineHeight: 1.5,
        background: "rgba(40,48,44,0.19)",
        borderRadius: 9,
        padding: "9px 11px"
      }}>
        {t.finalInfo}
      </div>
    </div>
  );
}
