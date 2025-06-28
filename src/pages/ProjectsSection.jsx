import React, { useState, useEffect, useRef } from "react";
import PageWrapper from "../components/PageWrapper";
import linePng from "../assets/page-content-sprites/holders/0.png";
import holderPng from "../assets/content/holders/3.png";
import holderFilledPng from "../assets/content/holders/4.png";
import infoBarPng from "../assets/content/holders/10.png";
import nextArrowPng from "../assets/content/buttons/2.png";

const SLOT_SIZE = 32;
const GRID_COLS = 4;
const GRID_ROWS = 3;
const GRID_GAP = 15;
const TOTAL_SLOTS = GRID_COLS * GRID_ROWS;

const WRAPPER_TOP = 80;
const WRAPPER_LEFT = 73;
const WRAPPER_WIDTH = GRID_COLS * SLOT_SIZE + (GRID_COLS - 1) * GRID_GAP;
const WRAPPER_HEIGHT = GRID_ROWS * SLOT_SIZE + (GRID_ROWS - 1) * GRID_GAP;

const INFOBAR_TOP = 205;
const INFOBAR_LEFT = 20;
const INFOBAR_WIDTH = 275;
const INFOBAR_HEIGHT = 80;

const CIRCLE_SIZE = 36;
const CIRCLE_ICON_OFFSET_TOP = 23;
const CIRCLE_ICON_OFFSET_LEFT = 19;

const DESC_TOP = 18;
const DESC_LEFT = 70;
const DESC_WIDTH = 180;
const DESC_HEIGHT = 45;
const DESC_FONT_SIZE = 12;
const DESC_FONT_FAMILY = "'VT323', monospace";
const DESC_COLOR = "#4b2d11";
const DESC_SHADOW = "1px 1px 0 #f6e8b2, 0px 2px 2px #b59b62";
const DESC_LETTER_SPACING = 0;

const TYPEWRITER_SPEED = 19;
const CHAR_PER_PAGE = 300;

// Frecce: posizione/dimensioni
const ARROW_NEXT_TOP = 295;
const ARROW_NEXT_LEFT = 370;
const ARROW_NEXT_WIDTH = 32;
const ARROW_NEXT_HEIGHT = 38;

const ARROW_PREV_REL_TOP = 2;
const ARROW_PREV_REL_LEFT = -28;
const ARROW_PREV_WIDTH = 22;
const ARROW_PREV_HEIGHT = 27;

// --- OGGETTI PORTFOLIO ---
import item0 from "../assets/content/items/0.png";
import item1 from "../assets/content/items/1.png";
import item2 from "../assets/content/items/2.png";
import item3 from "../assets/content/items/3.png";
import item4 from "../assets/content/items/4.png";
import item5 from "../assets/content/items/5.png";

const PROJECTS = [
  {
    id: 1,
    name: "LFG App",
    icon: item0,
    desc: [
      "Gruppi reali/online, con matchmaking ispirato agli MMO.",
      "Include feed eventi, reputazione e sistema join automatico/manuale."
    ],
    iconSize: 20,
    iconTop: 6,
    iconLeft: 6
  },
  {
    id: 2,
    name: "Portfolio",
    icon: item1,
    desc: [
      "Sito personale in pixel art e React, stile retro-game.",
      "Animazioni GSAP, routing custom, layout responsive e tooltips."
    ],
    iconSize: 20,
    iconTop: 6,
    iconLeft: 6
  },
  {
    id: 3,
    name: "Gamebot",
    icon: item2,
    desc: [
      "Bot PvP per giochi online con automazione smart.",
      "Scritto in Python e Dart, usa overlay e macro real-time."
    ],
    iconSize: 16,
    iconTop: 7,
    iconLeft: 8
  },
  {
    id: 4,
    name: "MiniCMS",
    icon: item3,
    desc: [
      "Mini-CMS Java, Spring Boot + PostgreSQL.",
      "Gestione contenuti veloce, utenti, permessi, backend REST."
    ],
    iconSize: 20,
    iconTop: 6,
    iconLeft: 6
  },
  {
    id: 5,
    name: "PixelChat",
    icon: item4,
    desc: [
      "Chat pixelata ispirata agli RPG con socket real-time.",
      "Stanze pubbliche/private, avatar custom e menù in stile retro."
    ],
    iconSize: 20,
    iconTop: 6,
    iconLeft: 6
  },
  {
    id: 6,
    name: "XP Bar",
    icon: item5,
    desc: [
      "XP bar animata per siti web, con livelli e gamification.",
      "Personalizzabile, JS puro o React, integrabile in qualsiasi dashboard."
    ],
    iconSize: 18,
    iconTop: 7,
    iconLeft: 7
  }
];

// --- Hook typewriter PAGINAZIONE & RESET ---
function useTypewriterText(lines, charPerPage, resetKey = 0) {
  const [page, setPage] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef();

  // Reset pagina quando cambia "resetKey"
  useEffect(() => {
    setPage(0);
  }, [resetKey]);

  // Animazione ogni volta che cambia pagina/linea
  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let i = 0;
    clearInterval(timerRef.current);

    const text = lines && lines[page] ? lines[page] : "";
    timerRef.current = setInterval(() => {
      if (i < text.length && i < charPerPage) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timerRef.current);
        setDone(true);
      }
    }, TYPEWRITER_SPEED);

    return () => clearInterval(timerRef.current);
  }, [page, lines, charPerPage]);

  const hasNext = lines && page < lines.length - 1;
  const hasPrev = page > 0;
  const next = () => {
    if (hasNext) {
      setPage((p) => p + 1);
      setDone(false);
    }
  };
  const prev = () => {
    if (hasPrev) setPage((p) => p - 1);
  };

  return { displayed, done, page, hasNext, hasPrev, next, prev };
}

