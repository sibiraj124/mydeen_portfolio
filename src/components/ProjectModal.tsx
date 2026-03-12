"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaStar, FaCode, FaBullseye } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

interface Project {
  title: string;
  description: string;
  tech: string[];
  purpose: string;
  github: string;
  live: string;
  featured: boolean;
  gradient: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        modalRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)", delay: 0.1 }
      );
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      ctx.revert();
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.1,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
      style={{ background: "rgba(2,11,24,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(14,165,233,0.25)",
          boxShadow: "0 25px 80px rgba(14,165,233,0.2), 0 0 0 1px rgba(14,165,233,0.1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Top gradient banner */}
        <div className={`h-32 relative bg-gradient-to-br ${project.gradient} overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
          <FaCode size={44} className="relative z-10 text-white opacity-60" />
          {project.featured && (
            <div className="absolute top-3 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
              style={{ background: "rgba(0,0,0,0.6)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.35)" }}>
              <FaStar size={10} />
              Featured Project
            </div>
          )}
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
          >
            <FaTimes size={13} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <div className="mb-6">
            <p className="text-xs font-mono mb-2" style={{ color: "#0ea5e9" }}>// project overview</p>
            <h3 className="font-heading font-bold text-2xl leading-tight" style={{ color: "#e2e8f0" }}>
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              {project.description}
            </p>
          </div>

          {/* Purpose */}
          <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
            <div className="flex items-center gap-2 mb-2">
              <FaBullseye size={14} style={{ color: "#0ea5e9" }} />
              <span className="text-xs font-mono font-semibold" style={{ color: "#0ea5e9" }}>Purpose</span>
            </div>
            <p className="text-sm" style={{ color: "#94a3b8" }}>{project.purpose}</p>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <HiSparkles size={14} style={{ color: "#06b6d4" }} />
              <span className="text-xs font-mono font-semibold" style={{ color: "#06b6d4" }}>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
                  style={{
                    background: "rgba(6,182,212,0.1)",
                    color: "#06b6d4",
                    border: "1px solid rgba(6,182,212,0.25)",
                  }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2" style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }}>
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(14,165,233,0.1)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  color: "#0ea5e9",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(14,165,233,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(14,165,233,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <FaGithub size={16} />
                View Source Code
              </a>
            ) : (
              <div
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(100,116,139,0.08)",
                  border: "1px solid rgba(100,116,139,0.2)",
                  color: "#64748b",
                }}
              >
                <FaGithub size={16} />
                Source — Private
              </div>
            )}

            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 25px rgba(14,165,233,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <FaExternalLinkAlt size={13} />
                Live Demo
              </a>
            ) : (
              <div
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(100,116,139,0.08)",
                  border: "1px solid rgba(100,116,139,0.2)",
                  color: "#64748b",
                }}
              >
                <FaExternalLinkAlt size={13} />
                Demo — Not Deployed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
