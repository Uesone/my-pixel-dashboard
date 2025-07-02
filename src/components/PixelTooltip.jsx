import React from "react";
import { createPortal } from "react-dom";

/**
 * PixelTooltip
 * Tooltip steampunk/pixel art, compatibile ovunque nel progetto.
 * Per cambiare posizione: modifica SOLO il setTooltip nella pagina che lo usa.
 */
export default function PixelTooltip({ visible, text, x, y }) {
  if (!visible) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        transform: "translate(-50%, 0)",
        zIndex: 2147483647,
        fontFamily: "'VT323', 'Press Start 2P', monospace",
        fontSize: 16,
        color: "#38210B",
        background: "#f5e5b3",
        border: "3px solid #9c795a",
        borderRadius: 2,
        padding: "7px 22px 8px 22px",
        boxShadow:
          "",
        textShadow:
          "",
        letterSpacing: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        imageRendering: "pixelated",
        outline: "1px solid #684c27",
        outlineOffset: "-1px",
        opacity: 0.98,
        transition: "opacity 0.1s cubic-bezier(.5,0,.5,1)",
      }}
    >
      {text}
    </div>,
    document.body
  );
}
