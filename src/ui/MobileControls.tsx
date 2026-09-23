import { useRef, useEffect, useCallback } from "react";

/**
 * Simple dual-zone touch controls for mobile:
 * - Left half  → virtual joystick (movement)
 * - Right half → look drag (feeds synthetic mouse events into FreeCam)
 *
 * FreeCam already listens on the canvas for pointer events.
 * We only need to inject movement keys-like behaviour.
 */
export function MobileControls() {
  const leftZone = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const origin = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const keys = useRef({ w: false, a: false, s: false, d: false, q: false, e: false });

  // Inject key-like state into FreeCam by dispatching KeyboardEvents
  // (FreeCam listens on window for keys)
  const syncKeys = useCallback(() => {
    const map: Record<string, string> = {
      w: "KeyW",
      a: "KeyA",
      s: "KeyS",
      d: "KeyD",
      q: "KeyQ",
      e: "KeyE",
    };
    for (const [k, code] of Object.entries(map)) {
      const down = (keys.current as any)[k];
      window.dispatchEvent(
        new KeyboardEvent(down ? "keydown" : "keyup", { code, key: k })
      );
    }
  }, []);

  useEffect(() => {
    const zone = leftZone.current;
    if (!zone) return;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const rect = zone.getBoundingClientRect();
      // Only react if touch started in left half
      if (t.clientX > window.innerWidth * 0.45) return;

      active.current = true;
      origin.current = { x: t.clientX, y: t.clientY };
      if (stick.current) {
        stick.current.style.opacity = "1";
        stick.current.style.transform = `translate(${t.clientX - rect.left - 35}px, ${t.clientY - rect.top - 35}px)`;
      }
    };

    const onMove = (e: TouchEvent) => {
      if (!active.current || e.touches.length === 0) return;
      const t = e.touches[0];
      const dx = t.clientX - origin.current.x;
      const dy = t.clientY - origin.current.y;
      const max = 55;
      const len = Math.hypot(dx, dy);
      const clamped = len > max ? max / len : 1;
      const cx = dx * clamped;
      const cy = dy * clamped;

      if (stick.current) {
        const rect = zone.getBoundingClientRect();
        stick.current.style.transform = `translate(${origin.current.x - rect.left - 35 + cx}px, ${origin.current.y - rect.top - 35 + cy}px)`;
      }

      // Map to WASD-ish
      const dead = 12;
      keys.current.w = cy < -dead;
      keys.current.s = cy > dead;
      keys.current.a = cx < -dead;
      keys.current.d = cx > dead;
      syncKeys();
    };

    const onEnd = () => {
      active.current = false;
      keys.current = { w: false, a: false, s: false, d: false, q: false, e: false };
      syncKeys();
      if (stick.current) {
        stick.current.style.opacity = "0.35";
        stick.current.style.transform = "translate(40px, 40px)";
      }
    };

    zone.addEventListener("touchstart", onStart, { passive: true });
    zone.addEventListener("touchmove", onMove, { passive: true });
    zone.addEventListener("touchend", onEnd);
    zone.addEventListener("touchcancel", onEnd);

    return () => {
      zone.removeEventListener("touchstart", onStart);
      zone.removeEventListener("touchmove", onMove);
      zone.removeEventListener("touchend", onEnd);
      zone.removeEventListener("touchcancel", onEnd);
    };
  }, [syncKeys]);

  return (
    <div
      ref={leftZone}
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "45%",
        height: "45%",
        zIndex: 15,
        pointerEvents: "auto",
        touchAction: "none",
      }}
    >
      {/* Visual joystick base */}
      <div
        style={{
          position: "absolute",
          left: 28,
          bottom: 28,
          width: 110,
          height: 110,
          borderRadius: "50%",
          border: "2px solid rgba(180, 140, 255, 0.25)",
          background: "rgba(20, 15, 40, 0.35)",
          backdropFilter: "blur(6px)",
        }}
      />
      {/* Stick */}
      <div
        ref={stick}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "rgba(180, 140, 255, 0.45)",
          border: "2px solid rgba(200, 170, 255, 0.6)",
          opacity: 0.35,
          transform: "translate(40px, 40px)",
          transition: "opacity 0.15s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
