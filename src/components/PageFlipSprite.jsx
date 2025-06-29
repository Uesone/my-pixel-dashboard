// components/PageFlipSprite.jsx
import React from "react";

/*
  Componente universale per posizionare PNG "pixel art" con controllo totale:
  - src: path immagine
  - left/top: posizione pixel perfetta dentro la zona beige
  - width/height: dimensione desiderata
  - zIndex: livello di stacking (in caso di PNG sovrapposte)
  - style: props aggiuntive (opzionali)
*/
const PageFlipSprite = ({
  src,
  left = 0,
  top = 0,
  width = 310,
  height = 290,
  zIndex = 1,
  style = {},
  ...rest
}) => (
  <img
    src={src}
    alt=""
    style={{
      position: "absolute",
      left,
      top,
      width,
      height,
      zIndex,
      imageRendering: "pixelated", // Importante per PNG pixel art!
      ...style,
    }}
    draggable={false}
    {...rest}
  />
);

export default PageFlipSprite;
