// src/components/PowerHubLights.jsx
import React, { useEffect, useState, useRef } from "react";
import bulbBase from "../assets/pixel-map-sprites/bulb/0.png";
import bulbGlass from "../assets/pixel-map-sprites/bulb/1.png";
import powerHubLightOff from "../assets/pixel-map-sprites/power-hub/4.png";
import powerHubLightOn from "../assets/pixel-map-sprites/power-hub/5.png";
import powerHubBtnOff from "../assets/pixel-map-sprites/power-hub/6.png";
import powerHubBtnOn from "../assets/pixel-map-sprites/power-hub/7.png";
import arrowPng from "../assets/ui/arrow/arrow.png"; // <-- IMPORTA LA FRECCIA PNG

export default function PowerHubLights({
  animated = true,
  onPowerClick,
  onBulbChange,
  onPowerOnFinished,
}) {
  // Stato ON/OFF generale
  const [isOn, setIsOn] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Freccia animata 8bit sopra il pulsante (sparisce al primo click)
  const [showArrow, setShowArrow] = useState(true);

  // Stato animazione e luci
  const [bulbOn, setBulbOn] = useState(false);
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [btnOn, setBtnOn] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  // PATCH: NON esiste più blinking
  // const [blinkingLightOn, setBlinkingLightOn] = useState(false);
  // const blinkingLightTimeout = useRef(null);

  // Timer per animazioni
  const timeoutsRef = useRef([]);
  const canClick = !animating && animated;

  // === Fix anti-loop: chiamata callback UNA SOLA VOLTA ===
  const hasCalledOnFinished = useRef(false);

  // Pulizia timer all'unmount/reset
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      // clearTimeout(blinkingLightTimeout.current); // rimosso blinking
    };
  }, []);

  // Reset la ref quando ON/OFF cambia
  useEffect(() => {
    hasCalledOnFinished.current = false;
  }, [isOn, animated, onPowerOnFinished]);

  // Notifica stato lampadina (safe pattern)
  useEffect(() => {
    if (typeof onBulbChange === "function") onBulbChange(bulbOn);
    // eslint-disable-next-line
  }, [bulbOn]);

  // --- Animazione accensione/spegnimento
  useEffect(() => {
    // Pulisci animazioni precedenti
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    // clearTimeout(blinkingLightTimeout.current); // rimosso blinking

    // STATIC: nessuna animazione
    if (!animated) {
      setBulbOn(isOn);
      setLights(isOn ? [true, true, true, true, true] : [false, false, false, false, false]);
      setBtnOn(isOn);
      setAnimating(false);
      // setBlinkingLightOn(isOn); // rimosso blinking
      // Chiamata immediata se in static mode e ON
      if (isOn && typeof onPowerOnFinished === "function" && !hasCalledOnFinished.current) {
        hasCalledOnFinished.current = true;
        onPowerOnFinished();
      }
      return;
    }

    // ACCENSIONE (animazione)
    if (isOn) {
      setAnimating(true);
      setBulbOn(false);
      setBtnOn(false);
      setLights([false, false, false, false, false]);
      // setBlinkingLightOn(false); // rimosso blinking

      // Sequenza blink luci dall’alto al basso
      const BLINKS = [7, 5, 4, 4, 3];
      const BLINK_INTERVAL = 90;

      function animateLight(i) {
        let blinkCount = 0;
        function blink() {
          setLights((arr) => {
            const copy = [...arr];
            copy[i] = blinkCount % 2 === 1;
            return copy;
          });
          blinkCount++;
          if (blinkCount < BLINKS[4 - i] * 2) {
            timeoutsRef.current.push(setTimeout(blink, BLINK_INTERVAL));
          } else {
            setLights((arr) => {
              const copy = [...arr];
              copy[i] = true;
              return copy;
            });
            if (i > 0) {
              timeoutsRef.current.push(setTimeout(() => animateLight(i - 1), 80));
            } else {
              // Tutte accese: lampadina flicker
              timeoutsRef.current.push(setTimeout(() => flickerBulb(), 220));
            }
          }
        }
        blink();
      }

      // Neon flicker lampadina
      function flickerBulb() {
        const flickerSeq = [90, 120, 70, 135, 95, 170, 260];
        let step = 0;
        function flick() {
          setBulbOn((on) => !on);
          if (step < flickerSeq.length) {
            timeoutsRef.current.push(setTimeout(flick, flickerSeq[step++]));
          } else {
            setBulbOn(true); // <=== Qui la lampadina rimane accesa

            // === Callback: appena la lampadina resta accesa, sblocca la dashboard SOLO UNA VOLTA! ===
            if (typeof onPowerOnFinished === "function" && !hasCalledOnFinished.current) {
              hasCalledOnFinished.current = true;
              onPowerOnFinished();
            }

            // Poi accendi bottone e accendi lucina bassa FISSA
            timeoutsRef.current.push(setTimeout(() => {
              setBtnOn(true);
              setAnimating(false);
              // PATCH: accendi la lucina bassa fissa (prima era startBlinkingLight)
              setLights((arr) => {
                const fixed = [...arr];
                fixed[0] = true;
                return fixed;
              });
            }, 500));
          }
        }
        flick();
      }

      animateLight(4);

    } else {
      // SPEGNIMENTO
      setAnimating(true);
      setBtnOn(false);
      // setBlinkingLightOn(false); // rimosso blinking
      setBulbOn(false);

      // Luci off a cascata
      [0, 1, 2, 3, 4].forEach((i, idx) =>
        timeoutsRef.current.push(
          setTimeout(() => setLights((arr) => {
            const copy = [...arr];
            copy[i] = false;
            return copy;
          }), idx * 50)
        )
      );
      timeoutsRef.current.push(setTimeout(() => setAnimating(false), 350));
    }
    // eslint-disable-next-line
  }, [isOn, animated, onPowerOnFinished]);

  // --- Gestione click bottone ---
  function handleBtnClick(e) {
    e.stopPropagation();
    if (!canClick || btnPressed) return;
    setBtnPressed(true);
    setShowArrow(false); // Sparisce la freccia al primo click!
    setTimeout(() => setBtnPressed(false), 140);
    setIsOn((prev) => !prev);
    if (typeof onPowerClick === "function") onPowerClick(!isOn);
  }

  // --- Render componenti pixel art, freccia e bottone
  // ----- FRECCIA PNG: Modifica qui valori come vuoi -----
  const arrowTop = "284px";    // posizione verticale
  const arrowLeft = "452px";   // posizione orizzontale
  const arrowWidth = "19px";   // larghezza PNG
  const arrowHeight = "19px";  // altezza PNG
  const arrowRotation = "0deg"; // 0=giù, 180=su, 90=dx, -90=sx

  return (
    <>
      {/* BASE LAMPADINA */}
      <img src={bulbBase} alt="bulb base" style={{
        position: "absolute", top: "84px", left: "34px",
        width: "112px", height: "240px", zIndex: 40, pointerEvents: "none"
      }} draggable={false} />
      {/* LAMPADINA ACCESA */}
      {bulbOn && (
        <img src={bulbGlass} alt="bulb glow" style={{
          position: "absolute", top: "84px", left: "34px",
          width: "112px", height: "240px", zIndex: 41, pointerEvents: "none",
          opacity: 1,
          transition: "opacity 0.17s",
          filter: "drop-shadow(0 0 12px #fff8) drop-shadow(0 0 28px #ffe7)"
        }} draggable={false} />
      )}

      {/* LUCI GIALLE */}
      {lights.map((on, i) => (
        <img
          key={i}
          src={on ? powerHubLightOn : powerHubLightOff}
          alt={`light-${i}`}
          style={{
            position: "absolute",
            top: `${275 + i * 10}px`,
            left: "437px",
            width: "16px",
            height: "16px",
            zIndex: 34,
            pointerEvents: "none",
            filter: on
              ? "drop-shadow(0 0 9px #ffe080) drop-shadow(0 0 20px #fff7)"
              : undefined,
            opacity: on ? 1 : 0.68,
            transition: "opacity 0.16s"
          }}
          draggable={false}
        />
      ))}

      {/* FRECCIA PNG ANIMATA */}
      {showArrow && !isOn && (
        <img
          src={arrowPng}
          alt="arrow"
          style={{
            position: "absolute",
            top: arrowTop,
            left: arrowLeft,
            width: arrowWidth,
            height: arrowHeight,
            zIndex: 42,
            pointerEvents: "none",
            userSelect: "none",
            animation: "tooltipArrow 0.72s ease-in-out infinite",
            transform: `rotate(${arrowRotation})`,
            transition: "transform 0.18s",
            filter: "drop-shadow(1px 2px 0 #bbb)",
          }}
          draggable={false}
        />
      )}

      {/* POWER BUTTON (immagine) */}
      <img
        src={btnOn ? powerHubBtnOn : powerHubBtnOff}
        alt="power btn"
        style={{
          position: "absolute", top: "317px", left: "454px",
          width: "16px", height: "16px", zIndex: 35, pointerEvents: "none",
          transition: "filter 0.22s, boxShadow 0.16s",
          filter: btnOn
            ? (btnPressed ? "drop-shadow(0 0 4px #f66) brightness(0.88)" : "drop-shadow(0 0 8px #f66)")
            : undefined,
          boxShadow: btnPressed ? "0 1px 8px #a11" : undefined,
        }}
        draggable={false}
      />
      {/* POWER BUTTON (cliccabile invisibile) */}
      <button
        aria-label={isOn ? "Spegni Power Hub" : "Accendi Power Hub"}
        onClick={handleBtnClick}
        disabled={!canClick || btnPressed}
        style={{
          position: "absolute", top: "317px", left: "454px",
          width: "16px", height: "16px", zIndex: 40,
          opacity: 0, // invisibile ma cliccabile!
          cursor: (canClick && !btnPressed) ? "pointer" : "default",
          background: "none", border: "none", outline: "none", padding: 0,
          pointerEvents: "auto",
          userSelect: "none",
        }}
        tabIndex={0}
      />
      {/* CSS ANIMATION KEYFRAMES */}
      <style>
        {`
          @keyframes tooltipArrow {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(8px);}
          }
        `}
      </style>
    </>
  );
}
