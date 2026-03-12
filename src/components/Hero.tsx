"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaDownload } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const roles = [
  "Full Stack Developer",
  "React.js Specialist",
  "Node.js Engineer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === role.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(role.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setCurrentRole((r) => (r + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        ".hero-badge",
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
      )
        .fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-visual",
          { scale: 0.8, opacity: 0, rotation: -5 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.2)" },
          "-=1.0"
        );

      // Floating orbs
      gsap.to(".orb-1", { y: -30, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".orb-2", { y: 20, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      gsap.to(".orb-3", { y: -15, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient orbs */}
      <div className="orb-1 absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)", filter: "blur(40px)" }} />
      <div className="orb-2 absolute bottom-32 right-10 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)", filter: "blur(60px)" }} />
      <div className="orb-3 absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text content */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 w-fit">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
              style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", color: "#0ea5e9" }}>
              <HiSparkles className="text-[#06b6d4]" />
              Available for hire
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="section-heading" style={{ lineHeight: 1.1 }}>
            <span style={{ color: "#94a3b8", fontSize: "0.5em", fontFamily: "'Fira Code', monospace", display: "block", marginBottom: "0.5rem" }}>
              Hi there, I&apos;m 👋
            </span>
            <span style={{ color: "#e2e8f0" }}>{personalInfo.name}</span>
            <br />
            <span className="gradient-text">{personalInfo.fullName.split(" ")[1]}</span>
          </h1>

          {/* Typewriter */}
          <div className="flex items-center gap-3 font-heading text-xl sm:text-2xl font-semibold" style={{ color: "#94a3b8" }}>
            <span style={{ color: "#0ea5e9" }}>&lt;</span>
            <span style={{ color: "#e2e8f0", minWidth: "280px" }}>
              {displayText}
              <span className="cursor-blink" style={{ color: "#0ea5e9" }}>|</span>
            </span>
            <span style={{ color: "#0ea5e9" }}>/&gt;</span>
          </div>

          {/* Sub text */}
          <p ref={subRef} className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "#94a3b8" }}>
            {personalInfo.tagline}. I build{" "}
            <span className="gradient-text font-semibold">scalable web applications</span>{" "}
            and craft{" "}
            <span style={{ color: "#8b5cf6" }} className="font-semibold">exceptional user experiences</span>.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary">
              <span>View My Work</span>
              <span>→</span>
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline">
              Let&apos;s Talk
            </button>
          </div>

          {/* Socials */}
          <div ref={socialRef} className="flex items-center gap-5 pt-2">
            <span className="text-xs font-mono" style={{ color: "#64748b" }}>Find me on:</span>
            {[
              { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
              { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn", color: "#0ea5e9" },
              { icon: FaTwitter, href: personalInfo.twitter, label: "Twitter", color: "#06b6d4" },
            ].map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                style={{ border: "1px solid rgba(14,165,233,0.2)", color: color || "#94a3b8" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(14,165,233,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(14,165,233,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(14,165,233,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="hero-visual hidden lg:flex items-center justify-center relative">
          {/* Main circle */}
          <div className="relative w-[420px] h-[420px]">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full animate-spin-slow"
              style={{ border: "1px dashed rgba(14,165,233,0.3)" }} />
            <div className="absolute inset-4 rounded-full animate-spin-slow"
              style={{ border: "1px dashed rgba(6,182,212,0.2)", animationDirection: "reverse", animationDuration: "15s" }} />

            {/* Center avatar placeholder */}
            <div className="absolute inset-8 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0a1f3c, #071428)",
                border: "2px solid rgba(14,165,233,0.3)",
                boxShadow: "0 0 60px rgba(14,165,233,0.2), inset 0 0 60px rgba(14,165,233,0.05)",
              }}>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-6xl mb-4"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", boxShadow: "0 0 40px rgba(14,165,233,0.4)" }}>
                  👨‍💻
                </div>
                <p className="font-heading font-bold text-lg gradient-text">{personalInfo.name}</p>
                <p className="text-xs font-mono mt-1" style={{ color: "#64748b" }}>Full Stack Dev</p>
              </div>
            </div>

            {/* Orbiting tech badges */}
            {[
              { label: "React", angle: 0, color: "#61dafb" },
              { label: "Node.js", angle: 60, color: "#68a063" },
              { label: "TypeScript", angle: 120, color: "#3178c6" },
              { label: "Next.js", angle: 180, color: "#e2e8f0" },
              { label: "MongoDB", angle: 240, color: "#4db33d" },
              { label: "Docker", angle: 300, color: "#2496ed" },
            ].map(({ label, angle, color }) => {
              const rad = (angle * Math.PI) / 180;
              const r = 185;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <div
                  key={label}
                  className="absolute flex items-center justify-center px-2 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                    background: "rgba(2,11,24,0.9)",
                    border: `1px solid ${color}50`,
                    color: color,
                    boxShadow: `0 0 12px ${color}30`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-xs font-mono" style={{ color: "#64748b" }}>scroll down</span>
        <div className="w-6 h-10 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(14,165,233,0.3)" }}>
          <div className="w-1 h-2 rounded-full bg-[#0ea5e9] animate-bounce" />
        </div>
      </button>
    </section>
  );
}
