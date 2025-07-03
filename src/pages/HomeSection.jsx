import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useLanguage } from "../components/LanguageContext.jsx";
import linePng from "../assets/page-content-sprites/holders/0.png";
import HomeDialogBox from "../components/animation/HomeDialogBox.jsx";

/**
 * HomeSection (senza avatar/circle che ora sono overlay in App.jsx)
 * - Riceve dialogBoxVisible e onAvatarTalking come props.
 */
const HomeSection = ({ dialogBoxVisible, onAvatarTalking = () => {} }) => {
  // ---- PATCH ANTI-CLS: ghost div balloon ----
  const balloonStyle = {
    position: "absolute",
    top: 20,
    left: 100,
    width: 180,
    height: 80,
    zIndex: 30,
    pointerEvents: "none",
    opacity: 0,
    userSelect: "none",
  };

  return (
    <PageWrapper>
      {/* GHOST DIV ANTI-CLS (sempre presente, riserva spazio balloon) */}
      <div style={balloonStyle} aria-hidden="true" />

      {/* BALLOON / DIALOG BOX */}
      {dialogBoxVisible && (
        <div
          style={{
            ...balloonStyle,
            pointerEvents: "auto",
            opacity: 1, // il balloon vero è visibile
          }}
        >
          <HomeDialogBox
            balloonWidth={210}
            balloonHeight={255}
            fontSize={15}
            textTop={115}
            textLeft={30}
            textWidth={150}
            textHeight={20}
            arrowPrevTop={180}
            arrowPrevLeft={8}
            arrowNextTop={183}
            arrowNextLeft={160}
            letterSpacing={0}
            fontWeight="400"
            color="#f5ecd7"
            onTalkingChange={onAvatarTalking}
          />
        </div>
      )}

      {/* LINEE DECORATIVE */}
      <img
        src={linePng}
        alt="linea"
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          width: 90,
          height: 70,
          zIndex: 15,
          pointerEvents: "none",
        }}
        draggable={false}
      />
      <img
        src={linePng}
        alt="linea specchiata"
        style={{
          position: "absolute",
          top: 20,
          left: 214,
          width: 90,
          height: 70,
          zIndex: 15,
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />
      {/* TITOLO TESTO ("Home") */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 95,
          fontFamily: "'VT323', monospace",
          fontSize: 52,
          color: "#24170b",
          letterSpacing: 2,
          padding: "3px 16px",
          zIndex: 25,
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
        }}
      >
        Home
      </div>
    </PageWrapper>
  );
};

export default HomeSection;
