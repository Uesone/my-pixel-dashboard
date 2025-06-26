import React, { useState, useRef, useCallback } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
import HomeSection from "./pages/HomeSection";
import AboutSection from "./pages/AboutSection";
import ProjectsSection from "./pages/ProjectsSection";
import ContactsSection from "./pages/ContactsSection";
import bgPattern from "./assets/content/background/0.png";
import PageFlipTransition from "./components/PageFlipTransition";
import OverlayWithHole from "./components/OverlayWithHole";

const SECTIONS = ["home", "about", "projects", "contacts"];
const FLIP_DURATION = 820;

function App() {
  // Navigazione, animazione, overlay
  const [selectedSection, setSelectedSection] = useState("home");
  const [pendingSection, setPendingSection] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("forward");
  const [hasInteracted, setHasInteracted] = useState(false);
  const prevSectionRef = useRef("home");

  // Overlay buio iniziale
  const [overlayVisible, setOverlayVisible] = useState(true);
  // Stato per il "lampeggio": true = stanza illuminata, false = buio
  const [bulbLight, setBulbLight] = useState(false);
  // Stato visibilità dialog box home (NEW)
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);

  // Ref per la dashboard (per allineare il buco)
  const dashboardRef = useRef();

  // --- MODIFICA QUI per allineare il buco pixel-perfect ---
  const HOLE_TOP = 316 + 87;
  const HOLE_LEFT = 814 + 16;
  const HOLE_WIDTH = 61;
  const HOLE_HEIGHT = 140;

  // Callback: termina overlay e mostra dialog dopo accensione
  const handlePowerOnFinished = useCallback(() => {
    setOverlayVisible(false);
    setDialogBoxVisible(true); // MOSTRA la dialog box
  }, []);

  // Ogni volta che accendi o spegni, overlay ON subito e HIDE dialog
  const handlePowerClick = useCallback((on) => {
    setOverlayVisible(true);
    setDialogBoxVisible(false); // Nasconde la dialog se spegni/riaccendi
  }, []);

  // Lampadina ON/OFF: solo per lampeggio (nessun controllo overlay qui)
  const handleBulbChange = useCallback((on) => {
    setBulbLight(on);
  }, []);

  // Navigazione con flip
  const handleSectionChange = (newSection) => {
    if (newSection === selectedSection || isFlipping) return;
    setHasInteracted(true);
    setPendingSection(newSection);
    setIsFlipping(true);
    const prevIdx = SECTIONS.indexOf(prevSectionRef.current);
    const newIdx = SECTIONS.indexOf(newSection);
    setFlipDirection(newIdx > prevIdx ? "forward" : "backward");
    setTimeout(() => {
      setSelectedSection(newSection);
      prevSectionRef.current = newSection;
      setIsFlipping(false);
      setPendingSection(null);
    }, FLIP_DURATION);
  };

  // Render sezione attuale, passa la prop a HomeSection
  const renderSection = () => {
    switch (selectedSection) {
      case "home": return <HomeSection dialogBoxVisible={dialogBoxVisible} />;
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "contacts": return <ContactsSection />;
      default: return <HomeSection dialogBoxVisible={dialogBoxVisible} />;
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
        overflow: "hidden"
      }}
    >
      {/* Overlay bucato, opacità dinamica per effetto lampeggio */}
      <OverlayWithHole
        visible={overlayVisible}
        opacity={bulbLight ? 0.12 : 0.77}
        zIndex={10003}
        containerRef={dashboardRef}
        holeTop={HOLE_TOP}
        holeLeft={HOLE_LEFT}
        holeWidth={HOLE_WIDTH}
        holeHeight={HOLE_HEIGHT}
        borderRadius={9}
      />

      <div
        ref={dashboardRef}
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
          minHeight: 600
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
            position: "relative"
          }}
        >
          {/* DashboardBase ora riceve le prop per la PowerHub */}
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
            PowerHubProps={{
              animated: true,
              onBulbChange: handleBulbChange,
              onPowerOnFinished: handlePowerOnFinished,
              onPowerClick: handlePowerClick, // <--- patch!
            }}
          >
            {!isFlipping && renderSection()}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

export default App;
