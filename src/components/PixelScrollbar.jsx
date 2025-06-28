import React, { useRef } from "react";

// Modifica queste costanti secondo le dimensioni reali dei tuoi PNG
const SCROLLBAR_WIDTH = 15;  // larghezza della scrollbar in pixel
const HANDLE_HEIGHT = 20;    // altezza dell'handle in pixel

export default function PixelScrollbar({
  height,
  scrollTop,
  maxScroll,
  onScrollChange,
  barPng,
  handlePng,
  top = 0,
  left = 0
}) {
  // Percentuale posizione handle
  const perc = maxScroll ? scrollTop / maxScroll : 0;
  const trackHeight = height - HANDLE_HEIGHT;
  const handleTop = Math.round(perc * trackHeight);

  // Per il trascinamento
  const dragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);

  // Mouse drag start
  function onMouseDown(e) {
    dragging.current = true;
    startY.current = e.clientY;
    startScroll.current = scrollTop;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  }
  // Mouse drag move
  function onMouseMove(e) {
    if (!dragging.current) return;
    const delta = e.clientY - startY.current;
    const newScroll = Math.min(
      Math.max(0, startScroll.current + Math.round(delta * (maxScroll / trackHeight))),
      maxScroll
    );
    onScrollChange(newScroll);
  }
  // Mouse drag end
  function onMouseUp() {
    dragging.current = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  // Gestione scroll con la rotella del mouse direttamente sulla scrollbar
  function onWheel(e) {
    if (maxScroll > 0) {
      const dir = e.deltaY > 0 ? 1 : -1; // 1: giù, -1: su
      onScrollChange(prev => {
        const next = Math.max(0, Math.min(maxScroll, typeof prev === "function" ? prev() + dir : scrollTop + dir));
        return next;
      });
      e.preventDefault();
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top, left,
        width: SCROLLBAR_WIDTH,
        height,
        zIndex: 50,
        userSelect: "none",
        pointerEvents: "auto",
      }}
      onWheel={onWheel} // Attiva lo scroll wheel sulla barra!
    >
      {/* Barra */}
      <img
        src={barPng}
        alt="scrollbar"
        style={{
          position: "absolute",
          left: 0, top: 0,
          width: SCROLLBAR_WIDTH,
          height,
          imageRendering: "pixelated",
          pointerEvents: "none"
        }}
        draggable={false}
      />
      {/* Handle */}
      <img
        src={handlePng}
        alt="scroll-handle"
        style={{
          position: "absolute",
          left: 0,
          top: handleTop,
          width: SCROLLBAR_WIDTH,
          height: HANDLE_HEIGHT,
          imageRendering: "pixelated",
          cursor: "grab",
          zIndex: 10,
          userSelect: "none"
        }}
        draggable={false}
        onMouseDown={onMouseDown}
      />
    </div>
  );
}
