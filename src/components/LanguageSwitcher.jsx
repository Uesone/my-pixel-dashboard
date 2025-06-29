// src/components/LanguageSwitcher.jsx
import React from "react";
import { useLanguage } from "./LanguageContext";

// Icone bandiera pixel art (personalizza con le tue!)
import itFlag from "../assets/ui/flags/it.png";
import enFlag from "../assets/ui/flags/en.png";

// Mappa codici -> asset/label
const flagIcons = { it: itFlag, en: enFlag };
const languageNames = { it: "ITA", en: "ENG" };

/**
 * LanguageSwitcher: bottone per cambiare lingua (pixel art)
 *
 * Props:
 *   - position: { top, right } (default: angolo in alto a dx)
 *   - style: override css opzionale
 *   - showLabel: true per mostrare sigla (ITA/ENG)
 */
const LanguageSwitcher = ({
  position = { top: 13, right: 13 },
  style = {},
  showLabel = false,
}) => {
  const { language, setLanguage } = useLanguage();

  // Prossima lingua da switchare (qui solo it/en)
  const nextLang = language === "it" ? "en" : "it";

  return (
    <button
      onClick={() => setLanguage(nextLang)}
      aria-label={nextLang === "it" ? "Passa a Italiano" : "Switch to English"}
      style={{
        position: "absolute",
        top: position.top,
        right: position.right,
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 50,
        padding: 0,
        ...style,
      }}
      title={nextLang === "it" ? "Cambia lingua: Italiano" : "Change language: English"}
    >
      <img
        src={flagIcons[nextLang]}
        alt={languageNames[nextLang]}
        width={28}
        height={20}
        style={{ imageRendering: "pixelated", verticalAlign: "middle" }}
        draggable={false}
      />
      {showLabel && (
        <span
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 18,
            color: "#322510",
            marginLeft: 7,
            letterSpacing: 1.3,
            verticalAlign: "middle",
            userSelect: "none"
          }}
        >
          {languageNames[nextLang]}
        </span>
      )}
    </button>
  );
};

export default LanguageSwitcher;
