import React, { useState } from "react";
import linePng from "../assets/page-content-sprites/holders/0.png";         // Linee decorative
import holderPng from "../assets/content/holders/11.png";                   // PNG slot normale
import holderHoverPng from "../assets/content/holders/12.png";              // PNG slot hover/selezionato
import scrollbarBarPng from "../assets/content/holders/9.png";              // PNG barra scroll
import scrollbarHandlePng from "../assets/content/buttons/1.png";           // PNG handle scroll
import PixelScrollbar from "../components/PixelScrollbar";

// === ICONS PER SOCIAL ===
import githubIcon from "../assets/ui/tech-icons/16.png";
import linkedinIcon from "../assets/ui/tech-icons/19.png";
import mailIcon from "../assets/content/items/6.png";
import instagramIcon from "../assets/ui/tech-icons/18.png";

// === COSTANTI LAYOUT MODIFICABILI ===
const LINE_LEFT_TOP = 20, LINE_LEFT_LEFT = 13, LINE_LEFT_WIDTH = 60, LINE_LEFT_HEIGHT = 70;
const LINE_RIGHT_TOP = 20, LINE_RIGHT_LEFT = 242, LINE_RIGHT_WIDTH = 60, LINE_RIGHT_HEIGHT = 70;
const TITLE_TOP = 4, TITLE_LEFT = 60, TITLE_FONT_SIZE = 52;

const SLOT_WIDTH = 175, SLOT_HEIGHT = 50, SLOTS_GAP = -7;

// === CONFIGURAZIONE TESTO NOME SOCIAL (globale, ma puoi override se vuoi) ===
const NAME_LEFT = 50, NAME_TOP = 11, NAME_WIDTH = 100, NAME_HEIGHT = 32;
const NAME_FONT_SIZE = 16, NAME_COLOR = "#473011", NAME_FONT_FAMILY = "'VT323', monospace";
const NAME_LETTER_SPACING = 2, NAME_TEXT_ALIGN = "left";

// === GRIGLIA: SOLO 1 COLONNA, 3 SLOT VISIBILI ===
const GRID_COLS = 1, GRID_ROWS_VISIBLE = 3;

// === SOCIALS CON ICONA E POSIZIONE PERSONALIZZATA ===
const SOCIALS = [
  {
    id: 1,
    name: "GitHub",
    tooltip: "See my GitHub",
    icon: githubIcon,
    iconWidth: 25, iconHeight: 25, iconLeft: 12, iconTop: 15
  },
  {
    id: 2,
    name: "LinkedIn",
    tooltip: "Connect on LinkedIn",
    icon: linkedinIcon,
    iconWidth: 21, iconHeight: 21, iconLeft: 13.8, iconTop: 15
  },
  {
    id: 3,
    name: "Mail",
    tooltip: "Send me an email",
    icon: mailIcon,
    iconWidth: 21, iconHeight: 21, iconLeft: 14, iconTop: 14
  },
  {
    id: 4,
    name: "Instagram",
    tooltip: "Follow me on Instagram",
    icon: instagramIcon,
    iconWidth: 22, iconHeight: 22, iconLeft: 13.2, iconTop: 14
  },
];

const TOTAL_ROWS = SOCIALS.length;
const GRID_ROWS_TOTAL = TOTAL_ROWS;
const MAX_SCROLL = Math.max(0, GRID_ROWS_TOTAL - GRID_ROWS_VISIBLE);

