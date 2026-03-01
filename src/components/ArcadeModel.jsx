import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { forwardRef } from "react";
import { Html } from "@react-three/drei";

const ArcadeModel = forwardRef(({ onClick, ...props }, ref) => {
  const { scene } = useGLTF("/models/Arcade_Final.glb");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const screenRef = useRef();

  useEffect(() => {
    const screen = scene.getObjectByName("Cube001_5"); // 🔥 THIS IS SCREEN

    if (!screen) {
      console.log("Screen not found");
      return;
    }

    screenRef.current = screen;

    // Default glow
    screen.material.emissive = new THREE.Color("#F4599D");
    screen.material.emissiveIntensity = 0.6;
    screen.material.needsUpdate = true;

  }, [scene]);

  const handleArcadeClick = () => {
  if (onClick) onClick();   // move camera first

  const screen = screenRef.current;
  if (!screen) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);

  screen.material = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: "#00ff88",
    emissiveIntensity: 1.5,
  });

  const lines = [
    "> Running Test Cases...",
    "✔ Test 1 Passed",
    "✔ Test 2 Passed",
    "✔ Test 3 Passed",
    "",
    "Performance Score: 99",
    "Latency: 14ms",
    "Rank: Top 10%"
  ];

  let index = 0;

  function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "40px monospace";
    ctx.fillStyle = "#00ff88";

    for (let i = 0; i < index; i++) {
      ctx.fillText(lines[i], 40, 80 + i * 60);
    }

    texture.needsUpdate = true;
  }

  function typeEffect() {
    if (index <= lines.length) {
      draw();
      index++;
      setTimeout(typeEffect, 500);
    }
  }

  // Delay typing slightly so camera starts moving first
  setTimeout(typeEffect, 600);
  };


  return (
    <primitive
      ref={ref}
      object={scene}
      {...props}
      onPointerOver={() => {
        setHovered(true);
        if (screenRef.current) {
          screenRef.current.material.emissiveIntensity = 1.2;
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        if (screenRef.current) {
          screenRef.current.material.emissiveIntensity = 0.6;
        }
      }}
      onClick={handleArcadeClick}
    />
  );

});

export default ArcadeModel;


/*
export default function ArcadeModel({ onClick, ...props }) {
  const { scene } = useGLTF("/models/Arcade_Final.glb");
  const screenRef = useRef();

  useEffect(() => {
    const screen = scene.getObjectByName("Cube001_5"); // 🔥 THIS IS SCREEN

    if (!screen) {
      console.log("Screen not found");
      return;
    }

    screenRef.current = screen;

    // Default glow
    screen.material.emissive = new THREE.Color("#00ff88");
    screen.material.emissiveIntensity = 0.6;
    screen.material.needsUpdate = true;

  }, [scene]);

  const handleArcadeClick = () => {
  if (onClick) onClick();   // move camera first

  const screen = screenRef.current;
  if (!screen) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);

  screen.material = new THREE.MeshStandardMaterial({
    map: texture,
    emissive: "#00ff88",
    emissiveIntensity: 1.5,
  });

  const lines = [
    "> Running Test Cases...",
    "✔ Test 1 Passed",
    "✔ Test 2 Passed",
    "✔ Test 3 Passed",
    "",
    "Performance Score: 99",
    "Latency: 14ms",
    "Rank: Top 10%"
  ];

  let index = 0;

  function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "40px monospace";
    ctx.fillStyle = "#00ff88";

    for (let i = 0; i < index; i++) {
      ctx.fillText(lines[i], 40, 80 + i * 60);
    }

    texture.needsUpdate = true;
  }

  function typeEffect() {
    if (index <= lines.length) {
      draw();
      index++;
      setTimeout(typeEffect, 500);
    }
  }

  // Delay typing slightly so camera starts moving first
  setTimeout(typeEffect, 600);
};


  return (
    <primitive
      object={scene}
      {...props}
      onClick={handleArcadeClick}
    />
  );
}
*/
