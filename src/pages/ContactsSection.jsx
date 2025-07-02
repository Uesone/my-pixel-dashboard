import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext.jsx";

// === ASSETS GRAFICI ===
import linePng from "../assets/page-content-sprites/holders/0.png";
import holderPng from "../assets/content/holders/11.png";
import holderHoverPng from "../assets/content/holders/12.png";
import infoBarPng from "../assets/content/holders/10.png";
import circleActivePng from "../assets/content/holders/6.png";
import nextArrowPng from "../assets/content/buttons/2.png";
import scrollbarBarPng from "../assets/content/holders/9.png";
import scrollbarHandlePng from "../assets/content/buttons/1.png";
import PixelScrollbar from "../components/PixelScrollbar";
import githubIcon from "../assets/ui/tech-icons/16.png";
import linkedinIcon from "../assets/ui/tech-icons/19.png";
import mailIcon from "../assets/content/items/6.png";
import instagramIcon from "../assets/ui/tech-icons/18.png";
// === BOTTONI PIXEL ART ===
import btnNormal from "../assets/content/buttons/11.png";
import btnHover from "../assets/content/buttons/12.png";
import btnClick from "../assets/content/buttons/13.png";

// === MODALE DIRECT ===
import DirectMessageModal from "../components/DirectMessageModal";

// === COSTANTI LAYOUT ===
const LINE_LEFT_TOP = 20, LINE_LEFT_LEFT = 13, LINE_LEFT_WIDTH = 60, LINE_LEFT_HEIGHT = 70;
const LINE_RIGHT_TOP = 20, LINE_RIGHT_LEFT = 242, LINE_RIGHT_WIDTH = 60, LINE_RIGHT_HEIGHT = 70;
const TITLE_TOP = 4, TITLE_LEFT = 60, TITLE_FONT_SIZE = 52;
const SLOT_WIDTH = 175, SLOT_HEIGHT = 50, SLOTS_GAP = -7;
const NAME_LEFT = 50, NAME_TOP = 8, NAME_WIDTH = 100, NAME_HEIGHT = 32;
const NAME_FONT_SIZE = 16, NAME_COLOR = "#473011", NAME_LETTER_SPACING = 2, NAME_TEXT_ALIGN = "left";
const GRID_ROWS_VISIBLE = 3;
const INFOBAR_TOP = 205, INFOBAR_LEFT = 22, INFOBAR_WIDTH = 276, INFOBAR_HEIGHT = 76;
const CIRCLE_SIZE = 39, CIRCLE_ICON_OFFSET_TOP = 19, CIRCLE_ICON_OFFSET_LEFT = 17;
const DESC_TOP = 10, DESC_LEFT = 70, DESC_WIDTH = 175, DESC_HEIGHT = 48, DESC_FONT_SIZE = 11;
const DESC_COLOR = "#4b2d11", DESC_LETTER_SPACING = 0;
const INFOBAR_ARROW_PNG = nextArrowPng;
const INFOBAR_ARROW_WIDTH = 24, INFOBAR_ARROW_HEIGHT = 28;
const INFOBAR_ARROW_TOP_OFFSET = -35, INFOBAR_ARROW_LEFT_OFFSET = -45;
const TYPEWRITER_SPEED = 15, CHAR_PER_PAGE = 300;

// === BOTTONI LAYOUT E LABEL ===
const BUTTONS_TOP = 87;
const BUTTONS_LEFT = 220;
const BUTTON_WIDTH = 79;
const BUTTON_HEIGHT = 52;
const BUTTON_GAP = 0;
const BUTTON_LABEL_FONT_SIZE = 12;
const BUTTON_LABEL_LETTER_SPACING = 0;
const BUTTON_LABEL_COLOR_ACTIVE = "#1f1508";
const BUTTON_LABEL_COLOR_INACTIVE = "#463319";
const BUTTON_LABEL_SHADOW_ACTIVE = "0 2.5px 0rgb(19, 19, 18), 2px 0rgb(100, 90, 55)";
const BUTTON_LABEL_SHADOW_INACTIVE = "";
const BUTTON_LABEL_TOP = 19;
const BUTTON_LABEL_LEFT = 0;

