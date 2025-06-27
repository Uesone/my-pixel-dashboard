import React, { useEffect, useState } from "react";
import DigitAnimated from "./DigitAnimated";
import clockBase from "../assets/pixel-map-sprites/clock/0.png";
import clockDigitsMask from "../assets/pixel-map-sprites/clock/1.png";

// Funzione per formattare la data in formato GG/MM/YYYY
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mesi da 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Divide un numero in due cifre (es. 9 -> [0,9])
const getDigits = (num) => {
  if (typeof num !== "number" || isNaN(num)) return [0, 0];
  const str = Math.max(0, Math.min(99, num)).toString().padStart(2, "0");
  return [Number(str[0]), Number(str[1])];
};

const ClockAnimated = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ORE E MINUTI in formato 12h (come nella GIF)
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12; // Orario 12h

  const digits = [
    ...getDigits(hours),
    ...getDigits(minutes),
  ];

  const digitPositions = [
    { top: 66, left: 52 },
    { top: 66, left: 69 },
    { top: 66, left: 88 },
    { top: 66, left: 105 }
  ];

  return (
    <>
      {/* Clock base */}
      <img
        src={clockBase}
        alt="clock base"
        style={{
          position: "absolute",
          top: "60px",
          left: "45px",
          width: "96px",
          height: "64px",
          zIndex: 50,
          pointerEvents: "none"
        }}
        draggable={false}
      />
      {/* Digits mask */}
      <img
        src={clockDigitsMask}
        alt="clock mask"
        style={{
          position: "absolute",
          top: "60px",
          left: "45px",
          width: "96px",
          height: "64px",
          zIndex: 51,
          pointerEvents: "none"
        }}
        draggable={false}
      />
      {/* Digits */}
      {digits.map((digit, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${digitPositions[i].top}px`,
            left: `${digitPositions[i].left}px`,
            width: "28px",
            height: "32px",
            zIndex: 52,
            overflow: "hidden",
            pointerEvents: "none"
          }}
        >
          <DigitAnimated value={digit} />
        </div>
      ))}

      {/* --- DATA SOTTO L'OROLOGIO --- */}
      <div
        style={{
          position: "absolute",
          top: "102px",
          left: "58px",
          width: "45px",
          height: "14px",
          zIndex: 55,
          color: "#2c2c2c",
          fontFamily: '"VT323", monospace',
          fontSize: "9px",
          textAlign: "center",
          letterSpacing: "0px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {formatDate(time)}
      </div>
      {/* --- AM/PM SOTTO LA DATA --- */}
      <div
        style={{
          position: "absolute",
          top: "101px",
          left: "102px",
          width: "30px",
          height: "14px",
          zIndex: 55,
          color: "#2c2c2c",
          fontFamily: '"VT323", monospace',
          fontSize: "11px",
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {ampm}
      </div>
    </>
  );
};

export default ClockAnimated;
