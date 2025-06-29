import React, { useState } from "react";
import SidebarButton from "./SidebarButton";

// Import asset PNG
import btn0 from "../../assets/sidebar-sprites/buttons/0.png";
import btn1 from "../../assets/sidebar-sprites/buttons/1.png";
import btn2 from "../../assets/sidebar-sprites/buttons/2.png";
import btn3 from "../../assets/sidebar-sprites/buttons/3.png";
import icon0 from "../../assets/sidebar-sprites/icons/0.png";
import icon1 from "../../assets/sidebar-sprites/icons/1.png";
import icon2 from "../../assets/sidebar-sprites/icons/2.png";
import icon3 from "../../assets/sidebar-sprites/icons/3.png";

// --- PARAMETRI SPACING AUTOMATICO ---
// Altezza del primo bottone rispetto al top della sidebar
const startingTop = 80;
// Spazio verticale tra i bottoni (distanza tra i centri)
const buttonSpacing = 110; // Es: 92 per bottoni da 78px con un po' di spazio
// Larghezza orizzontale per centrare i bottoni nella sidebar
const buttonLeft = 70; // Cambia se vuoi più a sinistra/destra
// Dimensioni dei bottoni (puoi renderli dinamici se vuoi)
const defaultButtonSize = 78;
const defaultIconSize = 48;

// Dati base dei bottoni (senza top/left)
const BUTTONS_BASE = [
  { key: "home", icon: icon0, alt: "Home", iconSize: 58 },
  { key: "about", icon: icon1, alt: "About", iconSize: 26 },
  { key: "projects", icon: icon2, alt: "Projects", iconSize: 48 },
  { key: "contacts", icon: icon3, alt: "Contacts", iconSize: 28 },
];

// Array con top calcolato automaticamente
const BUTTONS = BUTTONS_BASE.map((btn, idx) => ({
  ...btn,
  buttonSize: defaultButtonSize,
  iconSize: btn.iconSize || defaultIconSize,
  style: {
    top: startingTop + idx * buttonSpacing,
    left: buttonLeft,
  }
}));

const Sidebar = ({ selected, onSelect, width = 120, height = 420 }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        minWidth: width,
        minHeight: height,
        background: "transparent",
      }}
    >
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
          onMouseEnter={() => setHovered(btn.key)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect(btn.key)}
          buttonSize={btn.buttonSize}
          iconSize={btn.iconSize}
          style={btn.style}
        />
      ))}
    </div>
  );
};

export default Sidebar;
