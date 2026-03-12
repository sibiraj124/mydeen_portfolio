"use client";

import React, { useEffect } from "react";

export default function BackgroundSpotlight() {
  // use a ref-updated background so we don't rely on global CSS variables
  const layerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const layer = layerRef.current;
      if (!layer) return;
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;

      layer.style.background = `radial-gradient(800px circle at ${x} ${y}, rgba(59,130,246,0.20), transparent 18%), radial-gradient(420px circle at 10% 10%, rgba(59,130,246,0.06), transparent 10%), radial-gradient(420px circle at 90% 90%, rgba(59,130,246,0.04), transparent 10%)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}>
      <div
        ref={layerRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(1200px circle at 50% 50%, rgb(59,130,246), transparent 18%)",
          transition: "background 100ms linear",
        }}
      />
    </div>
  );
}
