import React, { useEffect, useState, useRef } from "react";

// Props:
// - frames: array di import immagini (es: [img0, img1, img2, ...])
// - frameRate: frame al secondo (default 12)
// - loop: true/false (default true)
// - style: opzionale (per gestire size/posizionamento)
// - onAnimationEnd: callback opzionale

const SpriteAnimator = ({
  frames = [],
  frameRate = 12,
  loop = true,
  style = {},
  onAnimationEnd = () => {},
  ...props
}) => {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!frames.length) return;
    timer.current && clearInterval(timer.current);

    timer.current = setInterval(() => {
      setCurrent((prev) => {
  if (prev + 1 === frames.length) {
  if (loop) return 0;
  clearInterval(timer.current);
  // DEFER: chiama la callback dopo il render, non dentro setState!
  setTimeout(() => onAnimationEnd(), 0);
  return prev; }

       return prev + 1;
      });
    }, 1000 / frameRate);

    return () => clearInterval(timer.current);
  }, [frames, frameRate, loop, onAnimationEnd]);

  if (!frames.length) return null;

  return (
    <img
      src={frames[current]}
      alt="animation"
      draggable={false}
      style={{
        imageRendering: "pixelated",
        ...style,
      }}
      {...props}
    />
  );
};

export default SpriteAnimator;
