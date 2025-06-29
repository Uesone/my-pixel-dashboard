import React from "react";
// --- ASSET principali ---
import frame from "../assets/pixel-map-sprites/base/3.png";
import background from "../assets/pixel-map-sprites/base/0.png";
import corners from "../assets/pixel-map-sprites/base/1.png";
import leftBar from "../assets/pixel-map-sprites/base/2.png";

// --- POWER HUB ---
import powerHubTube from "../assets/pixel-map-sprites/power-hub/1.png";
import powerHubGlow from "../assets/pixel-map-sprites/power-hub/2.png";
import powerHubBox from "../assets/pixel-map-sprites/power-hub/3.png";
import PowerHubLights from "./PowerHubLights";

// --- FOGLIO ARROTOLATO (Page roll) ---
import pageRollPng from "../assets/content/page-flip/next-page/11.png";

// --- BUSSOLA (COMPASS) ---
import Compass from "./Compass";

// --- CLOCK ANIMATED ---
import ClockAnimated from "./ClockAnimated";

/**
 * DashboardBase
 * Layout principale della dashboard con frame, decorazioni, power hub e slot per children.
 * Ora contiene una classe "dashboard-base" per consentire il calcolo delle posizioni assolute
 * (necessario per tooltip scalate e altri overlay).
 *
 * @param {number} scale   Fattore di scala (default 1.4)
 * @param {ReactNode} children  Contenuto interno della pagina (es. AboutSection, Projects, ecc.)
 * @param {boolean} showPageRoll Se mostrare il foglio arrotolato in alto (effetto flip)
 * @param {ReactNode} pageFlipOverlay Overlay/animazione pagina che gira (opzionale)
 * @param {boolean} isFlipping True se in animazione page flip (nasconde gli angoli)
 * @param {object} PowerHubProps Props da passare a PowerHubLights
 */
const DashboardBase = ({
  scale = 1.4,
  children,
  showPageRoll = false,
  pageFlipOverlay = null,
  isFlipping = false,
  PowerHubProps = {}
}) => (
  <div
    className="dashboard-base" // <-- Importante per tooltip e overlay globali
    style={{
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      display: "inline-block",
      position: "relative",
      width: "487px",
      height: "399px",
    }}
  >
    {/* --- FOGLIO ARROTOLATO IN ALTO (Page flip) --- */}
    {showPageRoll && (
      <img
        src={pageRollPng}
        alt="Foglio arrotolato in alto"
        style={{
          position: "absolute",
          top: -65,
          left: -85,
          width: 650,
          height: 500,
          zIndex: 9999,
          pointerEvents: "none",
          imageRendering: "pixelated",
        }}
        draggable={false}
      />
    )}

    {/* --- FRAME ESTERNO DASHBOARD (bordo) --- */}
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

    {/* --- BARRA LATERALE SINISTRA --- */}
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

    {/* --- CONTENUTI INTERNI (children + eventuale overlay page flip) --- */}
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

    {/* --- DECORAZIONI ANGOLI (solo se non sta flippando) --- */}
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

    {/* --- POWER HUB: tubo, glow, box --- */}
    <img
      src={powerHubTube}
      alt="power hub tube"
      style={{
        position: "absolute",
        top: "23px",
        left: "25px",
        width: "438px",
        height: "325px",
        zIndex: 30,
        pointerEvents: "none",
      }}
      draggable={false}
    />

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

    {/* --- BOX BASE POWER HUB --- */}
    <img
      src={powerHubBox}
      alt="power hub box"
      style={{
        position: "absolute",
        top: "230px",
        left: "418px",
        width: "77px",
        height: "123px",
        zIndex: 33,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* --- POWER HUB ANIMATED LIGHTS & BULB --- */}
    <PowerHubLights {...PowerHubProps} />

    {/* --- COMPASS --- */}
    <Compass />

    {/* --- CLOCK ANIMATED --- */}
    <ClockAnimated /> {/* <--- Animazione digitale! */}

  </div>
);

export default DashboardBase;
