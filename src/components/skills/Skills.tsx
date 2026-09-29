import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

interface SkillsProps {
  onExploreMore?: () => void;
}

export const Skills: React.FC<SkillsProps> = ({ onExploreMore }) => {
  const skillsList = [
    {
      num: "0 1",
      title: "FOOTBALL",
      photoKey: "IMG_7934.JPG",
      alt: "Kỹ năng bóng đá",
      items: [
        "Thi đấu",
        "Huấn luyện trẻ em",
        "Chiến thuật",
        "Tổ chức giải",
      ],
    },
    {
      num: "0 2",
      title: "TECHNOLOGY",
      photoKey: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
      alt: "Kỹ năng công nghệ",
      items: [
        "Web / App",
        "HTML · CSS · JavaScript",
        "Quản lý hệ thống",
        "AI & Công cụ số",
      ],
    },
    {
      num: "0 3",
      title: "SALES",
      photoKey: "hai_fpt_badge.jpg",
      alt: "Kỹ năng tư vấn bán hàng FPT",
      items: [
        "Tư vấn Internet",
        "FPT Play, Camera",
        "Chăm sóc khách hàng",
        "Giải pháp cho gia đình",
      ],
    },
    {
      num: "0 4",
      title: "CONTENT",
      photoKey: "IMG_3784.JPG",
      alt: "Kỹ năng làm content và sáng tạo",
      items: [
        "Quay dựng video",
        "Thiết kế hình ảnh",
        "Kể chuyện thương hiệu",
        "Chia sẻ trải nghiệm",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#0D0F17] text-[#F5F3EE]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-[#FF5A1F] uppercase block mb-2">
                02. KỸ NĂNG
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                Những gì
                <br />
                tôi làm tốt.
              </h2>
              <p className="mt-4 text-sm md:text-base text-neutral-400 font-light leading-relaxed">
                Kết hợp nhiều kỹ năng để tạo giá trị thực tế trong công việc và cuộc sống.
              </p>
            </div>

            {/* Circular Arrow Button matching mockup */}
            <div className="mt-8">
              <a
                href="#projects"
                className="w-12 h-12 rounded-full bg-[#FF5A1F] hover:bg-[#e04e18] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-[#FF5A1F]/30"
              >
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Vertical Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsList.map((skill, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-[#161A26] border border-white/10 hover:border-[#FF5A1F]/60 transition-all duration-300 flex flex-col h-[410px] justify-between shadow-xl"
              >
                {/* Photo Background with Dark Gradient */}
                <div className="absolute inset-0 z-0">
                  <AuthenticPhoto
                    photoKey={skill.photoKey}
                    alt={skill.alt}
                    aspectRatio="custom"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F17] via-[#0D0F17]/70 to-[#0D0F17]/40" />
                </div>

                {/* Card Top: Number and Skill Name */}
                <div className="relative z-10 p-5">
                  <span className="font-mono text-xs text-neutral-400 font-semibold block mb-1">
                    {skill.num}
                  </span>
                  <h3 className="font-display font-black text-xl text-white tracking-tight group-hover:text-[#FF5A1F] transition-colors">
                    {skill.title}
                  </h3>
                </div>

                {/* Card Bottom: Checkmarks */}
                <div className="relative z-10 p-5 space-y-2 border-t border-white/10 bg-black/50 backdrop-blur-md">
                  {skill.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-200">
                      <Check className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
