"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled ? "header-scrolled py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 0 20px rgba(14,165,233,0.4)" }}>
            <span className="text-white font-bold font-heading text-lg">M</span>
          </div>
          <span className="font-heading font-bold text-xl hidden sm:block" style={{ color: "#e2e8f0" }}>
            My<span className="gradient-text">dheen</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  isActive ? "text-[#0ea5e9]" : "text-[#94a3b8] hover:text-[#e2e8f0]"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)" }} />
                )}
                <span className="relative">{link.label}</span>
              </button>
            );
          })}
          <a
            href={personalInfo.resumeUrl}
            className="btn-primary ml-3 py-2 px-4 text-sm"
            style={{ fontSize: "0.875rem" }}
          >
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-[#0ea5e9] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#0ea5e9] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#0ea5e9] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden glass-dark ${mobileOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left px-4 py-3 rounded-lg text-[#94a3b8] hover:text-[#0ea5e9] hover:bg-[rgba(14,165,233,0.1)] transition-all duration-200 text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          <a href={personalInfo.resumeUrl} className="btn-primary mt-2 justify-center">
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
