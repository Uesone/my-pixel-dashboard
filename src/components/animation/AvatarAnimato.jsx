import React, { useEffect, useState } from "react";
import avatarIdle from "../../assets/page-content-sprites/icons/14.png";
import avatarTalk from "../../assets/page-content-sprites/icons/15.png";

/**
 * Avatar animato: pixel-art SEMPRE nitida.
 * - Cambia PNG quando "talking" (animazione bocca)
 * - Usare SEMPRE imageRendering: "pixelated" per nitidezza perfetta
 */
export default function AvatarAnimato({ talking }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (talking) {
      interval = setInterval(() => setIsOpen(open => !open), 160);
    } else {
      setIsOpen(false);
    }
    return () => clearInterval(interval);
  }, [talking]);

  return (
    <img
      src={talking && isOpen ? avatarTalk : avatarIdle}
      alt="avatar"
      style={{
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        pointerEvents: "none"
      }}
      draggable={false}
    />
  );
}
