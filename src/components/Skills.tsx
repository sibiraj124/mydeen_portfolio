"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/portfolio";
import { FaCode, FaLaptopCode, FaDatabase, FaUsers } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  FaReact: FaCode,
  FaNodeJs: FaLaptopCode,
  FaDatabase: FaDatabase,
  FaCloud: FaUsers,
};

export default function Skills() {
  const sectionRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title flies in from top
      gsap.fromTo(
        ".skills-title",
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-title",
            start: "top 80%",
          },
        }
      );

      // Skill cards fly in from alternating sides
      gsap.fromTo(
        ".skill-card",
        { x: (index) => (index % 2 === 0 ? -200 : 200), opacity: 0, rotation: (index) => (index % 2 === 0 ? -15 : 15) },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 75%",
          },
        }
      );

      // Skill items fly up one by one
      gsap.fromTo(
        ".skill-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skill-card",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen flex items-center py-20">
      <div className="grid-bg absolute inset-0 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2 className="skills-title section-title mb-8">
          My <span className="gradient-text">Skills</span>
        </h2>

        <p className="section-subtitle mb-16">
          Technologies and tools I work with
        </p>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, categoryIndex) => {
            const Icon = iconMap[category.icon] || FaCode;
            return (
              <div
                key={categoryIndex}
                className="skill-card card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: `${category.color}20`, border: `2px solid ${category.color}` }}
                  >
                    <Icon className="text-2xl" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>

                <div className="space-y-6">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[#a0a0a0]">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-[#ffffff1a] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
