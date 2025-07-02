// src/mobile/BotAnimato.jsx
import React, { useEffect, useState } from "react";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";
import umbybotTalking from "./assets/sprites/umbybot-talking.png";

/**
 * BotAnimato: Sprite Golem con bocca animata quando "talking" è true.
 * La bocca si anima a intervalli finché talking è true.
 */
export default function BotAnimato({ talking, size = 208 }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (talking) {
      interval = setInterval(() => setIsOpen(open => !open), 120); // Velocità bocca
    } else {
      setIsOpen(false);
    }
    return () => clearInterval(interval);
  }, [talking]);

  return (
    <img
      src={talking && isOpen ? umbybotTalking : umbybotIdle}
      alt="Golem pixel NPC"
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        pointerEvents: "none"
      }}
      draggable={false}
    />
  );
}
