import React, { useState } from "react";
import "./styles/BurgerMenu.css";

export default function BurgerMenu({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-burger-menu">
      <button
        className="burger-btn"
        aria-label="Apri menu"
        onClick={() => setOpen(!open)}
        tabIndex={0}
      >
        <span className="burger-icon">
          <span />
          <span />
        </span>
      </button>
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
