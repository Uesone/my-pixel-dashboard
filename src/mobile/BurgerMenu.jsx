import React, { useState } from "react";
import "./styles/BurgerMenu.css";

// === Etichette multilingua ===
const LABELS = {
  it: {
    portfolio: "Portfolio",
    services: "Servizi",
    about: "About",
    contact: "Contatti",
    language: "Lingua",
  },
  en: {
    portfolio: "Portfolio",
    services: "Services",
    about: "About",
    contact: "Contact",
    language: "Language",
  }
};

export default function BurgerMenu({ onSelect, lang = "it", onChangeLang }) {
  const [open, setOpen] = useState(false);
  const labels = LABELS[lang] || LABELS.it;

  return (
    <div className="inline-burger-menu">
      {/* Pulsante hamburger */}
      <button
        className="burger-btn"
        aria-label={lang === "it" ? "Apri menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        tabIndex={0}
      >
        <span className="burger-icon">
          <span /> {/* linea 1 */}
          <span /> {/* linea 2 */}
        </span>
      </button>
      {/* Menu dropdown visibile se open */}
      {open && (
        <div className="burger-menu-inline">
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("portfolio"); }}>
            {labels.portfolio}
          </button>
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("services"); }}>
            {labels.services}
          </button>
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("about"); }}>
            {labels.about}
          </button>
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("contact"); }}>
            {labels.contact}
          </button>
          {/* --- Selettore lingua --- */}
          {onChangeLang && (
            <div className="menu-lang-switch" style={{
              borderTop: "1px solid #3affbb55",
              marginTop: 14,
              paddingTop: 10,
              display: "flex",
              flexDirection: "row",
              gap: 7,
              alignItems: "center",
              justifyContent: "flex-start", // <--- Qui!
              paddingLeft: 18, // <--- Allineato come menu-item
              width: "100%",
              boxSizing: "border-box",
              background: "none"
            }}>
              <button
                className={`lang-btn${lang === "it" ? " active" : ""}`}
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 16,
                  background: "none",
                  border: "none",
                  color: lang === "it" ? "#ffe066" : "#b8ffd9",
                  cursor: "pointer",
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontWeight: lang === "it" ? "bold" : "normal",
                  opacity: lang === "it" ? 1 : 0.7
                }}
                onClick={() => { setOpen(false); onChangeLang("it"); }}
                aria-label="Cambia lingua in italiano"
              >🇮🇹 IT</button>
              <button
                className={`lang-btn${lang === "en" ? " active" : ""}`}
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 16,
                  background: "none",
                  border: "none",
                  color: lang === "en" ? "#ffe066" : "#b8ffd9",
                  cursor: "pointer",
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontWeight: lang === "en" ? "bold" : "normal",
                  opacity: lang === "en" ? 1 : 0.7
                }}
                onClick={() => { setOpen(false); onChangeLang("en"); }}
                aria-label="Switch language to English"
              >🇬🇧 EN</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
