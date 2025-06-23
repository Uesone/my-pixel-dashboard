import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
import HomeSection from "./pages/HomeSection";
import AboutSection from "./pages/AboutSection";
import ProjectsSection from "./pages/ProjectsSection";
import ContactsSection from "./pages/ContactsSection";
import bgPattern from "./assets/content/background/0.png";

// IMPORTA il nuovo componente animazione globale!
import PageFlipTransition from "./components/PageFlipTransition"; // <-- crea questo file!

// Ordine delle sezioni, serve per sapere se vai avanti/indietro
const SECTIONS = ["home", "about", "projects", "contacts"];

function App() {
  // Stato per la pagina selezionata
  const [selectedSection, setSelectedSection] = useState("home");
  // Stato per la direzione (avanti/indietro)
  const [flipDirection, setFlipDirection] = useState("forward");
  // Ref per ricordare la sezione precedente (NO re-render)
  const prevSectionRef = useRef("home");

  // Cambio pagina con direzione
  const handleSectionChange = (newSection) => {
    const prevIdx = SECTIONS.indexOf(prevSectionRef.current);
    const newIdx = SECTIONS.indexOf(newSection);
    // Setta la direzione della flip
    setFlipDirection(newIdx > prevIdx ? "forward" : "backward");
    setSelectedSection(newSection);
    prevSectionRef.current = newSection;
  };

  // Funzione che ritorna il componente giusto
  const renderSection = () => {
    switch (selectedSection) {
      case "home": return <HomeSection />;
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "contacts": return <ContactsSection />;
      default: return <HomeSection />;
    }
  };

  // Mostra il foglio arrotolato SOLO se NON sei in Home
  const showPageRoll = selectedSection !== "home";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#23242b",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          borderRadius: 28,
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "stretch",
          backgroundPosition: "center",
          boxShadow: "0 8px 32px #000c",
          padding: 36,
          minWidth: 960,
          minHeight: 600,
        }}
      >
        {/* SIDEBAR */}
        <Sidebar
          selected={selectedSection}
          onSelect={handleSectionChange}
          width={140}
          height={500}
        />

        {/* DASHBOARD + PAGINA */}
        <div
          style={{
            flex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            minWidth: 450,
            position: "relative",
          }}
        >
          {/* 
            DashboardBase ora ha la nuova prop "pageFlipOverlay":
            tutto quello che ci passi viene renderizzato come overlay pixel-perfect sopra la pagina.
          */}
          <DashboardBase
            scale={1.5}
            showPageRoll={showPageRoll}
            pageFlipOverlay={
              <PageFlipTransition
                trigger={selectedSection}
                direction={flipDirection}
              />
            }
          >
            {renderSection()}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

export default App;
