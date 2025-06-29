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

  // Se vuoi che l’avatar parli SOLO quando la dialog box è visibile
  useEffect(() => {
    setTalking(dialogBoxVisible);
  }, [dialogBoxVisible]);

  return (
    // === Wrapper che occupa tutta l'area beige (310x290) ===
    <PageWrapper>
      {/* --- CORNICE TONDA AVATAR --- */}
      <img
        src={holder0}
        alt="holder"
        style={{
          position: "absolute",
          top: 90,
          left: 10,
          width: 100,
          height: 100,
          zIndex: 12,
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* --- AVATAR ANIMATO --- */}
      <div
        style={{
          position: "absolute",
          top: 103,
          left: 22,
          width: 78,
          height: 76,
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 11,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <AvatarAnimato talking={talking} />
      </div>

      {/* --- LINEA DECORATIVA SINISTRA --- */}
      <img
        src={linePng}
        alt="linea"
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          width: 90,
          height: 70,
          zIndex: 13,
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* --- LINEA DECORATIVA DESTRA (specchiata) --- */}
      <img
        src={linePng}
        alt="linea specchiata"
        style={{
          position: "absolute",
          top: 20,
          left: 214,
          width: 90,
          height: 70,
          zIndex: 13,
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />

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
          zIndex: 20,
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
        }}
      >
        Home
      </div>

      {/* --- BALLOON / DIALOG BOX --- */}
      {dialogBoxVisible && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 100,
            width: 180,
            height: 80,
            zIndex: 21,
            pointerEvents: "auto"
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
    </PageWrapper>
  );
};

export default HomeSection;
