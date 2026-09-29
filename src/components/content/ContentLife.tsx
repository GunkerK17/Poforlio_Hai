import React, { useState } from "react";
import { Play, ArrowRight, Eye, X, Calendar, Clock } from "lucide-react";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

export const ContentLife: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  const filters = [
    { id: "all", label: "Tất cả" },
    { id: "football", label: "Bóng đá" },
    { id: "tech", label: "Công nghệ" },
    { id: "work", label: "Công việc" },
    { id: "life", label: "Cuộc sống" },
  ];

  const videos = [
    {
      id: 1,
      category: "football",
      title: "Một ngày tập luyện cùng các em nhỏ",
      views: "12.5K",
      date: "Tháng 8, 2024",
      duration: "02:45",
      photoKey: "IMG_9586.JPG",
      alt: "Tập luyện cùng học viên nhí",
      summary:
        "Ghi lại buổi rèn luyện kỹ thuật sút bóng và tư duy di chuyển không bóng cho các em học viên tại sân bóng Cần Thơ. Niềm vui thuần khiết khi nhìn các em tiến bộ từng ngày.",
    },
    {
      id: 2,
      category: "tech",
      title: "Chia sẻ về công nghệ",
      views: "9.2K",
      date: "Tháng 9, 2024",
      duration: "03:15",
      photoKey: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
      alt: "Chia sẻ code và hệ thống",
      summary:
        "Từ một vận động viên bóng đá chuyên nghiệp bước vào thế giới IT: Cách mình tư duy về logic lập trình, xây dựng API ManageField và quản trị thời gian kỷ luật 4h30 sáng.",
    },
    {
      id: 3,
      category: "work",
      title: "Đời sống & công việc",
      views: "15.1K",
      date: "Tháng 7, 2024",
      duration: "01:50",
      photoKey: "IMG_3712.JPG",
      alt: "Công việc và cuộc sống",
      summary:
        "Một ngày đi thị trường và tư vấn giải pháp viễn thông tại miền Tây. Cách lắng nghe nhu cầu thật sự của khách hàng và tinh thần trách nhiệm trong công việc.",
    },
    {
      id: 4,
      category: "football",
      title: "Khoảnh khắc sân cỏ",
      views: "18.4K",
      date: "Tháng 5, 2024",
      duration: "02:20",
      photoKey: "IMG_5663.JPG",
      alt: "Khoảnh khắc sân cỏ VUG",
      summary:
        "Những pha bóng tốc độ, những đường chuyền quyết định và bàn thắng giúp đội bóng ĐH FPT Cần Thơ tiến sâu tại VUG 10. Kỷ niệm đáng nhớ của tuổi thanh xuân.",
    },
  ];

  const filteredVideos =
    activeFilter === "all"
      ? videos
      : videos.filter((v) => v.category === activeFilter);

  return (
    <section id="content" className="py-20 md:py-28 bg-[#F5F3EE] text-[#101010]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#FF5A1F] uppercase block mb-2">
              05. CONTENT / LIFE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#101010] tracking-tight">
              Những khoảnh khắc đáng nhớ.
            </h2>
            <p className="mt-2 text-sm md:text-base text-neutral-600 font-light">
              Chia sẻ về bóng đá, công nghệ, công việc và cuộc sống hàng ngày.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#FF5A1F] hover:text-[#e04e18] transition-colors self-start sm:self-end"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Filter Tabs matching mockup */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === f.id
                  ? "bg-[#FF5A1F] text-white shadow-md font-bold"
                  : "bg-white text-neutral-600 hover:text-[#101010] border border-neutral-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 4 Video Cards Row matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-[#FF5A1F]/40 flex flex-col justify-between"
            >
              <div>
                {/* Video Thumbnail with Play Button */}
                <div className="relative w-full h-44 bg-neutral-900 overflow-hidden">
                  <AuthenticPhoto
                    photoKey={video.photoKey}
                    alt={video.alt}
                    aspectRatio="custom"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

                  {/* Play Button matching mockup */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF5A1F] transition-all shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Views count on bottom-left */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white text-[11px] font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    <Play className="w-3 h-3 fill-current text-[#FF5A1F]" />
                    <span>{video.views}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm text-[#101010] group-hover:text-[#FF5A1F] transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                </div>
              </div>

              {/* Read/Watch More */}
              <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-100">
                <span>{video.date}</span>
                <span className="text-[#FF5A1F] font-semibold group-hover:underline">
                  Xem video →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#141A29] text-white rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-[#FF5A1F] rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-1 bg-[#FF5A1F] text-white font-mono text-xs font-bold rounded">
              VIDEO NỔI BẬT · {activeVideo.views} LƯỢT XEM
            </span>

            <h3 className="font-display font-black text-2xl text-white mt-3 leading-snug">
              {activeVideo.title}
            </h3>

            {/* Video preview container */}
            <div className="relative rounded-xl overflow-hidden h-64 bg-black border border-white/10 my-4 flex items-center justify-center">
              <AuthenticPhoto
                photoKey={activeVideo.photoKey}
                alt={activeVideo.alt}
                aspectRatio="custom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-xs font-mono text-neutral-300">
                  Thời lượng: {activeVideo.duration}
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {activeVideo.summary}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveVideo(null)}
                className="px-6 py-2.5 bg-white text-[#101010] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
