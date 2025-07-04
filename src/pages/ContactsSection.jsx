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
import githubIcon from "../assets/ui/tech-icons/16-64.webp";
import linkedinIcon from "../assets/ui/tech-icons/19-64.webp";
import mailIcon from "../assets/content/items/6.png";
import instagramIcon from "../assets/ui/tech-icons/18-64.webp";
import btnNormal from "../assets/content/buttons/11.png";
import btnHover from "../assets/content/buttons/12.png";
import btnClick from "../assets/content/buttons/13.png";
import DirectMessageModal from "../components/DirectMessageModal";

// === LAYOUT/STYLE CONSTANTS (non cambio nulla qui, li hai già) ===
// ... [tutte le tue costanti invarianti] ...

// === DATI SOCIAL ===
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

// === HOOK ANIMAZIONE TYPEWRITER ===
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
    }, 15);
    return () => clearInterval(timerRef.current);
  }, [page, lines, charPerPage]);
  const hasNext = lines && page < lines.length - 1;
  const hasPrev = page > 0;
  const next = () => { if (hasNext) setPage(p => p + 1); };
  const prev = () => { if (hasPrev) setPage(p => p - 1); };
  return { displayed, done, page, hasNext, hasPrev, next, prev };
}

// === CERCHIO HOVER: UTILITY
function getCircleHoverProps(meta) {
  return {
    png: meta.circleHoverPng ?? circleActivePng,
    top: (meta.infoIconTop !== undefined
      ? 205 + meta.infoIconTop
      : 205 + 19) + (meta.circleHoverTopOffset ?? -15),
    left: (meta.infoIconLeft !== undefined
      ? 22 + meta.infoIconLeft
      : 22 + 17) + (meta.circleHoverLeftOffset ?? -14),
    width: meta.circleHoverWidth ?? 70,
    height: meta.circleHoverHeight ?? 70
  };
}

