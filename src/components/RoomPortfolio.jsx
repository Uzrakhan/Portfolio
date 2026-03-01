import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Float, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import * as THREE from "three";
import gsap from 'gsap'
import ProjectsOverlay from "./ProjectsOverlay";
import BookShelf from "./BookShelf";
import DegreeModel from "./DegreeModel";
import EducationOverlay from "./EducationOverlay";
import ArcadeModel from "./ArcadeModel";
import ArcadeOverlay from "./ArcadeOverlay";
import ArchitectureOverlay from "./ArchitectureOverlay";
import SkillsOverlay from "./SkillsOverlay";
import BoardModel from "./BoardModel";
import ArchitectureWall from "./ArchitectureWall";
import Loader from "./Loader"

function Laptop({ onClick }) {
    const [hovered, setHovered] = useState(false);
    const [zoomed, setZoomed] = useState(false);


    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    return (
        <>
            <group 
                position={[0,7.4,0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={onClick}
                scale={hovered ? 1.05 : 1}
            >
                    {/* Base */}
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[4, 0.3, 2.5]} />
                        <meshStandardMaterial color="#e5e7eb" />
                    </mesh>

                    {/* Screen */}
                    <mesh
                        position={[0,1.2, -1.8]}
                        rotation={[-0.6, 0, 0]}
                        castShadow
                    >
                        <boxGeometry args={[4, 2.4, 0.2]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>

                    {/* Screen Display */}
                    <mesh
                        position={[0, 1.2, -1.2]}
                        rotation={[-0.6, 0, 0]}
                    >
                        <planeGeometry args={[3.6, 2]} />
                        <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={hovered ? 1.2 : 0.6}/>
                    </mesh>
            </group>

            {hovered && (
                <Html
                    position={[0, 4.2, 0]}
                    center
                    transform={false}
                >
                    <div className="
                        px-5 py-2.5
                        bg-black/85
                        text-green-400
                        text-base font-semibold
                        rounded-xl
                        shadow-2xl
                        backdrop-blur-md
                        animate-fadeIn
                        whitespace-nowrap
                    ">
                    Open Portfolio Terminal
                    </div>
                </Html>
            )}
        </>
    )
}





function RoomScene({ isStarted,onLaptopClick,onBookshelfClick ,resetCamera, setShowSkillsHover, onDegreeClick, onArcadeClick, onArchitectureClick,isAnyOverlayOpen, showArchitecture }) {
    const { scene, camera } = useThree();
    const initialPosition = { x: 0, y: 20, z: 40 };
    const arcadeRef = useRef();


    //atmosphere & bg
    useEffect(() => {
        scene.background = new THREE.Color("#0a192f"); // dark blue-gray
    }, [scene]);

    useEffect(() => {
        gsap.to(camera.position, {
            x: 0,
            y: 20,
            z: 40,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
            camera.lookAt(0, 8, -15);
            }
        });
    }, [resetCamera]);


    const handleLaptopClick = () => {
        gsap.to(camera.position, {
            x:0,
            y:6,
            z:12,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(0,5.2,-15)
            },
            onComplete: () => {
                onLaptopClick();
            }
        })
    }

    const handleBookShelfClick = () => {
        gsap.to(camera.position, {
            x: -8,
            y: 6,
            z: 12,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(-12,4,-15)
            },
            onComplete: () => {
                onBookshelfClick()
            }
        })
    }

    const handleDegreeClick = () => {
        gsap.to(camera.position, {
            x:0,
            y:6,
            z:12,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(0,5.2,-15)
            },
            onComplete: () => {
                onDegreeClick();
            }
        })
    }


    /*
    const handleArcadeClick = () => {
        gsap.to(camera.position, {
            x: 0,
            y: 1,
            z: 2,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(0,10,-25)
            },
        })
    }
    */

    const handleArcadeClick = () => {
        gsap.to(camera.position, {
            x: 0,
            y: 6,
            z: 15,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(0, 8, -25);
            },
            onComplete: () => {
                onArcadeClick();
            }
        });
    };


    const handleArchitectureClick = () => {
        gsap.to(camera.position, {
            x: 10,
            y: 7,
            z: -10,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(18, 9, -15);
            },
            onComplete: () => {
                onArchitectureClick()
            }
        });
    };


    return (
        <>
            {/* --- LIGHTING SETUP --- */}
            <ambientLight intensity={0.4} />

            {/* Main Interior Light - Brightens the room overall */}
            <pointLight position={[0, 15, -5]} intensity={2} color="#ffffff" castShadow />

            {/* --- NEON CEILING STRIPS --- */}
            <mesh position={[0, 19.9, -29.5]}>
                <boxGeometry args={[38, 0.3, 0.3]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={10} />
            </mesh>

            <mesh position={[0, 18.5, -29.5]}>
                <boxGeometry args={[30, 0.2, 0.2]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={10} />
            </mesh>

            <group position={[-50, 0, 0]}>
                {/* Dark Ground for Outside - Makes the room look like a floating container */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                    <planeGeometry args={[60, 40]} />
                    <meshStandardMaterial color="#020205" roughness={1} />
                </mesh>
            </group>

            {/* --- EXTERIOR: BILLBOARD SPOTLIGHT --- */}
            <spotLight 
                position={[-35, 25, 10]} 
                angle={0.5} 
                intensity={200} 
                penumbra={0.5}
                color="#00ffff"
                castShadow
            />

            {/**room structure */}
            <group>
                {/* Floor: Light and reflective */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
                    <planeGeometry args={[40, 40]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.8} />
                </mesh>

                {/* Brightened Walls */}
                <mesh position={[0, 10, -30]}>
                    <planeGeometry args={[40, 20]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.5} />
                </mesh>
                <mesh rotation={[0, Math.PI / 2, 0]} position={[-20, 10, -10]} raycast={() => null}>
                    <planeGeometry args={[40, 20]} />
                    <meshStandardMaterial color="#f1f5f9" />
                </mesh>
                {(!isAnyOverlayOpen || showArchitecture) && (
                    <ArchitectureWall onClick={handleArchitectureClick} />
                )}
                <mesh rotation={[0, -Math.PI / 2, 0]} position={[20, 10, -10]}>
                    <planeGeometry args={[40, 20]} />
                    <meshStandardMaterial color="#f1f5f9" />
                </mesh>
            </group>

            {/* Desk Group */}
            <group position={[-17, 3, 2]} rotation={[0,Math.PI / 2,0]}>

                {/* Desk Top */}
                <mesh position={[0, 7, 0]} castShadow receiveShadow>
                    <boxGeometry args={[14, 0.6, 6]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </mesh>

                {/* Under top highlight */}
                <mesh position={[0, 6.5, 0]}>
                    <boxGeometry args={[14, 0.1, 6]} />
                    <meshStandardMaterial color="#3a3a4a" />
                </mesh>


                {/* Left Leg */}
                <mesh position={[-6, 2, -2.5]} castShadow>
                    <boxGeometry args={[0.6, 10, 0.6]} />
                    <meshStandardMaterial color="#1f1f2a" />
                </mesh>

                {/* Right Leg */}
                <mesh position={[6, 2, -2.5]} castShadow>
                    <boxGeometry args={[0.6, 10, 0.6]} />
                    <meshStandardMaterial color="#1f1f2a" />
                </mesh>

                {/* Back Leg Left */}
                <mesh position={[-6, 2, 2.5]} castShadow>
                    <boxGeometry args={[0.6, 10, 0.6]} />
                    <meshStandardMaterial color="#1f1f2a" />
                </mesh>

                {/* Back Leg Right */}
                <mesh position={[6, 2, 2.5]} castShadow>
                    <boxGeometry args={[0.6, 10, 0.6]} />
                    <meshStandardMaterial color="#1f1f2a" />
                </mesh>

                <Laptop onClick={handleLaptopClick} />
                <pointLight position={[0, 1, 1]} intensity={0.5} color="#a855f7" distance={5} />
            </group>

            {/**neon arcade glow */}
            <group position={[12,0,-20]}>
                <ArcadeModel
                    position={[0,5,-3]}
                    rotation={[0, -Math.PI / 2,0]}
                    ref={arcadeRef}
                    scale={1}
                    onClick={handleArcadeClick}
                />
                {/* Neon Pink border for the Arcade */}
                <pointLight position={[0, 5, 2]} intensity={8} color="#ff00ff" distance={12} />
            </group>

            
            <group position={[-32, 9, 20]} rotation={[0, 0.6, 0]} scale={2.5}>
                {/* 1. The Model */}
                <BoardModel />

                {/* 2. GitHub Hitbox - Attached to the same group so it moves with the board */}
                <mesh 
                    position={[-0.5, 3.5, -12]} // These are LOCAL coordinates relative to the board
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://github.com/Uzrakhan", "_blank");
                    }}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "auto")}
                >
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshBasicMaterial transparent visible={false} />
                </mesh>

                {/* 3. LinkedIn Hitbox */}
                <mesh 
                    position={[1.9, 3.5, -12]} 
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://linkedin.com/in/uzra-khan-40b472272", "_blank");
                    }}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "auto")}
                >
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshBasicMaterial transparent visible={false} />
                </mesh>
            </group>


            {/* Other Models */}
            <DegreeModel position={[-10, 12, -29.8]} onClick={onDegreeClick}/>
            <BookShelf position={[18, 0, 5]} rotation={[0, -Math.PI / 2, 0]} onClick={onBookshelfClick} />
            <BookShelf onClick={handleBookShelfClick} setShowSkillsHover={setShowSkillsHover}/>
            
            {/* POST-PROCESSING (The Magic Glow) */}
            <ContactShadows 
                position={[0, 0, 0]} 
                scale={50} 
                blur={2.4} 
                far={20} 
                opacity={0.5} 
            />

            {/* 2. Optimized Post-Processing block */}
            {/* multisampling={8} prevents jagged edges on neon lines */}
            {isStarted && (
                <EffectComposer disableNormalPass multisampling={8}>
                    <Bloom 
                        mipmapBlur
                        luminanceThreshold={0.35} 
                        intensity={0.5} 
                        radius={0.55}
                    />
                </EffectComposer>
            )}
        </>
  );
}




