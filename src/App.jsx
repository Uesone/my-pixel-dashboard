import React, { useState } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
import HomeSection from "./pages/HomeSection";
import AboutSection from "./pages/AboutSection";
import ProjectsSection from "./pages/ProjectsSection";
import ContactsSection from "./pages/ContactsSection";
import bgPattern from "./assets/content/background/0.png";

function App() {
  const [selectedSection, setSelectedSection] = useState("home");

  // Funzione che ritorna il componente giusto in base alla sezione selezionata
  const renderSection = () => {
    switch (selectedSection) {
      case "home": return <HomeSection />;
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "contacts": return <ContactsSection />;
      default: return <HomeSection />;
    }
  };

  // --- Mostra il foglio arrotolato SOLO se NON sei in Home ---
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
          onSelect={setSelectedSection}
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
            Passa showPageRoll={showPageRoll}!
            - DashboardBase ora può visualizzare il PNG arrotolato in alto se serve
          */}
          <DashboardBase scale={1.5} showPageRoll={showPageRoll}>
            {renderSection()}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

export default App;
