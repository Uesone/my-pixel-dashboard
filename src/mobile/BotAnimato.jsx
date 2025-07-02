import React, { useEffect, useState } from "react";
import umbybotIdleWebp from "./assets/sprites/umbybot-idle.webp";
import umbybotTalkingWebp from "./assets/sprites/umbybot-talking.webp";
// (PNG fallback opzionale, puoi anche togliere se non ti serve legacy)
import umbybotIdlePng from "./assets/sprites/umbybot-idle.png";
import umbybotTalkingPng from "./assets/sprites/umbybot-talking.png";

/**
 * BotAnimato: Sprite animato della mascotte/chatbot.
 * - La bocca si muove (alternando sprite) solo quando "talking" è true.
 * - Alterna bocca aperta/chiusa ogni 120ms.
 *
 * Props:
 * - talking: boolean (true se il bot "parla", cioè il typewriter è attivo)
 * - size: dimensione (px)
 */
export default function BotAnimato({ talking, size = 208 }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (talking) {
      interval = setInterval(() => setIsOpen(open => !open), 120);
    } else {
      setIsOpen(false);
    }
    return () => clearInterval(interval);
  }, [talking]);

  return (
    <picture>
      <source
        srcSet={talking && isOpen ? umbybotTalkingWebp : umbybotIdleWebp}
        type="image/webp"
      />
      <img
        src={talking && isOpen ? umbybotTalkingPng : umbybotIdlePng}
        alt="Golem pixel NPC"
        className="umbybot-sprite"
        draggable={false}
        style={{
          width: size,
          height: size,
          imageRendering: "pixelated",
        }}
        width={size}
        height={size}
        loading="eager"
      />
    </picture>
  );
}
