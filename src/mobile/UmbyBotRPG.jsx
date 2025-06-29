import React, { useState } from "react";
import DialogueBox from "./DialogueBox";
import UmbyBotChatbot from "./UmbyBotChatbot";
import "./styles/rpg-mobile.css";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";

const DIALOGUES = [
  {
    question: "Chi sei?",
    answer: "Sono UmbyBot, il tuo mentore steampunk! Vuoi scoprire i miei progetti o iniziare una nuova quest?",
  },
  {
    question: "Mostrami i progetti",
    answer: "Ecco la lista delle mie missioni completate... ops, volevo dire progetti! (work in progress 👾)",
  },
  {
    question: "Contattami",
    answer: "Per inviare un messaggio alla mia officina, vai nella sezione contatti. Ti aspetto con una tazza di vapore caldo!",
  },
];

export default function UmbyBotRPG({ spriteSize = 128 }) {
  const [dialogueIdx, setDialogueIdx] = useState(0);

  // PREVIENE ERRORI SU IDX FUORI RANGE
  const currentDialogue =
    DIALOGUES[dialogueIdx] || DIALOGUES[0];

  // Blocca i click su idx non valido
  const handleDialogue = (idx) => {
    if (idx < 0 || idx >= DIALOGUES.length) return;
    setDialogueIdx(idx);
  };

  return (
    <div className="umbybot-mobile-wrapper">
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

      <DialogueBox
        npcName="UmbyBot"
        dialogue={currentDialogue.answer}
      />

      <div className="rpg-btn-group">
        {DIALOGUES.map((d, i) => (
          <button
            className="rpg-btn"
            key={i}
            onClick={() => handleDialogue(i)}
            aria-pressed={dialogueIdx === i}
          >
            {d.question}
          </button>
        ))}
      </div>

      <UmbyBotChatbot apiKey="LA_TUA_API_KEY_OPENAI" />
    </div>
  );
}
