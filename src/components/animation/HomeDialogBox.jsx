import React, { useState, useEffect, useRef } from "react";
import nextArrowPng from "../../assets/ui/dialog/arrow_next.png";
import prevArrowPng from "../../assets/ui/dialog/arrow_prev.png";
import balloonPng from "../../assets/ui/dialog/steampunk_dialogbox.png";

// Dialoghi da mostrare
const lines = [
  "Benvenuto negli archivi personali\ndi Umberto Amoroso, detto Uesone.",
  "Qui raccolgo appunti, schemi e cronache\ndei miei progetti e sperimentazioni digitali.",
  "Ogni sezione è una pagina di taccuino:\ndove la logica incontra la creatività.",
  "Naviga tra progetti, annotazioni e strumenti,\ne osserva l’ingegno all’opera.",
  "Nel mestiere dell’ingegno, la curiosità\nè il miglior alleato.",
  "Avanti: l’esplorazione può cominciare."
];

export default function HomeDialogBox({
  balloonWidth = 290,
  balloonHeight = 124,
  fontSize = 22,
  // Testo
  textTop = 38,
  textLeft = 38,
  textWidth = 215,
  textHeight = 40,
  // Frecce
  arrowPrevTop = 85,
  arrowPrevLeft = -55,
  arrowNextTop = 85,
  arrowNextLeft = 235,
  // Callback avatar
  onTalkingChange = () => {},
}) {
  const [step, setStep] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [talking, setTalking] = useState(false);
  const timerRef = useRef();

  // Effetto BLINK (solo la freccia next)
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 430);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayed("");
    setTalking(true);
    onTalkingChange(true);

    const text = lines[step] || "";
    let i = 0;

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timerRef.current);
        setTalking(false);
        onTalkingChange(false);
      }
    }, 22);

    return () => {
      clearInterval(timerRef.current);
      onTalkingChange(false);
    };
    // eslint-disable-next-line
  }, [step, onTalkingChange]);

  // "ombra" per mantenere il testo centrato
  const testText = lines.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <div
      style={{
        width: balloonWidth,
        height: balloonHeight,
        position: "relative",
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Balloon PNG */}
      <img
        src={balloonPng}
        alt="balloon"
        style={{
          width: balloonWidth,
          height: balloonHeight,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          imageRendering: "pixelated",
          pointerEvents: "none"
        }}
        draggable={false}
      />

      {/* Testo centrato, overlay sul balloon */}
      <div
        style={{
          position: "absolute",
          top: textTop,
          left: textLeft,
          width: textWidth,
          height: textHeight,
          fontFamily: "'VT323', monospace",
          fontSize,
          whiteSpace: "pre-line",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "auto"
        }}
      >
        {/* Ombra invisibile per mantenere il box fisso */}
        <span style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}>
          {testText}
        </span>
        {/* Testo reale */}
        <span style={{
          zIndex: 2,
          position: "relative",
          width: "100%"
        }}>
          {displayed}
        </span>
      </div>

      {/* Freccia Previous */}
      {!talking && step > 0 && (
        <img
          src={prevArrowPng}
          alt="prev"
          onClick={() => setStep(step - 1)}
          style={{
            position: "absolute",
            top: arrowPrevTop,
            left: arrowPrevLeft,
            width: 40,
            height: 40,
            cursor: "pointer",
            zIndex: 3,
            opacity: blink ? 1 : 0.0,
            transition: "opacity 0.18s"
          }}
        />
      )}

      {/* Freccia Next */}
      {!talking && step < lines.length - 1 && (
        <img
          src={nextArrowPng}
          alt="next"
          onClick={() => setStep(step + 1)}
          style={{
            position: "absolute",
            top: arrowNextTop,
            left: arrowNextLeft,
            width: 40,
            height: 42,
            cursor: "pointer",
            zIndex: 3,
            opacity: blink ? 1 : 0.0,
            transition: "opacity 0.18s"
          }}
        />
      )}
    </div>
  );
}
