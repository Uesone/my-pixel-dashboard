import React, { useEffect, useState, useRef } from "react";
import PageFlipSprite from "./PageFlipSprite"; // <-- la tua

// Importa i tuoi frame (ordine normale)
import frame0 from "../assets/content/page-flip/next-page/0.png";
import frame1 from "../assets/content/page-flip/next-page/1.png";
import frame2 from "../assets/content/page-flip/next-page/2.png";
import frame3 from "../assets/content/page-flip/next-page/3.png";
import frame4 from "../assets/content/page-flip/next-page/4.png";
import frame5 from "../assets/content/page-flip/next-page/5.png";
import frame6 from "../assets/content/page-flip/next-page/6.png";
import frame7 from "../assets/content/page-flip/next-page/7.png";
import frame8 from "../assets/content/page-flip/next-page/8.png";
import frame9 from "../assets/content/page-flip/next-page/9.png";
import frame10 from "../assets/content/page-flip/next-page/10.png";
import frame11 from "../assets/content/page-flip/next-page/11.png";

// Valori pixel-perfect per ogni frame
const frames = [
  { src: frame0, left: 0, top: 0, width: 310, height: 290, zIndex: 1 },
  { src: frame1, left: -179, top: -100, width: 550, height: 500, zIndex: 2 },
  { src: frame2, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame3, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame4, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame5, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame6, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame7, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame8, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame9, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame10, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
  { src: frame11, left: -203, top: -108, width: 620, height: 500, zIndex: 2 },
];

const ANIMATION_MS = 700; // durata totale animazione

/**
 * trigger: (string) — cambia ogni volta che cambi pagina (es: selectedSection)
 * direction: "forward" | "backward" — puoi passarlo per reversare l’animazione (default: forward)
 */
export default function PageFlipTransition({ trigger, direction = "forward" }) {
  const [isActive, setIsActive] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Reverse frame array se direction = backward
  const framesToShow = direction === "backward" ? [...frames].reverse() : frames;

  useEffect(() => {
    setIsActive(true);
    setFrameIndex(0);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setFrameIndex(i);
      if (i >= framesToShow.length - 1) {
        clearInterval(interval);
        timeoutRef.current = setTimeout(() => setIsActive(false), 120);
      }
    }, ANIMATION_MS / framesToShow.length);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutRef.current);
    };
  }, [trigger, direction]);

  if (!isActive) return null;

  // Overlay perfettamente allineato all’area 310x290
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 310,
        height: 290,
        zIndex: 999,
        pointerEvents: "none",
      }}
    >
      <PageFlipSprite {...framesToShow[frameIndex]} />
    </div>
  );
}
