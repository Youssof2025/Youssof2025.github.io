import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Html } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import { RotateCcw } from "lucide-react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const CAMERA_POSITION: [number, number, number] = [0, 1.5, 4];
const CAMERA_FOV = 45;
// Share of the canvas the board may fill; the fit below is exact, so only a small margin
const FILL = 0.95;

// Binary-searches the scale at which the (centered) bounding box, spun through a full
// turn, just fits in FILL of the frame as seen from the default camera position.
function fitScale(size: THREE.Vector3, aspect: number) {
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, aspect);
  camera.position.set(...CAMERA_POSITION);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const corner = new THREE.Vector3();
  const spin = new THREE.Euler();
  const fits = (s: number) => {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
      spin.set(0, angle, 0);
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
        corner.set((sx * size.x * s) / 2, (sy * size.y * s) / 2, (sz * size.z * s) / 2)
          .applyEuler(spin)
          .project(camera);
        if (Math.abs(corner.x) > FILL || Math.abs(corner.y) > FILL) return false;
      }
    }
    return true;
  };

  let lo = 0;
  let hi = 10 / Math.max(size.x, size.y, size.z);
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (fits(mid)) lo = mid;
    else hi = mid;
  }
  return lo;
}

function PCB({ src, rotation = [0, 0, 0] }: { src: string; rotation?: [number, number, number] }) {
  const { scene } = useGLTF(src);
  const viewport = useThree((state) => state.viewport);

  // Model size in its own units (Altium exports in mm or m), after any rotation override
  const [rx, ry, rz] = rotation;
  const size = useMemo(() => {
    const raw = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3());
    const turned = raw.applyEuler(new THREE.Euler(rx, ry, rz));
    return new THREE.Vector3(Math.abs(turned.x), Math.abs(turned.y), Math.abs(turned.z));
  }, [scene, rx, ry, rz]);

  // Fill the canvas (re-runs on resize): find the largest scale where every corner of
  // the model's bounding box stays inside the frame at every angle of a full spin
  const aspect = viewport.aspect;
  const scale = useMemo(() => fitScale(size, aspect), [size, aspect]);

  // Fix materials + visibility (once per loaded scene)
  useEffect(() => {
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
  }, [scene]);

  return (
    <Center>
      <group scale={scale} rotation={rotation}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

interface PCBModelProps {
  src: string;         // .glb exported from Altium (STEP -> GLB), ideally meshopt-compressed
  className?: string;
  // glTF is Y-up and STEP -> GLB converters normally handle that; only set this if a board loads on its edge
  rotation?: [number, number, number];
  autoRotate?: boolean; // slow continuous spin; dragging still works
  // Mouse-wheel / pinch zoom toward the cursor. Off by default because the wheel would
  // otherwise get stuck zooming while someone is just trying to scroll past the model.
  zoom?: boolean;
}

// Skip the spin for visitors who've asked their OS for less motion
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PCBModel({ src, className, rotation, autoRotate = false, zoom = false }: PCBModelProps) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const [moved, setMoved] = useState(false);

  // Canvas forces inline width/height: 100%, so size it through a wrapper instead
  return (
    <div className={cn("relative w-full h-[400px]", className)}>
      <Canvas camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.6} />

        <Suspense
          fallback={
            <Html center className="text-sm text-muted-foreground whitespace-nowrap">
              Loading 3D model…
            </Html>
          }
        >
          <PCB src={src} rotation={rotation} />
        </Suspense>

        <OrbitControls
          ref={controls}
          target={[0, 0, 0]}     // the model is centered, so orbit around the origin
          enablePan={false}
          enableZoom={zoom}
          zoomToCursor           // zoom into whatever part is under the mouse
          zoomSpeed={1.5}
          minDistance={0.8}      // ~5x closer than the default view
          maxDistance={6}        // a little further out than the default view (~4.3)
          minPolarAngle={Math.PI / 4}   // keep the camera from swinging under the board
          maxPolarAngle={(3 * Math.PI) / 4}
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate && !prefersReducedMotion()}
          autoRotateSpeed={1.5}
          onStart={() => setMoved(true)}
        />
      </Canvas>

      {zoom && moved && (
        <button
          type="button"
          onClick={() => {
            controls.current?.reset();
            setMoved(false);
          }}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent"
        >
          <RotateCcw className="size-3.5" />
          Reset view
        </button>
      )}
    </div>
  );
}
