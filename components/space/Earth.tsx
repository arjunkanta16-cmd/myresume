"use client";

import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { Atmosphere } from "@/components/space/Atmosphere";
import { NetworkLayer } from "@/components/space/NetworkLayer";

type EarthProps = {
  radius?: number;
};

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D normalMap;
  uniform sampler2D specularMap;
  uniform sampler2D cloudsMap;
  uniform vec3 sunDirection;
  uniform float cloudRotation;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  vec2 rotateUv(vec2 uv, float angle) {
    vec2 centered = uv - 0.5;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotation = mat2(c, -s, s, c);
    return rotation * centered + 0.5;
  }

  void main() {
    vec3 sampledNormal = texture2D(normalMap, vUv).rgb * 2.0 - 1.0;
    vec3 normal = normalize(vNormal + sampledNormal * 0.32);
    vec3 lightDirection = normalize(sunDirection);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    float diffuse = dot(normal, lightDirection);
    float daylight = smoothstep(-0.18, 0.22, diffuse);
    float twilight = 1.0 - abs(smoothstep(-0.1, 0.14, diffuse) - 0.5) * 2.0;
    float nightside = 1.0 - smoothstep(-0.04, 0.18, diffuse);

    vec3 dayColor = texture2D(dayMap, vUv).rgb;
    vec3 nightSample = texture2D(nightMap, vUv).rgb;
    vec4 cloudSample = texture2D(cloudsMap, rotateUv(vUv, cloudRotation));
    float cloudMask = max(max(cloudSample.r, cloudSample.g), max(cloudSample.b, cloudSample.a));
    float cloudShadow = cloudMask * smoothstep(0.04, 0.58, diffuse) * 0.16;
    dayColor *= 1.0 - cloudShadow;
    vec3 nightColor = nightSample * (1.05 + twilight * 0.35);
    vec3 baseColor = mix(nightColor, dayColor, daylight);

    float specularMask = texture2D(specularMap, vUv).r;
    vec3 halfVector = normalize(lightDirection + viewDirection);
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 3.2);
    float oceanHighlight = pow(max(dot(normal, halfVector), 0.0), 54.0) * specularMask * max(daylight, 0.0);
    float cloudlineBoost = twilight * 0.12;
    float cityLightMask = max(max(nightSample.r, nightSample.g), nightSample.b);
    float cityLightGlow = cityLightMask * nightside * (0.95 + twilight * 0.45);
    float limbScatter = fresnel * (0.08 + daylight * 0.06);

    vec3 color = baseColor;
    color += vec3(0.58, 0.74, 0.92) * oceanHighlight * (0.34 + fresnel * 0.6);
    color += vec3(1.0, 0.66, 0.38) * cityLightGlow * 0.42;
    color += vec3(0.36, 0.52, 0.82) * limbScatter;
    color += vec3(0.12, 0.19, 0.3) * cloudlineBoost;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Earth({ radius = 2.35 }: EarthProps) {
  const earthRef = useRef<THREE.Group>(null);
  const surfaceRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);
  const cloudRotationRef = useRef(0);

  const [dayMap, nightMap, normalMap, specularMap, cloudsMap] = useTexture([
    "/textures/space/earth-day.jpg",
    "/textures/space/earth-night.png",
    "/textures/space/earth-normal.jpg",
    "/textures/space/earth-specular.jpg",
    "/textures/space/earth-clouds.png"
  ]);

  useMemo(() => {
    [dayMap, nightMap, cloudsMap].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    });

    [normalMap, specularMap].forEach((texture) => {
      texture.anisotropy = 8;
    });
  }, [cloudsMap, dayMap, nightMap, normalMap, specularMap]);

  const sunDirection = useMemo(() => new THREE.Vector3(12, 4, 10).normalize(), []);

  const surfaceUniforms = useMemo(
    () => ({
      dayMap: { value: dayMap },
      nightMap: { value: nightMap },
      normalMap: { value: normalMap },
      specularMap: { value: specularMap },
      cloudsMap: { value: cloudsMap },
      sunDirection: { value: sunDirection },
      cloudRotation: { value: 0 }
    }),
    [cloudsMap, dayMap, nightMap, normalMap, specularMap, sunDirection]
  );

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
      earthRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
    }

    if (surfaceRef.current) {
      const material = surfaceRef.current.material as THREE.ShaderMaterial;
      material.uniforms.sunDirection.value.copy(sunDirection);
      material.uniforms.cloudRotation.value = cloudRotationRef.current;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.115;
      cloudRotationRef.current += delta * 0.115;
    }

    if (rimRef.current) {
      rimRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={earthRef}>
      <mesh ref={surfaceRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial
          uniforms={surfaceUniforms}
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Atmosphere radius={radius} />

      <mesh ref={rimRef} scale={1.04}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhysicalMaterial
          color="#8bd6ff"
          transparent
          opacity={0.08}
          depthWrite={false}
          roughness={0.1}
          metalness={0}
          transmission={0.2}
          clearcoat={1}
          clearcoatRoughness={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <NetworkLayer radius={radius} />
    </group>
  );
}
