"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type AtmosphericEntryBandProps = {
  radius: number;
};

export function AtmosphericEntryBand({ radius }: AtmosphericEntryBandProps) {
  const shellRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const entryProgress = THREE.MathUtils.clamp((elapsed - 10) / 10, 0, 1);
    const fadeProgress = 1 - THREE.MathUtils.clamp((elapsed - 24) / 10, 0, 1);
    const strength = entryProgress * fadeProgress;

    if (shellRef.current) {
      const material = shellRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.02 + strength * 0.08;
      shellRef.current.scale.setScalar(1.12 + strength * 0.035);
      shellRef.current.rotation.y = elapsed * 0.018;
    }

    if (outerRef.current) {
      const material = outerRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.01 + strength * 0.045;
      outerRef.current.scale.setScalar(1.18 + strength * 0.05);
      outerRef.current.rotation.y = -elapsed * 0.014;
    }
  });

  return (
    <group>
      <mesh ref={shellRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color="#8ad6ff"
          transparent
          opacity={0.02}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={outerRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color="#b5e7ff"
          transparent
          opacity={0.01}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
