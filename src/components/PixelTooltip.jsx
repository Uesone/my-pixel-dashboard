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
          "0 2px 0 #c8b16b, 0 8px 18px 0 #0008, 0 0 0 4px #e8d1a8, 2px 3px 0 #a38b5c",
        textShadow:
          "0 1px 0 #fff, 0 2px 1px #ecdca9, 1px 2px 0 #8e6e40",
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
