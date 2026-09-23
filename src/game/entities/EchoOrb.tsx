import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EchoOrbProps {
  position: [number, number, number];
  onCollect: () => void;
}

export function EchoOrb({ position, onCollect }: EchoOrbProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const [collected, setCollected] = useState(false);
  const baseY = position[1];

  useFrame(({ clock, camera }) => {
    if (collected || !mesh.current) return;

    const t = clock.elapsedTime;
    mesh.current.position.y = baseY + Math.sin(t * 1.8 + position[0]) * 0.45;
    mesh.current.rotation.y = t * 0.7;

    // Soft pulse
    const pulse = 0.7 + Math.sin(t * 3) * 0.3;
    if (light.current) light.current.intensity = pulse * 2.2;

    // Simple distance collect
    const dist = camera.position.distanceTo(mesh.current.position);
    if (dist < 2.4) {
      setCollected(true);
      onCollect();
    }
  });

  if (collected) return null;

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#c9a0ff"
          emissive="#9b6dff"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <pointLight
        ref={light}
        color="#b48aff"
        intensity={2}
        distance={12}
        decay={2}
      />
    </group>
  );
}