const ContactsSection = () => {
  // === STATI ===
  const [scrollTop, setScrollTop] = useState(0);
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  // === SOCIALS VISIBILI CON LO SCROLL ===
  const start = scrollTop;
  const end = start + GRID_ROWS_VISIBLE;
  const visibleSocials = SOCIALS.slice(start, end);

  // === SCROLL CON ROTELLA ===
  const handleWheel = e => {
    if (MAX_SCROLL > 0) {
      setScrollTop(prev =>
        Math.max(0, Math.min(MAX_SCROLL, prev + (e.deltaY > 0 ? 1 : -1)))
      );
    }
  };

  // === TOOLTIP HANDLERS ===
  const handleMouseEnter = (e, social) => {
    if (!social) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: social.tooltip,
      x: rect.left + SLOT_WIDTH / 2,
      y: rect.top - 36
    });
  };
  const handleMouseLeave = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

  return (
    <div style={{
      width: "100%",
      height: "100%",
      minHeight: 340,
      minWidth: 360,
      background: "none",
      position: "relative",
      color: "#fff",
      fontFamily: "'VT323', monospace",
      overflow: "visible"
    }}>
      {/* --- LINEA DECORATIVA SINISTRA --- */}
      <img
        src={linePng}
        alt="decorative line left"
        style={{
          position: "absolute",
          top: LINE_LEFT_TOP,
          left: LINE_LEFT_LEFT,
          width: LINE_LEFT_WIDTH,
          height: LINE_LEFT_HEIGHT,
          zIndex: 13,
          pointerEvents: "none",
        }}
        draggable={false}
      />
      {/* --- LINEA DECORATIVA DESTRA --- */}
      <img
        src={linePng}
        alt="decorative line right"
        style={{
          position: "absolute",
          top: LINE_RIGHT_TOP,
          left: LINE_RIGHT_LEFT,
          width: LINE_RIGHT_WIDTH,
          height: LINE_RIGHT_HEIGHT,
          zIndex: 13,
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />
      {/* --- TITOLO "Contacts" --- */}
      <div
        style={{
          position: "absolute",
          top: TITLE_TOP,
          left: TITLE_LEFT,
          fontFamily: "'VT323', monospace",
          fontSize: TITLE_FONT_SIZE,
          color: "#24170b",
          letterSpacing: 0,
          padding: "3px 16px",
          zIndex: 20,
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
          userSelect: "none"
        }}
      >
        Contacts
      </div>

      {/* --- GRIGLIA SLOT + SCROLLBAR --- */}
      <div style={{
        position: "absolute",
        top: 72,
        left: 20,
        width: SLOT_WIDTH + 28, // spazio per la scrollbar
        height: GRID_ROWS_VISIBLE * SLOT_HEIGHT + (GRID_ROWS_VISIBLE - 1) * SLOTS_GAP,
        zIndex: 10,
        display: "flex",
        flexDirection: "row"
      }}>
        {/* --- GRIGLIA --- */}
        <div
          style={{
            width: SLOT_WIDTH,
            height: GRID_ROWS_VISIBLE * SLOT_HEIGHT + (GRID_ROWS_VISIBLE - 1) * SLOTS_GAP,
            display: "flex",
            flexDirection: "column",
            gap: SLOTS_GAP,
            position: "relative",
            background: "none"
          }}
          onWheel={handleWheel}
        >
          {visibleSocials.map((social, i) => (
            <div
              key={i + start}
              style={{
                width: SLOT_WIDTH,
                height: SLOT_HEIGHT,
                position: "relative",
                cursor: "pointer",
                userSelect: "none"
              }}
              onClick={() => setSelected(i + start)}
              onMouseEnter={e => handleMouseEnter(e, social)}
              onMouseMove={e => handleMouseEnter(e, social)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Slot background (hover/normal) */}
              <img
                src={selected === i + start ? holderHoverPng : holderPng}
                alt=""
                style={{
                  width: SLOT_WIDTH,
                  height: SLOT_HEIGHT,
                  imageRendering: "pixelated",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 1
                }}
                draggable={false}
              />
              {/* Icona social PNG (modificabile individualmente!) */}
              <img
                src={social.icon}
                alt={social.name}
                style={{
                  width: social.iconWidth,
                  height: social.iconHeight,
                  imageRendering: "pixelated",
                  position: "absolute",
                  left: social.iconLeft,
                  top: social.iconTop,
                  zIndex: 2,
                  pointerEvents: "none"
                }}
                draggable={false}
              />
              {/* Nome social */}
              <div style={{
                position: "absolute",
                left: NAME_LEFT,
                top: NAME_TOP,
                width: NAME_WIDTH,
                height: NAME_HEIGHT,
                fontFamily: NAME_FONT_FAMILY,
                fontSize: NAME_FONT_SIZE,
                color: NAME_COLOR,
                zIndex: 3,
                letterSpacing: NAME_LETTER_SPACING,
                textAlign: NAME_TEXT_ALIGN,
                lineHeight: `${NAME_HEIGHT}px`,
                overflow: "hidden",
                whiteSpace: "nowrap",
                userSelect: "none"
              }}>
                {social?.name}
              </div>
            </div>
          ))}
        </div>
        {/* --- SCROLLBAR PIXEL ART --- */}
        {MAX_SCROLL > 0 && (
          <PixelScrollbar
            height={GRID_ROWS_VISIBLE * SLOT_HEIGHT + (GRID_ROWS_VISIBLE - 1) * SLOTS_GAP}
            scrollTop={scrollTop}
            maxScroll={MAX_SCROLL}
            onScrollChange={setScrollTop}
            barPng={scrollbarBarPng}
            handlePng={scrollbarHandlePng}
            left={SLOT_WIDTH + 4}
            top={0}
          />
        )}
      </div>

      {/* --- TOOLTIP PIXEL ART SOCIAL --- */}
      {tooltip.visible && (
        <div style={{
          position: "fixed",
          left: tooltip.x,
          top: tooltip.y,
          background: "#ffeec1",
          color: "#473011",
          padding: "6px 16px",
          border: "2px solid #b29e6f",
          borderRadius: 8,
          fontFamily: "'VT323', monospace",
          fontSize: 18,
          zIndex: 999,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 6px #c8b17670"
        }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default ContactsSection;