// === DEFAULT PNG HOVER (ogni social può sovrascrivere)
const CIRCLE_HOVER_DEFAULT_PNG = circleActivePng;
const CIRCLE_HOVER_DEFAULT_TOP_OFFSET = -15;
const CIRCLE_HOVER_DEFAULT_LEFT_OFFSET = -14;
const CIRCLE_HOVER_DEFAULT_WIDTH = 70;
const CIRCLE_HOVER_DEFAULT_HEIGHT = 70;

// === DATI SOCIAL (solo asset: testo lo prendi dal JSON lingua)
const SOCIALS_META = [
  {
    icon: githubIcon,
    iconWidth: 25, iconHeight: 25, iconLeft: 12, iconTop: 15,
    infoIconWidth: 45, infoIconHeight: 45, infoIconLeft: 13, infoIconTop: 20,
    circleHoverPng: circleActivePng,
    circleHoverTopOffset: -16,
    circleHoverLeftOffset: -16,
    circleHoverWidth: 73,
    circleHoverHeight: 73,
  },
  {
    icon: linkedinIcon,
    iconWidth: 21, iconHeight: 21, iconLeft: 13.8, iconTop: 15,
    infoIconWidth: 35, infoIconHeight: 35, infoIconLeft: 17, infoIconTop: 20,
    circleHoverPng: circleActivePng,
    circleHoverTopOffset: -16,
    circleHoverLeftOffset: -19,
    circleHoverWidth: 72,
    circleHoverHeight: 72,
  },
  {
    icon: mailIcon,
    iconWidth: 21, iconHeight: 21, iconLeft: 13, iconTop: 14,
    infoIconWidth: 35, infoIconHeight: 35, infoIconLeft: 16, infoIconTop: 20,
    circleHoverPng: circleActivePng,
    circleHoverTopOffset: -15,
    circleHoverLeftOffset: -17,
    circleHoverWidth: 70,
    circleHoverHeight: 70,
  },
  {
    icon: instagramIcon,
    iconWidth: 22, iconHeight: 22, iconLeft: 13.2, iconTop: 14,
    infoIconWidth: 35, infoIconHeight: 35, infoIconLeft: 17, infoIconTop: 20,
    circleHoverPng: circleActivePng,
    circleHoverTopOffset: -15,
    circleHoverLeftOffset: -17,
    circleHoverWidth: 69,
    circleHoverHeight: 70,
  }
];

// === HOOK animazione testo typewriter + paginazione ===
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

// === UTILITY: posizione PNG hover per ogni social
function getCircleHoverProps(meta) {
  return {
    png: meta.circleHoverPng ?? CIRCLE_HOVER_DEFAULT_PNG,
    top: (meta.infoIconTop !== undefined
      ? INFOBAR_TOP + meta.infoIconTop
      : INFOBAR_TOP + CIRCLE_ICON_OFFSET_TOP) + (meta.circleHoverTopOffset ?? CIRCLE_HOVER_DEFAULT_TOP_OFFSET),
    left: (meta.infoIconLeft !== undefined
      ? INFOBAR_LEFT + meta.infoIconLeft
      : INFOBAR_LEFT + CIRCLE_ICON_OFFSET_LEFT) + (meta.circleHoverLeftOffset ?? CIRCLE_HOVER_DEFAULT_LEFT_OFFSET),
    width: meta.circleHoverWidth ?? CIRCLE_HOVER_DEFAULT_WIDTH,
    height: meta.circleHoverHeight ?? CIRCLE_HOVER_DEFAULT_HEIGHT
  };
}

