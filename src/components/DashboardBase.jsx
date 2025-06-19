import React from "react";
// Base dashboard
import frame from "../assets/pixel-map-sprites/base/3.png";       // 487 x 399
import background from "../assets/pixel-map-sprites/base/0.png"; // 383 x 357
import corners from "../assets/pixel-map-sprites/base/1.png";    // 383 x 325
import leftBar from "../assets/pixel-map-sprites/base/2.png";    // 129 x 373

// Power Hub assets
import powerHubTube from "../assets/pixel-map-sprites/power-hub/1.png";      // tubo principale
import powerHubGlow from "../assets/pixel-map-sprites/power-hub/2.png";      // alone/blu al centro
import powerHubBox from "../assets/pixel-map-sprites/power-hub/3.png";       // scatola base
import powerHubLightOff from "../assets/pixel-map-sprites/power-hub/4.png";  // luce spenta
import powerHubLightOn from "../assets/pixel-map-sprites/power-hub/5.png";   // luce accesa
import powerHubBtnOff from "../assets/pixel-map-sprites/power-hub/6.png";    // pulsante spento
import powerHubBtnOn from "../assets/pixel-map-sprites/power-hub/7.png";     // pulsante acceso (rosso)
import powerHubBtnError from "../assets/pixel-map-sprites/power-hub/8.png";  // pulsante errore (marrone/scuro)

//Compass assets
import compassBase from "../assets/pixel-map-sprites/compass/0.png"; // base della bussola
import compassShadow from "../assets/pixel-map-sprites/compass/1.png"; //effetto ombra "sotto" la bussola, per profondità
import compassDeco from "../assets/pixel-map-sprites/compass/2.png"; //decorazione punti cardinali,overlay sopra la base
import compassNeedle from "../assets/pixel-map-sprites/compass/3.png"; //lancetta

//Bulb assets

import bulbBase from "../assets/pixel-map-sprites/bulb/0.png"; // bulb(luce) spenta
import bulbGlass from "../assets/pixel-map-sprites/bulb/1.png"; //bulb (luce) accesa

//Clock assets
import clockBase from "../assets/pixel-map-sprites/clock/0.png"; // la base del clock
import clockDigitsMask from "../assets/pixel-map-sprites/clock/1.png"; //decorazioni, simboli bianchi
import clockDigit0 from "../assets/pixel-map-sprites/clock/clock-digits/0/0.png"; //la prima cifra (0)

