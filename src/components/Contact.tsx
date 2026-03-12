"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolio";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLOptionElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animations
      gsap.fromTo(".contact-label",
        { y: -50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-label", start: "top 85%" }
        }
      );

      gsap.fromTo(".contact-title",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 80%" }
        }
      );

      gsap.fromTo(".contact-description",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-description", start: "top 80%" }
        }
      );

      // Contact info cards slide in from left
      gsap.fromTo(".contact-info-card",
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 75%" }
        }
      );

      // Form slides in from right
      gsap.fromTo(".contact-form",
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 75%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "#00d4ff"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "#8b5cf6"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: personalInfo.location,
      href: null,
      color: "#ec4899"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative">
      <div className="grid-bg opacity-30" />
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="contact-label section-label">Contact</span>
          <h2 className="contact-title section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="contact-description section-description">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="contact-info space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              const wrapperProps = info.href ? { href: info.href } : {};
              
              return (
                <Wrapper
                  key={index}
                  {...wrapperProps}
                  className="contact-info-card card p-6 flex items-center gap-5 group cursor-pointer"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      background: `${info.color}15`,
                      border: `1px solid ${info.color}30`
                    }}
                  >
                    <Icon className="text-xl" style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)] mb-1">{info.label}</p>
                    <p className="font-medium text-[var(--text-primary)] group-hover:text-[#00d4ff] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}

            {/* Additional CTA */}
            <div className="card p-6 bg-gradient-to-br from-[#00d4ff]/10 to-[#8b5cf6]/10 border-[#00d4ff]/20">
              <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">
                Let&apos;s Work Together
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                I&apos;m currently available for freelance work and full-time opportunities.
              </p>
              <div className="flex items-center gap-2 text-[#00d4ff]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]"></span>
                </span>
                <span className="text-sm font-medium">Available for hire</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form card p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)]">
              Send a Message
            </h3>

            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="form-label">Message</label>
                <textarea
                  {...register("message", { 
                    required: "Message is required",
                    minLength: { value: 10, message: "Message must be at least 10 characters" }
                  })}
                  className={`form-input form-textarea ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell me about your project..."
                  rows={5}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full py-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <FaCheck />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-green-500 text-sm text-center">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
