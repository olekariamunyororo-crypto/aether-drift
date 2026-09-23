import { useMemo } from "react";
import { Stars, Cloud, Float } from "@react-three/drei";
import { FreeCamControls } from "../camera/FreeCamControls";
import { FloatingIsland } from "../entities/FloatingIsland";
import { EchoOrb } from "../entities/EchoOrb";
import * as THREE from "three";

interface SkyWorldProps {
  started: boolean;
  onCollect: () => void;
}

const ISLANDS = [
  { pos: [0, 0, 0] as [number, number, number], scale: 1.4, color: "#6b8f71" },
  { pos: [18, 4, -12] as [number, number, number], scale: 1.0, color: "#7a9e78" },
  { pos: [-22, -2, 8] as [number, number, number], scale: 1.2, color: "#5f7d62" },
  { pos: [8, 9, 22] as [number, number, number], scale: 0.9, color: "#8aab85" },
  { pos: [-14, 6, -20] as [number, number, number], scale: 1.1, color: "#6d8a70" },
  { pos: [28, -1, 14] as [number, number, number], scale: 0.85, color: "#759476" },
  { pos: [-30, 3, -6] as [number, number, number], scale: 1.3, color: "#648067" },
];

const ORBS: [number, number, number][] = [
  [3, 3, 2],
  [16, 7, -10],
  [-19, 2, 6],
  [10, 12, 20],
  [-12, 9, -18],
  [26, 2, 12],
  [-28, 6, -4],
  [0, 5, -8],
  [5, 2, 15],
  [-8, 4, -5],
];

export function SkyWorld({ started, onCollect }: SkyWorldProps) {
  const fogColor = useMemo(() => new THREE.Color("#1a1a2e"), []);

  return (
    <>
      {/* Atmosphere */}
      <color attach="background" args={["#0d0d1f"]} />
      <fog attach="fog" args={[fogColor, 40, 180]} />

      <ambientLight intensity={0.35} color="#b8c4ff" />
      <directionalLight
        position={[30, 50, 20]}
        intensity={1.1}
        color="#ffe8c8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight args={["#c8d4ff", "#2a2a3a", 0.5]} />

      <Stars
        radius={220}
        depth={60}
        count={1800}
        factor={3.5}
        saturation={0.3}
        fade
        speed={0.4}
      />

      {/* Soft clouds */}
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.3}>
        <Cloud
          position={[-20, 18, -30]}
          speed={0.15}
          opacity={0.35}
          color="#d4c8ff"
        />
      </Float>
      <Float speed={0.3} rotationIntensity={0.04} floatIntensity={0.25}>
        <Cloud
          position={[25, 22, 10]}
          speed={0.12}
          opacity={0.3}
          color="#c8d4ff"
        />
      </Float>

      {/* Islands */}
      {ISLANDS.map((island, i) => (
        <FloatingIsland
          key={i}
          position={island.pos}
          scale={island.scale}
          color={island.color}
        />
      ))}

      {/* Collectible echoes */}
      {ORBS.map((pos, i) => (
        <EchoOrb key={i} position={pos} onCollect={onCollect} />
      ))}

      {/* Free camera – only active after the player starts */}
      <FreeCamControls enabled={started} />
    </>
  );
}
