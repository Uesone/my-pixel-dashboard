import React, { useEffect, useState } from "react";

/**
 * Overlay nero con buco arrotondato, *ancorato* alla dashboard tramite ref!
 * Il buco resta sempre nella stessa posizione rispetto alla dashboard (anche se la pagina si sposta, scali o scrolli).
 * PATCH: retry loop iniziale per gestire scaling, immagini o layout asincroni (user experience premium!).
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
  containerRef,
  transition = "opacity 0.65s"
}) {
  // Stato: posizione assoluta del buco rispetto allo schermo
  const [holeAbs, setHoleAbs] = useState({
    top: 0, left: 0, width: holeWidth, height: holeHeight,
  });

  useEffect(() => {
    if (!containerRef?.current) return;

    // Funzione che calcola la posizione ASSOLUTA del buco
    function updateHole() {
      const rect = containerRef.current.getBoundingClientRect();
      setHoleAbs({
        top: rect.top + holeTop,
        left: rect.left + holeLeft,
        width: holeWidth,
        height: holeHeight
      });
    }

    // PATCH: retry loop iniziale (garantisce posizione perfetta anche con scaling/asset/animazioni)
    let tries = 0;
    function tryUpdate() {
      updateHole();
      tries++;
      if (tries < 8) setTimeout(tryUpdate, 80); // Per ~500ms
    }
    tryUpdate();

    // Reagisce a resize/scroll della finestra
    window.addEventListener("resize", updateHole);
    window.addEventListener("scroll", updateHole);

    // Cleanup su unmount
    return () => {
      window.removeEventListener("resize", updateHole);
      window.removeEventListener("scroll", updateHole);
    };
  }, [containerRef, holeTop, holeLeft, holeWidth, holeHeight]);

  if (!visible) return null;

  const { top, left, width, height } = holeAbs;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex,
      pointerEvents: "none", // rende il buco cliccabile!
      opacity: visible ? 1 : 0,
      transition,
      willChange: "opacity", // PATCH: aiuta browser anti-flicker/respiro
    }}>
      {/* Overlay sopra il buco */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, right: 0,
        height: top,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Overlay sotto il buco */}
      <div style={{
        position: "absolute",
        left: 0, top: top + height, right: 0, bottom: 0,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Overlay a sinistra del buco */}
      <div style={{
        position: "absolute",
        left: 0, top: top, width: left, height: height,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Overlay a destra del buco */}
      <div style={{
        position: "absolute",
        left: left + width, top: top, right: 0, height: height,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      {/* Layer trasparente sopra il buco per arrotondare i bordi (borderRadius) */}
      <div
        style={{
          position: "absolute",
          top, left, width, height,
          pointerEvents: "none", // lascia il buco cliccabile!
          borderRadius: borderRadius,
          boxShadow: `0 0 0 9999px rgba(0,0,0,${opacity})`,
        }}
      />
    </div>
  );
}