const DashboardBase = ({ scale = 1.4 }) => (
  // Questo wrapper scala tutta la dashboard in un colpo solo!
  <div
    style={{
      transform: `scale(${scale})`,      // 👈 Cambia qui il fattore di scala (es: 1.4, 1.6, 2)
      transformOrigin: "top left",       // 👈 Puoi mettere anche "center" se vuoi scalare dal centro
      display: "inline-block",           // 👈 Tiene il box compatto
    }}
  >
    <div
      style={{
        position: "relative",
        width: "487px",   // Non toccare: è la base del frame!
        height: "399px",
        imageRendering: "pixelated",
        overflow: "hidden",
      }}
      ></div>
    {/* FRAME ESTERNO */}
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

    {/* BARRA SINISTRA */}
    <img
      src={leftBar}
      alt="left bar"
      style={{
        position: "absolute",
        top: "13px",    // Cambia questo per SU/GIÙ
        left: "36px",   // Cambia questo per DESTRA/SINISTRA
        width: "129px",
        height: "373px",
        zIndex: 2,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* SFONDO CENTRALE */}
    <img
      src={background}
      alt="background"
      style={{
        position: "absolute",
        top: "5px",     // Cambia questo per SU/GIÙ
        left: "103px",   // Cambia questo per DESTRA/SINISTRA
        width: "370px",
        height: "380px",
        zIndex: 3,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* DECORAZIONI ANGOLI */}
    <img
      src={corners}
      alt="corners"
      style={{
        position: "absolute",
        top: "3px",     // Cambia questo per SU/GIÙ
        left: "116px",  // Cambia questo per DESTRA/SINISTRA
        width: "343px",
        height: "385px",
        zIndex: 4,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* FINE BASE DELLA DASHBOARD */}

    {/* --- POWER HUB --- */}
    {/* TUBO PRINCIPALE */}
    <img
      src={powerHubTube}
      alt="power hub tube"
      style={{
        position: "absolute",
        top: "23px",     // 🔵 Cambia per SU/GIÙ (prova 0~10)
        left: "25px",  // 🔵 Cambia per DX/SX (prova 340~360)
        width: "438px", // 🔵 Tieni originale se puoi (es: 130x170)
        height: "325px",
        zIndex: 10,
        pointerEvents: "none",
      }}
      draggable={false}
    />

{/* --- GLOW ORIZZONTALI --- */}
<img
  src={powerHubGlow}
  alt="glow horizontal 1"
  style={{
    position: "absolute",
    top: "50px",
    left: "35px",
    width: "32px",
    height: "32px",
    zIndex: 20,
    pointerEvents: "none",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow horizontal 2"
  style={{
    position: "absolute",
    top: "150px",
    left: "35px",
    width: "32px",
    height: "32px",
    zIndex: 20,
    pointerEvents: "none",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow horizontal 3"
  style={{
    position: "absolute",
    top: "65px",
    left: "428px",
    width: "32px",
    height: "32px",
    zIndex: 20,
    pointerEvents: "none",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow horizontal 4"
  style={{
    position: "absolute",
    top: "170px",
    left: "428px",
    width: "32px",
    height: "32px",
    zIndex: 20,
    pointerEvents: "none",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow horizontal 5"
  style={{
    position: "absolute",
    top: "250px",
    left: "35px",
    width: "32px",
    height: "32px",
    zIndex: 20,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* --- GLOW VERTICALI (RUOTATI) --- */}
<img
  src={powerHubGlow}
  alt="glow vertical 1"
  style={{
    position: "absolute",
    top: "36px",
    left: "400px",
    width: "32px",
    height: "32px",
    zIndex: 21,
    pointerEvents: "none",
    transform: "rotate(90deg)",
    transformOrigin: "center center",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow vertical 2"
  style={{
    position: "absolute",
    top: "36px",
    left: "320px",
    width: "32px",
    height: "32px",
    zIndex: 21,
    pointerEvents: "none",
    transform: "rotate(90deg)",
    transformOrigin: "center center",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow vertical 3"
  style={{
    position: "absolute",
    top: "36px",
    left: "245px",
    width: "32px",
    height: "32px",
    zIndex: 21,
    pointerEvents: "none",
    transform: "rotate(90deg)",
    transformOrigin: "center center",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow vertical 4"
  style={{
    position: "absolute",
    top: "36px",
    left: "160px",
    width: "32px",
    height: "32px",
    zIndex: 21,
    pointerEvents: "none",
    transform: "rotate(90deg)",
    transformOrigin: "center center",
  }}
  draggable={false}
/>
<img
  src={powerHubGlow}
  alt="glow vertical 5"
  style={{
    position: "absolute",
    top: "36px",
    left: "80px",
    width: "32px",
    height: "32px",
    zIndex: 21,
    pointerEvents: "none",
    transform: "rotate(90deg)",
    transformOrigin: "center center",
  }}
  draggable={false}
/>




    {/* BOX BASE */}
    <img
      src={powerHubBox}
      alt="power hub box"
      style={{
        position: "absolute",
        top: "230px",   // Cambia per SU/GIÙ
        left: "418px",  // Cambia per DX/SX
        width: "77px",
        height: "123px",
        zIndex: 12,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* LUCE SPENTA */}
{/* Luce spenta 1 */}
<img
  src={powerHubLightOff}
  alt="power hub light off 1"
  style={{
    position: "absolute",
        top: "275px",
        left: "437px",
        width: "16px",
        height: "16px",
    zIndex: 22,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* Luce spenta 2 */}
<img
  src={powerHubLightOff}
  alt="power hub light off 2"
  style={{
    position: "absolute",
    top: "285px",
    left: "437px",
    width: "16px",
    height: "16px",
    zIndex: 22,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* Luce spenta 3 */}
<img
  src={powerHubLightOff}
  alt="power hub light off 3"
  style={{
    position: "absolute",
    top: "295px",
    left: "437px",
    width: "16px",
    height: "16px",
    zIndex: 22,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* Luce spenta 4 */}
<img
  src={powerHubLightOff}
  alt="power hub light off 4"
  style={{
    position: "absolute",
    top: "305px",
    left: "437px",
    width: "16px",
    height: "16px",
    zIndex: 22,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* Luce spenta 5 */}
<img
  src={powerHubLightOff}
  alt="power hub light off 5"
  style={{
    position: "absolute",
    top: "316px",
    left: "437px",
    width: "16px",
    height: "16px",
    zIndex: 22,
    pointerEvents: "none",
  }}
  draggable={false}
/>


    {/* LUCE ACCESA */}
    {/* (Mostra solo se vuoi simulare "acceso") */}
    {/* <img
      src={powerHubLightOn}
      alt="power hub light on"
      style={{
        position: "absolute",
        top: "130px",
        left: "395px",
        width: "16px",
        height: "16px",
        zIndex: 14,
        pointerEvents: "none",
      }}
      draggable={false}
    /> */}

    {/* PULSANTE OFF */}
    <img
      src={powerHubBtnOff}
      alt="power hub btn off"
      style={{
        position: "absolute",
        top: "317px",
        left: "454px",
        width: "16px",
        height: "16px",
        zIndex: 15,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* PULSANTE ON */}
    {/* <img
      src={powerHubBtnOn}
      alt="power hub btn on"
      style={{
        position: "absolute",
        top: "165px",
        left: "400px",
        width: "16px",
        height: "16px",
        zIndex: 16,
        pointerEvents: "none",
      }}
      draggable={false}
    /> */}

    {/* PULSANTE ERRORE */}
    {/* <img
      src={powerHubBtnError}
      alt="power hub btn error"
      style={{
        position: "absolute",
        top: "165px",
        left: "400px",
        width: "16px",
        height: "16px",
        zIndex: 17,
        pointerEvents: "none",
      }}
      draggable={false}
    /> */}

    {/* -- Fine Power Hub -- */}

{/* INIZIO BUSSOLA */}

    {/* --- COMPASS SHADOW --- */}
<img
  src={compassShadow}
  alt="compass shadow"
  style={{
    position: "absolute",
    top: "262px",   // Cambia per SU/GIÙ
    left: "58px",  // Cambia per DX/SX
    width: "71px",  // o la dimensione originale PNG
    height: "80px",
    zIndex: 30,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* --- COMPASS BASE --- */}
<img
  src={compassBase}
  alt="compass base"
  style={{
    position: "absolute",
    top: "260px", //Cambia per SU/GIU
    left: "58px", // Cambia per DX/SX
    width: "70px", 
    height: "80px",
    zIndex: 31,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* --- COMPASS NEEDLE --- */}
<img
  src={compassNeedle}
  alt="compass needle"
  style={{
    position: "absolute",
    top: "278px",     // micro-offset se serve
    left: "70px",   //Cambia DX/SX
    width: "48px",
    height: "48px",
    zIndex: 32,
    pointerEvents: "none",
    // puoi aggiungere qui la rotazione!
    // transform: "rotate(0deg)",
    // transformOrigin: "center center",
  }}
  draggable={false}
/>

{/* --- COMPASS DECO --- */}
<img
  src={compassDeco}
  alt="compass deco"
  style={{
    position: "absolute",
    top: "280px", //CAMBIA SU/GIU
    left: "74px", //CAMBIA DESTRA/SINISTRA
    width: "39px",
    height: "48px",
    zIndex: 33,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* FINE BUSSOLA */}

{/* INIZIO BULB */}

{/* BULB BASE (filamento + zoccolo) */}
<img
  src={bulbBase}
  alt="bulb base"
  style={{
    position: "absolute",
    top: "84px",   // CAMBIA QUESTO per SU/GIÙ
    left: "34px",   // CAMBIA QUESTO per DX/SX
    width: "112px", // oppure lascia "auto" per le proporzioni originali
    height: "240px",
    zIndex: 40,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* BULB GLASS (bulbo traslucido bianco) 
<img
  src={bulbGlass}
  alt="bulb glass"
  style={{
    position: "absolute",
    top: "120px",   // Stessi valori della base per sovrapporre preciso
    left: "60px",
    width: "112px",
    height: "240px",
    zIndex: 41,
    pointerEvents: "none",
    // puoi aggiungere animazioni qui (es: opacity per “accendere” il bulbo)
  }}
  draggable={false}
/>*/}
{/* FINE BULB */}

{/* INIZIO CLOCK */}
{/* CLOCK BASE */}
<img
  src={clockBase}
  alt="clock base"
  style={{
    position: "absolute",
    top: "60px",   // CAMBIA QUESTO per SU/GIÙ
    left: "45px",  // CAMBIA QUESTO per DX/SX
    width: "96px",
    height: "64px",
    zIndex: 50,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* CLOCK MASK (digit mask) */}
<img
  src={clockDigitsMask}
  alt="clock mask"
  style={{
    position: "absolute",
    top: "60px",
    left: "45px",
    width: "96px",
    height: "64px",
    zIndex: 51,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* CLOCK DIGITs STATICi "0" */}
{/* DIGIT 1 */}
<img
  src={clockDigit0}
  alt="clock digit 1"
  style={{
    position: "absolute",
    top: "66px",   // MICRO-OFFSET per centrare sul mask
    left: "52px",
    width: "28px", // o la dimensione originale PNG (controlla proporzione!)
    height: "32px",
    zIndex: 52,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* DIGIT 2 */}
<img
  src={clockDigit0}
  alt="clock digit 2"
  style={{
    position: "absolute",
    top: "66px",
    left: "69px",   // Sposta a destra rispetto al primo
    width: "28px",
    height: "32px",
    zIndex: 52,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* DIGIT 3 */}
<img
  src={clockDigit0}
  alt="clock digit 3"
  style={{
    position: "absolute",
    top: "66px",
    left: "88px",  // Sposta ancora più a destra
    width: "28px",
    height: "32px",
    zIndex: 52,
    pointerEvents: "none",
  }}
  draggable={false}
/>
{/* DIGIT 4 */}
<img
  src={clockDigit0}
  alt="clock digit 4"
  style={{
    position: "absolute",
    top: "66px",
    left: "105px",  // Sposta ancora più a destra
    width: "28px",
    height: "32px",
    zIndex: 52,
    pointerEvents: "none",
  }}
  draggable={false}
/>

{/* FINE CLOCK */}

  </div>

  
  
);

export default DashboardBase;
