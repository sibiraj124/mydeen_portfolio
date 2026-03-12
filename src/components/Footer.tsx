"use client";

import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaArrowUp } from "react-icons/fa";
import { HiCode } from "react-icons/hi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: FaTwitter, href: personalInfo.twitter, label: "Twitter" },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--bg-primary)", borderTop: "1px solid rgba(14,165,233,0.1)" }}>
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 w-96 h-1 -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, #0ea5e9, transparent)", filter: "blur(2px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", boxShadow: "0 0 20px rgba(14,165,233,0.3)" }}>
                <span className="text-white font-bold font-heading text-lg">M</span>
              </div>
              <span className="font-heading font-bold text-xl" style={{ color: "#e2e8f0" }}>
                My<span className="gradient-text">dheen</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
              Full Stack Developer crafting elegant digital solutions with modern web technologies.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono" style={{ color: "#86efac" }}>Available for opportunities</span>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)", color: "#94a3b8" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#0ea5e9";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(14,165,233,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(14,165,233,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(14,165,233,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(14,165,233,0.08)";
                  }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs mb-6 uppercase tracking-widest" style={{ color: "#0ea5e9" }}>
              // Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-all duration-200 hover:text-[#0ea5e9] hover:translate-x-1 inline-flex items-center gap-1"
                    style={{ color: "#64748b" }}
                  >
                    <span className="text-[#0ea5e9] opacity-0 group-hover:opacity-100 text-xs">›</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs mb-6 uppercase tracking-widest" style={{ color: "#0ea5e9" }}>
              // Get In Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm" style={{ color: "#64748b" }}>
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary mt-6 py-2 px-4 text-sm">
              <span>Send Message</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-8" style={{ background: "rgba(14,165,233,0.1)" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "#64748b" }}>
            <HiCode style={{ color: "#0ea5e9" }} />
            <span>Built with</span>
            <FaHeart size={10} style={{ color: "#ec4899" }} />
            <span>by</span>
            <span className="gradient-text font-semibold">{personalInfo.name}</span>
            <span>using Next.js + GSAP</span>
          </div>
          <p className="text-xs font-mono" style={{ color: "#64748b" }}>
            © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
          boxShadow: "0 0 20px rgba(14,165,233,0.4)",
        }}
        aria-label="Back to top"
      >
        <FaArrowUp size={16} className="text-white" />
      </button>
    </footer>
  );
}
