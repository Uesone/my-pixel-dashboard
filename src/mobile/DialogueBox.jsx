import React from "react";
import umbybotIcon208 from "./assets/sprites/umbybot-idle-208.webp";
import umbybotIcon416 from "./assets/sprites/umbybot-idle-416.webp";

/**
 * DialogueBox
 * Steampunk/NES style dialogue box con supporto per immagini responsive.
 * - npcIcon: puoi passare una custom, altrimenti usa la default responsive.
 */
export default function DialogueBox({ npcName, dialogue, npcIcon }) {
  const icon208 = npcIcon || umbybotIcon208;
  const icon416 = npcIcon || umbybotIcon416;
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
          src={icon208}
          srcSet={`${icon208} 28w, ${icon416} 56w`}
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
