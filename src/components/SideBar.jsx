import React from "react";

// Props:
// - sections: [{key, label}, ...]
// - selected: key attualmente selezionato
// - onSelect: funzione chiamata quando clicchi su una sezione
// - disabled: se true, disabilita tutti i bottoni
const Sidebar = ({ sections, selected, onSelect, disabled }) => (
  <nav
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#161a20",
      minWidth: 100,
      padding: "32px 12px",
      borderRight: "2px solid #333c",
      gap: 24,
    }}
  >
    {sections.map((section) => (
      <button
        key={section.key}
        onClick={() => onSelect(section.key)}
        disabled={disabled}
        style={{
          width: 64,
          height: 64,
          marginBottom: 10,
          border: selected === section.key ? "3px solid #f8d23c" : "2px solid #222",
          background: selected === section.key ? "#232" : "#111",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 14,
          borderRadius: 16,
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          boxShadow: selected === section.key ? "0 0 12px #f8d23c88" : "0 0 6px #2228",
          transition: "all 0.2s",
        }}
      >
        {/* Qui puoi mettere una icona pixel art o la label */}
        {section.label}
      </button>
    ))}
  </nav>
);

export default Sidebar;
