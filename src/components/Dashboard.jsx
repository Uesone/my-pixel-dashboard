import React from "react";
import frame from "../assets/pixel-map-sprites/base/3.png";
import background from "../assets/pixel-map-sprites/base/0.png";
import corners from "../assets/pixel-map-sprites/base/1.png";
import leftBar from "../assets/pixel-map-sprites/base/2.png";
import referenceImage from "../assets/pixel-map/0.png";

const Dashboard = () => (
  <div
    style={{
      position: "relative",
      width: "512px",
      height: "608px",
      margin: "0 auto",
      imageRendering: "pixelated",
      overflow: "hidden",
      background: "#242424",
    }}
  >
    {/* Frame esterno */}
    <img
      src={frame}
      alt="frame"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "512px",
        height: "608px",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />

    {/* Barra laterale sinistra */}
    <img
      src={leftBar}
      alt="left bar"
      style={{
        position: "absolute",
        top: "100px", // DA CALIBRARE
        left: "40px", // DA CALIBRARE
        zIndex: 2,
        pointerEvents: "none",
      }}
    />

    {/* Sfondo centrale beige */}
    <img
      src={background}
      alt="background"
      style={{
        position: "absolute",
        top: "65px", // DA CALIBRARE
        left: "135px", // DA CALIBRARE
        zIndex: 3,
        pointerEvents: "none",
      }}
    />

    {/* Cornice decorativa angolare */}
    <img
      src={corners}
      alt="corners"
      style={{
        position: "absolute",
        top: "75px", // DA CALIBRARE
        left: "145px", // DA CALIBRARE
        zIndex: 4,
        pointerEvents: "none",
      }}
    />
  </div>
)
  {/* DEBUG reference */}
<img
  src={referenceImage} // importa '0.png'
  alt="reference"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "512px",
    height: "608px",
    opacity: 0.4, // semi trasparente per debug
    pointerEvents: "none",
    zIndex: 999,
  }} />


export default Dashboard;
