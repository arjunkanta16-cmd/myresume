"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type MoonProps = {
  orbitRadius?: number;
  radius?: number;
};

export function Moon({ orbitRadius = 4.55, radius = 0.46 }: MoonProps) {
  const moonPivotRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const moonGlowRef = useRef<THREE.Mesh>(null);
  const moonMap = useTexture("/textures/space/moon.jpg");

  useMemo(() => {
    moonMap.colorSpace = THREE.SRGBColorSpace;
    moonMap.anisotropy = 8;
  }, [moonMap]);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime * 0.24;

    if (moonPivotRef.current) {
      moonPivotRef.current.position.set(
        orbitRadius * Math.cos(elapsed),
        Math.sin(elapsed * 1.3) * 0.38,
        orbitRadius * Math.sin(elapsed)
      );
    }

    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.04;
    }

    if (moonGlowRef.current) {
      moonGlowRef.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <group ref={moonPivotRef}>
      <mesh ref={moonRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial map={moonMap} roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh ref={moonGlowRef} scale={1.18}>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial color="#b8d8ff" transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </group>
  );
}
