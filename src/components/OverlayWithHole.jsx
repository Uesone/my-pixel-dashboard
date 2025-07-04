import React from "react";

/**
 * Overlay nera con buco rettangolare (CLS-proof, ultra stabile, patch anti-linea Chrome).
 * Cliccabile SOLO nel buco (rettangolare).
 * Sopra il buco puoi mettere un bordo arrotondato decorativo per l'effetto "spotlight".
 */
export default function OverlayWithHole({
  visible = true,
  opacity = 1,
  zIndex = 10000,
  holeTop = 0,
  holeLeft = 0,
  holeWidth = 50,
  holeHeight = 90,
  borderRadius = 12,         // Solo per bordo decorativo (NON reale per click)
  borderColor = "black",   // Colore bordo opzionale
  borderWidth = 2,           // Spessore bordo
  transition = "opacity 0.65s"
}) {
  // NON renderizza nulla finché la posizione del buco è (0,0)
  if (!visible || (holeTop === 0 && holeLeft === 0)) return null;

  // Arrotonda tutti i valori a pixel (anti-subpixel gap)
  holeTop = Math.round(holeTop);
  holeLeft = Math.round(holeLeft);
  holeWidth = Math.round(holeWidth);
  holeHeight = Math.round(holeHeight);
  borderRadius = Math.round(borderRadius);



  return (
    <div style={{ position: "fixed", inset: 0, zIndex, pointerEvents: "none" }}>
      {/* Overlay sopra il buco */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100vw",
          height: holeTop,
          background: `rgba(0,0,0,${opacity})`,
          pointerEvents: "auto",
          transition,

        }}
      />
      {/* Overlay sotto il buco */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: holeTop + holeHeight + -1,
          width: "100vw",
          bottom: 0,
          background: `rgba(0,0,0,${opacity})`,
          pointerEvents: "auto",
          transition,

        }}
      />
      {/* Overlay sinistra */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: holeTop ,
          width: holeLeft,
          height: holeHeight -1,
          background: `rgba(0,0,0,${opacity})`,
          pointerEvents: "auto",
          transition,

        }}
      />
      {/* Overlay destra */}
      <div
        style={{
          position: "absolute",
          left: holeLeft + holeWidth,
          top: holeTop,
          right: 0,
          height: holeHeight-1,
          background: `rgba(0,0,0,${opacity})`,
          pointerEvents: "auto",
          transition,

        }}
      />
      {/* Buco trasparente - click-through */}
      <div
        style={{
          position: "absolute",
          top: holeTop,
          left: holeLeft,
          width: holeWidth,
          height: holeHeight,
          pointerEvents: "none", // click-through!
        }}
      />
      {/* Bordo decorativo arrotondato sopra il buco */}
      {borderColor && (
        <div
          style={{
            position: "absolute",
            top: holeTop - borderWidth / 2,
            left: holeLeft - borderWidth / 2,
            width: holeWidth + borderWidth,
            height: holeHeight + borderWidth,
            borderRadius: borderRadius,
            border: `${borderWidth}px solid ${borderColor}`,
            pointerEvents: "none",
            boxSizing: "border-box",
            boxShadow: "0 0 8px 2px #000", // Glow leggero
            transition: "border 0.2s, box-shadow 0.2s",
          }}
        />
      )}
    </div>
  );
}
