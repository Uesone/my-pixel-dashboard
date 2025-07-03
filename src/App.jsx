// src/App.jsx
import React, { useState, useRef, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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

// === CONFIGURAZIONE ===
const SECTIONS = ["home", "about", "projects", "contacts"];
const FLIP_DURATION = 820;
const DASHBOARD_SCALE = 1.5;
const AVATAR_ORIG_LEFT = 262, AVATAR_ORIG_TOP = 185, AVATAR_WIDTH = 80, AVATAR_HEIGHT = 80;
const CIRCLE_ORIG_LEFT = 250, CIRCLE_ORIG_TOP = 175, CIRCLE_WIDTH = 100, CIRCLE_HEIGHT = 100;

/**
 * AnimatedDashboard: gestisce overlay, flip, animazioni e sidebar.
 * La flip animation viene attivata su QUALSIASI cambio route (non solo al click!).
 * L'avatar animato riceve la prop "talking" direttamente da AppRoutes!
 */
function AnimatedDashboard({
  children,
  selectedSection,
  navigate,
  avatarTalking // 👈 PATCH: ricevi stato dall'alto!
}) {
  // Overlay, bulb, dialog box
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [bulbLight, setBulbLight] = useState(false);
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);

  // Animazione flip route
  const [pendingSection, setPendingSection] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("forward");
  const [hasInteracted, setHasInteracted] = useState(false);
  const prevSectionRef = useRef(selectedSection);

  // Overlay/avatar positioning (responsive, no CLS)
  const dashboardRef = useRef();
  const [avatarAbs, setAvatarAbs] = useState({ left: 0, top: 0 });
  const [circleAbs, setCircleAbs] = useState({ left: 0, top: 0 });

  // Aggiorna posizioni overlay/avatar a ogni mount/resize/scroll/route
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

  // Animazione flip su cambio route
  useEffect(() => {
    if (prevSectionRef.current !== selectedSection) {
      const prevIdx = SECTIONS.indexOf(prevSectionRef.current);
      const newIdx = SECTIONS.indexOf(selectedSection);
      setFlipDirection(newIdx > prevIdx ? "forward" : "backward");

      setHasInteracted(true);
      setPendingSection(selectedSection);
      setIsFlipping(true);

      const timeout = setTimeout(() => {
        setIsFlipping(false);
        setPendingSection(null);
        prevSectionRef.current = selectedSection;
      }, FLIP_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [selectedSection]);

  // CALLBACKS: PowerHub (overlay, dialogBox, bulb)
  const handlePowerOnFinished = useCallback(() => {
    setOverlayVisible(false);
    setDialogBoxVisible(true);
  }, []);
  const handlePowerClick = useCallback(() => {
    setOverlayVisible(true);
    setDialogBoxVisible(false);
  }, []);
  const handleBulbChange = useCallback((on) => setBulbLight(on), []);

  // Visualizza la pagina arrotolata se non sei su Home
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
      {/* === Overlay sopra tutto === */}
      <OverlayWithHole
        visible={overlayVisible}
        opacity={bulbLight ? 0.12 : 0.77}
        zIndex={20000}
        containerRef={dashboardRef}
        holeTop={316 + 87}
        holeLeft={814 + -4}
        holeWidth={61}
        holeHeight={140}
        borderRadius={9}
      />

      {/* === Cerchio + Avatar (solo su Home) === */}
      {selectedSection === "home" && !isFlipping && (
        <>
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
            {/* === L'avatar animato riceve la prop talking! === */}
            <AvatarAnimato talking={avatarTalking} />
          </div>
        </>
      )}

      {/* === DashboardBase e Sidebar === */}
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
          minHeight: 600,
        }}
      >
        <Sidebar
          selected={selectedSection}
          navigate={navigate}
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
            {/* Render solo se NON stai flippando */}
            {!isFlipping && children}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

/**
 * AppRoutes: mappa path → sezione e gestisce le route con React Router.
 * Passa selectedSection, navigate E LO STATO avatarTalking/setAvatarTalking
 */
function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathToSection = {
    "/": "home",
    "/about": "about",
    "/projects": "projects",
    "/contacts": "contacts",
  };
  const selectedSection = pathToSection[location.pathname] || "home";

  // === PATCH: qui si trova lo stato globale dell'avatar che parla ===
  const [avatarTalking, setAvatarTalking] = useState(false);

  return (
    <AnimatedDashboard
      selectedSection={selectedSection}
      navigate={navigate}
      avatarTalking={avatarTalking} // 👈 lo passiamo in giù!
    >
      <Routes>
        <Route
          path="/"
          element={
            <HomeSection
              dialogBoxVisible
              onAvatarTalking={setAvatarTalking} // 👈 passaggio corretto!
            />
          }
        />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/contacts" element={<ContactsSection />} />
        {/* Fallback: redirect a Home */}
        <Route path="*" element={<HomeSection />} />
      </Routes>
    </AnimatedDashboard>
  );
}

/**
 * App principale. Se mobile, mostra UmbyBotRPG, altrimenti tutto il routing React Router.
 */
function App() {
  const isMobile = useIsMobile();
  if (isMobile) return <UmbyBotRPG />;
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
