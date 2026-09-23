import { useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { FreeCam } from "three-freecam";
import { isMobile } from "../../utils/device";

/**
 * Wraps three-freecam for React Three Fiber.
 * On desktop: full FreeCam behaviour (right-drag look, WASD, etc.)
 * On mobile: FreeCam still runs for look math, but movement is driven
 * by the virtual joystick via window events we dispatch from MobileControls.
 */
export function FreeCamControls({ enabled = true }: { enabled?: boolean }) {
  const { camera, gl } = useThree();
  const mobile = isMobile();

  const fly = useMemo(() => {
    const instance = new FreeCam(camera, gl.domElement, {
      moveSpeed: mobile ? 10 : 14,
      boost: 3.5,
      lookSpeed: mobile ? 0.003 : 0.0022,
      panSpeed: 0.0015,
      zoomSpeed: 0.12,
      damping: 0.12, // soft glide feels better for a dreamy game
      invertY: false,
      pointerLock: !mobile, // pointer lock is awkward on touch devices
    });
    return instance;
  }, [camera, gl, mobile]);

  useEffect(() => {
    fly.enabled = enabled;
    return () => {
      fly.dispose();
    };
  }, [fly, enabled]);

  // Expose a simple global API so MobileControls can push movement
  useEffect(() => {
    (window as any).__aetherFly = fly;
    return () => {
      delete (window as any).__aetherFly;
    };
  }, [fly]);

  useFrame((_, delta) => {
    if (!enabled) return;
    fly.update(delta);
  });

  return null;
}
