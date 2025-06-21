import React, { useState } from "react";
import holder0 from "../assets/page-content-sprites/holders/8.png";
import linePng from "../assets/page-content-sprites/holders/0.png";
import HomeDialogBox from "../components/HomeDialogBox";
import AvatarAnimato from "../components/AvatarAnimato";

const HomeSection = () => {
  const [talking, setTalking] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: 360,
        height: 300,
      }}
    >
      {/* Cornice tonda (holder PNG) */}
      <img
        src={holder0}
        alt="holder"
        style={{
          position: "absolute",
          top: 180,
          left: 210,
          width: 125,
          height: 125,
          zIndex: 2,
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* Avatar ANIMATO dentro il cerchio */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 220,
          width: 105,
          height: 105,
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <AvatarAnimato talking={talking} />
      </div>

      {/* PRIMA LINEA (originale) */}
      <img
        src={linePng}
        alt="linea"
        style={{
          position: "absolute",
          top: 50,
          left: 200,
          width: 120,
          height: 100,
          zIndex: 3,
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* SECONDA LINEA (specchiata) */}
      <img
        src={linePng}
        alt="linea specchiata"
        style={{
          position: "absolute",
          top: 50,
          left: 452,
          width: 120,
          height: 100,
          zIndex: 3,
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />

      {/* Testo con font VT323 */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 313,
          fontFamily: "'VT323', monospace",
          fontSize: 72,
          color: "#24170b",
          letterSpacing: 0,
          padding: "3px 16px",
          zIndex: 10,
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
        }}
      >
        Home
      </div>

      {/* === BALLOON DIALOG ANIMATO: lo centri dove vuoi tu === */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 320,
          width: 290,
          height: 124,
          zIndex: 20,
          pointerEvents: "auto"
        }}
      >
        <HomeDialogBox
          balloonWidth={290}
          balloonHeight={390}
          fontSize={20}
          textTop={175}
          textLeft={38}
          textWidth={215}
          textHeight={40}
          arrowPrevTop={280}
          arrowPrevLeft={34}
          arrowNextTop={281}
          arrowNextLeft={215}
          onTalkingChange={setTalking}
        />
      </div>
    </div>
  );
};

export default HomeSection;
