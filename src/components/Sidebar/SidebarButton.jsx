import React from "react";

/**
 * SidebarButton: pulsante pixel art custom per sidebar navigation
 * - bg: PNG bottone normale
 * - bgHover: PNG su hover
 * - bgActive: PNG attivo
 * - icon: PNG icona centrale
 * - isActive: bool attivo
 * - isHovered: bool hover
 * - onMouseEnter, onMouseLeave, onClick: eventi
 * - buttonSize: lato bottone (px)
 * - iconSize: lato icona centrale (px)
 * - iconOffsetX, iconOffsetY: offset singolo icona centrale (default 0)
 * - style: oggetto {top, left, width, height, ...} posizione e dimensione
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
  buttonSize = 64,
  iconSize = 36,
  iconOffsetX = 0, // Offset X aggiuntivo (solo bandiera, normalmente 0)
  iconOffsetY = 0, // Offset Y aggiuntivo (solo bandiera, normalmente 0)
  style = {}, // passa {top, left, width, height} dal parent!
}) => (
  <button
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={{
      width: style.width || buttonSize,
      height: style.height || buttonSize,
      padding: 0,
      border: "none",
      background: "none",
      cursor: "pointer",
      position: "absolute",
      outline: "none",
      margin: 0,
      ...style,
    }}
    tabIndex={alt === "Language" ? -1 : 0}
    aria-label={alt}
  >
    {/* Sfondo bottone (default, hover, attivo) */}
    <img
      src={isActive ? bgActive : isHovered ? bgHover : bg}
      alt=""
      style={{
        width: "100%",
        height: "100%",
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
    {icon && (
      <img
        src={icon}
        alt={alt}
        style={{
          width: iconSize,
          height: iconSize,
          imageRendering: "pixelated",
          position: "absolute",
          left: `calc(50% - ${iconSize / 2}px + ${iconOffsetX}px)`, // Applica offset X
          top: `calc(50% - ${iconSize / 2}px + ${iconOffsetY}px)`,  // Applica offset Y
          pointerEvents: "none",
          zIndex: 2,
        }}
        draggable={false}
      />
    )}
  </button>
);

export default SidebarButton;
