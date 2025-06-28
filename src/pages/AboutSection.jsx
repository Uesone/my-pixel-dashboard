import React from "react";
import PageWrapper from "../components/PageWrapper";
import CarouselSkills from "../components/CarouselSkills";

// Assets decorativi
import holder0 from "../assets/page-content-sprites/holders/8.png";
import holderIcon from "../assets/page-content-sprites/holders/6.png";
import linePng from "../assets/page-content-sprites/holders/0.png";
import AvatarAnimato from "../components/animation/AvatarAnimato.jsx";
// Barre XP
import xpBarPng from "../assets/ui/progress-bars/3.png";
import xpBarEmptyPng from "../assets/ui/progress-bars/6.png";

// Icone skills (puoi ordinare come vuoi!)
import icon0 from "../assets/ui/tech-icons/0.png";
import icon1 from "../assets/ui/tech-icons/1.png";
import icon2 from "../assets/ui/tech-icons/2.png";
import icon3 from "../assets/ui/tech-icons/3.png";
import icon4 from "../assets/ui/tech-icons/4.png";
import icon5 from "../assets/ui/tech-icons/5.png";
import icon6 from "../assets/ui/tech-icons/6.png";
import icon7 from "../assets/ui/tech-icons/7.png";
import icon8 from "../assets/ui/tech-icons/8.png";
import icon9 from "../assets/ui/tech-icons/9.png";
import icon10 from "../assets/ui/tech-icons/10.png";
import icon11 from "../assets/ui/tech-icons/11.png";
import icon12 from "../assets/ui/tech-icons/12.png";
import icon13 from "../assets/ui/tech-icons/13.png";
import icon14 from "../assets/ui/tech-icons/14.png";
import icon15 from "../assets/ui/tech-icons/15.png";
import icon16 from "../assets/ui/tech-icons/16.png";
import icon17 from "../assets/ui/tech-icons/17.png";

// --- ARRAY SKILLS CON OFFSET, SIZE E LABEL/TOOLTIP INDIVIDUALI ---
const skillIcons = [
  { src: icon0,   iconSize: 20, offsetX: 0,    offsetY: -1,    label: "JavaScript" },
  { src: icon1,   iconSize: 21, offsetX: 0,    offsetY: 0,     label: "HTML5" },
  { src: icon2,   iconSize: 22, offsetX: 0,    offsetY: 0.5,   label: "CSS3" },
  { src: icon3,   iconSize: 22, offsetX: 0,    offsetY: -1,    label: "SpringBoot" },
  { src: icon4,   iconSize: 25, offsetX: 0,    offsetY: 0,     label: "Dart" },
  { src: icon5,   iconSize: 21, offsetX: 0,    offsetY: -1,    label: "Postman" },
  { src: icon6,   iconSize: 22, offsetX: -0.5, offsetY: -3,    label: "React" },
  { src: icon7,   iconSize: 19, offsetX: 0,    offsetY: -3,    label: "TypeScript" },
  { src: icon8,   iconSize: 22, offsetX: -0.5, offsetY: -1,    label: "Sass" },
  { src: icon9,   iconSize: 21, offsetX: 0.5,  offsetY: -1.5,  label: "Redux" },
  { src: icon10,  iconSize: 21, offsetX: 0.8,  offsetY: -1,    label: "Bootstrap" },
  { src: icon11,  iconSize: 24, offsetX: 1.5,  offsetY: -1,    label: "Vite" },
  { src: icon12,  iconSize: 23, offsetX: 0,    offsetY: -1.5,  label: "Java" },
  { src: icon13,  iconSize: 23, offsetX: 1,    offsetY: 1,     label: "PostgreSQL" },
  { src: icon14,  iconSize: 23, offsetX: -1.5, offsetY: 2,     label: "Flutter" },
  { src: icon15,  iconSize: 24, offsetX: 1.5,  offsetY: 1.5,   label: "Git" },
  { src: icon16,  iconSize: 22, offsetX: 1,    offsetY: 2,     label: "GitHub" },
  { src: icon17,  iconSize: 21, offsetX: -1,   offsetY: -1,    label: "VSCode" },
];