const ProjectsSection = () => {
  // Prepara slots (pieni e vuoti)
  const slots = Array(TOTAL_SLOTS)
    .fill(null)
    .map((_, i) => PROJECTS[i] || null);

  // Stato slot selezionato + key di reset per animazione
  const [selected, setSelected] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  // Descrizione paginata (array di stringhe)
  const selectedDesc =
    selected !== null && slots[selected] && slots[selected].desc
      ? slots[selected].desc
      : [""];

  // Hook typewriter con resetKey (ogni cambio selezione)
  const { displayed, done, hasNext, hasPrev, next, prev } = useTypewriterText(
    selectedDesc,
    CHAR_PER_PAGE,
    resetKey
  );

  return (
    <PageWrapper>
      {/* --- LINEE DECORATIVE + TITOLO --- */}
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
          pointerEvents: "none"
        }}
        draggable={false}
      />
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
          transformOrigin: "center center"
        }}
        draggable={false}
      />
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
          `
        }}
      >
        Projects
      </div>

      {/* --- INVENTARIO: griglia slot selezionabili --- */}
      <div
        style={{
          position: "absolute",
          top: WRAPPER_TOP,
          left: WRAPPER_LEFT,
          width: WRAPPER_WIDTH,
          height: WRAPPER_HEIGHT,
          zIndex: 12
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
            background: "none"
          }}
        >
          {slots.map((project, i) => {
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
                  cursor: project ? "pointer" : "default"
                }}
                tabIndex={project ? 0 : -1}
                onClick={() => {
                  if (project) {
                    setSelected(i);
                    setResetKey((k) => k + 1); // Ogni selezione resetta la paginazione!
                  }
                }}
              >
                <img
                  src={project && selected === i ? holderFilledPng : holderPng}
                  alt="slot"
                  style={{
                    width: SLOT_SIZE,
                    height: SLOT_SIZE,
                    imageRendering: "pixelated",
                    display: "block"
                  }}
                  draggable={false}
                />
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
                      pointerEvents: "none"
                    }}
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- INFO BAR (PNG con cerchio e box descrizione) --- */}
      <img
        src={infoBarPng}
        alt="info bar"
        style={{
          position: "absolute",
          top: INFOBAR_TOP,
          left: INFOBAR_LEFT,
          width: INFOBAR_WIDTH,
          height: INFOBAR_HEIGHT,
          imageRendering: "pixelated",
          zIndex: 15,
          pointerEvents: "none"
        }}
        draggable={false}
      />

      {/* --- ICONA NEL CERCHIO della info bar --- */}
      {selected !== null && slots[selected]?.icon && (
        <img
          src={slots[selected].icon}
          alt={slots[selected].name}
          style={{
            position: "absolute",
            top: INFOBAR_TOP + CIRCLE_ICON_OFFSET_TOP,
            left: INFOBAR_LEFT + CIRCLE_ICON_OFFSET_LEFT,
            width: CIRCLE_SIZE - 4,
            height: CIRCLE_SIZE - 4,
            imageRendering: "pixelated",
            zIndex: 16,
            pointerEvents: "none"
          }}
          draggable={false}
        />
      )}

      {/* --- BOX DESCRIZIONE: testo animato, freccia indietro --- */}
      {selected !== null && slots[selected] && (
        <>
          <div
            style={{
              position: "absolute",
              top: INFOBAR_TOP + DESC_TOP,
              left: INFOBAR_LEFT + DESC_LEFT,
              width: DESC_WIDTH,
              height: DESC_HEIGHT,
              fontFamily: DESC_FONT_FAMILY,
              fontSize: DESC_FONT_SIZE,
              color: DESC_COLOR,
              letterSpacing: DESC_LETTER_SPACING,
              zIndex: 16,
              overflow: "hidden",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              textShadow: DESC_SHADOW,
              userSelect: "none"
            }}
          >
            {displayed}
            {/* Freccia indietro (prev) visibile solo se c'è una pagina precedente */}
            {done && hasPrev && (
              <img
                src={nextArrowPng}
                alt="indietro"
                onClick={prev}
                style={{
                  position: "absolute",
                  top: ARROW_PREV_REL_TOP,
                  left: ARROW_PREV_REL_LEFT,
                  width: ARROW_PREV_WIDTH,
                  height: ARROW_PREV_HEIGHT,
                  cursor: "pointer",
                  zIndex: 20,
                  filter: "drop-shadow(0 1px 0 #fffbe0)",
                  transition: "opacity 0.15s",
                  transform: "scaleX(-1)"
                }}
                draggable={false}
              />
            )}
          </div>
        </>
      )}

      {/* --- FRECCIA AVANTI: solo se c'è una pagina dopo, posizione assoluta --- */}
      {selected !== null && done && hasNext && (
        <img
          src={nextArrowPng}
          alt="continua"
          onClick={next}
          style={{
            position: "fixed",
            top: ARROW_NEXT_TOP,
            left: ARROW_NEXT_LEFT,
            width: ARROW_NEXT_WIDTH,
            height: ARROW_NEXT_HEIGHT,
            zIndex: 9999,
            cursor: "pointer",
            filter: "drop-shadow(0 1px 0 #fffbe0)",
            transition: "opacity 0.15s"
          }}
          draggable={false}
        />
      )}
    </PageWrapper>
  );
};

export default ProjectsSection;
