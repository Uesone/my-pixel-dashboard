import React, { useEffect, useState } from "react";
import DigitAnimated from "./DigitAnimated";
import clockBase from "../assets/pixel-map-sprites/clock/0.png";
import clockDigitsMask from "../assets/pixel-map-sprites/clock/1.png";

// Split in [dec, unit]
const getDigits = (num) =>
  num.toString().padStart(2, "0").split("").map(Number);

const ClockAnimated = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

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
    </>
  );
};

export default ClockAnimated;
