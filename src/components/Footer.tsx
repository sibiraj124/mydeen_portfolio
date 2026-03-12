"use client";

import { personalInfo } from "@/data/portfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#ffffff1a] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-2">
              <span className="gradient-text">{personalInfo.name}</span>
            </div>
            <p className="text-sm text-[#a0a0a0]">{personalInfo.role}</p>
          </div>

          <div className="flex gap-6">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-[#ffffff33] flex items-center justify-center hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300"
              >
                <FaGithub />
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-[#ffffff33] flex items-center justify-center hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300"
              >
                <FaLinkedin />
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-10 h-10 rounded-full border-2 border-[#ffffff33] flex items-center justify-center hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#ffffff1a] text-center">
          <p className="text-sm text-[#a0a0a0] flex items-center justify-center gap-2">
            Made with <FaHeart className="text-red-500" /> by {personalInfo.fullName} © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
