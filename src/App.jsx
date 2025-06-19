import React, { useState } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
// 👉 IMPORTA il PNG del reticolato
import bgPattern from "./assets/content/background/0.png"; // correggi il path se necessario

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
          // 👉 BORDO LEGNO (scegli il colore che preferisci)
          borderRadius: 28,
          // 👉 SFONDO PNG reticolato
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat:"no-repeat" ,
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

        {/* DASHBOARD */}
        <div
          style={{
            flex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            minWidth: 450,
          }}
        >
          <DashboardBase scale={1.5} section={selectedSection} />
        </div>
      </div>
    </div>
  );
}

export default App;
