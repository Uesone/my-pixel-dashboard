import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
import HomeSection from "./pages/HomeSection";
import AboutSection from "./pages/AboutSection";
import ProjectsSection from "./pages/ProjectsSection";
import ContactsSection from "./pages/ContactsSection";
import bgPattern from "./assets/content/background/0.png";
import PageFlipTransition from "./components/PageFlipTransition";

const SECTIONS = ["home", "about", "projects", "contacts"];

function App() {
  const [selectedSection, setSelectedSection] = useState("home");
  const [flipDirection, setFlipDirection] = useState("forward");
  const [hasInteracted, setHasInteracted] = useState(false); // <--- new state!
  const prevSectionRef = useRef("home");

  const handleSectionChange = (newSection) => {
    // Non far nulla se clicchi la stessa pagina
    if (newSection === selectedSection) return;

    setHasInteracted(true); // <--- da ora in poi flip è attiva
    const prevIdx = SECTIONS.indexOf(prevSectionRef.current);
    const newIdx = SECTIONS.indexOf(newSection);
    setFlipDirection(newIdx > prevIdx ? "forward" : "backward");
    setSelectedSection(newSection);
    prevSectionRef.current = newSection;
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "home": return <HomeSection />;
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "contacts": return <ContactsSection />;
      default: return <HomeSection />;
    }
  };

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
        <Sidebar
          selected={selectedSection}
          onSelect={handleSectionChange}
          width={140}
          height={500}
        />
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
          <DashboardBase
            scale={1.5}
            showPageRoll={showPageRoll}
            pageFlipOverlay={
              hasInteracted ? ( // <--- Flip solo DOPO la prima interazione
                <PageFlipTransition
                  trigger={selectedSection}
                  direction={flipDirection}
                />
              ) : null
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
