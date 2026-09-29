import React, { useState, useEffect } from "react";
import {
  USER_IMAGES,
  getStoredImageUrl,
  saveStoredImage,
  clearStoredImage,
  matchFileNameToKey,
} from "../../utils/imageRegistry";
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileImage,
  Sparkles,
  RefreshCw,
  FolderSync,
} from "lucide-react";
import { AuthenticPhoto } from "./AuthenticPhoto";

interface BatchPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BatchPhotoModal: React.FC<BatchPhotoModalProps> = ({ isOpen, onClose }) => {
  const [loadedKeys, setLoadedKeys] = useState<Record<string, boolean>>({});
  const [matchingStatus, setMatchingStatus] = useState<string | null>(null);

  const checkStatus = () => {
    const status: Record<string, boolean> = {};
    Object.keys(USER_IMAGES).forEach((k) => {
      status[k] = !!getStoredImageUrl(k);
    });
    setLoadedKeys(status);
  };

  useEffect(() => {
    if (isOpen) checkStatus();

    const handleUpdate = () => checkStatus();
    window.addEventListener("hai_images_updated", handleUpdate);
    return () => window.removeEventListener("hai_images_updated", handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    let matchedCount = 0;
    const total = files.length;

    Array.from(files).forEach((file) => {
      const targetKey = matchFileNameToKey(file.name);
      if (targetKey) {
        matchedCount++;
        const reader = new FileReader();
        reader.onload = (e) => {
          const res = e.target?.result as string;
          if (res) {
            saveStoredImage(targetKey, res);
            setLoadedKeys((prev) => ({ ...prev, [targetKey]: true }));
          }
        };
        reader.readAsDataURL(file);
      }
    });

    setMatchingStatus(
      `Đã tự động nhận diện và gán thành công ${matchedCount}/${total} file ảnh vào các vị trí tương ứng!`
    );
    setTimeout(() => setMatchingStatus(null), 5000);
  };

  const loadedCount = Object.values(loadedKeys).filter(Boolean).length;
  const totalSlots = Object.keys(USER_IMAGES).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#141A29] text-[#F5F3EE] rounded-2xl overflow-hidden border border-white/15 p-6 sm:p-10 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-[#FF5A1F] text-white rounded-full transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF5A1F] uppercase tracking-wider font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Nạp ảnh thật của Nguyễn Chí Hải (15 Ảnh)</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Ghép ảnh thật vào toàn bộ Website
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1 max-w-2xl leading-relaxed">
            Trong môi trường AI Studio, các file ảnh bạn tải lên cửa sổ chat không tự động ghi vào ổ cứng mã nguồn. Bạn chỉ cần chọn các file ảnh từ máy, hệ thống sẽ tự động ghép tên file khớp 100% vào Hero 3D, Story, Projects và Danh hiệu!
          </p>
        </div>

        {/* Big Drag & Drop Zone */}
        <label className="group relative border-2 border-dashed border-[#FF5A1F]/60 hover:border-[#FF5A1F] bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/20 text-[#FF5A1F] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <span className="text-base sm:text-lg font-bold text-white block">
              Nhấn vào đây để chọn (hoặc kéo thả) cùng lúc tất cả các ảnh
            </span>
            <span className="text-xs text-neutral-400 font-mono block mt-1">
              Hỗ trợ: IMG_7934, IMG_9161, att.z4Fa..., IMG_3784, IMG_3698, IMG_5663, v.v. (JPG, PNG, HEIC)
            </span>
          </div>

          <span className="px-5 py-2 bg-[#FF5A1F] hover:bg-[#e04e18] text-white text-xs font-bold font-mono uppercase tracking-wider rounded transition-colors shadow-md">
            Chọn file từ thiết bị của bạn
          </span>

          <input
            type="file"
            multiple
            accept="image/*,.heic"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {matchingStatus && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{matchingStatus}</span>
          </div>
        )}

        {/* Progress status */}
        <div className="my-6 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Trạng thái hiện tại:</span>
            <strong className="text-[#FF5A1F] text-sm">
              {loadedCount}/{totalSlots} ảnh đã sẵn sàng
            </strong>
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <span>Đường dẫn thư mục tĩnh:</span>
            <code className="text-[#38BDF8] bg-black/40 px-2 py-0.5 rounded">public/images/</code>
          </div>
        </div>

        {/* Grid of 15 slots */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(USER_IMAGES).map(([key, meta]) => {
              const isLoaded = loadedKeys[key];

              return (
                <div
                  key={key}
                  className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    isLoaded
                      ? "bg-emerald-950/20 border-emerald-500/40"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-neutral-700 bg-black">
                    <AuthenticPhoto
                      photoKey={key}
                      aspectRatio="custom"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-[#FF5A1F] uppercase truncate">
                        {meta.category}
                      </span>
                      {isLoaded ? (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã nạp
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-500">
                          Chờ tải
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-white truncate mt-0.5">
                      {meta.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">
                      Vị trí: {meta.targetSection}
                    </p>

                    <label className="mt-1 inline-block text-[10px] font-mono text-[#38BDF8] hover:underline cursor-pointer">
                      Tải riêng ảnh này
                      <input
                        type="file"
                        accept="image/*,.heic"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const res = ev.target?.result as string;
                              if (res) {
                                saveStoredImage(key, res);
                                setLoadedKeys((prev) => ({ ...prev, [key]: true }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 font-light text-center sm:text-left">
            💡 Ảnh sau khi nạp sẽ hiển thị tức thì trên cả phiên bản máy tính và điện thoại.
          </p>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-white text-[#101010] font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Hoàn tất & Xem Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
