import React, { useState, useEffect, useRef, useCallback } from "react";
import DialogueBox from "./DialogueBox.jsx";
import BotAnimato from "./BotAnimato.jsx";
import BurgerMenu from "./BurgerMenu.jsx";
import PortfolioPage from "./PortfolioPage.jsx";
import ServicesPage from "./ServicePage.jsx";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";
import "./styles/rpg-mobile.css";

// === HOOK: animazione typewriter con callback quando termina ===
function useTypewriterText(text, active, textSpeed = 30, onEnd) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      if (onEnd) onEnd();
      return;
    }
    setDisplayed("");
    let i = 0;
    const textInterval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(textInterval);
        if (onEnd) onEnd();
      }
    }, textSpeed);
    return () => clearInterval(textInterval);
  }, [text, active, textSpeed, onEnd]);
  return displayed;
}

// === Funzione: trasforma link in <a> cliccabili nel testo ===
function formatTextWithLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#00ffe1",
          textDecoration: "underline",
          fontFamily: "'VT323', monospace",
          wordBreak: "break-all",
          textShadow: "1px 1px #333",
          paddingLeft: 2, paddingRight: 2
        }}
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

function getDefaultLang() {
  const lang = navigator.language || "en";
  if (lang.startsWith("it")) return "it";
  return "en";
}

// === Costanti iniziali per lingua, errori, suggerimenti ===
const INITIAL_HISTORY = {
  it: [{
    user: "Chi sei?",
    bot:
      "Sono Golem, fedele assistente del mio maestro e creatore Umberto Amoroso. Puoi chiedermi tutto quello che vuoi sui suoi progetti, competenze o esperienze! " +
      "Posso rispondere fino a 10 domande al giorno, prima che i miei ingranaggi si surriscaldino! " +
      "Se hai fretta o vuoi solo un riassunto veloce, tocca ☰ in alto a sinistra: nel menu troverai sezioni rapide e riassuntive come Portfolio, Servizi, About e Contatti."
  }],
  en: [{
    user: "Who are you?",
    bot:
      "I'm Golem, the loyal assistant of my master and creator, Umberto Amoroso. You can ask me anything about his projects, skills, or experience! " +
      "I can answer up to 10 questions per day before my gears overheat! " +
      "If you’re in a hurry or just want a quick overview, tap the ☰ menu at the top left: there you’ll find quick summary sections like Portfolio, Services, About and Contacts."
  }]
};

const ERRORS = {
  it: {
    connection: "Errore di collegamento alle caldaie OpenAI! ",
    fallback: "Errore di collegamento alle caldaie OpenAI! Riprova tra poco!",
    unknown: "Errore sconosciuto",
    onlyEnIt: "Posso rispondere solo in italiano o inglese. Per favore, scrivi in una di queste lingue!",
    limitReached: "Hai raggiunto il limite giornaliero di 10 domande. Torna domani per continuare la conversazione!",
    tooLong: "La domanda è troppo lunga! (max 200 caratteri)"
  },
  en: {
    connection: "Connection error with the OpenAI boilers! ",
    fallback: "Connection error with the OpenAI boilers! Please try again soon!",
    unknown: "Unknown error",
    onlyEnIt: "I can only reply in English or Italian. Please write in one of these languages!",
    limitReached: "You’ve reached your daily limit of 10 questions. Come back tomorrow to continue the conversation!",
    tooLong: "Your question is too long! (max 200 characters)"
  }
};
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
const suggestions = {
  it: [
    "Che progetti ha sviluppato Umberto?",
    "Qual è il suo stack tecnologico?",
    "Può aiutarmi a sviluppare un'app?",
    "Come posso contattarlo?",
    "Raccontami del progetto Pixel Dashboard",
    "Dove posso vedere i suoi lavori su GitHub?",
  ],
  en: [
    "What projects has Umberto worked on?",
    "What's his tech stack?",
    "Can he help me build an app?",
    "How can I contact him?",
    "Tell me about the Pixel Dashboard project",
    "Where can I see his work on GitHub?",
  ]
};

const DAILY_QUESTION_LIMIT = 10;
const STORAGE_KEY = "umbybot-usage";
const MAX_INPUT_CHARS = 200;

