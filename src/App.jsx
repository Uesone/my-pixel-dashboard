import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

// Elenco delle sezioni disponibili (puoi aggiungere/rinominare)
const SECTIONS = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
];

function App() {
  // Sezione attualmente visibile
  const [selectedSection, setSelectedSection] = useState("home");
  // Sezione che sto per visualizzare (destinazione)
  const [pendingSection, setPendingSection] = useState(null);
  // True durante la flip animation
  const [isFlipping, setIsFlipping] = useState(false);
  // Direzione flip ("next" o "previous")
  const [flipDirection, setFlipDirection] = useState("next");

  // Gestore click su Sidebar: parte flip SOLO se cambio sezione
  const handleSidebarSelect = (sectionKey) => {
    if (isFlipping || sectionKey === selectedSection) return;
    setPendingSection(sectionKey);
    setFlipDirection(
      SECTIONS.findIndex((s) => s.key === sectionKey) >
      SECTIONS.findIndex((s) => s.key === selectedSection)
        ? "next"
        : "previous"
    );
    setIsFlipping(true);
  };

  // Quando la flip animation termina, cambio effettivamente sezione
  const handleFlipEnd = () => {
    setSelectedSection(pendingSection);
    setPendingSection(null);
    setIsFlipping(false);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#202a33",
        fontFamily: "monospace",
      }}
    >
      <Sidebar
        sections={SECTIONS}
        selected={selectedSection}
        disabled={isFlipping}
        onSelect={handleSidebarSelect}
      />

      <Dashboard
        section={isFlipping ? pendingSection : selectedSection}
        isFlipping={isFlipping}
        flipDirection={flipDirection}
        onFlipEnd={handleFlipEnd}
      />
    </div>
  );
}

export default App;
