// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { FaBars, FaTimes } from "react-icons/fa";

// const navLinks = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Experience", href: "#experience" },
//   { label: "Skills", href: "#skills" },
//   { label: "Projects", href: "#projects" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Header() {
//   const headerRef = useRef<HTMLElement>(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // Flying in animation
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header slides in from top
//       gsap.fromTo(headerRef.current,
//         { y: -100, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
//       );

//       // Logo scales in
//       gsap.fromTo(".header-logo",
//         { scale: 0, opacity: 0, rotation: -180 },
//         { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
//       );

//       // Nav items fly in from left with stagger
//       gsap.fromTo(".nav-item",
//         { x: -50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.7 }
//       );

//       // CTA button flies in from right
//       gsap.fromTo(".nav-cta",
//         { x: 50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1.2 }
//       );
//     });
//     return () => ctx.revert();
//   }, []);

//   // Scroll handling
//   useEffect(() => {
//     const onScroll = () => {
//       setIsScrolled(window.scrollY > 50);
      
//       // Active section tracking
//       const sections = navLinks.map((l) => l.href.replace("#", ""));
//       for (const id of sections.reverse()) {
//         const el = document.getElementById(id);
//         if (el && window.scrollY >= el.offsetTop - 200) {
//           setActiveSection(id);
//           break;
//         }
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const scrollTo = (href: string) => {
//     setMobileOpen(false);
//     const id = href.replace("#", "");
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <header
//       ref={headerRef}
//       className={`fixed w-full top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
//         isScrolled ? "header-scrolled py-4" : "py-6"
//       }`}
//     >
//       <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
//         {/* Logo */}
//         <div
//           className="header-logo flex items-center gap-3 cursor-pointer group"
//           onClick={() => scrollTo("#home")}
//         >
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#00d4ff]/20 group-hover:shadow-[#00d4ff]/40 transition-shadow">
//             <span className="text-white font-bold text-lg">M</span>
//           </div>
//           <span className="text-2xl font-bold text-[var(--text-primary)] hidden sm:block">
//             <span className="text-white">My</span>
//             <span className="gradient-text">dheen</span>
//           </span>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-4">
//           {navLinks.map((link) => {
//             const id = link.href.replace("#", "");
//             const isActive = activeSection === id;
//             return (
//               <button
//                 key={link.label}
//                 onClick={() => scrollTo(link.href)}
//                 className={`nav-item relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
//                   isActive
//                     ? "text-[#00d4ff]"
//                     : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
//                 }`}
//               >
//                 {link.label}
//                 {isActive && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00d4ff]" />
//                 )}
//               </button>
//             );
//           })}
//           <button
//             onClick={() => scrollTo("#contact")}
//             className="nav-cta btn-primary ml-6 px-6 py-2.5 text-sm"
//           >
//             <span>Hire Me</span>
//           </button>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden w-10 h-10 rounded-lg bg-transparent border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)]"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden absolute top-full left-0 right-0 w-full bg-[var(--bg-secondary)]/98 backdrop-blur-xl border-b border-[var(--border-color)] transition-all duration-300 overflow-hidden ${
//           mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <nav className="flex flex-col gap-3 p-6">
//           {navLinks.map((link) => {
//             const id = link.href.replace("#", "");
//             const isActive = activeSection === id;
//             return (
//               <button
//                 key={link.label}
//                 onClick={() => scrollTo(link.href)}
//                 className={`text-left px-5 py-3.5 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-[#00d4ff]/10 text-[#00d4ff]"
//                     : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/5"
//                 }`}
//               >
//                 {link.label}
//               </button>
//             );
//           })}
//           <button
//             onClick={() => scrollTo("#contact")}
//             className="btn-primary w-full mt-3"
//           >
//             <span>Hire Me</span>
//           </button>
//         </nav>
//       </div>
//     </header>
//   );
// }
"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("#home")}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>

            <span className="text-white font-semibold text-lg">
              My<span className="text-cyan-400">dheen</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-gray-300 hover:text-white text-sm transition"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Hire Me */}
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:block bg-cyan-400 text-black px-5 py-2 rounded-lg text-sm font-medium"
            >
              Hire Me
            </button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white text-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-5 flex flex-col gap-3">

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-gray-300 hover:text-white py-2"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => scrollTo("#contact")}
              className="bg-blue-400 text-black py-2 text-lg rounded-lg mt-2"
            >
              Hire Me
            </button>

          </nav>
        )}

      </div>
    </header>
  );
}