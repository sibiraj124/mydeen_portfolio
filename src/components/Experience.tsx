"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/portfolio";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-item", { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2,
          scrollTrigger: { trigger: ".exp-timeline", start: "top 80%", toggleActions: "play none none reverse" }
        });
      gsap.fromTo(".timeline-line-fill", { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "power2.out", transformOrigin: "top",
          scrollTrigger: { trigger: ".exp-timeline", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-tag mb-3">// where I&apos;ve worked</p>
          <h2 className="section-heading">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
        </div>

        <div className="exp-timeline relative pl-12">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5"
            style={{ background: "rgba(14,165,233,0.1)" }} />
          <div className="timeline-line-fill absolute left-5 top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(180deg, #0ea5e9, #06b6d4, rgba(14,165,233,0.1))" }} />

          {experiences.map((exp, i) => (
            <div key={i} className="exp-item relative mb-10 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute -left-7 top-6 w-5 h-5 rounded-full flex items-center justify-center z-10"
                style={{
                  background: "var(--bg-secondary)",
                  border: "2px solid #0ea5e9",
                  boxShadow: "0 0 12px rgba(14,165,233,0.5)",
                }}>
                <div className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
              </div>

              {/* Card */}
              <div className="card p-6 group hover:border-[rgba(14,165,233,0.35)]">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg group-hover:text-[#0ea5e9] transition-colors duration-300"
                      style={{ color: "#e2e8f0" }}>
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FaBriefcase size={12} style={{ color: "#0ea5e9" }} />
                      <span className="font-semibold text-sm" style={{ color: "#0ea5e9" }}>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)" }}>
                      <FaCalendarAlt size={10} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "#64748b" }}>
                      <FaMapMarkerAlt size={10} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                  {exp.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono"
                      style={{ background: "rgba(14,165,233,0.08)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Type badge */}
                {exp.type === "Full-time" && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                    <HiSparkles size={10} />
                    {exp.type}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
