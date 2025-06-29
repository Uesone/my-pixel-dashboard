import React, { useState, useEffect, useRef } from "react";
import nextArrowPng from "../../assets/ui/dialog/arrow_next.png";
import prevArrowPng from "../../assets/ui/dialog/arrow_prev.png";
import { useLanguage } from "../LanguageContext.jsx";
import balloonPng from "../../assets/ui/dialog/steampunk_dialogbox.png";

export default function HomeDialogBox({
  balloonWidth = 290,
  balloonHeight = 124,
  fontSize = 22,
  // Testo (nuove props personalizzabili!)
  textTop = 38,
  textLeft = 38,
  textWidth = 215,
  textHeight = 40,
  letterSpacing = 0,     // 👈 aggiunto
  fontWeight = "normal", // 👈 aggiunto
  color = "#24170b",     // 👈 aggiunto
  lineHeight = 1.1,      // 👈 aggiunto (default per testo compatto)
  fontFamily = "'VT323', monospace", // 👈 aggiunto
  textAlign = "center",  // 👈 aggiunto
  // Frecce
  arrowPrevTop = 85,
  arrowPrevLeft = -55,
  arrowNextTop = 85,
  arrowNextLeft = 235,
  // Callback avatar
  onTalkingChange = () => {},
}) {
  const { t } = useLanguage(); // 👈 hook del context
  // Prendi le lines tradotte (array) oppure fallback a []
  const lines = t("home.dialog") || [];

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
  }, [step, onTalkingChange, lines]);

  // "ombra" per mantenere il testo centrato (scegli la stringa più lunga)
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
          fontFamily,
          fontSize,
          fontWeight,     // 👈 USATO!
          color,          // 👈 USATO!
          letterSpacing,  // 👈 USATO!
          lineHeight,     // 👈 USATO!
          textAlign,      // 👈 USATO!
          whiteSpace: "pre-line",
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