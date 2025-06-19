import React from "react";
import SpriteAnimator from "./SpriteAnimator";
import HomeSection from "../pages/HomeSection";
import AboutSection from "../pages/AboutSection";
import ProjectsSection from "../pages/ProjectsSection";
import ContactsSection from "../pages/ContactsSection";
import Sidebar from "./Sidebar";
import dashboardImg from "../assets/pixel-map/0.png";

// Import dei frame per flip avanti
const nextFramesModules = import.meta.glob("../assets/page-flip/next-page/*.png", { eager: true });
const nextFrames = Object.keys(nextFramesModules)
  .sort((a, b) => Number(a.match(/(\d+)\.png$/)?.[1]) - Number(b.match(/(\d+)\.png$/)?.[1]))
  .map((key) => nextFramesModules[key].default);

// Import dei frame per flip indietro
const prevFramesModules = import.meta.glob("../assets/page-flip/previous-page/*.png", { eager: true });
const prevFrames = Object.keys(prevFramesModules)
  .sort((a, b) => Number(a.match(/(\d+)\.png$/)?.[1]) - Number(b.match(/(\d+)\.png$/)?.[1]))
  .map((key) => prevFramesModules[key].default);

const renderSection = (section) => {
  switch (section) {
    case "home":
      return <HomeSection />;
    case "about":
      return <AboutSection />;
    case "projects":
      return <ProjectsSection />;
    case "contacts":
      return <ContactsSection />;
    default:
      return <div>Unknown section</div>;
  }
};

const Dashboard = ({
  section,
  isFlipping,
  flipDirection,
  onFlipEnd,
  sidebarProps,
}) => (
  <main
    style={{
      flex: 1,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
    }}
  >
    <div
      style={{
        width: 730,
        height: 615,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Sidebar posizionata esattamente al bordo sinistro della dashboard */}
      <div
        style={{
          position: "absolute",
          left: "-20px", // <- Modifica questo valore per avvicinare perfettamente
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      >
        <Sidebar {...sidebarProps} />
      </div>

      {/* Dashboard pixel art (immagine centrale) */}
      <img
        src={dashboardImg}
        alt="dashboard"
        style={{
          width: 730,
          height: 615,
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          imageRendering: "pixelated",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Contenuto sezioni e animazioni flip */}
      <div
        style={{
          width: 560,
          height: 420,
          zIndex: 2,
          position: "absolute",
          left: 80,
          top: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFlipping ? (
          <SpriteAnimator
            frames={flipDirection === "next" ? nextFrames : prevFrames}
            frameRate={16}
            loop={false}
            style={{ width: 400, height: 400 }}
            onAnimationEnd={onFlipEnd}
          />
        ) : (
          renderSection(section)
        )}
      </div>
    </div>
  </main>
);

export default Dashboard;
