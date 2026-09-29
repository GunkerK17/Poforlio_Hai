import React from "react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profileData } from "../../data/profile";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

interface HeroProps {
  onExplore: () => void;
  onConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onConnect }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#0B0D13] text-[#F5F3EE] flex flex-col justify-between pt-24 md:pt-28 pb-6 overflow-hidden">
      {/* Background Stadium Glow & Warm Sunset Turf Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#FF5A1F]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#0B0D13] via-[#0B0D13]/90 to-transparent" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 z-20">
            {/* Category tag */}
            <p className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-semibold mb-4">
              FOOTBALL · TECHNOLOGY · BUSINESS · LIFE
            </p>

            {/* Giant Editorial Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[1.05] text-white">
              Xin chào,
              <br />
              mình là <span className="text-[#FF5A1F]">Hải.</span>
            </h1>

            {/* Subtext Statement */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-lg">
              Từng là cầu thủ chuyên nghiệp.
              <br />
              Giờ mình làm việc với công nghệ, kinh doanh và vẫn sống cùng bóng đá.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs sm:text-sm tracking-wide rounded-full shadow-lg shadow-[#FF5A1F]/30 transition-all cursor-pointer"
              >
                <span>Khám phá hành trình</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onConnect}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-black/40 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <span>Kết nối với tôi</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Layered Cinematic Composition Matching Mockup */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[460px] md:min-h-[580px]">
            {/* Script Text: "Play / Learn / Build a Better Me" */}
            <div className="absolute top-2 left-2 md:left-8 z-20 pointer-events-none transform -rotate-6 select-none">
              <span className="font-script text-3xl md:text-4xl text-white/90 drop-shadow-lg tracking-wide leading-tight block">
                Play
                <br />
                <span className="text-[#FF5A1F] text-2xl md:text-3xl">Learn</span>
                <br />
                Build
                <br />
                <span className="text-sm md:text-base font-script text-neutral-300">
                  a Better Me
                </span>
              </span>
            </div>

            {/* Background Floating Card 1: Black Jersey #10 GUN */}
            <div className="absolute top-8 left-16 md:left-24 w-36 sm:w-44 h-48 sm:h-56 rounded-xl overflow-hidden shadow-2xl border border-white/15 rotate-[-8deg] z-10 hidden sm:block bg-[#111]">
              <AuthenticPhoto
                photoKey="IMG_3698.JPG"
                alt="GUN số 10"
                aspectRatio="custom"
                className="w-full h-full object-cover filter contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-2.5">
                <span className="font-display font-black text-xl text-white text-center">GUN 10</span>
              </div>
            </div>

            {/* Background Floating Card 2: Red Graduation FPT University */}
            <div className="absolute top-0 right-0 sm:right-6 w-44 sm:w-52 h-56 sm:h-64 rounded-xl overflow-hidden shadow-2xl border border-white/15 rotate-[6deg] z-10 bg-[#8B0000]">
              <AuthenticPhoto
                photoKey="IMG_9161.JPG"
                alt="Lễ tốt nghiệp FPT University"
                aspectRatio="custom"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 inset-x-0 text-center font-display font-black text-[11px] text-white tracking-widest uppercase bg-[#FF5A1F]/90 py-1">
                LỄ TỐT NGHIỆP · NGUYỄN CHÍ HẢI
              </div>
            </div>

            {/* Background Floating Card 3: Laptop Coding Monitor 08:47 */}
            <div className="absolute bottom-4 right-0 sm:right-4 w-52 sm:w-64 h-36 sm:h-44 rounded-xl overflow-hidden shadow-2xl border border-white/15 rotate-[-4deg] z-10 bg-[#0F172A]">
              <AuthenticPhoto
                photoKey="att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg"
                alt="Coding Workstation"
                aspectRatio="custom"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 rounded font-mono text-xs font-bold text-[#FF5A1F] border border-white/10">
                08:47 AM
              </div>
            </div>

            {/* Foreground Main Figure: Hải in Blue Jersey (#18/#10) */}
            <div className="relative z-30 w-[65vw] sm:w-[48vw] lg:w-[380px] max-w-[420px] h-[480px] sm:h-[560px] flex items-end justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                <AuthenticPhoto
                  photoKey="IMG_7934.JPG"
                  alt="Nguyễn Chí Hải #18"
                  aspectRatio="custom"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Overlaid number #10 / #18 badge */}
                <div className="absolute bottom-6 left-6 font-display font-black text-6xl text-white/90 drop-shadow-lg">
                  10
                </div>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0D13] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credential Status Bar (Matching Bottom Row of Mockup) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="py-4 px-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-neutral-300">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF5A1F]" />
            <span className="font-semibold text-white">Cần Thơ, Việt Nam</span>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-white/10" />

          {/* 6+ năm thi đấu */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-[#FF5A1F] shrink-0 bg-neutral-800">
              <AuthenticPhoto photoKey="IMG_5663.JPG" aspectRatio="1/1" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-white">6+ năm</span>
              <span className="text-neutral-400 ml-1">thi đấu chuyên nghiệp</span>
            </div>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-white/10" />

          {/* FPT University Cần Thơ */}
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-[#FF5A1F] text-white font-mono text-[10px] font-bold">
              FPT
            </span>
            <div>
              <span className="font-bold text-white">FPT University</span>
              <span className="text-neutral-400 ml-1">Cần Thơ</span>
            </div>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-white/10" />

          {/* FPT Telecom */}
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold">
              FPT
            </span>
            <div>
              <span className="font-bold text-white">FPT Telecom</span>
              <span className="text-neutral-400 ml-1">Sales/CTV</span>
            </div>
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-white/10" />

          {/* HLV bóng đá */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="font-bold text-white">HLV bóng đá</span>
              <span className="text-neutral-400 ml-1">Trẻ em & Phủi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
