import React, { useRef, useEffect, useState } from "react";
// === ASSET PNG BUSSOLA ===
import compassBase from "../assets/pixel-map-sprites/compass/0.png";
import compassShadow from "../assets/pixel-map-sprites/compass/1.png";
import compassDeco from "../assets/pixel-map-sprites/compass/2.png";
import compassNeedle from "../assets/pixel-map-sprites/compass/3.png";
import { gsap } from "gsap";

// === Funzione che ritorna una direzione random (0-360°) ===
const getRandomDirection = () => Math.random() * 360;

const Compass = () => {
  const needleRef = useRef(null);

  // Direzione iniziale (0 = Nord; puoi mettere 0 per debug)
  const [direction, setDirection] = useState(getRandomDirection());
  const [isMoving, setIsMoving] = useState(false);
  const idleTween = useRef(null);

  // === 1. PIVOT CENTRALE ===
  // Questi parametri servono solo a calcolare la posizione della lancetta
  const pivotTop = 302;    // <-- Sposta su/giù (px dal parent)
  const pivotLeft = 92.5;    // <-- Sposta dx/sx  (px dal parent)
  const pivotSize = 1;     // <-- Diametro cerchio rosso (debug)
  const pivotBorder = 1;   // <-- Spessore bordo giallo

  // === 2. POSIZIONE DELLA PNG LANCETTA ===
  // Modifica questi valori per centrare la PNG rispetto al pivot
  const needleTop = pivotTop - 23;
  const needleLeft = pivotLeft - 23;

  // === 3. ORIGINE DI ROTAZIONE LANCETTA (centro PNG di solito) ===
  const needleOriginX = 24;
  const needleOriginY = 24;

  // ===== ANIMAZIONE IDLE (oscillazione lieve) =====
  useEffect(() => {
    if (!isMoving && needleRef.current) {
      idleTween.current = gsap.to(needleRef.current, {
        rotate: direction + 4,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(needleRef.current, {
        rotate: direction - 4,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
      return () => {
        if (idleTween.current) idleTween.current.kill();
      };
    }
  }, [direction, isMoving]);

  // ===== ANIMAZIONE CLICK =====
  const handleSpin = () => {
    if (!isMoving && needleRef.current) {
      setIsMoving(true);
      let newDir;
      do {
        newDir = getRandomDirection();
      } while (Math.abs(newDir - direction) < 45);
      gsap.killTweensOf(needleRef.current);

      let current = direction % 360;
      let target = newDir % 360;
      let delta = ((target - current + 540) % 360) - 180;
      let finalTarget = current + delta;

      gsap.to(needleRef.current, {
        rotate: finalTarget,
        duration: 1.4,
        ease: "power2.inOut",
        onComplete: () => {
          setDirection(finalTarget % 360);
          setIsMoving(false);
        }
      });
    }
  };

  // ===== SYNC rotazione lancetta =====
  useEffect(() => {
    if (needleRef.current) {
      gsap.set(needleRef.current, { rotate: direction });
    }
  }, [needleRef, direction]);

  // ===== RENDER LAYER BUSSOLA =====
  return (
    <>
      {/* Ombra */}
      <img
        src={compassShadow}
        alt="compass shadow"
        style={{
          position: "absolute",
          top: "262px",
          left: "58px",
          width: "71px",
          height: "80px",
          zIndex: 36,
          pointerEvents: "none"
        }}
        draggable={false}
      />
      {/* Base */}
      <img
        src={compassBase}
        alt="compass base"
        style={{
          position: "absolute",
          top: "260px",
          left: "58px",
          width: "70px",
          height: "80px",
          zIndex: 37,
          pointerEvents: "none"
        }}
        draggable={false}
      />
      {/* DEBUG: Cerchio rosso/giallo = centro pivot */}
      <div
        style={{
          position: "absolute",
          top: `${pivotTop - pivotSize / 2}px`, // Centra rispetto al diametro
          left: `${pivotLeft - pivotSize / 2}px`,
          width: `${pivotSize}px`,
          height: `${pivotSize}px`,
          background: "red",
          borderRadius: "50%",
          border: `${pivotBorder}px solid yellow`,
          zIndex: 999,
          pointerEvents: "none"
        }}
      ></div>
      {/* Lancetta/Elica */}
      <img
        ref={needleRef}
        src={compassNeedle}
        alt="compass needle"
        style={{
          position: "absolute",
          top: `${needleTop}px`,       // Muovi per centrare la PNG rispetto al pivot
          left: `${needleLeft}px`,
          width: "48px",
          height: "48px",
          zIndex: 38,
          // border: "1px solid lime", // (DEBUG: attiva per vedere la hitbox PNG)
          pointerEvents: isMoving ? "none" : "auto",
          cursor: isMoving ? "default" : "pointer",
          // Origine rotazione: centro della PNG = ventola/elica
          transformOrigin: `${needleOriginX}px ${needleOriginY}px`,
          transition: "transform 0.3s cubic-bezier(0.4,2,0.4,1)"
        }}
        onClick={handleSpin}
        draggable={false}
      />
      {/* Decorazione sopra */}
      <img
        src={compassDeco}
        alt="compass deco"
        style={{
          position: "absolute",
          top: "280px",
          left: "74px",
          width: "39px",
          height: "48px",
          zIndex: 39,
          pointerEvents: "none"
        }}
        draggable={false}
      />
      {/* 
        === DOVE MODIFICARE COSA? ===
        - Sposta il **pivot** (cerchio rosso): `pivotTop`, `pivotLeft`
        - Cambia la **dimensione del cerchio**: `pivotSize`
        - Sposta la **lancetta**: `needleTop`, `needleLeft`
        - Modifica il **punto di rotazione**: `needleOriginX`, `needleOriginY`
      */}
    </>
  );
};

export default Compass;
