import React, { forwardRef } from "react";
// --- ASSET principali ---
import frame from "../assets/pixel-map-sprites/base/3.png";
import background from "../assets/pixel-map-sprites/base/0.png";
import corners from "../assets/pixel-map-sprites/base/1.png";
import leftBar from "../assets/pixel-map-sprites/base/2.png";
// --- POWER HUB ---
import powerHubTube from "../assets/pixel-map-sprites/power-hub/1.png";
import powerHubGlow from "../assets/pixel-map-sprites/power-hub/2.png";
import powerHubBox from "../assets/pixel-map-sprites/power-hub/3.png";
import PowerHubLights from "./PowerHubLights";
// --- FOGLIO ARROTOLATO ---
import pageRollPng from "../assets/content/page-flip/next-page/11.png";
// --- BUSSOLA/COMPASS & CLOCK ---
import Compass from "./Compass";
import ClockAnimated from "./ClockAnimated";

/**
 * DashboardBase (ottimizzata performance/pixel art)
 */
const DASHBOARD_WIDTH = 487;
const DASHBOARD_HEIGHT = 399;

const DashboardBase = forwardRef(({
  scale = 1.4,
  children,
  showPageRoll = false,
  pageFlipOverlay = null,
  isFlipping = false,
  PowerHubProps = {}
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
      // Riserva sempre spazio fisso = no CLS
      minWidth: DASHBOARD_WIDTH,
      minHeight: DASHBOARD_HEIGHT,
      maxWidth: DASHBOARD_WIDTH,
      maxHeight: DASHBOARD_HEIGHT,
      overflow: "hidden"
    }}
  >
    {/* Foglio arrotolato */}
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
          imageRendering: "pixelated"
        }}
        draggable={false}
        loading="eager"
      />
    )}

    {/* Frame bordo */}
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
        imageRendering: "pixelated"
      }}
      draggable={false}
      loading="eager"
    />

    {/* Barra laterale sinistra */}
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
        imageRendering: "pixelated"
      }}
      draggable={false}
      loading="lazy"
    />

    {/* Sfondo centrale */}
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
        imageRendering: "pixelated"
      }}
      draggable={false}
      loading="eager"
    />

    {/* Area contenuto */}
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

    {/* Decorazione angoli */}
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
          imageRendering: "pixelated"
        }}
        draggable={false}
        loading="lazy"
      />
    )}

    {/* Power hub: tubo, glow, box */}
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
        imageRendering: "pixelated"
      }}
      draggable={false}
      loading="lazy"
    />

    {/* Glow orizzontali e verticali (mappati) */}
    {[
      // orizzontali
      { top: 50, left: 35 }, { top: 150, left: 35 }, { top: 65, left: 428 }, { top: 170, left: 428 }, { top: 250, left: 35 },
      // verticali
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
          ...(glow.vertical ? { transform: "rotate(90deg)", transformOrigin: "center center" } : {})
        }}
        draggable={false}
        loading="lazy"
      />
    ))}

    {/* Box power hub */}
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
        imageRendering: "pixelated"
      }}
      draggable={false}
      loading="lazy"
    />

    {/* Power hub animato */}
    <PowerHubLights {...PowerHubProps} />

    {/* Bussola */}
    <Compass />

    {/* Clock */}
    <ClockAnimated />
  </div>
));
export default DashboardBase;
