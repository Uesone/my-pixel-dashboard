import React from "react";
// Importa i tuoi asset PNG (avatar, holder, ecc)
import holder0 from "../assets/page-content-sprites/holders/8.png";
import icon0 from "../assets/page-content-sprites/icons/14.png";
import linePng from "../assets/page-content-sprites/holders/0.png";
import balloonPng from "../assets/ui/dialog/steampunk_dialogbox.png"; // AGGIUNGI QUESTO

const HomeSection = () => (
  <div
    style={{
      position: "relative", // Permette ai figli assoluti di essere posizionati qui
      width: 360,           // Larghezza area utile (cambiala se vuoi)
      height: 300,          // Altezza area utile (cambiala se vuoi)
      // background: "#ffe", // Debug: mostra area HomeSection
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

    {/* Avatar dentro il cerchio */}
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
      <img
        src={icon0}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
        draggable={false}
      />
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

    {/* Testo con font PixelOperator */}
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

    {/* === BALLOON PNG con overlay testo === */}
    <div
      style={{
        position: "absolute",
        top: 92,      // Cambia a piacere
        left: 320,     // Cambia a piacere
        width: 290,   // Balloon PNG 250px
        height: 300,   // Balloon PNG 90px
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
      {/* Overlay testo centrato */}
      <div
        style={{
          position: "absolute",
          top: 124,         // Cambia per centrare verticalmente
          left: 38,        // Cambia per centrare orizzontalmente
          width: 215,      // (250 - padding x2)
          height: 40,
          fontFamily: "'VT323', monospace",
          fontSize: 22,
          whiteSpace: "pre-line",
          pointerEvents: "none",
          textAlign: "center", // Centra il testo
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Ciao! Benvenuto nel mio sito portfolio.
      </div>
    </div>

    {/* === AGGIUNGI ALTRI PNG QUI COME VUOI! === */}
  </div>
);

export default HomeSection;
