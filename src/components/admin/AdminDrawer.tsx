import React, { useState } from "react";
import { USER_IMAGES, saveStoredImage, clearStoredImage } from "../../utils/imageRegistry";
import { profileData } from "../../data/profile";
import { X, Upload, Trash2, Check, RefreshCw, Image as ImageIcon, Sliders } from "lucide-react";
import { AuthenticPhoto } from "../ui/AuthenticPhoto";

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"photos" | "profile">("photos");
  const [uploadSuccessKey, setUploadSuccessKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        saveStoredImage(key, result);
        setUploadSuccessKey(key);
        setTimeout(() => setUploadSuccessKey(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const photoEntries = Object.entries(USER_IMAGES);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-2xl bg-[#141416] text-[#F5F3EE] h-full flex flex-col shadow-2xl border-l border-neutral-800 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF5A1F] text-white rounded-lg">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Bảng Quản Trị & Ảnh Cá Nhân
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                15 Ảnh thực tế · Cập nhật trực tiếp lên Portfolio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 text-neutral-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex-1 py-3 text-center border-b-2 font-bold transition-colors ${
              activeTab === "photos"
                ? "border-[#FF5A1F] text-[#FF5A1F] bg-white/[0.02]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            15 Ảnh cá nhân ({photoEntries.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 text-center border-b-2 font-bold transition-colors ${
              activeTab === "profile"
                ? "border-[#FF5A1F] text-[#FF5A1F] bg-white/[0.02]"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Thông tin liên hệ & Thương hiệu
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "photos" ? (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                💡 <strong>Ghi chú:</strong> Bạn có thể chọn file ảnh từ máy của mình (như ảnh áo xanh #18, lễ tốt nghiệp, bằng khen Vua phá lưới) để thay thế tức thì cho từng vị trí hiển thị trên website.
              </div>

              <div className="grid grid-cols-1 gap-4">
                {photoEntries.map(([key, meta]) => {
                  const isSuccess = uploadSuccessKey === key;

                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-white/[0.03] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-700 bg-black">
                          <AuthenticPhoto
                            photoKey={key}
                            aspectRatio="custom"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase bg-[#FF5A1F]/20 text-[#FF5A1F] px-1.5 py-0.5 rounded">
                              {meta.category}
                            </span>
                            <span className="text-xs font-mono text-neutral-400 truncate max-w-[180px]">
                              {key}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1">
                            {meta.title}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                            {meta.caption}
                          </p>
                        </div>
                      </div>

                      {/* Upload / Clear Controls */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white text-xs font-mono rounded cursor-pointer transition-colors shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isSuccess ? "Đã lưu!" : "Chọn ảnh"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(key, file);
                            }}
                          />
                        </label>

                        <button
                          onClick={() => clearStoredImage(key)}
                          title="Đặt lại mặc định"
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-white/5 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-sm">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-neutral-800 space-y-3">
                <h4 className="font-bold text-white font-mono uppercase text-xs text-[#FF5A1F]">
                  Thông tin thương hiệu cá nhân
                </h4>
                <div>
                  <span className="text-xs text-neutral-400 block">Họ và tên:</span>
                  <span className="text-white font-medium">{profileData.name} ({profileData.nickname})</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Định vị:</span>
                  <span className="text-white font-medium">{profileData.role}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Đơn vị công tác:</span>
                  <span className="text-white font-medium">{profileData.currentCompany}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Học vấn:</span>
                  <span className="text-white font-medium">{profileData.university}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Kinh nghiệm bóng đá:</span>
                  <span className="text-white font-medium">{profileData.yearsInFootball} năm chuyên nghiệp tại {profileData.footballClub}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-neutral-800 space-y-3">
                <h4 className="font-bold text-white font-mono uppercase text-xs text-[#FF5A1F]">
                  Kênh liên hệ trực tiếp
                </h4>
                <div>
                  <span className="text-xs text-neutral-400 block">Số điện thoại / Hotline:</span>
                  <span className="text-white font-mono">{profileData.contact.phoneFormatted}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Zalo:</span>
                  <a href={profileData.contact.zaloUrl} target="_blank" rel="noreferrer" className="text-[#38BDF8] underline font-mono">
                    {profileData.contact.zaloUrl}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Email:</span>
                  <span className="text-white font-mono">{profileData.contact.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <a
            href="/gun-portfolio.zip"
            download="gun-portfolio.zip"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>📥 Tải toàn bộ mã nguồn (.ZIP)</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-white text-[#101010] font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
