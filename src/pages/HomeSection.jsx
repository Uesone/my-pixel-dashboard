// pages/HomeSection.jsx
import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";

// --- Elementi "storici"/decorativi ---
import holder0 from "../assets/page-content-sprites/holders/8.png";         // Cornice rotonda avatar
import linePng from "../assets/page-content-sprites/holders/0.png";         // Linee decorative
import HomeDialogBox from "../components/animation/HomeDialogBox.jsx";      // Baloon/dialogo
import AvatarAnimato from "../components/animation/AvatarAnimato.jsx";      // Avatar animato

// --- Importa i PNG della PAGE FLIP animazione ---
import PageFlipSprite from "../components/PageFlipSprite";
import frame0 from "../assets/content/page-flip/next-page/0.png";
import frame1 from "../assets/content/page-flip/next-page/1.png";
import frame2 from "../assets/content/page-flip/next-page/2.png";
import frame3 from "../assets/content/page-flip/next-page/3.png";
import frame4 from "../assets/content/page-flip/next-page/4.png";
import frame5 from "../assets/content/page-flip/next-page/5.png";
import frame6 from "../assets/content/page-flip/next-page/6.png";
import frame7 from "../assets/content/page-flip/next-page/7.png";
import frame8 from "../assets/content/page-flip/next-page/8.png";
import frame9 from "../assets/content/page-flip/next-page/9.png";
import frame10 from "../assets/content/page-flip/next-page/10.png";
import frame11 from "../assets/content/page-flip/next-page/11.png";
// ...continua con gli altri frame se vuoi

const HomeSection = () => {
  const [talking, setTalking] = useState(false);   // Stato per animazione bocca

  // --- Mostra PNG uno alla volta (con stato frameIndex) ---
  const [frameIndex, setFrameIndex] = useState(0);

  /*
    --- ARRAY DI OGGETTI FRAME ---
    Ogni oggetto rappresenta un frame (PNG) della page flip con le sue proprietà:
    - src: il PNG
    - left, top: posizione nell'area beige (pixel-perfect)
    - width, height: dimensione PNG
    - zIndex: stacking INTERNO SOLO tra i frame dell'animazione (qui puoi lasciare 1, 2, ecc.)
    👉 Modifico questi valori per ogni PNG, lavorando frame per frame!
    N.B.: I PNG page flip saranno comunque sempre sopra a tutto il resto (vedi blocco più sotto).
  */
  const frames = [
    {
      src: frame0,
      left: 0,      
      top: 0,
      width: 310,
      height: 290,
      zIndex: 1,
    },
    {
      src: frame1,
      left: -179,   
      top: -100,
      width: 550,
      height: 500,
      zIndex: 2,
    },
    { src: frame2,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
    { src: frame3,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
    { src: frame4,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
      { src: frame5,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
          { src: frame6,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
    { src: frame7,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
        { src: frame8,
      left: -203,   
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
            { src: frame9,
      left: -203,  
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },

    { src: frame10,
      left: -203,  
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    },
      { src: frame11,
      left: -203,  
      top: -108,
      width: 620,
      height: 500,
      zIndex: 2,
    }
    
    
    
    
  
    // ...aggiungi altri frame ognuno con props diverse!
  ];

  return (
    // === Wrapper che occupa TUTTA l'area beige (310x290) ===
    <PageWrapper>
      {/* 
        ========== 2. ELEMENTI ORIGINALI (decorazioni, avatar, balloon ecc) ==========
        Tutti questi elementi stanno SOTTO l’animazione page flip (vedi blocco in fondo).
        Puoi tenerli, toglierli o modificarli a piacere.
        Regola zIndex per decidere chi sta sopra/sotto rispetto ad altri statici, 
        ma NON rispetto alla page flip che ha zIndex 999 (massimo nella scena).
      */}

      {/* --- CORNICE TONDA AVATAR --- */}
      <img
        src={holder0}
        alt="holder"
        style={{
          position: "absolute",
          top: 90,
          left: 10,
          width: 100,
          height: 100,
          zIndex: 12, // Solo tra elementi statici
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* --- AVATAR ANIMATO --- */}
      <div
        style={{
          position: "absolute",
          top: 103,
          left: 22,
          width: 78,
          height: 76,
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 11, // Solo tra elementi statici
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <AvatarAnimato talking={talking} />
      </div>

      {/* --- LINEA DECORATIVA SINISTRA --- */}
      <img
        src={linePng}
        alt="linea"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 90,
          height: 70,
          zIndex: 13, // Solo tra elementi statici
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* --- LINEA DECORATIVA DESTRA --- */}
      <img
        src={linePng}
        alt="linea specchiata"
        style={{
          position: "absolute",
          top: 20,
          left: 200,
          width: 90,
          height: 70,
          zIndex: 13, // Solo tra elementi statici
          pointerEvents: "none",
          transform: "scaleX(-1)",
          transformOrigin: "center center",
        }}
        draggable={false}
      />

      {/* --- TITOLO TESTO ("Home") --- */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 98,
          fontFamily: "'VT323', monospace",
          fontSize: 52,
          color: "#24170b",
          letterSpacing: 0,
          padding: "3px 16px",
          zIndex: 20, // Solo tra elementi statici
          textShadow: `
            -2px 2px 0 #e7d7b6,  
            2px 2px 0 #e7d7b6,    
            2px 4px 2px #7e6643
          `,
        }}
      >
        Home
      </div>

      {/* --- BALLOON / DIALOG BOX --- */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 100,
          width: 180,
          height: 80,
          zIndex: 21, // Solo tra elementi statici
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
          letterSpacing={0}
          fontWeight="400"
          color="#f5ecd7"
          onTalkingChange={setTalking}
        />
      </div>

      {/* === CONTROLLI PER SCORRERE I FRAME (puoi toglierli quando hai finito!) === */}
      <div style={{ position: "absolute", bottom: 10, left: 10, zIndex: 50 }}>
        <button onClick={() => setFrameIndex((i) => (i > 0 ? i - 1 : frames.length - 1))}>{"<"}</button>
        <span style={{ margin: "0 8px" }}>Frame: {frameIndex}</span>
        <button onClick={() => setFrameIndex((i) => (i < frames.length - 1 ? i + 1 : 0))}>{">"}</button>
      </div>

      {/* 
        ========== 1. AREA PAGE FLIP (SOPRA TUTTO) ==========
        Blocca TUTTI i PNG dell’animazione sopra qualsiasi altro elemento.
        - Questo div è l’ULTIMO della gerarchia JSX
        - Ha zIndex: 999, quindi copre sempre tutto il resto nella zona beige
        - pointerEvents: "none" così non blocca i click sulle UI sotto (rimetti "auto" se vuoi che l’animazione blocchi il resto)
      */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 310,
          height: 290,
          zIndex: 999, // MASSIMO nella zona beige!
          pointerEvents: "none",
        }}
      >
        <PageFlipSprite {...frames[frameIndex]} />
        {/* ESEMPIO: per overlay multipli (decommenta se vuoi vedere più frame sovrapposti)
            {frames.map((props, i) => <PageFlipSprite key={i} {...props} />)}
        */}
      </div>
    </PageWrapper>
  );
};

export default HomeSection;
