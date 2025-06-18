import React from "react";
import SpriteAnimator from "./SpriteAnimator";
import HomeSection from "../pages/HomeSection";
import AboutSection from "../pages/AboutSection";
import ProjectsSection from "../pages/ProjectsSection";

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
        background: "#161a20",
        borderRadius: 24,
        boxShadow: "0 0 32px #1119",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: "3px solid #3f3d43",
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
  </main>
);

export default Dashboard;
