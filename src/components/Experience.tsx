"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/portfolio";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-chapter", { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        });
      gsap.fromTo(".exp-card", { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.2,
          scrollTrigger: { trigger: ".exp-cards", start: "top 80%", toggleActions: "play none none reverse" }
        });
      gsap.fromTo(".timeline-fill", { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "power2.out", transformOrigin: "top",
          scrollTrigger: { trigger: ".exp-cards", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const highlights = [
    "Designed responsive, client-ready web interfaces",
    "Proficient in HTML, CSS, and JavaScript",
    "Built structured and visually appealing websites",
    "Collaborated with team to meet client requirements",
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)", filter: "blur(100px)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        {/* Chapter marker */}
        <div className="exp-chapter flex items-center gap-4 mb-16">
          <span className="text-[clamp(4rem,10vw,8rem)] font-black leading-none select-none"
            style={{ color: "rgba(6,182,212,0.07)", fontFamily: "'Space Grotesk', sans-serif" }}>03</span>
          <div>
            <p className="section-tag">// where I&apos;ve been</p>
            <h2 className="section-heading">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </div>
        </div>

        <div className="exp-cards relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-6 bottom-6 w-px transform"
            style={{ background: "rgba(14,165,233,0.1)" }} />
          <div className="timeline-fill absolute left-0 top-6 bottom-6 w-px transform origin-top scale-y-0 will-change-transform"
            style={{ background: "linear-gradient(180deg, #0ea5e9, #06b6d4)" }} />

          {experiences.map((exp, i) => (
            <div key={i} className="exp-card relative mb-6 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute -left-[2.1rem] top-8 w-4 h-4 rounded-full z-10 flex items-center justify-center"
                style={{
                  background: "var(--bg-secondary)",
                  border: "2px solid #0ea5e9",
                  boxShadow: "0 0 14px rgba(14,165,233,0.6)",
                }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
              </div>

              {/* Main card */}
              <div className="card p-8 group">
                {/* Type badge */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                        <HiSparkles className="inline mr-1.5" size={10} />
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl group-hover:text-[#0ea5e9] transition-colors duration-300"
                      style={{ color: "#e2e8f0" }}>
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <FaBriefcase size={12} style={{ color: "#0ea5e9" }} />
                      <span className="font-semibold" style={{ color: "#0ea5e9" }}>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
                      style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.2)" }}>
                      <FaCalendarAlt size={10} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#64748b" }}>
                      <FaMapMarkerAlt size={10} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8", lineHeight: 1.85 }}>
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FaCheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: "#06b6d4" }} />
                      <span className="text-xs" style={{ color: "#64748b" }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }}>
                  {exp.tech?.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono font-semibold"
                      style={{ background: "rgba(14,165,233,0.08)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Future CTA */}
          <div className="exp-card relative mt-6">
            <div className="absolute -left-[2.1rem] top-6 w-4 h-4 rounded-full z-10"
              style={{ border: "2px dashed rgba(14,165,233,0.4)", background: "var(--bg-secondary)" }} />
            <div className="p-6 rounded-2xl"
              style={{ background: "rgba(14,165,233,0.03)", border: "1px dashed rgba(14,165,233,0.2)" }}>
              <p className="text-sm font-mono" style={{ color: "#64748b" }}>
                <span style={{ color: "#0ea5e9" }}>// </span>
                Your company name here — open to exciting opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
