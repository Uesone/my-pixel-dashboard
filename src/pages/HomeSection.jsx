// pages/HomeSection.jsx
import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import holder0 from "../assets/page-content-sprites/holders/8.png";         // Cornice rotonda avatar
import linePng from "../assets/page-content-sprites/holders/0.png";         // Linee decorative
import HomeDialogBox from "../components/animation/HomeDialogBox.jsx";      // Baloon/dialogo
import AvatarAnimato from "../components/animation/AvatarAnimato.jsx";      // Avatar animato

const HomeSection = () => {
  const [talking, setTalking] = useState(false);   // Stato per animazione bocca

  return (
    // Wrapper che occupa TUTTA l'area beige (310x290) e serve da canvas per posizionare tutto!
    <PageWrapper>
      {/* 
        --- CORNICE TONDA AVATAR ---
        PNG circolare sopra cui metti l'avatar (vedi sotto)
        - top/left: posizione nell'area beige
        - width/height: dimensione della cornice
      */}
      <img
        src={holder0}
        alt="holder"
        style={{
          position: "absolute",
          top: 90,    // ↓ più alto o basso
          left: 10,   // → più a sinistra o destra
          width: 100,  // larghezza della cornice
          height: 100, // altezza della cornice
          zIndex: 2,   // sopra l'avatar animato
          pointerEvents: "none", // così non la selezioni mai col mouse
        }}
        draggable={false}
      />

      {/*
        --- AVATAR ANIMATO ---
        Sprite o animazione dentro la cornice tonda.
        - top/left: posizione (fallo combaciare alla cornice)
        - width/height: grandezza avatar (meglio leggermente più piccolo della cornice)
        - borderRadius: "50%" lo rende circolare
      */}
      <div
        style={{
          position: "absolute",
          top: 103,    // ↓ posizione verticale (regola per centrare bene)
          left: 22,   // → posizione orizzontale (regola per centrare bene)
          width: 78,   // larghezza avatar (deve stare dentro la cornice)
          height: 76,  // altezza avatar
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 1,   // sotto la cornice
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <AvatarAnimato talking={talking} />
      </div>

      {/*
        --- LINEA DECORATIVA SINISTRA ---
        PNG "curva" decorativa.
        - top/left: posizione nell'area beige
        - width/height: dimensione linea
      */}
      <img
        src={linePng}
        alt="linea"
        style={{
          position: "absolute",
          top: 20,     // ↓ distanza dal top
          left: 20,   // → distanza da sinistra
          width: 90,   // larghezza
          height: 70,  // altezza
          zIndex: 3,   // sopra avatar/cornice
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/*
        --- LINEA DECORATIVA DESTRA ---
        Stessa PNG, specchiata orizzontalmente
        - Cambia solo left/top per posizionarla dall'altro lato
      */}
      <img
        src={linePng}
        alt="linea specchiata"
        style={{
          position: "absolute",
          top: 20,
          left: 200,  // → più a destra rispetto alla precedente
          width: 90,
          height: 70,
          zIndex: 3,
          pointerEvents: "none",
          transform: "scaleX(-1)",          // specchiata orizzontale
          transformOrigin: "center center", // riflessa dal centro
        }}
        draggable={false}
      />

      {/*
        --- TITOLO TESTO ("Home") ---
        Testo grande, pixel font, con ombra.
        - top/left: posizione del titolo
        - fontSize: dimensione del titolo
        - color: colore testo
        - textShadow: effetto ombra/pixel outline
      */}
      <div
        style={{
          position: "absolute",
          top: 0,         // ↓ distanza dall'alto (0 = bordo superiore area beige)
          left: 98,      // → distanza da sinistra
          fontFamily: "'VT323', monospace", // pixel font
          fontSize: 52,   // dimensione testo
          color: "#24170b",
          letterSpacing: 0,
          padding: "3px 16px",
          zIndex: 10,     // sempre davanti
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
        }}
      >
        Home
      </div>

      {/*
        --- BALLOON / DIALOG BOX ---
        Box/nuvoletta per dialogo/benvenuto animato
        - top/left: posizione del balloon
        - width/height: dimensione box balloon
        - I parametri passati a HomeDialogBox controllano
          - balloonWidth, balloonHeight: dimensione balloon interna
          - fontSize, textTop, textLeft...: posizionamento del testo dentro il balloon
        - onTalkingChange: callback per animare avatar quando parla
      */}
      <div
        style={{
          position: "absolute",
          top: 20,     // ↓ posizione verticale del balloon
          left: 100,    // → posizione orizzontale
          width: 180,  // larghezza balloon
          height: 80,  // altezza balloon
          zIndex: 20,
          pointerEvents: "auto"
        }}
      >
        <HomeDialogBox
  balloonWidth={210}
  balloonHeight={255}
  fontSize={15}
  textTop={115}
  textLeft={30}
  textWidth={150}
  textHeight={20}
  arrowPrevTop={180}
  arrowPrevLeft={8}
  arrowNextTop={183}
  arrowNextLeft={160}
  letterSpacing={0}    // 👈 aggiunto!
  fontWeight="400"    // 👈 aggiunto!
  color="#f5ecd7"      // 👈 aggiunto!
  onTalkingChange={setTalking}
        />
      </div>
    </PageWrapper>
  );
};

export default HomeSection;
