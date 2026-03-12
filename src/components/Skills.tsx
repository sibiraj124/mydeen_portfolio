"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/portfolio";
import { FaCode, FaServer, FaDatabase, FaUsers, FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs, FaPhp } from "react-icons/fa";
import { SiMysql } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, any> = {
  "Programming Languages": FaCode,
  "Web Technologies": FaServer,
  "Databases": FaDatabase,
  "Soft Skills": FaUsers,
};

const skillIcons: Record<string, any> = {
  "Java": FaJava,
  "Python": FaPython,
  "PHP": FaPhp,
  "JavaScript": FaJs,
  "HTML5": FaHtml5,
  "CSS3": FaCss3Alt,
  "MySQL": SiMysql,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animations
      gsap.fromTo(".skills-label",
        { y: -50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-label", start: "top 85%" }
        }
      );

      gsap.fromTo(".skills-title",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-title", start: "top 80%" }
        }
      );

      gsap.fromTo(".skills-description",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".skills-description", start: "top 80%" }
        }
      );

      // Skill cards fly in from alternating directions
      gsap.fromTo(".skill-card",
        { 
          x: (index) => (index % 2 === 0 ? -150 : 150),
          opacity: 0, 
          scale: 0.9,
          rotation: (index) => (index % 2 === 0 ? -8 : 8)
        },
        {
          x: 0, opacity: 1, scale: 1, rotation: 0,
          duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { 
            trigger: ".skills-grid", 
            start: "top 75%",
            onEnter: () => setAnimatedBars(true)
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative">
      <div className="grid-bg opacity-30" />
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="skills-label section-label">Expertise</span>
          <h2 className="skills-title section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="skills-description section-description">
            Technologies and tools I&apos;ve worked with throughout my journey
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {skills.map((category, categoryIndex) => {
            const CategoryIcon = categoryIcons[category.category] || FaCode;
            return (
              <div
                key={categoryIndex}
                className="skill-card card p-6 md:p-8"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ 
                      background: `${category.color}15`,
                      border: `1px solid ${category.color}40`
                    }}
                  >
                    <CategoryIcon className="text-2xl" style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {category.category}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {category.items.length} skills
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.items.map((skill, skillIndex) => {
                    const SkillIcon = skillIcons[skill.name];
                    return (
                      <div key={skillIndex} className="skill-item">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {SkillIcon && (
                              <SkillIcon 
                                className="text-lg" 
                                style={{ color: category.color }} 
                              />
                            )}
                            <span className="font-medium text-[var(--text-primary)]">
                              {skill.name}
                            </span>
                          </div>
                          <span 
                            className="text-sm font-semibold"
                            style={{ color: category.color }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-bar-fill"
                            style={{
                              width: animatedBars ? `${skill.level}%` : '0%',
                              background: `linear-gradient(90deg, ${category.color}, ${category.color}99)`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
