import React, { useState } from "react";
import { profileData } from "../../data/profile";
import { ArrowUpRight, Phone, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

interface ContactProps {
  initialTopic?: string;
  onOpenConsultation?: () => void;
}

export const Contact: React.FC<ContactProps> = ({
  initialTopic,
  onOpenConsultation,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(initialTopic || "FPT Telecom / Lắp đặt Internet");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0A0C12] text-[#F5F3EE] overflow-hidden">
      {/* Sunset Stadium Turf Background with Warm Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C12] via-[#0A0C12]/80 to-[#0A0C12]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-[#FF5A1F]/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline matching mockup */}
          <div className="lg:col-span-4 z-20">
            <span className="font-mono text-xs font-bold tracking-widest text-[#FF5A1F] uppercase block mb-3">
              06. KẾT NỐI VỚI TÔI
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Cùng nói
              <br />
              chuyện nhé?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Cần tư vấn FPT, công việc, bóng đá, dự án hoặc đơn giản là kết nối.
            </p>
          </div>

          {/* Center Column: Silhouette of Hải (#10 GUN) with football looking to sunset */}
          <div className="lg:col-span-4 flex items-center justify-center relative min-h-[320px]">
            {/* Golden hour sun flare halo matching mockup */}
            <div className="absolute top-10 inset-x-0 mx-auto w-56 h-56 bg-[#FF5A1F]/30 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative w-64 h-84 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <AuthenticPhoto
                photoKey="IMG_3698.JPG"
                alt="Hải số 10 GUN"
                aspectRatio="custom"
                className="w-full h-full object-cover filter contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-0 text-center font-display font-black text-2xl text-white tracking-widest">
                GUN 10
              </div>
            </div>
          </div>

          {/* Right Column: Social Icons & Orange Pill Button matching mockup */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-6 z-20">
            {/* 4 Circular Social Icons: Facebook, TikTok, Zalo, YouTube */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href={profileData.contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                title="Facebook Nguyễn Chí Hải"
                className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg font-bold text-base"
              >
                f
              </a>

              {/* TikTok */}
              <a
                href={profileData.contact.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                title="TikTok Nguyễn Chí Hải"
                className="w-12 h-12 rounded-full bg-black text-white border border-white/20 flex items-center justify-center hover:scale-110 transition-transform shadow-lg font-mono text-xs font-bold"
              >
                TK
              </a>

              {/* Zalo */}
              <a
                href={profileData.contact.zaloUrl}
                target="_blank"
                rel="noreferrer"
                title="Zalo Nguyễn Chí Hải"
                className="w-12 h-12 rounded-full bg-[#0068FF] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg font-mono text-xs font-bold"
              >
                Zalo
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube Nguyễn Chí Hải"
                className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Main Action Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-sm tracking-wide rounded-full shadow-lg shadow-[#FF5A1F]/30 transition-all cursor-pointer"
            >
              <span>Kết nối với tôi</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fast Contact & Inquiry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#141A29] text-white rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-[#FF5A1F] rounded-full text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <span className="font-mono text-xs text-[#FF5A1F] font-bold uppercase tracking-widest block mb-1">
              TRỰC TIẾP TỪ NGUYỄN CHÍ HẢI
            </span>
            <h3 className="font-display font-black text-2xl text-white">
              Cùng kết nối và làm việc nhé!
            </h3>
            <p className="text-xs text-neutral-300 font-light mt-1 mb-4">
              Điền thông tin bên dưới hoặc liên hệ trực tiếp qua Zalo/Hotline: <strong className="text-white">{profileData.contact.phoneFormatted}</strong>
            </p>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-white">Đã gửi tin nhắn thành công!</h4>
                <p className="text-xs text-neutral-300 mt-1 max-w-xs">
                  Cảm ơn {name}. Hải sẽ liên hệ lại với bạn qua số <strong>{phone}</strong> trong vòng 15-30 phút.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setModalOpen(false);
                  }}
                  className="mt-6 px-6 py-2 bg-white text-[#101010] font-bold text-xs rounded-full uppercase"
                >
                  Xong
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-mono uppercase text-neutral-400 mb-1">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Anh Minh / Chị Linh"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-neutral-400 mb-1">
                    Số điện thoại / Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-neutral-400 mb-1">
                    Chủ đề trao đổi
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/15 text-white rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
                  >
                    <option value="FPT Telecom / Lắp đặt Internet cáp quang">Tư vấn lắp đặt Internet cáp quang FPT</option>
                    <option value="FPT Play / Gói xem thể thao bóng đá">Đăng ký xem thể thao bản quyền FPT Play</option>
                    <option value="Camera AI / An ninh thông minh">Lắp đặt Camera an ninh gia đình AI</option>
                    <option value="Đăng ký học viên bóng đá Cần Thơ">Đăng ký lớp bóng đá trẻ em / cá nhân</option>
                    <option value="Dự án Công nghệ & Phát triển Web">Hợp tác dự án Web / App công nghệ</option>
                    <option value="Kết nối & Giao lưu">Kết nối & Giao lưu cá nhân</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-neutral-400 mb-1">
                    Nội dung nhắn gửi thêm
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Địa chỉ lắp đặt hoặc khung giờ tiện liên hệ..."
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                >
                  <span>GỬI LỜI NHẮN NGAY</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
