"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { Nodes, type SystemNode } from "@/components/space/Nodes";
import { createBezierArcPoints, latLongToVector3 } from "@/lib/space";

type NetworkLayerProps = {
  radius: number;
};

type FlowConfig = {
  id: string;
  start: string;
  end: string;
  color: string;
  opacity: number;
  speed: number;
  elevation: number;
};

const systemNodes: SystemNode[] = [
  { id: "india-core", lat: 20.5937, lon: 78.9629, type: "data", scale: 1.15 },
  { id: "hyderabad-grid", lat: 17.385, lon: 78.4867, type: "power", scale: 1.2 },
  { id: "dubai-link", lat: 25.2048, lon: 55.2708, type: "data" },
  { id: "frankfurt", lat: 50.1109, lon: 8.6821, type: "data" },
  { id: "singapore-hub", lat: 1.3521, lon: 103.8198, type: "data", scale: 1.05 },
  { id: "tokyo-monitor", lat: 35.6762, lon: 139.6503, type: "monitor", scale: 1.05 },
  { id: "sydney-grid", lat: -33.8688, lon: 151.2093, type: "power" },
  { id: "washington-monitor", lat: 38.9072, lon: -77.0369, type: "monitor" }
];

const flowConfigs: FlowConfig[] = [
  { id: "india-singapore", start: "india-core", end: "singapore-hub", color: "#63d1ff", opacity: 0.24, speed: 0.055, elevation: 0.62 },
  { id: "india-dubai", start: "india-core", end: "dubai-link", color: "#63d1ff", opacity: 0.22, speed: 0.05, elevation: 0.48 },
  { id: "dubai-frankfurt", start: "dubai-link", end: "frankfurt", color: "#6eb8ff", opacity: 0.2, speed: 0.046, elevation: 0.72 },
  { id: "singapore-tokyo", start: "singapore-hub", end: "tokyo-monitor", color: "#7fd8ff", opacity: 0.24, speed: 0.058, elevation: 0.66 },
  { id: "frankfurt-washington", start: "frankfurt", end: "washington-monitor", color: "#8abaff", opacity: 0.18, speed: 0.038, elevation: 0.88 },
  { id: "india-sydney", start: "india-core", end: "sydney-grid", color: "#ffb676", opacity: 0.18, speed: 0.032, elevation: 0.82 }
];

function FlowArc({
  points,
  color,
  opacity,
  speed,
  index
}: {
  points: THREE.Vector3[];
  color: string;
  opacity: number;
  speed: number;
  index: number;
}) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const particleRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const progress = (state.clock.elapsedTime * speed + index * 0.17) % 1;
    const point = curve.getPointAt(progress);
    particleRef.current?.position.copy(point);
    pulseRef.current?.position.copy(point);

    if (pulseRef.current) {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 3.4 + index) * 0.24;
      pulseRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={0.95} transparent opacity={opacity} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.036, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.96} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.072, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function NetworkLayer({ radius }: NetworkLayerProps) {
  const nodePositions = useMemo(
    () =>
      Object.fromEntries(
        systemNodes.map((node) => [node.id, latLongToVector3(radius + 0.03, node.lat, node.lon)])
      ) as Record<string, THREE.Vector3>,
    [radius]
  );

  const arcs = useMemo(
    () =>
      flowConfigs.map((flow) => ({
        ...flow,
        points: createBezierArcPoints(nodePositions[flow.start], nodePositions[flow.end], flow.elevation, 80)
      })),
    [nodePositions]
  );

  return (
    <group>
      <Nodes radius={radius} nodes={systemNodes} />
      {arcs.map((arc, index) => (
        <FlowArc
          key={arc.id}
          points={arc.points}
          color={arc.color}
          opacity={arc.opacity}
          speed={arc.speed}
          index={index}
        />
      ))}
    </group>
  );
}
