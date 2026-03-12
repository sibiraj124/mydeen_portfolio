
"use client";

import React, { useEffect, useRef } from "react";

export default function IsomorphicBackground() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      if (!bgRef.current) return;

      bgRef.current.style.setProperty("--x", `${x * 100}%`);
      bgRef.current.style.setProperty("--y", `${y * 100}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
      style={{
        background: "#ff2929",
      }}
    >
      {/* moving gradient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(0,212,255,0.15), transparent 60%)",
        }}
      />

      {/* gradient blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[140px] rounded-full -top-[150px] -left-[100px] animate-pulse" />

      <div className="absolute w-[450px] h-[450px] bg-cyan-400/30 blur-[140px] rounded-full -bottom-[120px] -right-[100px] animate-pulse" />
  
    </div>
  );
}
