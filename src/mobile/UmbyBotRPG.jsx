import React, { useState, useEffect, useRef } from "react";
import DialogueBox from "./DialogueBox";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";
import umbybotTalking from "./assets/sprites/umbybot-talking.png";
import "./styles/rpg-mobile.css";

// ==== Hook animazione typewriter + bocca ====
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

// ==== Costanti e dati base ====
function getDefaultLang() {
  const lang = navigator.language || "en";
  if (lang.startsWith("it")) return "it";
  return "en";
}
const INITIAL_HISTORY = {
  it: [{
    user: "Chi sei?",
    bot: "Sono Golem, fedele assistente del mio maestro e creatore Umberto Amoroso. Puoi chiedermi tutto quello che vuoi sui suoi progetti, competenze o esperienze! Scegli bene le tue domande: posso rispondere fino a 12 al giorno, prima che i miei ingranaggi si surriscaldino!"
  }],
  en: [{
    user: "Who are you?",
    bot: "I'm Golem, the loyal assistant of my master and creator, Umberto Amoroso. You can ask me anything about his projects, skills, or experience! Choose your questions wisely: I can answer up to 12 per day before my gears overheat!"
  }]
};
const ERRORS = {
  it: {
    connection: "Errore di collegamento alle caldaie OpenAI! ",
    fallback: "Errore di collegamento alle caldaie OpenAI! Riprova tra poco!",
    unknown: "Errore sconosciuto",
    onlyEnIt: "Posso rispondere solo in italiano o inglese. Per favore, scrivi in una di queste lingue!",
    limitReached: "Hai raggiunto il limite giornaliero di 12 domande. Torna domani per continuare la conversazione!",
    tooLong: "La domanda è troppo lunga! (max 200 caratteri)"
  },
  en: {
    connection: "Connection error with the OpenAI boilers! ",
    fallback: "Connection error with the OpenAI boilers! Please try again soon!",
    unknown: "Unknown error",
    onlyEnIt: "I can only reply in English or Italian. Please write in one of these languages!",
    limitReached: "You’ve reached your daily limit of 12 questions. Come back tomorrow to continue the conversation!",
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
const DAILY_QUESTION_LIMIT = 12;
const STORAGE_KEY = "umbybot-usage";
const MAX_INPUT_CHARS = 200;

// ============== COMPONENTE PRINCIPALE ==============
export default function UmbyBotRPG({
  spriteSize = 208,
  spriteMarginTop = 0,
  textSpeed = 30,
  mouthSpeed = 110
}) {
  // ==== Lingua, stato conversazione, contatori ====
  const [userLang, setUserLang] = useState(getDefaultLang());
  const [history, setHistory] = useState(INITIAL_HISTORY[userLang] || INITIAL_HISTORY["en"]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState(null);

  // ==== Limite domande e stato ====
  const [questionsLeft, setQuestionsLeft] = useState(DAILY_QUESTION_LIMIT);
  const [limitReached, setLimitReached] = useState(false);

  // === Aggiorna limite domande (all'avvio e ogni domanda) ===
  useEffect(() => {
    updateUsage();
  }, []);

  // Reset se passate 24h dall’ultima domanda
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

  // ==== Suggerimento dinamico che ruota ====
  const tips = suggestions[userLang] || suggestions["en"];
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * tips.length));
  useEffect(() => {
    if (tips.length <= 1) return;
    const interval = setInterval(() => {
      setTipIndex(idx => (idx + 1) % tips.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [userLang]);
  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * tips.length));
  }, [userLang]);

  // ==== LocalStorage: ripristina conversazione ====
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

  // ==== Salva la conversazione ====
  useEffect(() => {
    localStorage.setItem("umbybot-history", JSON.stringify(history));
  }, [history]);

  // ==== Scroll sempre in fondo ====
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history.length]);

  // ==== Gestione invio (lingua, limite domande, limite caratteri) ====
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading || limitReached) return;
    setError(null);
    const domanda = input.trim();

    // Check: limite caratteri
    if (domanda.length > MAX_INPUT_CHARS) {
      setError(ERRORS[userLang].tooLong);
      return;
    }

    // Rileva lingua
    const isEnglish = new RegExp("\\b(" + enWords.join("|") + ")\\b", "i").test(domanda);
    const isItalian = new RegExp("\\b(" + itWords.join("|") + ")\\b", "i").test(domanda);
    let detectedLang = userLang;
    if (isEnglish) detectedLang = "en";
    else if (isItalian) detectedLang = "it";
    else detectedLang = "en";
    setUserLang(detectedLang);

    setInput("");
    setLoading(true);

    // === Limite domande: aggiorna storage ===
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

    // === Invio domanda al backend ===
    const newHistory = [...history, { user: domanda, bot: null }];
    setHistory(newHistory);
    setCurrentIdx(newHistory.length - 1);

    // Lingua nota?
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

  // ==== Typewriter & bocca ====
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

  // ============= RENDER =============
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

        {/* === Counter domande rimaste === */}
        <div style={{ padding: "2px 10px 3px 10px", fontSize: 13, color: "#ffe8ad", textAlign: "center", fontWeight: 500 }}>
          {userLang === "it"
            ? `Domande rimaste oggi: ${questionsLeft} / ${DAILY_QUESTION_LIMIT}`
            : `Questions left today: ${questionsLeft} / ${DAILY_QUESTION_LIMIT}`}
        </div>
{/* === Input chat === */}
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
              ? "Fai una domanda su Umberto o i suoi progetti..."
              : "Ask something about Umberto or his work...")
      }
      disabled={loading || limitReached}
      style={{
        flex: 1,
        fontSize: 18,
        width: "100%",
        paddingRight: 60,  // Lascia spazio al counter!
      }}
      autoFocus
    />
    {/* Counter caratteri dentro l'input */}
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
