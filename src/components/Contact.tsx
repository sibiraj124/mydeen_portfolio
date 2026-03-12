"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLSectionElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-info",
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-content", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".contact-cta",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".contact-cta", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen flex items-center py-20">
      <div className="grid-bg absolute inset-0 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <h2 className="contact-title section-title mb-8">
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <p className="section-subtitle mb-16">
          Let&apos;s build something amazing together
        </p>

        <div className="contact-content max-w-2xl mx-auto">
          <div className="space-y-6 mb-12">
            <div className="contact-info card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00d9ff20] border-2 border-[#00d9ff] flex items-center justify-center">
                <FaEnvelope className="text-[#00d9ff]" />
              </div>
              <div>
                <div className="text-sm text-[#a0a0a0]">Email</div>
                <div className="font-medium">{personalInfo.email}</div>
              </div>
            </div>

            <div className="contact-info card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00d9ff20] border-2 border-[#00d9ff] flex items-center justify-center">
                <FaPhone className="text-[#00d9ff]" />
              </div>
              <div>
                <div className="text-sm text-[#a0a0a0]">Phone</div>
                <div className="font-medium">{personalInfo.phone}</div>
              </div>
            </div>

            <div className="contact-info card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00d9ff20] border-2 border-[#00d9ff] flex items-center justify-center">
                <FaMapMarkerAlt className="text-[#00d9ff]" />
              </div>
              <div>
                <div className="text-sm text-[#a0a0a0]">Location</div>
                <div className="font-medium">{personalInfo.location}</div>
              </div>
            </div>
          </div>

          <div className="contact-cta text-center">
            <a href={`mailto:${personalInfo.email}`} className="btn-primary px-12 py-4 text-lg inline-block">
              Send Me a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
