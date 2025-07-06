// Pagina Portfolio: lista progetti principali, stile pixel-art, con X chiusura sobria
export default function PortfolioPage({ onClose }) {
  return (
    <div
      style={{
        padding: "2px 0 8px 0",
        minWidth: 0,
        position: "relative", // Serve per la X
      }}
    >
      {/* X CHIUSURA - solo se onClose è passato */}
      {onClose && (
        <button
          className="close-x-btn"
          aria-label="Chiudi"
          onClick={onClose}
          tabIndex={0}
          style={{
            position: "absolute",
            top: 11,
            right: 10,
            fontSize: 25,
            color: "#ffe066",
            background: "transparent",
            border: "none",
            borderRadius: "7px",
            fontFamily: "'VT323', monospace",
            padding: "0 9px",
            lineHeight: "32px",
            cursor: "pointer",
            zIndex: 10,
            transition: "color 0.17s, background 0.15s",
            boxShadow: "0 0 0 1px #ffe06633",
          }}
          onMouseOver={e => (e.currentTarget.style.color = "#00ffe1")}
          onMouseOut={e => (e.currentTarget.style.color = "#ffe066")}
        >
          ×
        </button>
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
        Portfolio
      </h2>

      <ul
        style={{
          padding: 0,
          listStyle: "none",
          margin: 0,
          minWidth: 0,
        }}
      >
        {/* === APP-METEO === */}
        <li
          style={{
            margin: "18px 0",
            borderRadius: 11,
            padding: "17px 13px 17px 13px",
            background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
          }}
        >
          <b style={{ color: "#00ffe1", fontSize: 18, letterSpacing: 1 }}>
            APP-METEO
          </b>
          <div style={{ fontSize: 15.5, color: "#b8ffd9", margin: "8px 0 0 0" }}>
            App meteo full-stack sviluppata come progetto personale.<br />
            Ricerca città, previsioni dettagliate, UI responsive e dark mode.<br />
            <span style={{ color: "#ffd24c" }}>Stack:</span> React, Bootstrap, OpenWeatherMap API.
          </div>
          {/* Galleria immagini */}
          <div
            style={{
              display: "flex",
              gap: 9,
              marginTop: 12,
              alignItems: "center",
            }}
          >
            <img
              src="https://raw.githubusercontent.com/Uesone/APP-METEO/refs/heads/main/appmeteo.PNG"
              alt="Screenshot APP-METEO"
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
              }}
            />
          </div>
          {/* Link Github */}
          <a
            href="https://github.com/Uesone/APP-METEO"
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
            🔗 Vedi su GitHub
          </a>
        </li>

        {/* === SPOTIFY CLONE === */}
        <li
          style={{
            margin: "18px 0",
            borderRadius: 11,
            padding: "17px 13px 17px 13px",
            background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
          }}
        >
          <b style={{ color: "#00ffe1", fontSize: 18, letterSpacing: 1 }}>
            Spotify Clone (Mobile)
          </b>
          <div style={{ fontSize: 15.5, color: "#b8ffd9", margin: "8px 0 0 0" }}>
            Web-app mobile-first ispirata a Spotify, realizzata in React.<br />
            <span style={{ color: "#ffd24c" }}>Stack:</span> React, API REST.
          </div>
          <a
            href="https://github.com/Uesone/Epicode-W8BW2"
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
            🔗 Vedi su GitHub
          </a>
        </li>

        {/* === LFG EVENT API === */}
        <li
          style={{
            margin: "18px 0",
            borderRadius: 11,
            padding: "17px 13px 17px 13px",
            background: "linear-gradient(90deg, #232b26 95%, #1a1e17 100%)",
          }}
        >
          <b style={{ color: "#00ffe1", fontSize: 18, letterSpacing: 1 }}>
            LFG Event API
          </b>
          <div style={{ fontSize: 15.5, color: "#b8ffd9", margin: "8px 0 0 0" }}>
            Backend RESTful per gestione eventi e gruppi.<br />
            <span style={{ color: "#ffd24c" }}>Stack:</span> Java, Spring Boot, PostgreSQL.<br />
            <span style={{ color: "#ffe066" }}>Focus:</span> Autenticazione JWT, API Swagger.
          </div>
          <a
            href="https://github.com/Uesone/BW4_TEAM-2"
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
            🔗 Vedi su GitHub
          </a>
        </li>
      </ul>
    </div>
  );
}
