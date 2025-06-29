import React, { useState } from "react";
import "./styles/rpg-mobile.css";

export default function UmbyBotChatbot({ apiKey }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Saluti, viaggiatore! Sono UmbyBot, pronto a rispondere a ogni domanda in stile steampunk." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Invia richiesta a OpenAI API
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // <-- Attento: non mettere apiKey visibile lato pubblico!
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            ...messages,
            userMessage,
            {
              role: "system",
              content:
                "Rispondi sempre come UmbyBot, mentore steampunk NPC di un RPG pixel art, tono narrativo ironico e breve.",
            },
          ],
          max_tokens: 200,
          temperature: 0.9,
        }),
      });
      const data = await response.json();
      const botMessage = data.choices?.[0]?.message?.content || "Errore, il mio vapore si è inceppato!";
      setMessages((msgs) => [...msgs, { role: "assistant", content: botMessage }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Errore di connessione alle caldaie OpenAI!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
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
