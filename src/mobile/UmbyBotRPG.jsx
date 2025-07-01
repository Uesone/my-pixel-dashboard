// /src/mobile/UmbyBotRPG.jsx
import React, { useState, useEffect, useRef } from "react";
import DialogueBox from "./DialogueBox";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";
import umbybotTalking from "./assets/sprites/umbybot-talking.png";
import "./styles/rpg-mobile.css";

/**
 * Hook typewriter con animazione bocca: scrive il testo gradualmente e anima la bocca con frequenze diverse.
 */
function useTypewriterWithMouth(text, active, textSpeed = 60, mouthSpeed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [isMouthOpen, setIsMouthOpen] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      setIsMouthOpen(false);
      return;
    }

    setDisplayed("");
    let i = 0;
    let mouthOpen = false;

    const textInterval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(textInterval);
        cleanupTimeout = setTimeout(() => setIsMouthOpen(false), 250);
      }
    }, textSpeed);

    const mouthInterval = setInterval(() => {
      mouthOpen = !mouthOpen;
      setIsMouthOpen(mouthOpen);
    }, mouthSpeed);

    let cleanupTimeout;

    return () => {
      clearInterval(textInterval);
      clearInterval(mouthInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      setIsMouthOpen(false);
    };
  }, [text, active, textSpeed, mouthSpeed]);

  return [displayed, isMouthOpen];
}

// ====== Funzione per lingua browser (solo IT/EN, fallback EN) ======
function getDefaultLang() {
  const lang = navigator.language || "en";
  if (lang.startsWith("it")) return "it";
  return "en"; // fallback universale
}

// ====== Stato iniziale localizzato ======
const INITIAL_HISTORY = {
  it: [
    {
      user: "Chi sei?",
      bot: "Sono Golem, assistente del mio maestro Umberto Amoroso! Vuoi scoprire i progetti e i segreti del mio Maestro?"
    }
  ],
  en: [
    {
      user: "Who are you?",
      bot: "I'm Golem, assistant to my master Umberto Amoroso! Would you like to discover my master's projects or his secrets?"
    }
  ]
};

// ====== Messaggi di errore localizzati ======
const ERRORS = {
  it: {
    connection: "Errore di collegamento alle caldaie OpenAI! ",
    fallback: "Errore di collegamento alle caldaie OpenAI! Riprova tra poco!",
    unknown: "Errore sconosciuto",
    onlyEnIt: "Posso rispondere solo in italiano o inglese. Per favore, scrivi in una di queste lingue!"
  },
  en: {
    connection: "Connection error with the OpenAI boilers! ",
    fallback: "Connection error with the OpenAI boilers! Please try again soon!",
    unknown: "Unknown error",
    onlyEnIt: "I can only reply in English or Italian. Please write in one of these languages!"
  }
};

// ====== Parole chiave NON ambigue per rilevamento lingua ======
const enWords = [
  "what", "how", "can", "could", "do", "does", "did", "is", "are", "was", "were",
  "his", "where", "help", "tell", "about", "contact", "develop", "who",
  "hello", "hi", "hey", "greetings", "thanks", "thank you", "please", "info", "information",
  "collaborate", "hire", "job", "experience", "skills", "message", "leave", "find",
  "discover", "explore", "see"
];
const itWords = [
  "che", "come", "può", "puoi", "potresti", "fare", "fa", "fatto", "è", "sono", "era", "erano",
  "suo", "sua", "dove", "aiuto", "raccontami", "contatto", "sviluppare", "chi",
  "ciao", "salve", "buongiorno", "buonasera", "grazie", "per favore", "informazioni",
  "collaborare", "assumere", "lavoro", "esperienza", "competenze", "messaggio",
  "lasciare", "trovare", "scoprire", "esplora", "vedere", "come", "stai"
];

