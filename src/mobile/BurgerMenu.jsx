import React, { useState } from "react";
import "./styles/BurgerMenu.css"
export default function BurgerMenu({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-burger-menu">
      <button
        className="burger-btn"
        aria-label="Apri menu"
        onClick={() => setOpen(!open)}
        style={{
          width: 40,
          height: 40,
          background: "none",
          border: "none",
          padding: 0,
          marginRight: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        {/* Burger icon pure CSS for perf */}
        <span className="burger-icon" />
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
