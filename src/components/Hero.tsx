"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaChevronDown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

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
          setTimeout(() => setIsDeleting(true), 2500);
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

  // Advanced GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([".hero-badge", ".hero-greeting", ".hero-name", ".hero-role", ".hero-description", ".hero-buttons", ".hero-social", ".scroll-indicator"], {
        opacity: 0,
      });

      const tl = gsap.timeline({ delay: 0.5 });

      // Badge flies in from top with rotation
      tl.fromTo(".hero-badge",
        { y: -100, opacity: 0, scale: 0.5, rotation: -180 },
        { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );

      // Greeting text reveals
      tl.fromTo(".hero-greeting",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Name with staggered letter animation
      tl.fromTo(".hero-name",
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.6"
      );

      // Role subtitle slides up
      tl.fromTo(".hero-role",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      );

      // Description fades in
      tl.fromTo(".hero-description",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Buttons fly in from sides
      tl.fromTo(".hero-btn-primary",
        { x: -100, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      );

      tl.fromTo(".hero-btn-outline",
        { x: 100, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6"
      );

      // Social icons spiral in
      tl.fromTo(".hero-social-link",
        { scale: 0, opacity: 0, rotation: 180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: "back.out(2)" },
        "-=0.4"
      );

      // Scroll indicator bounces in
      tl.fromTo(".scroll-indicator",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "bounce.out" },
        "-=0.2"
      );

      // Continuous floating animation for orbs
      gsap.to(".hero-orb", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(4, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.5, from: "random" }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div className="grid-bg" />
      
      {/* Gradient Orbs */}
      <div className="hero-orb absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-transparent blur-[100px] animate-pulse-glow" />
      <div className="hero-orb absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#8b5cf6]/20 to-transparent blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="hero-orb absolute top-[50%] right-[30%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#ec4899]/15 to-transparent blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="section-container relative z-10 text-center px-4">
        {/* Available Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]"></span>
          </span>
          <span className="text-sm font-medium text-[#00d4ff]">Available for opportunities</span>
        </div>

        {/* Greeting */}
        <p className="hero-greeting text-lg md:text-xl text-[var(--text-secondary)] mb-4 font-medium">
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="hero-name text-display mb-6">
          <span className="gradient-text text-glow">{personalInfo.fullName}</span>
        </h1>

        {/* Animated Role */}
        <div className="hero-role flex items-center justify-center gap-3 mb-8">
          <HiSparkles className="text-[#00d4ff] text-2xl" />
          <span className="text-subtitle text-[var(--text-primary)] min-w-[280px] md:min-w-[400px]">
            {displayText}
            <span className="inline-block w-[3px] h-8 bg-[#00d4ff] ml-1 animate-pulse" />
          </span>
          <HiSparkles className="text-[#8b5cf6] text-2xl" />
        </div>

        {/* Description */}
        <p className="hero-description text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
          Passionate about building elegant solutions to complex problems. 
          I create modern, responsive applications with clean code and exceptional user experiences.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-wrap gap-4 justify-center mb-16">
          <button 
            onClick={() => scrollToSection("projects")}
            className="hero-btn-primary btn-primary px-8 py-4"
          >
            <span>View My Work</span>
          </button>
          <a 
            href={personalInfo.resumeUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-outline btn-outline px-8 py-4"
          >
            <FaDownload className="text-sm" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="hero-social flex gap-4 justify-center mb-20">
          {personalInfo.github && (
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-social-link w-12 h-12 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[var(--bg-primary)] transition-all duration-300"
            >
              <FaGithub className="text-xl" />
            </a>
          )}
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-social-link w-12 h-12 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[var(--bg-primary)] transition-all duration-300"
            >
              <FaLinkedin className="text-xl" />
            </a>
          )}
          <a 
            href={`mailto:${personalInfo.email}`}
            className="hero-social-link w-12 h-12 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[var(--bg-primary)] transition-all duration-300"
          >
            <FaEnvelope className="text-xl" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest group-hover:text-[#00d4ff] transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-[var(--border-color)] flex items-start justify-center p-2 group-hover:border-[#00d4ff] transition-colors">
            <div className="w-1 h-2 bg-[#00d4ff] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