// ====== Suggerimenti localizzati ======
const suggestions = {
  it: [
    "Che progetti ha sviluppato Umberto?",
    "Qual è il suo stack tecnologico?",
    "Può aiutarmi a sviluppare un'app?",
    "Come posso contattarlo?",
    "Raccontami del progetto Pixel Dashboard",
    "Dove posso vedere i suoi lavori su GitHub?"
  ],
  en: [
    "What projects has Umberto worked on?",
    "What's his tech stack?",
    "Can he help me build an app?",
    "How can I contact him?",
    "Tell me about the Pixel Dashboard project",
    "Where can I see his work on GitHub?"
  ]
};

export default function UmbyBotRPG({
  spriteSize = 208,
  spriteMarginTop = 0,
  textSpeed = 30,
  mouthSpeed = 110
}) {
  // ======= Gestione lingua =======
  const [userLang, setUserLang] = useState(getDefaultLang());

  // ======= Inizializza conversazione in lingua =======
  const [history, setHistory] = useState(INITIAL_HISTORY[userLang] || INITIAL_HISTORY["en"]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState(null);

  // ======= Suggerimento dinamico: indice ruotato ogni 7s =======
  const tips = suggestions[userLang] || suggestions["en"];
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * tips.length));

  useEffect(() => {
    // Ogni 7 secondi, cambia la tip (solo se più di una)
    if (tips.length <= 1) return;
    const interval = setInterval(() => {
      setTipIndex(idx => (idx + 1) % tips.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [userLang]); // si resetta solo se cambia lingua

  useEffect(() => {
    // All'avvio/cambio lingua, parti da un indice random
    setTipIndex(Math.floor(Math.random() * tips.length));
  }, [userLang]);

  // ======= LocalStorage: ripristina conversazione all'avvio =======
  useEffect(() => {
    const saved = localStorage.getItem("umbybot-history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        setCurrentIdx(parsed.length - 1);
      } catch (e) {
        localStorage.removeItem("umbybot-history");
      }
    }
  }, []);

  // ======= Salva la conversazione ad ogni modifica =======
  useEffect(() => {
    localStorage.setItem("umbybot-history", JSON.stringify(history));
  }, [history]);

  // ======= Scroll sempre in fondo =======
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history.length]);

  // ======= Gestione invio messaggi (con lingua rilevata sincrona!) =======
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setError(null);
    const domanda = input.trim();

    // --- Rileva la lingua PRIMA di aggiornare lo stato (così è sincronizzata per errori/suggerimenti!) ---
    const isEnglish = new RegExp("\\b(" + enWords.join("|") + ")\\b", "i").test(domanda);
    const isItalian = new RegExp("\\b(" + itWords.join("|") + ")\\b", "i").test(domanda);

    let detectedLang = userLang;
    if (isEnglish) detectedLang = "en";
    else if (isItalian) detectedLang = "it";
    else detectedLang = "en"; // fallback sempre inglese

    setUserLang(detectedLang);

    setInput("");
    setLoading(true);

    const newHistory = [...history, { user: domanda, bot: null }];
    setHistory(newHistory);
    setCurrentIdx(newHistory.length - 1);

    // Se la lingua non è IT/EN mostra warning e rispondi solo in EN
    const isKnownLang = detectedLang === "it" || detectedLang === "en";
    const lang = isKnownLang ? detectedLang : "en";

    if (!isKnownLang) {
      const warningMsg = ERRORS[lang].onlyEnIt;
      const updatedHistory = [
        ...newHistory.slice(0, -1),
        { user: domanda, bot: warningMsg }
      ];
      setHistory(updatedHistory);
      setCurrentIdx(updatedHistory.length - 1);
      setLoading(false);
      setIsBotTyping(true);
      return;
    }

    // ====== Chiamata API OpenAI ======
    try {
      const res = await fetch("/api/umbybot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: domanda }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || ERRORS[lang].unknown);

      const updatedHistory = [
        ...newHistory.slice(0, -1),
        { user: domanda, bot: data.text }
      ];
      setHistory(updatedHistory);
      setCurrentIdx(updatedHistory.length - 1);
      setIsBotTyping(true);
    } catch (err) {
      setError(ERRORS[lang].connection + (err.message || ERRORS[lang].unknown));
      const updatedHistory = [
        ...newHistory.slice(0, -1),
        { user: domanda, bot: ERRORS[lang].fallback }
      ];
      setHistory(updatedHistory);
      setCurrentIdx(updatedHistory.length - 1);
      setIsBotTyping(true);
    } finally {
      setLoading(false);
    }
  }

  // ======= Gestione typewriter & bocca =======
  const current = history[currentIdx];
  const isLast = currentIdx === history.length - 1;
  const showTypewriter = isLast && isBotTyping;
  const [botText, isMouthOpen] = useTypewriterWithMouth(
    current.bot || "",
    showTypewriter,
    textSpeed,
    mouthSpeed
  );

  useEffect(() => {
    if (showTypewriter && botText === current.bot) {
      const t = setTimeout(() => setIsBotTyping(false), 400);
      return () => clearTimeout(t);
    }
  }, [botText, showTypewriter, current.bot]);

  const goPrev = () => setCurrentIdx(idx => Math.max(0, idx - 1));
  const goNext = () => setCurrentIdx(idx => Math.min(history.length - 1, idx + 1));

  // ======= RENDER =======
  return (
    <div className="device-frame">
      <div className="device-inner-glass">
        <div className="umbybot-mobile-wrapper">
          {/* === Sprite animato === */}
          <div className="umbybot-sprite-box is-centered" style={{ marginTop: spriteMarginTop }}>
            <div className="umbybot-sprite-fix">
              <img
                src={showTypewriter && isMouthOpen ? umbybotTalking : umbybotIdle}
                alt="Golem pixel NPC"
                className="umbybot-sprite"
                draggable={false}
                style={{ width: spriteSize, height: spriteSize, imageRendering: "pixelated" }}
              />
            </div>
          </div>

          {/* === Dialogue Box === */}
          <div className="dialogue-box-bleed">
            <DialogueBox
              npcName="Golem"
              dialogue={
                <>
                  <div className="dialogue-user-question">
                    <b>{userLang === "it" ? "Tu" : "You"}:</b> {current.user}
                  </div>
                  <div className="dialogue-bot-reply">
                    <span className="bot-label">Golem:</span> {botText}
                  </div>
                  {error && (
                    <div style={{ color: "#ff7d7d", fontSize: 15, marginTop: 6 }}>{error}</div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              }
            />
          </div>

          {/* === Navigazione dialoghi === */}
          <div className="dialogue-navigation">
            <button type="button" onClick={goPrev} disabled={currentIdx === 0} className="nes-btn">
              <span style={{ display: "inline-block", transform: "scaleX(-1)", fontSize: 15 }}>➤</span>
            </button>
            <span style={{ fontFamily: "monospace", fontSize: 16 }}>{currentIdx + 1} / {history.length}</span>
            <button type="button" onClick={goNext} disabled={currentIdx === history.length - 1} className="nes-btn">
              <span style={{ fontSize: 15 }}>➤</span>
            </button>
          </div>
        </div>

        {/* === Input chat sempre a fondo === */}
        <form className="input-chatbox" onSubmit={handleSend} autoComplete="off">
          <input
            className="chat-input-steampunk nes-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={loading
              ? (userLang === "it" ? "Attendi risposta..." : "Awaiting reply...")
              : (userLang === "it"
                ? "Fai una domanda su Umberto o i suoi progetti..."
                : "Ask something about Umberto or his work...")}
            disabled={loading}
            style={{ flex: 1, fontSize: 18 }}
            autoFocus
          />
          <button
            className="chat-send-btn nes-btn is-success"
            type="submit"
            disabled={loading || !input.trim()}
            style={{ fontSize: 22 }}
          >
            ➤
          </button>
        </form>

        {/* === Suggerimento dinamico che ruota === */}
        <div style={{ padding: "8px 10px 3px 10px", fontSize: 13, color: "#b8ffd9bb", textAlign: "center" }}>
          {userLang === "it"
            ? <>Prova a chiedere: <b>{tips[tipIndex]}</b></>
            : <>Try asking: <b>{tips[tipIndex]}</b></>}
        </div>
      </div>
    </div>
  );
}
