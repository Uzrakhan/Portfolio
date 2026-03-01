import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Suspense } from 'react'
import React from 'react'

// Move outside to prevent recreation
const boxGeo = new THREE.BoxGeometry(0.92, 0.92, 0.92);

function Cubie({ position, textures }) {
  const [hovered, setHovered] = useState(false);



  const faceMaterials = useMemo(() => {
    const darkBase = { color: "#1a1a1a", roughness: 0.2, metalness: 0.8, transparent: true };
    return [
      { ...darkBase, map: position[0] === 1 ? textures.react : null },    // Right
      { ...darkBase, map: position[0] === -1 ? textures.node : null },   // Left
      { ...darkBase, map: position[1] === 1 ? textures.socketio : null },     // Top
      { ...darkBase, map: position[1] === -1 ? textures.three : null },  // Bottom
      { ...darkBase, map: position[2] === 1 ? textures.tailwind : null },// Front
      { ...darkBase, map: position[2] === -1 ? textures.express : null },    // Back
    ];
  }, [position, textures]);

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
      {faceMaterials.map((props, i) => (
        <meshStandardMaterial 
          key={i}
          attach={`material-${i}`}
          {...props}
          transparent={false}
          color={props.map ? "#ffffff" : props.color}
          alphaTest={0.5}
          emissive={props.map ? "#ffffff" : "#000000"}
          emissiveIntensity={hovered ? 0.8 : 0.2}
          //map={position[2] === 1 ?  : null}
          />
      ))}
      
    </mesh>
  );
}

function RubiksCube() {
    const textures = useTexture({
    react: '/icons/react.svg',
    node: '/icons/nodedotjs.svg',
    socketio: '/icons/socketdotio.svg',
    three: '/icons/threedotjs.svg',
    tailwind: '/icons/tailwindcss.svg',
    express: '/icons/express.svg',
  });

  const cubes = useMemo(() => {
    const temp = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          temp.push(<Cubie key={`${x}${y}${z}`} position={[x, y, z]} textures={textures} />);
        }
      }
    }
    return temp;
  }, [textures]);
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
      dpr={[1, 2]} // Don't render at 3x resolution on high-end phones
      gl={{ 
        antialias: true, 
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        alpha: true 
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -2, -5]} intensity={0.5} color="#ffffff" />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <RubiksGroup>
          <RubiksCube />
        </RubiksGroup>
      </Suspense>
      

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
  const isMobile = window.innerWidth < 768;
  return (
    <group ref={groupRef} 
      scale={isMobile ? 0.6 : 0.65} position={isMobile ? [0, 0, 0] : [0.7, 0, 0]}>
      {children}
    </group>
  )
}