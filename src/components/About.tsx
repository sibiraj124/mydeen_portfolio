"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title flies in from top
      gsap.fromTo(
        ".about-title",
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
          },
        }
      );

      // Description flies in from left
      gsap.fromTo(
        ".about-description",
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-description",
            start: "top 80%",
          },
        }
      );

      // Stats fly in from bottom with stagger
      gsap.fromTo(
        ".stat-card",
        { y: 150, opacity: 0, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 75%",
          },
        }
      );

      // Counter animation
      const counters = document.querySelectorAll(".counter-value");
      counters.forEach((counter) => {
        const target = counter.getAttribute("data-target");
        if (target) {
          gsap.to(counter, {
            innerText: parseFloat(target),
            duration: 2,
            ease: "power1.out",
            snap: { innerText: target.includes(".") ? 0.1 : 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
            },
            onUpdate: function () {
              const value = parseFloat((this.targets()[0] as HTMLElement).innerText);
              (this.targets()[0] as HTMLElement).innerText = target.includes(".")
                ? value.toFixed(1)
                : Math.ceil(value).toString();
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-20">
      <div className="grid-bg absolute inset-0 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2 className="about-title section-title mb-8">
          About <span className="gradient-text">Me</span>
        </h2>

        <p className="about-description section-subtitle mb-16">
          {personalInfo.about}
        </p>

        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6">
          {personalInfo.stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card card p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <span className="counter-value" data-target={stat.value}>
                  0
                </span>
              </div>
              <div className="text-[#a0a0a0] text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
