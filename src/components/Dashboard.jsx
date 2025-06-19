import React from "react";
import SpriteAnimator from "./SpriteAnimator";
import HomeSection from "../pages/HomeSection";
import AboutSection from "../pages/AboutSection";
import ProjectsSection from "../pages/ProjectsSection";
import ContactsSection from "../pages/ContactsSection";
import Sidebar from "./Sidebar";

// Import sprite per la dashboard (puoi cambiare path/nome a seconda di dove hai salvato)
import frame from "../assets/pixel-map-sprites/base/3.png";      // cornice esterna
import sideBarBg from "../assets/pixel-map-sprites/base/2.png"; // colonna/blocco sinistro
import pageBg from "../assets/pixel-map-sprites/base/0.png";    // rettangolo beige (pagina)
import pageCorners from "../assets/pixel-map-sprites/base/1.png"; // decorazioni angoli

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
        width: 399,
        height: 487,
        position: "relative",
        margin: "0 auto",
        zIndex: 1,
        imageRendering: "pixelated",
      }}
    >
      {/* Cornice esterna */}
      <img
        src={frame}
        alt="cornice"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 399,
          height: 487,
          zIndex: 10,
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Colonna/blocco sinistro */}
      <img
        src={sideBarBg}
        alt="colonna"
        style={{
          position: "absolute",
          left: 0,
          top: 40, // regola se serve!
          width: 129,
          height: 373,
          zIndex: 20,
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Sidebar pixel art (vera sidebar, sopra la grafica) */}
      <div
        style={{
          position: "absolute",
          left: 12, // posizione a piacere (da regolare in base alla tua UI)
          top: 90,
          zIndex: 30,
        }}
      >
        <Sidebar {...sidebarProps} />
      </div>

      {/* Rettangolo beige (pagina centrale) */}
      <img
        src={pageBg}
        alt="pagina"
        style={{
          position: "absolute",
          left: 47,
          top: 47,
          width: 323,
          height: 309,
          zIndex: 30,
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Decorazioni angoli sopra la pagina */}
      <img
        src={pageCorners}
        alt="decorazioni"
        style={{
          position: "absolute",
          left: 47,
          top: 47,
          width: 323,
          height: 309,
          zIndex: 40,
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Contenuto pagina + animazione flip */}
      <div
        style={{
          position: "absolute",
          left: 47,
          top: 47,
          width: 323,
          height: 309,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {isFlipping ? (
          <SpriteAnimator
            frames={flipDirection === "next" ? nextFrames : prevFrames}
            frameRate={16}
            loop={false}
            style={{ width: 323, height: 309 }}
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
