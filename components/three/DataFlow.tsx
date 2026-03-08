'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataFlowProps {
  startPoint: [number, number, number];
  endPoint: [number, number, number];
  color: string;
}

export default function DataFlow({ startPoint, endPoint, color }: DataFlowProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const tRef = useRef(0);

  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPoint);
    const end = new THREE.Vector3(...endPoint);
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(start.y, end.y) + 2,
      (start.z + end.z) / 2
    );

    return new THREE.CatmullRomCurve3([start, mid, end]);
  }, [startPoint, endPoint]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 50, 0.02, 8, false);
  }, [curve]);

  useFrame(() => {
    if (!sphereRef.current) return;

    tRef.current += 0.005;
    if (tRef.current > 1) tRef.current = 0;

    const point = curve.getPointAt(tRef.current);
    sphereRef.current.position.copy(point);
  });

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}
