import React, { useEffect, useState } from "react";
import avatarIdle from "../../assets/page-content-sprites/icons/14.png";
import avatarTalk from "../../assets/page-content-sprites/icons/15.png";

export default function AvatarAnimato({ talking }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (talking) {
      // Bocca si apre e si chiude ogni 160ms mentre "parla"
      interval = setInterval(() => {
        setIsOpen((open) => !open);
      }, 160);
    } else {
      setIsOpen(false); // Bocca chiusa quando non parla
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
        objectFit: "cover",
        pointerEvents: "none",
      }}
      draggable={false}
    />
  );
}

