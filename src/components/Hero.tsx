"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";

const roles = [
  "Software Developer",
  "Full Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 30 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === role.length) {
          setTimeout(() => setIsDeleting(true), 2000);
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

  // GSAP animations - elements flying in from all directions
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });

      // Title flying in from left
      tl.fromTo(
        ".hero-greeting",
        { x: -300, opacity: 0, rotation: -15 },
        { x: 0, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );

      // Name flying in from right with scale
      tl.fromTo(
        ".hero-name",
        { x: 300, opacity: 0, scale: 0.5 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.5"
      );

      // Role flying up from bottom
      tl.fromTo(
        ".hero-role",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Description flies in from left
      tl.fromTo(
        ".hero-desc",
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
        "-=0.4"
      );

      // Buttons fly in from bottom with stagger
      tl.fromTo(
        ".hero-btn",
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Social icons spiral in
      tl.fromTo(
        ".hero-social",
        { scale: 0, rotation: 360, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)" },
        "-=0.4"
      );

      // Scroll indicator bounces in
      tl.fromTo(
        ".scroll-indicator",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" },
        "-=0.2"
      );

      // Floating animation for particles
      gsap.to(".particle", {
        y: "+=30",
        x: "+=20",
        rotation: "+=360",
        duration: 8,
        ease: "sine.inOut",
        stagger: { each: 0.5, repeat: -1, yoyo: true }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Grid background */}
      <div className="grid-bg absolute inset-0" />

      {/* Animated particles */}
      <div className="particle absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#7000ff] opacity-20 blur-xl" />
      <div className="particle absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#7000ff] to-[#00d9ff] opacity-15 blur-2xl" />
      <div className="particle absolute bottom-32 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#7000ff] opacity-10 blur-xl" />
      <div className="particle absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-gradient-to-br from-[#7000ff] to-[#00d9ff] opacity-20 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        {/* Greeting */}
        <div className="hero-greeting text-lg md:text-xl text-[#a0a0a0] mb-4">
          Hi, I&apos;m
        </div>

        {/* Name */}
        <h1 className="hero-name text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          <span className="gradient-text">{personalInfo.fullName}</span>
        </h1>

        {/* Animated role */}
        <div className="hero-role text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 h-16 flex items-center justify-center">
          <span className="text-white">{displayText}</span>
          <span className="inline-block w-1 h-8 md:h-12 bg-[#00d9ff] ml-2 animate-pulse" />
        </div>

        {/* Description */}
        <p className="hero-desc text-lg md:text-xl text-[#a0a0a0] max-w-3xl mx-auto mb-12">
          {personalInfo.about}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          <button className="hero-btn btn-primary px-8 py-4 text-lg">
            View My Work
          </button>
          <button className="hero-btn btn-outline px-8 py-4 text-lg">
            Download CV
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center mb-16">
          <a href={personalInfo.github} className="hero-social w-12 h-12 rounded-full border-2 border-[#ffffff33] flex items-center justify-center hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300 group">
            <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
          </a>
          <a href={personalInfo.linkedin} className="hero-social w-12 h-12 rounded-full border-2 border-[#ffffff33] flex items-center justify-center hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300 group">
            <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="hero-social w-12 h-12 rounded-full border-2 border-[#ffffff33] flex items-center justify-center hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300 group">
            <FaEnvelope className="text-xl group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-[#a0a0a0]">Scroll Down</span>
          <FaArrowDown className="text-[#00d9ff]" />
        </div>
      </div>
    </section>
  );
}
