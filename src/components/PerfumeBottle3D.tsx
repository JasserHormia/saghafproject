"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as THREE from "three";

/** Normalized pointer, each axis in roughly [-1, 1]. */
export type PointerRef = RefObject<{ x: number; y: number }>;

const GOLD = "#C9A84C";
const WARM_WHITE = "#FFF5E0";

/* ------------------------------------------------------------------ */
/*  Lathe profiles                                                     */
/* ------------------------------------------------------------------ */
const BOTTLE_PROFILE: [number, number][] = [
  [0, -1.8], // bottom center
  [0.7, -1.8], // bottom edge
  [0.75, -1.6], // base curve out
  [0.78, -1.0], // widest body
  [0.78, 0.2], // straight body sides
  [0.75, 0.6], // shoulder start
  [0.55, 1.0], // shoulder taper
  [0.28, 1.3], // neck
  [0.26, 1.6], // neck top
];

// Liquid: bottle shape scaled to 0.88, filled to ~75% height (top ~0.75).
const LIQUID_PROFILE: [number, number][] = [
  [0, -1.8],
  [0.616, -1.8],
  [0.66, -1.6],
  [0.686, -1.0],
  [0.686, 0.2],
  [0.66, 0.6],
  [0.594, 0.75], // liquid surface
  [0, 0.75],
];

const toVec2 = (pts: [number, number][]) =>
  pts.map(([x, y]) => new THREE.Vector2(x, y));

// Ribbing profile: bottle outer scaled in slightly.
const RIB_PROFILE: [number, number][] = BOTTLE_PROFILE.map(([x, y]) => [
  x * 0.985,
  y,
]);

