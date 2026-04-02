"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { easeInOutCubic } from "@/lib/space";

export function CameraController() {
  const { camera, pointer, size } = useThree();
  const positionRef = useRef(new THREE.Vector3(0, 2.2, 18.5));
  const lookAtRef = useRef(new THREE.Vector3(0, 0.15, 0));
  const driftRef = useRef(new THREE.Vector3());
  const upRef = useRef(new THREE.Vector3(0, 1, 0));
  const isMobile = size.width < 768;

  const pathCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        isMobile
          ? [
              new THREE.Vector3(-0.4, 2.25, 19.2),
              new THREE.Vector3(0.3, 1.95, 16.4),
              new THREE.Vector3(1.05, 1.2, 12.2),
              new THREE.Vector3(1.45, 0.92, 9.9),
              new THREE.Vector3(1.95, 0.6, 7.35)
            ]
          : [
              new THREE.Vector3(-0.55, 2.05, 18.4),
              new THREE.Vector3(0.2, 1.75, 15.9),
              new THREE.Vector3(1.15, 1.08, 12.1),
              new THREE.Vector3(1.9, 0.82, 9.0),
              new THREE.Vector3(2.5, 0.38, 6.05)
            ],
        false,
        "catmullrom",
        0.45
      ),
    [isMobile]
  );

  const lookCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        isMobile
          ? [
              new THREE.Vector3(0.02, 0.08, 0),
              new THREE.Vector3(0.1, 0.06, 0.1),
              new THREE.Vector3(0.34, 0.02, 0.34),
              new THREE.Vector3(0.72, -0.04, 0.82),
              new THREE.Vector3(0.98, -0.1, 1.2)
            ]
          : [
              new THREE.Vector3(0.04, 0.08, 0),
              new THREE.Vector3(0.12, 0.06, 0.08),
              new THREE.Vector3(0.4, 0.02, 0.28),
              new THREE.Vector3(0.82, -0.04, 0.82),
              new THREE.Vector3(1.1, -0.08, 1.24)
            ],
        false,
        "catmullrom",
        0.42
      ),
    [isMobile]
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const stageA = THREE.MathUtils.clamp(elapsed / 10, 0, 1);
    const stageB = THREE.MathUtils.clamp((elapsed - 8) / 8, 0, 1);
    const stageC = THREE.MathUtils.clamp((elapsed - 16) / 12, 0, 1);

    const progress =
      easeInOutCubic(stageA) * 0.42 +
      easeInOutCubic(stageB) * 0.24 +
      easeInOutCubic(stageC) * 0.34;

    const targetPosition = pathCurve.getPointAt(Math.min(progress, 0.999));
    const orbitalSweep = easeInOutCubic(stageB) * (1 - easeInOutCubic(stageC));

    driftRef.current.set(
      Math.sin(elapsed * 0.16) * (isMobile ? 0.16 : 0.22) +
        Math.sin(elapsed * 0.42) * (isMobile ? 0.05 : 0.08) +
        pointer.x * (isMobile ? 0.16 : 0.3),
      Math.cos(elapsed * 0.13) * (isMobile ? 0.05 : 0.08) +
        Math.sin(elapsed * 0.22) * (isMobile ? 0.03 : 0.05) +
        pointer.y * (isMobile ? 0.08 : 0.15),
      Math.sin(elapsed * 0.09) * 0.08 + orbitalSweep * (isMobile ? 0.12 : 0.18)
    );

    targetPosition.add(driftRef.current);

    const targetLookAt = lookCurve.getPointAt(Math.min(progress * 0.94 + 0.02, 0.999));
    targetLookAt.x += pointer.x * (isMobile ? 0.08 : 0.14);
    targetLookAt.y += pointer.y * (isMobile ? 0.04 : 0.08);

    positionRef.current.lerp(targetPosition, 1 - Math.exp(-delta * 0.68));
    lookAtRef.current.lerp(targetLookAt, 1 - Math.exp(-delta * 0.94));

    const targetFov =
      THREE.MathUtils.lerp(isMobile ? 34 : 32.5, isMobile ? 31.2 : 29.8, easeInOutCubic(stageB)) -
      THREE.MathUtils.lerp(0, isMobile ? 1.1 : 1.8, easeInOutCubic(stageC));

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 1 - Math.exp(-delta * 0.9));
      camera.updateProjectionMatrix();
    }

    upRef.current.set(pointer.x * 0.03 + Math.sin(elapsed * 0.1) * 0.02, 1, 0);
    camera.up.lerp(upRef.current.normalize(), 1 - Math.exp(-delta * 0.8));

    camera.position.copy(positionRef.current);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}
