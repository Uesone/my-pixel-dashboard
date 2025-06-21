import React from "react";
// Importa i tuoi asset PNG (avatar, holder, ecc)
import holder0 from "../assets/page-content-sprites/holders/8.png";
import icon0 from "../assets/page-content-sprites/icons/14.png";

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
