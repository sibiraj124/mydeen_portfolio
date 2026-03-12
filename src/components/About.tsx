"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaDownload } from "react-icons/fa";
import { HiCode } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-left", { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-left", start: "top 80%", toggleActions: "play none none reverse" }
        });
      gsap.fromTo(".about-right", { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-right", start: "top 80%", toggleActions: "play none none reverse" }
        });
      gsap.fromTo(".stat-card", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1,
          scrollTrigger: { trigger: ".stat-card", start: "top 85%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}>
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="section-tag mb-3">// get to know me</p>
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Avatar & info */}
          <div className="about-left flex flex-col items-center lg:items-start gap-6">
            {/* Avatar card */}
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0a1f3c, #071428)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  boxShadow: "0 0 60px rgba(14,165,233,0.15)",
                }}>
                <div className="text-8xl">👨‍💻</div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0ea5e9] rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#06b6d4] rounded-br-2xl" />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2 rounded-xl glass"
                style={{ border: "1px solid rgba(14,165,233,0.3)" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono" style={{ color: "#0ea5e9" }}>Open to work</span>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mt-6">
              {[
                { icon: FaMapMarkerAlt, label: personalInfo.location, color: "#0ea5e9" },
                { icon: FaEnvelope, label: personalInfo.email, color: "#06b6d4" },
                { icon: FaPhone, label: personalInfo.phone, color: "#8b5cf6" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <span className="text-sm" style={{ color: "#94a3b8" }}>{label}</span>
                </div>
              ))}
            </div>

            <a href={personalInfo.resumeUrl} className="btn-primary mt-2">
              <FaDownload size={14} />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Right - Bio & stats */}
          <div className="about-right flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiCode className="text-[#0ea5e9]" size={20} />
                <span className="font-heading font-bold text-xl" style={{ color: "#e2e8f0" }}>
                  Who am I?
                </span>
              </div>
              {personalInfo.about.split("\n\n").map((para, i) => (
                <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Tech philosophy */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}>
              <p className="text-sm font-mono leading-relaxed" style={{ color: "#0ea5e9" }}>
                <span style={{ color: "#64748b" }}>// </span>
                &quot;Clean code always looks like it was written by someone who cares.&quot;
              </p>
              <p className="text-xs mt-2 font-mono" style={{ color: "#64748b" }}>— Robert C. Martin</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label} className="stat-card text-center p-4 rounded-xl card">
                  <div className="text-2xl font-heading font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs mt-1 font-mono" style={{ color: "#64748b" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
