import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function PCB() {
  const { scene } = useGLTF("/TRD3.glb");

  // Fix materials + visibility (once)
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => (m.side = THREE.DoubleSide));
      } else {
        mesh.material.side = THREE.DoubleSide;
      }
    }
  });

  return (
    <Center>
      <group
        scale={0.6}
        rotation={[-Math.PI / 2, 0, 0]} // 🔑 fix CAD up-axis
      >
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function PCBModel() {
  const controlsRef = useRef<any>(null);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 4], fov: 45 }}
      className="w-full h-[400px]"
    >
      {/* Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.6} />

      <Suspense fallback={null}>
        <PCB />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}     // 🔑 correct pivot
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}   // 🔒 prevent bottom flip
        maxPolarAngle={(3 * Math.PI) / 4}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

useGLTF.preload("/TRD3.glb");
