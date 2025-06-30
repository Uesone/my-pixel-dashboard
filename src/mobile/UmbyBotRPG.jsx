import React, { useState } from "react";
import "./styles/rpg-mobile.css";
import DialogueBox from "./DialogueBox";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";

// MOCK: Risposte bot fittizie (sostituisci con chiamata OpenAI se vuoi)
const MOCK_REPLIES = [
  "Benvenuto nella mia officina a vapore! Cosa vuoi sapere, viaggiatore?",
  "Ogni progetto è un ingranaggio nella macchina del destino.",
  "La mia caldaia oggi fa più fumo del solito, chiedi pure!",
  "Per contattarmi, basta un colpo di telegrafo... o un click.",
  "Ricorda: ogni domanda è una nuova avventura!"
];
function getMockReply(question) {
  // Simula un bot spiritoso, ma puoi sostituire con fetch a OpenAI!
  return MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
}

export default function UmbyBotRPG({ spriteSize = 164 }) {
  // Array di { user: "domanda", bot: "risposta" }
  const [history, setHistory] = useState([
    {
      user: "Chi sei?",
      bot: "Sono UmbyBot, il tuo mentore steampunk! Vuoi scoprire i miei progetti o iniziare una nuova quest?"
    }
  ]);
  // Indice della pagina dialogo attualmente visualizzata
  const [currentIdx, setCurrentIdx] = useState(0);
  // Stato input e caricamento
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Invio domanda utente
  function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const domanda = input.trim();
    setInput("");
    setLoading(true);

    // --- Simulazione risposta bot (puoi sostituire qui con chiamata OpenAI async!)
    setTimeout(() => {
      const risposta = getMockReply(domanda);
      const newHistory = [
        ...history,
        { user: domanda, bot: risposta }
      ];
      setHistory(newHistory);
      setCurrentIdx(newHistory.length - 1); // Vai alla nuova risposta!
      setLoading(false);
    }, 650);
  }

  // Navigazione frecce
  const goPrev = () => setCurrentIdx((idx) => Math.max(0, idx - 1));
  const goNext = () => setCurrentIdx((idx) => Math.min(history.length - 1, idx + 1));

  const current = history[currentIdx];

  return (
    <div className="umbybot-mobile-wrapper">
      {/* Sprite di UmbyBot */}
      <div className="umbybot-sprite-box">
        <img
          src={umbybotIdle}
          alt="UmbyBot pixel NPC"
          className="umbybot-sprite"
          style={{
            width: spriteSize,
            height: spriteSize,
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* Box dialogo RPG: DOMANDA + RISPOSTA + FRECCE */}
      <DialogueBox
        npcName="UmbyBot"
        dialogue={
          <>
            <div className="dialogue-user-question">
              <b>Tu:</b> {current.user}
            </div>
            <div className="dialogue-bot-reply" style={{ marginTop: 4 }}>
              <b>UmbyBot:</b> {loading && currentIdx === history.length - 1 ? "...sto rispondendo..." : current.bot}
            </div>
          </>
        }
      />

      {/* FRECCE di navigazione */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: 16 }}>
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIdx === 0}
          aria-label="Dialogo precedente"
          style={{
            fontSize: 22,
            opacity: currentIdx === 0 ? 0.4 : 1,
            background: "none",
            border: "none",
            cursor: currentIdx === 0 ? "not-allowed" : "pointer",
            color: "#ffd380"
          }}
        >◀️</button>
        <span style={{ fontFamily: "monospace", fontSize: 16 }}>
          {currentIdx + 1} / {history.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={currentIdx === history.length - 1}
          aria-label="Dialogo successivo"
          style={{
            fontSize: 22,
            opacity: currentIdx === history.length - 1 ? 0.4 : 1,
            background: "none",
            border: "none",
            cursor: currentIdx === history.length - 1 ? "not-allowed" : "pointer",
            color: "#ffd380"
          }}
        >▶️</button>
      </div>

      {/* Input utente */}
      <form
        className="input-chatbox"
        style={{ width: "100%", display: "flex", gap: 10, alignItems: "center", marginTop: "auto" }}
        onSubmit={handleSend}
        autoComplete="off"
      >
        <input
          className="chat-input-steampunk"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={loading ? "Attendi risposta..." : "Scrivi qui la tua domanda..."}
          disabled={loading}
          style={{ flex: 1, fontSize: 18 }}
        />
        <button
          className="chat-send-btn"
          type="submit"
          disabled={loading || !input.trim()}
          style={{ fontSize: 22, color: "#ffe9ad" }}
        >
          🚀
        </button>
      </form>
    </div>
  );
}
