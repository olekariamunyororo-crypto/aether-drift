import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { SkyWorld } from "./game/scenes/SkyWorld";
import { Hud } from "./ui/Hud";
import { MobileControls } from "./ui/MobileControls";
import { isMobile } from "./utils/device";

export default function App() {
  const [started, setStarted] = useState(false);
  const [echoes, setEchoes] = useState(0);
  const mobile = isMobile();

  // Prevent pull-to-refresh / overscroll on mobile
  useEffect(() => {
    const prevent = (e: TouchEvent) => e.preventDefault();
    document.body.addEventListener("touchmove", prevent, { passive: false });
    return () => document.body.removeEventListener("touchmove", prevent);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 8, 18], fov: 60, near: 0.1, far: 800 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <SkyWorld
            started={started}
            onCollect={() => setEchoes((e) => e + 1)}
          />
        </Suspense>
      </Canvas>

      {!started && (
        <div
          onClick={() => setStarted(true)}
          onTouchEnd={() => setStarted(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 100%)",
            color: "#e8e0ff",
            cursor: "pointer",
            zIndex: 20,
            userSelect: "none",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.2rem, 8vw, 4rem)",
              fontWeight: 300,
              letterSpacing: "0.15em",
              margin: 0,
              textShadow: "0 0 40px rgba(180, 140, 255, 0.6)",
            }}
          >
            AETHER DRIFT
          </h1>
          <p
            style={{
              marginTop: 16,
              opacity: 0.7,
              fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
              letterSpacing: "0.08em",
            }}
          >
            {mobile ? "Tap to begin" : "Click to begin"}
          </p>
          <p
            style={{
              marginTop: 48,
              opacity: 0.45,
              fontSize: "0.85rem",
              maxWidth: 320,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {mobile
              ? "Left stick to fly · Right drag to look · Collect the glowing echoes"
              : "Right-drag look · WASD fly · Q/E up-down · Scroll speed · Collect echoes"}
          </p>
        </div>
      )}

      {started && (
        <>
          <Hud echoes={echoes} />
          {mobile && <MobileControls />}
        </>
      )}
    </div>
  );
}
