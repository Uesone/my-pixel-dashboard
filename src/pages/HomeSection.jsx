import React, { useState } from "react";
import holder0 from "../assets/page-content-sprites/holders/8.png";
import linePng from "../assets/page-content-sprites/holders/0.png";
import balloonPng from "../assets/ui/dialog/steampunk_dialogbox.png";
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

      {/* --- BALLOON PNG e DIALOGBOX in overlay pixel-perfect --- */}
      <div
        style={{
          position: "absolute",
          top: 92,      // LA POSIZIONE CHE USAVI GIÀ!
          left: 320,
          width: 290,
          height: 300,
          zIndex: 20,
          pointerEvents: "none"
        }}
      >
        <img
          src={balloonPng}
          alt="balloon"
          style={{
            width: "100%",
            height: "100%",
            imageRendering: "pixelated",
            pointerEvents: "none"
          }}
          draggable={false}
        />
        <div
          style={{
            position: "absolute",
            top: 127,   // Le stesse coordinate di prima per il box testo
            left: 60,
            width: 215,
            height: 40,
            zIndex: 22,
            pointerEvents: "auto"
          }}
        >
          <HomeDialogBox
            width={215}
            height={40}
            fontSize={22}
            onTalkingChange={setTalking}
          />
        </div>
      </div>

      {/* === AGGIUNGI ALTRI PNG QUI COME VUOI! === */}
    </div>
  );
};

export default HomeSection;
