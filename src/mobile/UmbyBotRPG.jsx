// /src/mobile/UmbyBotRPG.jsx
import React, { useState, useEffect, useRef } from "react";
import DialogueBox from "./DialogueBox";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";
import umbybotTalking from "./assets/sprites/umbybot-talking.png";
import "./styles/rpg-mobile.css";

/**
 * Hook typewriter con bocca: scrittura graduale + animazione bocca, con velocità indipendenti.
 * @param {string} text - Testo da scrivere
 * @param {boolean} active - true se attiva animazione
 * @param {number} textSpeed - ms tra ogni carattere (velocità testo)
 * @param {number} mouthSpeed - ms tra cambio bocca (velocità bocca)
 * @returns [displayed, isMouthOpen]
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

    // === Intervallo testo ===
    const textInterval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(textInterval);
    }, textSpeed);

    // === Intervallo bocca ===
    let mouthOpen = false;
    const mouthInterval = setInterval(() => {
      mouthOpen = !mouthOpen;
      setIsMouthOpen(mouthOpen);
    }, mouthSpeed);

    // Cleanup dopo la fine: bocca chiusa!
    let cleanupTimeout = null;
    if (i >= text.length) {
      cleanupTimeout = setTimeout(() => setIsMouthOpen(false), 250);
    }

    return () => {
      clearInterval(textInterval);
      clearInterval(mouthInterval);
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      setIsMouthOpen(false);
    };
  }, [text, active, textSpeed, mouthSpeed]);

  return [displayed, isMouthOpen];
}

// === MOCK risposte random per demo
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

export default function UmbyBotRPG({
  spriteSize = 208,
  spriteMarginTop = 0,
  textSpeed = 30,    // Cambia qui la velocità di scrittura (ms tra ogni carattere)
  mouthSpeed = 110   // Cambia qui la velocità della bocca (ms tra ogni cambio)
}) {
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

  // === Scroll sempre a fondo ===
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, currentIdx]);

  // === Gestione invio domanda ===
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

  // === Typewriter custom ===
  const [botText, isMouthOpen] = useTypewriterWithMouth(
    current.bot,
    showTypewriter,
    textSpeed,
    mouthSpeed
  );

  // === Quando finisce, bocca chiusa dopo mezzo secondo ===
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
          {/* === Sprite steampunk animato === */}
          <div className="umbybot-sprite-box is-centered" style={{ marginTop: spriteMarginTop }}>
            <div className="umbybot-sprite-fix">
              <img
                src={showTypewriter && isMouthOpen ? umbybotTalking : umbybotIdle}
                alt="UmbyBot pixel NPC"
                className="umbybot-sprite"
                draggable={false}
                style={{
                  width: spriteSize,
                  height: spriteSize,
                  imageRendering: "pixelated"
                }}
              />
            </div>
          </div>

          {/* === Dialogue Box === */}
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

{/* === Navigazione dialoghi === */}
<div className="dialogue-navigation">
  <button
    type="button"
    onClick={goPrev}
    disabled={currentIdx === 0}
    className="nes-btn"
  >
    {/* Freccia destra ruotata verso sinistra */}
    <span style={{
      display: "inline-block",
      transform: "scaleX(-1)",
      fontSize: 15,
      lineHeight: "1"
    }}>
      ➤
    </span>
  </button>
  <span style={{ fontFamily: "monospace", fontSize: 16 }}>
    {currentIdx + 1} / {history.length}
  </span>
  <button
    type="button"
    onClick={goNext}
    disabled={currentIdx === history.length - 1}
    className="nes-btn"
  >
    {/* Freccia destra classica */}
    <span style={{
      fontSize: 15,
      lineHeight: "1"
    }}>
      ➤
    </span>
  </button>
</div>

        </div>
        {/* === Input chat sempre a fondo === */}
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
             ➤
          </button>
        </form>
      </div>
    </div>
  );
}