const AboutSection = () => (
  <PageWrapper>
    {/* --- CORNICE TONDA AVATAR --- */}
    <img
      src={holder0}
      alt="holder"
      style={{
        position: "absolute",
        top: 70,
        left: 40,
        width: 80,
        height: 80,
        zIndex: 12,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* --- AVATAR ANIMATO/STATICO --- */}
    <div
      style={{
        position: "absolute",
        top: 78,
        left: 48,
        width: 65,
        height: 65,
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 11,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <AvatarAnimato talking={false} />
    </div>

    {/* --- LINEE DECORATIVE SINISTRE --- */}
    <img
      src={linePng}
      alt="linea1"
      style={{
        position: "absolute",
        top: 20,
        left: 10,
        width: 90,
        height: 70,
        zIndex: 13,
        pointerEvents: "none",
      }}
      draggable={false}
    />
    <img
      src={linePng}
      alt="linea2"
      style={{
        position: "absolute",
        top: 156,
        left: 27,
        width: 35,
        height: 50,
        zIndex: 13,
        opacity: 0.92,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* --- LINEA DECORATIVA DESTRA (specchiata) --- */}
    <img
      src={linePng}
      alt="linea specchiata"
      style={{
        position: "absolute",
        top: 20,
        left: 213,
        width: 90,
        height: 70,
        zIndex: 13,
        pointerEvents: "none",
        transform: "scaleX(-1)",
        transformOrigin: "center center",
      }}
      draggable={false}
    />

    {/* --- TITOLO TESTO ("About") --- */}
    <div
      style={{
        position: "absolute",
        top: 3,
        left: 90,
        fontFamily: "'VT323', monospace",
        fontSize: 52,
        color: "#24170b",
        letterSpacing: 0,
        padding: "3px 16px",
        zIndex: 20,
        textShadow: `
          -2px 2px 0 #e7d7b6,
          2px 2px 0 #e7d7b6,
          2px 4px 2px #7e6643
        `,
      }}
    >
      About
    </div>

    {/* --- NOME/NICKNAME --- */}
    <div
      style={{
        position: "absolute",
        top: 72,
        left: 135,
        fontFamily: "'VT323', monospace",
        fontSize: 16,
        color: "#3a2412",
        zIndex: 30,
        minWidth: 140,
        textAlign: "left",
      }}
    >
      <b>Name:</b> <span style={{ color: "#b89254" }}>Umberto Amoroso</span>
    </div>

    {/* --- LEVEL/AGE --- */}
    <div
      style={{
        position: "absolute",
        top: 98,
        left: 135,
        fontFamily: "'VT323', monospace",
        fontSize: 16,
        color: "#3a2412",
        zIndex: 31,
        minWidth: 85,
        textAlign: "left",
      }}
    >
      <b>Age:</b> <span style={{ color: "#d98e42" }}>33</span>
    </div>

    {/* --- XP BAR (PNG filled + empty + valori) --- */}
    <div
      style={{
        position: "absolute",
        top: 118,
        left: 136,
        fontFamily: "'VT323', monospace",
        fontSize: 16,
        color: "#3a2412",
        zIndex: 32,
        minWidth: 140,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 0,
      }}
    >
      <b>XP:</b>
      <img
        src={xpBarPng}
        alt="XP Progress"
        style={{
          width: 60,
          height: 30,
          marginLeft: 0,
          marginRight: "-3px",
          imageRendering: "pixelated",
          verticalAlign: "middle",
          marginTop: "4px",
        }}
        draggable={false}
      />
      <img
        src={xpBarEmptyPng}
        alt="XP Progress Empty"
        style={{
          width: 30,
          height: 30,
          marginLeft: "-3px",
          imageRendering: "pixelated",
          verticalAlign: "middle",
          marginTop: "4px",
        }}
        draggable={false}
      />
      <span style={{ fontSize: 13, marginLeft: 3, color: "#d98e42" }}>
        (1250/<span style={{ color: "#b89254" }}>2000</span>)
      </span>
    </div>

    {/* --- RUOLO/ROLE --- */}
    <div
      style={{
        position: "absolute",
        top: 146,
        left: 135,
        fontFamily: "'VT323', monospace",
        fontSize: 16,
        color: "#3a2412",
        zIndex: 33,
        minWidth: 145,
        textAlign: "left",
      }}
    >
      <b>Role:</b>
      <span style={{ fontSize: 16, marginLeft: 4, color: "#b89254" }}>
        Full Stack Developer
      </span>
    </div>

    {/* --- SCRITTA "Skills:" --- */}
    <div
      style={{
        position: "absolute",
        top: 165,
        left: 60,
        fontFamily: "'VT323', monospace",
        fontSize: 16,
        color: "#3a2412",
        zIndex: 40,
        textShadow: "0 1px 0 #fff",
        letterSpacing: -0.5,
      }}
    >
      Skills:
    </div>

    {/* --- CAROSELLO SKILLS CON TOOLTIP 8BIT --- */}
    <CarouselSkills
      icons={skillIcons}
      holderIcon={holderIcon}
      holdersPerRow={7}
      holderSize={34}
      iconSize={20}
      gapX={4}
      gapY={8}
      speed={0.1}
      top={186}
      left={26}
      zIndex={60}
    />
  </PageWrapper>
);

export default AboutSection;
