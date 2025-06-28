import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import PixelTooltip from "../components/PixelTooltip";
import PixelScrollbar from "../components/PixelScrollbar";

// === Assets grafici ===
import linePng from "../assets/page-content-sprites/holders/0.png";
import holderPng from "../assets/content/holders/3.png";
import holderFilledPng from "../assets/content/holders/4.png";
import infoBarPng from "../assets/content/holders/10.png";
import nextArrowPng from "../assets/content/buttons/2.png";
import scrollbarBarPng from "../assets/content/holders/9.png";    // Barra SCROLL
import scrollbarHandlePng from "../assets/content/buttons/1.png"; // Handle SCROLL
import item0 from "../assets/content/items/0.png";
import item1 from "../assets/content/items/1.png";
import item2 from "../assets/content/items/2.png";
import item3 from "../assets/content/items/3.png";
import item4 from "../assets/content/items/4.png";
import item5 from "../assets/content/items/5.png";

// === CONFIGURAZIONI LAYOUT & ANIMAZIONE ===
const SLOT_SIZE = 32, GRID_COLS = 4, GRID_ROWS_VISIBLE = 3, GRID_GAP = 15;
const WRAPPER_TOP = 80, WRAPPER_LEFT = 72;
const WRAPPER_WIDTH = GRID_COLS * SLOT_SIZE + (GRID_COLS - 1) * GRID_GAP;
const WRAPPER_HEIGHT = GRID_ROWS_VISIBLE * SLOT_SIZE + (GRID_ROWS_VISIBLE - 1) * GRID_GAP;
const INFOBAR_TOP = 205, INFOBAR_LEFT = 20, INFOBAR_WIDTH = 275, INFOBAR_HEIGHT = 80;
const CIRCLE_SIZE = 36, CIRCLE_ICON_OFFSET_TOP = 23, CIRCLE_ICON_OFFSET_LEFT = 19;
const DESC_TOP = 14, DESC_LEFT = 70, DESC_WIDTH = 170, DESC_HEIGHT = 50, DESC_FONT_SIZE = 12;
const DESC_FONT_FAMILY = "'VT323', monospace", DESC_COLOR = "#4b2d11", DESC_LETTER_SPACING = 0;
const TYPEWRITER_SPEED = 19, CHAR_PER_PAGE = 300;
const ARROW_NEXT_TOP = 298, ARROW_NEXT_LEFT = 375, ARROW_NEXT_WIDTH = 32, ARROW_NEXT_HEIGHT = 38;

// === OGGETTI PORTFOLIO ===
const PROJECTS = [
  {
    id: 1,
    name: "PokeCard Collector",
    icon: item0,
    tooltip: "PokèDecks Frontend",
    desc: [
      "Frontend React per collezionare e cercare carte Pokémon con filtri e pixel art.",
      "Interfaccia moderna, ricerca in tempo reale, connessione al backend personalizzato.",
      "Contattami tramite Contacts per dettagli o visita GitHub."
    ],
    iconSize: 20, iconTop: 6, iconLeft: 6
  },
  {
    id: 2,
    name: "PokeCard Collector Backend",
    icon: item1,
    tooltip: "PokèDecks Backend",
    desc: [
      "Backend Java Spring Boot dedicato all’app PokeCard Collector.",
      "Gestione database, API RESTful, autenticazione e ottimizzazione performance.",
      "Contattami tramite Contacts per dettagli o visita GitHub."
    ],
    iconSize: 20, iconTop: 6, iconLeft: 6
  },
  {
    id: 3,
    name: "Spotify Clone",
    icon: item2,
    tooltip: "Spotify Clone",
    desc: [
      "Web app clone di Spotify: ricerca, player, album e artisti dinamici tramite API Deezer.",
      "Homepage ispirata a Spotify, navigazione tra album e artisti, player interattivo, ricerca live.",
      "Routing dinamico via URL params, responsive design mobile-first.",
      "Contattami tramite Contacts per dettagli o visita GitHub."
    ],
    iconSize: 16, iconTop: 7, iconLeft: 8
  },
  {
    id: 4,
    name: "App Meteo",
    icon: item3,
    tooltip: "App Meteo",
    desc: [
      "Applicazione React per consultare le previsioni meteo in tempo reale.",
      "Ricerca città, API openweather, design responsive e gestione errori.",
      "Contattami tramite Contacts per dettagli o visita GitHub."
    ],
    iconSize: 20, iconTop: 6, iconLeft: 6
  },
  {
    id: 5,
    name: "Agenzia Trasporti",
    icon: item4,
    tooltip: "Agenzia Trasporti",
    desc: [
      "Backend Java per gestione trasporti: tratte, orari, veicoli, utenti.",
      "Project team: modellazione ER, entità JPA, API REST e logiche di business.",
      "Backend, data modeling e supporto API in team.",
      "Per dettagli e codice consulta Contacts o GitHub."
    ],
    iconSize: 20, iconTop: 6, iconLeft: 6
  },
];

