'use client';

import { useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlobeMapProps {
  children?: ReactNode;
}

export default function GlobeMap({ children }: GlobeMapProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#1A56DB"
        wireframe
        opacity={0.3}
        transparent
      />
      {children}
    </mesh>
  );
}
