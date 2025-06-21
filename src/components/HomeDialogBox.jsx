import React, { useState, useEffect, useRef } from "react";
import nextArrowPng from "../assets/ui/dialog/arrow_next.png";
import prevArrowPng from "../assets/ui/dialog/arrow_prev.png";

// Le battute del dialogo
const lines = [
  "Ciao! Benvenuto nel mio sito portfolio",
  "Io sono UmbyBot,\nil tuo compagno pixelato",
  "Premi la freccia per continuare!"
];

export default function HomeDialogBox({
  width = 215,
  height = 40,
  fontSize = 16,
  textTop = 1,         // <-- NUOVO: posizione Y del testo
  textLeft = -23,        // <-- NUOVO: posizione X del testo
  textWidth = 215,      // <-- NUOVO: larghezza area testo
  textHeight = 40,      // <-- NUOVO: altezza area testo
  arrowPrevTop = 110,   // <-- NUOVO: posizione Y freccia prev
  arrowPrevLeft = -50,  // <-- NUOVO: posizione X freccia prev
  arrowNextTop = 113,   // <-- NUOVO: posizione Y freccia next
  arrowNextRight = -4,  // <-- NUOVO: posizione X freccia next
  onTalkingChange = () => {},
}) {
  const [step, setStep] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [talking, setTalking] = useState(false);
  const timerRef = useRef();

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
        width,
        height,
        fontFamily: "'VT323', monospace",
        fontSize,
        whiteSpace: "pre-line",
        textAlign: "center",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: width,
        minHeight: height,
        position: "relative",
        pointerEvents: "auto",
       background: "rgba(255,255,255,0.5)" // debug balloon box
      }}
    >
      {/* AREA TESTO -- ora è assoluta, puoi muoverla */}
      <div
        style={{
          position: "absolute",
          top: textTop,
          left: textLeft,
          width: textWidth,
          height: textHeight,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        {/* Ombra invisibile per mantenere la larghezza */}
        <span style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}>
          {testText}
        </span>
        {/* Testo reale */}
        <span style={{
          zIndex: 2,
          position: "relative",
          width: "100%",
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
            left: arrowPrevLeft,
            top: arrowPrevTop,
            width: 50,
            height: 50,
            cursor: "pointer",
            zIndex: 3
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
            right: arrowNextRight,
            top: arrowNextTop,
            width: 50,
            height: 50,
            cursor: "pointer",
            zIndex: 3
          }}
        />
      )}
    </div>
  );
}
