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

// --- Costanti fisse per overlay/animazioni (coordinate buco PowerHub e avatar) ---
const HOLE_TOP = 268;
const HOLE_LEFT = 540;
const HOLE_WIDTH = 40;
const HOLE_HEIGHT = 93;
const HOLE_RADIUS = 4;
const DASHBOARD_SCALE = 1.5;
const SECTIONS = ["home", "about", "projects", "contacts"];
const FLIP_DURATION = 820;
const AVATAR_ORIG_LEFT = 262, AVATAR_ORIG_TOP = 185, AVATAR_WIDTH = 80, AVATAR_HEIGHT = 80;
const CIRCLE_ORIG_LEFT = 250, CIRCLE_ORIG_TOP = 175, CIRCLE_WIDTH = 100, CIRCLE_HEIGHT = 100;

/**
 * AnimatedDashboard: overlay, avatar, e logica anti-CLS + dialogBox
 * - Gestisce l’overlay, l’avatar e la dialog/balloon (mostrata solo dopo PowerHub)
 * - Patch anti-CLS: ghost div per avatar/circle e condizione sulle coordinate.
 */
function AnimatedDashboard({
  children,
  selectedSection,
  navigate,
  avatarTalking
}) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [bulbLight, setBulbLight] = useState(false);

  const [pendingSection, setPendingSection] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("forward");
  const [hasInteracted, setHasInteracted] = useState(false);
  const prevSectionRef = useRef(selectedSection);

  // PATCH: Dialog/balloon visibile SOLO dopo animazione PowerHub
  const [showDialogBox, setShowDialogBox] = useState(false);

  // Ref dashboard per calcolo overlay/avatar
  const dashboardRef = useRef();

  // Overlay (PowerHub) posizioni assolute calcolate dal DOM
  const [holeAbs, setHoleAbs] = useState({
    top: 0, left: 0, width: HOLE_WIDTH * DASHBOARD_SCALE, height: HOLE_HEIGHT * DASHBOARD_SCALE
  });
  // Avatar/circle
  const [avatarAbs, setAvatarAbs] = useState({ left: 0, top: 0 });
  const [circleAbs, setCircleAbs] = useState({ left: 0, top: 0 });

  // Calcolo posizioni su mount e resize/scroll (ANTI-CLS)
  useEffect(() => {
    function updatePos() {
      if (!dashboardRef.current) return;
      const rect = dashboardRef.current.getBoundingClientRect();
      setHoleAbs({
        top: Math.round(rect.top + HOLE_TOP * DASHBOARD_SCALE),
        left: Math.round(rect.left + HOLE_LEFT * DASHBOARD_SCALE),
        width: Math.round(HOLE_WIDTH * DASHBOARD_SCALE),
        height: Math.round(HOLE_HEIGHT * DASHBOARD_SCALE)
      });
      setAvatarAbs({
        left: rect.left + AVATAR_ORIG_LEFT * DASHBOARD_SCALE,
        top: rect.top + AVATAR_ORIG_TOP * DASHBOARD_SCALE,
      });
      setCircleAbs({
        left: rect.left + CIRCLE_ORIG_LEFT * DASHBOARD_SCALE,
        top: rect.top + CIRCLE_ORIG_TOP * DASHBOARD_SCALE,
      });
    }
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [selectedSection]);

  // Gestione animazione flip pagina
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


  // CALLBACK: lampadina PowerHub finita → mostra dialog!
  const handlePowerOnFinished = useCallback(() => {
    setOverlayVisible(false);
    setShowDialogBox(true);
  }, []);
  const handlePowerClick = useCallback(() => setOverlayVisible(true), []);
  const handleBulbChange = useCallback((on) => setBulbLight(on), []);

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
      {/* === Overlay PowerHub anti-CLS === */}
      <OverlayWithHole
        visible={overlayVisible}
        opacity={bulbLight ? 0.12 : 0.77}
        zIndex={20000}
        holeTop={holeAbs.top}
        holeLeft={holeAbs.left}
        holeWidth={holeAbs.width}
        holeHeight={holeAbs.height}
        borderRadius={HOLE_RADIUS * DASHBOARD_SCALE}
      />

      {/* === GHOST DIV anti-CLS per avatar/circle (prenota spazio, invisibile) === */}
      <div
        style={{
          position: "fixed",
          left: circleAbs.left,
          top: circleAbs.top,
          width: CIRCLE_WIDTH * DASHBOARD_SCALE,
          height: CIRCLE_HEIGHT * DASHBOARD_SCALE,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 11998,
          userSelect: "none",
        }}
        aria-hidden="true"
      />
      {/* Renderizza avatar/circle SOLO se posizione calcolata */}
      {selectedSection === "home" && !isFlipping && circleAbs.left !== 0 && circleAbs.top !== 0 && (
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
            <AvatarAnimato talking={avatarTalking} />
          </div>
        </>
      )}

      {/* === DashboardBase, Sidebar, e contenuto === */}
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
        {/* Ghost DIV ANTI-CLS: riserva lo spazio della dashboard scalata */}
        <div
          style={{
            width: 487 * DASHBOARD_SCALE,
            height: 399 * DASHBOARD_SCALE,
            minWidth: 487 * DASHBOARD_SCALE,
            minHeight: 399 * DASHBOARD_SCALE,
            maxWidth: 487 * DASHBOARD_SCALE,
            maxHeight: 399 * DASHBOARD_SCALE,
            pointerEvents: "none",
            opacity: 0,
            position: "absolute",
            left: 0, top: 0, zIndex: 0,
            userSelect: "none",
          }}
          aria-hidden="true"
        />
        {/* Sidebar e dashboard */}
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
            {/* PATCH: children è una funzione che riceve showDialogBox */}
            {!isFlipping && children(showDialogBox)}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

// --- Routing logic PATCH: children è una funzione (showDialogBox) ---
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
  const [avatarTalking, setAvatarTalking] = useState(false);

  return (
    <AnimatedDashboard
      selectedSection={selectedSection}
      navigate={navigate}
      avatarTalking={avatarTalking}
    >
      {(showDialogBox) => (
        <Routes>
          <Route
            path="/"
            element={
              <HomeSection
                dialogBoxVisible={showDialogBox}
                onAvatarTalking={setAvatarTalking}
              />
            }
          />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contacts" element={<ContactsSection />} />
          <Route path="*" element={<HomeSection dialogBoxVisible={showDialogBox} onAvatarTalking={setAvatarTalking} />} />
        </Routes>
      )}
    </AnimatedDashboard>
  );
}

// --- Entrypoint App ---
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
