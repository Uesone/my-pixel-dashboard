import React, { useState } from "react";
import "./styles/BurgerMenu.css";
// Menu hamburger laterale (apre overlay pagine)
export default function BurgerMenu({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-burger-menu">
      {/* Pulsante hamburger */}
      <button
        className="burger-btn"
        aria-label="Apri menu"
        onClick={() => setOpen(!open)}
        tabIndex={0}
      >
        <span className="burger-icon">
          <span /> {/* linea 1 */}
          <span /> {/* linea 2 */}
        </span>
      </button>
      {/* Menu dropdown visibile se open */}
      {open && (
        <div className="burger-menu-inline">
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("portfolio"); }}>Portfolio</button>
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("services"); }}>Servizi</button>
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("about"); }}>About</button>
          <button className="menu-item" onClick={() => { setOpen(false); onSelect("contact"); }}>Contatti</button>
        </div>
      )}
    </div>
  );
}