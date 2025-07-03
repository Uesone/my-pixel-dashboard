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

// --- CONFIG POSIZIONE DEL BUCO (relativi alla dashboard NON scalata) ---
const HOLE_DASHBOARD_TOP = 268;     // Cambia qui la Y (0 = alto, 316+87 = lampadina originale)
const HOLE_DASHBOARD_LEFT = 411;    // Cambia qui la X (0 = tutto a sinistra)
const HOLE_WIDTH = 31;
const HOLE_HEIGHT = 93;
const HOLE_RADIUS = 4;

const DASHBOARD_WIDTH = 487;
const DASHBOARD_HEIGHT = 399;
const DASHBOARD_SCALE = 1.5;

const SECTIONS = ["home", "about", "projects", "contacts"];
const FLIP_DURATION = 820;

// Avatar/circle (sempre SCALATI rispetto design base)
const AVATAR_ORIG_LEFT = 262, AVATAR_ORIG_TOP = 185, AVATAR_WIDTH = 80, AVATAR_HEIGHT = 80;
const CIRCLE_ORIG_LEFT = 250, CIRCLE_ORIG_TOP = 175, CIRCLE_WIDTH = 100, CIRCLE_HEIGHT = 100;

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

  // Ref alla dashboard (serve per overlay e avatar positioning)
  const dashboardRef = useRef();

  // Stato assoluto per overlay hole (CLS = 0)
  const [holeAbs, setHoleAbs] = useState({
    top: 0,
    left: 0,
    width: HOLE_WIDTH * DASHBOARD_SCALE,
    height: HOLE_HEIGHT * DASHBOARD_SCALE
  });

  // Stato assoluto per avatar/circle (rimangono *sempre* scalati, non fluid)
  const [avatarAbs, setAvatarAbs] = useState({ left: 0, top: 0 });
  const [circleAbs, setCircleAbs] = useState({ left: 0, top: 0 });

  // --- Aggiorna posizione avatar + buco overlay ---
  useEffect(() => {
    function updatePos() {
      if (!dashboardRef.current) return;
      const rect = dashboardRef.current.getBoundingClientRect();

      // BUCO OVERLAY: responsivo/fluid per CLS=0 (usa Math.round per evitare subpixel CLS)
      setHoleAbs({
        top: Math.round(rect.top + HOLE_DASHBOARD_TOP * (rect.height / DASHBOARD_HEIGHT)),
        left: Math.round(rect.left + HOLE_DASHBOARD_LEFT * (rect.width / DASHBOARD_WIDTH)),
        width: Math.round(HOLE_WIDTH * (rect.width / DASHBOARD_WIDTH)),
        height: Math.round(HOLE_HEIGHT * (rect.height / DASHBOARD_HEIGHT))
      });

      // AVATAR & CERCHIO: SOLO SCALATI, non fluid!
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

  // Flip route
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

  // CALLBACKS: PowerHub
  const handlePowerOnFinished = useCallback(() => setOverlayVisible(false), []);
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
      {/* === Overlay DINAMICO responsive, CLS 0 === */}
      <OverlayWithHole
        visible={overlayVisible}
        opacity={bulbLight ? 0.12 : 0.77}
        zIndex={20000}
        holeTop={holeAbs.top}
        holeLeft={holeAbs.left}
        holeWidth={holeAbs.width}
        holeHeight={holeAbs.height}
        borderRadius={HOLE_RADIUS * (holeAbs.width / HOLE_WIDTH)}
      />

      {/* Avatar/circle */}
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
            holeTop={HOLE_DASHBOARD_TOP * DASHBOARD_SCALE}
            holeLeft={HOLE_DASHBOARD_LEFT * DASHBOARD_SCALE}
            holeWidth={HOLE_WIDTH * DASHBOARD_SCALE}
            holeHeight={HOLE_HEIGHT * DASHBOARD_SCALE}
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
            {!isFlipping && children}
          </DashboardBase>
        </div>
      </div>
    </div>
  );
}

// --- ROUTING LOGIC ---
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
      <Routes>
        <Route
          path="/"
          element={
            <HomeSection
              dialogBoxVisible
              onAvatarTalking={setAvatarTalking}
            />
          }
        />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/projects" element={<ProjectsSection />} />
        <Route path="/contacts" element={<ContactsSection />} />
        <Route path="*" element={<HomeSection />} />
      </Routes>
    </AnimatedDashboard>
  );
}

// --- ENTRYPOINT ---
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
