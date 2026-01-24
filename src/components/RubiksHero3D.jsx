import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import React from 'react'

// Move outside to prevent recreation
const boxGeo = new THREE.BoxGeometry(0.92, 0.92, 0.92);

function Cubie({ position, shade }) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      geometry={boxGeo} // Use variable directly
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial 
        color={hovered ? "#FFB300" : shade} 
        roughness={0.4}
        metalness={0.1}
        emissive={hovered ? "#FFB300" : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </mesh>
  );
}

function RubiksCube() {
  const cubes = useMemo(() => {
    const temp = [];
    const shades = ['#0a0a0a', '#141414', '#1e1e1e', '#282828', '#323232', '#3c3c3c', '#464646', '#505050', '#5a5a5a'];
    let i = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          temp.push(<Cubie key={`${x}${y}${z}`} position={[x, y, z]} shade={shades[i % shades.length]} />);
          i++;
        }
      }
    }
    return temp;
  }, []);
  return <group>{cubes}</group>;
}

export default function RubiksHero3D() {
  return (
    <Canvas
      camera={{ position: [3.5, 3.5, 3.5], fov: 45 }}
      frameloop='demand'
      shadows={false}
      style={{ touchAction: 'none' }}
      // LOWERS POWER USAGE:
      dpr={[1, 1.5]} // Don't render at 3x resolution on high-end phones
      gl={{ 
        antialias: false, 
        powerPreference: "high-performance",
        alpha: true 
      }}
    >
      <ambientLight intensity={0.12} />
      <directionalLight position={[6, 6, 6]} intensity={1.1} />
      
      <RubiksGroup>
        <RubiksCube />
      </RubiksGroup>

      <SceneControls />
    </Canvas>
  );
}

// Separate component to handle OrbitControls without "querySelector"
function SceneControls() {
  const { gl } = useThree();
  
  return (
    <OrbitControls 
      makeDefault
      enableZoom={false} 
      enablePan={false} 
      enableDamping={false} // Turning off damping saves CPU math
      touches={{
        ONE: THREE.TOUCH.ROTATE
      }}      
    />
  );
}

function RubiksGroup({ children }) {
  const groupRef = useRef();
  useFrame((state) => {
    // Only animate if the tab is visible to save CPU
    groupRef.current.position.y = 0.15 + Math.sin(state.clock.elapsedTime) * 0.05;
  });
  return <group ref={groupRef} scale={0.7} position={[0.8, 0.15, 0]}>{children}</group>;
}