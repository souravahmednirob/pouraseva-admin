'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Building2, Check } from 'lucide-react';

interface SlideProps { active: boolean; }

/* ═══════════════════════════════════════════════════════════
   SPRING-UP ANIMATION WRAPPER
   ═══════════════════════════════════════════════════════════ */
function SpringUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = Math.max(0, Math.min(1, (s.clock.elapsedTime - delay) / 0.7));
    const ease = t * t * (3 - 2 * t);
    ref.current.scale.setScalar(ease);
  });
  return <group ref={ref}>{children}</group>;
}

/* ═══════════════════════════════════════════════════════════
   TIN-ROOF HUT — Bangladeshi village house with raised plinth
   Corrugated tin roof, mud/bamboo walls, small veranda
   ═══════════════════════════════════════════════════════════ */
function TinRoofHut({ position, scale = 1, wallColor = '#D2B48C' }: { position: [number, number, number]; scale?: number; wallColor?: string }) {
  return (
    <group position={position} scale={scale}>
      {/* Raised earth plinth */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.0, 0.16, 0.7]} />
        <meshStandardMaterial color="#8B7355" roughness={1} />
      </mesh>
      {/* Mud/bamboo walls */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.9, 0.52, 0.6]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>
      {/* Tin roof — two slanting sides */}
      <mesh position={[0, 0.78, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.1, 0.04, 0.8]} />
        <meshStandardMaterial color="#7B8794" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.82, -0.18]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[1.1, 0.04, 0.45]} />
        <meshStandardMaterial color="#8B9DAF" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.82, 0.18]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[1.1, 0.04, 0.45]} />
        <meshStandardMaterial color="#6B7B8C" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Door */}
      <mesh position={[0.1, 0.34, 0.305]}>
        <boxGeometry args={[0.18, 0.38, 0.01]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      {/* Window */}
      <mesh position={[-0.22, 0.48, 0.305]}>
        <boxGeometry args={[0.14, 0.14, 0.01]} />
        <meshStandardMaterial color="#5C3317" transparent opacity={0.5} />
      </mesh>
      {/* Small veranda posts */}
      <mesh position={[-0.35, 0.42, 0.35]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 4]} />
        <meshStandardMaterial color="#6B4423" />
      </mesh>
      <mesh position={[0.35, 0.42, 0.35]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 4]} />
        <meshStandardMaterial color="#6B4423" />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   BAMBOO FENCE — village compound boundary
   ═══════════════════════════════════════════════════════════ */
function BambooFence({ position, length = 2, rotation = 0 }: { position: [number, number, number]; length?: number; rotation?: number }) {
  const posts = Math.floor(length / 0.3);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Horizontal bamboo rails */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[length, 0.03, 0.03]} />
        <meshStandardMaterial color="#8B7B3B" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[length, 0.03, 0.03]} />
        <meshStandardMaterial color="#9B8B4B" roughness={0.9} />
      </mesh>
      {/* Vertical bamboo posts */}
      {Array.from({ length: posts }).map((_, i) => (
        <mesh key={i} position={[-length / 2 + i * (length / posts) + 0.15, 0.22, 0]}>
          <cylinderGeometry args={[0.015, 0.018, 0.44, 4]} />
          <meshStandardMaterial color="#7B6B2B" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   BANANA TREE — distinct from palm, wide leaves
   ═══════════════════════════════════════════════════════════ */
function BananaTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.3 + position[0]) * 0.02;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Thick trunk */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.1, 8]} />
        <meshStandardMaterial color="#5D8C3E" roughness={0.8} />
      </mesh>
      {/* Large drooping leaves */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.15, 1.1 + i * 0.03, Math.sin(angle) * 0.15]}
          rotation={[0.4 + i * 0.1, angle, 0.3]}>
          <boxGeometry args={[0.06, 0.45, 0.01]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#2D8B1E' : '#3DA52E'} roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Banana bunch */}
      <mesh position={[0.12, 0.85, 0.05]}>
        <sphereGeometry args={[0.06, 6, 4]} />
        <meshStandardMaterial color="#E8C840" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   PALM TREE — tall coconut palm, village style
   ═══════════════════════════════════════════════════════════ */
function PalmTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.4 + position[0] * 3) * 0.03;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Curved trunk */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.035, 0.06, 1.2, 6]} />
        <meshStandardMaterial color="#92400E" roughness={0.9} />
      </mesh>
      {/* Crown of fronds */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.35, 10, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 1.45, 0]}>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
      {/* Coconuts */}
      <mesh position={[0, 1.08, 0.06]}>
        <sphereGeometry args={[0.04, 6, 4]} />
        <meshStandardMaterial color="#6B4423" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   POND — village water body with lily pads
   ═══════════════════════════════════════════════════════════ */
