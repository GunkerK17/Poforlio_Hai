import React, { useState } from "react";
import { X, Send, CheckCircle2, User, Phone, MapPin, Calendar } from "lucide-react";
import { profileData } from "../../data/profile";

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [phone, setPhone] = useState("");
  const [courseType, setCourseType] = useState("Lớp bóng đá trẻ em (6 - 15 tuổi)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#141A29] text-[#F5F3EE] rounded-2xl overflow-hidden border border-white/15 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-[#FF5A1F] text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-bold block mb-1">
          TUYỂN SINH HỌC VIÊN BÓNG ĐÁ CẦN THƠ
        </span>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
          Đăng ký tập luyện bóng đá cùng HLV Hải
        </h3>
        <p className="text-xs text-neutral-300 mt-1 font-light leading-relaxed">
          Đào tạo kỹ thuật cơ bản đến nâng cao, rèn luyện thể lực và tư duy chiến thuật sân cỏ cho các em nhỏ & người đam mê bóng đá phong trào.
        </p>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-xl text-white">
              Đăng ký buổi tập thử thành công!
            </h4>
            <p className="text-xs text-neutral-300 mt-2 max-w-sm">
              Cảm ơn bạn. HLV Hải sẽ liên hệ qua số <strong>{phone}</strong> để xếp lịch kiểm tra thể lực và buổi tập thử miễn phí cho học viên <strong>{studentName}</strong>.
            </p>
            <div className="mt-6 flex flex-col gap-2 w-full">
              <a
                href={profileData.contact.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#0068FF] text-white font-bold text-xs uppercase tracking-wider text-center rounded-lg"
              >
                Nhắn Zalo trao đổi lịch tập ngay →
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-neutral-400 text-xs font-mono"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono uppercase text-neutral-400 mb-1">
                  Tên phụ huynh / Người đăng ký
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Họ tên phụ huynh"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-neutral-400 mb-1">
                  Tên học viên *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Tên bé hoặc học viên"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono uppercase text-neutral-400 mb-1">
                  Độ tuổi / Năm sinh *
                </label>
                <input
                  type="text"
                  required
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  placeholder="VD: 8 tuổi / 2016"
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
            </div>

            <div>
              <label className="block font-mono uppercase text-neutral-400 mb-1">
                Lớp học quan tâm
              </label>
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#18181b] border border-white/15 text-white rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
              >
                <option value="Lớp bóng đá trẻ em cơ bản (6 - 11 tuổi)">Lớp bóng đá trẻ em cơ bản (6 - 11 tuổi)</option>
                <option value="Lớp bóng đá thiếu niên nâng cao (12 - 16 tuổi)">Lớp bóng đá thiếu niên nâng cao (12 - 16 tuổi)</option>
                <option value="Huấn luyện 1:1 cá nhân kỹ thuật - thể lực">Huấn luyện 1:1 cá nhân kỹ thuật - thể lực</option>
                <option value="Tập luyện bóng đá phong trào / phủi Cần Thơ">Tập luyện bóng đá phong trào / phủi Cần Thơ</option>
              </select>
            </div>

            <div>
              <label className="block font-mono uppercase text-neutral-400 mb-1">
                Ghi chú thêm (khung giờ rảnh hoặc thể trạng)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="VD: Rảnh tối T3, T5, T7 hoặc cuối tuần..."
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 rounded-lg text-xs focus:outline-hidden focus:border-[#FF5A1F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-3"
            >
              <span>ĐĂNG KÝ HỌC THỬ MIỄN PHÍ</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
