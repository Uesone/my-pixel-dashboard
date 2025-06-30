import React from "react";
import umbybotIcon from "./assets/sprites/umbybot-idle.png";

/**
 * DialogueBox: NES style, altezza fissa, larghezza sempre 100%, contenuto non shrinka mai
 */
export default function DialogueBox({ npcName, dialogue }) {
  return (
    <div
      className="dialogue-box-steampunk nes-container with-title is-rounded"
      // Fix width al 100% (vedi CSS, ma blindiamo anche inline)
      style={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxSizing: "border-box",
        height: "210px", // Fissa desktop (sovrascrivibile da media query)
      }}
    >
      <div className="dialogue-header-steampunk">
        <img src={umbybotIcon} alt="NPC" className="dialogue-npc-icon" />
        <span className="dialogue-npc-name">{npcName}</span>
      </div>
      {/* Contenuto sempre 100%, scrollabile, flex-column */}
      <div className="dialogue-content-steampunk">
        {dialogue}
      </div>
    </div>
  );
}
