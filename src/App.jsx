import React, { useState } from "react";
import Sidebar from "./components/Sidebar/SideBar";

function App() {
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#23242b",
      }}
    >
      <Sidebar selected={selectedSection} onSelect={setSelectedSection} width={140} height={440} />
      {/* Puoi aggiungere contenuto della pagina qui */}
    </div>
  );
}

export default App;
