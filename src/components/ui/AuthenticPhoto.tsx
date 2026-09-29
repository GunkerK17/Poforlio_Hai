import React, { useState, useEffect } from "react";
import { USER_IMAGES } from "../../utils/imageRegistry";

interface AuthenticPhotoProps {
  photoKey: string;
  alt?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "3/4" | "1/1" | "custom";
  objectFit?: "cover" | "contain";
  showMeta?: boolean;
  priority?: boolean;
  onClick?: () => void;
}

export const AuthenticPhoto: React.FC<AuthenticPhotoProps> = ({
  photoKey,
  alt,
  className = "",
  aspectRatio = "4/3",
  objectFit = "cover",
  showMeta = false,
  priority = false,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const meta = USER_IMAGES[photoKey];

  useEffect(() => {
    // Published images always come from the project.
    const resolvedKey = photoKey.endsWith(".HEIC") ? "IMG_8067.jpg" : photoKey;
    setImgSrc(`/images/${resolvedKey}`);
    setLoadFailed(false);


  }, [photoKey]);

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "3/4"
      ? "aspect-[3/4]"
      : aspectRatio === "1/1"
      ? "aspect-square"
      : "";

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden bg-[#18181B] text-[#F5F3EE] ${aspectClass} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Real Image Tag if not failed */}
      {!loadFailed && imgSrc && (
        <img
          src={imgSrc}
          alt={alt || meta?.title || photoKey}
          loading={priority ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          onError={() => setLoadFailed(true)}
          className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 ${
            objectFit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      )}

      {/* Styled Fallback Vector Artwork if real image file is not on local server yet */}
      {loadFailed && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-br from-[#18181b] via-[#121214] to-[#09090b]">
          {/* Subtle contextual SVG render based on photo key */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            {photoKey.includes("7934") || photoKey.includes("3698") ? (
              // Football pitch & floodlight lines
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <circle cx="200" cy="150" r="70" stroke="#FF5A1F" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="300" stroke="#F5F3EE" strokeWidth="1" />
                <rect x="20" y="20" width="360" height="260" stroke="#F5F3EE" strokeWidth="1" />
                <text x="200" y="165" fill="#FF5A1F" fontSize="48" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  18
                </text>
              </svg>
            ) : photoKey.includes("z4FaEGg355") ? (
              // Dual monitor & code lines
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <rect x="30" y="40" width="160" height="180" rx="8" stroke="#3B82F6" strokeWidth="2" />
                <rect x="210" y="40" width="160" height="180" rx="8" stroke="#F5F3EE" strokeWidth="2" />
                <line x1="50" y1="70" x2="160" y2="70" stroke="#3B82F6" strokeWidth="3" />
                <line x1="50" y1="90" x2="140" y2="90" stroke="#3B82F6" strokeWidth="2" />
                <line x1="50" y1="110" x2="120" y2="110" stroke="#3B82F6" strokeWidth="2" />
                <text x="200" y="270" fill="#3B82F6" fontSize="14" textAnchor="middle" fontFamily="monospace">
                  Swagger UI · ManageFieldAPI · 00:47
                </text>
              </svg>
            ) : photoKey.includes("9161") ? (
              // Graduation cap & FPT
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <polygon points="200,60 300,100 200,140 100,100" fill="#FF5A1F" fillOpacity="0.4" stroke="#FF5A1F" strokeWidth="2" />
                <text x="200" y="230" fill="#F5F3EE" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  FPT UNIVERSITY
                </text>
              </svg>
            ) : photoKey.includes("8067") ? (
              // Schedule board 4h30 AM
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <rect x="40" y="30" width="320" height="240" rx="4" stroke="#F5F3EE" strokeWidth="1" strokeDasharray="3 3" />
                <text x="60" y="70" fill="#FF5A1F" fontSize="16" fontFamily="monospace" fontWeight="bold">04:30 — WAKE UP & RUN</text>
                <text x="60" y="110" fill="#F5F3EE" fontSize="14" fontFamily="monospace">14:00 — CODE / MANAGEFIELD</text>
                <text x="60" y="150" fill="#F5F3EE" fontSize="14" fontFamily="monospace">17:00 — FOOTBALL PITCH</text>
                <text x="60" y="190" fill="#FF5A1F" fontSize="14" fontFamily="monospace">ASSESS A DAY</text>
              </svg>
            ) : (
              // Stadium aesthetic
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                <path d="M 0,220 Q 200,140 400,220" stroke="#FF5A1F" strokeWidth="2" />
                <circle cx="200" cy="90" r="40" fill="#FF5A1F" fillOpacity="0.15" />
              </svg>
            )}
          </div>

          {/* Top category label */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
              {meta?.category || "Photo"}
            </span>
            <span className="text-[10px] text-neutral-500">{photoKey}</span>
          </div>

          {/* Center Title & Context */}
          <div className="relative z-10 my-auto py-2">
            <div className="text-lg md:text-xl font-bold tracking-tight text-white font-display">
              {meta?.title || "Nguyễn Chí Hải"}
            </div>
            <p className="mt-1 text-xs text-neutral-300 line-clamp-2 max-w-sm">
              {meta?.caption || "Hình ảnh xác thực của Nguyễn Chí Hải"}
            </p>
          </div>

          {/* Bottom tags */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 font-mono">
            {meta?.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-neutral-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Subtle Grain & Ambient Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

      {/* Meta hover bar if enabled */}
      {showMeta && meta && (
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs font-mono uppercase tracking-wider text-[#FF5A1F]">
            {meta.category}
          </p>
          <p className="text-sm font-semibold">{meta.title}</p>
        </div>
      )}
    </div>
  );
};

