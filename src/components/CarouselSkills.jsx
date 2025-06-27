import React, { useRef, useEffect, useState } from "react";
import PixelTooltip from "./PixelTooltip";

/**
 * CarouselSkills
 * - Carosello automatico (2 righe) di holders+icone, si ferma all'hover su qualsiasi icona.
 * - Tooltip 8bit compare **sotto il cursore** (se è presente la prop "label").
 * - Gestisce posizione corretta anche con dashboard scalata.
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
}) {
  // --- CONFIG: SCALA DASHBOARD (usato solo se vuoi logiche custom)
  const SCALE = 1.4;

  // Stato carosello (pausa su hover) e tooltip
  const [paused, setPaused] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, label: "", x: 0, y: 0 });

  const frame = useRef();
  const animation = useRef();

  // --- Normalizzazione icone
  const normalizedIcons = icons.map(icon =>
    typeof icon === "string" ? { src: icon } : icon
  );

  // --- Divisione in due righe alternate
  const rows = [[], []];
  normalizedIcons.forEach((ic, i) => rows[i % 2].push(ic));
  const longestRow = Math.max(...rows.map(r => r.length));

  // --- Animazione carosello infinita
  useEffect(() => {
    if (paused) return;
    animation.current = requestAnimationFrame(() => {
      setScroll((s) => (s + speed) % ((holderSize + gapX) * longestRow));
    });
    return () => cancelAnimationFrame(animation.current);
    // eslint-disable-next-line
  }, [scroll, paused, speed, holderSize, gapX, longestRow]);

  /**
   * showTooltip: Mostra tooltip esattamente sotto il cursore,
   * indipendentemente dallo scaling della dashboard.
   * Usa e.clientX/e.clientY che sono già "scalate" (viewport absolute).
   */
  function showTooltip(e, icon) {
    if (!icon.label) return;
    setTooltip({
      visible: true,
      label: icon.label,
      x: e.clientX,         // posizione X del mouse nella viewport
      y: e.clientY + 16,    // 16px sotto il cursore (modifica per più/meno distanza)
    });
    setPaused(true);
  }

  function hideTooltip() {
    setTooltip({ visible: false, label: "", x: 0, y: 0 });
    setPaused(false);
  }

  // --- RENDER ---
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
              pointerEvents: "none", // Disattiva eventi per evitare overlay non necessari
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: gapX,
                transform: `translateX(${-scroll}px)`,
                pointerEvents: "auto", // Riattiva eventi solo sulle icone
              }}
            >
              {/* Icone vere */}
              {rows[rowIdx].map((icon, i) => (
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
                  tabIndex={0}
                  onMouseEnter={e => showTooltip(e, icon)}
                  onMouseMove={e => showTooltip(e, icon)}
                  onMouseLeave={hideTooltip}
                >
                  {/* Holder PNG frame */}
                  <img
                    src={holderIcon}
                    alt={`holder${i}`}
                    style={{
                      width: holderSize,
                      height: holderSize,
                      imageRendering: "pixelated",
                      opacity: 0.98,
                      display: "block",
                    }}
                    draggable={false}
                  />
                  {/* Icona vera */}
                  <img
                    src={icon.src}
                    alt={`icon${i}`}
                    style={{
                      position: "absolute",
                      top:
                        (holderSize - (icon.iconSize || iconSize)) / 2 +
                        (icon.offsetY || 0),
                      left:
                        (holderSize - (icon.iconSize || iconSize)) / 2 +
                        (icon.offsetX || 0),
                      width: icon.iconSize || iconSize,
                      height: icon.iconSize || iconSize,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                </span>
              ))}
              {/* Duplicato per effetto infinito */}
              {rows[rowIdx].map((icon, i) => (
                <span
                  key={`repeat-${i}`}
                  style={{
                    width: holderSize,
                    height: holderSize,
                    position: "relative",
                    display: "block",
                    cursor: icon.label ? "pointer" : "default",
                    pointerEvents: "auto",
                  }}
                  tabIndex={0}
                  onMouseEnter={e => showTooltip(e, icon)}
                  onMouseMove={e => showTooltip(e, icon)}
                  onMouseLeave={hideTooltip}
                >
                  <img
                    src={holderIcon}
                    alt={`holder-repeat${i}`}
                    style={{
                      width: holderSize,
                      height: holderSize,
                      imageRendering: "pixelated",
                      opacity: 0.98,
                      display: "block",
                    }}
                    draggable={false}
                  />
                  <img
                    src={icon.src}
                    alt={`icon-repeat${i}`}
                    style={{
                      position: "absolute",
                      top:
                        (holderSize - (icon.iconSize || iconSize)) / 2 +
                        (icon.offsetY || 0),
                      left:
                        (holderSize - (icon.iconSize || iconSize)) / 2 +
                        (icon.offsetX || 0),
                      width: icon.iconSize || iconSize,
                      height: icon.iconSize || iconSize,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                    draggable={false}
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