export default function UmbyBotRPG({
  spriteSize = 208,
  spriteMarginTop = 0,
  textSpeed = 30,
}) {
  // === Stato del menu laterale/hamburger ===
  const [page, setPage] = useState(null);

  // === Stato chat ===
  const [userLang, setUserLang] = useState(getDefaultLang());
  const [history, setHistory] = useState(INITIAL_HISTORY[userLang] || INITIAL_HISTORY["en"]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState(null);

  // === Stato limiti domande giornaliere ===
  const [questionsLeft, setQuestionsLeft] = useState(DAILY_QUESTION_LIMIT);
  const [limitReached, setLimitReached] = useState(false);

  // === Gestione limiti domande giornalieri su localStorage ===
  useEffect(() => { updateUsage(); }, []);
  function updateUsage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        if (now - parsed.lastTime > 24 * 60 * 60 * 1000) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: 0, lastTime: now }));
          setQuestionsLeft(DAILY_QUESTION_LIMIT);
          setLimitReached(false);
        } else {
          setQuestionsLeft(Math.max(0, DAILY_QUESTION_LIMIT - parsed.count));
          setLimitReached(parsed.count >= DAILY_QUESTION_LIMIT);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setQuestionsLeft(DAILY_QUESTION_LIMIT);
        setLimitReached(false);
      }
    } else {
      setQuestionsLeft(DAILY_QUESTION_LIMIT);
      setLimitReached(false);
    }
  }

  // === Gestione suggerimenti randomici che ruotano ===
  const tips = suggestions[userLang] || suggestions["en"];
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * tips.length));
  useEffect(() => {
    if (tips.length <= 1) return;
    const interval = setInterval(() => {
      setTipIndex(idx => (idx + 1) % tips.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [userLang]);
  useEffect(() => { setTipIndex(Math.floor(Math.random() * tips.length)); }, [userLang]);

  // === Ripristina chat precedente se presente ===
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
  useEffect(() => {
    localStorage.setItem("umbybot-history", JSON.stringify(history));
  }, [history]);

  // === Scroll sempre in fondo dopo nuova risposta ===
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history.length]);

  // === Inizia/ferma animazione bocca bot ===
  const handleTypewriterStart = useCallback(() => setIsBotTyping(true), []);
  const handleTypewriterEnd = useCallback(() => setIsBotTyping(false), []);

  // === Gestione invio domanda/chat ===
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading || limitReached) return;
    setError(null);
    const domanda = input.trim();

    if (domanda.length > MAX_INPUT_CHARS) {
      setError(ERRORS[userLang].tooLong);
      return;
    }

    // Rileva lingua input
    const isEnglish = new RegExp("\\b(" + enWords.join("|") + ")\\b", "i").test(domanda);
    const isItalian = new RegExp("\\b(" + itWords.join("|") + ")\\b", "i").test(domanda);
    let detectedLang = userLang;
    if (isEnglish) detectedLang = "en";
    else if (isItalian) detectedLang = "it";
    else detectedLang = "en";
    setUserLang(detectedLang);

    setInput("");
    setLoading(true);

    // === Update usage ===
    const saved = localStorage.getItem(STORAGE_KEY);
    let newCount = 1;
    let now = Date.now();
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (now - parsed.lastTime > 24 * 60 * 60 * 1000) {
          newCount = 1;
        } else {
          newCount = parsed.count + 1;
          if (newCount > DAILY_QUESTION_LIMIT) {
            setLimitReached(true);
            setQuestionsLeft(0);
            setLoading(false);
            setError(ERRORS[detectedLang].limitReached);
            return;
          }
        }
      } catch {
        newCount = 1;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, lastTime: now }));
    setQuestionsLeft(Math.max(0, DAILY_QUESTION_LIMIT - newCount));
    setLimitReached(newCount >= DAILY_QUESTION_LIMIT);

    // === Aggiorna history utente ===
    const newHistory = [...history, { user: domanda, bot: null }];
    setHistory(newHistory);
    setCurrentIdx(newHistory.length - 1);

    // === Check lingua supportata ===
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
      return;
    }

    // === CHIAMATA API ===
    try {
      const res = await fetch(import.meta.env.VITE_UMBYBOT_API_URL, {
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
    } catch (err) {
      setError(ERRORS[lang].connection + (err.message || ERRORS[lang].unknown));
      const updatedHistory = [
        ...newHistory.slice(0, -1),
        { user: domanda, bot: ERRORS[lang].fallback }
      ];
      setHistory(updatedHistory);
      setCurrentIdx(updatedHistory.length - 1);
    } finally {
      setLoading(false);
    }
  }

  // === Sincronizza animazione typewriter e bocca bot ===
  const current = history[currentIdx];
  const isLast = currentIdx === history.length - 1;

  const botText = useTypewriterText(
    current.bot || "",
    isLast && !!current.bot,
    textSpeed,
    handleTypewriterEnd
  );
  useEffect(() => {
    if (isLast && !!current.bot) handleTypewriterStart();
  }, [current.bot, isLast, handleTypewriterStart]);

  const goPrev = () => setCurrentIdx(idx => Math.max(0, idx - 1));
  const goNext = () => setCurrentIdx(idx => Math.min(history.length - 1, idx + 1));

  // ===============================
  // === COMPONENTE PRINCIPALE ====
  // ===============================
  return (
    <div className="device-inner-glass">
      {/* === MENU BURGER FIXED === */}
      <BurgerMenu onSelect={setPage} />

      {/* === OVERLAY PAGINE BURGER (PORTFOLIO, ABOUT, ECC.) === */}
      {page && (
        <div className="burger-page-overlay">
          <div className="burger-page-content">
            {/* X sobria */}
            <button
              onClick={() => setPage(null)}
              className="close-x-btn"
              aria-label="Chiudi pagina"
              tabIndex={0}
            >×</button>
            {page === "portfolio" && <PortfolioPage />}
            {page === "services" && <ServicesPage />}
            {page === "about" && <AboutPage />}
            {page === "contact" && <ContactPage />}
          </div>
        </div>
      )}

      <div className="umbybot-mobile-wrapper">
        {/* === SPRITE BOT PIXEL ANIMATO === */}
        <div className="umbybot-sprite-box is-centered" style={{ marginTop: spriteMarginTop }}>
          <div className="umbybot-sprite-fix">
            <BotAnimato talking={isLast && isBotTyping} size={spriteSize} />
          </div>
        </div>

        {/* === DIALOGUE BOX === */}
        <div className="dialogue-box-bleed">
          <DialogueBox
            npcName="Golem"
            dialogue={
              <>
                <div className="dialogue-user-question">
                  <b>{userLang === "it" ? "Tu" : "You"}:</b> {current.user}
                </div>
                <div className="dialogue-bot-reply">
                  <span className="bot-label">Golem:</span> {formatTextWithLinks(botText)}
                </div>
                {error && (
                  <div style={{ color: "#ff7d7d", fontSize: 15, marginTop: 6 }}>{error}</div>
                )}
                <div ref={messagesEndRef} />
              </>
            }
          />
        </div>

        {/* === NAVIGAZIONE DOMANDE/RISPOSTE (CRONOLOGIA) === */}
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

      {/* === CONTATORE DOMANDE RIMASTE (LIMITE GIORNALIERO) === */}
      <div style={{ padding: "2px 10px 3px 10px", fontSize: 13, color: "#ffe8ad", textAlign: "center", fontWeight: 500 }}>
        {userLang === "it"
          ? `Domande rimaste oggi: ${questionsLeft} / ${DAILY_QUESTION_LIMIT}`
          : `Questions left today: ${questionsLeft} / ${DAILY_QUESTION_LIMIT}`}
      </div>

      {/* === INPUT CHAT UTENTE === */}
      <form className="input-chatbox" onSubmit={handleSend} autoComplete="off">
        <div style={{ position: "relative", width: "100%" }}>
          <input
            className="chat-input-steampunk nes-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={MAX_INPUT_CHARS}
            placeholder={
              limitReached
                ? (userLang === "it"
                  ? "Limite raggiunto, torna domani!"
                  : "Limit reached, come back tomorrow!")
                : loading
                  ? (userLang === "it" ? "Attendi risposta..." : "Awaiting reply...")
                  : (userLang === "it"
                    ? "Fai una domanda su Umberto..."
                    : "Ask something about Umberto...")
            }
            disabled={loading || limitReached}
            style={{
              flex: 1,
              fontSize: 16,
              width: "100%",
              paddingRight: 60,
            }}
            autoFocus
          />
          {/* Char counter */}
          <span
            style={{
              position: "absolute",
              right: 16,
              bottom: 18,
              fontSize: 13,
              color:
                input.length >= MAX_INPUT_CHARS
                  ? "#ff6c6c"
                  : input.length >= MAX_INPUT_CHARS - 10
                    ? "#ffb488"
                    : "#b8ffd9cc",
              pointerEvents: "none",
              fontFamily: "inherit",
              userSelect: "none",
              fontWeight: 600,
              letterSpacing: 0.2,
              background: "rgba(28,16,8,0.07)",
              padding: "0 4px",
              borderRadius: 7,
              zIndex: 10
            }}
          >
            {input.length}/{MAX_INPUT_CHARS}
          </span>
        </div>
        <button
          className="chat-send-btn nes-btn is-success"
          type="submit"
          disabled={loading || limitReached || !input.trim()}
          style={{ fontSize: 22 }}
        >
          ➤
        </button>
      </form>

      {/* === SUGGERIMENTI DOMANDE === */}
      <div style={{ padding: "8px 10px 3px 10px", fontSize: 13, color: "#b8ffd9bb", textAlign: "center" }}>
        {userLang === "it"
          ? <>Prova a chiedere: <b>{tips[tipIndex]}</b></>
          : <>Try asking: <b>{tips[tipIndex]}</b></>}
      </div>
    </div>
  );
}
