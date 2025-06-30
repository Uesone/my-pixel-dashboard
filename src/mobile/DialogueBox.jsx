import React from "react";
import umbybotIcon from "./assets/sprites/umbybot-idle.png"; // icona bot pixel

export default function DialogueBox({ npcName, dialogue }) {
  return (
    <div className="dialogue-box-steampunk nes-container with-title is-rounded">
      <div className="dialogue-header-steampunk">
        <img src={umbybotIcon} alt="NPC" className="dialogue-npc-icon" />
        <span className="dialogue-npc-name">{npcName}</span>
      </div>
      <div className="dialogue-content-steampunk">{dialogue}</div>
    </div>
  );
}
