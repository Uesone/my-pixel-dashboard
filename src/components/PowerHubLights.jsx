// src/components/PowerHubLights.jsx
import React, { useEffect, useState, useRef } from "react";
import bulbBase from "../assets/pixel-map-sprites/bulb/0.webp";
import bulbGlass from "../assets/pixel-map-sprites/bulb/1.webp";
import powerHubLightOff from "../assets/pixel-map-sprites/power-hub/4.png";
import powerHubLightOn from "../assets/pixel-map-sprites/power-hub/5.png";
import powerHubBtnOff from "../assets/pixel-map-sprites/power-hub/6.png";
import powerHubBtnOn from "../assets/pixel-map-sprites/power-hub/7.png";
import arrowPng from "../assets/ui/arrow/arrow-64.webp";

/**
 * PowerHubLights – versione anti-micro-movimento pixel-art.
 */
export default function PowerHubLights({
  animated = true,
  onPowerClick,
  onBulbChange,
  onPowerOnFinished,
}) {
  const [isOn, setIsOn] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [bulbOn, setBulbOn] = useState(false);
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [btnOn, setBtnOn] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const timeoutsRef = useRef([]);
  const canClick = !animating && animated;
  const hasCalledOnFinished = useRef(false);

  // Clean-up timer su unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => { hasCalledOnFinished.current = false; }, [isOn, animated, onPowerOnFinished]);
  useEffect(() => { if (typeof onBulbChange === "function") onBulbChange(bulbOn); }, [bulbOn]);

  useEffect(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    if (!animated) {
      setBulbOn(isOn);
      setLights(isOn ? [true, true, true, true, true] : [false, false, false, false, false]);
      setBtnOn(isOn);
      setAnimating(false);
      if (isOn && typeof onPowerOnFinished === "function" && !hasCalledOnFinished.current) {
        hasCalledOnFinished.current = true;
        onPowerOnFinished();
      }
      return;
    }
    if (isOn) {
      setAnimating(true); setBulbOn(false); setBtnOn(false);
      setLights([false, false, false, false, false]);
      const BLINKS = [7, 5, 4, 4, 3], BLINK_INTERVAL = 90;
      function animateLight(i) {
        let blinkCount = 0;
        function blink() {
          setLights(arr => { const copy = [...arr]; copy[i] = blinkCount % 2 === 1; return copy; });
          blinkCount++;
          if (blinkCount < BLINKS[4 - i] * 2) {
            timeoutsRef.current.push(setTimeout(blink, BLINK_INTERVAL));
          } else {
            setLights(arr => { const copy = [...arr]; copy[i] = true; return copy; });
            if (i > 0) {
              timeoutsRef.current.push(setTimeout(() => animateLight(i - 1), 80));
            } else {
              timeoutsRef.current.push(setTimeout(() => flickerBulb(), 220));
            }
          }
        }
        blink();
      }
      function flickerBulb() {
        const flickerSeq = [90, 120, 70, 135, 95, 170, 260];
        let step = 0;
        function flick() {
          setBulbOn(on => !on);
          if (step < flickerSeq.length) {
            timeoutsRef.current.push(setTimeout(flick, flickerSeq[step++]));
          } else {
            setBulbOn(true);
            if (typeof onPowerOnFinished === "function" && !hasCalledOnFinished.current) {
              hasCalledOnFinished.current = true;
              onPowerOnFinished();
            }
            timeoutsRef.current.push(setTimeout(() => {
              setBtnOn(true); setAnimating(false);
              setLights(arr => { const fixed = [...arr]; fixed[0] = true; return fixed; });
            }, 500));
          }
        }
        flick();
      }
      animateLight(4);
    } else {
      setAnimating(true); setBtnOn(false); setBulbOn(false);
      [0, 1, 2, 3, 4].forEach((i, idx) =>
        timeoutsRef.current.push(
          setTimeout(() => setLights(arr => { const copy = [...arr]; copy[i] = false; return copy; }), idx * 50)
        )
      );
      timeoutsRef.current.push(setTimeout(() => setAnimating(false), 350));
    }
  }, [isOn, animated, onPowerOnFinished]);

  function handleBtnClick(e) {
    e.stopPropagation();
    if (!canClick || btnPressed) return;
    setBtnPressed(true);
    setShowArrow(false);
    setTimeout(() => setBtnPressed(false), 140);
    setIsOn(prev => !prev);
    if (typeof onPowerClick === "function") onPowerClick(!isOn);
  }

  // --- Posizione e stile freccia PNG
  const arrowTop = 284, arrowLeft = 452, arrowWidth = 19, arrowHeight = 19, arrowRotation = 0;

  return (
    <>
      {/* ================= GHOST DIVs ANTI-CLS =============== */}
      <div style={{ position: "absolute", top: 84, left: 34, width: 112, height: 240, opacity: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true" />
      <div style={{ position: "absolute", top: 275, left: 437, width: 16, height: 58, opacity: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true" />
      <div style={{ position: "absolute", top: 317, left: 454, width: 16, height: 16, opacity: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true" />
      <div style={{ position: "absolute", top: arrowTop, left: arrowLeft, width: arrowWidth, height: arrowHeight, opacity: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true" />
      {/* ================== END GHOSTS ==================== */}

      {/* BASE LAMPADINA */}
      <img
        src={bulbBase}
        alt="bulb base"
        width={112}
        height={240}
        style={{
          position: "absolute", top: 84, left: 34, zIndex: 40,
          pointerEvents: "none", imageRendering: "pixelated", display: "block"
        }}
        draggable={false}
        loading="eager"
        fetchPriority="high"
      />
      {/* LAMPADINA ACCESA (animazione glow) */}
      {bulbOn && (
        <img
          src={bulbGlass}
          alt="bulb glow"
          width={112}
          height={240}
          style={{
            position: "absolute", top: 84, left: 34, zIndex: 41,
            pointerEvents: "none", opacity: 1, transition: "opacity 0.17s",
            imageRendering: "pixelated",
            filter: "drop-shadow(0 0 12px #fff8) drop-shadow(0 0 28px #ffe7)",
            display: "block"
          }}
          draggable={false}
          loading="eager"
          fetchPriority="high"
        />
      )}

      {/* LUCI GIALLE: ON/OFF sovrapposti per ciascuna */}
      {lights.map((on, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 275 + i * 10,
            left: 437,
            width: 16,
            height: 16,
            zIndex: 34,
            pointerEvents: "none",
            display: "block",
            overflow: "hidden", // Important!
          }}
        >
          {/* OFF */}
          <img
            src={powerHubLightOff}
            alt={`light-${i}-off`}
            width={16}
            height={16}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: 16, height: 16,
              opacity: on ? 0 : 1,
              transition: "opacity 0.13s",
              imageRendering: "pixelated",
              pointerEvents: "none",
              display: "block",
              filter: "drop-shadow(0 0 8px #0000)",
            }}
            draggable={false}
            loading="eager"
          />
          {/* ON */}
          <img
            src={powerHubLightOn}
            alt={`light-${i}-on`}
            width={16}
            height={16}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: 16, height: 16,
              opacity: on ? 1 : 0,
              transition: "opacity 0.13s",
              imageRendering: "pixelated",
              pointerEvents: "none",
              display: "block",
              filter: "drop-shadow(0 0 9px #ffe080) drop-shadow(0 0 20px #fff7)",
            }}
            draggable={false}
            loading="eager"
          />
        </div>
      ))}

      {/* FRECCIA PNG ANIMATA */}
      {showArrow && !isOn && (
        <img
          src={arrowPng}
          alt="arrow"
          width={arrowWidth}
          height={arrowHeight}
          style={{
            position: "absolute",
            top: arrowTop,
            left: arrowLeft,
            zIndex: 42,
            pointerEvents: "none",
            userSelect: "none",
            animation: "tooltipArrow 0.72s ease-in-out infinite",
            transform: `rotate(${arrowRotation}deg)`,
            transition: "transform 0.18s",
            filter: "drop-shadow(1px 2px 0 #bbb)",
            imageRendering: "pixelated",
            display: "block",
          }}
          draggable={false}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      )}

      {/* POWER BUTTON: ON/OFF sovrapposti */}
      <div
        style={{
          position: "absolute", top: 317, left: 454,
          width: 16, height: 16, zIndex: 35,
          pointerEvents: "none", display: "block", overflow: "hidden",
        }}
      >
        {/* OFF */}
        <img
          src={powerHubBtnOff}
          alt="power btn off"
          width={16}
          height={16}
          style={{
            position: "absolute", top: 0, left: 0, width: 16, height: 16,
            opacity: btnOn ? 0 : 1,
            transition: "opacity 0.13s, filter 0.22s, boxShadow 0.16s",
            filter: "drop-shadow(0 0 8px #0000)",
            imageRendering: "pixelated",
            display: "block"
          }}
          draggable={false}
          loading="eager"
        />
        {/* ON */}
        <img
          src={powerHubBtnOn}
          alt="power btn on"
          width={16}
          height={16}
          style={{
            position: "absolute", top: 0, left: 0, width: 16, height: 16,
            opacity: btnOn ? 1 : 0,
            transition: "opacity 0.13s, filter 0.22s, boxShadow 0.16s",
            filter: btnPressed
              ? "drop-shadow(0 0 12px #f66) brightness(0.58)"
              : "drop-shadow(0 0 12px #f66)",
            boxShadow: btnPressed ? "0 1px 8px #a11" : "0 0 0 0 transparent",
            imageRendering: "pixelated",
            display: "block"
          }}
          draggable={false}
          loading="eager"
        />
      </div>
      {/* POWER BUTTON (cliccabile invisibile) */}
      <button
        aria-label={isOn ? "Spegni Power Hub" : "Accendi Power Hub"}
        onClick={handleBtnClick}
        disabled={!canClick || btnPressed}
        style={{
          position: "absolute", top: 317, left: 454,
          width: 16, height: 16, zIndex: 40,
          opacity: 0,
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
