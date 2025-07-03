import React from "react";
import umbybotIcon208 from "./assets/sprites/umbybot-idle-208.webp";
import umbybotIcon416 from "./assets/sprites/umbybot-idle-416.webp";

export default function DialogueBox({ npcName, dialogue, npcIcon }) {
  // Se non passato: default sprite responsive
  npcIcon = npcIcon || umbybotIcon208;
  return (
    <div
      className="dialogue-box-steampunk nes-container with-title is-rounded"
      style={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxSizing: "border-box",
        height: "210px",
      }}
    >
      <div className="dialogue-header-steampunk">
        <img
          src={umbybotIcon208}
          srcSet={`${umbybotIcon208} 28w, ${umbybotIcon416} 56w`}
          sizes="28px"
          alt="NPC"
          className="dialogue-npc-icon"
        />
        <span className="dialogue-npc-name">{npcName}</span>
      </div>
      <div className="dialogue-content-steampunk">{dialogue}</div>
    </div>
  );
}
