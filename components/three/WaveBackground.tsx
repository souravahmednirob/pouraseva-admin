'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WaveBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positionAttr = geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < positionAttr.count; i++) {
      const x = positionAttr.getX(i);
      const y = positionAttr.getY(i);
      const z =
        Math.sin(x * 0.3 + time * 0.5) * 0.3 +
        Math.cos(y * 0.3 + time * 0.3) * 0.3;
      positionAttr.setZ(i, z);
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 80, 80]} />
      <meshBasicMaterial
        wireframe
        color="#1A56DB"
        opacity={0.08}
        transparent
      />
    </mesh>
  );
}
