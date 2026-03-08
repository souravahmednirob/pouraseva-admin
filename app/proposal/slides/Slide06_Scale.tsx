'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const NODE_COUNT = 50;

function generateNodes() {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const angle = (i / NODE_COUNT) * Math.PI * 2;
    const radiusX = 1 + 0.3 * Math.sin(angle * 2);
    const x = Math.sin(angle) * radiusX;
    const y = Math.cos(angle) * 1.5;
    const z = (Math.random() - 0.5) * 0.3;
    nodes.push(new THREE.Vector3(x, y, z));
  }
  return nodes;
}

function generateLines(nodes: THREE.Vector3[], threshold: number) {
  const positions: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < threshold) {
        positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }
  return new Float32Array(positions);
}

export function ScaleScene({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const redNodeRef = useRef<THREE.Mesh>(null!);
  const hasAnimated = useRef(false);

  const nodes = useMemo(() => generateNodes(), []);
  const linePositions = useMemo(() => generateLines(nodes, 0.8), [nodes]);

  useEffect(() => {
    if (active && !hasAnimated.current) {
      hasAnimated.current = true;

      // Animate red node first
      if (redNodeRef.current) {
        redNodeRef.current.scale.set(0, 0, 0);
        gsap.to(redNodeRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.6,
          ease: 'back.out(3)',
        });
      }

      // Then blue nodes stagger outward
      nodesRef.current.forEach((mesh, i) => {
        if (mesh) {
          mesh.scale.set(0, 0, 0);
          gsap.to(mesh.scale, {
            x: 1,
            y: 1,
            z: 1,
            delay: 0.3 + i * 0.02,
            duration: 0.5,
            ease: 'back.out(3)',
          });
        }
      });
    }
    if (!active) {
      hasAnimated.current = false;
      nodesRef.current.forEach((mesh) => {
        if (mesh) mesh.scale.set(0, 0, 0);
      });
      if (redNodeRef.current) {
        redNodeRef.current.scale.set(0, 0, 0);
      }
    }
  }, [active]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} />

      {/* Blue nodes */}
      {nodes.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) nodesRef.current[i] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
          scale={[0, 0, 0]}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#1A56DB" />
        </mesh>
      ))}

      {/* Red Kaliakair node */}
      <mesh ref={redNodeRef} position={[0.3, 0.5, 0]} scale={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>

      {/* Connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <primitive attach="attributes-position" object={new THREE.Float32BufferAttribute(linePositions, 3)} />
        </bufferGeometry>
        <lineBasicMaterial color="#1A56DB" opacity={0.15} transparent />
      </lineSegments>
    </group>
  );
}

const scalePhases = [
  { label: '১টি পৌরসভা', sub: 'Kaliakair', duration: '৬ মাস', progress: 1 },
  { label: '১০টি পৌরসভা', sub: '', duration: '১ বছর', progress: 3 },
  { label: '৬৪ জেলার পৌরসভা', sub: '', duration: '১.৫ বছর', progress: 20 },
  { label: '৩৩০টি সকল পৌরসভা', sub: '', duration: '২ বছর', progress: 100 },
];

export function ScaleContent({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        সারা বাংলাদেশে
        <span className="block text-lg font-normal text-gray-500 mt-1">Scaling to All Bangladesh</span>
      </motion.h2>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        {scalePhases.map((phase, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl p-4"
            initial={{ x: 60, opacity: 0 }}
            animate={active ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{phase.label}</span>
                {phase.sub && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({phase.sub})</span>
                )}
              </div>
              <span className="text-sm text-[#1A56DB] font-semibold">{phase.duration}</span>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#1A56DB] to-[#3B82F6]"
                initial={{ width: '0%' }}
                animate={active ? { width: `${phase.progress}%` } : { width: '0%' }}
                transition={{ delay: 0.5 + i * 0.2, duration: 1, ease: 'easeOut' }}
              />
            </div>

            <div className="text-right text-xs text-gray-400 mt-1">{phase.progress}%</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl px-6 py-3 font-bold text-lg">
          ৩৩০ পৌরসভা = ৫ কোটি+ নাগরিক সেবাপ্রাপ্ত
        </div>
      </motion.div>
    </div>
  );
}
