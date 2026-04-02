"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { orbitPosition } from "@/lib/space";

type OrbitConfig = {
  radius: number;
  speed: number;
  phase: number;
  inclination: number;
  altitudeWave: number;
};

export function Satellites() {
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const leftPanelRef = useRef<THREE.InstancedMesh>(null);
  const rightPanelRef = useRef<THREE.InstancedMesh>(null);
  const leftStrutRef = useRef<THREE.InstancedMesh>(null);
  const rightStrutRef = useRef<THREE.InstancedMesh>(null);
  const mastRef = useRef<THREE.InstancedMesh>(null);
  const dishRef = useRef<THREE.InstancedMesh>(null);
  const sensorRef = useRef<THREE.InstancedMesh>(null);
  const beaconRef = useRef<THREE.InstancedMesh>(null);
  const beaconHaloRef = useRef<THREE.InstancedMesh>(null);
  const defenseNodeRef = useRef<THREE.InstancedMesh>(null);

  const satelliteConfigs = useMemo<OrbitConfig[]>(
    () => [
      { radius: 5.6, speed: 0.34, phase: 0.4, inclination: Math.PI * 0.16, altitudeWave: 0.22 },
      { radius: 6.15, speed: 0.28, phase: 1.8, inclination: -Math.PI * 0.28, altitudeWave: 0.18 },
      { radius: 5.85, speed: 0.31, phase: 3.2, inclination: Math.PI * 0.36, altitudeWave: 0.2 },
      { radius: 6.4, speed: 0.24, phase: 4.9, inclination: -Math.PI * 0.18, altitudeWave: 0.26 },
      { radius: 5.45, speed: 0.37, phase: 5.4, inclination: Math.PI * 0.08, altitudeWave: 0.16 }
    ],
    []
  );

  const defenseConfigs = useMemo<OrbitConfig[]>(
    () => [
      { radius: 6.95, speed: 0.12, phase: 0, inclination: Math.PI * 0.22, altitudeWave: 0.1 },
      { radius: 7.2, speed: 0.1, phase: 2.1, inclination: -Math.PI * 0.18, altitudeWave: 0.08 },
      { radius: 7.05, speed: 0.11, phase: 4.2, inclination: Math.PI * 0.34, altitudeWave: 0.12 }
    ],
    []
  );

  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const quaternion = useMemo(() => new THREE.Quaternion(), []);
  const scale = useMemo(() => new THREE.Vector3(), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const normal = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const basis = useMemo(() => new THREE.Matrix4(), []);
  const orbitAxis = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    satelliteConfigs.forEach((config, index) => {
      const angle = elapsed * config.speed + config.phase;
      position.copy(orbitPosition(config.radius, angle, config.inclination, config.altitudeWave));

      tangent
        .set(-Math.sin(angle), Math.cos(angle * 1.6) * config.altitudeWave * 0.35, Math.cos(angle))
        .applyAxisAngle(orbitAxis, config.inclination)
        .normalize();
      normal.copy(position).normalize();
      right.crossVectors(normal, tangent).normalize();
      basis.makeBasis(right, normal, tangent);
      quaternion.setFromRotationMatrix(basis);

      scale.set(1, 1, 1);
      matrix.compose(position, quaternion, scale);
      bodyRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(position.clone().add(right.clone().multiplyScalar(-0.24)), quaternion, scale);
      leftPanelRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(position.clone().add(right.clone().multiplyScalar(0.24)), quaternion, scale);
      rightPanelRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(position.clone().add(right.clone().multiplyScalar(-0.13)), quaternion, scale);
      leftStrutRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(position.clone().add(right.clone().multiplyScalar(0.13)), quaternion, scale);
      rightStrutRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(position.clone().add(normal.clone().multiplyScalar(0.12)), quaternion, scale);
      mastRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(
        position
          .clone()
          .add(tangent.clone().multiplyScalar(0.18))
          .add(normal.clone().multiplyScalar(0.08)),
        quaternion,
        scale
      );
      dishRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(
        position
          .clone()
          .add(tangent.clone().multiplyScalar(-0.14))
          .add(normal.clone().multiplyScalar(0.06)),
        quaternion,
        scale
      );
      sensorRef.current?.setMatrixAt(index, matrix);

      scale.set(1, 1, 1);
      matrix.compose(
        position
          .clone()
          .add(normal.clone().multiplyScalar(0.17))
          .add(right.clone().multiplyScalar(0.03)),
        quaternion,
        scale
      );
      beaconRef.current?.setMatrixAt(index, matrix);

      const blink = 0.75 + Math.sin(elapsed * 4.2 + index * 1.7) * 0.28;
      scale.setScalar(Math.max(0.7, blink));
      matrix.compose(
        position
          .clone()
          .add(normal.clone().multiplyScalar(0.17))
          .add(right.clone().multiplyScalar(0.03)),
        quaternion,
        scale
      );
      beaconHaloRef.current?.setMatrixAt(index, matrix);
    });

    defenseConfigs.forEach((config, index) => {
      const angle = elapsed * config.speed + config.phase;
      const defensePosition = orbitPosition(config.radius, angle, config.inclination, config.altitudeWave);
      scale.setScalar(1);
      matrix.compose(defensePosition, quaternion.identity(), scale);
      defenseNodeRef.current?.setMatrixAt(index, matrix);
    });

    [bodyRef, leftPanelRef, rightPanelRef, leftStrutRef, rightStrutRef, mastRef, dishRef, sensorRef, beaconRef, beaconHaloRef, defenseNodeRef].forEach((ref) => {
      if (ref.current) {
        ref.current.instanceMatrix.needsUpdate = true;
      }
    });
  });

  return (
    <group>
      {satelliteConfigs.map((config, index) => (
        <mesh
          key={`orbit-${index}`}
          rotation={[Math.PI / 2, 0, config.inclination]}
        >
          <torusGeometry args={[config.radius, 0.007, 8, 160]} />
          <meshBasicMaterial color="#5ba7ff" transparent opacity={0.08} depthWrite={false} />
        </mesh>
      ))}

      {defenseConfigs.map((config, index) => (
        <mesh
          key={`defense-orbit-${index}`}
          rotation={[Math.PI / 2, 0, config.inclination]}
        >
          <torusGeometry args={[config.radius, 0.006, 8, 180]} />
          <meshBasicMaterial color="#89e4ff" transparent opacity={0.05} depthWrite={false} />
        </mesh>
      ))}

      <instancedMesh ref={bodyRef} args={[undefined, undefined, satelliteConfigs.length]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.13, 0.13]} />
        <meshStandardMaterial color="#b7c3d7" metalness={0.82} roughness={0.28} />
      </instancedMesh>

      <instancedMesh ref={leftPanelRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <boxGeometry args={[0.32, 0.035, 0.17]} />
        <meshStandardMaterial color="#3f8cff" emissive="#10357a" emissiveIntensity={0.34} metalness={0.6} roughness={0.36} />
      </instancedMesh>

      <instancedMesh ref={rightPanelRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <boxGeometry args={[0.32, 0.035, 0.17]} />
        <meshStandardMaterial color="#3f8cff" emissive="#10357a" emissiveIntensity={0.34} metalness={0.6} roughness={0.36} />
      </instancedMesh>

      <instancedMesh ref={leftStrutRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <boxGeometry args={[0.08, 0.018, 0.018]} />
        <meshStandardMaterial color="#93a8c2" metalness={0.84} roughness={0.24} />
      </instancedMesh>

      <instancedMesh ref={rightStrutRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <boxGeometry args={[0.08, 0.018, 0.018]} />
        <meshStandardMaterial color="#93a8c2" metalness={0.84} roughness={0.24} />
      </instancedMesh>

      <instancedMesh ref={mastRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <cylinderGeometry args={[0.012, 0.012, 0.2, 10]} />
        <meshStandardMaterial color="#c8d4e6" metalness={0.82} roughness={0.28} />
      </instancedMesh>

      <instancedMesh ref={dishRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <coneGeometry args={[0.07, 0.08, 18]} />
        <meshStandardMaterial color="#dde7f5" emissive="#163967" emissiveIntensity={0.15} metalness={0.62} roughness={0.3} />
      </instancedMesh>

      <instancedMesh ref={sensorRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <cylinderGeometry args={[0.016, 0.02, 0.12, 12]} />
        <meshStandardMaterial color="#d4deec" emissive="#2756b3" emissiveIntensity={0.18} metalness={0.7} roughness={0.24} />
      </instancedMesh>

      <instancedMesh ref={beaconRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color="#91e3ff" transparent opacity={0.9} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={beaconHaloRef} args={[undefined, undefined, satelliteConfigs.length]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial color="#91e3ff" transparent opacity={0.14} depthWrite={false} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={defenseNodeRef} args={[undefined, undefined, defenseConfigs.length]}>
        <octahedronGeometry args={[0.11]} />
        <meshStandardMaterial color="#7fe0ff" emissive="#2cc7ff" emissiveIntensity={0.6} roughness={0.28} metalness={0.65} />
      </instancedMesh>
    </group>
  );
}
