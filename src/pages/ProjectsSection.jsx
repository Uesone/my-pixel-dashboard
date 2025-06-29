import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import PixelTooltip from "../components/PixelTooltip";
import PixelScrollbar from "../components/PixelScrollbar";
import { useLanguage } from "../components/LanguageContext.jsx";

// === Assets grafici ===
import linePng from "../assets/page-content-sprites/holders/0.png";
import holderPng from "../assets/content/holders/3.png";
import holderFilledPng from "../assets/content/holders/4.png";
import infoBarPng from "../assets/content/holders/10.png";
import nextArrowPng from "../assets/content/buttons/2.png";
import scrollbarBarPng from "../assets/content/holders/9.png";
import scrollbarHandlePng from "../assets/content/buttons/1.png";
import item0 from "../assets/content/items/0.png";
import item1 from "../assets/content/items/1.png";
import item2 from "../assets/content/items/2.png";
import item3 from "../assets/content/items/3.png";
import item4 from "../assets/content/items/4.png";

// === CONFIGURAZIONI LAYOUT & ANIMAZIONE ===
const SLOT_SIZE = 32, GRID_COLS = 4, GRID_ROWS_VISIBLE = 3, GRID_GAP = 15;
const WRAPPER_TOP = 80, WRAPPER_LEFT = 72;
const WRAPPER_WIDTH = GRID_COLS * SLOT_SIZE + (GRID_COLS - 1) * GRID_GAP;
const WRAPPER_HEIGHT = GRID_ROWS_VISIBLE * SLOT_SIZE + (GRID_ROWS_VISIBLE - 1) * GRID_GAP;
const INFOBAR_TOP = 205, INFOBAR_LEFT = 20, INFOBAR_WIDTH = 275, INFOBAR_HEIGHT = 80;
// --- Modifica qui per cambiare dimensione e posizione icona infobar! ---
const INFOBAR_ICON_WIDTH = 45;    // larghezza icona infobar
const INFOBAR_ICON_HEIGHT = 45;   // altezza icona infobar
const INFOBAR_ICON_TOP = 17;      // distanza dal top di infobar
const INFOBAR_ICON_LEFT = 12;     // distanza dal left di infobar
// -----------------------------------------------------------------------
const DESC_TOP = 14, DESC_LEFT = 70, DESC_WIDTH = 170, DESC_HEIGHT = 50, DESC_FONT_SIZE = 12;
const DESC_FONT_FAMILY = "'VT323', monospace", DESC_COLOR = "#4b2d11", DESC_LETTER_SPACING = 0;
const TYPEWRITER_SPEED = 19, CHAR_PER_PAGE = 300;
const ARROW_NEXT_TOP = 298, ARROW_NEXT_LEFT = 375, ARROW_NEXT_WIDTH = 32, ARROW_NEXT_HEIGHT = 38;

// === OGGETTI PORTFOLIO (solo dati tecnici, niente testo qui!) ===
const PROJECTS = [
  {
    id: "pokecard",
    icon: item0,
    iconSize: 25, iconTop: 3, iconLeft: 3.6
  },
  {
    id: "pokecard-backend",
    icon: item1,
    iconSize: 25, iconTop: 3, iconLeft: 3.5
  },
  {
    id: "spotify",
    icon: item2,
    iconSize: 25, iconTop: 3, iconLeft: 3.5
  },
  {
    id: "meteo",
    icon: item3,
    iconSize: 25, iconTop: 3, iconLeft: 4
  },
  {
    id: "trasporti",
    icon: item4,
    iconSize: 25, iconTop: 2, iconLeft: 4
  }
];

