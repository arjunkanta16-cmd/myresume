"use client";

import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { AdaptiveDpr, Environment, Lightformer, PerformanceMonitor, Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { CameraController } from "@/components/space/CameraController";
import { AtmosphericEntryBand } from "@/components/space/AtmosphericEntryBand";
import { Earth } from "@/components/space/Earth";
import { Effects } from "@/components/space/Effects";
import { Moon } from "@/components/space/Moon";
import { Satellites } from "@/components/space/Satellites";

const starVertexShader = `
  attribute float aScale;
  attribute float aOffset;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.78 + 0.22 * sin(uTime * (0.42 + aScale * 0.75) + aOffset * 6.2831853);
    vAlpha = twinkle;
    gl_PointSize = uSize * aScale * uPixelRatio * (220.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distance = length(point);
    float halo = smoothstep(0.5, 0.0, distance);
    float core = smoothstep(0.18, 0.0, distance);
    float alpha = (halo * 0.65 + core * 0.35) * uOpacity * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function StarField({
  count,
  radius,
  size,
  color,
  opacity
}: {
  count: number;
  radius: number;
  size: number;
  color: string;
  opacity: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const distance = THREE.MathUtils.randFloat(radius * 0.45, radius);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const i = index * 3;

      positions[i] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = distance * Math.cos(phi);
      positions[i + 2] = distance * Math.sin(phi) * Math.sin(theta);
      scales[index] = THREE.MathUtils.randFloat(0.7, 1.35);
      offsets[index] = Math.random();
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    bufferGeometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    return bufferGeometry;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color(color) },
      uPixelRatio: { value: 1 }
    }),
    [color, opacity, size]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    }
  });

  return (
    <points frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
}

function DeepSpaceBackdrop() {
  const { size } = useThree();
  const backdropRef = useRef<THREE.Group>(null);
  const isMobile = size.width < 768;

  useFrame((state) => {
    if (backdropRef.current) {
      backdropRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={backdropRef}>
      <StarField count={isMobile ? 1200 : 2600} radius={80} size={0.06} color="#d7e9ff" opacity={0.95} />
      <StarField count={isMobile ? 760 : 1600} radius={56} size={0.045} color="#7ebdff" opacity={0.45} />
      <StarField count={isMobile ? 440 : 950} radius={40} size={0.03} color="#f4f7ff" opacity={0.4} />
    </group>
  );
}

function NebulaVeils() {
  const veils = [
    { position: [-15, 5, -18] as [number, number, number], scale: 10, color: "#19325d", opacity: 0.07 },
    { position: [14, -4, -16] as [number, number, number], scale: 8.5, color: "#143c61", opacity: 0.05 },
    { position: [0, 10, -24] as [number, number, number], scale: 12, color: "#1d2247", opacity: 0.05 }
  ];

  return (
    <group>
      {veils.map((veil) => (
        <mesh key={veil.position.join("-")} position={veil.position} scale={veil.scale}>
          <sphereGeometry args={[1, 28, 28]} />
          <meshBasicMaterial color={veil.color} transparent opacity={veil.opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const isTablet = size.width < 1100;

  return (
    <>
      <fogExp2 attach="fog" args={["#030917", 0.045]} />
      <ambientLight intensity={isMobile ? 0.1 : 0.12} />
      <hemisphereLight color="#8ab7ff" groundColor="#02040b" intensity={isMobile ? 0.18 : 0.22} />
      <directionalLight
        position={[12, 4, 10]}
        intensity={2.85}
        color="#f3f7ff"
      />
      <pointLight position={[-12, 8, -16]} intensity={isMobile ? 0.38 : 0.55} color="#4db8ff" distance={70} />
      <pointLight position={[8, -2, 14]} intensity={isMobile ? 0.3 : 0.45} color="#ffe2b0" distance={40} />

      <Environment resolution={isMobile ? 64 : 128}>
        <Lightformer intensity={1.9} color="#67b7ff" position={[8, 2, -6]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color="#dce8ff" position={[-10, 5, 6]} scale={[6, 6, 1]} />
        <Lightformer intensity={0.6} color="#1b3357" position={[0, -8, -10]} scale={[20, 8, 1]} />
      </Environment>

      <mesh position={[16, 6, -20]} scale={5.5}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#6fc0ff" transparent opacity={0.08} depthWrite={false} />
      </mesh>

      <NebulaVeils />
      <DeepSpaceBackdrop />
      <group rotation={[0.16, -0.42, 0]}>
        <AtmosphericEntryBand radius={2.52} />
        <Earth />
        <Moon />
        <Satellites />
      </group>

      <CameraController />
      <Effects />

      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.2, 18.5], fov: 33, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#030917"]} />
      <PerformanceMonitor />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
