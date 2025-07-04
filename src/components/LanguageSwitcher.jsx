// src/components/LanguageSwitcher.jsx
import React from "react";
import { useLanguage } from "./LanguageContext";

// Icone bandiera pixel art (formato ottimizzato .webp 64x64)
import itFlag from "../assets/ui/flags/it-64.webp";
import enFlag from "../assets/ui/flags/en-64.webp";

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
        width={32}         // Puoi aumentare a 36/40 per più impatto, o scendere a 24 se vuoi più compattezza
        height={20}        // Mantieni il rapporto originale della bandiera
        style={{
          imageRendering: "pixelated",
          verticalAlign: "middle",
          boxShadow: "0 1px 0 #fff8, 0 0 1px #a77 inset", // opzionale, leggero bordo
          borderRadius: 2
        }}
        draggable={false}
        loading="lazy"
        decoding="async"
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
