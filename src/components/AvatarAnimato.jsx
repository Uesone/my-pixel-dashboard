import React from "react";
import avatarIdle from "../assets/page-content-sprites/icons/14.png";
import avatarTalk from "../assets/page-content-sprites/icons/15.png";

export default function AvatarAnimato({ talking }) {
  return (
    <img
      src={talking ? avatarTalk : avatarIdle}
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
