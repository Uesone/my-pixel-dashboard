import React, { useRef, useEffect, useState } from "react";
import PixelTooltip from "./PixelTooltip";

/**
 * CarouselSkills - carosello pixel-art a doppia riga con tooltip 8bit.
 * Props:
 * - icons: array di oggetti {src, label, ...}
 * - tooltipPositionFn: funzione custom per posizionare il tooltip (opzionale)
 */
export default function CarouselSkills({
  icons,
  holderIcon,
  holdersPerRow = 7,
  holderSize = 34,
  iconSize = 20,
  gapX = 4,
  gapY = 8,
  speed = 0.8,
  width = 270,
  top = 186,
  left = 26,
  zIndex = 50,
  style = {},
  tooltipPositionFn,
}) {
  // Stato carosello e tooltip
  const [paused, setPaused] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, label: "", x: 0, y: 0 });

  const frame = useRef();
  const animation = useRef();

  // Normalizzazione icone
  const normalizedIcons = icons.map(icon =>
    typeof icon === "string" ? { src: icon } : icon
  );

  // Divisione in due righe alternate
  const rows = [[], []];
  normalizedIcons.forEach((ic, i) => rows[i % 2].push(ic));
  const longestRow = Math.max(...rows.map(r => r.length));

  // --- Animazione infinita (performance e cleanup)
  useEffect(() => {
    if (paused) return;
    animation.current = requestAnimationFrame(() => {
      setScroll((s) => (s + speed) % ((holderSize + gapX) * longestRow));
    });
    return () => {
      if (animation.current) cancelAnimationFrame(animation.current);
    };
  }, [scroll, paused, speed, holderSize, gapX, longestRow]);

  // Tooltip con posizione custom (fixato!)
  function showTooltip(e, icon) {
    if (!icon.label) return;
    let pos = { x: e.clientX, y: e.clientY + 16 }; // fallback
    if (typeof tooltipPositionFn === "function") {
      pos = tooltipPositionFn(e, icon);
    }
    setTooltip({
      visible: true,
      label: icon.label,
      ...pos,
    });
    setPaused(true);
  }

  function hideTooltip() {
    setTooltip({ visible: false, label: "", x: 0, y: 0 });
    setPaused(false);
  }

  // --- RENDER
  return (
    <>
      {/* Tooltip 8bit sotto il cursore */}
      <PixelTooltip
        visible={tooltip.visible}
        text={tooltip.label}
        x={tooltip.x}
        y={tooltip.y}
      />

      <div
        style={{
          position: "absolute",
          top,
          left,
          width: width || (holderSize + gapX) * holdersPerRow,
          height: 2 * (holderSize + gapY) - gapY,
          overflow: "hidden",
          zIndex,
          pointerEvents: "auto",
          background: "none",
          ...style,
        }}
        ref={frame}
        onMouseLeave={hideTooltip}
      >
        {[0, 1].map((rowIdx) => (
          <div
            key={rowIdx}
            style={{
              position: "absolute",
              top: rowIdx * (holderSize + gapY),
              left: 0,
              display: "flex",
              flexDirection: "row",
              gap: gapX,
              width: "100%",
              height: holderSize,
              willChange: "transform",
              pointerEvents: "none", // evita overlay artefatti
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: gapX,
                transform: `translateX(${-scroll}px)`,
                pointerEvents: "auto",
              }}
            >
              {/* Icone vere + duplicato per effetto infinito */}
              {[...rows[rowIdx], ...rows[rowIdx]].map((icon, i) => (
                <span
                  key={i}
                  style={{
                    width: holderSize,
                    height: holderSize,
                    position: "relative",
                    display: "block",
                    cursor: icon.label ? "pointer" : "default",
                    pointerEvents: "auto",
                  }}
                  tabIndex={icon.label ? 0 : -1}
                  aria-label={icon.label || undefined}
                  onMouseEnter={e => showTooltip(e, icon)}
                  onMouseMove={e => showTooltip(e, icon)}
                  onMouseLeave={hideTooltip}
                  onFocus={icon.label ? e => showTooltip(e, icon) : undefined}
                  onBlur={icon.label ? hideTooltip : undefined}
                >
                  {/* Holder frame */}
                  <img
                    src={holderIcon}
                    alt=""
                    width={holderSize}
                    height={holderSize}
                    style={{
                      imageRendering: "pixelated",
                      opacity: 0.98,
                      display: "block",
                    }}
                    draggable={false}
                    loading={i < holdersPerRow ? "eager" : "lazy"} // PATCH: prime visibili eagerly!
                  />
                  {/* Icona vera */}
                  <img
                    src={icon.src}
                    alt={icon.label ? icon.label : `icon${i}`}
                    width={icon.iconSize || iconSize}
                    height={icon.iconSize || iconSize}
                    style={{
                      position: "absolute",
                      top:
                        (holderSize - (icon.iconSize || iconSize)) / 2 +
                        (icon.offsetY || 0),
                      left:
                        (holderSize - (icon.iconSize || iconSize)) / 2 +
                        (icon.offsetX || 0),
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                    loading={i < holdersPerRow ? "eager" : "lazy"} // PATCH: prime visibili eagerly!
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
