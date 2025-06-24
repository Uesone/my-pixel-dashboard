import React from "react";
// Asset principali
import frame from "../assets/pixel-map-sprites/base/3.png";       // 487 x 399
import background from "../assets/pixel-map-sprites/base/0.png"; // 383 x 357 (beige centrale)
import corners from "../assets/pixel-map-sprites/base/1.png";    // 383 x 325
import leftBar from "../assets/pixel-map-sprites/base/2.png";    // 129 x 373

// Power Hub assets
import powerHubTube from "../assets/pixel-map-sprites/power-hub/1.png";
import powerHubGlow from "../assets/pixel-map-sprites/power-hub/2.png";
import powerHubBox from "../assets/pixel-map-sprites/power-hub/3.png";
// Luci, lampadina, pulsante animati (ora da componente)
import PowerHubLights from "./PowerHubLights"; // <-- AGGIUNTO

// Compass assets
import compassBase from "../assets/pixel-map-sprites/compass/0.png";
import compassShadow from "../assets/pixel-map-sprites/compass/1.png";
import compassDeco from "../assets/pixel-map-sprites/compass/2.png";
import compassNeedle from "../assets/pixel-map-sprites/compass/3.png";

// Clock assets
import clockBase from "../assets/pixel-map-sprites/clock/0.png";
import clockDigitsMask from "../assets/pixel-map-sprites/clock/1.png";
import clockDigit0 from "../assets/pixel-map-sprites/clock/clock-digits/0/0.png";

// --- FOGLIO ARROTOLATO (top page flip PNG) ---
import pageRollPng from "../assets/content/page-flip/next-page/11.png";

/*
  La prop showPageRoll controlla se il foglio arrotolato in alto va visualizzato.
  - Di default: false (non viene mostrato)
  - Passa showPageRoll={true} da App.jsx/Section per mostrarlo sulle pagine che vuoi!
  La prop isFlipping oscura gli angoli durante il flip.
*/
const DashboardBase = ({ scale = 1.4, children, showPageRoll = false, pageFlipOverlay = null, isFlipping = false }) => (
  // Wrapper che scala tutto il dashboard (puoi regolare scale per zoom)
  <div
    style={{
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      display: "inline-block",
      position: "relative",
      width: "487px",
      height: "399px",
    }}
  >
    {/* --- FOGLIO ARROTOLATO IN ALTO --- */}
    {showPageRoll && (
      <img
        src={pageRollPng}
        alt="Foglio arrotolato in alto"
        style={{
          position: "absolute",
          top: -65,    // Sporgente sopra la dashboard
          left: -85,   // Centra il foglio
          width: 650,
          height: 500,
          zIndex: 9999,
          pointerEvents: "none",
          imageRendering: "pixelated",
        }}
        draggable={false}
      />
    )}

    {/* --- FRAME ESTERNO --- */}
    <img
      src={frame}
      alt="frame"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "487px",
        height: "399px",
        zIndex: 1,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* --- BARRA SINISTRA --- */}
    <img
      src={leftBar}
      alt="left bar"
      style={{
        position: "absolute",
        top: "13px",
        left: "36px",
        width: "129px",
        height: "373px",
        zIndex: 2,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* --- SFONDO CENTRALE (pagina beige) --- */}
    <img
      src={background}
      alt="background"
      style={{
        position: "absolute",
        top: "5px",
        left: "103px",
        width: "370px",
        height: "380px",
        zIndex: 3,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* === AREA CONTENUTI E ANIMAZIONI === */}
    <div
      style={{
        position: "absolute",
        top: "52px",
        left: "130px",
        width: "310px",
        height: "290px",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {children}
      {pageFlipOverlay}
    </div>

    {/* --- DECORAZIONI ANGOLI --- */}
    {!isFlipping && (
      <img
        src={corners}
        alt="corners"
        style={{
          position: "absolute",
          top: "3px",
          left: "116px",
          width: "343px",
          height: "385px",
          zIndex: 20,
          pointerEvents: "none",
        }}
        draggable={false}
      />
    )}

    {/* --- POWER HUB --- */}
    <img src={powerHubTube} alt="power hub tube" style={{
      position: "absolute", top: "23px", left: "25px", width: "438px", height: "325px", zIndex: 30, pointerEvents: "none"
    }} draggable={false} />

    {/* Glow orizzontali */}
    <img src={powerHubGlow} alt="glow horizontal 1" style={{ position: "absolute", top: "50px", left: "35px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none" }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 2" style={{ position: "absolute", top: "150px", left: "35px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none" }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 3" style={{ position: "absolute", top: "65px", left: "428px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none" }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 4" style={{ position: "absolute", top: "170px", left: "428px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none" }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 5" style={{ position: "absolute", top: "250px", left: "35px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none" }} draggable={false} />

    {/* Glow verticali */}
    <img src={powerHubGlow} alt="glow vertical 1" style={{ position: "absolute", top: "36px", left: "400px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center" }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 2" style={{ position: "absolute", top: "36px", left: "320px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center" }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 3" style={{ position: "absolute", top: "36px", left: "245px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center" }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 4" style={{ position: "absolute", top: "36px", left: "160px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center" }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 5" style={{ position: "absolute", top: "36px", left: "80px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center" }} draggable={false} />

    {/* BOX BASE */}
    <img src={powerHubBox} alt="power hub box" style={{ position: "absolute", top: "230px", left: "418px", width: "77px", height: "123px", zIndex: 33, pointerEvents: "none" }} draggable={false} />

    {/* --- POWER HUB ANIMATED LIGHTS & BULB --- */}
    <PowerHubLights animated={true} />

    {/* --- COMPASS --- */}
    <img src={compassShadow} alt="compass shadow" style={{ position: "absolute", top: "262px", left: "58px", width: "71px", height: "80px", zIndex: 36, pointerEvents: "none" }} draggable={false} />
    <img src={compassBase} alt="compass base" style={{ position: "absolute", top: "260px", left: "58px", width: "70px", height: "80px", zIndex: 37, pointerEvents: "none" }} draggable={false} />
    <img src={compassNeedle} alt="compass needle" style={{ position: "absolute", top: "278px", left: "70px", width: "48px", height: "48px", zIndex: 38, pointerEvents: "none" }} draggable={false} />
    <img src={compassDeco} alt="compass deco" style={{ position: "absolute", top: "280px", left: "74px", width: "39px", height: "48px", zIndex: 39, pointerEvents: "none" }} draggable={false} />

    {/* --- CLOCK --- */}
    <img src={clockBase} alt="clock base" style={{ position: "absolute", top: "60px", left: "45px", width: "96px", height: "64px", zIndex: 50, pointerEvents: "none" }} draggable={false} />
    <img src={clockDigitsMask} alt="clock mask" style={{ position: "absolute", top: "60px", left: "45px", width: "96px", height: "64px", zIndex: 51, pointerEvents: "none" }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 1" style={{ position: "absolute", top: "66px", left: "52px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none" }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 2" style={{ position: "absolute", top: "66px", left: "69px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none" }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 3" style={{ position: "absolute", top: "66px", left: "88px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none" }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 4" style={{ position: "absolute", top: "66px", left: "105px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none" }} draggable={false} />

  </div>
);

export default DashboardBase;
