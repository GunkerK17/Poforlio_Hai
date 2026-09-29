import React from "react";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Trang chủ", href: "#" },
    { label: "Về tôi", href: "#story" },
    { label: "Kỹ năng", href: "#skills" },
    { label: "Dự án", href: "#projects" },
    { label: "Sản phẩm & Dịch vụ", href: "#products" },
    { label: "Content", href: "#content" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <footer className="bg-[#08090D] text-[#F5F3EE] py-12 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Left */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-black text-2xl md:text-3xl text-white tracking-wider">
            GUN
          </span>
          <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase mt-0.5">
            FOOTBALL · TECH · LIFE
          </span>
        </div>

        {/* Center Links */}
        <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#FF5A1F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Info & Scroll to Top */}
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="text-center md:text-right">
            <span>© {new Date().getFullYear()} Gun. All rights reserved.</span>
            <br />
            <span className="text-[11px] text-neutral-400">
              Made with <span className="text-red-500">❤️</span> in Cần Thơ.
            </span>
          </div>

          {/* Circular Scroll Up button matching mockup */}
          <button
            onClick={scrollToTop}
            title="Về đầu trang"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF5A1F] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
