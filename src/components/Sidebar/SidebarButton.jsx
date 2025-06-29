import React from "react";

/**
 * SidebarButton:
 * - bg: PNG bottone normale
 * - bgHover: PNG su hover
 * - bgActive: PNG attivo
 * - icon: PNG icona centrale
 * - isActive: bool attivo
 * - isHovered: bool hover
 * - onMouseEnter, onMouseLeave, onClick: eventi
 * - buttonSize: dimensione lato bottone (px)
 * - iconSize: dimensione icona (px)
 * - style: oggetto {top, left, ...} per posizione assoluta personalizzata
 */

const SidebarButton = ({
  bg,
  bgHover,
  bgActive,
  icon,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  alt,
  buttonSize = 64, // <-- valore di default
  iconSize = 36,   // <-- valore di default
  style = {},      // <-- puoi passare {top, left, zIndex, ...}
}) => (
  <button
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={{
      width: buttonSize,
      height: buttonSize,
      padding: 0,
      border: "none",
      background: "none",
      cursor: "pointer",
      position: "absolute", // IMPORTANTE per posizionamento libero
      outline: "none",
      margin: 0,
      ...style, // 👈 qui puoi sovrascrivere top/left/altro!
    }}
  >
    {/* Sfondo bottone (varia tra default, hover, attivo) */}
    <img
      src={isActive ? bgActive : isHovered ? bgHover : bg}
      alt=""
      style={{
        width: buttonSize,
        height: buttonSize,
        imageRendering: "pixelated",
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
      draggable={false}
    />
    {/* Icona centrale */}
    <img
      src={icon}
      alt={alt}
      style={{
        width: iconSize,
        height: iconSize,
        imageRendering: "pixelated",
        position: "absolute",
        left: (buttonSize - iconSize) / 2,
        top: (buttonSize - iconSize) / 2,
        pointerEvents: "none",
        zIndex: 2,
      }}
      draggable={false}
    />
  </button>
);

export default SidebarButton;
