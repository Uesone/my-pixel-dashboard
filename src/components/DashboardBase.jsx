// src/components/DashboardBase.jsx
import React, { forwardRef } from "react";

// === ASSET IMPORTS ===
import frame from "../assets/pixel-map-sprites/base/3.png";
import background from "../assets/pixel-map-sprites/base/0.png";
import corners from "../assets/pixel-map-sprites/base/1.png";
import leftBar from "../assets/pixel-map-sprites/base/2.png";
import powerHubTube from "../assets/pixel-map-sprites/power-hub/1.png";
import powerHubGlow from "../assets/pixel-map-sprites/power-hub/2.png";
import powerHubBox from "../assets/pixel-map-sprites/power-hub/3.png";
import PowerHubLights from "./PowerHubLights";
import pageRollPng from "../assets/content/page-flip/next-page/11.png";
import Compass from "./Compass";
import ClockAnimated from "./ClockAnimated";

// === COSTANTI DASHBOARD ===
const DASHBOARD_WIDTH = 487;
const DASHBOARD_HEIGHT = 399;

/**
 * DashboardBase
 * - Ghost div riserva sempre spazio per il buco dell'overlay (NO CLS)
 * - Tutto il layout pixel-perfect
 */
const DashboardBase = forwardRef(({
  scale = 1.4,
  children,
  showPageRoll = false,
  pageFlipOverlay = null,
  isFlipping = false,
  PowerHubProps = {},
  // Overlay hole config (arrivano già SCALATE da App.jsx!)
  holeTop = 403,
  holeLeft = 810,
  holeWidth = 61,
  holeHeight = 140
}, ref) => (
  <div
    className="dashboard-base"
    ref={ref}
    style={{
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      display: "inline-block",
      position: "relative",
      width: DASHBOARD_WIDTH,
      height: DASHBOARD_HEIGHT,
      minWidth: DASHBOARD_WIDTH,
      minHeight: DASHBOARD_HEIGHT,
      maxWidth: DASHBOARD_WIDTH,
      maxHeight: DASHBOARD_HEIGHT,
      overflow: "hidden"
    }}
  >
    {/* ==== GHOST DIV: RISERVA SPAZIO BUCO OVERLAY (CLS = 0) ==== */}
    <div
      id="dashboard-hole-placeholder"
      style={{
        position: "absolute",
        top: holeTop,
        left: holeLeft,
        width: holeWidth,
        height: holeHeight,
        opacity: 0,
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none"
      }}
      aria-hidden="true"
    />

    {/* ==== Foglio arrotolato sopra ==== */}
    {showPageRoll && (
      <img
        src={pageRollPng}
        alt="Foglio arrotolato in alto"
        width={650}
        height={500}
        style={{
          position: "absolute",
          top: -65,
          left: -85,
          zIndex: 9999,
          pointerEvents: "none",
          imageRendering: "pixelated",
          display: "block",
        }}
        draggable={false}
        loading="eager"
      />
    )}

    {/* ==== FRAME ==== */}
    <img
      src={frame}
      alt="frame"
      width={DASHBOARD_WIDTH}
      height={DASHBOARD_HEIGHT}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "none",
        imageRendering: "pixelated",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />

    {/* ==== BAR LATERALE ==== */}
    <img
      src={leftBar}
      alt="left bar"
      width={129}
      height={373}
      style={{
        position: "absolute",
        top: 13,
        left: 36,
        zIndex: 2,
        pointerEvents: "none",
        imageRendering: "pixelated",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />

    {/* ==== SFONDO ==== */}
    <img
      src={background}
      alt="background"
      width={370}
      height={380}
      style={{
        position: "absolute",
        top: 5,
        left: 103,
        zIndex: 3,
        pointerEvents: "none",
        imageRendering: "pixelated",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />

    {/* ==== AREA CONTENUTO ==== */}
    <div
      style={{
        position: "absolute",
        top: 52,
        left: 130,
        width: 310,
        height: 290,
        zIndex: 10,
        overflow: "hidden"
      }}
    >
      {children}
      {pageFlipOverlay}
    </div>

    {/* ==== ANGOLI ==== */}
    {!isFlipping && (
      <img
        src={corners}
        alt="corners"
        width={343}
        height={385}
        style={{
          position: "absolute",
          top: 3,
          left: 116,
          zIndex: 20,
          pointerEvents: "none",
          imageRendering: "pixelated",
          display: "block",
        }}
        draggable={false}
        loading="eager"
      />
    )}

    {/* ==== POWER HUB: tubo, glow, box ==== */}
    <img
      src={powerHubTube}
      alt="power hub tube"
      width={438}
      height={325}
      style={{
        position: "absolute",
        top: 23,
        left: 25,
        zIndex: 30,
        pointerEvents: "none",
        imageRendering: "pixelated",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />

    {/* ==== GLOW EFFECTS ==== */}
    {[
      { top: 50, left: 35 }, { top: 150, left: 35 }, { top: 65, left: 428 }, { top: 170, left: 428 }, { top: 250, left: 35 },
      { top: 36, left: 400, vertical: true },
      { top: 36, left: 320, vertical: true },
      { top: 36, left: 245, vertical: true },
      { top: 36, left: 160, vertical: true },
      { top: 36, left: 80, vertical: true }
    ].map((glow, i) => (
      <img
        key={i}
        src={powerHubGlow}
        alt={`power hub glow ${glow.vertical ? "vertical" : "horizontal"} ${i + 1}`}
        width={32}
        height={32}
        style={{
          position: "absolute",
          top: glow.top,
          left: glow.left,
          zIndex: glow.vertical ? 32 : 31,
          pointerEvents: "none",
          imageRendering: "pixelated",
          display: "block",
          ...(glow.vertical ? { transform: "rotate(90deg)", transformOrigin: "center center" } : {})
        }}
        draggable={false}
        loading="eager"
      />
    ))}

    {/* ==== POWER HUB BOX ==== */}
    <img
      src={powerHubBox}
      alt="power hub box"
      width={77}
      height={123}
      style={{
        position: "absolute",
        top: 230,
        left: 418,
        zIndex: 33,
        pointerEvents: "none",
        imageRendering: "pixelated",
        display: "block",
      }}
      draggable={false}
      loading="eager"
    />

    {/* ==== POWER HUB LIGHTS ==== */}
    <PowerHubLights {...PowerHubProps} />

    {/* ==== BUSSOLA & OROLOGIO ==== */}
    <Compass />
    <ClockAnimated />
  </div>
));

export default DashboardBase;