function Pond({ position, radius = 0.4 }: { position: [number, number, number]; radius?: number }) {
  return (
    <group position={position}>
      {/* Water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 20]} />
        <meshStandardMaterial color="#3B82C4" roughness={0.05} metalness={0.4} transparent opacity={0.7} />
      </mesh>
      {/* Pond edge — mud bank */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <circleGeometry args={[radius + 0.06, 20]} />
        <meshStandardMaterial color="#6B5B3B" roughness={1} />
      </mesh>
      {/* Lily pads */}
      {[[-0.1, 0.01, 0.08], [0.12, 0.01, -0.05], [-0.05, 0.01, -0.12]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[-Math.PI / 2, 0, i * 1.5]}>
          <circleGeometry args={[0.04, 8]} />
          <meshStandardMaterial color="#22C55E" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   RICE FIELD — bright green paddy with crop rows
   ═══════════════════════════════════════════════════════════ */
function RiceField({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Paddy water base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[0.7, 0.9]} />
        <meshStandardMaterial color="#7BC67E" roughness={0.85} />
      </mesh>
      {/* Raised mud border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[0.8, 1.0]} />
        <meshStandardMaterial color="#6B5B3B" roughness={1} />
      </mesh>
      {/* Rice stalks */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i}
          position={[-0.28 + (i % 5) * 0.14, 0.08, -0.35 + Math.floor(i / 5) * 0.28]}
          rotation={[0.08, 0, (i % 2 ? 0.06 : -0.06)]}>
          <cylinderGeometry args={[0.003, 0.003, 0.16, 3]} />
          <meshStandardMaterial color="#65a30d" />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   HAYSTACK — village element
   ═══════════════════════════════════════════════════════════ */
function Haystack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.18, 0]}>
        <coneGeometry args={[0.2, 0.36, 8]} />
        <meshStandardMaterial color="#C4A84B" roughness={1} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   COW — simple village cow
   ═══════════════════════════════════════════════════════════ */
function Cow({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.1;
  });
  return (
    <group ref={ref} position={position} scale={0.35}>
      {/* Body */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.7, 0.4, 0.35]} />
        <meshStandardMaterial color="#8B6E4E" roughness={0.9} />
      </mesh>
      {/* Head */}
      <mesh position={[0.4, 0.58, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.2]} />
        <meshStandardMaterial color="#7B5E3E" roughness={0.9} />
      </mesh>
      {/* Horns */}
      <mesh position={[0.42, 0.74, 0.06]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.01, 0.02, 0.12, 4]} />
        <meshStandardMaterial color="#D4C8A0" />
      </mesh>
      <mesh position={[0.42, 0.74, -0.06]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.01, 0.02, 0.12, 4]} />
        <meshStandardMaterial color="#D4C8A0" />
      </mesh>
      {/* Legs */}
      {[[-0.2, 0, 0.1], [-0.2, 0, -0.1], [0.2, 0, 0.1], [0.2, 0, -0.1]].map((p, i) => (
        <mesh key={i} position={[p[0], 0.14, p[2]]}>
          <cylinderGeometry args={[0.03, 0.04, 0.28, 4]} />
          <meshStandardMaterial color="#7B5E3E" roughness={0.9} />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.008, 0.012, 0.3, 3]} />
        <meshStandardMaterial color="#5B3E1E" />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   REALISTIC 3D PERSON — proper proportions with service phone
   Each person has a floating HTML popup showing service name
   ═══════════════════════════════════════════════════════════ */
function Person3D({
  position, shirtColor, pantsColor = '#1E3A5F', headColor = '#8D6E4C',
  scale = 1, hasLungi = false, wearsSari = false, serviceColor = '#3B82F6',
  serviceName = ''
}: {
  position: [number, number, number]; shirtColor: string; pantsColor?: string;
  headColor?: string; scale?: number; hasLungi?: boolean; wearsSari?: boolean;
  serviceColor?: string; serviceName?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const phoneGlow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.0 + position[0] * 2) * 0.01;
    }
    if (phoneGlow.current) {
      phoneGlow.current.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 2.5) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* HEAD — slightly oval */}
      <mesh position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.1, 14, 12]} />
        <meshStandardMaterial color={headColor} roughness={0.55} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.3, -0.01]}>
        <sphereGeometry args={[0.102, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={wearsSari ? '#1a0f09' : '#0a0705'} roughness={0.9} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.033, 1.235, 0.088]}>
        <sphereGeometry args={[0.013, 8, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.033, 1.235, 0.088]}>
        <sphereGeometry args={[0.013, 8, 6]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.033, 1.235, 0.096]}>
        <sphereGeometry args={[0.007, 6, 4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.033, 1.235, 0.096]}>
        <sphereGeometry args={[0.007, 6, 4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 1.2, 0.095]}>
        <sphereGeometry args={[0.015, 6, 4]} />
        <meshStandardMaterial color={headColor} roughness={0.6} />
      </mesh>
      {/* Ears */}
      <mesh position={[0.095, 1.22, 0]}>
        <sphereGeometry args={[0.022, 6, 4]} />
        <meshStandardMaterial color={headColor} roughness={0.6} />
      </mesh>
      <mesh position={[-0.095, 1.22, 0]}>
        <sphereGeometry args={[0.022, 6, 4]} />
        <meshStandardMaterial color={headColor} roughness={0.6} />
      </mesh>
      {/* NECK */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.04, 0.048, 0.1, 8]} />
        <meshStandardMaterial color={headColor} roughness={0.6} />
      </mesh>

      {wearsSari ? (
        <>
          {/* Sari blouse upper */}
          <mesh position={[0, 0.92, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.22, 10]} />
            <meshStandardMaterial color={shirtColor} roughness={0.45} />
          </mesh>
          {/* Sari lower — flowing A-line */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.1, 0.2, 0.65, 10]} />
            <meshStandardMaterial color={shirtColor} roughness={0.45} />
          </mesh>
          {/* Gold border at bottom */}
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.04, 10]} />
            <meshStandardMaterial color="#FCD34D" roughness={0.3} metalness={0.4} />
          </mesh>
          {/* Anchal/pallu draped */}
          <mesh position={[0.06, 0.88, 0.06]} rotation={[0.15, 0, 0.45]}>
            <boxGeometry args={[0.035, 0.32, 0.13]} />
            <meshStandardMaterial color={shirtColor} roughness={0.45} transparent opacity={0.85} />
          </mesh>
          {/* Left arm */}
          <mesh position={[-0.14, 0.85, 0]} rotation={[0.1, 0, 0.2]}>
            <cylinderGeometry args={[0.025, 0.028, 0.3, 6]} />
            <meshStandardMaterial color={headColor} roughness={0.6} />
          </mesh>
          {/* Bangles */}
          <mesh position={[-0.16, 0.7, -0.02]}>
            <torusGeometry args={[0.03, 0.005, 6, 12]} />
            <meshStandardMaterial color="#FCD34D" metalness={0.6} roughness={0.2} />
          </mesh>
          {/* Sandals */}
          <mesh position={[-0.04, 0.1, 0.03]}>
            <boxGeometry args={[0.05, 0.025, 0.1]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          <mesh position={[0.04, 0.1, 0.03]}>
            <boxGeometry args={[0.05, 0.025, 0.1]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
        </>
      ) : (
        <>
          {/* TORSO / SHIRT — with collar hint */}
          <mesh position={[0, 0.82, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.42, 10]} />
            <meshStandardMaterial color={shirtColor} roughness={0.45} />
          </mesh>
          {/* Collar */}
          <mesh position={[0, 1.02, 0.04]}>
            <boxGeometry args={[0.09, 0.03, 0.06]} />
            <meshStandardMaterial color={shirtColor} roughness={0.4} />
          </mesh>
          {/* Left arm — upper */}
          <mesh position={[-0.15, 0.82, 0]} rotation={[0.05, 0, 0.18]}>
            <cylinderGeometry args={[0.028, 0.032, 0.2, 6]} />
            <meshStandardMaterial color={shirtColor} roughness={0.5} />
          </mesh>
          {/* Left forearm */}
          <mesh position={[-0.18, 0.68, 0.04]} rotation={[0.3, 0, 0.1]}>
            <cylinderGeometry args={[0.022, 0.028, 0.18, 6]} />
            <meshStandardMaterial color={headColor} roughness={0.6} />
          </mesh>

          {hasLungi ? (
            <>
              {/* LUNGI */}
              <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.12, 0.16, 0.45, 10]} />
                <meshStandardMaterial color="#2E8B57" roughness={0.65} />
              </mesh>
              {/* Lungi check pattern — horizontal stripes */}
              {[0.25, 0.35, 0.45, 0.55].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                  <cylinderGeometry args={[0.122 + (0.55 - y) * 0.08, 0.124 + (0.55 - y) * 0.08, 0.015, 10]} />
                  <meshStandardMaterial color="#1E6B3A" roughness={0.65} />
                </mesh>
              ))}
              {/* Gamcha over shoulder */}
              <mesh position={[-0.1, 0.9, 0.04]} rotation={[0, 0, 0.55]}>
                <boxGeometry args={[0.03, 0.4, 0.09]} />
                <meshStandardMaterial color="#E97451" roughness={0.65} />
              </mesh>
              {/* Bare feet */}
              <mesh position={[-0.04, 0.1, 0.03]}>
                <boxGeometry args={[0.05, 0.03, 0.1]} />
                <meshStandardMaterial color={headColor} roughness={0.7} />
              </mesh>
              <mesh position={[0.04, 0.1, 0.03]}>
                <boxGeometry args={[0.05, 0.03, 0.1]} />
                <meshStandardMaterial color={headColor} roughness={0.7} />
              </mesh>
            </>
          ) : (
            <>
              {/* Belt line */}
              <mesh position={[0, 0.61, 0]}>
                <cylinderGeometry args={[0.115, 0.115, 0.025, 10]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
              </mesh>
              {/* PANTS — two legs */}
              <mesh position={[-0.045, 0.38, 0]}>
                <cylinderGeometry args={[0.04, 0.048, 0.42, 8]} />
                <meshStandardMaterial color={pantsColor} roughness={0.45} />
              </mesh>
              <mesh position={[0.045, 0.38, 0]}>
                <cylinderGeometry args={[0.04, 0.048, 0.42, 8]} />
                <meshStandardMaterial color={pantsColor} roughness={0.45} />
              </mesh>
              {/* Shoes */}
              <mesh position={[-0.045, 0.12, 0.03]}>
                <boxGeometry args={[0.055, 0.045, 0.11]} />
                <meshStandardMaterial color="#2C2C2C" roughness={0.3} />
              </mesh>
              <mesh position={[0.045, 0.12, 0.03]}>
                <boxGeometry args={[0.055, 0.045, 0.11]} />
                <meshStandardMaterial color="#2C2C2C" roughness={0.3} />
              </mesh>
            </>
          )}
        </>
      )}

      {/* RIGHT ARM holding phone — upper arm */}
      <mesh position={[0.14, 0.86, 0.04]} rotation={[-0.7, 0, -0.25]}>
        <cylinderGeometry args={[0.028, 0.032, 0.2, 6]} />
        <meshStandardMaterial color={wearsSari ? headColor : shirtColor} roughness={0.5} />
      </mesh>
      {/* Right forearm */}
      <mesh position={[0.17, 0.78, 0.15]} rotation={[-0.15, 0, -0.1]}>
        <cylinderGeometry args={[0.022, 0.028, 0.18, 6]} />
        <meshStandardMaterial color={headColor} roughness={0.6} />
      </mesh>
      {/* Hand */}
      <mesh position={[0.18, 0.72, 0.22]}>
        <sphereGeometry args={[0.025, 8, 6]} />
        <meshStandardMaterial color={headColor} roughness={0.6} />
      </mesh>
      {/* PHONE */}
      <mesh position={[0.18, 0.78, 0.24]} rotation={[0.6, 0, -0.05]}>
        <boxGeometry args={[0.065, 0.11, 0.01]} />
        <meshStandardMaterial color="#111827" roughness={0.15} metalness={0.2} />
      </mesh>
      {/* Phone screen glow */}
      <mesh position={[0.18, 0.78, 0.247]} rotation={[0.6, 0, -0.05]}>
        <boxGeometry args={[0.055, 0.09, 0.003]} />
        <meshStandardMaterial ref={phoneGlow} color={serviceColor} emissive={serviceColor} emissiveIntensity={0.6} />
      </mesh>

      {/* SERVICE NAME POPUP — HTML floating above person */}
      {serviceName && (
        <Html position={[0, 1.65, 0]} center distanceFactor={6} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: serviceColor,
            color: 'white',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: `0 2px 12px ${serviceColor}66`,
            fontFamily: '"Hind Siliguri", sans-serif',
            lineHeight: 1.4,
            textAlign: 'center',
          }}>
            {serviceName}
            <div style={{
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `5px solid ${serviceColor}`,
              margin: '-4px auto 0',
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
            }} />
          </div>
        </Html>
      )}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   WALKING PERSON (small, animated along road)
   ═══════════════════════════════════════════════════════════ */
