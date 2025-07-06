// BotAnimato.jsx
import React, { useEffect, useState } from "react";
// Importa sprite ridimensionati (208px e 416px)
import umbybotIdle208 from "./assets/sprites/umbybot-idle-208.webp";
import umbybotIdle416 from "./assets/sprites/umbybot-idle-416.webp";
import umbybotTalking208 from "./assets/sprites/umbybot-talking-208.webp";
import umbybotTalking416 from "./assets/sprites/umbybot-talking-416.webp";

/**
 * Sprite animata di UmbyBot: idle o talking (bocca che si muove)
 * Props:
 * - talking: boolean, true se bot deve animare la bocca
 * - size: dimensione px (default 208)
 */
export default function BotAnimato({ talking, size = 208 }) {
  const [isOpen, setIsOpen] = useState(false);

  // Anima bocca del bot mentre "parla"
  useEffect(() => {
    let interval;
    if (talking) {
      interval = setInterval(() => setIsOpen(open => !open), 120);
    } else {
      setIsOpen(false);
    }
    return () => clearInterval(interval);
  }, [talking]);

  // Scegli sprite corretto per stato (idle/talking, risoluzione 208/416)
  const sprite208 = talking && isOpen ? umbybotTalking208 : umbybotIdle208;
  const sprite416 = talking && isOpen ? umbybotTalking416 : umbybotIdle416;

  return (
    <img
      src={sprite208}
      srcSet={`${sprite208} 208w, ${sprite416} 416w`}
      sizes={`${size}px`}
      alt="UmbyBot pixel sprite"
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
      fetchPriority="high"       
    />
  );
}
