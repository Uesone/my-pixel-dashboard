import React, { useEffect, useState } from "react";
import umbybotIdle from "./assets/sprites/umbybot-idle.png";
import umbybotTalking from "./assets/sprites/umbybot-talking.png";

/**
 * Sprite animato: cambia PNG quando "talking" è true
 * - Alterna bocca aperta/chiusa ogni 120ms solo quando talking=true
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
    <img
      src={talking && isOpen ? umbybotTalking : umbybotIdle}
      alt="Golem pixel NPC"
      className="umbybot-sprite"
      draggable={false}
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated"
      }}
    />
  );
}