function Walker({ startX, endX, z, color, speed, offset }: {
  startX: number; endX: number; z: number; color: string; speed: number; offset: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = ((s.clock.elapsedTime * speed + offset) % 1);
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = Math.abs(Math.sin(s.clock.elapsedTime * 6)) * 0.012;
  });
  return (
    <group ref={ref} position={[startX, 0, z]} scale={0.4}>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.06, 8, 6]} />
        <meshStandardMaterial color="#C4956A" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.24, 6]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[-0.025, 0.0, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.14, 4]} />
        <meshStandardMaterial color="#555" roughness={0.6} />
      </mesh>
      <mesh position={[0.025, 0.0, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.14, 4]} />
        <meshStandardMaterial color="#555" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   POURASHAVA OFFICE — center landmark with Bangladesh flag
   ═══════════════════════════════════════════════════════════ */
function Office({ position }: { position: [number, number, number] }) {
  const flagRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (flagRef.current) flagRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 2) * 0.12;
  });
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.5, 1.5, 1]} />
        <meshStandardMaterial color="#2563EB" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Roof trim */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[1.6, 0.1, 1.1]} />
        <meshStandardMaterial color="#1D4ED8" roughness={0.3} />
      </mesh>
      {/* Windows grid */}
      {[-0.45, -0.15, 0.15, 0.45].map((x, i) =>
        [0.25, 0.55, 0.85, 1.15].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[x, y, 0.505]}>
            <boxGeometry args={[0.16, 0.13, 0.01]} />
            <meshStandardMaterial color="#BFDBFE" emissive="#60A5FA" emissiveIntensity={0.25} transparent opacity={0.8} />
          </mesh>
        ))
      )}
      {/* Main entrance door */}
      <mesh position={[0, 0.2, 0.505]}>
        <boxGeometry args={[0.28, 0.4, 0.01]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>
      {/* Door arch */}
      <mesh position={[0, 0.42, 0.51]}>
        <sphereGeometry args={[0.02, 8, 6]} />
        <meshStandardMaterial color="#FCD34D" emissive="#FCD34D" emissiveIntensity={0.8} />
      </mesh>
      {/* Flag pole */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.1, 6]} />
        <meshStandardMaterial color="#6B7280" metalness={0.5} />
      </mesh>
      {/* Bangladesh flag */}
      <mesh ref={flagRef} position={[0.18, 2.45, 0]}>
        <boxGeometry args={[0.32, 0.2, 0.008]} />
        <meshStandardMaterial color="#006A4E" />
      </mesh>
      <mesh position={[0.15, 2.45, 0.005]}>
        <circleGeometry args={[0.055, 16]} />
        <meshStandardMaterial color="#F42A41" side={THREE.DoubleSide} />
      </mesh>
      {/* Steps */}
      <mesh position={[0, 0.03, 0.65]}>
        <boxGeometry args={[0.7, 0.06, 0.25]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
      </mesh>
      {/* PouraSeva sign board */}
      <mesh position={[0, 1.38, 0.51]}>
        <boxGeometry args={[0.7, 0.12, 0.01]} />
        <meshStandardMaterial color="#FEF3C7" emissive="#FCD34D" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY BUILDINGS — Modern concrete structures
   ═══════════════════════════════════════════════════════════ */
function TallBuilding({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.7, 2.6, 0.55]} />
        <meshStandardMaterial color="#64748B" roughness={0.15} metalness={0.35} />
      </mesh>
      {/* Glass windows — blue tinted */}
      {[-0.16, 0.16].map((x, i) =>
        [0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[x, y, 0.28]}>
            <boxGeometry args={[0.14, 0.12, 0.01]} />
            <meshStandardMaterial color="#93C5FD" emissive="#3B82F6" emissiveIntensity={j % 3 === 0 ? 0.4 : 0.1} transparent opacity={0.75} />
          </mesh>
        ))
      )}
      {/* Antenna */}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.3, 4]} />
        <meshStandardMaterial color="#9CA3AF" metalness={0.5} />
      </mesh>
      <mesh position={[0, 2.92, 0]}>
        <sphereGeometry args={[0.025, 8, 6]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Hospital({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.55]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
      </mesh>
      {/* Red cross */}
      <mesh position={[0, 1, 0.28]}>
        <boxGeometry args={[0.25, 0.07, 0.01]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1, 0.28]}>
        <boxGeometry args={[0.07, 0.25, 0.01]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.5} />
      </mesh>
      {/* Windows */}
      {[-0.2, 0.2].map((x, i) =>
        [0.35, 0.65].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[x, y, 0.28]}>
            <boxGeometry args={[0.12, 0.1, 0.01]} />
            <meshStandardMaterial color="#BFDBFE" transparent opacity={0.7} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0.15, 0.28]}>
        <boxGeometry args={[0.18, 0.3, 0.01]} />
        <meshStandardMaterial color="#93C5FD" />
      </mesh>
    </group>
  );
}

