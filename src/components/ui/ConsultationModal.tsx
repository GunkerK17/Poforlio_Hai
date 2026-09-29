import React, { useState } from "react";
import { profileData } from "../../data/profile";
import { X, Send, CheckCircle2, PhoneCall } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  productName = "Internet FPT",
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#141A29] text-[#F5F3EE] rounded-2xl overflow-hidden border border-white/15 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-[#FF5A1F] text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-bold block mb-1">
          TƯ VẤN DỊCH VỤ TRỰC TIẾP
        </span>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
          {productName}
        </h3>
        <p className="text-xs text-neutral-400 mt-1 font-light">
          Hải sẽ trực tiếp gọi điện tư vấn cước phí tốt nhất và kiểm tra hạ tầng tận nơi cho bạn.
        </p>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-xl text-white">
              Đã nhận yêu cầu tư vấn!
            </h4>
            <p className="text-xs text-neutral-300 mt-2 max-w-sm">
              Cảm ơn {name}. Hải sẽ liên hệ lại với bạn qua số <strong>{phone}</strong> trong vòng 15–30 phút.
            </p>
            <div className="mt-6 flex flex-col gap-2 w-full">
              <a
                href={profileData.contact.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#0068FF] text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Nhắn tin Zalo ngay với Hải →
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-neutral-400 text-xs font-mono"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Họ và tên của bạn *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-[#FF5A1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Số điện thoại liên hệ *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-[#FF5A1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                Khu vực lắp đặt (Quận/Huyện, Tỉnh)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="VD: Ninh Kiều, Cần Thơ hoặc địa phương của bạn"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-hidden focus:border-[#FF5A1F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-4"
            >
              <span>GỬI YÊU CẦU TƯ VẤN</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2 text-center">
              <a
                href={`tel:${profileData.contact.phone}`}
                className="text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FF5A1F]" />
                Hoặc gọi trực tiếp: <strong className="text-white">{profileData.contact.phoneFormatted}</strong>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
