import { useGLTF, Html, Float } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function DegreeModel({ onClick, ...props }) {
    const { scene } = useGLTF("/models/degree.glb");
    const [hovered, setHovered] = useState(false);
    const lightRef = useRef();

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    return (
        <group 
            {...props} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
        >
            {/* Float makes the degree bob up and down slightly */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <primitive 
                    object={scene} 
                    scale={hovered ? 1.9 : 1}
                    transition="all 0.3s"
                />
            </Float>

            {/* 1. THE MAIN LIGHT: A blue/white spotlight hitting the degree */}
            <spotLight
                position={[0, 5, 5]} // Positioned above and slightly in front
                angle={0.3}
                penumbra={1}
                intensity={hovered ? 15 : 2} // Brightens significantly on hover
                color="#60a5fa"
                castShadow
            />

            {/* 2. THE GLOW: A point light behind/inside to create a neon aura */}
            <pointLight 
                position={[0, 0, -0.5]} 
                intensity={hovered ? 10 : 0} 
                color="#ffffff" 
                distance={3}
            />

            {/* 3. Helper Label for Readability */}
            {hovered && (
                <Html distanceFactor={10} position={[0, -2, 0]} center>
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                        BACHELOR'S DEGREE
                    </div>
                </Html>
            )}
        </group>
    );
}