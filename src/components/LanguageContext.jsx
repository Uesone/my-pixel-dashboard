// src/components/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import it from "../locales/it.json";
import en from "../locales/en.json";

// === AGGIUNGI QUI ALTRE LINGUE SE VUOI (es: import fr from "../locales/fr.json") ===
const LANGUAGES = { it, en };

// Crea il context globale
const LanguageContext = createContext();

/**
 * Rileva la lingua preferita: localStorage → browser → fallback inglese
 */
function getDefaultLanguage() {
  // 1. Preferenza salvata dall’utente
  try {
    const saved = localStorage.getItem("language");
    if (saved && LANGUAGES[saved]) return saved;
  } catch (e) {
    // LocalStorage non disponibile
  }

  // 2. Prova a rilevare la lingua del browser
  const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (browserLang.startsWith("it")) return "it";
  if (browserLang.startsWith("en")) return "en";
  // Aggiungi altre lingue se necessario qui!

  // 3. Default inglese
  return "en";
}

/**
 * LanguageProvider: wrappa il tuo <App /> per abilitare il context lingua.
 */
export function LanguageProvider({ children }) {
  // Stato lingua inizializzato col rilevamento automatico
  const [language, setLanguage] = useState(getDefaultLanguage());

  // Ogni volta che la lingua cambia, salva in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch (e) {
      // Ignora se localStorage non disponibile
    }
  }, [language]);

  /**
   * t(key): traduce usando dot notation, fallback su inglese
   * Esempio: t("about.title") → "About"
   */
  function t(key) {
    const keys = key.split(".");
    let value = LANGUAGES[language];
    for (let k of keys) value = value?.[k];
    if (value === undefined) {
      // Fallback inglese se mancante
      value = LANGUAGES["en"];
      for (let k of keys) value = value?.[k];
    }
    return value !== undefined ? value : key;
  }

  // Passa { language, setLanguage, t } tramite context
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage: hook custom per accedere a { language, setLanguage, t }
 * Esempio: const { language, setLanguage, t } = useLanguage();
 */
export function useLanguage() {
  return useContext(LanguageContext);
}
