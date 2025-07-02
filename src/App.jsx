import React, { useState, useRef, useCallback, useEffect } from "react";
import Sidebar from "./components/Sidebar/SideBar";
import DashboardBase from "./components/DashboardBase";
import HomeSection from "./pages/HomeSection";
import AboutSection from "./pages/AboutSection";
import ProjectsSection from "./pages/ProjectsSection";
import ContactsSection from "./pages/ContactsSection";
import bgPattern from "./assets/content/background/0.png";
import PageFlipTransition from "./components/PageFlipTransition";
import OverlayWithHole from "./components/OverlayWithHole";
import AvatarAnimato from "./components/animation/AvatarAnimato";
import holder0 from "./assets/page-content-sprites/holders/8.png";
import useIsMobile from "./hooks/useIsMobile";
import UmbyBotRPG from "./mobile/UmbyBotRPG";

const SECTIONS = ["home", "about", "projects", "contacts"];
const FLIP_DURATION = 820;

const DASHBOARD_SCALE = 1.5;
// Avatar overlay: puoi regolare qui!
const AVATAR_ORIG_LEFT = 270;
const AVATAR_ORIG_TOP = 185;
const AVATAR_WIDTH = 80;
const AVATAR_HEIGHT = 80;
// Cerchio overlay: puoi regolare qui!
const CIRCLE_ORIG_LEFT = 260;
const CIRCLE_ORIG_TOP = 175;
const CIRCLE_WIDTH = 100;
const CIRCLE_HEIGHT = 100;

function App() {
  const isMobile = useIsMobile();
  const [selectedSection, setSelectedSection] = useState("home");
  const [pendingSection, setPendingSection] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("forward");
  const [hasInteracted, setHasInteracted] = useState(false);
  const prevSectionRef = useRef("home");
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [bulbLight, setBulbLight] = useState(false);
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);

  // Stato: animazione bocca avatar (viene aggiornato da HomeDialogBox)
  const [avatarTalking, setAvatarTalking] = useState(false);

  const dashboardRef = useRef();

  // Overlay ABS: calcolato su mount/resize/scroll
  const [avatarAbs, setAvatarAbs] = useState({ left: 0, top: 0 });
  const [circleAbs, setCircleAbs] = useState({ left: 0, top: 0 });

  // Aggiornamento posizione overlays: retry loop (evita glitch on refresh)
  useEffect(() => {
    function updatePos() {
      if (!dashboardRef.current) return;
      const rect = dashboardRef.current.getBoundingClientRect();
      setAvatarAbs({
        left: rect.left + AVATAR_ORIG_LEFT * DASHBOARD_SCALE,
        top: rect.top + AVATAR_ORIG_TOP * DASHBOARD_SCALE,
      });
      setCircleAbs({
        left: rect.left + CIRCLE_ORIG_LEFT * DASHBOARD_SCALE,
        top: rect.top + CIRCLE_ORIG_TOP * DASHBOARD_SCALE,
      });
    }
    // Retry loop su mount, catch asincronie
    let tries = 0;
    function tryUpdate() {
      updatePos();
      tries++;
      if (tries < 12) setTimeout(tryUpdate, 85);
    }
    tryUpdate();

    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [selectedSection, DASHBOARD_SCALE]);

  // POWER HUB / FLIP CALLBACKS
  const handlePowerOnFinished = useCallback(() => {
    setOverlayVisible(false);
    setDialogBoxVisible(true);
  }, []);
  const handlePowerClick = useCallback(() => {
    setOverlayVisible(true);
    setDialogBoxVisible(false);
  }, []);
  const handleBulbChange = useCallback((on) => setBulbLight(on), []);

  // NAVIGAZIONE CON FLIP
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

  // SOLO MOBILE: mostra chatbot mobile
  if (isMobile) return <UmbyBotRPG />;

  // RENDER SEZIONE CORRENTE, passa la callback a HomeSection!
  const renderSection = () => {
    switch (selectedSection) {
      case "home":
        return (
          <HomeSection
            dialogBoxVisible={dialogBoxVisible}
            onAvatarTalking={setAvatarTalking}
          />
        );
      case "about": return <AboutSection />;
      case "projects": return <ProjectsSection />;
      case "contacts": return <ContactsSection />;
      default: return <HomeSection dialogBoxVisible={dialogBoxVisible} onAvatarTalking={setAvatarTalking} />;
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
      {/* --- OVERLAY NERO SOPRA TUTTO (zIndex altissimo) --- */}
      <OverlayWithHole
        visible={overlayVisible}
        opacity={bulbLight ? 0.12 : 0.77}
        zIndex={20000}
        containerRef={dashboardRef}
        holeTop={316 + 87}
        holeLeft={814 + 16}
        holeWidth={61}
        holeHeight={140}
        borderRadius={9}
      />

      {/* --- CERCHIO E AVATAR SOLO SU HOME, SOTTO OVERLAY NERO --- */}
      {selectedSection === "home" && !isFlipping && (
        <>
          {/* Cerchio (zIndex basso, sotto avatar) */}
          <img
            src={holder0}
            alt="avatar-circle"
            style={{
              position: "fixed",
              left: circleAbs.left,
              top: circleAbs.top,
              width: CIRCLE_WIDTH * DASHBOARD_SCALE,
              height: CIRCLE_HEIGHT * DASHBOARD_SCALE,
              zIndex: 11999,
              pointerEvents: "none",
              imageRendering: "pixelated",
            }}
            draggable={false}
          />
          {/* Avatar (zIndex sopra il cerchio, sempre nitido, animato) */}
          <div
            style={{
              position: "fixed",
              left: avatarAbs.left,
              top: avatarAbs.top,
              width: AVATAR_WIDTH * DASHBOARD_SCALE,
              height: AVATAR_HEIGHT * DASHBOARD_SCALE,
              zIndex: 12000,
              pointerEvents: "none",
              borderRadius: "50%",
              overflow: "hidden",
              background: "none",
            }}
          >
            <AvatarAnimato talking={avatarTalking} />
          </div>
        </>
      )}

      {/* --- DASHBOARD BASE (ref per overlay) --- */}
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
          <DashboardBase
            ref={dashboardRef}
            scale={DASHBOARD_SCALE}
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
              onPowerClick: handlePowerClick,
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