// === COMPONENTE PRINCIPALE ===
const ContactsSection = () => {
  const { t } = useLanguage();
  const socialsData = t("contacts.socials") || [];
  const tooltips = t("contacts.tooltips") || {};
  const alt = t("contacts.alt") || {};
  const title = t("contacts.title") || "Contacts";
  const tabs = t("contacts.tabs") || { socials: "Socials", direct: "Contact Me" };

  const SOCIALS = socialsData.map((s, idx) => ({
    ...s,
    ...SOCIALS_META[idx]
  }));

  const TOTAL_ROWS = SOCIALS.length;
  const GRID_ROWS_TOTAL = TOTAL_ROWS;
  const MAX_SCROLL = Math.max(0, GRID_ROWS_TOTAL - 3);

  const [scrollTop, setScrollTop] = useState(0);
  const [selected, setSelected] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
  // --- QUI UNICO STATO HOVER ---
  const [iconHovered, setIconHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("contacts");
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [pressedBtn, setPressedBtn] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const start = scrollTop;
  const end = start + 3;
  const visibleSocials = SOCIALS.slice(start, end);
  const selectedDesc = selected !== null && SOCIALS[selected] && SOCIALS[selected].desc
    ? SOCIALS[selected].desc : [""];
  const { displayed, done, hasNext, hasPrev, next, prev } = useTypewriterText(selectedDesc, 300, resetKey);

  const handleWheel = e => {
    if (MAX_SCROLL > 0) {
      setScrollTop(prev =>
        Math.max(0, Math.min(MAX_SCROLL, prev + (e.deltaY > 0 ? 1 : -1)))
      );
    }
  };

  const handleMouseEnter = (e, social) => {
    if (!social) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: tooltips[social.name.toLowerCase()] || social.tooltip || social.name,
      x: rect.left + 175 / 2,
      y: rect.top - 36
    });
  };
  const handleMouseLeave = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

  const handleTabClick = (key) => {
    setActiveTab(key);
    if (key === "direct") {
      setModalOpen(true);
    }
  };

  return (
    <div style={{
      width: "100%", height: "100%", minHeight: 340, minWidth: 360,
      background: "none", position: "relative",
      color: "#fff", fontFamily: "'Pixel Operator', 'VT323', monospace",
      overflow: "visible"
    }}>
      {/* --- LINEE DECORATIVE E TITOLO --- */}
      <img src={linePng} alt={alt.decorative_line_left || "decorative line left"}
        style={{
          position: "absolute", top: 20, left: 13, width: 60, height: 70,
          zIndex: 13, pointerEvents: "none"
        }} draggable={false} />
      <img src={linePng} alt={alt.decorative_line_right || "decorative line right"}
        style={{
          position: "absolute", top: 20, left: 242, width: 60, height: 70,
          zIndex: 13, pointerEvents: "none",
          transform: "scaleX(-1)", transformOrigin: "center center"
        }} draggable={false} />
      <div style={{
        position: "absolute", top: 4, left: 60,
        fontFamily: "'VT323', monospace", fontSize: 52,
        color: "#24170b", letterSpacing: 0, padding: "3px 16px", zIndex: 20,
        textShadow: `-2px 2px 0 #e7d7b6, 2px 2px 0 #e7d7b6, 2px 4px 2px #7e6643`,
        userSelect: "none"
      }}>{title}</div>

      {/* === BOTTONI PIXEL ART "Contacts" + "Direct" === */}
      <div style={{
        position: "absolute", top: 87, left: 220, zIndex: 40,
        display: "flex", flexDirection: "column", gap: 0
      }}>
        {[
          { key: "contacts", label: tabs.socials || "Socials" },
          { key: "direct", label: tabs.direct || "Contact Me" },
        ].map(({ key, label }) => (
          <button
            key={key}
            tabIndex={-1}
            style={{
              all: "unset", position: "relative",
              width: 79, height: 52,
              cursor: activeTab === key ? "default" : "pointer",
              userSelect: "none",
              filter: activeTab === key ? "brightness(1.13)" : undefined,
              opacity: activeTab === key ? 1 : 0.93,
              transition: "filter 0.12s, opacity 0.12s", outline: "none", background: "none", padding: 0,
            }}
            onMouseEnter={() => setHoveredBtn(key)}
            onMouseLeave={() => { setHoveredBtn(null); setPressedBtn(null); }}
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
                width: 79, height: 52, imageRendering: "pixelated",
                pointerEvents: "none", userSelect: "none"
              }}
              draggable={false}
            />
            <span style={{
              position: "absolute", left: 0, top: 19, width: "100%", height: "100%",
              color: activeTab === key ? "#1f1508" : "#463319",
              fontFamily: "'Pixel Operator', 'VT323', monospace", fontSize: 12,
              letterSpacing: 0,
              textShadow:
                activeTab === key
                  ? "0 2.5px 0rgb(19, 19, 18), 2px 0rgb(100, 90, 55)"
                  : "",
              pointerEvents: "none", userSelect: "none",
              transition: "color 0.16s, text-shadow 0.16s",
              lineHeight: 1, textAlign: "center",
            }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* --- GRIGLIA SOCIALS + SCROLLBAR --- */}
      {activeTab === "contacts" && (
        <div style={{
          position: "absolute", top: 72, left: 20,
          width: 175 + 28,
          height: 3 * 50 + (3 - 1) * -7,
          zIndex: 10, display: "flex", flexDirection: "row"
        }}>
          <div style={{
            width: 175, height: 3 * 50 + (3 - 1) * -7,
            display: "flex", flexDirection: "column", gap: -7,
            position: "relative", background: "none"
          }} onWheel={handleWheel}>
            {visibleSocials.map((social, i) => (
              <div
                key={i + start}
                role="button"
                tabIndex={0}
                style={{
                  width: 175, height: 50,
                  position: "relative", cursor: "pointer",
                  userSelect: "none", outline: "none"
                }}
                onClick={() => { setSelected(i + start); setResetKey(k => k + 1); }}
                onMouseEnter={e => handleMouseEnter(e, social)}
                onMouseMove={e => handleMouseEnter(e, social)}
                onMouseLeave={handleMouseLeave}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelected(i + start); setResetKey(k => k + 1);
                  }
                }}
              >
                <img
                  src={selected === i + start ? holderHoverPng : holderPng}
                  alt=""
                  style={{
                    width: 175, height: 50,
                    imageRendering: "pixelated",
                    position: "absolute", left: 0, top: 0, zIndex: 1
                  }}
                  draggable={false}
                />
                <img
                  src={social.icon}
                  alt={social.name}
                  style={{
                    width: social.iconWidth, height: social.iconHeight,
                    imageRendering: "pixelated",
                    position: "absolute",
                    left: social.iconLeft, top: social.iconTop,
                    zIndex: 2, pointerEvents: "none"
                  }}
                  draggable={false}
                />
                <div style={{
                  position: "absolute",
                  left: 50, top: 8, width: 100, height: 32,
                  fontFamily: "'Pixel Operator', 'VT323', monospace",
                  fontSize: 16, color: "#473011", zIndex: 3,
                  letterSpacing: 2, textAlign: "left", lineHeight: "32px",
                  overflow: "hidden", whiteSpace: "nowrap", userSelect: "none",
                  cursor: "inherit"
                }}>
                  {social?.name}
                </div>
              </div>
            ))}
          </div>
          {MAX_SCROLL > 0 && (
            <PixelScrollbar
              height={3 * 50 + (3 - 1) * -7}
              scrollTop={scrollTop}
              maxScroll={MAX_SCROLL}
              onScrollChange={setScrollTop}
              barPng={scrollbarBarPng}
              handlePng={scrollbarHandlePng}
              left={175 + 4}
              top={0}
            />
          )}
        </div>
      )}

      {/* --- INFO BAR SOTTO (SOLO SE SOCIAL SELEZIONATO) --- */}
      {activeTab === "contacts" && selected !== null && SOCIALS[selected] && (
        <>
          <img
            src={infoBarPng}
            alt="info bar"
            style={{
              position: "absolute", top: 205, left: 22,
              width: 276, height: 76,
              imageRendering: "pixelated",
              zIndex: 15, pointerEvents: "none"
            }}
            draggable={false}
          />

          {/* Overlay "cerchio" hover: SEMPRE PRESENTE, opacity */}
          {(() => {
            const props = getCircleHoverProps(SOCIALS_META[selected]);
            return (
              <img
                src={props.png}
                alt=""
                style={{
                  position: "absolute",
                  top: props.top, left: props.left,
                  width: props.width, height: props.height,
                  imageRendering: "pixelated",
                  zIndex: 16,
                  pointerEvents: "none",
                  opacity: iconHovered ? 1 : 0,
                  transition: "opacity 0.08s linear",
                  willChange: "opacity"
                }}
                draggable={false}
              />
            );
          })()}

          {/* Icona grande: layer sopra, gestisce hover */}
          <a
            href={SOCIALS[selected].url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              top: SOCIALS_META[selected].infoIconTop !== undefined
                ? 205 + SOCIALS_META[selected].infoIconTop
                : 205 + 19,
              left: SOCIALS_META[selected].infoIconLeft !== undefined
                ? 22 + SOCIALS_META[selected].infoIconLeft
                : 22 + 17,
              width: SOCIALS_META[selected].infoIconWidth !== undefined
                ? SOCIALS_META[selected].infoIconWidth
                : 39 - 4,
              height: SOCIALS_META[selected].infoIconHeight !== undefined
                ? SOCIALS_META[selected].infoIconHeight
                : 39 - 4,
              zIndex: 100, display: "block"
            }}
            title={`Vai a ${SOCIALS[selected].name}`}
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
          >
            <img
              src={SOCIALS[selected].icon}
              alt={SOCIALS[selected].name}
              style={{
                width: "100%", height: "100%",
                imageRendering: "pixelated",
                pointerEvents: "auto",
                transition: "filter 0.15s",
                filter: iconHovered ? "brightness(1.2)" : "none"
              }}
              draggable={false}
            />
          </a>

          <div style={{
            position: "absolute", top: 205 + 10, left: 22 + 70,
            width: 175, height: 48,
            fontFamily: "'Pixel Operator', 'VT323', monospace",
            fontSize: 11, color: "#4b2d11", letterSpacing: 0,
            zIndex: 16, overflow: "hidden", whiteSpace: "pre-line",
            wordBreak: "break-word", userSelect: "none", pointerEvents: "none"
          }}>
            {displayed}
          </div>
          {done && hasNext && (
            <img
              src={nextArrowPng}
              alt={alt.continua || "continua"}
              onClick={next}
              style={{
                position: "absolute",
                top: 205 + 76 - 35,
                left: 22 + 276 - 45,
                width: 24, height: 28,
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
        setModalOpen(false); setActiveTab("contacts");
      }} />

      {/* --- TOOLTIP SOCIAL --- */}
      {tooltip.visible && (
        <div style={{
          position: "fixed", left: tooltip.x, top: tooltip.y,
          background: "#ffeec1", color: "#473011",
          padding: "6px 16px", border: "2px solid #b29e6f",
          borderRadius: 8,
          fontFamily: "'Pixel Operator', 'VT323', monospace", fontSize: 18,
          zIndex: 999, pointerEvents: "none", whiteSpace: "nowrap",
          boxShadow: "0 2px 6px #c8b17670"
        }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default ContactsSection;
