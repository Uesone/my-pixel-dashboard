// src/pages/AboutSection.jsx
import React from "react";
import PageWrapper from "../components/PageWrapper";
import CarouselSkills from "../components/CarouselSkills";
import { useLanguage } from "../components/LanguageContext.jsx";

// === Import immagini decorative (ottimizza a WebP dove puoi) ===
import holder0 from "../assets/page-content-sprites/holders/8.png";
import holderIcon from "../assets/page-content-sprites/holders/6.png";
import linePng from "../assets/page-content-sprites/holders/0.png";
import AvatarAnimato from "../components/animation/AvatarAnimato.jsx";
import xpBarPng from "../assets/ui/progress-bars/3.png";
import xpBarEmptyPng from "../assets/ui/progress-bars/6.png";

// === Import icone skill 64x64 (BASE) ===
import icon0_64 from "../assets/ui/tech-icons/0-64.webp";
import icon1_64 from "../assets/ui/tech-icons/1-64.webp";
import icon2_64 from "../assets/ui/tech-icons/2-64.webp";
import icon3_64 from "../assets/ui/tech-icons/3-64.webp";
import icon4_64 from "../assets/ui/tech-icons/4-64.webp";
import icon5_64 from "../assets/ui/tech-icons/5-64.webp";
import icon6_64 from "../assets/ui/tech-icons/6-64.webp";
import icon7_64 from "../assets/ui/tech-icons/7-64.webp";
import icon8_64 from "../assets/ui/tech-icons/8-64.webp";
import icon9_64 from "../assets/ui/tech-icons/9-64.webp";
import icon10_64 from "../assets/ui/tech-icons/10-64.webp";
import icon11_64 from "../assets/ui/tech-icons/11-64.webp";
import icon12_64 from "../assets/ui/tech-icons/12-64.webp";
import icon13_64 from "../assets/ui/tech-icons/13-64.webp";
import icon14_64 from "../assets/ui/tech-icons/14-64.webp";
import icon15_64 from "../assets/ui/tech-icons/15-64.webp";
import icon16_64 from "../assets/ui/tech-icons/16-64.webp";
import icon17_64 from "../assets/ui/tech-icons/17-64.webp";

// === Array delle skill icon (solo 64x64) ===
const skillIcons = [
  { src: icon0_64,  iconSize: 22, offsetX: 0,    offsetY: -1 },
  { src: icon1_64,  iconSize: 22, offsetX: 0,    offsetY: 0 },
  { src: icon2_64,  iconSize: 22, offsetX: 0,    offsetY: 0.5 },
  { src: icon3_64,  iconSize: 22, offsetX: 0,    offsetY: -1 },
  { src: icon4_64,  iconSize: 24, offsetX: 0,    offsetY: 0 },
  { src: icon5_64,  iconSize: 22, offsetX: 0,    offsetY: -1 },
  { src: icon6_64,  iconSize: 22, offsetX: -0.5, offsetY: -3 },
  { src: icon7_64,  iconSize: 20, offsetX: 0,    offsetY: -3 },
  { src: icon8_64,  iconSize: 22, offsetX: -0.5, offsetY: -1 },
  { src: icon9_64,  iconSize: 22, offsetX: 0,    offsetY: -1.5 },
  { src: icon10_64, iconSize: 22, offsetX: 0.8,  offsetY: -1 },
  { src: icon11_64, iconSize: 22, offsetX: 1.5,  offsetY: -1 },
  { src: icon12_64, iconSize: 22, offsetX: 0,    offsetY: -1.5 },
  { src: icon13_64, iconSize: 22, offsetX: 1,    offsetY: 1 },
  { src: icon14_64, iconSize: 22, offsetX: -1.5, offsetY: 2 },
  { src: icon15_64, iconSize: 22, offsetX: 1.5,  offsetY: 1.5 },
  { src: icon16_64, iconSize: 22, offsetX: 0.8,  offsetY: 1 },
  { src: icon17_64, iconSize: 22, offsetX: -1,   offsetY: -1 },
];

