"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { HiCodeBracket as HiCode } from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filtered = filter === "featured" ? projects.filter((p) => p.featured) : projects;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card", { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".projects-grid", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}>
      <div className="absolute top-0 left-1/2 w-96 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", filter: "blur(80px)", transform: "translateX(-50%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-tag mb-3">// what I&apos;ve built</p>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            A selection of projects that showcase my skills and passion for building great products.
          </p>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {(["all", "featured"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-sm font-mono capitalize transition-all duration-300"
                style={{
                  background: filter === f ? "linear-gradient(135deg, #0ea5e9, #06b6d4)" : "rgba(14,165,233,0.08)",
                  color: filter === f ? "#fff" : "#94a3b8",
                  border: filter === f ? "none" : "1px solid rgba(14,165,233,0.2)",
                  boxShadow: filter === f ? "0 0 20px rgba(14,165,233,0.3)" : "none",
                }}>
                {f === "featured" && <HiSparkles className="inline mr-1" />}
                {f === "all" ? `All (${projects.length})` : `Featured (${projects.filter((p) => p.featured).length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div key={i} className="project-card card group relative overflow-hidden flex flex-col">
              {/* Project visual header */}
              <div className={`h-44 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 grid-bg opacity-30" />
                {/* Project icon/emoji */}
                <div className="relative z-10 text-center">
                  <HiCode size={48} className="text-white opacity-80 mx-auto" />
                  <p className="text-white/60 text-xs font-mono mt-2">{project.tech[0]}</p>
                </div>
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono"
                    style={{ background: "rgba(0,0,0,0.5)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
                    <FaStar size={10} />
                    Featured
                  </div>
                )}
                {/* Links overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <FaGithub /> Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
                    style={{ background: "rgba(14,165,233,0.8)", color: "#fff", backdropFilter: "blur(10px)" }}>
                    <FaExternalLinkAlt size={12} /> Live
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-base mb-2 group-hover:text-[#0ea5e9] transition-colors duration-300"
                  style={{ color: "#e2e8f0" }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#94a3b8" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{ background: "rgba(14,165,233,0.08)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.15)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more */}
        <div className="text-center mt-10">
          <a href={`https://github.com/mydheen`} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex">
            <FaGithub />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
