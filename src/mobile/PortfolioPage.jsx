// src/mobile/PortfolioPage.jsx
// Pagina Portfolio (bilingue IT/EN), swipe/drag solo, gallery pixel-art

import React, { useState, useRef } from "react";

// === PROGETTI MULTILINGUA ===
const PROJECTS = {
  it: [
    {
      title: "APP-METEO",
      desc: (
        <>
          App meteo full-stack sviluppata come progetto personale.<br />
          Ricerca città, previsioni dettagliate, UI responsive e dark mode.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> React, Bootstrap, OpenWeatherMap API.
        </>
      ),
      images: [
        "https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/meteo1.png",
        "https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/meteo2.png",
        "https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/meteo3.png",
      ],
      github: "https://github.com/Uesone/APP-METEO",
    },
    {
      title: "Spotify Clone (Mobile)",
      desc: (
        <>
          Web-app mobile-first ispirata a Spotify, realizzata in React.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> React, API REST.
        </>
      ),
      images: [
        "https://camo.githubusercontent.com/ba0ac289e6f2912d60340f194854edc9a027fbfbd5985f6bb64ae8d60a96e26e/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f66346435623431632d333230302d343831392d396665342d353435353666613761363630",
        "https://camo.githubusercontent.com/daa7f4cc08dfebeefaa2674d59d061eca8ddba312ba4c8ad65c5e6545e4a0121/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f66646132623361362d303930372d343132662d613433382d343365333131393236623765",
        "https://camo.githubusercontent.com/28b041446063e46c55753c4b74da9116ff3d101b7710b3155a99cd38794e35ad/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f65316531666264612d636330372d343431352d393631652d633438646161393038643638",
        "https://camo.githubusercontent.com/20823a8cf676d01e3a477ce6332081727fa407076ad7757e1bdfabbd6cc23635/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f37353130333464372d643761322d343931362d386265612d623361393036373564363939"
      ],
      github: "https://github.com/Uesone/Epicode-W8BW2",
    },
    {
      title: "Pokedècks",
      desc: (
        <>
          Web app pixel art per amanti delle carte Pokémon TCG!<br />
          Cerca, colleziona e tieni traccia delle tue carte nella tua Pokédex personale.<br />
          Valore della collezione in tempo reale, UI desktop-first dallo stile retrò.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> React, Fetch API, Pixel art custom.<br />
          <span style={{ color: "#ffe066" }}>Nota:</span> La versione mobile è in arrivo!
        </>
      ),
      images: [
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/home.png",
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/tradingcards.png",
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/pokedex.png",
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/aboutus.png",
      ],
      github: "https://github.com/Uesone/pokecardcollectorfront",
    },
    {
      title: "Agenzia Trasporti (Backend)",
      desc: (
        <>
          Applicazione backend per la gestione di una fittizia agenzia di trasporti pubblici.<br />
          Gestione di linee, mezzi, orari, biglietti e utenti tramite API REST.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> Java, Spring Boot, Spring Data JPA.<br />
          <span style={{ color: "#ffe066" }}>Ruolo:</span> Sviluppo entità JPA, DTO, modelli dati e supporto alla logica di business.<br />
          <span style={{ color: "#00ffe1" }}>Team:</span> Umberto Amoroso, Mirko Abozzi, Kassandra Falsitta, Simone Pomponio, Mattia Susin.<br />
        </>
      ),
      images: [
        "https://raw.githubusercontent.com/Uesone/BW4_TEAM-2/refs/heads/main/Diagramma.png",
      ],
      github: "https://github.com/Uesone/BW4_TEAM-2",
    }
  ],
  en: [
    {
      title: "APP-METEO",
      desc: (
        <>
          Full-stack weather app developed as a personal project.<br />
          City search, detailed forecasts, responsive UI and dark mode.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> React, Bootstrap, OpenWeatherMap API.
        </>
      ),
      images: [
        "https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/meteo1.png",
        "https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/meteo2.png",
        "https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/meteo3.png",
      ],
      github: "https://github.com/Uesone/APP-METEO",
    },
    {
      title: "Spotify Clone (Mobile)",
      desc: (
        <>
          Mobile-first web app inspired by Spotify, built with React.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> React, REST API.
        </>
      ),
      images: [
        "https://camo.githubusercontent.com/ba0ac289e6f2912d60340f194854edc9a027fbfbd5985f6bb64ae8d60a96e26e/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f66346435623431632d333230302d343831392d396665342d353435353666613761363630",
        "https://camo.githubusercontent.com/daa7f4cc08dfebeefaa2674d59d061eca8ddba312ba4c8ad65c5e6545e4a0121/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f66646132623361362d303930372d343132662d613433382d343365333131393236623765",
        "https://camo.githubusercontent.com/28b041446063e46c55753c4b74da9116ff3d101b7710b3155a99cd38794e35ad/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f65316531666264612d636330372d343431352d393631652d633438646161393038643638",
        "https://camo.githubusercontent.com/20823a8cf676d01e3a477ce6332081727fa407076ad7757e1bdfabbd6cc23635/68747470733a2f2f636d732e657069636f64652e636f6d2f6173736574732f37353130333464372d643761322d343931362d386265612d623361393036373564363939"
      ],
      github: "https://github.com/Uesone/Epicode-W8BW2",
    },
    {
      title: "Pokedècks",
      desc: (
        <>
          Pixel art web app for Pokémon TCG lovers!<br />
          Search, collect, and track your cards in your personal Pokédex.<br />
          Real-time collection value, retro desktop-first UI.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> React, Fetch API, Custom Pixel Art.<br />
          <span style={{ color: "#ffe066" }}>Note:</span> Mobile version coming soon!
        </>
      ),
      images: [
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/home.png",
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/tradingcards.png",
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/pokedex.png",
        "https://raw.githubusercontent.com/Uesone/pokecardcollectorfront/refs/heads/master/aboutus.png",
      ],
      github: "https://github.com/Uesone/pokecardcollectorfront",
    },
    {
      title: "Transport Agency (Backend)",
      desc: (
        <>
          Backend application for managing a fictional public transport agency.<br />
          Manage routes, vehicles, schedules, tickets and users via REST API.<br />
          <span style={{ color: "#ffd24c" }}>Stack:</span> Java, Spring Boot, Spring Data JPA.<br />
          <span style={{ color: "#ffe066" }}>Role:</span> JPA entity development, DTOs, data modeling and support for business logic.<br />
          <span style={{ color: "#00ffe1" }}>Team:</span> Umberto Amoroso, Mirko Abozzi, Kassandra Falsitta, Simone Pomponio, Mattia Susin.<br />
        </>
      ),
      images: [
        "https://raw.githubusercontent.com/Uesone/BW4_TEAM-2/refs/heads/main/Diagramma.png",
      ],
      github: "https://github.com/Uesone/BW4_TEAM-2",
    }
  ]
};

