"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/data/portfolio";
import { FaCertificate, FaAward, FaExternalLinkAlt } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const issuerIcons: Record<string, string> = {
  "Free Code Camp": "💻",
  "Microsoft": "��",
  "Deloitte": "🏢",
};

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-chapter", { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        });
      gsap.fromTo(".cert-card", { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)", stagger: 0.15,
          scrollTrigger: { trigger: ".cert-grid", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Ambient */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        {/* Chapter marker */}
        <div className="cert-chapter flex items-center gap-4 mb-16">
          <span className="text-[clamp(4rem,10vw,8rem)] font-black leading-none select-none"
            style={{ color: "rgba(14,165,233,0.07)", fontFamily: "'Space Grotesk', sans-serif" }}>05</span>
          <div>
            <p className="section-tag">// earned credentials</p>
            <h2 className="section-heading">
              Certifi<span className="gradient-text">cations</span>
            </h2>
          </div>
        </div>

        {/* Cert cards */}
        <div className="cert-grid grid md:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card card group relative overflow-hidden p-8 flex flex-col gap-5">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}50, transparent)` }} />

              {/* Badge icon */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
                  {issuerIcons[cert.issuer] ?? "🏆"}
                </div>
                <HiShieldCheck size={22} style={{ color: `${cert.color}80` }} className="group-hover:text-opacity-100 transition-all duration-300" />
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="font-heading font-bold text-base leading-snug mb-3"
                  style={{ color: "#e2e8f0" }}>
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2">
                  <FaAward size={12} style={{ color: cert.color }} />
                  <span className="text-sm font-semibold" style={{ color: cert.color }}>{cert.issuer}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }}>
                <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#64748b" }}>
                  <FaCertificate size={10} style={{ color: cert.color }} />
                  {cert.date || "Certified"}
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}30` }}>
                  <FaExternalLinkAlt size={10} style={{ color: cert.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="text-center p-8 rounded-2xl"
          style={{ background: "rgba(14,165,233,0.04)", border: "1px solid rgba(14,165,233,0.12)" }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <HiShieldCheck size={22} style={{ color: "#0ea5e9" }} />
            <span className="font-heading font-semibold text-lg" style={{ color: "#e2e8f0" }}>
              {certifications.length} Professional Certifications
            </span>
          </div>
          <p className="text-sm font-mono max-w-lg mx-auto" style={{ color: "#64748b" }}>
            Continuously learning and validating knowledge through recognized certifications across different technology domains.
          </p>
        </div>
      </div>
    </section>
  );
}
