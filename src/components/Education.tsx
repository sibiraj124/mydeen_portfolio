"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/portfolio";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".edu-item", { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2,
          scrollTrigger: { trigger: ".edu-timeline", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-tag mb-3">// my academic journey</p>
          <h2 className="section-heading">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
        </div>

        <div className="edu-timeline relative pl-12">
          <div className="absolute left-5 top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(180deg, #8b5cf6, #0ea5e9, rgba(139,92,246,0.1))" }} />

          {education.map((edu, i) => (
            <div key={i} className="edu-item relative mb-8 last:mb-0">
              {/* Dot */}
              <div className="absolute -left-7 top-6 w-5 h-5 rounded-full flex items-center justify-center z-10"
                style={{
                  background: "var(--bg-primary)",
                  border: "2px solid #8b5cf6",
                  boxShadow: "0 0 12px rgba(139,92,246,0.5)",
                }}>
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
              </div>

              <div className="card p-6 group hover:border-[rgba(139,92,246,0.35)]">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FaGraduationCap size={16} style={{ color: "#8b5cf6" }} />
                      <h3 className="font-heading font-bold text-base group-hover:text-[#8b5cf6] transition-colors duration-300"
                        style={{ color: "#e2e8f0" }}>
                        {edu.degree}
                      </h3>
                    </div>
                    <p className="font-semibold text-sm" style={{ color: "#8b5cf6" }}>{edu.institution}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)" }}>
                      <FaCalendarAlt size={10} />
                      {edu.period}
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "#64748b" }}>
                      <FaMapMarkerAlt size={10} />
                      {edu.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <FaStar size={12} style={{ color: "#fbbf24" }} />
                  <span className="text-xs font-mono font-semibold" style={{ color: "#fbbf24" }}>{edu.grade}</span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
