import React from "react";

/**
 * SidebarButton: bottone pixel art per la sidebar
 * Props:
 * - bg: PNG default
 * - bgHover: PNG su hover
 * - bgActive: PNG attivo
 * - icon: PNG icona centrale
 * - isActive, isHovered: bool (stato)
 * - onMouseEnter, onMouseLeave, onClick: eventi
 * - buttonSize, iconSize: dimensioni
 * - iconOffsetX, iconOffsetY: offset icona centrale
 * - style: oggetto posizione/dimensione
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
  iconOffsetX = 0,
  iconOffsetY = 0,
  style = {},
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
    {/* Sfondo bottone */}
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
          left: `calc(50% - ${iconSize / 2}px + ${iconOffsetX}px)`,
          top: `calc(50% - ${iconSize / 2}px + ${iconOffsetY}px)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
        draggable={false}
      />
    )}
  </button>
);

export default SidebarButton;
