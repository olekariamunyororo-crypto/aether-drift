interface HudProps {
  echoes: number;
}

export function Hud({ echoes }: HudProps) {
  return (
    <div
      className="hud"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "16px 20px",
        color: "#e8e0ff",
        textShadow: "0 1px 4px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ fontSize: "0.95rem", opacity: 0.85, letterSpacing: "0.06em" }}>
        AETHER DRIFT
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(20, 15, 40, 0.55)",
          padding: "6px 14px",
          borderRadius: 20,
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(180, 140, 255, 0.25)",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#c9a0ff",
            boxShadow: "0 0 10px #b48aff",
          }}
        />
        <span style={{ fontWeight: 500 }}>{echoes}</span>
        <span style={{ opacity: 0.6, fontSize: "0.85rem" }}>echoes</span>
      </div>
    </div>
  );
}
