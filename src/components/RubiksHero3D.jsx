import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

function Cubie({ position, shade }) {
  const [hovered, setHovered] = useState(false)

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: shade,
      roughness: 0.35,
      metalness: 0.12,
      emissive: hovered ? '#888888' : '#000000',
      emissiveIntensity: hovered ? 0.35 : 0,
    })
  }, [shade, hovered])

  return (
    <mesh
      position={position}
      material={material}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
    </mesh>
  )
}

function RubiksCube() {
  const cubes = []
  const shades = [
    '#0a0a0a',
    '#141414',
    '#1e1e1e',
    '#282828',
    '#323232',
    '#3c3c3c',
    '#464646',
    '#505050',
    '#5a5a5a',
  ]

  let i = 0

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push(
          <Cubie
            key={`${x}${y}${z}`}
            position={[x, y, z]}
            shade={shades[i % shades.length]}
          />
        )
        i++
      }
    }
  }

  return <group>{cubes}</group>
}

function RubiksGroup({ children }) {
  return (
    <group scale={0.7} position={[0.8, 0.15, 0]}>
      {children}
    </group>
  )
}


function GlowShell() {
  return (
    <mesh scale={1.02}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.04}
        roughness={1}
      />
    </mesh>
  )
}



export default function RubiksHero3D() {
  return (
    <Canvas
      camera={{ position: [3.5, 3.5, 3.5], fov: 45 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.12} />
      <directionalLight position={[6, 6, 6]} intensity={1.1} />
      <directionalLight position={[-6, -6, -6]} intensity={0.6} />
      <directionalLight
        position={[-6, 2, -6]}
        intensity={0.9}
        color="#9ca3af"
      />

        <spotLight
          position={[4, 6, 4]}
          angle={0.3}
          penumbra={0.9}
          intensity={3.5}
          color="#ffffff"
          castShadow
        />

      <RubiksGroup>
        <GlowShell />
        <RubiksCube />
      </RubiksGroup>

      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableDamping
        dampingFactor={0.12}
        autoRotate            // ✅ AUTO ROTATION
        autoRotateSpeed={0.6} // ✅ SLOW & SMOOTH
        rotateSpeed={0.8}
      />
    </Canvas>
  )
}
