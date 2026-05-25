'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Html,
  Icosahedron,
  Line,
  MeshDistortMaterial,
  OrbitControls,
  PointMaterial,
  Points,
} from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * The scene depicts a small service mesh: a central "core" (the app)
 * surrounded by the actual systems Aakarsh integrates daily. Lines are
 * the network edges; the small bright spheres traveling along them are
 * data "packets" (request/response cycles). It's an architecture
 * diagram, not random geometry.
 */

type ServiceNode = {
  id: string;
  label: string;
  sub: string;
  pos: [number, number, number];
  color: string;
  speed: number;
  offset: number;
};

const NODES: ServiceNode[] = [
  { id: 'postgres',  label: 'POSTGRES',  sub: 'source of truth',  pos: [ 2.5,  0.5,  0.2], color: '#6ea8ff', speed: 0.55, offset: 0.1 },
  { id: 'redis',     label: 'REDIS',     sub: 'cache · queues',   pos: [-2.6,  0.2, -0.4], color: '#ff4d6d', speed: 0.75, offset: 0.6 },
  { id: 'aerospike', label: 'AEROSPIKE', sub: 'low-latency kv',   pos: [ 0.6,  2.3, -0.5], color: '#ffb020', speed: 0.6,  offset: 1.2 },
  { id: 'kafka',     label: 'KAFKA',     sub: 'event stream',     pos: [-1.0, -2.1,  0.6], color: '#a78bfa', speed: 0.5,  offset: 1.7 },
  { id: 'llm',       label: 'LLM · RAG', sub: 'langchain · vec',  pos: [ 1.9, -1.5,  1.0], color: '#00ff9c', speed: 0.7,  offset: 0.4 },
  { id: 'kyc',       label: 'KYC · PAY', sub: '3p integrations',  pos: [-1.7,  1.7,  0.8], color: '#ffffff', speed: 0.65, offset: 1.0 },
];

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(700 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 14;
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.015;
      ref.current.rotation.x += dt * 0.004;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#6a6a6a"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function CoreOrb() {
  const wire = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (wire.current) {
      wire.current.rotation.x += dt * 0.12;
      wire.current.rotation.y += dt * 0.16;
    }
  });
  return (
    <group>
      {/* Solid distorted core — the app */}
      <Icosahedron args={[0.85, 1]}>
        <MeshDistortMaterial
          color="#0b0b0b"
          emissive="#003f26"
          emissiveIntensity={0.45}
          roughness={0.4}
          metalness={0.6}
          distort={0.32}
          speed={1.4}
          flatShading
        />
      </Icosahedron>
      {/* Wireframe shell */}
      <Icosahedron ref={wire} args={[0.98, 1]}>
        <meshBasicMaterial wireframe color="#00ff9c" transparent opacity={0.5} />
      </Icosahedron>
      {/* Label */}
      <Html center distanceFactor={7} position={[0, -1.25, 0]} zIndexRange={[10, 0]} pointerEvents="none">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--accent)] whitespace-nowrap select-none">
          core · api
        </div>
      </Html>
    </group>
  );
}

const ORIGIN = new THREE.Vector3(0, 0, 0);

function Packet({
  to,
  color,
  speed,
  offset,
}: {
  to: THREE.Vector3;
  color: string;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    // 0 -> 1 outbound, 1 -> 2 inbound, loops at 2
    const t = (state.clock.elapsedTime * speed + offset) % 2;
    const k = t < 1 ? t : 2 - t;
    // ease-in-out for a more natural flow
    const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    ref.current.position.lerpVectors(ORIGIN, to, eased);
    const pulse = 0.7 + Math.sin(t * Math.PI) * 0.5;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function Satellite({ node }: { node: ServiceNode }) {
  const target = useMemo(() => new THREE.Vector3(...node.pos), [node.pos]);
  return (
    <group>
      {/* Edge: core → service */}
      <Line
        points={[[0, 0, 0], node.pos]}
        color={node.color}
        lineWidth={0.8}
        transparent
        opacity={0.32}
      />

      {/* Traveling data packet */}
      <Packet to={target} color={node.color} speed={node.speed} offset={node.offset} />

      {/* The node itself + label, drifting gently */}
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh position={node.pos}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.5}
            flatShading
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        <Html
          position={node.pos}
          center
          distanceFactor={6}
          zIndexRange={[20, 0]}
          pointerEvents="none"
          style={{ transform: 'translate(0, 28px)' }}
        >
          <div className="select-none whitespace-nowrap text-center">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 border bg-black/70 backdrop-blur-sm"
              style={{ color: node.color, borderColor: `${node.color}55` }}
            >
              {node.label}
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[var(--fg-dim)]">
              {node.sub}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function MeshGroup() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.06;
    }
  });
  return (
    <group ref={group}>
      <CoreOrb />
      {NODES.map((n) => (
        <Satellite key={n.id} node={n} />
      ))}
    </group>
  );
}

const SceneCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.4], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 3, 3]} intensity={0.9} />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#6ea8ff" />
        <pointLight position={[3, -2, -2]} intensity={0.5} color="#00ff9c" />

        <Starfield />
        <MeshGroup />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Suspense>
    </Canvas>
  );
};

export default SceneCanvas;
