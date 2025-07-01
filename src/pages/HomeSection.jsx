import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLanguage } from "../components/LanguageContext.jsx";

// --- Elementi decorativi ---
import holder0 from "../assets/page-content-sprites/holders/8.png";         // Cornice rotonda avatar
import linePng from "../assets/page-content-sprites/holders/0.png";         // Linee decorative
import HomeDialogBox from "../components/animation/HomeDialogBox.jsx";      // Baloon/dialogo
import AvatarAnimato from "../components/animation/AvatarAnimato.jsx";      // Avatar animato

// Ricevi dialogBoxVisible come prop da App.jsx
const HomeSection = ({ dialogBoxVisible }) => {
  const [talking, setTalking] = useState(false);

  // Fai parlare l’avatar SOLO quando la dialog box è visibile
  useEffect(() => {
    setTalking(dialogBoxVisible);
  }, [dialogBoxVisible]);

  return (
    // === Wrapper che occupa tutta l'area beige (310x290) ===
    <PageWrapper>
      {/* --- BALLOON / DIALOG BOX (sempre in top, zIndex più alto) --- */}
      {dialogBoxVisible && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 100,
            width: 180,
            height: 80,
            zIndex: 30, // PATCH: Priorità massima sopra tutto
            pointerEvents: "auto",
            willChange: "transform", // PATCH: aiuta i browser a ottimizzare il paint
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
            onTalkingChange={setTalking}
          />
        </div>
      )}

      {/* --- CORNICE TONDA AVATAR (secondo livello) --- */}
      <img
        src={holder0}
        alt="holder"
        style={{
          position: "absolute",
          top: 90,
          left: 10,
          width: 100,
          height: 100,
          zIndex: 20, // PATCH: subito sotto il balloon
          pointerEvents: "none",
          willChange: "transform", // PATCH: aiuta anti-flicker
        }}
        draggable={false}
      />

      {/* --- LINEE DECORATIVE SINISTRA/DX --- */}
      <img
        src={linePng}
        alt="linea"
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          width: 90,
          height: 70,
          zIndex: 15, // PATCH: sotto cornice/avatar/balloon
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
          zIndex: 15, // PATCH: sotto cornice/avatar/balloon
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />

      {/* --- AVATAR ANIMATO (terzo livello, sopra linee e sotto cornice) --- */}
      <div
        style={{
          position: "absolute",
          top: 103,
          left: 22,
          width: 78,
          height: 76,
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 12, // PATCH: avatar sotto tutto il resto
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          willChange: "transform", // PATCH: aiuta su Chrome/Edge
        }}
      >
        <AvatarAnimato talking={talking} />
      </div>

      {/* --- TITOLO TESTO ("Home") --- */}
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
          zIndex: 25, // PATCH: sopra avatar/cornice, ma sotto balloon
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
          willChange: "transform", // PATCH: aiuta anti-flicker
        }}
      >
        Home
      </div>
    </PageWrapper>
  );
};

export default HomeSection;