/* ------------------------------------------------------------------ */
/*  Orbiting particles                                                 */
/* ------------------------------------------------------------------ */
function OrbitingParticles({ count = 10 }: { count?: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 1.5 + (i % 5) * 0.1, // 1.5 -> 1.9
        baseAngle: (i / count) * Math.PI * 2,
        speed: 0.15 + (i % 4) * 0.06,
        height: Math.sin((i / count) * Math.PI * 2) * 1.1,
        bob: 0.15 + (i % 3) * 0.05,
        gold: i % 2 === 0,
      })),
    [count],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const a = p.baseAngle + t * p.speed;
      mesh.position.set(
        Math.cos(a) * p.radius,
        p.height + Math.sin(t * p.speed * 2 + p.baseAngle) * p.bob,
        Math.sin(a) * p.radius,
      );
    });
  });

  return (
    <group>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 20, 20]} />
          <meshStandardMaterial
            color={p.gold ? GOLD : WARM_WHITE}
            emissive={p.gold ? GOLD : WARM_WHITE}
            emissiveIntensity={2.2}
            roughness={0.3}
            metalness={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Bottle                                                             */
/* ------------------------------------------------------------------ */
function Bottle({ pointer, mobile = false }: { pointer?: PointerRef; mobile?: boolean }) {
  const root = useRef<THREE.Group>(null);

  const bottlePoints = useMemo(() => toVec2(BOTTLE_PROFILE), []);
  const ribPoints = useMemo(() => toVec2(RIB_PROFILE), []);
  const liquidPoints = useMemo(() => toVec2(LIQUID_PROFILE), []);

  // Mouse parallax — lerp toward pointer, clamped to 0.5 rad.
  useFrame(() => {
    if (!root.current) return;
    const p = pointer?.current;
    const targetY = THREE.MathUtils.clamp(p ? p.x * 0.5 : 0, -0.5, 0.5);
    const targetX = THREE.MathUtils.clamp(p ? -p.y * 0.3 : 0, -0.5, 0.5);
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      targetY,
      0.04,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      targetX,
      0.04,
    );
  });

  const goldMaterial = (
    <meshStandardMaterial
      color={GOLD}
      metalness={0.98}
      roughness={0.02}
      envMapIntensity={1.2}
    />
  );

  return (
    <group ref={root}>
      {/* Glass body */}
      <mesh castShadow={!mobile}>
        <latheGeometry args={[bottlePoints, mobile ? 96 : 128]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          thickness={0.6}
          roughness={0.0}
          color="#F5C89A"
          chromaticAberration={0.06}
          iridescence={0.4}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          samples={mobile ? 4 : 8}
          ior={1.45}
        />
      </mesh>

      {/* Vertical ribbing — inner shell, subtle */}
      <mesh>
        <latheGeometry args={[ribPoints, 96]} />
        <meshStandardMaterial
          color="#F5C89A"
          transparent
          opacity={0.12}
          roughness={0.35}
          metalness={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Liquid */}
      <mesh>
        <latheGeometry args={[liquidPoints, 96]} />
        <meshStandardMaterial
          color="#D4956A"
          transparent
          opacity={0.85}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Frosted label */}
      <mesh position={[0, -0.3, 0.79]}>
        <planeGeometry args={[1.1, 0.9]} />
        <meshStandardMaterial
          color="#F5EDE0"
          transparent
          opacity={0.12}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -1.84, 0]} receiveShadow={!mobile}>
        <cylinderGeometry args={[0.74, 0.7, 0.08, 64]} />
        {goldMaterial}
      </mesh>

      {/* Gold collar */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.3, 0.32, 0.18, 64]} />
        {goldMaterial}
      </mesh>
      {/* Decorative gold band */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.04, 64]} />
        {goldMaterial}
      </mesh>

      {/* Sphere cap (glossy black) */}
      <mesh position={[0, 2.1, 0]} castShadow={!mobile}>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshStandardMaterial
          color="#0A0608"
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Specular highlight on the cap */}
      <mesh position={[0.12, 2.32, 0.32]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */
function Scene({
  pointer,
  mobile,
  onReady,
}: {
  pointer?: PointerRef;
  mobile: boolean;
  onReady: () => void;
}) {
  const rectRef = useRef<THREE.RectAreaLight>(null);

  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, []);
  useEffect(() => {
    rectRef.current?.lookAt(0, 0, 0);
  }, []);
  // Fires once the Suspense boundary (incl. Environment HDR) has resolved.
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      <ambientLight intensity={0.5} color={WARM_WHITE} />
      <pointLight position={[4, 6, 4]} intensity={5} color="#FFE8A0" />
      <pointLight position={[-4, 2, 3]} intensity={2} color="#E0D0FF" />
      <pointLight position={[0, -3, 4]} intensity={1.5} color={GOLD} />
      <spotLight
        position={[2, 8, 5]}
        intensity={4}
        angle={0.3}
        penumbra={0.8}
        color="#FFFFFF"
        castShadow={!mobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <rectAreaLight
        ref={rectRef}
        position={[0, 4, -3]}
        width={4}
        height={4}
        intensity={3}
        color="#FFD580"
      />

      <Float speed={1.0} rotationIntensity={0.04} floatIntensity={0.15}>
        <group scale={mobile ? 0.85 : 1.1} position={[0, -0.3, 0]}>
          <Bottle pointer={pointer} mobile={mobile} />
        </group>
      </Float>

      <OrbitingParticles count={mobile ? 5 : 10} />

      {/* Shadow-catcher plane (desktop only) */}
      {!mobile && (
        <mesh
          position={[0, -1.92, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[12, 12]} />
          <shadowMaterial transparent opacity={0.18} />
        </mesh>
      )}

      <Environment preset="studio" environmentIntensity={0.8} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */
export default function PerfumeBottle3D({
  pointer,
  className,
}: {
  pointer?: PointerRef;
  className?: string;
}) {
  // Dynamic import is ssr:false, so window is available at first render.
  const [isMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [ready, setReady] = useState(false);

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Loading skeleton — gold shimmer + spinning ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 45%, rgba(184,147,42,0.14), #F5EDE0 70%)",
          opacity: ready ? 0 : 1,
          pointerEvents: "none",
          transition: "opacity 0.6s ease",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 50 50"
          style={{ animation: "spin360 1s linear infinite" }}
        >
          <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(184,147,42,0.2)" strokeWidth="3" />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#B8932A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="80 170"
          />
        </svg>
      </div>

      <Canvas
        shadows={!isMobile}
        dpr={[1, 1.5]}
        frameloop={isMobile ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: isMobile ? [0, 0.3, 6.5] : [0, 0.3, 4.8], fov: 42 }}
        style={{
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <Suspense fallback={null}>
          <Scene
            pointer={pointer}
            mobile={isMobile}
            onReady={() => setReady(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