// === ETICHETTE MULTILINGUA ===
const LABELS = {
  it: {
    portfolio: "Portfolio",
    github: "🔗 Vedi su GitHub",
  },
  en: {
    portfolio: "Portfolio",
    github: "🔗 View on GitHub",
  }
};

// === OVERLAY GALLERY SOLO SWIPE ===
function GalleryOverlay({ images, current, onClose, onPrev, onNext, lang }) {
  const startX = useRef(null);

  // Touch events
  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (startX.current == null) return;
    const deltaX = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0 && current < images.length - 1) onNext();
      if (deltaX > 0 && current > 0) onPrev();
    }
    startX.current = null;
  }

  // Mouse drag events
  function handleMouseDown(e) {
    startX.current = e.clientX;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseMove(e) {
    if (startX.current == null) return;
    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0 && current < images.length - 1) onNext();
      if (deltaX > 0 && current > 0) onPrev();
      startX.current = null;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }
  function handleMouseUp() {
    startX.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  return (
    <div
      className="gallery-overlay"
      tabIndex={-1}
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(18,20,15,0.97)",
        zIndex: 20000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        transition: "background 0.16s",
      }}
      onClick={onClose}
      onKeyDown={e => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* X chiusura sobria */}
      <button
        aria-label="Chiudi"
        onClick={e => { e.stopPropagation(); onClose(); }}
        className="close-x-btn"
        style={{
          position: "absolute",
          top: 18,
          right: 28,
          fontSize: 32,
          color: "#ffe066",
          background: "transparent",
          border: "none",
          borderRadius: "7px",
          fontFamily: "'VT323', monospace",
          padding: "0 13px",
          lineHeight: "38px",
          cursor: "pointer",
          zIndex: 21000,
          boxShadow: "0 0 0 1px #ffe06633",
          transition: "color 0.15s",
        }}
        onMouseOver={e => (e.currentTarget.style.color = "#00ffe1")}
        onMouseOut={e => (e.currentTarget.style.color = "#ffe066")}
        onFocus={e => (e.currentTarget.style.color = "#00ffe1")}
        onBlur={e => (e.currentTarget.style.color = "#ffe066")}
      >×</button>

      {/* Immagine ingrandita con swipe/drag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          width: "90vw",
          maxWidth: 540,
          touchAction: "pan-y",
          userSelect: "none",
        }}
        onClick={e => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        <img
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          style={{
            maxWidth: 390,
            maxHeight: "75vh",
            borderRadius: 14,
            border: "2.5px solid #00ffe1",
            boxShadow: "0 8px 60px #3affbb50",
            background: "#151b18",
            objectFit: "contain",
            imageRendering: "pixelated",
            touchAction: "pan-y",
            userSelect: "none",
          }}
          loading="eager"
          draggable={false}
        />
      </div>
      {/* Paginazione (solo testo) */}
      {images.length > 1 && (
        <div style={{
          marginTop: 13,
          color: "#ffe066",
          fontFamily: "'VT323', monospace",
          fontSize: 17,
          letterSpacing: 1,
        }}>
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

// === COMPONENTE PRINCIPALE PortfolioPage MULTILINGUA ===
export default function PortfolioPage({ onClose, lang = "it" }) {
  const labels = LABELS[lang] || LABELS.it;
  const projects = PROJECTS[lang] || PROJECTS.it;
  const [gallery, setGallery] = useState({ images: null, index: 0 });

  // Overlay: open/close, swipe
  function openGallery(images, index) {
    setGallery({ images, index });
    setTimeout(() => {
      document.querySelector('.gallery-overlay')?.focus();
    }, 0);
  }
  function closeGallery() { setGallery({ images: null, index: 0 }); }
  function prevImg() {
    setGallery(g => ({
      ...g,
      index: Math.max(0, (g.index ?? 0) - 1)
    }));
  }
  function nextImg() {
    setGallery(g => ({
      ...g,
      index: Math.min((g.images?.length ?? 1) - 1, (g.index ?? 0) + 1)
    }));
  }

  return (
    <div
      style={{
        padding: "2px 0 8px 0",
        minWidth: 0,
        position: "relative",
        maxWidth: "100vw",
      }}
    >
      {/* X chiusura sobria */}
      {onClose && (
        <button
          className="close-x-btn"
          aria-label="Chiudi"
          onClick={onClose}
          tabIndex={0}
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            fontSize: 26,
            color: "#ffe066",
            background: "transparent",
            border: "none",
            borderRadius: "7px",
            fontFamily: "'VT323', monospace",
            padding: "0 9px",
            lineHeight: "32px",
            cursor: "pointer",
            zIndex: 10,
            transition: "color 0.17s, background 0.15s, box-shadow 0.14s",
            boxShadow: "0 0 0 1px #ffe06633",
            outline: "none",
          }}
          onMouseOver={e => (e.currentTarget.style.color = "#00ffe1")}
          onMouseOut={e => (e.currentTarget.style.color = "#ffe066")}
          onFocus={e => (e.currentTarget.style.color = "#00ffe1")}
          onBlur={e => (e.currentTarget.style.color = "#ffe066")}
        >×</button>
      )}

      <h2
        style={{
          color: "#ffe066",
          fontSize: 28,
          marginBottom: 12,
          letterSpacing: 2,
          fontFamily: "'VT323', monospace",
          textShadow: "0 2px 6px #ffe06648",
        }}
      >
        {labels.portfolio}
      </h2>

      <ul
        style={{
          padding: 0,
          listStyle: "none",
          margin: 0,
          minWidth: 0,
        }}
      >
        {projects.map((proj, i) => (
          <li
            key={proj.title}
            style={{
              margin: "18px 0",
              borderRadius: 11,
              padding: "17px 13px 17px 13px",
              background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
            }}
          >
            <b style={{ color: "#00ffe1", fontSize: 18, letterSpacing: 1 }}>
              {proj.title}
            </b>
            <div style={{ fontSize: 15.5, color: "#b8ffd9", margin: "8px 0 0 0" }}>
              {proj.desc}
            </div>
            {/* MINI GALLERY immagini */}
            <div
              style={{
                display: "flex",
                gap: 9,
                marginTop: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {proj.images.map((url, idx) => (
                <img
                  key={url}
                  src={url}
                  alt={`Screenshot ${proj.title} ${idx + 1}`}
                  loading="lazy"
                  style={{
                    maxWidth: 100,
                    maxHeight: 170,
                    borderRadius: 8,
                    border: "2px solid #3affbb85",
                    background: "#232b26",
                    boxShadow: "0 1px 8px #2affbb35",
                    objectFit: "cover",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "filter 0.13s",
                    filter: "brightness(1)",
                  }}
                  onClick={() => openGallery(proj.images, idx)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") openGallery(proj.images, idx);
                  }}
                  tabIndex={0}
                  draggable={false}
                />
              ))}
            </div>
            {/* LINK GITHUB */}
            <a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 12,
                padding: "7px 18px",
                borderRadius: 8,
                background: "#232b26",
                color: "#00ffe1",
                fontWeight: 700,
                letterSpacing: 1,
                fontFamily: "'VT323', monospace",
                fontSize: 17,
                border: "2px solid #3affbb85",
                textDecoration: "none",
                boxShadow: "0 1px 7px #29ffab30",
                transition: "background 0.15s, color 0.13s",
              }}
            >
              {labels.github}
            </a>
          </li>
        ))}
      </ul>
      {/* === OVERLAY GALLERY === */}
      {gallery.images && (
        <GalleryOverlay
          images={gallery.images}
          current={gallery.index}
          onClose={closeGallery}
          onPrev={prevImg}
          onNext={nextImg}
          lang={lang}
        />
      )}
    </div>
  );
}