function ShoppingMall({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.0, 1.0, 0.6]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Glass facade */}
      <mesh position={[0, 0.5, 0.305]}>
        <boxGeometry args={[0.9, 0.85, 0.01]} />
        <meshStandardMaterial color="#93C5FD" transparent opacity={0.4} metalness={0.3} />
      </mesh>
      {/* Awning */}
      <mesh position={[0, 1.05, 0.38]}>
        <boxGeometry args={[1.1, 0.06, 0.2]} />
        <meshStandardMaterial color="#1E40AF" roughness={0.3} />
      </mesh>
      {/* Shop signs */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.85, 0.32]}>
          <boxGeometry args={[0.25, 0.08, 0.01]} />
          <meshStandardMaterial color={i === 0 ? '#F59E0B' : '#10B981'} emissive={i === 0 ? '#F59E0B' : '#10B981'} emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Entrance */}
      <mesh position={[0, 0.22, 0.31]}>
        <boxGeometry args={[0.25, 0.44, 0.01]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE TOWER — with signal rings
   ═══════════════════════════════════════════════════════════ */
function MobileTower({ position }: { position: [number, number, number] }) {
  const lightMat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (lightMat.current) lightMat.current.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 3) * 0.5;
  });
  return (
    <group position={position}>
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.025, 0.05, 2.0, 6]} />
        <meshStandardMaterial color="#6B7280" metalness={0.5} roughness={0.3} />
      </mesh>
      {[0.45, 0.9, 1.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.3 - i * 0.05, 4]} />
          <meshStandardMaterial color="#9CA3AF" />
        </mesh>
      ))}
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.035, 8, 6]} />
        <meshStandardMaterial ref={lightMat} color="#EF4444" emissive="#EF4444" emissiveIntensity={1} />
      </mesh>
      <SignalRing pos={[0, 1.8, 0]} offset={0} />
      <SignalRing pos={[0, 1.8, 0]} offset={0.6} />
      <SignalRing pos={[0, 1.8, 0]} offset={1.2} />
    </group>
  );
}

