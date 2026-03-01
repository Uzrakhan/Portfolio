import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import Trophy from "./Trophy";

function BookShelf({ onClick }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const bookColors = [
    "#9333ea",
    "#6366f1",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
  ];

  const shelvesY = [3, 0, -3];

  return (
    <>
      <group
        position={[-19, 5, -25]}
        rotation={[0, Math.PI / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Trophies */}
        <Trophy position={[-1.5, 6, 0.8]} />
        <Trophy position={[1.5, 6, 0.8]} />

        {/* Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 10, 2]} />
          <meshStandardMaterial
            color="#d4b483"
            emissive={hovered ? "#38bdf8" : "#000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>

        {/* Inner Depth */}
        <mesh position={[0, 0, 0.6]}>
          <boxGeometry args={[5.4, 9.4, 0.8]} />
          <meshStandardMaterial color="#f5e1c8" />
        </mesh>

        {/* Shelves */}
        {shelvesY.map((y, i) => (
          <mesh key={i} position={[0, y, 0.7]}>
            <boxGeometry args={[5.5, 0.3, 1]} />
            <meshStandardMaterial color="#c69c6d" />
          </mesh>
        ))}

        {/* Books */}
        {shelvesY.map((y, shelfIndex) =>
          Array.from({ length: 7 }).map((_, i) => (
            <mesh
              key={`book-${shelfIndex}-${i}`}
              position={[-2.3 + i * 0.75, y + 1.2, 0.9]}
            >
              <boxGeometry args={[0.6, 2.5, 0.4]} />
              <meshStandardMaterial
                color={bookColors[i % bookColors.length]}
                roughness={0.5}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Hover Tooltip */}
      {hovered && (
        <Html position={[-19, 12, -25]} center>
          <div className="
            px-5 py-2.5
            bg-black/85
            text-cyan-400
            text-base font-semibold
            rounded-xl
            shadow-2xl
            backdrop-blur-md
            whitespace-nowrap
          ">
            View Skills & Certifications
          </div>
        </Html>
      )}
    </>
  );
}

export default BookShelf;
