"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { latLongToVector3 } from "@/lib/space";

export type SystemNode = {
  id: string;
  lat: number;
  lon: number;
  type: "data" | "power" | "monitor";
  scale?: number;
};

type NodesProps = {
  radius: number;
  nodes: SystemNode[];
};

export function Nodes({ radius, nodes }: NodesProps) {
  const dataRef = useRef<THREE.InstancedMesh>(null);
  const powerRef = useRef<THREE.InstancedMesh>(null);
  const monitorRef = useRef<THREE.InstancedMesh>(null);
  const ringRefs = useRef<Array<THREE.Group | null>>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        position: latLongToVector3(radius + 0.03, node.lat, node.lon)
      })),
    [nodes, radius]
  );

  const grouped = useMemo(
    () => ({
      data: positions.filter((node) => node.type === "data"),
      power: positions.filter((node) => node.type === "power"),
      monitor: positions.filter((node) => node.type === "monitor")
    }),
    [positions]
  );

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    [
      { ref: dataRef, nodes: grouped.data, baseScale: 0.052 },
      { ref: powerRef, nodes: grouped.power, baseScale: 0.074 },
      { ref: monitorRef, nodes: grouped.monitor, baseScale: 0.044 }
    ].forEach(({ ref, nodes: items, baseScale }) => {
      if (!ref.current) {
        return;
      }

      items.forEach((node, index) => {
        const pulse = 1 + Math.sin(elapsed * 1.8 + index * 0.6) * 0.16;
        const scale = baseScale * (node.scale ?? 1) * pulse;
        dummy.position.copy(node.position);
        dummy.scale.setScalar(scale);
        dummy.lookAt(node.position.clone().multiplyScalar(1.8));
        dummy.updateMatrix();
        ref.current?.setMatrixAt(index, dummy.matrix);
      });

      ref.current.instanceMatrix.needsUpdate = true;
    });

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      const spread = 0.8 + ((elapsed * 0.22 + index * 0.18) % 1.2);
      ring.scale.setScalar(spread);
      ring.children.forEach((child, childIndex) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = Math.max(0.04, 0.16 - childIndex * 0.04 - spread * 0.05);
      });
    });
  });

  return (
    <group>
      <instancedMesh ref={dataRef} args={[undefined, undefined, grouped.data.length]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color="#82d4ff" emissive="#18b6ff" emissiveIntensity={1.4} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={powerRef} args={[undefined, undefined, grouped.power.length]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ffd39a" emissive="#ff9e52" emissiveIntensity={1.1} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={monitorRef} args={[undefined, undefined, grouped.monitor.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#a5b4fc" emissive="#638dff" emissiveIntensity={1.2} toneMapped={false} />
      </instancedMesh>

      {positions.map((node, index) => (
        <group
          key={node.id}
          ref={(element) => {
            ringRefs.current[index] = element;
          }}
          position={node.position}
        >
          <mesh>
            <ringGeometry args={[0.07, 0.085, 32]} />
            <meshBasicMaterial
              color={node.type === "power" ? "#ffb777" : node.type === "monitor" ? "#8ea7ff" : "#5ed0ff"}
              transparent
              opacity={0.12}
              depthWrite={false}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
          {node.type === "monitor" ? (
            <Line
              points={[
                new THREE.Vector3(-0.08, 0, 0),
                new THREE.Vector3(0.08, 0, 0),
                new THREE.Vector3(0, 0.12, 0),
                new THREE.Vector3(-0.08, 0, 0)
              ]}
              color="#9db1ff"
              lineWidth={0.8}
              transparent
              opacity={0.22}
            />
          ) : null}
        </group>
      ))}
    </group>
  );
}
