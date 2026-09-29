import React from "react";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

export const PersonalMoment: React.FC = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] bg-[#0A0D14] overflow-hidden flex items-center justify-center select-none">
      {/* Background Full-width Heroic Athlete Photo */}
      <div className="absolute inset-0 z-0">
        <AuthenticPhoto
          photoKey="IMG_7934.JPG"
          alt="Nguyễn Chí Hải trên sân bóng"
          aspectRatio="custom"
          className="w-full h-full object-cover opacity-60 filter contrast-125"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/40 to-[#101010]" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/50 to-[#101010]" />
      </div>

      {/* Massive Editorial Marquee Ribbon */}
      <div className="relative z-10 w-full overflow-hidden py-8">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-12 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white/90 tracking-tighter drop-shadow-2xl">
            <span>FOOTBALL.</span>
            <span className="text-[#FF5A1F]">TECH.</span>
            <span>WORK.</span>
            <span className="text-[#3B82F6]">LIFE.</span>
            <span className="text-white/30">DISCIPLINE.</span>
            <span>FOOTBALL.</span>
            <span className="text-[#FF5A1F]">TECH.</span>
            <span>WORK.</span>
            <span className="text-[#3B82F6]">LIFE.</span>
          </div>
        </div>

        {/* Minimal Sub-caption */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase tracking-widest text-white/60">
          <span>“Kỷ luật thép trên sân cỏ — Sáng tạo không giới hạn với công nghệ.”</span>
          <span className="mt-2 sm:mt-0 text-[#FF5A1F]">#18 · GUN</span>
        </div>
      </div>
    </section>
  );
};
