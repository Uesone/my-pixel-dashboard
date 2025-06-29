// src/components/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";
import it from "../locales/it.json";
import en from "../locales/en.json";

// Supporta tutte le lingue che vuoi!
const LANGUAGES = { it, en };

// Crea il context React
const LanguageContext = createContext();

/**
 * LanguageProvider: wrap il tuo <App /> per abilitare il context lingua.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("it"); // Default italiano

  /**
   * Funzione t(key): recupera la traduzione usando dot notation, es: t("projects.title")
   * Fallback automatico su inglese se chiave mancante
   */
  const t = (key) => {
    const keys = key.split(".");
    let value = LANGUAGES[language];
    for (let k of keys) value = value?.[k];
    if (value === undefined) {
      // fallback inglese
      value = LANGUAGES["en"];
      for (let k of keys) value = value?.[k];
    }
    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage: hook per accedere a { language, setLanguage, t }
 */
export function useLanguage() {
  return useContext(LanguageContext);
}
