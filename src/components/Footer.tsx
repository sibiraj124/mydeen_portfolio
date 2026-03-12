"use client";

import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-[var(--border-color)]">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">My</span>
                <span className="gradient-text">dheen</span>
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              {personalInfo.role}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all"
              >
                <FaGithub />
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all"
              >
                <FaLinkedin />
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-[#00d4ff]/20"
          >
            <FaArrowUp />
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-[var(--text-muted)] flex items-center justify-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} {personalInfo.fullName}.</span>
            <span className="flex items-center gap-1">
              Made with <FaHeart className="text-red-500 animate-pulse" /> in India
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
