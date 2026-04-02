"use client";

import { useMemo } from "react";
import * as THREE from "three";

type AtmosphereProps = {
  radius: number;
  color?: string;
  intensity?: number;
};

const atmosphereVertexShader = `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vWorldNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 glowColor;
  uniform float intensity;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.12 - dot(vWorldNormal, viewDirection), 4.8);
    gl_FragColor = vec4(glowColor, fresnel * intensity);
  }
`;

export function Atmosphere({ radius, color = "#6ec8ff", intensity = 0.36 }: AtmosphereProps) {
  const uniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity }
    }),
    [color, intensity]
  );

  return (
    <mesh scale={1.1}>
      <sphereGeometry args={[radius, 72, 72]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
