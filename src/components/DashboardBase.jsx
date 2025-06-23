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
import powerHubLightOff from "../assets/pixel-map-sprites/power-hub/4.png";
import powerHubLightOn from "../assets/pixel-map-sprites/power-hub/5.png";
import powerHubBtnOff from "../assets/pixel-map-sprites/power-hub/6.png";
import powerHubBtnOn from "../assets/pixel-map-sprites/power-hub/7.png";
import powerHubBtnError from "../assets/pixel-map-sprites/power-hub/8.png";

// Compass assets
import compassBase from "../assets/pixel-map-sprites/compass/0.png";
import compassShadow from "../assets/pixel-map-sprites/compass/1.png";
import compassDeco from "../assets/pixel-map-sprites/compass/2.png";
import compassNeedle from "../assets/pixel-map-sprites/compass/3.png";

// Bulb assets
import bulbBase from "../assets/pixel-map-sprites/bulb/0.png";
import bulbGlass from "../assets/pixel-map-sprites/bulb/1.png";

// Clock assets
import clockBase from "../assets/pixel-map-sprites/clock/0.png";
import clockDigitsMask from "../assets/pixel-map-sprites/clock/1.png";
import clockDigit0 from "../assets/pixel-map-sprites/clock/clock-digits/0/0.png";

// --- FOGLIO ARROTOLATO (top page flip PNG) ---
// IMPORTA QUI il frame 11 della tua animazione
import pageRollPng from "../assets/content/page-flip/next-page/11.png";

