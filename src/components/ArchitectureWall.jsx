import { Html } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function ArchitectureWall({ onClick,onFocus }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);


  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <group
      position={[19.8, 10, -5]}   // flush with right wall
      rotation={[0, -Math.PI / 2, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        onClick();
        setFocused(true);
      }}
      scale={2}
    >
      {/* panel base */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => console.log("ARCH WALL CLICKED")}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          color="#0a0f1f"
          emissive="#00ffff"
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* html dashboard */}
      <Html
        position={[0, 0, 0.05]}
        center
        transform
        distanceFactor={22}
        pointerEvents="none"
        >
            <div className={`
                w-[240px]
                bg-black/95
                border border-cyan-400
                rounded-xl
                p-5
                text-cyan-200
                font-mono
                shadow-[0_0_30px_#00ffff]
                transition-all duration-500
                ${focused ? "h-[360px]" : "h-[180px]"}
                `}
            >
          <p className="text-cyan-400 mb-2 text-sm tracking-widest">
            SYSTEM_ARCHITECTURE
          </p>

          <div className="text-xs space-y-1 opacity-90">
            <p>● WebSocket Layer — Active</p>
            <p>● API Latency — 14ms</p>
            <p>● Lighthouse — 99</p>
            <p>● Realtime Sync — Stable</p>
          </div>

          {focused && (
            <div className="mt-4 text-xs text-cyan-300/80">
              <p>Realtime collaboration architecture</p>
              <p>Scalable event-driven backend</p>
              <p>Performance-first rendering mindset</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}