import React from "react";
// Importa i tuoi asset PNG (avatar, holder, ecc)
import holder0 from "../assets/page-content-sprites/holders/8.png";
import icon0 from "../assets/page-content-sprites/icons/14.png";
import linePng from "../assets/page-content-sprites/holders/0.png";

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
        top: 180,      // ▼ Cambia Y rispetto a HomeSection
        left: 210,     // ▶ Cambia X rispetto a HomeSection
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
        top: 190,      // ▼ Cambia Y (10px sotto la cornice)
        left: 220,     // ▶ Cambia X
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
        top: 50,      // ▼ Cambia Y
        left: 200,     // ▶ Cambia X
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
    transform: "scaleX(-1)", // SPECCHIATURA ORIZZONTALE
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
    fontSize:72,
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

    {/* === AGGIUNGI ALTRI PNG QUI COME VUOI! === */}
    {/* Esempio altro PNG:
    <img
      src={tuoAltroPng}
      style={{
        position: "absolute",
        top: 30,
        left: 40,
        width: 80,
        height: 80,
        zIndex: 5,
      }}
      draggable={false}
    />
    */}

    {/* === TESTO LIBERO, SE VUOI === */}
    {/* 
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 30,
        color: "#333",
        fontSize: 18,
        zIndex: 10,
      }}
    >
      Benvenuto sulla mia Dashboard!
    </div>
    */}
  </div>
);

export default HomeSection;
