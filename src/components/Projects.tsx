"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title flies in from top
      gsap.fromTo(
        ".projects-title",
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 80%",
          },
        }
      );

      // Project cards fly in from various angles
      gsap.fromTo(
        ".project-card",
        { 
          y: 150, 
          opacity: 0, 
          scale: 0.7,
          rotation: (index) => (index % 2 === 0 ? -10 : 10)
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen flex items-center py-20">
      <div className="grid-bg absolute inset-0 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2 className="projects-title section-title mb-8">
          My <span className="gradient-text">Projects</span>
        </h2>

        <p className="section-subtitle mb-16">
          Some of my recent work and contributions
        </p>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card card p-6 group"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#00d9ff] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#a0a0a0] text-sm mb-4">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs rounded-full bg-[#ffffff0d] border border-[#ffffff1a] text-[#a0a0a0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-[#00d9ff] hover:underline"
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="flex items-center gap-2 text-sm text-[#00d9ff] hover:underline"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
