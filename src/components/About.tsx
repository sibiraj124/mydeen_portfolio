"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";
import { FaBriefcase, FaGraduationCap, FaCertificate, FaCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: FaBriefcase, value: "3+", label: "Projects Built", color: "#00d4ff" },
  { icon: FaGraduationCap, value: "1", label: "Internship", color: "#8b5cf6" },
  { icon: FaCertificate, value: "3", label: "Certifications", color: "#ec4899" },
  { icon: FaCode, value: "7.9", label: "GPA", color: "#10b981" },
];

export default function About() {
  const sectionRef = useRef<HTMLOptionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label slides in
      gsap.fromTo(".about-label",
        { y: -50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".about-label", start: "top 85%" }
        }
      );

      // Title reveals with clip-path
      gsap.fromTo(".about-title",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-title", start: "top 80%" }
        }
      );

      // Description slides in
      gsap.fromTo(".about-description",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".about-description", start: "top 80%" }
        }
      );

      // Stats cards fly in with rotation
      gsap.fromTo(".stat-card",
        { y: 100, opacity: 0, scale: 0.8, rotation: -5 },
        {
          y: 0, opacity: 1, scale: 1, rotation: 0,
          duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".stats-grid", start: "top 75%" }
        }
      );

      // Counter animation
      const counters = document.querySelectorAll(".counter-value");
      counters.forEach((counter) => {
        const target = counter.getAttribute("data-target") || "0";
        const isDecimal = target.includes(".");
        const targetNum = parseFloat(target);
        
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: targetNum,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: isDecimal ? 0.1 : 1 },
            scrollTrigger: { trigger: counter, start: "top 85%" },
            onUpdate: function() {
              const current = parseFloat((this.targets()[0] as HTMLElement).innerText);
              (this.targets()[0] as HTMLElement).innerText = isDecimal 
                ? current.toFixed(1) 
                : Math.ceil(current).toString();
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative">
      <div className="grid-bg  opacity-30" />
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="about-label section-label">Who I Am</span>
          <h2 className="about-title section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="about-description section-description">
            {personalInfo.about}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card card p-6 md:p-8 text-center group"
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`
                  }}
                >
                  <Icon className="text-2xl" style={{ color: stat.color }} />
                </div>
                
                {/* Counter Value */}
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span 
                    className="counter-value" 
                    data-target={stat.value}
                    style={{ color: stat.color }}
                  >
                    0
                  </span>
                  {stat.value.includes("+") && <span style={{ color: stat.color }}>+</span>}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-[var(--text-secondary)] font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="card p-8 about-card">
            <h3 className="text-xl font-bold mb-4 gradient-text">What I Do</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I specialize in building full-stack web applications using modern technologies. 
              Currently pursuing my MCA and actively looking for opportunities to apply my skills 
              in real-world projects.
            </p>
          </div>
          <div className="card p-8 about-card">
            <h3 className="text-xl font-bold mb-4 gradient-text">My Goal</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              To contribute to innovative projects while continuously learning and growing as a developer. 
              I&apos;m passionate about clean code, user experience, and building solutions that make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
