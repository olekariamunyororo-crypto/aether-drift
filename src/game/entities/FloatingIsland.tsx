import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingIslandProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  rockColor?: string;
}

export function FloatingIsland({
  position,
  scale = 1,
  color = "#6b8f71",
  rockColor = "#5a5348",
}: FloatingIslandProps) {
  const group = useRef<THREE.Group>(null);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Gentle bobbing
    group.current.position.y =
      baseY + Math.sin(clock.elapsedTime * 0.35 + position[0]) * 0.35;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Main land mass */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[3.2, 4.5, 1.8, 8]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>

      {/* Rocky underside */}
      <mesh castShadow position={[0, -1.4, 0]}>
        <coneGeometry args={[4.2, 3.5, 7]} />
        <meshStandardMaterial color={rockColor} roughness={0.95} />
      </mesh>

      {/* Small plateau details */}
      <mesh position={[1.4, 0.95, -0.8]} castShadow>
        <boxGeometry args={[1.6, 0.4, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[-1.1, 0.9, 1.1]} castShadow>
        <boxGeometry args={[1.1, 0.35, 1.4]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}
