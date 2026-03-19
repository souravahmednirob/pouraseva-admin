'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

interface SlideProps { active: boolean; }

/* ═══════════════════════════════════════════════════════════
   GROUND — flat, extends to screen edges, green|blue|gray zones
   ═══════════════════════════════════════════════════════════ */
function GroundPlane() {
  const H = 100; // depth (z)
  return (
    <group>
      {/* GREEN ZONE — Village (left): x from -50 to -2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-26, 0, 0]}>
        <planeGeometry args={[48, H]} />
        <meshBasicMaterial color="#4ADE80" />
      </mesh>

      {/* BLUE ZONE — Office (center): x from -2 to +2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[4, H]} />
        <meshBasicMaterial color="#93C5FD" />
      </mesh>

      {/* GRAY ZONE — City (right): x from +2 to +50 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[26, 0, 0]}>
        <planeGeometry args={[48, H]} />
        <meshBasicMaterial color="#CBD5E1" />
      </mesh>

      {/* Transition: green→blue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.5, 0.02, 0]}>
        <planeGeometry args={[1.5, H]} />
        <meshBasicMaterial color="#6DD6A0" />
      </mesh>

      {/* Transition: blue→gray */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.5, 0.02, 0]}>
        <planeGeometry args={[1.5, H]} />
        <meshBasicMaterial color="#B0CDE4" />
      </mesh>

      {/* Grass patches on village side */}
      {[[-4.5, 0.8, 0.5], [-5.5, -0.5, 0.6], [-3.0, 1.8, 0.45], [-3.8, -1.2, 0.55], [-2.5, 0.3, 0.4], [-6, 1.5, 0.5], [-7, -0.3, 0.6], [-4, 2.5, 0.45]].map(([x, z, r], i) => (
        <mesh key={`g${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.05, z]}>
          <circleGeometry args={[r, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#22C55E' : '#16A34A'} />
        </mesh>
      ))}

      {/* Road/path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <planeGeometry args={[H, 0.5]} />
        <meshBasicMaterial color="#E8DCC8" />
      </mesh>
      {/* Road edges */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0.28]}>
        <planeGeometry args={[H, 0.04]} />
        <meshBasicMaterial color="#9CA3AF" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, -0.28]}>
        <planeGeometry args={[H, 0.04]} />
        <meshBasicMaterial color="#9CA3AF" />
      </mesh>
      {/* Digital glow line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <planeGeometry args={[H * 0.8, 0.06]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   PLACE ON ISLAND — simple x,z positioning
   ═══════════════════════════════════════════════════════════ */
function Place({ x, z, y = 0.05, scale = 1, rotY = 0, children }: {
  x: number; z: number; y?: number; scale?: number; rotY?: number; children: React.ReactNode;
}) {
  return (
    <group position={[x, y, z]} rotation={[0, rotY, 0]} scale={scale}>
      {children}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════ */
function SpringUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = Math.max(0, Math.min(1, (s.clock.elapsedTime - delay) / 0.8));
    ref.current.scale.setScalar(t * t * (3 - 2 * t));
  });
  return <group ref={ref}>{children}</group>;
}

/* ═══════════════════════════════════════════════════════════
   GLOWING SUN
   ═══════════════════════════════════════════════════════════ */
function GlowingSun() {
  const coronaRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (coronaRef.current) coronaRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.12);
    if (raysRef.current) raysRef.current.rotation.z += 0.003;
  });

  return (
    <group>
      <mesh><sphereGeometry args={[0.8, 32, 32]} /><meshBasicMaterial color="#FDB813" /></mesh>
      <mesh ref={coronaRef}><sphereGeometry args={[1.1, 32, 32]} /><meshBasicMaterial color="#FDB813" transparent opacity={0.4} /></mesh>
      <mesh><sphereGeometry args={[1.6, 32, 32]} /><meshBasicMaterial color="#FFD700" transparent opacity={0.15} /></mesh>
      <mesh><sphereGeometry args={[2.4, 24, 24]} /><meshBasicMaterial color="#FFFACD" transparent opacity={0.07} /></mesh>
      <group ref={raysRef}>
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 16) * Math.PI]}>
            <planeGeometry args={[0.06, 5]} /><meshBasicMaterial color="#FDB813" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      <pointLight intensity={3} color="#FFF5CC" distance={30} decay={1.2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════ */
function Cloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.position.x = position[0] + Math.sin(s.clock.elapsedTime * 0.04 + position[2]) * 0.4; });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh><sphereGeometry args={[0.5, 8, 6]} /><meshBasicMaterial color="#FFFFFF" /></mesh>
      <mesh position={[0.5, 0.08, 0]}><sphereGeometry args={[0.4, 8, 6]} /><meshBasicMaterial color="#FFFFFF" /></mesh>
      <mesh position={[-0.4, -0.05, 0.1]}><sphereGeometry args={[0.35, 8, 6]} /><meshBasicMaterial color="#F8FAFF" /></mesh>
      <mesh position={[0.2, 0.22, 0.15]}><sphereGeometry args={[0.32, 8, 6]} /><meshBasicMaterial color="#FFFFFF" /></mesh>
      <mesh position={[-0.15, 0.15, -0.15]}><sphereGeometry args={[0.28, 8, 6]} /><meshBasicMaterial color="#FFFFFF" /></mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════ */
function Bird({ position, speed = 1, amplitude = 0.3 }: { position: [number, number, number]; speed?: number; amplitude?: number; }) {
  const ref = useRef<THREE.Group>(null);
  const lw = useRef<THREE.Mesh>(null);
  const rw = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime * speed;
    ref.current.position.x = position[0] + Math.sin(t * 0.3) * 3;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * amplitude;
    ref.current.position.z = position[2] + Math.cos(t * 0.2) * 1.5;
    const flap = Math.sin(t * 5) * 0.5;
    if (lw.current) lw.current.rotation.z = flap;
    if (rw.current) rw.current.rotation.z = -flap;
  });
  return (
    <group ref={ref} position={position} scale={0.4}>
      <mesh><sphereGeometry args={[0.08, 6, 4]} /><meshBasicMaterial color="#2C3E50" /></mesh>
      <mesh ref={lw} position={[-0.25, 0, 0]}><boxGeometry args={[0.45, 0.015, 0.14]} /><meshBasicMaterial color="#34495E" /></mesh>
      <mesh ref={rw} position={[0.25, 0, 0]}><boxGeometry args={[0.45, 0.015, 0.14]} /><meshBasicMaterial color="#34495E" /></mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   VILLAGE BUILDINGS
   ═══════════════════════════════════════════════════════════ */
function TinRoofHut({ wallColor = '#D2B48C' }: { wallColor?: string }) {
  return (
    <group>
      <mesh position={[0, 0.08, 0]}><boxGeometry args={[0.9, 0.16, 0.65]} /><meshStandardMaterial color="#8B7355" roughness={1} /></mesh>
      <mesh position={[0, 0.4, 0]}><boxGeometry args={[0.8, 0.48, 0.55]} /><meshStandardMaterial color={wallColor} roughness={0.95} /></mesh>
      <mesh position={[0, 0.74, -0.15]} rotation={[0.35, 0, 0]}><boxGeometry args={[0.95, 0.04, 0.4]} /><meshStandardMaterial color="#8B9DAF" roughness={0.3} metalness={0.5} /></mesh>
      <mesh position={[0, 0.74, 0.15]} rotation={[-0.35, 0, 0]}><boxGeometry args={[0.95, 0.04, 0.4]} /><meshStandardMaterial color="#7B8794" roughness={0.3} metalness={0.5} /></mesh>
      <mesh position={[0.08, 0.3, 0.28]}><boxGeometry args={[0.15, 0.32, 0.01]} /><meshStandardMaterial color="#5C3317" /></mesh>
    </group>
  );
}

function PalmTree() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.4) * 0.03; });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.03, 0.055, 1.0, 6]} /><meshStandardMaterial color="#92400E" roughness={0.9} /></mesh>
      <mesh position={[0, 1.1, 0]}><sphereGeometry args={[0.3, 10, 8]} /><meshStandardMaterial color="#22c55e" roughness={0.8} /></mesh>
      <mesh position={[0.1, 1.2, 0]}><sphereGeometry args={[0.14, 8, 6]} /><meshStandardMaterial color="#15803d" roughness={0.8} /></mesh>
    </group>
  );
}

function BananaTree() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.06, 0.08, 0.9, 8]} /><meshStandardMaterial color="#5D8C3E" roughness={0.8} /></mesh>
      {[0, 1.2, 2.4, 3.8].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.12, 0.9 + i * 0.02, Math.sin(a) * 0.12]} rotation={[0.4 + i * 0.08, a, 0.25]}>
          <boxGeometry args={[0.05, 0.38, 0.01]} /><meshStandardMaterial color={i % 2 === 0 ? '#2D8B1E' : '#3DA52E'} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0.1, 0.7, 0.04]}><sphereGeometry args={[0.05, 6, 4]} /><meshStandardMaterial color="#E8C840" /></mesh>
    </group>
  );
}

function Pond() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><circleGeometry args={[0.35, 16]} /><meshStandardMaterial color="#3B82C4" roughness={0.05} metalness={0.4} transparent opacity={0.7} side={THREE.DoubleSide} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}><circleGeometry args={[0.42, 16]} /><meshStandardMaterial color="#6B5B3B" roughness={1} side={THREE.DoubleSide} /></mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   VILLAGE EXTRAS — farm, cow, haystack, well, fence, rice paddy
   ═══════════════════════════════════════════════════════════ */
function RicePaddy() {
  return (
    <group>
      {/* Water bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#5B8C3E" roughness={0.6} />
      </mesh>
      {/* Rice rows */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((z, i) => (
        <group key={i}>
          {[-0.4, -0.2, 0, 0.2, 0.4].map((x, j) => (
            <mesh key={j} position={[x, 0.06, z]}>
              <cylinderGeometry args={[0.005, 0.005, 0.12, 4]} />
              <meshStandardMaterial color="#6B8E23" />
            </mesh>
          ))}
        </group>
      ))}
      {/* Mud border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[1.3, 0.9]} />
        <meshStandardMaterial color="#8B7355" roughness={1} />
      </mesh>
    </group>
  );
}

function VegetableGarden() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshStandardMaterial color="#5C4033" roughness={1} />
      </mesh>
      {/* Rows of veggies */}
      {[-0.2, 0, 0.2].map((z, i) => (
        <group key={i}>
          {[-0.3, -0.15, 0, 0.15, 0.3].map((x, j) => (
            <mesh key={j} position={[x, 0.06, z]}>
              <sphereGeometry args={[0.04, 6, 4]} />
              <meshStandardMaterial color={j % 2 === 0 ? '#22C55E' : '#DC2626'} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Cow() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.22, 0]}><boxGeometry args={[0.35, 0.2, 0.15]} /><meshStandardMaterial color="#F5F5DC" roughness={0.7} /></mesh>
      {/* Head */}
      <mesh position={[0.2, 0.28, 0]}><boxGeometry args={[0.1, 0.12, 0.1]} /><meshStandardMaterial color="#F5F5DC" roughness={0.7} /></mesh>
      {/* Horns */}
      <mesh position={[0.22, 0.36, 0.04]} rotation={[0, 0, 0.3]}><cylinderGeometry args={[0.005, 0.01, 0.06, 4]} /><meshStandardMaterial color="#D4A574" /></mesh>
      <mesh position={[0.22, 0.36, -0.04]} rotation={[0, 0, 0.3]}><cylinderGeometry args={[0.005, 0.01, 0.06, 4]} /><meshStandardMaterial color="#D4A574" /></mesh>
      {/* Legs */}
      {[[-0.1, 0.06], [0.1, 0.06], [-0.1, -0.06], [0.1, -0.06]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}><cylinderGeometry args={[0.015, 0.018, 0.12, 6]} /><meshStandardMaterial color="#F5F5DC" /></mesh>
      ))}
      {/* Spots */}
      <mesh position={[0.05, 0.3, 0.08]}><sphereGeometry args={[0.04, 6, 4]} /><meshStandardMaterial color="#8B4513" /></mesh>
      <mesh position={[-0.08, 0.28, -0.06]}><sphereGeometry args={[0.035, 6, 4]} /><meshStandardMaterial color="#8B4513" /></mesh>
    </group>
  );
}

function HayStack() {
  return (
    <group>
      <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.2, 0.25, 0.3, 8]} /><meshStandardMaterial color="#DAA520" roughness={0.9} /></mesh>
      <mesh position={[0, 0.32, 0]}><coneGeometry args={[0.22, 0.15, 8]} /><meshStandardMaterial color="#B8860B" roughness={0.9} /></mesh>
    </group>
  );
}

function Well() {
  return (
    <group>
      <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.12, 0.14, 0.3, 12, 1, true]} /><meshStandardMaterial color="#8B8682" roughness={0.8} side={THREE.DoubleSide} /></mesh>
      {/* Water inside */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.11, 12]} /><meshStandardMaterial color="#2563EB" roughness={0.05} /></mesh>
      {/* Support posts */}
      <mesh position={[0.12, 0.4, 0]}><cylinderGeometry args={[0.01, 0.01, 0.5, 4]} /><meshStandardMaterial color="#5C4033" /></mesh>
      <mesh position={[-0.12, 0.4, 0]}><cylinderGeometry args={[0.01, 0.01, 0.5, 4]} /><meshStandardMaterial color="#5C4033" /></mesh>
      {/* Crossbar */}
      <mesh position={[0, 0.62, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.008, 0.008, 0.28, 4]} /><meshStandardMaterial color="#5C4033" /></mesh>
      {/* Bucket */}
      <mesh position={[0.02, 0.45, 0]}><cylinderGeometry args={[0.025, 0.03, 0.05, 8]} /><meshStandardMaterial color="#6B7280" metalness={0.4} /></mesh>
    </group>
  );
}

function BambooFence({ length = 2 }: { length?: number }) {
  const posts = Math.floor(length / 0.15);
  return (
    <group>
      {Array.from({ length: posts }).map((_, i) => (
        <mesh key={i} position={[i * 0.15, 0.15, 0]}>
          <cylinderGeometry args={[0.008, 0.01, 0.3, 4]} />
          <meshStandardMaterial color="#8B7355" roughness={0.8} />
        </mesh>
      ))}
      {/* Horizontal bars */}
      <mesh position={[length / 2 - 0.08, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.005, 0.005, length, 4]} /><meshStandardMaterial color="#A0886A" /></mesh>
      <mesh position={[length / 2 - 0.08, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.005, 0.005, length, 4]} /><meshStandardMaterial color="#A0886A" /></mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY BUILDINGS
   ═══════════════════════════════════════════════════════════ */
function TallBuilding() {
  return (
    <group>
      <mesh position={[0, 0.8, 0]}><boxGeometry args={[0.55, 1.6, 0.45]} /><meshStandardMaterial color="#64748B" roughness={0.15} metalness={0.35} /></mesh>
      {[-0.12, 0.12].map((x, i) => [0.2, 0.45, 0.7, 0.95, 1.2, 1.4].map((y, j) => (
        <mesh key={`${i}-${j}`} position={[x, y, 0.24]}><boxGeometry args={[0.1, 0.08, 0.01]} /><meshStandardMaterial color="#93C5FD" emissive="#3B82F6" emissiveIntensity={j % 2 === 0 ? 0.35 : 0.1} transparent opacity={0.7} /></mesh>
      )))}
      <mesh position={[0, 1.7, 0]}><cylinderGeometry args={[0.008, 0.008, 0.2, 4]} /><meshStandardMaterial color="#9CA3AF" metalness={0.5} /></mesh>
      <mesh position={[0, 1.82, 0]}><sphereGeometry args={[0.02, 8, 6]} /><meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={1} /></mesh>
    </group>
  );
}

function Hospital() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.65, 0.9, 0.45]} /><meshStandardMaterial color="#F8FAFC" roughness={0.3} /></mesh>
      <mesh position={[0, 0.75, 0.24]}><boxGeometry args={[0.18, 0.05, 0.01]} /><meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.5} /></mesh>
      <mesh position={[0, 0.75, 0.24]}><boxGeometry args={[0.05, 0.18, 0.01]} /><meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.5} /></mesh>
      <mesh position={[0, 0.15, 0.24]}><boxGeometry args={[0.14, 0.28, 0.01]} /><meshStandardMaterial color="#93C5FD" /></mesh>
    </group>
  );
}

function ShoppingMall() {
  return (
    <group>
      <mesh position={[0, 0.35, 0]}><boxGeometry args={[0.85, 0.7, 0.5]} /><meshStandardMaterial color="#F1F5F9" roughness={0.2} metalness={0.1} /></mesh>
      <mesh position={[0, 0.35, 0.26]}><boxGeometry args={[0.75, 0.6, 0.01]} /><meshStandardMaterial color="#93C5FD" transparent opacity={0.4} metalness={0.3} /></mesh>
      <mesh position={[0, 0.75, 0.3]}><boxGeometry args={[0.9, 0.05, 0.15]} /><meshStandardMaterial color="#1E40AF" /></mesh>
    </group>
  );
}

function MobileTower() {
  const lm = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => { if (lm.current) lm.current.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 3) * 0.5; });
  return (
    <group>
      <mesh position={[0, 0.75, 0]}><cylinderGeometry args={[0.02, 0.04, 1.5, 6]} /><meshStandardMaterial color="#6B7280" metalness={0.5} /></mesh>
      {[0.3, 0.6, 0.95].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.005, 0.005, 0.22 - i * 0.04, 4]} /><meshStandardMaterial color="#9CA3AF" /></mesh>
      ))}
      <mesh position={[0, 1.55, 0]}><sphereGeometry args={[0.025, 8, 6]} /><meshStandardMaterial ref={lm} color="#EF4444" emissive="#EF4444" emissiveIntensity={1} /></mesh>
    </group>
  );
}

function StreetLight() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.01, 0.018, 1.0, 6]} /><meshStandardMaterial color="#4B5563" metalness={0.5} /></mesh>
      <mesh position={[0.08, 0.95, 0]} rotation={[0, 0, -0.4]}><cylinderGeometry args={[0.007, 0.007, 0.2, 4]} /><meshStandardMaterial color="#4B5563" metalness={0.5} /></mesh>
      <mesh position={[0.14, 0.9, 0]}><sphereGeometry args={[0.03, 8, 6]} /><meshStandardMaterial color="#FEF9C3" emissive="#FCD34D" emissiveIntensity={0.8} /></mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY EXTRAS — bus stop, rickshaw, traffic light, bench, apartment
   ═══════════════════════════════════════════════════════════ */
function BusStop() {
  return (
    <group>
      {/* Pole */}
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.015, 0.015, 1.0, 6]} /><meshStandardMaterial color="#4B5563" metalness={0.4} /></mesh>
      {/* Roof */}
      <mesh position={[0, 0.95, 0.1]}><boxGeometry args={[0.6, 0.03, 0.35]} /><meshStandardMaterial color="#3B82F6" roughness={0.2} /></mesh>
      {/* Back panel */}
      <mesh position={[0, 0.6, -0.05]}><boxGeometry args={[0.55, 0.7, 0.02]} /><meshStandardMaterial color="#93C5FD" transparent opacity={0.5} /></mesh>
      {/* Bench */}
      <mesh position={[0, 0.25, 0.08]}><boxGeometry args={[0.4, 0.03, 0.12]} /><meshStandardMaterial color="#6B7280" /></mesh>
      {/* Sign */}
      <mesh position={[0, 1.05, 0]}><boxGeometry args={[0.3, 0.08, 0.01]} /><meshStandardMaterial color="#1D4ED8" /></mesh>
    </group>
  );
}

function Rickshaw() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.15, 0]}><boxGeometry args={[0.25, 0.18, 0.2]} /><meshStandardMaterial color="#DC2626" roughness={0.4} /></mesh>
      {/* Canopy */}
      <mesh position={[-0.02, 0.3, 0]}><boxGeometry args={[0.22, 0.04, 0.22]} /><meshStandardMaterial color="#FBBF24" /></mesh>
      {/* Canopy top curve */}
      <mesh position={[-0.02, 0.34, 0]}><cylinderGeometry args={[0.12, 0.12, 0.04, 8, 1, false, 0, Math.PI]} /><meshStandardMaterial color="#F59E0B" /></mesh>
      {/* Front handle area */}
      <mesh position={[0.18, 0.18, 0]}><cylinderGeometry args={[0.008, 0.008, 0.2, 4]} /><meshStandardMaterial color="#4B5563" /></mesh>
      <mesh position={[0.25, 0.22, 0]}><cylinderGeometry args={[0.006, 0.006, 0.14, 4]} /><meshStandardMaterial color="#4B5563" /></mesh>
      {/* Wheels */}
      <mesh position={[-0.08, 0.05, 0.12]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 0.02, 12]} /><meshStandardMaterial color="#1F2937" /></mesh>
      <mesh position={[-0.08, 0.05, -0.12]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 0.02, 12]} /><meshStandardMaterial color="#1F2937" /></mesh>
      <mesh position={[0.28, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.035, 0.035, 0.02, 12]} /><meshStandardMaterial color="#1F2937" /></mesh>
    </group>
  );
}

function TrafficLight() {
  const lRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (!lRef.current) return;
    const t = s.clock.elapsedTime % 6;
    if (t < 2) { lRef.current.color.setHex(0x22C55E); lRef.current.emissive.setHex(0x22C55E); }
    else if (t < 4) { lRef.current.color.setHex(0xFBBF24); lRef.current.emissive.setHex(0xFBBF24); }
    else { lRef.current.color.setHex(0xEF4444); lRef.current.emissive.setHex(0xEF4444); }
  });
  return (
    <group>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.012, 0.015, 1.0, 6]} /><meshStandardMaterial color="#4B5563" metalness={0.5} /></mesh>
      <mesh position={[0, 1.05, 0]}><boxGeometry args={[0.06, 0.18, 0.04]} /><meshStandardMaterial color="#1F2937" /></mesh>
      <mesh position={[0, 1.1, 0.025]}><sphereGeometry args={[0.018, 8, 6]} /><meshStandardMaterial ref={lRef} color="#22C55E" emissive="#22C55E" emissiveIntensity={1.5} /></mesh>
    </group>
  );
}

function ParkBench() {
  return (
    <group>
      {/* Seat */}
      <mesh position={[0, 0.18, 0]}><boxGeometry args={[0.4, 0.025, 0.12]} /><meshStandardMaterial color="#92400E" roughness={0.8} /></mesh>
      {/* Back */}
      <mesh position={[0, 0.28, -0.05]} rotation={[0.2, 0, 0]}><boxGeometry args={[0.4, 0.15, 0.02]} /><meshStandardMaterial color="#92400E" roughness={0.8} /></mesh>
      {/* Legs */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.09, 0]}><boxGeometry args={[0.02, 0.18, 0.1]} /><meshStandardMaterial color="#4B5563" /></mesh>
      ))}
    </group>
  );
}

function Apartment({ color = '#94A3B8', floors = 3 }: { color?: string; floors?: number }) {
  const h = floors * 0.4;
  return (
    <group>
      <mesh position={[0, h / 2, 0]}><boxGeometry args={[0.7, h, 0.5]} /><meshStandardMaterial color={color} roughness={0.2} metalness={0.15} /></mesh>
      {/* Windows */}
      {Array.from({ length: floors }).map((_, f) =>
        [-0.2, 0, 0.2].map((x, w) => (
          <mesh key={`${f}-${w}`} position={[x, 0.2 + f * 0.4, 0.26]}>
            <boxGeometry args={[0.12, 0.12, 0.01]} />
            <meshStandardMaterial color="#BFDBFE" emissive="#3B82F6" emissiveIntensity={0.2} transparent opacity={0.6} />
          </mesh>
        ))
      )}
      {/* Roof railing */}
      <mesh position={[0, h + 0.04, 0]}><boxGeometry args={[0.74, 0.04, 0.54]} /><meshStandardMaterial color="#64748B" /></mesh>
    </group>
  );
}

function CarParked({ color = '#3B82F6' }: { color?: string }) {
  return (
    <group>
      <mesh position={[0, 0.06, 0]}><boxGeometry args={[0.3, 0.08, 0.14]} /><meshStandardMaterial color={color} roughness={0.15} metalness={0.3} /></mesh>
      <mesh position={[0, 0.12, 0]}><boxGeometry args={[0.18, 0.07, 0.12]} /><meshStandardMaterial color={color} roughness={0.15} metalness={0.3} /></mesh>
      {/* Windows */}
      <mesh position={[0, 0.13, 0.065]}><boxGeometry args={[0.14, 0.04, 0.01]} /><meshStandardMaterial color="#93C5FD" transparent opacity={0.5} /></mesh>
      {/* Wheels */}
      {[[0.08, -0.07], [0.08, 0.07], [-0.08, -0.07], [-0.08, 0.07]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.025, z]}><sphereGeometry args={[0.02, 6, 4]} /><meshStandardMaterial color="#1F2937" /></mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   POURASHAVA OFFICE
   ═══════════════════════════════════════════════════════════ */
function Office() {
  const flagRef = useRef<THREE.Mesh>(null);
  useFrame((s) => { if (flagRef.current) flagRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 2) * 0.12; });
  return (
    <group>
      {/* Main building — bigger */}
      <mesh position={[0, 0.85, 0]}><boxGeometry args={[1.6, 1.7, 1.0]} /><meshStandardMaterial color="#2563EB" roughness={0.3} metalness={0.1} /></mesh>
      {/* Roof ledge */}
      <mesh position={[0, 1.75, 0]}><boxGeometry args={[1.7, 0.08, 1.1]} /><meshStandardMaterial color="#1D4ED8" /></mesh>
      {/* Windows — 5 columns x 5 rows */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => [0.25, 0.55, 0.85, 1.15, 1.45].map((y, j) => (
        <mesh key={`${i}-${j}`} position={[x, y, 0.52]}><boxGeometry args={[0.13, 0.12, 0.01]} /><meshStandardMaterial color="#BFDBFE" emissive="#60A5FA" emissiveIntensity={0.3} transparent opacity={0.8} /></mesh>
      )))}
      {/* Door */}
      <mesh position={[0, 0.2, 0.52]}><boxGeometry args={[0.25, 0.4, 0.01]} /><meshStandardMaterial color="#1E3A8A" /></mesh>
      {/* Steps */}
      <mesh position={[0, 0.02, 0.6]}><boxGeometry args={[0.5, 0.04, 0.15]} /><meshStandardMaterial color="#CBD5E1" /></mesh>
      {/* Flag pole — taller */}
      <mesh position={[0, 2.3, 0]}><cylinderGeometry args={[0.012, 0.012, 1.1, 6]} /><meshStandardMaterial color="#6B7280" metalness={0.5} /></mesh>
      {/* Flag — bigger */}
      <mesh ref={flagRef} position={[0.2, 2.7, 0]}><boxGeometry args={[0.36, 0.22, 0.008]} /><meshStandardMaterial color="#006A4E" /></mesh>
      <mesh position={[0.16, 2.7, 0.005]}><circleGeometry args={[0.06, 16]} /><meshStandardMaterial color="#F42A41" side={THREE.DoubleSide} /></mesh>
      {/* Bangla name label */}
      <Html position={[0, 2.05, 0.52]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: '#1D4ED8', color: 'white', padding: '6px 16px', borderRadius: '8px',
          fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap',
          fontFamily: '"Hind Siliguri", sans-serif', textAlign: 'center',
          border: '2px solid rgba(255,255,255,0.4)',
          boxShadow: '0 4px 12px rgba(29,78,216,0.5)',
        }}>
          পৌরসভা কার্যালয়
        </div>
      </Html>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   PERSON — with service popup
   ═══════════════════════════════════════════════════════════ */
function Person3D({ shirtColor, headColor = '#8D6E4C', hasLungi = false, wearsSari = false, serviceColor = '#3B82F6', serviceName = '' }: {
  shirtColor: string; headColor?: string; hasLungi?: boolean; wearsSari?: boolean; serviceColor?: string; serviceName?: string;
}) {
  const pg = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => { if (pg.current) pg.current.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 2.5) * 0.3; });

  return (
    <group>
      <mesh position={[0, 1.22, 0]}><sphereGeometry args={[0.1, 12, 10]} /><meshStandardMaterial color={headColor} roughness={0.55} /></mesh>
      <mesh position={[0, 1.3, -0.01]}><sphereGeometry args={[0.102, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.5]} /><meshStandardMaterial color={wearsSari ? '#1a0f09' : '#0a0705'} /></mesh>
      <mesh position={[0.033, 1.235, 0.088]}><sphereGeometry args={[0.012, 8, 6]} /><meshStandardMaterial color="#fff" /></mesh>
      <mesh position={[-0.033, 1.235, 0.088]}><sphereGeometry args={[0.012, 8, 6]} /><meshStandardMaterial color="#fff" /></mesh>
      <mesh position={[0.033, 1.235, 0.096]}><sphereGeometry args={[0.006, 6, 4]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
      <mesh position={[-0.033, 1.235, 0.096]}><sphereGeometry args={[0.006, 6, 4]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
      <mesh position={[0.095, 1.22, 0]}><sphereGeometry args={[0.02, 6, 4]} /><meshStandardMaterial color={headColor} /></mesh>
      <mesh position={[-0.095, 1.22, 0]}><sphereGeometry args={[0.02, 6, 4]} /><meshStandardMaterial color={headColor} /></mesh>
      <mesh position={[0, 1.08, 0]}><cylinderGeometry args={[0.04, 0.045, 0.1, 8]} /><meshStandardMaterial color={headColor} /></mesh>

      {wearsSari ? (
        <>
          <mesh position={[0, 0.65, 0]}><cylinderGeometry args={[0.1, 0.2, 0.85, 10]} /><meshStandardMaterial color={shirtColor} roughness={0.45} /></mesh>
          <mesh position={[0, 0.24, 0]}><cylinderGeometry args={[0.2, 0.2, 0.04, 10]} /><meshStandardMaterial color="#FCD34D" roughness={0.3} metalness={0.4} /></mesh>
          <mesh position={[-0.14, 0.85, 0]} rotation={[0.1, 0, 0.2]}><cylinderGeometry args={[0.025, 0.028, 0.3, 6]} /><meshStandardMaterial color={headColor} /></mesh>
        </>
      ) : (
        <>
          <mesh position={[0, 0.82, 0]}><cylinderGeometry args={[0.1, 0.12, 0.42, 10]} /><meshStandardMaterial color={shirtColor} roughness={0.45} /></mesh>
          <mesh position={[-0.15, 0.82, 0]} rotation={[0.05, 0, 0.18]}><cylinderGeometry args={[0.028, 0.032, 0.2, 6]} /><meshStandardMaterial color={shirtColor} /></mesh>
          <mesh position={[-0.18, 0.68, 0.04]} rotation={[0.3, 0, 0.1]}><cylinderGeometry args={[0.022, 0.028, 0.18, 6]} /><meshStandardMaterial color={headColor} /></mesh>
          {hasLungi ? (
            <>
              <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.12, 0.16, 0.45, 10]} /><meshStandardMaterial color="#2E8B57" roughness={0.65} /></mesh>
              <mesh position={[-0.1, 0.9, 0.04]} rotation={[0, 0, 0.55]}><boxGeometry args={[0.03, 0.38, 0.08]} /><meshStandardMaterial color="#E97451" /></mesh>
            </>
          ) : (
            <>
              <mesh position={[0, 0.61, 0]}><cylinderGeometry args={[0.115, 0.115, 0.025, 10]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
              <mesh position={[-0.045, 0.38, 0]}><cylinderGeometry args={[0.04, 0.048, 0.42, 8]} /><meshStandardMaterial color="#1E3A5F" /></mesh>
              <mesh position={[0.045, 0.38, 0]}><cylinderGeometry args={[0.04, 0.048, 0.42, 8]} /><meshStandardMaterial color="#1E3A5F" /></mesh>
            </>
          )}
        </>
      )}

      {/* Right arm + phone */}
      <mesh position={[0.14, 0.86, 0.04]} rotation={[-0.7, 0, -0.25]}><cylinderGeometry args={[0.028, 0.032, 0.2, 6]} /><meshStandardMaterial color={wearsSari ? headColor : shirtColor} /></mesh>
      <mesh position={[0.17, 0.78, 0.15]} rotation={[-0.15, 0, -0.1]}><cylinderGeometry args={[0.022, 0.028, 0.18, 6]} /><meshStandardMaterial color={headColor} /></mesh>
      <mesh position={[0.18, 0.78, 0.24]} rotation={[0.6, 0, -0.05]}><boxGeometry args={[0.065, 0.11, 0.01]} /><meshStandardMaterial color="#111827" roughness={0.15} metalness={0.2} /></mesh>
      <mesh position={[0.18, 0.78, 0.247]} rotation={[0.6, 0, -0.05]}><boxGeometry args={[0.055, 0.09, 0.003]} /><meshStandardMaterial ref={pg} color={serviceColor} emissive={serviceColor} emissiveIntensity={0.6} /></mesh>

      {serviceName && (
        <Html position={[0, 3.2, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: serviceColor, color: 'white', padding: '8px 18px', borderRadius: '18px',
            fontSize: '16px', fontWeight: 700, whiteSpace: 'nowrap',
            boxShadow: `0 4px 16px ${serviceColor}AA`,
            fontFamily: '"Hind Siliguri", sans-serif', textAlign: 'center',
            border: '2px solid rgba(255,255,255,0.5)',
            letterSpacing: '0.03em',
            lineHeight: 1.3,
          }}>
            📱 {serviceName}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA FLOW — particle along x-axis toward office
   ═══════════════════════════════════════════════════════════ */
function DataFlowLine({ startX, endX, z, color, speed = 0.1 }: {
  startX: number; endX: number; z: number; color: string; speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const trail = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    if (!ref.current || !mat.current) return;
    const t = (s.clock.elapsedTime * speed) % 1;
    ref.current.position.set(startX + (endX - startX) * t, 0.35, z);
    mat.current.opacity = t < 0.03 || t > 0.97 ? 0 : 0.9;
    if (trail.current) {
      const t2 = Math.max(0, t - 0.04);
      trail.current.position.set(startX + (endX - startX) * t2, 0.35, z);
    }
  });

  return (
    <>
      <mesh ref={ref}><sphereGeometry args={[0.07, 8, 6]} /><meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={2} transparent /></mesh>
      <mesh ref={trail}><sphereGeometry args={[0.04, 6, 4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.4} /></mesh>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN 3D SCENE — Flat island: Village (left) | Office (center) | City (right)
   ═══════════════════════════════════════════════════════════════ */
export function TitleScene({ active }: SlideProps) {
  const { camera } = useThree();

  useEffect(() => {
    if (active) {
      camera.position.set(0, 10, 20);
      camera.lookAt(0, 0, 0);
    }
    return () => { camera.position.set(0, 0, 5); camera.lookAt(0, 0, 0); };
  }, [active, camera]);

  if (!active) return null;

  return (
    <group>
      {/* Mouse orbit controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.45}
        minAzimuthAngle={-Math.PI * 0.25}
        maxAzimuthAngle={Math.PI * 0.25}
        rotateSpeed={0.4}
        target={[0, 0, 0]}
        maxDistance={30}
        minDistance={18}
      />

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 8]} intensity={1.0} color="#FFF8E7" />
      <directionalLight position={[-5, 8, -3]} intensity={0.35} color="#E0F2FE" />

      {/* Sky dome */}
      <mesh renderOrder={-2}><sphereGeometry args={[50, 32, 32]} /><meshBasicMaterial color="#87CEEB" side={THREE.BackSide} /></mesh>
      {/* Horizon glow */}
      <mesh position={[0, -8, 0]} renderOrder={-1}><sphereGeometry args={[49, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} /><meshBasicMaterial color="#C8E6F8" side={THREE.BackSide} /></mesh>

      {/* Ground fallback below everything */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshBasicMaterial color="#7BC89A" />
      </mesh>

      {/* Sun — big and visible upper right */}
      <group position={[8, 8, -8]} scale={1.5}><GlowingSun /></group>

      {/* Clouds */}
      <Cloud position={[-8, 4.5, -3]} scale={2.2} />
      <Cloud position={[9, 4, -2]} scale={1.8} />
      <Cloud position={[-4, 5.5, -6]} scale={2.0} />
      <Cloud position={[5, 6, -7]} scale={1.5} />
      <Cloud position={[-11, 3.5, -1]} scale={1.5} />
      <Cloud position={[12, 3, 0]} scale={1.6} />
      <Cloud position={[0, 5, -8]} scale={2.0} />
      <Cloud position={[-7, 5.5, -7]} scale={1.4} />
      <Cloud position={[8, 5.5, -6]} scale={1.2} />
      <Cloud position={[-14, 4, -4]} scale={1.8} />
      <Cloud position={[14, 5, -5]} scale={2.0} />

      {/* Birds — many more scattered across sky */}
      <Bird position={[-4, 5, -1]} speed={0.8} />
      <Bird position={[5, 5.5, -3]} speed={1.1} />
      <Bird position={[-7, 4.5, -3]} speed={0.9} />
      <Bird position={[8, 5, -5]} speed={1.0} />
      <Bird position={[1, 6, -5]} speed={0.7} />
      <Bird position={[-2, 4, 0]} speed={1.2} amplitude={0.4} />
      <Bird position={[-9, 5.5, -2]} speed={0.75} />
      <Bird position={[10, 4.5, -4]} speed={0.95} />
      <Bird position={[-5, 6.5, -6]} speed={0.85} amplitude={0.35} />
      <Bird position={[3, 7, -7]} speed={1.05} />
      <Bird position={[-11, 5, -4]} speed={0.65} />
      <Bird position={[12, 6, -6]} speed={0.9} amplitude={0.45} />
      <Bird position={[0, 5.5, -2]} speed={1.15} />
      <Bird position={[-6, 6, -5]} speed={0.7} amplitude={0.3} />

      {/* ═══ GROUND ZONES ═══ */}
      <GroundPlane />

      {/* ════════════════════════════════════════════════════════
           VILLAGE — LEFT HALF of screen
           Shifted -3x left, +2z forward for more spread
         ════════════════════════════════════════════════════════ */}

      {/* --- Cluster 1: Near-left foreground — hut + tree + person --- */}
      <SpringUp delay={0.4}><Place x={-7} z={5} scale={1.6}><TinRoofHut /></Place></SpringUp>
      <SpringUp delay={0.7}><Place x={-6} z={6} scale={2.2}><PalmTree /></Place></SpringUp>
      <SpringUp delay={1.4}>
        <Place x={-8} z={5.5} scale={0.7} rotY={0.3}>
          <Person3D shirtColor="#F5F5DC" headColor="#8D6E4C" hasLungi serviceColor="#22C55E" serviceName="জন্ম সনদ" />
        </Place>
      </SpringUp>
      <SpringUp delay={0.9}><Place x={-6.5} z={4} scale={1.4}><Pond /></Place></SpringUp>
      <SpringUp delay={1.0}><Place x={-8.5} z={6.5} scale={1.2}><HayStack /></Place></SpringUp>

      {/* --- Cluster 2: Mid-left — hut + banana tree + cow + rice --- */}
      <SpringUp delay={0.5}><Place x={-11} z={4} scale={1.5}><TinRoofHut wallColor="#C8A882" /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={-12.5} z={5} scale={2.0}><BananaTree /></Place></SpringUp>
      <SpringUp delay={0.7}><Place x={-10} z={5.5} scale={1.8}><PalmTree /></Place></SpringUp>
      <SpringUp delay={1.0}><Place x={-12} z={3} scale={1.5}><Cow /></Place></SpringUp>
      <SpringUp delay={1.1}><Place x={-10.5} z={2.5} scale={1.6}><RicePaddy /></Place></SpringUp>

      {/* --- Cluster 3: Far-left foreground — hut + garden + person --- */}
      <SpringUp delay={0.6}><Place x={-15} z={4.5} scale={1.5}><TinRoofHut wallColor="#BEA07A" /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={-14} z={6} scale={2.1}><PalmTree /></Place></SpringUp>
      <SpringUp delay={1.2}><Place x={-16} z={5.5} scale={1.5}><VegetableGarden /></Place></SpringUp>
      <SpringUp delay={1.6}>
        <Place x={-14.5} z={3.5} scale={0.65} rotY={0.5}>
          <Person3D shirtColor="#DC143C" headColor="#C09070" wearsSari serviceColor="#E11D48" serviceName="বিবাহ সনদ" />
        </Place>
      </SpringUp>

      {/* --- Cluster 4: Near-left background — trees, well, fence --- */}
      <SpringUp delay={0.7}><Place x={-7.5} z={1} scale={2.0}><PalmTree /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={-6} z={2} scale={1.8}><BananaTree /></Place></SpringUp>
      <SpringUp delay={1.1}><Place x={-8.5} z={0} scale={1.4}><Well /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={-6.5} z={1.5} scale={1.3} rotY={0.5}><BambooFence length={2} /></Place></SpringUp>

      {/* --- Cluster 5: Mid-left background — cow, haystack, tree, person --- */}
      <SpringUp delay={0.9}><Place x={-11} z={0.5} scale={2.1}><PalmTree /></Place></SpringUp>
      <SpringUp delay={1.0}><Place x={-12.5} z={1.5} scale={1.3}><Cow /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={-10} z={-0.5} scale={1.3}><HayStack /></Place></SpringUp>
      <SpringUp delay={1.8}>
        <Place x={-11.5} z={1} scale={0.65} rotY={0.4}>
          <Person3D shirtColor="#F59E0B" headColor="#8D6E4C" hasLungi serviceColor="#F59E0B" serviceName="কৃষি সেবা" />
        </Place>
      </SpringUp>

      {/* --- Cluster 6: Far-left background --- */}
      <SpringUp delay={0.9}><Place x={-15} z={1} scale={1.9}><BananaTree /></Place></SpringUp>
      <SpringUp delay={1.0}><Place x={-16.5} z={2} scale={1.2}><HayStack /></Place></SpringUp>
      <SpringUp delay={0.9}><Place x={-14} z={0} scale={1.2} rotY={-0.3}><BambooFence length={1.5} /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={-16} z={-0.5} scale={2.0}><PalmTree /></Place></SpringUp>

      {/* ════ OFFICE — CENTER ════ */}
      <SpringUp delay={0.5}><Place x={0} z={0} scale={2.0} rotY={0}><Office /></Place></SpringUp>

      {/* ════════════════════════════════════════════════════════
           CITY — RIGHT HALF of screen
           Shifted +3x right, +2z forward for more spread
         ════════════════════════════════════════════════════════ */}

      {/* --- Block 1: Near-right foreground — tall building + person + traffic --- */}
      <SpringUp delay={0.4}><Place x={7} z={4.5} scale={1.6}><TallBuilding /></Place></SpringUp>
      <SpringUp delay={0.7}><Place x={6.5} z={6} scale={1.3}><TrafficLight /></Place></SpringUp>
      <SpringUp delay={1.5}>
        <Place x={8} z={5.5} scale={0.7} rotY={-0.3}>
          <Person3D shirtColor="#2563EB" serviceColor="#3B82F6" serviceName="ট্যাক্স পেমেন্ট" />
        </Place>
      </SpringUp>
      <SpringUp delay={0.9}><Place x={6} z={5} scale={1.3}><StreetLight /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={8.5} z={6.5} scale={1.4} rotY={-0.3}><Rickshaw /></Place></SpringUp>

      {/* --- Block 2: Mid-right foreground — mall + apartment + car --- */}
      <SpringUp delay={0.6}><Place x={11} z={4} scale={1.5}><ShoppingMall /></Place></SpringUp>
      <SpringUp delay={0.5}><Place x={10} z={5.5} scale={1.4}><Apartment color="#78909C" floors={4} /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={12.5} z={5} scale={1.4} rotY={0.1}><CarParked color="#3B82F6" /></Place></SpringUp>
      <SpringUp delay={0.9}><Place x={11.5} z={6} scale={1.3}><StreetLight /></Place></SpringUp>

      {/* --- Block 3: Far-right foreground — apartments + person --- */}
      <SpringUp delay={0.5}><Place x={15} z={4.5} scale={1.4}><Apartment color="#90A4AE" floors={5} /></Place></SpringUp>
      <SpringUp delay={0.7}><Place x={14} z={6} scale={1.5}><TallBuilding /></Place></SpringUp>
      <SpringUp delay={1.7}>
        <Place x={15.5} z={5.5} scale={0.65} rotY={-0.5}>
          <Person3D shirtColor="#7C3AED" wearsSari serviceColor="#06B6D4" serviceName="পানির বিল" />
        </Place>
      </SpringUp>
      <SpringUp delay={0.8}><Place x={16} z={5} scale={1.4} rotY={0.5}><Rickshaw /></Place></SpringUp>

      {/* --- Block 4: Near-right background — hospital + bus stop + car --- */}
      <SpringUp delay={0.6}><Place x={7.5} z={1} scale={1.5}><Hospital /></Place></SpringUp>
      <SpringUp delay={0.7}><Place x={6.5} z={2} scale={1.3}><BusStop /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={8.5} z={0} scale={1.4} rotY={0.1}><CarParked color="#EF4444" /></Place></SpringUp>
      <SpringUp delay={0.9}><Place x={7} z={1.5} scale={1.3}><StreetLight /></Place></SpringUp>

      {/* --- Block 5: Mid-right background — tower + apartment + person --- */}
      <SpringUp delay={0.7}><Place x={11} z={1} scale={1.6}><MobileTower /></Place></SpringUp>
      <SpringUp delay={0.5}><Place x={12} z={0} scale={1.3}><Apartment color="#B0BEC5" floors={4} /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={10} z={2} scale={1.4}><ParkBench /></Place></SpringUp>
      <SpringUp delay={1.9}>
        <Place x={11.5} z={1.5} scale={0.65} rotY={-0.4}>
          <Person3D shirtColor="#0891B2" serviceColor="#8B5CF6" serviceName="ট্রেড লাইসেন্স" />
        </Place>
      </SpringUp>
      <SpringUp delay={0.9}><Place x={12.5} z={1.5} scale={1.4} rotY={-0.1}><CarParked color="#F59E0B" /></Place></SpringUp>

      {/* --- Block 6: Far-right background --- */}
      <SpringUp delay={0.5}><Place x={15} z={1} scale={1.4}><Apartment color="#64748B" floors={5} /></Place></SpringUp>
      <SpringUp delay={0.6}><Place x={14} z={2} scale={1.5}><TallBuilding /></Place></SpringUp>
      <SpringUp delay={0.8}><Place x={16} z={0} scale={1.3}><StreetLight /></Place></SpringUp>
      <SpringUp delay={0.7}><Place x={14.5} z={-0.5} scale={1.3}><Apartment color="#94A3B8" floors={3} /></Place></SpringUp>

      {/* Data flows → office */}
      <DataFlowLine startX={-10} endX={0} z={3} color="#22C55E" speed={0.08} />
      <DataFlowLine startX={-14} endX={0} z={1} color="#F472B6" speed={0.06} />
      <DataFlowLine startX={10} endX={0} z={3} color="#3B82F6" speed={0.07} />
      <DataFlowLine startX={14} endX={0} z={1} color="#06B6D4" speed={0.05} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HTML OVERLAY
   ═══════════════════════════════════════════════════════════════ */
export function TitleContent({ active }: SlideProps) {
  if (!active) return null;

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      {/* Branding */}
      <motion.div className="absolute z-20 left-1/2 -translate-x-1/2 top-[3%] pointer-events-auto"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl border border-white/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1A56DB] to-[#3B82F6] flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-none">Poura<span className="text-[#1A56DB]">Seva</span></h1>
            <p className="text-xs font-bangla font-bold text-gray-600 dark:text-gray-300">ডিজিটাল পৌরসভা ব্যবস্থাপনা প্ল্যাটফর্ম</p>
          </div>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.div className="absolute z-10 left-1/2 -translate-x-1/2 top-[13%]"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <p className="text-sm font-bangla font-bold text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur px-5 py-1.5 rounded-full">
          গ্রাম ও শহরকে এক সুতোয় বাঁধছে পৌরসেবা
        </p>
      </motion.div>

      {/* Legend */}
      <motion.div className="absolute z-10 left-[4%] bottom-[22%]"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }}>
        <span className="text-xs font-bold text-green-700 dark:text-green-300 flex items-center gap-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur px-3 py-1 rounded-full">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> গ্রাম
        </span>
      </motion.div>
      <motion.div className="absolute z-10 right-[4%] bottom-[22%]"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }}>
        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur px-3 py-1 rounded-full">
          শহর <span className="w-3 h-3 rounded-full bg-gray-400 inline-block" />
        </span>
      </motion.div>

      {/* Stats */}
      <motion.div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[6%] flex items-center gap-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full px-7 py-2.5 shadow-xl"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }}>
        {[{ v: '৫০+', l: 'সেবা' }, { v: '২৪/৭', l: 'অনলাইন' }, { v: '১০০%', l: 'স্বচ্ছতা' }].map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-xl font-extrabold text-[#1A56DB]">{s.v}</span>
            <span className="text-[10px] font-bangla text-gray-500 dark:text-gray-400">{s.l}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
