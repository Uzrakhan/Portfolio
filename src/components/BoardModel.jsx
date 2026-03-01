import { useGLTF } from "@react-three/drei";
import * as THREE from "three";


export default function BoardModel(props) {
  const { scene } = useGLTF("/models/Board.glb");

  scene.traverse((child) => {
    if (child.material?.emissive) {
      child.material.toneMapped = false
    }
  })

  scene.background = new THREE.Color("#071423")



  return (
    <primitive
      object={scene}
      scale={1.2}
      position={[0, 5, -15]}
      {...props}
    />
  );
}