// === HOOK Typewriter per descrizione progetto ===
function useTypewriterText(lines, charPerPage, resetKey = 0) {
  const [page, setPage] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef();

  useEffect(() => { setPage(0); }, [resetKey]);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    clearInterval(timerRef.current);
    const text = lines && lines[page] ? lines[page] : "";
    timerRef.current = setInterval(() => {
      if (i < text.length && i < charPerPage) {
        setDisplayed(text.slice(0, i + 1)); i++;
      } else {
        clearInterval(timerRef.current); setDone(true);
      }
    }, TYPEWRITER_SPEED);
    return () => clearInterval(timerRef.current);
  }, [page, lines, charPerPage]);

  const hasNext = lines && page < lines.length - 1;
  const hasPrev = page > 0;
  const next = () => { if (hasNext) setPage(p => p + 1); };
  const prev = () => { if (hasPrev) setPage(p => p - 1); };

  return { displayed, done, page, hasNext, hasPrev, next, prev };
}

// === Griglia e slots
const GRID_ROWS_TOTAL = Math.ceil(PROJECTS.length / GRID_COLS) + 3;
const TOTAL_SLOTS = GRID_ROWS_TOTAL * GRID_COLS;

const ProjectsSection = () => {
  const { t } = useLanguage(); // 👈 Usa il context per le traduzioni

  // --- Prendi la lista progetti e titolo dalla lingua attuale ---
  const translatedProjects = t("projects.items") || [];
  const projectsTitle = t("projects.title") || "Projects";

  // Mappa id -> testo tradotto
  const projectMap = Object.fromEntries(
    translatedProjects.map((p, idx) => {
      return [PROJECTS[idx]?.id, p];
    })
  );

  // --- Accoppia asset tecnici a testo tradotto ---
  const slots = Array(TOTAL_SLOTS)
    .fill(null)
    .map((_, i) => {
      const meta = PROJECTS[i];
      if (!meta) return null;
      const data = projectMap[meta.id] || {};
      return {
        ...meta,
        ...data // name, tooltip, desc
      };
    });

  // --- Stati della UI ---
  const [scrollTop, setScrollTop] = useState(0);
  const maxScroll = GRID_ROWS_TOTAL - GRID_ROWS_VISIBLE;
  const [selected, setSelected] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  // --- Descrizione progetto selezionato, animata ---
  const selectedDesc =
    selected !== null && slots[selected] && slots[selected].desc
      ? slots[selected].desc
      : [""];

  const { displayed, done, hasNext, hasPrev, next, prev } = useTypewriterText(
    selectedDesc, CHAR_PER_PAGE, resetKey
  );

  // --- Tooltip handlers
  const handleMouseEnter = (e, project) => {
    if (!project) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: project.tooltip || project.name || "",
      x: rect.left + rect.width / 2,
      y: rect.top + 50
    });
  };
  const handleMouseLeave = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

  // --- Slots visibili nella viewport (3 righe) ---
  const start = scrollTop * GRID_COLS;
  const end = start + GRID_ROWS_VISIBLE * GRID_COLS;
  const visibleSlots = slots.slice(start, end);

  return (
    <PageWrapper>
      {/* --- LINEE DECORATIVE + TITOLO --- */}
      <img src={linePng} alt="linea sinistra"
        style={{
          position: "absolute", top: 20, left: 15,
          width: 50, height: 70, zIndex: 13, pointerEvents: "none"
        }} draggable={false} />
      <img src={linePng} alt="linea destra"
        style={{
          position: "absolute", top: 20, left: 251,
          width: 50, height: 70, zIndex: 13, pointerEvents: "none",
          transform: "scaleX(-1)", transformOrigin: "center center"
        }} draggable={false} />
      <div style={{
        position: "absolute", top: 4, left: 55,
        fontFamily: "'VT323', monospace", fontSize: 52, color: "#24170b",
        letterSpacing: 1.5, padding: "3px 16px", zIndex: 20,
        textShadow: "-2px 2px 0 #e7d7b6, 2px 2px 0 #e7d7b6, 2px 4px 2px #7e6643"
      }}>
        {projectsTitle}
      </div>

      {/* --- INVENTARIO: griglia slot + SCROLLBAR custom pixel art --- */}
      <div style={{
        position: "absolute", top: WRAPPER_TOP, left: WRAPPER_LEFT,
        width: WRAPPER_WIDTH + 28,
        height: WRAPPER_HEIGHT, zIndex: 12,
        overflow: "visible",
        display: "flex",
        flexDirection: "row"
      }}>
        <div
          style={{
            width: WRAPPER_WIDTH, height: WRAPPER_HEIGHT,
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_COLS}, ${SLOT_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_ROWS_VISIBLE}, ${SLOT_SIZE}px)`,
            gap: `${GRID_GAP}px`, background: "none"
          }}
          onWheel={e => {
            if (maxScroll > 0) {
              setScrollTop(prev =>
                Math.max(0, Math.min(maxScroll, prev + (e.deltaY > 0 ? 1 : -1)))
              );
            }
          }}
        >
          {visibleSlots.map((project, i) => {
            const size = project?.iconSize || SLOT_SIZE - 8;
            const top = project?.iconTop !== undefined ? project.iconTop : 4;
            const left = project?.iconLeft !== undefined ? project.iconLeft : 4;
            return (
              <div
                key={i + start}
                style={{
                  width: SLOT_SIZE, height: SLOT_SIZE, position: "relative",
                  background: "none", cursor: project ? "pointer" : "default"
                }}
                tabIndex={project ? 0 : -1}
                onClick={() => {
                  if (project) {
                    setSelected(i + start);
                    setResetKey(k => k + 1);
                  }
                }}
                onMouseEnter={e => handleMouseEnter(e, project)}
                onMouseMove={e => handleMouseEnter(e, project)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={project && selected === i + start ? holderFilledPng : holderPng}
                  alt="slot"
                  style={{
                    width: SLOT_SIZE, height: SLOT_SIZE,
                    imageRendering: "pixelated", display: "block"
                  }}
                  draggable={false}
                />
                {project && (
                  <img
                    src={project.icon}
                    alt={project.name}
                    title={project.name}
                    style={{
                      position: "absolute", top, left,
                      width: size, height: size,
                      imageRendering: "pixelated", pointerEvents: "none"
                    }}
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* --- SCROLLBAR PIXEL ART --- */}
        {maxScroll > 0 && (
          <PixelScrollbar
            height={WRAPPER_HEIGHT}
            scrollTop={scrollTop}
            maxScroll={maxScroll}
            onScrollChange={setScrollTop}
            barPng={scrollbarBarPng}
            handlePng={scrollbarHandlePng}
            left={WRAPPER_WIDTH + 4}
            top={0}
          />
        )}
      </div>

      {/* --- INFO BAR + ICONA + DESCRIZIONE: SOLO SE SLOT SELEZIONATO --- */}
      {selected !== null && slots[selected] && (
        <>
          <img src={infoBarPng} alt="info bar"
            style={{
              position: "absolute", top: INFOBAR_TOP, left: INFOBAR_LEFT,
              width: INFOBAR_WIDTH, height: INFOBAR_HEIGHT,
              imageRendering: "pixelated", zIndex: 15, pointerEvents: "none"
            }} draggable={false} />

          {/* --- Icona del progetto selezionato nell'infobar --- */}
          <img
            src={slots[selected].icon}
            alt={slots[selected].name}
            style={{
              position: "absolute",
              top: INFOBAR_TOP + INFOBAR_ICON_TOP,      // USO TOP CONFIGURABILE
              left: INFOBAR_LEFT + INFOBAR_ICON_LEFT,   // USO LEFT CONFIGURABILE
              width: INFOBAR_ICON_WIDTH,
              height: INFOBAR_ICON_HEIGHT,
              imageRendering: "pixelated",
              zIndex: 16,
              pointerEvents: "none"
            }}
            draggable={false}
          />

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
              userSelect: "none"
            }}
          >
            {displayed}
          </div>

          {done && hasNext && (
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
                transition: "opacity 0.15s"
              }}
              draggable={false}
            />
          )}
        </>
      )}

      {/* --- TOOLTIP PIXEL ART --- */}
      <PixelTooltip
        visible={tooltip.visible}
        text={tooltip.text}
        x={tooltip.x}
        y={tooltip.y}
      />
    </PageWrapper>
  );
};

export default ProjectsSection;
