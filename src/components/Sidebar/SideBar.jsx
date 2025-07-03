import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import PixelTooltip from "../PixelTooltip";
import { useLanguage } from "../LanguageContext";

// === ASSETS (PNG) ===
import btn0 from "../../assets/sidebar-sprites/buttons/0.png";
import btn1 from "../../assets/sidebar-sprites/buttons/1.png";
import btn2 from "../../assets/sidebar-sprites/buttons/2.png";
import icon0 from "../../assets/sidebar-sprites/icons/0.png";
import icon1 from "../../assets/sidebar-sprites/icons/1.png";
import icon2 from "../../assets/sidebar-sprites/icons/2.png";
import icon3 from "../../assets/sidebar-sprites/icons/3.png";
import itFlag from "../../assets/ui/flags/it.png";
import enFlag from "../../assets/ui/flags/en.png";

// === LAYOUT CONFIG ===
const startingTop = 39;
const buttonSpacing = 110;
const buttonLeft = 70;
const defaultButtonSize = 78;
const defaultSidebarWidth = 120;
const defaultSidebarHeight = 520;

// === Home icon offset ===
const homeIconOffsetX = -2.2;
const homeIconOffsetY = 0;

// === Language button config ===
const langButtonOffsetTop = 0;
const langButtonOffsetLeft = 2;
const langButtonSize = 74;
const langIconSize = 32;
const langIconOffsetX = 0.5;
const langIconOffsetY = 1;

// === Tooltip texts ===
const TOOLTIP_TEXTS = {
  it: {
    home: "Home",
    about: "About",
    projects: "Guarda i progetti",
    contacts: "Contattami",
    lang: "Cambia lingua: English"
  },
  en: {
    home: "Home",
    about: "About",
    projects: "See my projects",
    contacts: "Contact me",
    lang: "Change Language: Italian"
  }
};

// === Tooltip position config ===
const TOOLTIP_POSITION_CONFIG = {
  default: {
    tooltipTop: 73.5,
    tooltipLeft: 0
  }
  // puoi aggiungere override per singolo bottone qui se vuoi
};

// === Sidebar button list ===
const BUTTONS_BASE = [
  { key: "home",     icon: icon0, alt: "Home",     iconSize: 58, buttonSize: defaultButtonSize },
  { key: "about",    icon: icon1, alt: "About",    iconSize: 26, buttonSize: defaultButtonSize },
  { key: "projects", icon: icon2, alt: "Projects", iconSize: 48, buttonSize: defaultButtonSize },
  { key: "contacts", icon: icon3, alt: "Contacts", iconSize: 28, buttonSize: defaultButtonSize },
  { key: "lang",     icon: null,  alt: "Language", iconSize: langIconSize, buttonSize: langButtonSize },
];

/**
 * Sidebar aggiornata per routing SPA (React Router).
 * Usa la prop `navigate` (passata dal parent) per cambiare la route.
 */
const Sidebar = ({
  selected,        // key attiva: "home", "about", ...
  navigate,        // funzione navigate di React Router
  width = defaultSidebarWidth,
  height = defaultSidebarHeight,
  sidebarStyle = {},
}) => {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const { language, setLanguage } = useLanguage();
  const nextLang = language === "it" ? "en" : "it";
  const flagIcon = nextLang === "it" ? itFlag : enFlag;
  const flagAlt  = nextLang === "it" ? "Cambia lingua: Italiano" : "Change language: English";

  // Tooltip text per lingua corrente
  const getTooltip = (key) => TOOLTIP_TEXTS[language][key] || "";

  // Button config (offset, bandiera ecc.)
  const BUTTONS = BUTTONS_BASE.map((btn, idx) => {
    let iconOffsetX = 0, iconOffsetY = 0;
    if (btn.key === "home") {
      iconOffsetX = homeIconOffsetX;
      iconOffsetY = homeIconOffsetY;
    }
    if (btn.key === "lang") {
      btn.icon = flagIcon;
      btn.alt = flagAlt;
      iconOffsetX = langIconOffsetX;
      iconOffsetY = langIconOffsetY;
    }
    const tooltipPos =
      TOOLTIP_POSITION_CONFIG[btn.key] || TOOLTIP_POSITION_CONFIG.default;

    return {
      ...btn,
      tooltip: getTooltip(btn.key),
      style: {
        top: startingTop + idx * buttonSpacing + (btn.key === "lang" ? langButtonOffsetTop : 0),
        left: buttonLeft + (btn.key === "lang" ? langButtonOffsetLeft : 0),
        width: btn.buttonSize,
        height: btn.buttonSize,
      },
      iconOffsetX,
      iconOffsetY,
      tooltipTop: tooltipPos.tooltipTop,
      tooltipLeft: tooltipPos.tooltipLeft
    };
  });

  // Gestione hover/tooltip
  const handleMouseEnter = (btn, e) => {
    setHovered(btn.key);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: btn.tooltip,
      x: rect.left + rect.width / 2 + (btn.tooltipLeft || 0),
      y: rect.top + (btn.tooltipTop !== undefined ? btn.tooltipTop : -65)
    });
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setTooltip(t => ({ ...t, visible: false }));
  };

  // Path associati alle sezioni
  const sectionToPath = {
    home: "/",
    about: "/about",
    projects: "/projects",
    contacts: "/contacts"
  };

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        minWidth: width,
        minHeight: height,
        background: "transparent",
        ...sidebarStyle,
      }}
    >
      {/* Renderizza tutti i bottoni */}
      {BUTTONS.map((btn) => (
        <SidebarButton
          key={btn.key}
          bg={btn0}
          bgHover={btn1}
          bgActive={btn2}
          icon={btn.icon}
          alt={btn.alt}
          isActive={selected === btn.key}
          isHovered={hovered === btn.key}
          onMouseEnter={(e) => handleMouseEnter(btn, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (btn.key === "lang") setLanguage(nextLang);
            else if (navigate && sectionToPath[btn.key]) navigate(sectionToPath[btn.key]);
          }}
          buttonSize={btn.buttonSize}
          iconSize={btn.iconSize}
          style={btn.style}
          iconOffsetX={btn.iconOffsetX}
          iconOffsetY={btn.iconOffsetY}
        />
      ))}
      {/* Tooltip pixel art */}
      <PixelTooltip
        visible={tooltip.visible}
        text={tooltip.text}
        x={tooltip.x}
        y={tooltip.y}
      />
    </div>
  );
};

export default Sidebar;
