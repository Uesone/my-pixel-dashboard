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
const FLIP_DURATION = 700 + 120; // match durata flip in ms

function App() {
  const [selectedSection, setSelectedSection] = useState("home");
  const [pendingSection, setPendingSection] = useState(null); // la nuova sezione che sto per mostrare
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("forward");
  const [hasInteracted, setHasInteracted] = useState(false);
  const prevSectionRef = useRef("home");

  const handleSectionChange = (newSection) => {
    if (newSection === selectedSection || isFlipping) return; // ignora se già su quella sezione o già in flip

    setHasInteracted(true);
    setPendingSection(newSection);
    setIsFlipping(true);

    const prevIdx = SECTIONS.indexOf(prevSectionRef.current);
    const newIdx = SECTIONS.indexOf(newSection);
    setFlipDirection(newIdx > prevIdx ? "forward" : "backward");

    // Dopo la durata del flip, aggiorna sezione
    setTimeout(() => {
      setSelectedSection(newSection);
      prevSectionRef.current = newSection;
      setIsFlipping(false);
      setPendingSection(null);
    }, FLIP_DURATION); // tempo = flip completo
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
    <div style={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", background: "#23242b", overflow: "hidden" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", borderRadius: 28, backgroundImage: `url(${bgPattern})`, backgroundRepeat: "no-repeat", backgroundSize: "stretch", backgroundPosition: "center", boxShadow: "0 8px 32px #000c", padding: 36, minWidth: 960, minHeight: 600 }}>
        <Sidebar selected={selectedSection} onSelect={handleSectionChange} width={140} height={500} />
        <div style={{ flex: 0, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, minWidth: 450, position: "relative" }}>
          <DashboardBase
            scale={1.5}
            showPageRoll={showPageRoll}
             isFlipping={isFlipping}  
            pageFlipOverlay={
              isFlipping && hasInteracted ? (
                <PageFlipTransition
                  trigger={pendingSection}
                  direction={flipDirection}
                />
              ) : null
            }
          >
            {/* Mostra i contenuti SOLO se NON stai flippando */}
            {!isFlipping && renderSection()}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

export default App;