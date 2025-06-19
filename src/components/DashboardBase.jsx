import React from "react";
import frame from "../assets/pixel-map-sprites/base/3.png";       // 487 x 399
import background from "../assets/pixel-map-sprites/base/0.png"; // 383 x 357
import corners from "../assets/pixel-map-sprites/base/1.png";    // 383 x 325
import leftBar from "../assets/pixel-map-sprites/base/2.png";    // 129 x 373

const DashboardBase = () => (
  <div
    style={{
      position: "relative",
      width: "487px",     // Larghezza del frame, NON toccare per ora
      height: "399px",    // Altezza del frame, NON toccare per ora
      background: "#222",
      imageRendering: "pixelated",
      overflow: "hidden",
    }}
  >
    {/* Frame esterno */}
    <img
      src={frame}
      alt="frame"
      style={{
        position: "absolute",
        top: 0,      // Cambia qui per spostare tutto il frame (di solito lascialo 0)
        left: 0,     // Cambia qui per spostare tutto il frame (lascia 0)
        width: "487px",  // Non toccare, è la base!
        height: "399px", // Non toccare
        zIndex: 1,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* Barra sinistra */}
    <img
      src={leftBar}
      alt="left bar"
      style={{
        position: "absolute",
        top: "13px",     // 🔴 CAMBIA QUESTO per spostare SU/GIÙ
        left: "36px",     // 🔴 CAMBIA QUESTO per spostare DESTRA/SINISTRA
        width: "129px",  // Modifica SOLO se vuoi allargare (non consigliato)
        height: "373px", // Modifica SOLO se vuoi stirare (non consigliato)
        zIndex: 2,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* Sfondo centrale */}
    <img
      src={background}
      alt="background"
      style={{
        position: "absolute",
        top: "5px",    // 🔴 CAMBIA QUESTO per SU/GIÙ
        left: "92px",   // 🔴 CAMBIA QUESTO per DX/SX
        width: "383px", // Di solito lasci originale
        height: "380px",// Di solito lasci originale
        zIndex: 3,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* Decorazioni angoli */}
    <img
      src={corners}
      alt="corners"
      style={{
        position: "absolute",
        top: "3px",    // 🔴 CAMBIA QUESTO per SU/GIÙ
        left: "105px",   // 🔴 CAMBIA QUESTO per DX/SX
        width: "355px", // Di solito lasci originale
        height: "385px",// Di solito lasci originale
        zIndex: 4,
        pointerEvents: "none",
      }}
      draggable={false}
    />
  </div>
);

export default DashboardBase;
