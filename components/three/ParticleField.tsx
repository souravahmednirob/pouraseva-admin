'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2000;
const BLUE = new THREE.Color('#1A56DB');
const GREEN = new THREE.Color('#006A4E');

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const color = Math.random() > 0.5 ? BLUE : GREEN;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += 0.0002;
    pointsRef.current.rotation.x += 0.0001;

    const mouse = state.mouse;
    pointsRef.current.position.x = mouse.x * 0.1;
    pointsRef.current.position.y = mouse.y * 0.1;
  });

  const posAttr = useMemo(() => new THREE.Float32BufferAttribute(positions, 3), [positions]);
  const colAttr = useMemo(() => new THREE.Float32BufferAttribute(colors, 3), [colors]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
        <primitive attach="attributes-color" object={colAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        vertexColors
      />
    </points>
  );
}
