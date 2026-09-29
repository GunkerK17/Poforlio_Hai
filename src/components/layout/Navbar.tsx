import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, SlidersHorizontal, Image as ImageIcon } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  onOpenPhotoBatch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenAdmin,
  onOpenPhotoBatch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0d12]/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10"
            : "bg-gradient-to-b from-black/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo Mark */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display font-black text-2xl md:text-3xl text-white tracking-wider">
              GUN
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-neutral-300">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors py-1 ${
                  idx === 0
                    ? "text-[#FF5A1F] font-semibold"
                    : "hover:text-[#FF5A1F] text-neutral-300"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Quick Photo Upload Trigger */}
            <button
              onClick={onOpenPhotoBatch}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-full transition-colors cursor-pointer border border-white/15"
              title="Nạp 15 ảnh thật từ máy"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Nạp 15 ảnh</span>
            </button>

            {/* Admin drawer */}
            <button
              onClick={onOpenAdmin}
              title="Quản lý"
              className="p-2 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Direct Connect Action (Orange Pill Button matching mockup) */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white text-xs font-bold rounded-full shadow-lg shadow-[#FF5A1F]/25 transition-all duration-300 cursor-pointer"
            >
              <span>Kết nối với tôi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d0f17] text-white flex flex-col justify-between p-8 pt-28 lg:hidden">
          <div className="flex flex-col gap-5 text-xl font-display font-bold">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#FF5A1F] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPhotoBatch();
              }}
              className="w-full py-3 bg-white/10 border border-white/20 text-white font-mono text-xs uppercase rounded-full"
            >
              📸 Nạp 15 ảnh thật của Hải
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 bg-[#FF5A1F] text-white font-bold text-center text-sm rounded-full"
            >
              Kết nối với tôi →
            </button>
          </div>
        </div>
      )}
    </>
  );
};
