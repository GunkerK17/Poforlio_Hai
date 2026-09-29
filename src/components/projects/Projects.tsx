import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, UserPlus, PhoneCall, X } from "lucide-react";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

interface ProjectsProps {
  onOpenConsultation: (service: string) => void;
  onOpenStudentModal: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onOpenConsultation,
  onOpenStudentModal,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<number | null>(null);

  const projects = [
    {
      title: "FPT TELECOM",
      tag: "Business / Sales",
      subtitle: "Tư vấn giải pháp Internet & giải trí cho khách hàng cá nhân và gia đình.",
      photoKey: "hai_fpt_badge.jpg",
      alt: "FPT Telecom giải pháp viễn thông",
      ctaText: "Xem chi tiết",
      primaryActionLabel: "Nhận tư vấn cước phí →",
      primaryAction: () => onOpenConsultation("Gói cước Internet FPT Telecom"),
      details: [
        "Trực tiếp tư vấn giải pháp mạng Internet cáp quang băng thông không giới hạn Wi-Fi 6.",
        "Truyền hình bản quyền thể thao FPT Play xem trọn vẹn V-League, UEFA Champions League, FA Cup.",
        "Camera an ninh thông minh nhận diện khuôn mặt và cảnh báo chuyển động bằng AI.",
        "Hỗ trợ khảo sát hạ tầng, thi công nhanh trong ngày và chăm sóc sau bán hàng tận tâm.",
      ],
    },
    {
      title: "TRUNG TÂM BÓNG ĐÁ",
      tag: "Coaching 📍",
      subtitle: "Đào tạo bóng đá trẻ. Xây dựng môi trường phát triển & tuyển sinh học viên.",
      photoKey: "IMG_9586.JPG",
      alt: "Trung tâm đào tạo bóng đá trẻ em Cần Thơ",
      ctaText: "Xem chi tiết",
      highlightBadge: "ĐANG TUYỂN SINH",
      primaryActionLabel: "Đăng ký học thử miễn phí →",
      primaryAction: () => onOpenStudentModal(),
      details: [
        "Chiêu sinh các lớp bóng đá trẻ em (6 - 15 tuổi) và lớp bóng đá phong trào người lớn tại Cần Thơ.",
        "Giáo án huấn luyện bài bản từ cựu cầu thủ chuyên nghiệp CLB An Giang & Đội trưởng FPT.",
        "Rèn luyện kỹ thuật cá nhân (chuyền, sút, đỡ bước một), thể lực, kỷ luật và tinh thần đồng đội.",
        "Cơ hội tham gia các giải đấu giao lưu cọ xát định kỳ tại miền Tây.",
      ],
    },
    {
      title: "WEB / APP",
      tag: "Technology",
      subtitle: "Các sản phẩm web/app và hệ thống mình đang nghiên cứu, thiết kế và xây dựng.",
      photoKey: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
      alt: "Phát triển công nghệ ManageField & Web",
      ctaText: "Xem chi tiết",
      primaryActionLabel: "Trao đổi dự án công nghệ →",
      primaryAction: () => onOpenConsultation("Dự án Web/App Công nghệ"),
      details: [
        "Xây dựng hệ thống quản lý sân bóng, lịch đặt sân và thống kê giải đấu thể thao ManageField.",
        "Thiết kế website portfolio, landing page giới thiệu thương hiệu cá nhân và doanh nghiệp.",
        "Phát triển backend API chuẩn RESTful, tích hợp cơ sở dữ liệu và thanh toán tự động.",
        "Tối ưu trải nghiệm người dùng (UX/UI) theo chuẩn responsive mượt mà trên mọi thiết bị.",
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F5F3EE] text-[#101010]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#FF5A1F] uppercase block mb-2">
              03. DỰ ÁN / CÔNG VIỆC NỔI BẬT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#101010] tracking-tight">
              Những thứ mình đang xây dựng.
            </h2>
          </div>

          <a
            href="#products"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#FF5A1F] hover:text-[#e04e18] transition-colors self-start sm:self-end"
          >
            <span>Xem tất cả dự án</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Columns Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveModalProject(idx)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:border-[#FF5A1F]/50"
            >
              <div>
                {/* Photo container */}
                <div className="relative w-full h-56 bg-neutral-900 overflow-hidden">
                  <AuthenticPhoto
                    photoKey={item.photoKey}
                    alt={item.alt}
                    aspectRatio="custom"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill at bottom left of image matching mockup */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3.5 py-1 bg-black/85 backdrop-blur-md text-white font-mono text-[11px] font-bold rounded-md shadow-md tracking-wider">
                      {item.title}
                    </span>
                  </div>

                  {item.highlightBadge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 bg-[#FF5A1F] text-white font-mono text-[10px] font-bold rounded-full animate-pulse shadow-md">
                        {item.highlightBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="font-mono text-xs text-neutral-500 font-semibold block mb-1">
                    ({item.tag})
                  </span>
                  <p className="text-sm text-neutral-700 leading-relaxed font-light mt-1.5 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Link matching mockup */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-900 group-hover:text-[#FF5A1F] transition-colors flex items-center gap-1.5">
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>

                <span className="text-[11px] font-mono text-neutral-400">
                  #{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-[#141A29] text-white rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-[#FF5A1F] rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-[#FF5A1F] font-bold uppercase tracking-widest block mb-1">
              {projects[activeModalProject].tag}
            </span>
            <h3 className="font-display font-black text-3xl text-white">
              {projects[activeModalProject].title}
            </h3>
            <p className="text-xs text-neutral-300 font-light mt-1 mb-4">
              {projects[activeModalProject].subtitle}
            </p>

            <div className="rounded-xl overflow-hidden h-52 bg-black border border-white/10 mb-5">
              <AuthenticPhoto
                photoKey={projects[activeModalProject].photoKey}
                alt={projects[activeModalProject].alt}
                aspectRatio="custom"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2.5 text-xs text-neutral-300 font-light leading-relaxed mb-6">
              {projects[activeModalProject].details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const act = projects[activeModalProject].primaryAction;
                setActiveModalProject(null);
                act();
              }}
              className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer shadow-lg"
            >
              {projects[activeModalProject].primaryActionLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
