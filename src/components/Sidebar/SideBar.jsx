import React, { useState } from "react";
import SidebarButton from "./SidebarButton";

// Import asset PNG (modifica il path se hai struttura diversa)
import btn0 from "../../assets/sidebar-sprites/buttons/0.png";
import btn1 from "../../assets/sidebar-sprites/buttons/1.png";
import btn2 from "../../assets/sidebar-sprites/buttons/2.png";
import btn3 from "../../assets/sidebar-sprites/buttons/3.png";
import icon0 from "../../assets/sidebar-sprites/icons/0.png";
import icon1 from "../../assets/sidebar-sprites/icons/1.png";
import icon2 from "../../assets/sidebar-sprites/icons/2.png";
import icon3 from "../../assets/sidebar-sprites/icons/3.png";

/**
 * Ogni bottone:
 * - key: identificativo
 * - icon: PNG icona centrale
 * - alt: alt per accessibilità
 * - buttonSize: lato bottone (px)
 * - iconSize: lato icona (px)
 * - style: {top, left, ...} per posizione custom
 */
const BUTTONS = [
  {
    key: "home",
    icon: icon0,
    alt: "Home",
    buttonSize: 78,
    iconSize: 58,
    style: { top: 24, left: 8 }, // <-- CAMBIA QUI!
  },
  {
    key: "about",
    icon: icon1,
    alt: "About",
    buttonSize: 78,
    iconSize: 26,
    style: { top: 124, left: 12 }, // <-- CAMBIA QUI!
  },
  {
    key: "projects",
    icon: icon2,
    alt: "Projects",
    buttonSize: 78,
    iconSize: 48,
    style: { top: 232, left: 4 }, // <-- CAMBIA QUI!
  },
  {
    key: "contacts",
    icon: icon3,
    alt: "Contacts",
    buttonSize: 78,
    iconSize: 28,
    style: { top: 338, left: 20 }, // <-- CAMBIA QUI!
  },
];

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
