// src/components/OverlayWithHole.jsx
import React from "react";

/**
 * Overlay con buco arrotondato.
 * PATCH CLS: Non renderizza nulla finché la posizione non è calcolata (0,0), 
 * così eviti qualsiasi shift di layout all'avvio (tipico problema con overlay dinamici).
 */
export default function OverlayWithHole({
  visible = true,
  opacity = 0.77,
  zIndex = 10000,
  holeTop = 0,
  holeLeft = 0,
  holeWidth = 50,
  holeHeight = 90,
  borderRadius = 6,
  transition = "opacity 0.65s"
}) {
  // DEBUG: per test deploy
  if (typeof window !== "undefined") {
    console.log("[OverlayWithHole] rendered! PATCH anti-CLS attiva", {holeTop, holeLeft});
  }

  // PATCH ANTI-CLS: NON renderizzare nulla finché la posizione del buco è (0,0)
  if (!visible || (holeTop === 0 && holeLeft === 0)) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex,
      pointerEvents: "none",
      opacity: visible ? 1 : 0,
      transition,
      willChange: "opacity"
    }}>
      {/* Overlay sopra il buco */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, right: 0,
        height: holeTop,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Overlay sotto il buco */}
      <div style={{
        position: "absolute",
        left: 0, top: holeTop + holeHeight, right: 0, bottom: 0,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Overlay a sinistra del buco */}
      <div style={{
        position: "absolute",
        left: 0, top: holeTop, width: holeLeft, height: holeHeight,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Overlay a destra del buco */}
      <div style={{
        position: "absolute",
        left: holeLeft + holeWidth, top: holeTop, right: 0, height: holeHeight,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Layer trasparente sopra il buco */}
      <div
        style={{
          position: "absolute",
          top: holeTop, left: holeLeft, width: holeWidth, height: holeHeight,
          pointerEvents: "none",
          borderRadius: borderRadius,
          boxShadow: `0 0 0 9999px rgba(0,0,0,${opacity})`,
        }}
      />
    </div>
  );
}
//prova