function SignalRing({ pos, offset }: { pos: [number, number, number]; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (!ref.current || !mat.current) return;
    const t = ((s.clock.elapsedTime + offset) % 2) / 2;
    ref.current.scale.setScalar(0.3 + t * 1.8);
    mat.current.opacity = 1 - t;
  });
  return (
    <mesh ref={ref} position={pos} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.12, 0.008, 8, 24]} />
      <meshStandardMaterial ref={mat} color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.6} transparent />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY STREET LIGHT
   ═══════════════════════════════════════════════════════════ */
function StreetLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.015, 0.025, 1.4, 6]} />
        <meshStandardMaterial color="#4B5563" metalness={0.5} />
      </mesh>
      {/* Lamp arm */}
      <mesh position={[0.12, 1.35, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 4]} />
        <meshStandardMaterial color="#4B5563" metalness={0.5} />
      </mesh>
      {/* Light */}
      <mesh position={[0.22, 1.3, 0]}>
        <sphereGeometry args={[0.04, 8, 6]} />
        <meshStandardMaterial color="#FEF9C3" emissive="#FCD34D" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY TREE — small tree in concrete planter
   ═══════════════════════════════════════════════════════════ */
function CityTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.16, 8]} />
        <meshStandardMaterial color="#9CA3AF" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.5, 6]} />
        <meshStandardMaterial color="#78350F" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.24, 10, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CNG AUTO-RICKSHAW — city vehicle
   ═══════════════════════════════════════════════════════════ */
