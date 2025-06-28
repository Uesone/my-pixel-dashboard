import React from "react";
import linePng from "../assets/page-content-sprites/holders/0.png"; // Linee decorative

const LINE_LEFT_TOP = 20;
const LINE_LEFT_LEFT = 13;
const LINE_LEFT_WIDTH = 60;
const LINE_LEFT_HEIGHT = 70;

const LINE_RIGHT_TOP = 20;
const LINE_RIGHT_LEFT = 242;
const LINE_RIGHT_WIDTH = 60;
const LINE_RIGHT_HEIGHT = 70;

const TITLE_TOP = 4;
const TITLE_LEFT = 60;
const TITLE_FONT_SIZE = 52;

const ContactsSection = () => (
  <div style={{
    width: "100%",
    height: "100%",
    minHeight: 340,
    minWidth: 360,
    background: "none",
    position: "relative", // IMPORTANTE per posizionare tutto pixel-perfect
    color: "#fff",
    fontFamily: "'VT323', monospace",
    overflow: "visible"
  }}>
    {/* --- LINEA DECORATIVA SINISTRA --- */}
    <img
      src={linePng}
      alt="decorative line left"
      style={{
        position: "absolute",
        top: LINE_LEFT_TOP,
        left: LINE_LEFT_LEFT,
        width: LINE_LEFT_WIDTH,
        height: LINE_LEFT_HEIGHT,
        zIndex: 13,
        pointerEvents: "none",
      }}
      draggable={false}
    />

    {/* --- LINEA DECORATIVA DESTRA (specchiata) --- */}
    <img
      src={linePng}
      alt="decorative line right"
      style={{
        position: "absolute",
        top: LINE_RIGHT_TOP,
        left: LINE_RIGHT_LEFT,
        width: LINE_RIGHT_WIDTH,
        height: LINE_RIGHT_HEIGHT,
        zIndex: 13,
        pointerEvents: "none",
        transform: "scaleX(-1)",
        transformOrigin: "center center",
      }}
      draggable={false}
    />

    {/* --- TITOLO "Contacts" --- */}
    <div
      style={{
        position: "absolute",
        top: TITLE_TOP,
        left: TITLE_LEFT,
        fontFamily: "'VT323', monospace",
        fontSize: TITLE_FONT_SIZE,
        color: "#24170b",
        letterSpacing: 0,
        padding: "3px 16px",
        zIndex: 20,
        textShadow: `
          -2px 2px 0 #e7d7b6,  
          2px 2px 0 #e7d7b6,    
          2px 4px 2px #7e6643
        `,
        userSelect: "none"
      }}
    >
      Contacts
    </div>

    {/* --- QUI AGGIUNGEREMO LA UI CONTATTI, SOCIAL, ECC --- */}
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 1
    }}>
      {/* --- CONTATTI PLACEHOLDER/CONTENT --- */}
      <div style={{
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        opacity: 0.33,
        letterSpacing: 1
      }}>
        CONTACTS PLACEHOLDER
      </div>
    </div>
  </div>
);

export default ContactsSection;
