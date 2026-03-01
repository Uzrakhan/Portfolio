function Trophy({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
        <meshStandardMaterial color="#facc15" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cup */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default Trophy;
