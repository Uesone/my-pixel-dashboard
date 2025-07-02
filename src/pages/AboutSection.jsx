import React from "react";
import PageWrapper from "../components/PageWrapper";
import CarouselSkills from "../components/CarouselSkills";
import { useLanguage } from "../components/LanguageContext.jsx"; // <-- path corretto (di solito src/LanguageContext)

import holder0 from "../assets/page-content-sprites/holders/8.png";
import holderIcon from "../assets/page-content-sprites/holders/6.png";
import linePng from "../assets/page-content-sprites/holders/0.png";
import AvatarAnimato from "../components/animation/AvatarAnimato.jsx";
import xpBarPng from "../assets/ui/progress-bars/3.png";
import xpBarEmptyPng from "../assets/ui/progress-bars/6.png";
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

// skillIcons statico (le label sono nei JSON e sostituite sotto!)
const skillIcons = [
  { src: icon0,   iconSize: 20, offsetX: 0,    offsetY: -1 },
  { src: icon1,   iconSize: 21, offsetX: 0,    offsetY: 0 },
  { src: icon2,   iconSize: 22, offsetX: 0,    offsetY: 0.5 },
  { src: icon3,   iconSize: 22, offsetX: 0,    offsetY: -1 },
  { src: icon4,   iconSize: 25, offsetX: 0,    offsetY: 0 },
  { src: icon5,   iconSize: 21, offsetX: 0,    offsetY: -1 },
  { src: icon6,   iconSize: 22, offsetX: -0.5, offsetY: -3 },
  { src: icon7,   iconSize: 19, offsetX: 0,    offsetY: -3 },
  { src: icon8,   iconSize: 22, offsetX: -0.5, offsetY: -1 },
  { src: icon9,   iconSize: 21, offsetX: 0.5,  offsetY: -1.5 },
  { src: icon10,  iconSize: 21, offsetX: 0.8,  offsetY: -1 },
  { src: icon11,  iconSize: 24, offsetX: 1.5,  offsetY: -1 },
  { src: icon12,  iconSize: 23, offsetX: 0,    offsetY: -1.5 },
  { src: icon13,  iconSize: 23, offsetX: 1,    offsetY: 1 },
  { src: icon14,  iconSize: 23, offsetX: -1.5, offsetY: 2 },
  { src: icon15,  iconSize: 24, offsetX: 1.5,  offsetY: 1.5 },
  { src: icon16,  iconSize: 22, offsetX: 1,    offsetY: 2 },
  { src: icon17,  iconSize: 21, offsetX: -1,   offsetY: -1 },
];