/*
  La prop showPageRoll controlla se il foglio arrotolato in alto va visualizzato.
  - Di default: false (non viene mostrato)
  - Passa showPageRoll={true} da App.jsx/Section per mostrarlo sulle pagine che vuoi!
*/
const DashboardBase = ({ scale = 1.4, children, showPageRoll = false }) => (
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
    {/* 
      - PNG che spunta dall’alto (fuori dalla zona beige)
      - Si vede SEMPRE sopra tutto, ma solo se showPageRoll === true
      - Puoi cambiare top/left/width/height per sistemare la posizione a pixel-perfect!
    */}
    {showPageRoll && (
      <img
        src={pageRollPng}
        alt="Foglio arrotolato in alto"
        style={{
          position: "absolute",
          top: -65,    // <--- REGOLA qui per farlo “sporgere” sopra la dashboard (prova a cambiare!)
          left: -85,   // <--- REGOLA qui per centrarlo orizzontalmente sopra la zona beige
          width: 650,  // <--- Larghezza PNG (prova a matchare con la tua reference/gif)
          height: 500,  // <--- Altezza PNG (idem)
          zIndex: 9999, // <--- Altissimo: SEMPRE sopra tutto!
          pointerEvents: "none", // Non interagisce col mouse
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

    {/* --- SFONDO CENTRALE (pagina beige, PNG) --- */}
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

    {/* 
      === AREA PIXEL PERFECT PER ANIMAZIONI, PAGE FLIP, CONTENUTO ===
      - Modifica SOLO qui dentro per le tue pagine animate
      - Il div combacia esattamente con la PNG beige di sfondo
      - Tutto ciò che metti qui dentro (componenti, animazioni) sarà sopra la PNG beige,
        ma sotto le decorazioni (es: corners) o altri elementi con zIndex superiore
      - Puoi usare overflow: "hidden" per non far uscire le animazioni dai bordi
    */}
    <div
      style={{
        position: "absolute",
        top: "52px",
        left: "130px",
        width: "310px",
        height: "290px",
        zIndex: 10,
        overflow: "hidden",
        //border: "2px dashed red", // <- Scommenta per debugare l'area attiva
        //background: "rgba(0,255,0,0.07)", // <- Scommenta per evidenziare l'area
      }}
    >
      {children}
    </div>

    {/* --- DECORAZIONI ANGOLI --- */}
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

    {/* --- POWER HUB --- */}
    <img src={powerHubTube} alt="power hub tube" style={{
      position: "absolute", top: "23px", left: "25px", width: "438px", height: "325px", zIndex: 30, pointerEvents: "none"
    }} draggable={false} />

    {/* Glow orizzontali */}
    <img src={powerHubGlow} alt="glow horizontal 1" style={{
      position: "absolute", top: "50px", left: "35px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 2" style={{
      position: "absolute", top: "150px", left: "35px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 3" style={{
      position: "absolute", top: "65px", left: "428px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 4" style={{
      position: "absolute", top: "170px", left: "428px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow horizontal 5" style={{
      position: "absolute", top: "250px", left: "35px", width: "32px", height: "32px", zIndex: 31, pointerEvents: "none"
    }} draggable={false} />

    {/* Glow verticali */}
    <img src={powerHubGlow} alt="glow vertical 1" style={{
      position: "absolute", top: "36px", left: "400px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 2" style={{
      position: "absolute", top: "36px", left: "320px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 3" style={{
      position: "absolute", top: "36px", left: "245px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 4" style={{
      position: "absolute", top: "36px", left: "160px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center"
    }} draggable={false} />
    <img src={powerHubGlow} alt="glow vertical 5" style={{
      position: "absolute", top: "36px", left: "80px", width: "32px", height: "32px", zIndex: 32, pointerEvents: "none", transform: "rotate(90deg)", transformOrigin: "center center"
    }} draggable={false} />

    {/* BOX BASE */}
    <img src={powerHubBox} alt="power hub box" style={{
      position: "absolute", top: "230px", left: "418px", width: "77px", height: "123px", zIndex: 33, pointerEvents: "none"
    }} draggable={false} />

    {/* LUCI SPENTE */}
    <img src={powerHubLightOff} alt="power hub light off 1" style={{
      position: "absolute", top: "275px", left: "437px", width: "16px", height: "16px", zIndex: 34, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubLightOff} alt="power hub light off 2" style={{
      position: "absolute", top: "285px", left: "437px", width: "16px", height: "16px", zIndex: 34, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubLightOff} alt="power hub light off 3" style={{
      position: "absolute", top: "295px", left: "437px", width: "16px", height: "16px", zIndex: 34, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubLightOff} alt="power hub light off 4" style={{
      position: "absolute", top: "305px", left: "437px", width: "16px", height: "16px", zIndex: 34, pointerEvents: "none"
    }} draggable={false} />
    <img src={powerHubLightOff} alt="power hub light off 5" style={{
      position: "absolute", top: "316px", left: "437px", width: "16px", height: "16px", zIndex: 34, pointerEvents: "none"
    }} draggable={false} />

    {/* PULSANTE OFF */}
    <img src={powerHubBtnOff} alt="power hub btn off" style={{
      position: "absolute", top: "317px", left: "454px", width: "16px", height: "16px", zIndex: 35, pointerEvents: "none"
    }} draggable={false} />

    {/* --- COMPASS --- */}
    <img src={compassShadow} alt="compass shadow" style={{
      position: "absolute", top: "262px", left: "58px", width: "71px", height: "80px", zIndex: 36, pointerEvents: "none"
    }} draggable={false} />
    <img src={compassBase} alt="compass base" style={{
      position: "absolute", top: "260px", left: "58px", width: "70px", height: "80px", zIndex: 37, pointerEvents: "none"
    }} draggable={false} />
    <img src={compassNeedle} alt="compass needle" style={{
      position: "absolute", top: "278px", left: "70px", width: "48px", height: "48px", zIndex: 38, pointerEvents: "none"
      // puoi aggiungere qui la rotazione!
      // transform: "rotate(0deg)", transformOrigin: "center center",
    }} draggable={false} />
    <img src={compassDeco} alt="compass deco" style={{
      position: "absolute", top: "280px", left: "74px", width: "39px", height: "48px", zIndex: 39, pointerEvents: "none"
    }} draggable={false} />

    {/* --- BULB --- */}
    <img src={bulbBase} alt="bulb base" style={{
      position: "absolute", top: "84px", left: "34px", width: "112px", height: "240px", zIndex: 40, pointerEvents: "none"
    }} draggable={false} />
    {/* Per accendere la bulb:
    <img src={bulbGlass} alt="bulb glass" style={{
      position: "absolute", top: "120px", left: "60px", width: "112px", height: "240px", zIndex: 41, pointerEvents: "none"
      // puoi aggiungere animazioni qui (es: opacity per “accendere” il bulbo)
    }} draggable={false} /> */}

    {/* --- CLOCK --- */}
    <img src={clockBase} alt="clock base" style={{
      position: "absolute", top: "60px", left: "45px", width: "96px", height: "64px", zIndex: 50, pointerEvents: "none"
    }} draggable={false} />
    <img src={clockDigitsMask} alt="clock mask" style={{
      position: "absolute", top: "60px", left: "45px", width: "96px", height: "64px", zIndex: 51, pointerEvents: "none"
    }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 1" style={{
      position: "absolute", top: "66px", left: "52px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none"
    }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 2" style={{
      position: "absolute", top: "66px", left: "69px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none"
    }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 3" style={{
      position: "absolute", top: "66px", left: "88px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none"
    }} draggable={false} />
    <img src={clockDigit0} alt="clock digit 4" style={{
      position: "absolute", top: "66px", left: "105px", width: "28px", height: "32px", zIndex: 52, pointerEvents: "none"
    }} draggable={false} />

  </div>
);

export default DashboardBase;