export default function RoomPortfolio() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [resetCamera, setResetCamera] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [showArcade, setShowArcade] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showArchitecture, setShowArchitecture] = useState(false);
    const [isStarted, setIsStarted] = useState(false)
    const isAnyOverlayOpen =
        showArcade ||
        showSkills ||
        showEducation ||
        showOverlay ||
        showArchitecture;

    return (
        <>
            <Loader onStart={() => setIsStarted(true)}/>

            <div 
                style={{ 
                    width: "100vw", 
                    height: "100vh", 
                    overflow: "hidden", 
                    opacity: isStarted ? 1 : 0,
                    transition: "opacity 1.5s ease-in-out", 
                    backgroundColor: "#000", 
                    pointerEvents: isStarted ? "auto" : "none",
                }}
            >
                <Canvas shadows frameloop={isStarted ? "always" : "demand"} camera={{ position: [-15, 40, 45], fov: 65 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
                    <React.Suspense fallback={null}>
                                <RoomScene 
                                    isStarted={isStarted}
                                    isAnyOverlayOpen={isAnyOverlayOpen}
                                    showArchitecture={showArchitecture}
                                    onLaptopClick={() => setShowOverlay(true)} 
                                    resetCamera={resetCamera}
                                    onBookshelfClick={() => setShowSkills(true)}
                                    onDegreeClick={() => setShowEducation(true)}
                                    onArcadeClick={() => setShowArcade(true)}
                                    onArchitectureClick={() => setShowArchitecture(true)}
                                />
                                <OrbitControls enableZoom={false}/>
                    </React.Suspense>
                </Canvas>
            </div>
            {showOverlay && (
                  <><div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" /><ProjectsOverlay onClose={() => {
                    setShowOverlay(false);
                    setResetCamera(prev => !prev);
                } } /></>
            )}

            {showEducation && (
                <>
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
                    <EducationOverlay onClose={() => {
                    setShowEducation(false);
                    setResetCamera(prev => !prev);
                } } />
                </>
            )} 


            {showArcade && (
                <ArcadeOverlay 
                    onClose={() => {
                        setShowArcade(false);
                        setResetCamera(prev => !prev)
                    }}
                />
            )}

            {showSkills && (
                <SkillsOverlay
                    onClose={() => {
                    setShowSkills(false);
                    setResetCamera(prev => !prev);
                    }}
                />
            )}

            {showArchitecture && (
                <ArchitectureOverlay
                    onClose={() => {
                    setShowArchitecture(false);
                    setResetCamera(prev => !prev);
                    }}
                />
            )}

        </>
    )
}


const skillsPanelStyle = {
  position: "absolute",
  left: "10%",
  top: "30%",
  background: "rgba(15, 12, 41, 0.9)",
  padding: "1.5rem",
  borderRadius: "16px",
  color: "white",
  backdropFilter: "blur(15px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
}
