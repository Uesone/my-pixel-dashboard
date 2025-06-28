import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import linePng from "../assets/page-content-sprites/holders/0.png";
import holderPng from "../assets/content/holders/3.png";      // Slot PNG vuoto (default)
import holderFilledPng from "../assets/content/holders/4.png"; // Slot PNG pieno (selezionato!)

import item0 from "../assets/content/items/0.png";
import item1 from "../assets/content/items/1.png";
import item2 from "../assets/content/items/2.png";
import item3 from "../assets/content/items/3.png";
import item4 from "../assets/content/items/4.png";
import item5 from "../assets/content/items/5.png";

// === PARAMETRI PRINCIPALI ===
const SLOT_SIZE = 32;          // Lato slot PNG in px
const GRID_COLS = 4;           // Numero colonne
const GRID_ROWS = 3;           // Numero righe (qui 3, così hai 12 slot)
const GRID_GAP = 15;           // Spazio tra slot (px)
const TOTAL_SLOTS = GRID_COLS * GRID_ROWS;
const WRAPPER_TOP = 80;        // Posizione wrapper-griglia dall'alto (px)
const WRAPPER_LEFT = 73;       // Posizione wrapper-griglia da sinistra (px)
const WRAPPER_WIDTH = GRID_COLS * SLOT_SIZE + (GRID_COLS - 1) * GRID_GAP;
const WRAPPER_HEIGHT = GRID_ROWS * SLOT_SIZE + (GRID_ROWS - 1) * GRID_GAP;

// Demo: 6 progetti veri, con dimensioni individuali delle icone!
const PROJECTS = [
  { id: 1, name: "LFG App", icon: item0, desc: "Gruppi reali/online", iconSize: 20, iconTop: 6, iconLeft: 6 },
  { id: 2, name: "Portfolio", icon: item1, desc: "Sito personale", iconSize: 20, iconTop: 6, iconLeft: 6 },
  { id: 3, name: "Gamebot", icon: item2, desc: "Bot PvP", iconSize: 16, iconTop: 7, iconLeft: 8},
  { id: 4, name: "MiniCMS", icon: item3, desc: "Gestione contenuti",iconSize: 20, iconTop: 6, iconLeft: 6  },
  { id: 5, name: "PixelChat", icon: item4, desc: "Chat pixelata", iconSize: 20, iconTop: 6, iconLeft: 6  },
  { id: 6, name: "XP Bar", icon: item5, desc: "Progress bar", iconSize: 18, iconTop: 7, iconLeft: 7  },
];

const ProjectsSection = () => {
  const slots = Array(TOTAL_SLOTS)
    .fill(null)
    .map((_, i) => PROJECTS[i] || null);

  const [selected, setSelected] = useState(null);

  return (
    <PageWrapper>
      {/* Linea decorativa sinistra */}
      <img
        src={linePng}
        alt="linea sinistra"
        style={{
          position: "absolute",
          top: 20,
          left: 14,
          width: 62,
          height: 70,
          zIndex: 13,
          pointerEvents: "none",
        }}
        draggable={false}
      />
      {/* Linea decorativa destra */}
      <img
        src={linePng}
        alt="linea destra"
        style={{
          position: "absolute",
          top: 20,
          left: 240,
          width: 62,
          height: 70,
          zIndex: 13,
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />
      {/* Titolo */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 64,
          fontFamily: "'VT323', monospace",
          fontSize: 52,
          color: "#24170b",
          letterSpacing: -1,
          padding: "3px 16px",
          zIndex: 20,
          textShadow: `
            -2px 2px 0 #e7d7b6,
            2px 2px 0 #e7d7b6,
            2px 4px 2px #7e6643
          `,
        }}
      >
        Projects
      </div>
      {/* === INVENTARIO: WRAPPER ASSOLUTO + GRIGLIA INTERNA === */}
      <div
        style={{
          position: "absolute",
          top: WRAPPER_TOP,
          left: WRAPPER_LEFT,
          width: WRAPPER_WIDTH,
          height: WRAPPER_HEIGHT,
          zIndex: 12,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_COLS}, ${SLOT_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, ${SLOT_SIZE}px)`,
            gap: `${GRID_GAP}px`,
            background: "none",
          }}
        >
          {slots.map((project, i) => {
            // --- Default valori ---
            const size = project?.iconSize || SLOT_SIZE - 8;
            const top = project?.iconTop !== undefined ? project.iconTop : 4;
            const left = project?.iconLeft !== undefined ? project.iconLeft : 4;

            return (
              <div
                key={i}
                style={{
                  width: SLOT_SIZE,
                  height: SLOT_SIZE,
                  position: "relative",
                  background: "none",
                  cursor: project ? "pointer" : "default",
                }}
                tabIndex={project ? 0 : -1}
                onClick={() => project && setSelected(i)}
              >
                {/* PNG slot: cambia tra vuoto e pieno! */}
                <img
                  src={
                    project && selected === i
                      ? holderFilledPng
                      : holderPng
                  }
                  alt="slot"
                  style={{
                    width: SLOT_SIZE,
                    height: SLOT_SIZE,
                    imageRendering: "pixelated",
                    display: "block",
                  }}
                  draggable={false}
                />
                {/* Icona progetto, solo se presente */}
                {project && (
                  <img
                    src={project.icon}
                    alt={project.name}
                    title={project.name}
                    style={{
                      position: "absolute",
                      top,
                      left,
                      width: size,
                      height: size,
                      imageRendering: "pixelated",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProjectsSection;
