"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const gradients = [
  "from-[#00d4ff]/20 to-[#8b5cf6]/20",
  "from-[#8b5cf6]/20 to-[#ec4899]/20",
  "from-[#10b981]/20 to-[#00d4ff]/20",
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animations
      gsap.fromTo(".projects-label",
        { y: -50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-label", start: "top 85%" }
        }
      );

      gsap.fromTo(".projects-title",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-title", start: "top 80%" }
        }
      );

      gsap.fromTo(".projects-description",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".projects-description", start: "top 80%" }
        }
      );

      // Project cards with 3D perspective effect
      gsap.fromTo(".project-card",
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.9,
          rotationX: 15,
        },
        {
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          duration: 1, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-grid", start: "top 75%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative">
      <div className="grid-bg opacity-30" />
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="projects-label section-label">Portfolio</span>
          <h2 className="projects-title section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects-description section-description">
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card card group"
              style={{ perspective: "1000px" }}
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[var(--bg-card)]/50" />
                <FaFolder className="text-5xl text-[var(--text-muted)] relative z-10 group-hover:scale-110 group-hover:text-[#00d4ff] transition-all duration-500" />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/40 rounded-full">
                    <span className="text-xs font-semibold text-[#00d4ff]">Featured</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[#00d4ff] transition-colors line-clamp-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Purpose */}
                {project.purpose && (
                  <p className="text-xs text-[var(--text-muted)] italic mb-4 line-clamp-2">
                    &ldquo;{project.purpose}&rdquo;
                  </p>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[#00d4ff] transition-colors"
                    >
                      <FaGithub className="text-lg" />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[#00d4ff] transition-colors"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <span className="text-sm text-[var(--text-muted)]">
                      Academic Project
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
