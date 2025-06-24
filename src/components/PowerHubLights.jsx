// src/components/PowerHubLights.jsx
import React, { useEffect, useState, useRef } from "react";
import bulbBase from "../assets/pixel-map-sprites/bulb/0.png";
import bulbGlass from "../assets/pixel-map-sprites/bulb/1.png";
import powerHubLightOff from "../assets/pixel-map-sprites/power-hub/4.png";
import powerHubLightOn from "../assets/pixel-map-sprites/power-hub/5.png";
import powerHubBtnOff from "../assets/pixel-map-sprites/power-hub/6.png";
import powerHubBtnOn from "../assets/pixel-map-sprites/power-hub/7.png";

const LIGHT_COUNT = 5;

export default function PowerHubLights({ animated = true, onPowerClick }) {
  const [isOn, setIsOn] = useState(false);
  const [animating, setAnimating] = useState(false);

  const [bulbOn, setBulbOn] = useState(false);
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [btnOn, setBtnOn] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  // Lucina che lampeggia: ora è la più in basso (indice 0)
  const [blinkingLightOn, setBlinkingLightOn] = useState(false);
  const blinkingLightTimeout = useRef(null);

  // Blocca doppio click rapido
  const canClick = !animating && animated;
  const timeoutsRef = useRef([]);

  // Cleanup totale on unmount o toggle rapido
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      clearTimeout(blinkingLightTimeout.current);
    };
  }, []);

  // Gestione accensione/spegnimento (con nuova sequenza)
  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    clearTimeout(blinkingLightTimeout.current);

    // STATIC MODE
    if (!animated) {
      setBulbOn(isOn);
      setLights(isOn ? [true, true, true, true, true] : [false, false, false, false, false]);
      setBtnOn(isOn);
      setAnimating(false);
      setBlinkingLightOn(isOn);
      return;
    }

    // ACCENSIONE
    if (isOn) {
      setAnimating(true);
      setBulbOn(false);
      setBtnOn(false);
      setLights([false, false, false, false, false]);
      setBlinkingLightOn(false);

      // Sequenza lucine gialle dall’alto (i=4) verso il basso (i=0)
      let step = 0;
      const BLINKS = [7, 5, 4, 4, 3]; // Più blink in alto, meno in basso (invertiti)
      const BLINK_INTERVAL = 90;
      function animateLight(i) {
        let blinkCount = 0;
        function blink() {
          setLights((arr) => {
            const copy = [...arr];
            copy[i] = blinkCount % 2 === 1; // acceso nei dispari
            return copy;
          });
          blinkCount++;
          if (blinkCount < BLINKS[4 - i] * 2) {
            timeoutsRef.current.push(setTimeout(blink, BLINK_INTERVAL));
          } else {
            // Fine blink: lascia accesa!
            setLights((arr) => {
              const copy = [...arr];
              copy[i] = true;
              return copy;
            });
            if (i > 0) {
              // Avanti con la successiva lucina (più in basso)
              timeoutsRef.current.push(setTimeout(() => animateLight(i - 1), 80));
            } else {
              // Tutte accese, ora parte la lampadina: più flicker!
              timeoutsRef.current.push(setTimeout(() => flickerBulb(), 220));
            }
          }
        }
        blink();
      }

      // Più flicker per la lampadina!
      function flickerBulb() {
        // 10 blink con intervalli variabili (da neon che sfarfalla)
        const flickerSeq = [80, 65, 50, 110, 30, 70, 40, 130, 50, 160, 55, 110, 40, 100, 190];
        let step = 0;
        function flick() {
          setBulbOn((on) => !on);
          if (step < flickerSeq.length) {
            timeoutsRef.current.push(setTimeout(flick, flickerSeq[step++]));
          } else {
            setBulbOn(true);
            // Accendi pulsante dopo un altro attimo
            timeoutsRef.current.push(setTimeout(() => {
              setBtnOn(true);
              setAnimating(false);
              startBlinkingLight();
            }, 500));
          }
        }
        flick();
      }

      // Inizia dalla lucina più in alto (i=4)
      animateLight(4);
    } else {
      // SPEGNIMENTO: ora dal basso (i=0) verso l’alto (i=4)
      setAnimating(true);
      setBtnOn(false);
      setBlinkingLightOn(false);
      setBulbOn(false);
      // Fade-out luci a cascata (dal basso verso l’alto)
      [0,1,2,3,4].forEach((i, idx) =>
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
  }, [isOn, animated]);

  // Funzione blink randomico lucina che lampeggia (indice 0, la più in basso)
  function startBlinkingLight() {
    setBlinkingLightOn(true);
    function blink() {
      setBlinkingLightOn((prev) => !prev);
      const next = 900 + Math.random() * 800;
      blinkingLightTimeout.current = setTimeout(blink, next);
    }
    blinkingLightTimeout.current = setTimeout(blink, 950 + Math.random() * 400);
  }

  // Click: toggle ON/OFF
  function handleBtnClick(e) {
    e.stopPropagation();
    if (!canClick || btnPressed) return;
    setBtnPressed(true);
    setTimeout(() => setBtnPressed(false), 140);
    setIsOn((prev) => !prev);
    if (typeof onPowerClick === "function") onPowerClick(!isOn);
  }

  // --- Render
  return (
    <>
      {/* BULB BASE */}
      <img src={bulbBase} alt="bulb base" style={{
        position: "absolute", top: "84px", left: "34px",
        width: "112px", height: "240px", zIndex: 40, pointerEvents: "none"
      }} draggable={false} />
      {/* BULB LIGHT */}
      {bulbOn && (
        <img src={bulbGlass} alt="bulb glow" style={{
          position: "absolute", top: "84px", left: "34px",
          width: "112px", height: "240px", zIndex: 41, pointerEvents: "none",
          opacity: bulbOn ? 1 : 0,
          transition: "opacity 0.17s",
          filter: "drop-shadow(0 0 12px #fff8) drop-shadow(0 0 28px #ffe7)"
        }} draggable={false} />
      )}

      {/* POWER HUB LIGHTS */}
      {lights.map((on, i) => (
        <img
          key={i}
          src={
            // Ora è la lucina in basso (i=0) che lampeggia
            i === 0
              ? (blinkingLightOn && on ? powerHubLightOn : powerHubLightOff)
              : (on ? powerHubLightOn : powerHubLightOff)
          }
          alt={`light-${i}`}
          style={{
            position: "absolute",
            top: `${275 + i * 10}px`,
            left: "437px",
            width: "16px",
            height: "16px",
            zIndex: 34,
            pointerEvents: "none",
            filter: (i === 0 ? (blinkingLightOn && on) : on)
              ? "drop-shadow(0 0 9px #ffe080) drop-shadow(0 0 20px #fff7)"
              : undefined,
            opacity: (i === 0 ? (blinkingLightOn && on) : on) ? 1 : 0.68,
            transition: "opacity 0.16s"
          }}
          draggable={false}
        />
      ))}

      {/* POWER BUTTON IMMAGINE */}
      <img
        src={btnOn ? powerHubBtnOn : powerHubBtnOff}
        alt="power btn"
        style={{
          position: "absolute", top: "317px", left: "454px",
          width: "16px", height: "16px", zIndex: 35, pointerEvents: "none",
          transition: "filter 0.22s, box-shadow 0.16s",
          filter: btnOn
            ? (btnPressed ? "drop-shadow(0 0 4px #f66) brightness(0.88)" : "drop-shadow(0 0 8px #f66)")
            : undefined,
          boxShadow: btnPressed ? "0 1px 8px #a11" : undefined,
        }}
        draggable={false}
      />
      {/* POWER BUTTON CLICCABILE */}
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
    </>
  );
}