const ContactsSection = () => {
  const { t } = useLanguage();

  // Prende i socials dalla lingua corrente (dal JSON)
  const socialsData = t("contacts.socials") || [];
  // Tooltips dal JSON
  const tooltips = t("contacts.tooltips") || {};
  // Alt text dal JSON
  const alt = t("contacts.alt") || {};
  // Titolo tabs
  const title = t("contacts.title") || "Contacts";
  const tabs = t("contacts.tabs") || { socials: "Socials", direct: "Contact Me" };

  // Unisce asset (meta) e testo (traduzioni)
  const SOCIALS = socialsData.map((s, idx) => ({
    ...s,
    ...SOCIALS_META[idx]
  }));

  // === SCROLL ===
  const TOTAL_ROWS = SOCIALS.length;
  const GRID_ROWS_TOTAL = TOTAL_ROWS;
  const MAX_SCROLL = Math.max(0, GRID_ROWS_TOTAL - GRID_ROWS_VISIBLE);

  // === STATE ===
  const [scrollTop, setScrollTop] = useState(0);
  const [selected, setSelected] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
  const [iconHovered, setIconHovered] = useState(false);

  // Tab state + stato modale direct
  const [activeTab, setActiveTab] = useState("contacts");
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Modale Direct

  // Socials visibili (scroll)
  const start = scrollTop;
  const end = start + GRID_ROWS_VISIBLE;
  const visibleSocials = SOCIALS.slice(start, end);

  // Descrizione social selezionato
  const selectedDesc =
    selected !== null && SOCIALS[selected] && SOCIALS[selected].desc
      ? SOCIALS[selected].desc
      : [""];

  // Typewriter/paginazione desc social
  const { displayed, done, hasNext, hasPrev, next, prev } = useTypewriterText(
    selectedDesc, CHAR_PER_PAGE, resetKey
  );

  // Scroll socials con rotella mouse
  const handleWheel = e => {
    if (MAX_SCROLL > 0) {
      setScrollTop(prev =>
        Math.max(0, Math.min(MAX_SCROLL, prev + (e.deltaY > 0 ? 1 : -1)))
      );
    }
  };

  // Tooltip socials
  const handleMouseEnter = (e, social) => {
    if (!social) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: tooltips[social.name.toLowerCase()] || social.tooltip || social.name,
      x: rect.left + SLOT_WIDTH / 2,
      y: rect.top - 36
    });
  };
  const handleMouseLeave = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

  // === GESTIONE TAB ===
  const handleTabClick = (key) => {
    setActiveTab(key);
    if (key === "direct") {
      setModalOpen(true); // Apre il modale
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 340,
        minWidth: 360,
        background: "none",
        position: "relative",
        color: "#fff",
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        overflow: "visible"
      }}
    >
      {/* --- LINEE DECORATIVE E TITOLO --- */}
      <img src={linePng} alt={alt.decorative_line_left || "decorative line left"}
        style={{
          position: "absolute", top: LINE_LEFT_TOP, left: LINE_LEFT_LEFT,
          width: LINE_LEFT_WIDTH, height: LINE_LEFT_HEIGHT, zIndex: 13, pointerEvents: "none"
        }} draggable={false} />
      <img src={linePng} alt={alt.decorative_line_right || "decorative line right"}
        style={{
          position: "absolute", top: LINE_RIGHT_TOP, left: LINE_RIGHT_LEFT,
          width: LINE_RIGHT_WIDTH, height: LINE_RIGHT_HEIGHT, zIndex: 13, pointerEvents: "none",
          transform: "scaleX(-1)", transformOrigin: "center center"
        }} draggable={false} />
      <div style={{
        position: "absolute", top: TITLE_TOP, left: TITLE_LEFT,
        fontFamily: "'VT323', monospace",
        fontSize: TITLE_FONT_SIZE,
        color: "#24170b", letterSpacing: 0, padding: "3px 16px", zIndex: 20,
        textShadow: `-2px 2px 0 #e7d7b6, 2px 2px 0 #e7d7b6, 2px 4px 2px #7e6643`,
        userSelect: "none"
      }}>{title}</div>

      {/* === BOTTONI PIXEL ART "Contacts" + "Direct" === */}
      <div
        style={{
          position: "absolute",
          top: BUTTONS_TOP,
          left: BUTTONS_LEFT,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: BUTTON_GAP,
        }}
      >
        {[
          { key: "contacts", label: tabs.socials || "Socials" },
          { key: "direct", label: tabs.direct || "Contact Me" },
        ].map(({ key, label }) => (
          <button
            key={key}
            tabIndex={-1}
            style={{
              all: "unset",
              position: "relative",
              width: BUTTON_WIDTH,
              height: BUTTON_HEIGHT,
              cursor: activeTab === key ? "default" : "pointer",
              userSelect: "none",
              filter: activeTab === key ? "brightness(1.13)" : undefined,
              opacity: activeTab === key ? 1 : 0.93,
              transition: "filter 0.12s, opacity 0.12s",
              outline: "none",
              background: "none",
              padding: 0,
            }}
            onMouseEnter={() => setHoveredBtn(key)}
            onMouseLeave={() => {
              setHoveredBtn(null);
              setPressedBtn(null);
            }}
            onMouseDown={() => setPressedBtn(key)}
            onMouseUp={() => setPressedBtn(null)}
            onClick={() => handleTabClick(key)}
            disabled={activeTab === key}
            aria-label={label}
          >
            <img
              src={
                activeTab === key
                  ? btnNormal
                  : pressedBtn === key
                  ? btnClick
                  : hoveredBtn === key
                  ? btnHover
                  : btnNormal
              }
              alt={label}
              style={{
                width: BUTTON_WIDTH,
                height: BUTTON_HEIGHT,
                imageRendering: "pixelated",
                pointerEvents: "none",
                userSelect: "none"
              }}
              draggable={false}
            />
            <span
              style={{
                position: "absolute",
                left: BUTTON_LABEL_LEFT,
                top: BUTTON_LABEL_TOP,
                width: "100%",
                height: "100%",
                color: activeTab === key ? BUTTON_LABEL_COLOR_ACTIVE : BUTTON_LABEL_COLOR_INACTIVE,
                fontFamily: "'Pixel Operator', 'VT323', monospace",
                fontSize: BUTTON_LABEL_FONT_SIZE,
                letterSpacing: BUTTON_LABEL_LETTER_SPACING,
                textShadow:
                  activeTab === key
                    ? BUTTON_LABEL_SHADOW_ACTIVE
                    : BUTTON_LABEL_SHADOW_INACTIVE,
                pointerEvents: "none",
                userSelect: "none",
                transition: "color 0.16s, text-shadow 0.16s",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* --- GRIGLIA SOCIALS + SCROLLBAR --- */}
      {activeTab === "contacts" && (
        <div style={{
          position: "absolute", top: 72, left: 20,
          width: SLOT_WIDTH + 28,
          height: GRID_ROWS_VISIBLE * SLOT_HEIGHT + (GRID_ROWS_VISIBLE - 1) * SLOTS_GAP,
          zIndex: 10, display: "flex", flexDirection: "row"
        }}>
          <div style={{
            width: SLOT_WIDTH,
            height: GRID_ROWS_VISIBLE * SLOT_HEIGHT + (GRID_ROWS_VISIBLE - 1) * SLOTS_GAP,
            display: "flex", flexDirection: "column", gap: SLOTS_GAP,
            position: "relative", background: "none"
          }} onWheel={handleWheel}>
            {visibleSocials.map((social, i) => (
              <div
                key={i + start}
                role="button"
                tabIndex={0}
                style={{
                  width: SLOT_WIDTH,
                  height: SLOT_HEIGHT,
                  position: "relative",
                  cursor: "pointer", // NES hand sempre ovunque sulla riga!
                  userSelect: "none",
                  outline: "none"
                }}
                onClick={() => {
                  setSelected(i + start);
                  setResetKey(k => k + 1);
                }}
                onMouseEnter={e => handleMouseEnter(e, social)}
                onMouseMove={e => handleMouseEnter(e, social)}
                onMouseLeave={handleMouseLeave}
                // Accessibilità: tastiera
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelected(i + start);
                    setResetKey(k => k + 1);
                  }
                }}
              >
                {/* Sfondo slot: hover (se selezionato) o normale */}
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
                {/* Icona social piccola */}
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
                  fontFamily: "'Pixel Operator', 'VT323', monospace",
                  fontSize: NAME_FONT_SIZE,
                  color: NAME_COLOR,
                  zIndex: 3,
                  letterSpacing: NAME_LETTER_SPACING,
                  textAlign: NAME_TEXT_ALIGN,
                  lineHeight: `${NAME_HEIGHT}px`,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  cursor: "inherit" // eredita la manina dal padre!
                }}>
                  {social?.name}
                </div>
              </div>
            ))}
          </div>
          {/* Scrollbar custom pixel art */}
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
      )}

      {/* --- INFO BAR SOTTO (SOLO SE SOCIAL SELEZIONATO) --- */}
      {activeTab === "contacts" && selected !== null && SOCIALS[selected] && (
        <>
          {/* Info bar sfondo */}
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

          {/* Cerchio PNG hover: personalizzabile per ogni social */}
          {iconHovered && (() => {
            const props = getCircleHoverProps(SOCIALS_META[selected]);
            return (
              <img
                src={props.png}
                alt=""
                style={{
                  position: "absolute",
                  top: props.top,
                  left: props.left,
                  width: props.width,
                  height: props.height,
                  imageRendering: "pixelated",
                  zIndex: 16,
                  pointerEvents: "none"
                }}
                draggable={false}
              />
            );
          })()}

          {/* Icona grande: hover mostra cerchio, click apre link */}
          <a
            href={SOCIALS[selected].url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              top: SOCIALS_META[selected].infoIconTop !== undefined
                ? INFOBAR_TOP + SOCIALS_META[selected].infoIconTop
                : INFOBAR_TOP + CIRCLE_ICON_OFFSET_TOP,
              left: SOCIALS_META[selected].infoIconLeft !== undefined
                ? INFOBAR_LEFT + SOCIALS_META[selected].infoIconLeft
                : INFOBAR_LEFT + CIRCLE_ICON_OFFSET_LEFT,
              width: SOCIALS_META[selected].infoIconWidth !== undefined
                ? SOCIALS_META[selected].infoIconWidth
                : CIRCLE_SIZE - 4,
              height: SOCIALS_META[selected].infoIconHeight !== undefined
                ? SOCIALS_META[selected].infoIconHeight
                : CIRCLE_SIZE - 4,
              zIndex: 100,
              display: "block"
            }}
            title={`Vai a ${SOCIALS[selected].name}`}
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
          >
            <img
              src={SOCIALS[selected].icon}
              alt={SOCIALS[selected].name}
              style={{
                width: "100%",
                height: "100%",
                imageRendering: "pixelated",
                pointerEvents: "auto",
                transition: "filter 0.15s",
                filter: iconHovered ? "brightness(1.2)" : "none"
              }}
              draggable={false}
            />
          </a>

          {/* Descrizione typewriter */}
          <div
            style={{
              position: "absolute",
              top: INFOBAR_TOP + DESC_TOP,
              left: INFOBAR_LEFT + DESC_LEFT,
              width: DESC_WIDTH,
              height: DESC_HEIGHT,
              fontFamily: "'Pixel Operator', 'VT323', monospace",
              fontSize: DESC_FONT_SIZE,
              color: DESC_COLOR,
              letterSpacing: DESC_LETTER_SPACING,
              zIndex: 16,
              overflow: "hidden",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {displayed}
          </div>

          {/* Freccia avanti (paginazione) */}
          {done && hasNext && (
            <img
              src={INFOBAR_ARROW_PNG}
              alt={alt.continua || "continua"}
              onClick={next}
              style={{
                position: "absolute",
                top: INFOBAR_TOP + INFOBAR_HEIGHT + INFOBAR_ARROW_TOP_OFFSET,
                left: INFOBAR_LEFT + INFOBAR_WIDTH + INFOBAR_ARROW_LEFT_OFFSET,
                width: INFOBAR_ARROW_WIDTH,
                height: INFOBAR_ARROW_HEIGHT,
                zIndex: 9999,
                cursor: "pointer",
                transition: "opacity 0.15s"
              }}
              draggable={false}
            />
          )}
        </>
      )}

      {/* --- MODALE DIRECT MESSAGE --- */}
      <DirectMessageModal open={modalOpen} onClose={() => {
        setModalOpen(false);
        setActiveTab("contacts"); // Torna al tab contacts alla chiusura
      }} />

      {/* --- TOOLTIP SOCIAL --- */}
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
          fontFamily: "'Pixel Operator', 'VT323', monospace",
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
