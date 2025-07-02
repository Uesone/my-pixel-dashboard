// /src/mobile/DialogueBox.jsx
import React from "react";
import umbybotIcon from "./assets/sprites/umbybot-idle.webp";

/**
 * DialogueBox: NES style, altezza fissa, larghezza sempre 100%, contenuto non shrinka mai
 */
export default function DialogueBox({ npcName, dialogue, npcIcon = umbybotIcon }) {
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
        <img src={npcIcon} alt="NPC" className="dialogue-npc-icon" />
        <span className="dialogue-npc-name">{npcName}</span>
      </div>
      <div className="dialogue-content-steampunk">
        {dialogue}
      </div>
    </div>
  );
}