const AboutSection = () => {
  const { t } = useLanguage();
  const skillLabels = t("about.skills");

  // Unisci le icone con le label della lingua corrente
  const localizedSkillIcons = skillIcons.map((icon, i) => ({
    ...icon,
    label: skillLabels[i] || "",
  }));

  return (
    <PageWrapper>
      {/* --- CORNICE TONDA AVATAR --- */}
      <img src={holder0} alt="holder"
        style={{
          position: "absolute", top: 70, left: 25, width: 100, height: 100,
          zIndex: 12, pointerEvents: "none",
        }} draggable={false} />

      {/* --- AVATAR ANIMATO/STATICO --- */}
      <div style={{
        position: "absolute", top: 80, left: 35, width: 80, height: 80,
        borderRadius: "50%", overflow: "hidden", zIndex: 11,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}>
        <AvatarAnimato talking={false} />
      </div>

      {/* --- LINEE DECORATIVE SINISTRE --- */}
      <img src={linePng} alt="linea1"
        style={{
          position: "absolute", top: 20, left: 10, width: 90, height: 70,
          zIndex: 13, pointerEvents: "none",
        }} draggable={false} />
      <img src={linePng} alt="linea2"
        style={{
          position: "absolute", top: 156, left: 27, width: 35, height: 50,
          zIndex: 13, opacity: 0.92, pointerEvents: "none",
        }} draggable={false} />
      {/* --- LINEA DECORATIVA DESTRA (specchiata) --- */}
      <img src={linePng} alt="linea specchiata"
        style={{
          position: "absolute", top: 20, left: 213, width: 90, height: 70,
          zIndex: 13, pointerEvents: "none", transform: "scaleX(-1)", transformOrigin: "center center",
        }} draggable={false} />

      {/* --- TITOLO TESTO ("About") --- */}
      <div style={{
        position: "absolute", top: 3, left: 90,
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        fontSize: 52, color: "#24170b", letterSpacing: 0, padding: "3px 16px",
        zIndex: 20, textShadow: `-2px 2px 0 #e7d7b6, 2px 2px 0 #e7d7b6, 2px 4px 2px #7e6643`
      }}>
        {t("about.title")}
      </div>

      {/* --- NOME/NICKNAME --- */}
      <div style={{
        position: "absolute", top: 72, left: 135,
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        fontSize: 16, color: "#3a2412", zIndex: 30, minWidth: 140, textAlign: "left",
      }}>
        <b>{t("about.name_label")}</b> <span style={{ color: "#b89254" }}>{t("about.name_value")}</span>
      </div>

      {/* --- LEVEL/AGE --- */}
      <div style={{
        position: "absolute", top: 98, left: 135,
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        fontSize: 16, color: "#3a2412", zIndex: 31, minWidth: 85, textAlign: "left",
      }}>
        <b>{t("about.age_label")}</b> <span style={{ color: "#b89254" }}>{t("about.age_value")}</span>
      </div>

      {/* --- XP BAR (PNG filled + empty + valori) --- */}
      <div style={{
        position: "absolute", top: 118, left: 136,
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        fontSize: 16, color: "#3a2412", zIndex: 32, minWidth: 140, textAlign: "left",
        display: "flex", alignItems: "center", gap: 0,
      }}>
        <b>{t("about.xp_label")}</b>
        <img src={xpBarPng} alt="XP Progress"
          style={{
            width: 60, height: 30, marginLeft: 0, marginRight: "-3px",
            imageRendering: "pixelated", verticalAlign: "middle", marginTop: "4px",
          }} draggable={false} />
        <img src={xpBarEmptyPng} alt="XP Progress Empty"
          style={{
            width: 30, height: 30, marginLeft: "-3px", imageRendering: "pixelated",
            verticalAlign: "middle", marginTop: "4px",
          }} draggable={false} />
        <span style={{
          fontFamily: "'Pixel Operator', 'VT323', monospace",
          fontSize: 13, marginLeft: 3, color: "#d98e42"
        }}>
          (1250/<span style={{ color: "#b89254" }}>2000</span>)
        </span>
      </div>

      {/* --- RUOLO/ROLE --- */}
      <div style={{
        position: "absolute", top: 146, left: 135,
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        fontSize: 16, color: "#3a2412", zIndex: 33, minWidth: 145, textAlign: "left",
      }}>
        <b>{t("about.role_label")}</b>
        <span style={{ fontSize: 15, marginLeft: 4, color: "#b89254" }}>{t("about.role_value")}</span>
      </div>

      {/* --- SCRITTA "Skills:" --- */}
      <div style={{
        position: "absolute", top: 165, left: 60,
        fontFamily: "'Pixel Operator', 'VT323', monospace",
        fontSize: 16, color: "#3a2412", zIndex: 40, textShadow: "0 1px 0 #fff", letterSpacing: -0.5,
      }}>
        {t("about.skills_label")}
      </div>

      {/* --- CAROSELLO SKILLS CON TOOLTIP 8BIT --- */}
      <CarouselSkills
        icons={localizedSkillIcons}
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
        fontFamily={"'Pixel Operator', monospace"} // <- per sicurezza lo passi anche qui
      />
    </PageWrapper>
  );
};

export default AboutSection;
