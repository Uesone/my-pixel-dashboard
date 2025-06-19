import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import bgPattern from "./assets/content/background/0.png";

// Asset sidebar
import btnBg from "./assets/content/side-tabs/0.png";
import btnBgActive from "./assets/content/side-tabs/1.png";
import homeIcon from "./assets/content/side-tabs/4.png";
import aboutIcon from "./assets/content/side-tabs/5.png";
import contactsIcon from "./assets/content/side-tabs/6.png";
import projectsIcon from "./assets/content/side-tabs/8.png";

const SECTIONS = [
  { key: "home", label: "Home", icon: homeIcon },
  { key: "about", label: "About", icon: aboutIcon },
  { key: "projects", label: "Projects", icon: projectsIcon },
  { key: "contacts", label: "Contacts", icon: contactsIcon },
];

function App() {
  const [selectedSection, setSelectedSection] = useState("home");
  const [pendingSection, setPendingSection] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");

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

  const handleFlipEnd = () => {
    setSelectedSection(pendingSection);
    setPendingSection(null);
    setIsFlipping(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#121212",
        fontFamily: "monospace",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundImage: `url(${bgPattern})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 12,
          transform: "scale(1.2)",
        }}
      >
        <Dashboard
          section={isFlipping ? pendingSection : selectedSection}
          isFlipping={isFlipping}
          flipDirection={flipDirection}
          onFlipEnd={handleFlipEnd}
          sidebarProps={{
            sections: SECTIONS,
            selected: selectedSection,
            disabled: isFlipping,
            onSelect: handleSidebarSelect,
            btnBg,
            btnBgActive,
          }}
        />
      </div>
    </div>
  );
}

export default App;
