import React, { useEffect, useState } from "react";

/**
 * Overlay nero con buco arrotondato, ancorato dinamicamente!
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
  const [holeAbs, setHoleAbs] = useState({
    top: 0, left: 0, width: holeWidth, height: holeHeight,
  });

  useEffect(() => {
    if (!containerRef?.current) return;

    function updateHole() {
      const rect = containerRef.current.getBoundingClientRect();
      setHoleAbs({
        top: rect.top + holeTop,
        left: rect.left + holeLeft,
        width: holeWidth,
        height: holeHeight
      });
    }

    let tries = 0;
    function tryUpdate() {
      updateHole();
      tries++;
      if (tries < 12) setTimeout(tryUpdate, 80);
    }
    tryUpdate();

    window.addEventListener("resize", updateHole);
    window.addEventListener("scroll", updateHole);

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
      pointerEvents: "none",
      opacity: visible ? 1 : 0,
      transition,
      willChange: "opacity",
    }}>
      <div style={{
        position: "absolute",
        left: 0, top: 0, right: 0,
        height: top,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      <div style={{
        position: "absolute",
        left: 0, top: top + height, right: 0, bottom: 0,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      <div style={{
        position: "absolute",
        left: 0, top: top, width: left, height: height,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      <div style={{
        position: "absolute",
        left: left + width, top: top, right: 0, height: height,
        background: `rgba(0,0,0,${opacity})`,
        pointerEvents: "auto"
      }} />
      <div
        style={{
          position: "absolute",
          top, left, width, height,
          pointerEvents: "none",
          borderRadius: borderRadius,
          boxShadow: `0 0 0 9999px rgba(0,0,0,${opacity})`,
        }}
      />
    </div>
  );
}
