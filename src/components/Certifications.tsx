"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/data/portfolio";
import {
  FaAws, FaReact, FaNodeJs, FaDocker, FaGoogle, FaExternalLinkAlt, FaAward,
} from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  FaAws: <FaAws size={28} />,
  FaReact: <FaReact size={28} />,
  SiMongodb: <SiMongodb size={28} />,
  FaNodeJs: <FaNodeJs size={28} />,
  FaGoogle: <FaGoogle size={28} />,
  FaDocker: <FaDocker size={28} />,
};

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-card", { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)", stagger: 0.1,
          scrollTrigger: { trigger: ".certs-grid", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-tag mb-3">// my credentials</p>
          <h2 className="section-heading">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            Industry-recognized certifications validating my expertise.
          </p>
        </div>

        <div className="certs-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card card p-6 group relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none transition-all duration-500 group-hover:opacity-20"
                style={{ background: `radial-gradient(circle, ${cert.color}, transparent)`, filter: "blur(20px)" }} />

              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}40`,
                    color: cert.color,
                    boxShadow: `0 0 20px ${cert.color}20`,
                  }}>
                  {iconMap[cert.icon] || <FaAward size={28} />}
                </div>
                <a href={cert.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(14,165,233,0.08)",
                    color: "#0ea5e9",
                    border: "1px solid rgba(14,165,233,0.2)",
                  }}>
                  <FaExternalLinkAlt size={10} />
                  Verify
                </a>
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-base mb-2 group-hover:text-[#0ea5e9] transition-colors duration-300"
                style={{ color: "#e2e8f0" }}>
                {cert.title}
              </h3>
              <p className="text-sm mb-3" style={{ color: cert.color }}>{cert.issuer}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(255,255,255,0.04)", color: "#64748b", border: "1px solid rgba(255,255,255,0.06)" }}>
                  Issued {cert.date}
                </span>
                <span className="text-xs font-mono" style={{ color: "#64748b" }}>ID: {cert.credentialId.slice(-8)}</span>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
