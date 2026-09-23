# Aether Drift

A calm, dreamlike free-flight exploration game built with **React**, **React Three Fiber**, and **three-freecam**.

Fly through a soft sky filled with floating islands and collect glowing Echoes.

## Stack

- Vite + React 19 + TypeScript
- three.js
- @react-three/fiber + @react-three/drei
- [three-freecam](https://github.com/hxtnv/three-freecam) – Unity-style free camera
- Fully mobile-responsive (touch joystick + look)

## Quick Start

```bash
cd aether-drift
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

### Controls

**Desktop**
- Right-drag → look
- WASD / Arrows → fly
- Q / E → down / up
- Shift → boost
- Scroll (while looking) → change speed
- F → frame pivot

**Mobile**
- Left half of screen → virtual joystick (move)
- Right half → drag to look
- Collect the purple Echo orbs by flying close to them

## Project Structure

```
src/
├── App.tsx                 # Canvas + title screen + HUD
├── game/
│   ├── camera/
│   │   └── FreeCamControls.tsx   # three-freecam wrapper for R3F
│   ├── entities/
│   │   ├── FloatingIsland.tsx
│   │   └── EchoOrb.tsx
│   └── scenes/
│       └── SkyWorld.tsx
├── ui/
│   ├── Hud.tsx
│   └── MobileControls.tsx
└── utils/
    └── device.ts
```

## Next Ideas

- Soft landing / collision with islands (Rapier)
- Day → night cycle that shifts fog & lighting
- More islands + procedural generation
- Ambient audio layers that unlock with Echoes
- Interior portals
- PWA install prompt

## License

MIT
