"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 });
      gsap.fromTo(".nav-item", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.6 });
      gsap.fromTo(".nav-cta", { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? "header-scrolled py-4" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="text-3xl font-bold">
            <span className="text-white">M</span><span className="gradient-text">ydheen</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button key={link.label} onClick={() => scrollTo(link.href)} className={`nav-item text-sm font-medium transition-all duration-300 relative ${isActive ? "text-[#00d9ff]" : "text-[#a0a0a0] hover:text-white"}`}>
                {link.label}
                {isActive && <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d9ff] to-[#7000ff]" />}
              </button>
            );
          })}
          <button className="nav-cta btn-primary text-sm">Get in Touch</button>
        </nav>
        <button className="md:hidden flex flex-col gap-1.5 p-2 z-50" onClick={() => setMobileOpen(!mobileOpen)}>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-[#ffffff1a] py-6">
          <nav className="flex flex-col gap-4 px-6">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.href)} className="text-left text-white hover:text-[#00d9ff] transition-colors">{link.label}</button>
            ))}
            <button className="btn-primary mt-4">Get in Touch</button>
          </nav>
        </div>
      )}
    </header>
  );
}
