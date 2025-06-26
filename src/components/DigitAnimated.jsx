import React, { useEffect, useState } from "react";
import digitFrames from "../assets/pixel-map-sprites/clock/digitFrames";

// Funzione che trova il frame statico della cifra
function getStaticFrame(digit) {
  const from = (digit + 9) % 10; // se digit=0 → 9, se 1→0, se 2→1...
  return digitFrames[from][digitFrames[from].length - 1];
}

// Funzione che trova l’array di frame per la transizione da prev a current
function getTransitionFrames(prev, current) {
  let from = prev;
  // Gestione rollover 9→0
  if ((prev + 1) % 10 === current) {
    from = prev;
  } else {
    // Se NON è un incremento di 1, niente animazione (mostra solo statico)
    from = (current + 9) % 10;
  }
  return digitFrames[from];
}

const FRAMES_PER_ANIMATION = 10;
const FRAME_DURATION = 40;

const DigitAnimated = ({ value }) => {
  const [current, setCurrent] = useState(value);
  const [prev, setPrev] = useState(value);
  const [frame, setFrame] = useState(FRAMES_PER_ANIMATION - 1); // statico

  // Quando cambia la cifra
  useEffect(() => {
    if (value !== current) {
      setPrev(current);
      setCurrent(value);
      setFrame(0);
    }
  }, [value]);

  // Gestisce l’animazione solo se c’è un incremento (es. 5→6)
  useEffect(() => {
    // Solo se transizione naturale (prev+1)%10 === current
    if (
      frame < FRAMES_PER_ANIMATION - 1 &&
      ((prev + 1) % 10 === current)
    ) {
      const timer = setTimeout(() => setFrame(f => f + 1), FRAME_DURATION);
      return () => clearTimeout(timer);
    }
  }, [frame, prev, current]);

  let imgSrc;
  // Se animazione valida (es. 2→3)
  if (frame < FRAMES_PER_ANIMATION - 1 && ((prev + 1) % 10 === current)) {
    imgSrc = digitFrames[prev][frame];
  } else {
    // Statico: ultimo frame della cartella (current + 9) % 10
    imgSrc = getStaticFrame(current);
  }

  return (
    <img
      src={imgSrc}
      alt={`digit ${current}`}
      style={{
        width: 28,
        height: 32,
        imageRendering: "pixelated",
        display: "block",
        pointerEvents: "none",
        userSelect: "none"
      }}
      draggable={false}
    />
  );
};

export default DigitAnimated;
