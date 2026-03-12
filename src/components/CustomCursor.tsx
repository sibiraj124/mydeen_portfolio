"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05, ease: "none" });
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.35, ease: "power2.out" });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const hoverElements = document.querySelectorAll("a, button, [data-cursor='pointer']");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          transform: "translate(-50%, -50%)",
          width: isClicking ? "6px" : "10px",
          height: isClicking ? "6px" : "10px",
          borderRadius: "50%",
          background: isHovering
            ? "linear-gradient(135deg, #06b6d4, #8b5cf6)"
            : "linear-gradient(135deg, #0ea5e9, #06b6d4)",
          boxShadow: isHovering
            ? "0 0 15px rgba(6,182,212,0.9), 0 0 30px rgba(139,92,246,0.5)"
            : "0 0 10px rgba(14,165,233,0.8)",
          transition: "width 0.2s, height 0.2s, background 0.3s, box-shadow 0.3s",
        }}
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="cursor-follower fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          transform: "translate(-50%, -50%)",
          width: isHovering ? "50px" : isClicking ? "30px" : "38px",
          height: isHovering ? "50px" : isClicking ? "30px" : "38px",
          borderRadius: "50%",
          border: isHovering
            ? "2px solid rgba(6,182,212,0.8)"
            : "1.5px solid rgba(14,165,233,0.5)",
          background: isHovering ? "rgba(14,165,233,0.05)" : "transparent",
          boxShadow: isHovering
            ? "0 0 20px rgba(14,165,233,0.2), inset 0 0 20px rgba(14,165,233,0.05)"
            : "none",
          transition: "width 0.3s ease, height 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </>
  );
}
