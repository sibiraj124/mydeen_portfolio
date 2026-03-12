"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { personalInfo } from "@/data/portfolio";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter,
  FaPaperPlane, FaCheckCircle
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-left", { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-wrapper", start: "top 80%", toggleActions: "play none none reverse" }
        });
      gsap.fromTo(".contact-right", { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-wrapper", start: "top 80%", toggleActions: "play none none reverse" }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Form data:", data);
    setLoading(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-mono bg-[rgba(10,31,60,0.6)]`;
  const inputStyle = {
    border: "1px solid rgba(14,165,233,0.2)",
    color: "#e2e8f0",
    caretColor: "#0ea5e9",
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-tag mb-3">// get in touch</p>
          <h2 className="section-heading">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }} />
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. Drop a message below!
          </p>
        </div>

        <div className="contact-wrapper grid lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div className="contact-left flex flex-col gap-8">
            <div>
              <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#e2e8f0" }}>
                Ready to build something amazing?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="flex flex-col gap-4">
              {[
                { icon: FaEnvelope, label: "Email", value: personalInfo.email, color: "#0ea5e9" },
                { icon: FaPhone, label: "Phone", value: personalInfo.phone, color: "#06b6d4" },
                { icon: FaMapMarkerAlt, label: "Location", value: personalInfo.location, color: "#8b5cf6" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl card hover:border-[rgba(14,165,233,0.3)] group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: "#64748b" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono mb-4" style={{ color: "#64748b" }}>// Connect on social</p>
              <div className="flex gap-3">
                {[
                  { icon: FaGithub, href: personalInfo.github, label: "GitHub", color: "#e2e8f0" },
                  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn", color: "#0ea5e9" },
                  { icon: FaTwitter, href: personalInfo.twitter, label: "Twitter", color: "#06b6d4" },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                    style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", color }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className="text-sm" style={{ color: "#86efac" }}>
                Currently available for freelance projects & full-time roles
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            <div className="card p-8">
              <h3 className="font-heading font-bold text-lg mb-6" style={{ color: "#e2e8f0" }}>
                Send a Message
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FaCheckCircle size={48} className="text-green-400 mb-4" />
                  <h4 className="font-heading font-bold text-lg text-green-400 mb-2">Message Sent!</h4>
                  <p style={{ color: "#94a3b8" }}>Thank you! I&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  {/* Name & Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono mb-2 block" style={{ color: "#64748b" }}>Your Name *</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="John Doe"
                        className={inputClass}
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 15px rgba(14,165,233,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.name ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)"; e.target.style.boxShadow = "none"; }}
                      />
                      {errors.name && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-mono mb-2 block" style={{ color: "#64748b" }}>Email Address *</label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                        })}
                        placeholder="john@example.com"
                        type="email"
                        className={inputClass}
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 15px rgba(14,165,233,0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.email ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)"; e.target.style.boxShadow = "none"; }}
                      />
                      {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-xs font-mono mb-2 block" style={{ color: "#64748b" }}>Subject *</label>
                    <input
                      {...register("subject", { required: "Subject is required" })}
                      placeholder="Project Collaboration / Job Opportunity"
                      className={inputClass}
                      style={{
                        ...inputStyle,
                        borderColor: errors.subject ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 15px rgba(14,165,233,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.subject ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.subject && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono mb-2 block" style={{ color: "#64748b" }}>Message *</label>
                    <textarea
                      {...register("message", { required: "Message is required", minLength: { value: 20, message: "Message too short (min 20 chars)" } })}
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      className={inputClass}
                      style={{
                        ...inputStyle,
                        borderColor: errors.message ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)",
                        resize: "none",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.boxShadow = "0 0 15px rgba(14,165,233,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.message ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.message && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 mt-1"
                    style={{ opacity: loading ? 0.8 : 1 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