function AutoRickshaw({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(s.clock.elapsedTime * 0.3) * 0.3;
    }
  });
  return (
    <group ref={ref} position={position} scale={0.35}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.35]} />
        <meshStandardMaterial color="#22C55E" roughness={0.4} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.55, 0.05, 0.4]} />
        <meshStandardMaterial color="#166534" roughness={0.4} />
      </mesh>
      {/* Front */}
      <mesh position={[0.28, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.25, 0.3]} />
        <meshStandardMaterial color="#166534" roughness={0.4} />
      </mesh>
      {/* Wheels */}
      {[[-0.15, 0.08, 0.2], [-0.15, 0.08, -0.2], [0.2, 0.08, 0]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA STREAM — glowing particle from person to office
   ═══════════════════════════════════════════════════════════ */
function DataStream({ from, to, color, speed = 0.25 }: {
  from: [number, number, number]; to: [number, number, number]; color: string; speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    if (!ref.current || !mat.current) return;
    const t = (s.clock.elapsedTime * speed) % 1;
    ref.current.position.set(
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI) * 0.4,
      from[2] + (to[2] - from[2]) * t
    );
    mat.current.opacity = t < 0.05 || t > 0.95 ? 0 : 0.9;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 6]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={1.5} transparent />
    </mesh>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN 3D SCENE — Village left | Office center | City right
   ═══════════════════════════════════════════════════════════════════════════════ */
export function TitleScene({ active }: SlideProps) {
  const sceneRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (active) {
      camera.position.set(0, 4, 8);
      camera.lookAt(0, 0, 0);
    }
    return () => {
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
    };
  }, [active, camera]);

  useFrame((state) => {
    if (sceneRef.current && active) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  if (!active) return null;

  return (
    <group ref={sceneRef} rotation={[0, 0, 0]} position={[0, -0.3, 0]} scale={1.0}>
      {/* Scene lighting */}
      <directionalLight position={[5, 8, 5]} intensity={1.0} color="#FFF8E7" />
      <directionalLight position={[-5, 6, 3]} intensity={0.4} color="#E0F2FE" />
      <hemisphereLight args={['#87CEEB', '#4ade80', 0.35]} />

      {/* ═══ SKY BACKDROP — matches page bg ═══ */}
      <mesh position={[0, 4, -12]}>
        <planeGeometry args={[100, 60]} />
        <meshStandardMaterial color="#F0F7FF" side={THREE.DoubleSide} />
      </mesh>
      {/* ═══ FLOOR — matches page bg, hides wireframe ═══ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#F0F7FF" side={THREE.DoubleSide} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════
          VILLAGE GROUND — lush green with earth tones
         ══════════════════════════════════════════════════════════════ */}
      {/* Main village ground - bright green grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, -0.01, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#4ade80" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Village border — darker green edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, -0.02, 0]}>
        <planeGeometry args={[7.3, 7.3]} />
        <meshStandardMaterial color="#15803d" side={THREE.DoubleSide} />
      </mesh>
      {/* Dirt courtyard patches */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.2, 0.001, 0.2]}>
        <circleGeometry args={[0.6, 12]} />
        <meshStandardMaterial color="#B8976A" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.5, 0.001, -0.5]}>
        <circleGeometry args={[0.45, 12]} />
        <meshStandardMaterial color="#C4A87A" roughness={1} side={THREE.DoubleSide} />
      </mesh>

      {/* Village dirt path — winding */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, 0.005, 2.2]}>
        <planeGeometry args={[6.5, 0.45]} />
        <meshStandardMaterial color="#b8976a" roughness={1} side={THREE.DoubleSide} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════
          CITY GROUND — gray concrete with markings
         ══════════════════════════════════════════════════════════════ */}
      {/* Main concrete ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, -0.01, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* City border — darker concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, -0.02, 0]}>
        <planeGeometry args={[7.3, 7.3]} />
        <meshStandardMaterial color="#94A3B8" side={THREE.DoubleSide} />
      </mesh>
      {/* Sidewalk strips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, 0.002, 1.7]}>
        <planeGeometry args={[6.5, 0.25]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, 0.002, 2.5]}>
        <planeGeometry args={[6.5, 0.25]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* City asphalt road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.8, 0.005, 2.1]}>
        <planeGeometry args={[6.5, 0.6]} />
        <meshStandardMaterial color="#1F2937" roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* Road lane markings */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[3.8 + x, 0.01, 2.1]}>
          <planeGeometry args={[0.35, 0.04]} />
          <meshStandardMaterial color="#FCD34D" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* ═══ CENTER DIVIDER — glowing blue line ═══ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[0.15, 7]} />
        <meshStandardMaterial color="#1A56DB" emissive="#1A56DB" emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════
          VILLAGE STRUCTURES
         ══════════════════════════════════════════════════════════════ */}
      <SpringUp delay={0.4}><TinRoofHut position={[-5.2, 0, -0.3]} scale={1.1} /></SpringUp>
      <SpringUp delay={0.6}><TinRoofHut position={[-3.5, 0, 0.7]} scale={0.85} wallColor="#C8A882" /></SpringUp>
      <SpringUp delay={0.8}><TinRoofHut position={[-2, 0, -1.2]} scale={0.95} wallColor="#BEA07A" /></SpringUp>

      {/* Bamboo fences around compound */}
      <SpringUp delay={1.0}><BambooFence position={[-5.5, 0, -1.0]} length={2.2} /></SpringUp>
      <SpringUp delay={1.1}><BambooFence position={[-4.5, 0, 1.2]} length={1.8} rotation={0.3} /></SpringUp>
      <SpringUp delay={1.2}><BambooFence position={[-1.5, 0, -0.3]} length={1.5} rotation={Math.PI / 2} /></SpringUp>

      {/* Palm trees */}
      <SpringUp delay={0.5}><PalmTree position={[-6.2, 0, 0.5]} scale={1.2} /></SpringUp>
      <SpringUp delay={0.7}><PalmTree position={[-4.8, 0, -1.8]} scale={1.0} /></SpringUp>
      <SpringUp delay={0.9}><PalmTree position={[-1.5, 0, 1.0]} scale={0.95} /></SpringUp>
      <SpringUp delay={1.1}><PalmTree position={[-3.2, 0, -2.2]} scale={0.8} /></SpringUp>

      {/* Banana trees */}
      <SpringUp delay={0.8}><BananaTree position={[-5.8, 0, -0.8]} scale={1.0} /></SpringUp>
      <SpringUp delay={1.0}><BananaTree position={[-2.8, 0, 1.0]} scale={0.85} /></SpringUp>
      <SpringUp delay={1.2}><BananaTree position={[-1.2, 0, -0.8]} scale={0.9} /></SpringUp>

      {/* Ponds */}
      <SpringUp delay={1.0}><Pond position={[-4.5, 0.01, 1.3]} radius={0.45} /></SpringUp>
      <SpringUp delay={1.1}><Pond position={[-2.2, 0.01, 0.2]} radius={0.3} /></SpringUp>

      {/* Rice fields */}
      <SpringUp delay={1.1}><RiceField position={[-1.8, 0, -0.2]} /></SpringUp>
      <SpringUp delay={1.2}><RiceField position={[-5.5, 0, 1.5]} scale={0.8} /></SpringUp>

      {/* Haystacks */}
      <SpringUp delay={1.3}><Haystack position={[-5, 0, 0.5]} /></SpringUp>
      <SpringUp delay={1.4}><Haystack position={[-3, 0, -0.3]} /></SpringUp>

      {/* Cow */}
      <SpringUp delay={1.5}><Cow position={[-4, 0, 0.3]} /></SpringUp>

      {/* ══════════════════════════════════════════════════════════════
          VILLAGE PEOPLE — using phones for different services
         ══════════════════════════════════════════════════════════════ */}
      {/* Man in lungi — Birth Certificate */}
      <SpringUp delay={1.6}>
        <Person3D position={[-3.5, 0, 0]} shirtColor="#F5F5DC" headColor="#8D6E4C" hasLungi scale={1.0} serviceColor="#22C55E" serviceName="জন্ম সনদ" />
      </SpringUp>
      {/* Woman in sari — Death Certificate */}
      <SpringUp delay={1.8}>
        <Person3D position={[-2.2, 0, -0.5]} shirtColor="#DC143C" headColor="#C09070" wearsSari scale={0.95} serviceColor="#6B7280" serviceName="মৃত্যু সনদ" />
      </SpringUp>
      {/* Man in lungi — Weather Alert */}
      <SpringUp delay={2.0}>
        <Person3D position={[-5.2, 0, 0.2]} shirtColor="#F59E0B" headColor="#8D6E4C" hasLungi scale={0.9} serviceColor="#F59E0B" serviceName="আবহাওয়া সতর্কতা" />
      </SpringUp>

      {/* ══════════════════════════════════════════════════════════════
          CENTER — POURASHAVA OFFICE
         ══════════════════════════════════════════════════════════════ */}
      <SpringUp delay={0.6}><Office position={[0, 0, -0.5]} /></SpringUp>

      {/* ══════════════════════════════════════════════════════════════
          CITY STRUCTURES
         ══════════════════════════════════════════════════════════════ */}
      <SpringUp delay={0.5}><TallBuilding position={[5, 0, -0.8]} /></SpringUp>
      <SpringUp delay={0.7}><Hospital position={[3, 0, 0.2]} /></SpringUp>
      <SpringUp delay={0.9}><ShoppingMall position={[1.5, 0, -0.8]} /></SpringUp>
      <SpringUp delay={0.8}><MobileTower position={[4.2, 0, 1.0]} /></SpringUp>

      {/* Street lights */}
      <SpringUp delay={1.0}><StreetLight position={[1.8, 0, 1.5]} /></SpringUp>
      <SpringUp delay={1.1}><StreetLight position={[3.5, 0, 1.5]} /></SpringUp>
      <SpringUp delay={1.2}><StreetLight position={[5.5, 0, 1.5]} /></SpringUp>

      {/* City trees in planters */}
      <SpringUp delay={1.1}><CityTree position={[1.3, 0, 0.6]} /></SpringUp>
      <SpringUp delay={1.2}><CityTree position={[5.5, 0, 0.2]} scale={0.85} /></SpringUp>
      <SpringUp delay={1.3}><CityTree position={[3.5, 0, -1.8]} scale={0.9} /></SpringUp>

      {/* Auto-rickshaw on city road */}
      <SpringUp delay={1.4}><AutoRickshaw position={[4, 0, 2.1]} /></SpringUp>

      {/* ══════════════════════════════════════════════════════════════
          CITY PEOPLE — using phones for different services
         ══════════════════════════════════════════════════════════════ */}
      {/* Man in formal — Tax Payment */}
      <SpringUp delay={1.6}>
        <Person3D position={[2.5, 0, 0.6]} shirtColor="#2563EB" pantsColor="#1E293B" headColor="#C4956A" scale={1.0} serviceColor="#3B82F6" serviceName="ট্যাক্স পেমেন্ট" />
      </SpringUp>
      {/* Woman — Water Bill */}
      <SpringUp delay={1.8}>
        <Person3D position={[4.2, 0, -0.3]} shirtColor="#7C3AED" headColor="#C4956A" wearsSari scale={0.95} serviceColor="#06B6D4" serviceName="পানির বিল" />
      </SpringUp>
      {/* Man in casual — Trade License */}
      <SpringUp delay={2.0}>
        <Person3D position={[5.5, 0, 0.4]} shirtColor="#0891B2" pantsColor="#374151" headColor="#C4956A" scale={0.9} serviceColor="#8B5CF6" serviceName="ট্রেড লাইসেন্স" />
      </SpringUp>

      {/* ══════════════════════════════════════════════════════════════
          WALKERS ON ROADS
         ══════════════════════════════════════════════════════════════ */}
      <Walker startX={-6.5} endX={-0.8} z={2.2} color="#E97451" speed={0.06} offset={0} />
      <Walker startX={-1} endX={-6} z={2.0} color="#14B8A6" speed={0.05} offset={2.5} />
      <Walker startX={1} endX={6.5} z={2.1} color="#2563EB" speed={0.055} offset={1} />
      <Walker startX={6} endX={1.5} z={1.9} color="#F472B6" speed={0.045} offset={3.5} />

      {/* ══════════════════════════════════════════════════════════════
          DATA STREAMS — from each person to Pourashava office
         ══════════════════════════════════════════════════════════════ */}
      <DataStream from={[-3.5, 1.2, 0]} to={[0, 1.8, -0.5]} color="#22C55E" speed={0.2} />
      <DataStream from={[-2.2, 1.1, -0.5]} to={[0, 1.5, -0.5]} color="#6B7280" speed={0.17} />
      <DataStream from={[-5.2, 1.0, 0.2]} to={[0, 1.6, -0.5]} color="#F59E0B" speed={0.15} />
      <DataStream from={[2.5, 1.2, 0.6]} to={[0, 1.7, -0.5]} color="#3B82F6" speed={0.18} />
      <DataStream from={[4.2, 1.1, -0.3]} to={[0, 1.4, -0.5]} color="#06B6D4" speed={0.16} />
      <DataStream from={[5.5, 1.0, 0.4]} to={[0, 1.3, -0.5]} color="#8B5CF6" speed={0.14} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HTML OVERLAY — Branding, labels, service badges
   ═══════════════════════════════════════════════════════════════════════════════ */
