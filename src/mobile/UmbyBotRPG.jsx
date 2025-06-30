// /src/mobile/UmbyBotRPG.jsx
import React, { useState, useEffect, useRef } from "react";
import DialogueBox from "./DialogueBox";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";
import umbybotTalking from "./assets/sprites/umbybot-talking.png";
import "./styles/rpg-mobile.css";

/**
 * Hook typewriter con bocca: fa scrivere il testo gradualmente e alterna lo stato della bocca.
 */
function useTypewriterWithMouth(text, active, speed = 24) {
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
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      mouthOpen = !mouthOpen;
      setIsMouthOpen(mouthOpen);
      if (i >= text.length) {
        clearInterval(interval);
        setIsMouthOpen(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, active, speed]);

  return [displayed, isMouthOpen];
}

// MOCK risposte random per demo
const MOCK_REPLIES = [
  "Benvenuto nella mia officina a vapore! Cosa vuoi sapere, viaggiatore?",
  "Ogni progetto è un ingranaggio nella macchina del destino.",
  "La mia caldaia oggi fa più fumo del solito, chiedi pure!",
  "Per contattarmi, basta un colpo di telegrafo... o un click.",
  "Ricorda: ogni domanda è una nuova avventura!"
];
function getMockReply() {
  return MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
}

export default function UmbyBotRPG({ spriteSize = 208, spriteMarginTop = 0 }) {
  const [history, setHistory] = useState([
    {
      user: "Chi sei?",
      bot: "Sono UmbyBot, il tuo mentore steampunk! Vuoi scoprire i miei progetti o iniziare una nuova quest?"
    }
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Scroll sempre a fondo
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentIdx]);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const domanda = input.trim();
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const risposta = getMockReply();
      const newHistory = [
        ...history,
        { user: domanda, bot: risposta }
      ];
      setHistory(newHistory);
      setCurrentIdx(newHistory.length - 1);
      setLoading(false);
      setIsBotTyping(true); // Inizia animazione bocca/typewriter
    }, 650);
  }

  const current = history[currentIdx];
  const isLast = currentIdx === history.length - 1;
  const showTypewriter = isLast && isBotTyping;
  const [botText, isMouthOpen] = useTypewriterWithMouth(current.bot, showTypewriter, 80);

  // Quando ha finito, dopo mezzo secondo torna idle
  useEffect(() => {
    if (showTypewriter && botText === current.bot) {
      const t = setTimeout(() => setIsBotTyping(false), 400);
      return () => clearTimeout(t);
    }
  }, [botText, showTypewriter, current.bot]);

  const goPrev = () => setCurrentIdx(idx => Math.max(0, idx - 1));
  const goNext = () => setCurrentIdx(idx => Math.min(history.length - 1, idx + 1));

  return (
    <div className="device-frame">
      <div className="device-inner-glass">
        <div className="umbybot-mobile-wrapper">
          {/* Sprite steampunk animato: PNG alternati con CSS fix dimensione */}
          <div className="umbybot-sprite-box is-centered" style={{ marginTop: spriteMarginTop }}>
            <div className="umbybot-sprite-fix">
              <img
                src={showTypewriter && isMouthOpen ? umbybotTalking : umbybotIdle}
                alt="UmbyBot pixel NPC"
                className="umbybot-sprite"
                draggable={false}
              />
            </div>
          </div>

          {/* Dialogue Box */}
          <div className="dialogue-box-bleed">
            <DialogueBox
              npcName="UmbyBot"
              dialogue={
                <>
                  <div className="dialogue-user-question">
                    <b>Tu:</b> {current.user}
                  </div>
                  <div className="dialogue-bot-reply">
                    <span className="bot-label">UmbyBot:</span>{" "}
                    {botText}
                  </div>
                  <div ref={messagesEndRef} />
                </>
              }
            />
          </div>

          {/* Navigazione dialoghi */}
          <div className="dialogue-navigation">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIdx === 0}
              className="nes-btn"
            >◀️</button>
            <span style={{ fontFamily: "monospace", fontSize: 16 }}>
              {currentIdx + 1} / {history.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={currentIdx === history.length - 1}
              className="nes-btn"
            >▶️</button>
          </div>
        </div>
        {/* Input chat sempre a fondo */}
        <form
          className="input-chatbox"
          onSubmit={handleSend}
          autoComplete="off"
        >
          <input
            className="chat-input-steampunk nes-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={loading ? "Attendi risposta..." : "Scrivi qui la tua domanda..."}
            disabled={loading}
            style={{ flex: 1, fontSize: 18 }}
          />
          <button
            className="chat-send-btn nes-btn is-success"
            type="submit"
            disabled={loading || !input.trim()}
            style={{ fontSize: 22 }}
          >
            🚀
          </button>
        </form>
      </div>
    </div>
  );
}
