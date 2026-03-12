"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/portfolio";
import { FaReact, FaNodeJs, FaDatabase, FaCloud } from "react-icons/fa";
import { HiChip } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  FaReact: <FaReact size={22} />,
  FaNodeJs: <FaNodeJs size={22} />,
  FaDatabase: <FaDatabase size={22} />,
  FaCloud: <FaCloud size={22} />,
};

const techLogos = [
  { name: "React", color: "#61dafb" }, { name: "Next.js", color: "#fff" },
  { name: "TypeScript", color: "#3178c6" }, { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#ffd43b" }, { name: "MongoDB", color: "#4db33d" },
  { name: "PostgreSQL", color: "#336791" }, { name: "Docker", color: "#2496ed" },
  { name: "AWS", color: "#ff9900" }, { name: "GraphQL", color: "#e10098" },
  { name: "Redis", color: "#dc382d" }, { name: "Tailwind", color: "#38bdf8" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-category-card", { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%", toggleActions: "play none none reverse" }
        });

      // Animate skill bars
      document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
        const target = (bar as HTMLElement).dataset.width || "0";
        gsap.fromTo(bar, { width: "0%" },
          { width: `${target}%`, duration: 1.5, ease: "power2.out",
            scrollTrigger: { trigger: bar, start: "top 85%", toggleActions: "play none none reverse" }
          });
      });

      gsap.fromTo(".tech-pill", { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.05,
          scrollTrigger: { trigger: ".tech-pills", start: "top 85%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-tag mb-3">// what I work with</p>
          <h2 className="section-heading">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            A curated toolkit I use to build powerful, scalable web applications.
          </p>
        </div>

        {/* Skill categories grid */}
        <div className="skills-grid grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {skills.map((cat) => (
            <div key={cat.category} className="skill-category-card card p-6 group hover:border-[rgba(14,165,233,0.4)]">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}40`, color: cat.color }}>
                  {iconMap[cat.icon]}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm" style={{ color: "#e2e8f0" }}>{cat.category}</h3>
                  <p className="text-xs font-mono" style={{ color: "#64748b" }}>{cat.items.length} skills</p>
                </div>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-4">
                {cat.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-mono" style={{ color: "#94a3b8" }}>{skill.name}</span>
                      <span className="text-xs font-mono font-semibold" style={{ color: cat.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="skill-bar-fill"
                        data-width={skill.level}
                        style={{
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`,
                          height: "100%",
                          borderRadius: "10px",
                          width: "0%",
                          boxShadow: `0 0 8px ${cat.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div className="tech-pills text-center">
          <div className="flex items-center gap-2 justify-center mb-6">
            <HiChip className="text-[#0ea5e9]" size={20} />
            <span className="font-heading font-semibold" style={{ color: "#e2e8f0" }}>Technologies I Work With</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {techLogos.map((tech) => (
              <div key={tech.name} className="tech-pill flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(10,31,60,0.8)",
                  border: `1px solid ${tech.color}30`,
                  color: tech.color,
                  boxShadow: `0 0 10px ${tech.color}10`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${tech.color}40`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${tech.color}60`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 10px ${tech.color}10`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${tech.color}30`;
                }}>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
