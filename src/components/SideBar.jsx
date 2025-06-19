const Sidebar = ({ sections, selected, onSelect, disabled, btnBg, btnBgActive }) => (
  <nav
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "transparent",
      padding: "10px",
      gap: 16,
    }}
  >
    {sections.map((section) => (
      <button
        key={section.key}
        onClick={() => onSelect(section.key)}
        disabled={disabled}
        style={{
          width: 64,
          height: 64,
          padding: 0,
          border: "none",
          background: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          position: "relative",
          outline: "none",
        }}
      >
        <img
          src={selected === section.key ? btnBgActive : btnBg}
          alt=""
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 64,
            height: 64,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
          draggable={false}
        />
        <img
          src={section.icon}
          alt={section.label}
          style={{
            width: 36,
            height: 36,
            position: "absolute",
            left: 14,
            top: 14,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
          draggable={false}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: -20,
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "#fff",
          }}
        >
          {section.label}
        </span>
      </button>
    ))}
  </nav>
);

export default Sidebar;
