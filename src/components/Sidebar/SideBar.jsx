import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import PixelTooltip from "../PixelTooltip";
import { useLanguage } from "../LanguageContext";

// PNG bottoni e icone
import btn0 from "../../assets/sidebar-sprites/buttons/0.png";
import btn1 from "../../assets/sidebar-sprites/buttons/1.png";
import btn2 from "../../assets/sidebar-sprites/buttons/2.png";
import btn3 from "../../assets/sidebar-sprites/buttons/3.png";
import icon0 from "../../assets/sidebar-sprites/icons/0.png";
import icon1 from "../../assets/sidebar-sprites/icons/1.png";
import icon2 from "../../assets/sidebar-sprites/icons/2.png";
import icon3 from "../../assets/sidebar-sprites/icons/3.png";
// Bandiere
import itFlag from "../../assets/ui/flags/it.png";
import enFlag from "../../assets/ui/flags/en.png";

// ========== CONFIGURAZIONE LAYOUT ==========
// Spacing globale e dimensioni sidebar
const startingTop = 39;            // distanza dal top del container sidebar
const buttonSpacing = 110;         // distanza tra i bottoni (verticale)
const buttonLeft = 70;             // distanza dal bordo sinistro sidebar
const defaultButtonSize = 78;      // dimensione base dei bottoni (quadrati)
const defaultSidebarWidth = 120;   // larghezza totale sidebar
const defaultSidebarHeight = 520;  // altezza totale sidebar

// Personalizzazione posizione/dimensione solo per il bottone lingua
const langButtonOffsetTop = 0;     // offset extra top per la lingua
const langButtonOffsetLeft = 2;    // offset extra left per la lingua
const langButtonSize = 74;         // dimensione bottone lingua
const langIconSize = 32;           // dimensione bandierina lingua

// ====== TOOLTIP LOCALIZZATI ======
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

// ====== DEFINIZIONE BOTTONI ======
const BUTTONS_BASE = [
  { key: "home",     icon: icon0, alt: "Home",     iconSize: 58, buttonSize: defaultButtonSize },
  { key: "about",    icon: icon1, alt: "About",    iconSize: 26, buttonSize: defaultButtonSize },
  { key: "projects", icon: icon2, alt: "Projects", iconSize: 48, buttonSize: defaultButtonSize },
  { key: "contacts", icon: icon3, alt: "Contacts", iconSize: 28, buttonSize: defaultButtonSize },
  // Pulsante lingua in fondo, icon e label vengono assegnate dopo!
  { key: "lang",     icon: null,  alt: "Language", iconSize: langIconSize, buttonSize: langButtonSize },
];

const Sidebar = ({
  selected,
  onSelect,
  width = defaultSidebarWidth,
  height = defaultSidebarHeight,
  sidebarStyle = {},
}) => {
  // Bottone attualmente hoverato
  const [hovered, setHovered] = useState(null);
  // Stato del tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Lingua corrente e funzione cambio lingua dal context
  const { language, setLanguage } = useLanguage();
  // Lingua "dopo il click" e bandiera relativa
  const nextLang = language === "it" ? "en" : "it";
  const flagIcon = nextLang === "it" ? itFlag : enFlag;
  const flagAlt  = nextLang === "it" ? "Cambia lingua: Italiano" : "Change language: English";

  // Tooltip localizzato per lingua corrente
  const getTooltip = (key) => {
    return TOOLTIP_TEXTS[language][key] || "";
  };

  // Costruisci array bottoni sidebar (posizione, icona, alt, tooltip, ...)
  const BUTTONS = BUTTONS_BASE.map((btn, idx) => {
    if (btn.key !== "lang") {
      return {
        ...btn,
        tooltip: getTooltip(btn.key),
        style: {
          top: startingTop + idx * buttonSpacing,
          left: buttonLeft,
          width: btn.buttonSize,
          height: btn.buttonSize,
        },
      };
    } else {
      // Bottone lingua
      return {
        ...btn,
        icon: flagIcon,
        alt: flagAlt,
        tooltip: getTooltip("lang"),
        style: {
          top: startingTop + idx * buttonSpacing + langButtonOffsetTop,
          left: buttonLeft + langButtonOffsetLeft,
          width: langButtonSize,
          height: langButtonSize,
        },
      };
    }
  });

  // Gestione hover: mostra tooltip sopra al bottone
  const handleMouseEnter = (btn, e) => {
    setHovered(btn.key);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: btn.tooltip,
      x: rect.left + rect.width / 2,
      y: rect.top - -65, // tooltip sopra il bottone
    });
  };

  // Nascondi tooltip
  const handleMouseLeave = () => {
    setHovered(null);
    setTooltip(t => ({ ...t, visible: false }));
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
      {/* Render di ogni bottone */}
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
          // Passa event per posizione tooltip
          onMouseEnter={(e) => handleMouseEnter(btn, e)}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (btn.key === "lang") setLanguage(nextLang);
            else onSelect(btn.key);
          }}
          buttonSize={btn.buttonSize}
          iconSize={btn.iconSize}
          style={btn.style}
        />
      ))}
      {/* Tooltip pixel-art/steampunk */}
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
