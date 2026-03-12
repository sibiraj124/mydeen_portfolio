"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/portfolio";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".edu-chapter", { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        });
      gsap.fromTo(".edu-card", { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)", stagger: 0.2,
          scrollTrigger: { trigger: ".edu-grid", start: "top 80%", toggleActions: "play none none reverse" }
        });
      gsap.fromTo(".edu-connector", { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.out", delay: 0.4,
          scrollTrigger: { trigger: ".edu-grid", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const colors = ["#8b5cf6", "#0ea5e9"];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", filter: "blur(100px)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        {/* Chapter marker */}
        <div className="edu-chapter flex items-center gap-4 mb-16">
          <span className="text-[clamp(4rem,10vw,8rem)] font-black leading-none select-none"
            style={{ color: "rgba(139,92,246,0.07)", fontFamily: "'Space Grotesk', sans-serif" }}>04</span>
          <div>
            <p className="section-tag">// academic journey</p>
            <h2 className="section-heading">
              My <span className="gradient-text-purple">Education</span>
            </h2>
          </div>
        </div>

        {/* Education cards with visual progression */}
        <div className="edu-grid relative">
          {/* Progression line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0"
            style={{ background: "rgba(139,92,246,0.1)" }} />
          <div className="edu-connector hidden lg:block absolute top-1/2 left-0 w-1/2 h-px -translate-y-1/2 z-0 origin-left"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #0ea5e9)" }} />

          <div className="grid lg:grid-cols-2 gap-8">
            {education.map((edu, i) => (
              <div key={i} className={`edu-card relative ${i === 0 ? "lg:mt-0" : "lg:mt-0"}`}>
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10"
                    style={{
                      background: colors[i],
                      color: "#fff",
                      boxShadow: `0 0 16px ${colors[i]}60`,
                    }}>
                    {i + 1}
                  </div>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${colors[i]}, transparent)` }} />
                </div>

                {/* Card */}
                <div className="card p-8 group relative overflow-hidden"
                  style={{ "--card-color": colors[i] } as React.CSSProperties}>
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}50, transparent)` }} />

                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${colors[i]}18`, border: `1px solid ${colors[i]}35` }}>
                      <FaGraduationCap size={22} style={{ color: colors[i] }} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: `${colors[i]}12`, color: colors[i], border: `1px solid ${colors[i]}30` }}>
                      <FaCalendarAlt size={9} />
                      {edu.period}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:transition-colors duration-300"
                    style={{ color: "#e2e8f0" }}>
                    {edu.degree}
                  </h3>
                  <p className="font-semibold text-base mb-1" style={{ color: colors[i] }}>
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-1.5 mb-4 text-sm" style={{ color: "#64748b" }}>
                    <FaMapMarkerAlt size={11} />
                    {edu.location}
                  </div>

                  {edu.grade && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg w-fit"
                      style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
                      <FaStar size={12} style={{ color: "#fbbf24" }} />
                      <span className="text-xs font-mono font-semibold" style={{ color: "#fbbf24" }}>{edu.grade}</span>
                    </div>
                  )}

                  {edu.period === "Pursuing" && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg w-fit"
                      style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-mono font-semibold" style={{ color: "#22c55e" }}>Currently Pursuing</span>
                    </div>
                  )}

                  <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{edu.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progression arrow */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-10"
            style={{ background: "var(--bg-primary)", border: "2px solid rgba(139,92,246,0.4)" }}>
            <FaArrowRight size={14} style={{ color: "#8b5cf6" }} />
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <p className="text-sm font-mono" style={{ color: "#64748b" }}>
            <span style={{ color: "#0ea5e9" }}>// </span>
            Education is not the filling of a pail, but the lighting of a fire.
          </p>
        </div>
      </div>
    </section>
  );
}
