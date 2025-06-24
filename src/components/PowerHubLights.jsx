// src/components/PowerHubLights.jsx
import React, { useEffect, useState } from "react";
import bulbBase from "../assets/pixel-map-sprites/bulb/0.png";
import bulbGlass from "../assets/pixel-map-sprites/bulb/1.png";
import powerHubLightOff from "../assets/pixel-map-sprites/power-hub/4.png";
import powerHubLightOn from "../assets/pixel-map-sprites/power-hub/5.png";
import powerHubBtnOff from "../assets/pixel-map-sprites/power-hub/6.png";
import powerHubBtnOn from "../assets/pixel-map-sprites/power-hub/7.png";

export default function PowerHubLights({ animated = true }) {
  // Stato: lampadina accesa/spenta, array di luci on/off, pulsante acceso
  const [bulbOn, setBulbOn] = useState(false);
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [btnOn, setBtnOn] = useState(false);

  useEffect(() => {
    if (!animated) {
      setBulbOn(true);
      setLights([true, true, true, true, true]);
      setBtnOn(true);
      return;
    }

    setBulbOn(false);
    setBtnOn(false);
    setLights([false, false, false, false, false]);

    // Effetto "flicker" della lampadina (accensione neon)
    const flickerSeq = [100, 90, 60, 120, 40, 60, 200, 60, 500];
    let step = 0;
    function flicker() {
      setBulbOn((on) => !on);
      if (step < flickerSeq.length) {
        setTimeout(flicker, flickerSeq[step++]);
      } else {
        setBulbOn(true);
        // Accende luci a scorrimento
        lights.forEach((_, i) =>
          setTimeout(() => setLights((l) => {
            const copy = [...l];
            copy[i] = true;
            return copy;
          }), 120 * i)
        );
        // Accendi pulsante dopo tutte le luci
        setTimeout(() => setBtnOn(true), 700);
      }
    }
    setTimeout(flicker, 300);
    return () => {};
  }, [animated]);

  // --- Render
  return (
    <>
      {/* BULB BASE */}
      <img src={bulbBase} alt="bulb base" style={{
        position: "absolute", top: "84px", left: "34px",
        width: "112px", height: "240px", zIndex: 40, pointerEvents: "none"
      }} draggable={false} />
      {/* BULB LIGHT (overlay, visibile solo se accesa) */}
      {bulbOn && (
        <img src={bulbGlass} alt="bulb glow" style={{
          position: "absolute", top: "84px", left: "34px",
          width: "112px", height: "240px", zIndex: 41, pointerEvents: "none",
          opacity: bulbOn ? 1 : 0,
          transition: "opacity 0.10s",
          filter: "drop-shadow(0 0 12px #fff8) drop-shadow(0 0 28px #ffe7)"
        }} draggable={false} />
      )}

      {/* POWER HUB LIGHTS */}
      {lights.map((on, i) => (
        <img
          key={i}
          src={on ? powerHubLightOn : powerHubLightOff}
          alt={`light-${i}`}
          style={{
            position: "absolute",
            top: `${275 + i * 10}px`, // Adatta se serve!
            left: "437px",
            width: "16px",
            height: "16px",
            zIndex: 34,
            pointerEvents: "none",
            filter: on
              ? "drop-shadow(0 0 6px #ffe070) drop-shadow(0 0 14px #fff6)"
              : undefined,
            opacity: on ? 1 : 0.7,
            transition: "opacity 0.13s"
          }}
          draggable={false}
        />
      ))}

      {/* POWER BUTTON */}
      <img
        src={btnOn ? powerHubBtnOn : powerHubBtnOff}
        alt="power btn"
        style={{
          position: "absolute", top: "317px", left: "454px",
          width: "16px", height: "16px", zIndex: 35, pointerEvents: "none",
          transition: "filter 0.2s",
          filter: btnOn ? "drop-shadow(0 0 8px #f66)" : undefined
        }}
        draggable={false}
      />
    </>
  );
}
