import { lazy, Suspense, useState } from "react";
import { Box } from "lucide-react";

// three.js only downloads once someone asks for the model
const PCBModel = lazy(() => import("./PCBModel"));

interface ModelViewerProps {
  src: string;
  poster?: string;     // still image shown before the model loads
  alt?: string;
}

// Click-to-load 3D board: keeps project pages light and stops the canvas
// from capturing touch-scrolling on phones until the viewer opts in.
export const ModelViewer = ({ src, poster, alt = "3D model" }: ModelViewerProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden border bg-muted shadow-lg">
      {active ? (
        <Suspense fallback={null}>
          <PCBModel src={src} zoom className="h-full cursor-grab active:cursor-grabbing" />
        </Suspense>
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View ${alt} in 3D`}
        >
          {poster && (
            <img
              src={poster}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-40"
            />
          )}
          <span className="relative flex items-center gap-2 rounded-full border bg-background/90 px-5 py-2.5 font-medium shadow-md transition-transform group-hover:scale-105">
            <Box className="size-5" />
            View in 3D
          </span>
        </button>
      )}
    </div>
  );
};
