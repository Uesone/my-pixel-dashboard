// /src/mobile/UmbyBotChatbot.jsx
import React, { useState } from "react";
import "./styles/rpg-mobile.css";

export default function UmbyBotChatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Saluti, viaggiatore! Sono UmbyBot, pronto a rispondere a ogni domanda in stile steampunk." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // MOCK: risposte random per testare la UI (sostituisci con fetch API per OpenAI in futuro)
  const MOCK_REPLIES = [
    "Il mio motore a vapore ci sta pensando... chiedimi altro!",
    "Ho appena stretto un bullone nel mio pensatoio.",
    "Il mio telegrafo a vapore suggerisce: affronta ogni sfida con pixel e coraggio!",
    "Sono solo un umile bot steampunk: prova con 'progetti', 'contatti' o 'vita'.",
    "La caldaia delle idee oggi fuma poco... ma resto a disposizione!"
  ];

  function getRandomReply() {
    return MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
  }

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages(msgs => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    // MOCK: Risposta simulata dopo breve delay
    setTimeout(() => {
      setMessages(msgs =>
        [...msgs, { role: "assistant", content: getRandomReply() }]
      );
      setLoading(false);
    }, 600);

    /* --- Versione OpenAI reale (quando vorrai!) ---
    try {
      const response = await fetch("/api/umbybot", { ... });
      const data = await response.json();
      const botMessage = data.choices?.[0]?.message?.content || "Errore, il mio vapore si è inceppato!";
      setMessages(msgs => [...msgs, { role: "assistant", content: botMessage }]);
    } catch (err) {
      setMessages(msgs => [
        ...msgs,
        { role: "assistant", content: "Errore di connessione alle caldaie OpenAI!" },
      ]);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleInput = e => setInput(e.target.value);
  const handleKeyDown = e => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  return (
    <div className="chatbot-steampunk-wrapper">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "assistant" ? "bot" : "user"}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="chat-message bot">...</div>}
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input-steampunk"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi qui la tua domanda..."
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          🚀
        </button>
      </div>
    </div>
  );
}
