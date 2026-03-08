'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  size: number;
  delay: number;
}

export default function FloatingCube({ position, color, size, delay }: FloatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(time + delay) * 0.3;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