export function TitleContent({ active }: SlideProps) {
  if (!active) return null;

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      {/* Branding bar */}
      <motion.div className="absolute z-20 left-1/2 -translate-x-1/2 top-[2%] pointer-events-auto"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-3 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl rounded-2xl px-5 py-2.5 shadow-2xl border border-white/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A56DB] to-[#3B82F6] flex items-center justify-center shadow-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none">Poura<span className="text-[#1A56DB]">Seva</span></h1>
            <p className="text-[11px] font-bangla font-bold text-gray-600 dark:text-gray-300">ডিজিটাল পৌরসভা ব্যবস্থাপনা প্ল্যাটফর্ম</p>
          </div>
        </div>
      </motion.div>

      {/* Village label */}
      <motion.div className="absolute z-10 text-base font-bangla font-bold text-green-800 dark:text-green-300 bg-green-100/90 dark:bg-green-900/80 backdrop-blur px-4 py-1.5 rounded-full shadow-lg"
        style={{ left: '5%', top: '14%' }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>
        গ্রাম
      </motion.div>

      {/* City label */}
      <motion.div className="absolute z-10 text-base font-bangla font-bold text-blue-800 dark:text-blue-300 bg-blue-100/90 dark:bg-blue-900/80 backdrop-blur px-4 py-1.5 rounded-full shadow-lg"
        style={{ right: '5%', top: '14%' }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>
        শহর
      </motion.div>

      {/* Village services summary */}
      <motion.div className="absolute z-10 flex flex-col gap-1.5"
        style={{ left: '3%', top: '20%' }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }}>
        {[
          { label: 'জন্ম সনদ', bg: '#22C55E' },
          { label: 'মৃত্যু সনদ', bg: '#6B7280' },
          { label: 'আবহাওয়া সতর্কতা', bg: '#F59E0B' },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-2" style={{ fontSize: '12px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.bg }} />
            <span className="font-bangla font-bold text-gray-700 dark:text-gray-300">{b.label}</span>
          </div>
        ))}
      </motion.div>

      {/* City services summary */}
      <motion.div className="absolute z-10 flex flex-col gap-1.5 items-end"
        style={{ right: '3%', top: '20%' }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }}>
        {[
          { label: 'ট্যাক্স পেমেন্ট', bg: '#3B82F6' },
          { label: 'পানির বিল', bg: '#06B6D4' },
          { label: 'ট্রেড লাইসেন্স', bg: '#8B5CF6' },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-2" style={{ fontSize: '12px' }}>
            <span className="font-bangla font-bold text-gray-700 dark:text-gray-300">{b.label}</span>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.bg }} />
          </div>
        ))}
      </motion.div>

      {/* Stats bar — bottom center */}
      <motion.div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[10%] flex items-center gap-6 bg-white/85 dark:bg-gray-800/85 backdrop-blur-xl rounded-full px-7 py-2.5 shadow-xl"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.0 }}>
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
