import * as THREE from "three";

export function latLongToVector3(radius: number, latitude: number, longitude: number) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function createArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  elevation = 0.72,
  segments = 72
) {
  const midpoint = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(start.length() + elevation);
  const curve = new THREE.CatmullRomCurve3([start, midpoint, end]);
  return curve.getPoints(segments);
}

export function createBezierArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  elevation = 0.72,
  segments = 72
) {
  const midpoint = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(start.length() + elevation);
  const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
  return curve.getPoints(segments);
}

export function orbitPosition(radius: number, angle: number, inclination = 0, verticalAmplitude = 0) {
  const position = new THREE.Vector3(
    radius * Math.cos(angle),
    Math.sin(angle * 1.6) * verticalAmplitude,
    radius * Math.sin(angle)
  );

  if (inclination !== 0) {
    position.applyAxisAngle(new THREE.Vector3(0, 0, 1), inclination);
  }

  return position;
}

export function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}
