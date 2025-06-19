import React from "react";
import SpriteAnimator from "./SpriteAnimator";
import HomeSection from "../pages/HomeSection";
import AboutSection from "../pages/AboutSection";
import ProjectsSection from "../pages/ProjectsSection";
import ContactsSection from "../pages/ContactsSection";
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

// Render contenuto sezione attuale
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

const Dashboard = ({ section, isFlipping, flipDirection, onFlipEnd }) => (
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
        width: 608,
        height: 512,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dashboard pixel art (immagine cornice) */}
      <img
        src={dashboardImg}
        alt="dashboard"
        style={{
          width: 608,
          height: 512,
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

      {/* Animazione flip o contenuto */}
      <div
        style={{
          width: 480, // oppure come preferisci per il "contenuto"
          height: 360,
          zIndex: 2,
          position: "absolute",
          left: 64,
          top: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
        }}
      >
        {isFlipping ? (
          <SpriteAnimator
            frames={flipDirection === "next" ? nextFrames : prevFrames}
            frameRate={16}
            loop={false}
            style={{ width: 320, height: 320 }}
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
