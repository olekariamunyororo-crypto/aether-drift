/// <reference types="vite/client" />

declare module "three-freecam" {
  import type { Camera, Object3D, Vector3 } from "three";

  export interface FreeCamOptions {
    moveSpeed?: number;
    boost?: number;
    lookSpeed?: number;
    panSpeed?: number;
    zoomSpeed?: number;
    speedStep?: number;
    moveSpeedRange?: [number, number];
    damping?: number;
    invertY?: boolean;
    maxPitch?: number;
    pointerLock?: boolean;
    keys?: Record<string, string[]>;
  }

  export class FreeCam {
    constructor(
      camera: Camera,
      domElement: HTMLElement,
      options?: FreeCamOptions
    );
    update(dt: number): void;
    focus(objectOrVector3: Object3D | Vector3, dist?: number): void;
    placeAt(position: Vector3, lookAt?: Vector3): void;
    enabled: boolean;
    pivot: Vector3;
    moveSpeed: number;
    boost: number;
    lookSpeed: number;
    panSpeed: number;
    zoomSpeed: number;
    damping: number;
    invertY: boolean;
    dispose(): void;
  }
}