// === HOOK typewriter & paginazione (reset su cambio selezione) ===
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

// === IMPOSTAZIONE GRIGLIA (righe virtuali totali e slot totali) ===
const GRID_ROWS_TOTAL = Math.ceil(PROJECTS.length / GRID_COLS) + 3; // aggiungi slot vuoti in fondo
const TOTAL_SLOTS = GRID_ROWS_TOTAL * GRID_COLS;

const ProjectsSection = () => {
  // 1. Array slot: progetti + slot vuoti per scorrere la griglia
  const slots = Array(TOTAL_SLOTS).fill(null).map((_, i) => PROJECTS[i] || null);

  // 2. Stato scroll (indice della riga in alto, 0 = prima riga)
  const [scrollTop, setScrollTop] = useState(0);
  const maxScroll = GRID_ROWS_TOTAL - GRID_ROWS_VISIBLE;

  // 3. Selezione progetto (e reset animazione)
  const [selected, setSelected] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  // 4. Stato tooltip
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  // 5. Testo descrizione selezionata
  const selectedDesc =
    selected !== null && slots[selected] && slots[selected].desc
      ? slots[selected].desc
      : [""];

  // 6. Hook animazione testo
  const { displayed, done, hasNext, hasPrev, next, prev } = useTypewriterText(
    selectedDesc, CHAR_PER_PAGE, resetKey
  );

  // 7. Tooltip handlers: posizione e testo
  // Offset Y: se vuoi il tooltip SOPRA la cella, usa (rect.top - 50)
  //           se lo vuoi SOTTO, usa (rect.bottom + 10)
  const handleMouseEnter = (e, project) => {
    if (!project) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: project.tooltip || project.name,
      x: rect.left + rect.width / 2,
      y: rect.top - -50, // <- questo è equivalente a (rect.top + 50)
      // Consiglio: per "tooltip sopra", meglio rect.top - 50
      //            per "tooltip sotto", meglio rect.bottom + 10
      // Lasciato come da tua richiesta!
    });
  };
  const handleMouseLeave = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

  // 8. Calcolo slot da mostrare (3 righe visibili)
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
        position: "absolute", top: 4, left: 58,
        fontFamily: "'VT323', monospace", fontSize: 52, color: "#24170b",
        letterSpacing: 1, padding: "3px 16px", zIndex: 20,
        textShadow: "-2px 2px 0 #e7d7b6, 2px 2px 0 #e7d7b6, 2px 4px 2px #7e6643"
      }}>Projects</div>

      {/* --- INVENTARIO: griglia slot + SCROLLBAR custom pixel art --- */}
      <div style={{
        position: "absolute", top: WRAPPER_TOP, left: WRAPPER_LEFT,
        width: WRAPPER_WIDTH + 28, // lascia spazio per la scrollbar
        height: WRAPPER_HEIGHT, zIndex: 12,
        overflow: "visible",
        display: "flex",
        flexDirection: "row"
      }}>
        {/* GRIGLIA ICON INVENTARIO con onWheel */}
        <div
          style={{
            width: WRAPPER_WIDTH, height: WRAPPER_HEIGHT,
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_COLS}, ${SLOT_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_ROWS_VISIBLE}, ${SLOT_SIZE}px)`,
            gap: `${GRID_GAP}px`, background: "none"
          }}
          // === SCROLL CON LA ROTELLA DEL MOUSE SULLA GRIGLIA ===
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
        {/* SCROLLBAR PIXEL ART */}
        {maxScroll > 0 && (
          <PixelScrollbar
            height={WRAPPER_HEIGHT}
            scrollTop={scrollTop}
            maxScroll={maxScroll}
            onScrollChange={setScrollTop}
            barPng={scrollbarBarPng}
            handlePng={scrollbarHandlePng}
            left={WRAPPER_WIDTH + 4} // a destra della griglia (regola per il tuo layout)
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
