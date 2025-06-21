import React from "react";
// Importa il bordo del cerchio (holder) e l’avatar (icon)
import holder0 from "../assets/page-content-sprites/holders/8.png";
import icon0 from "../assets/page-content-sprites/icons/14.png";

const HomeSection = () => (
  <div
    style={{
      position: "relative",
      width: 360,   // Modifica la larghezza totale della sezione
      height: 300,  // Modifica l’altezza totale della sezione
    }}
  >
    {/* Cornice cerchio */}
    <img
      src={holder0}
      alt="holder"
      style={{
        position: "absolute",
        top: 180,    // Modifica la posizione verticale della cornice
        left: 210,   // Modifica la posizione orizzontale della cornice
        width: 125,  // Modifica la dimensione della cornice
        height: 125,
        zIndex: 2,   // Il bordo sopra l’avatar
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* Avatar mascherato in cerchio */}
    <div
      style={{
        position: "absolute",
        top: 190,         // Modifica per allineare verticalmente l’avatar (10px sotto la cornice in questo esempio)
        left: 220,        // Modifica per centrare l’avatar nella cornice
        width: 105,       // Un po’ più piccolo della cornice (125)
        height: 105,
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 1,        // L’avatar sotto il bordo
        background: "", // Sfondo di riempimento (opzionale, come la pagina)
        display: "flex",
        alignItems: "flex-end", // Per far “salire” l’avatar dal basso se vuoi animare
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
          // objectPosition: "bottom", // attiva questa riga se vuoi che il personaggio sia sempre “in piedi” sul bordo basso
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>

    {/* Qui aggiungi altri PNG o testo se vuoi */}
  </div>
);

export default HomeSection;
