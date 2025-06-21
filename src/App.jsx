import React, { useState } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
import HomeSection from "./pages/HomeSection"; // <-- Importa la tua pagina Home
import bgPattern from "./assets/content/background/0.png"; // <-- PNG reticolato

function App() {
  const [selectedSection, setSelectedSection] = useState("home");

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
      {/* CARD centrale con bordo legno e sfondo PNG */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          borderRadius: 28,
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "stretch", // oppure "100% 100%"
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

        {/* DASHBOARD + PAGINE */}
        <div
          style={{
            flex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            minWidth: 450,
            position: "relative", // Serve per l'absolute della pagina
          }}
        >
          <DashboardBase scale={1.5} />

          {/* PAGINE: Mostra HomeSection SOLO se selezionata */}
          {selectedSection === "home" && (
            <div
              style={{
                position: "absolute", // Sovrappone la pagina alla dashboard
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 99,
                pointerEvents: "auto",
                display: "flex", // permette centrare il contenuto
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HomeSection />
            </div>
          )}
          {/* Qui in futuro altre pagine (AboutSection, ProjectsSection, ecc) */}
        </div>
      </div>
    </div>
  );
}

export default App;