const WRAPPER_WIDTH = 350;   // Ottimale per anti-CLS, aumenta se serve!
const WRAPPER_HEIGHT = 340;  // Deve contenere tutto il contenuto (anche tooltip fuori!)

const AboutSection = () => {
  const { t } = useLanguage();
  const skillLabels = t("about.skills");

  // Skill icon con label localizzata
  const localizedSkillIcons = skillIcons.map((icon, i) => ({
    ...icon,
    label: skillLabels[i] || "",
  }));

  return (
    <PageWrapper>
      {/* ========== CONTAINER ANTI-CLS ========== */}
      <div
        style={{
          position: "relative",
          width: WRAPPER_WIDTH,
          height: WRAPPER_HEIGHT,
          minWidth: WRAPPER_WIDTH,
          minHeight: WRAPPER_HEIGHT,
          margin: "0 auto",
          overflow: "visible", // Attenzione: lasciare 'visible' per tooltip/carosello!
        }}
      >
        {/* --- AVATAR FRAME (con LCP fix) --- */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 25,
            width: 100,
            height: 100,
            zIndex: 12,
            pointerEvents: "none",
            overflow: "hidden", // Blocca overflow e previene shift
          }}
        >
          <img
            src={holder0}
            alt="Avatar frame"
            width={100}
            height={100}
            style={{
              imageRendering: "pixelated",
              width: "100%",
              height: "100%",
              display: "block",
            }}
            draggable={false}
            loading="eager"        // LCP!
            fetchPriority="high"   // LCP!
            decoding="async"
          />
        </div>

        {/* --- AVATAR ANIMATO --- */}
        <div style={{
          position: "absolute", top: 80, left: 35, width: 80, height: 80,
          borderRadius: "50%", overflow: "hidden", zIndex: 11,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
        }}>
          <AvatarAnimato talking={false} />
        </div>

{/* --- DECORAZIONI PIXEL ART --- */}
<img src={linePng} alt="left deco line"
  width={90} height={70}
  style={{
    position: "absolute", top: 15, left: 10,
    zIndex: 13, pointerEvents: "none", imageRendering: "pixelated"
  }} draggable={false} loading="eager" /> {/* PATCH: eager! */}
<img src={linePng} alt="left bottom deco"
  width={35} height={50}
  style={{
    position: "absolute", top: 163, left: 27,
    zIndex: 13, opacity: 0.92, pointerEvents: "none", imageRendering: "pixelated"
  }} draggable={false} loading="eager" /> {/* PATCH: eager! */}
<img src={linePng} alt="right deco line"
  width={90} height={70}
  style={{
    position: "absolute", top: 15, left: 213,
    zIndex: 13, pointerEvents: "none",
    transform: "scaleX(-1)", transformOrigin: "center center",
    imageRendering: "pixelated"
  }} draggable={false} loading="eager" /> {/* PATCH: eager! */}


        {/* --- TITOLO --- */}
<div style={{
  position: "absolute", 
  top: 20, 
  left: 90,
  fontFamily: "'Pixel Operator', 'VT323', monospace",
  fontSize: 52, 
  color: "#24170b", 
  letterSpacing: 0, 
  padding: "3px 16px",
  zIndex: 20, 
  textShadow: `-2px 2px 0 #e7d7b6, 2px 2px 0 #e7d7b6, 2px 4px 2px #7e6643`,
  userSelect: "none",
  whiteSpace: "nowrap",
  height: "68px",           // PATCH: spazio fisso anche durante font swap!
  lineHeight: "1",
  overflow: "hidden",
  boxSizing: "border-box"
}}>
  {t("about.title")}
</div>

        {/* --- INFO PROFILO --- */}
        <div style={{
          position: "absolute", top: 72, left: 135,
          fontFamily: "'Pixel Operator', 'VT323', monospace",
          fontSize: 16, color: "#3a2412", zIndex: 30, minWidth: 140, textAlign: "left",
        }}>
          <b>{t("about.name_label")}</b> <span style={{ color: "#b89254" }}>{t("about.name_value")}</span>
        </div>
        <div style={{
          position: "absolute", top: 98, left: 135,
          fontFamily: "'Pixel Operator', 'VT323', monospace",
          fontSize: 16, color: "#3a2412", zIndex: 31, minWidth: 85, textAlign: "left",
        }}>
          <b>{t("about.age_label")}</b> <span style={{ color: "#b89254" }}>{t("about.age_value")}</span>
        </div>
<div style={{
  position: "absolute",
  top: 115,
  left: 136,
  width: 180,
  height: 38,
  fontFamily: "'Pixel Operator', 'VT323', monospace",
  fontSize: 16,
  color: "#3a2412",
  zIndex: 32,
  textAlign: "left",
  boxSizing: "border-box",
}}>
  {/* Label */}
  <span style={{
    position: "absolute",
    top: 0,
    left: 0,
    fontWeight: "bold",
    height: 38,
    lineHeight: "38px",
    pointerEvents: "none",
  }}>
    {t("about.xp_label")}
  </span>
  {/* XP Bar Full */}
  <span style={{
    position: "absolute",
    top: 6,          // cambia come vuoi
    left: 20,        // cambia come vuoi
    width: 60,
    height: 30,
    display: "inline-block",
  }}>
    <img
      src={xpBarPng}
      alt="XP Progress"
      width={60}
      height={30}
      style={{
        imageRendering: "pixelated",
        width: "100%",
        height: "100%",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />
  </span>
  {/* XP Bar Empty */}
  <span style={{
    position: "absolute",
    top: 6,           // cambia come vuoi
    left:75,        // cambia come vuoi
    width: 30,
    height: 30,
    display: "inline-block",
  }}>
    <img
      src={xpBarEmptyPng}
      alt="XP Progress Empty"
      width={30}
      height={30}
      style={{
        imageRendering: "pixelated",
        width: "100%",
        height: "100%",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />
  </span>
  {/* XP Text */}
  <span style={{
    position: "absolute",
    top: 10,           // cambia come vuoi
    left: 107,         // cambia come vuoi
    fontSize: 13,
    color: "#d98e42",
    fontFamily: "'Pixel Operator', 'VT323', monospace",
  }}>
    (1250/<span style={{ color: "#b89254" }}>2000</span>)
  </span>
</div>


        <div style={{
          position: "absolute", top: 146, left: 135,
          fontFamily: "'Pixel Operator', 'VT323', monospace",
          fontSize: 16, color: "#3a2412", zIndex: 33, minWidth: 145, textAlign: "left",
        }}>
          <b>{t("about.role_label")}</b>
          <span style={{ fontSize: 15, marginLeft: 4, color: "#b89254" }}>{t("about.role_value")}</span>
        </div>
        <div style={{
          position: "absolute", top: 165, left: 60,
          fontFamily: "'Pixel Operator', 'VT323', monospace",
          fontSize: 16, color: "#3a2412", zIndex: 40, textShadow: "0 1px 0 #fff", letterSpacing: -0.5,
        }}>
          {t("about.skills_label")}
        </div>

        {/* --- CAROSELLO SKILL ICONS + TOOLTIP 8bit --- */}
        <CarouselSkills
          icons={localizedSkillIcons}
          holderIcon={holderIcon}
          holdersPerRow={7}
          holderSize={34}
          iconSize={28}
          gapX={4}
          gapY={8}
          speed={0.1}
          top={198}
          left={26}
          zIndex={60}
          fontFamily={"'Pixel Operator', monospace"}
          tooltipPositionFn={(e, icon) => {
            const rect = e.currentTarget.getBoundingClientRect();
            return {
              x: rect.left + rect.width / 2,
              y: rect.bottom + -5
            };
          }}
          // Patch: Icone pixelate responsive
          renderIcon={({ src, label, iconSize, ...rest }) => (
            <img
              src={src}
              width={iconSize}
              height={iconSize}
              alt={label}
              style={{
                imageRendering: "pixelated",
                display: "block",
              }}
              decoding="async"
              loading="eager"
              draggable={false}
              {...rest}
            />
          )}
        />
      </div>
    </PageWrapper>
  );
};

export default AboutSection;
