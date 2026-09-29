/**
 * Image Registry with IndexedDB & LocalStorage caching
 * Maps the 15 authentic user photos and provides instant batch import.
 */

export interface ImageMeta {
  key: string;
  title: string;
  category: "football" | "tech" | "award" | "life" | "education";
  caption: string;
  tags: string[];
  targetSection: string;
}

export const USER_IMAGES: Record<string, ImageMeta> = {
  "IMG_7934.JPG": {
    key: "IMG_7934.JPG",
    title: "Hải áo xanh #18 điều phối chiến thuật",
    category: "football",
    caption: "Băng đội trưởng vàng, ánh mắt tập trung điều phối toàn bộ đội hình",
    tags: ["Hero 3D", "Captain #18", "CLB FPT"],
    targetSection: "Hero 3D Parallax & Scene 01 Bóng Đá",
  },
  "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg": {
    key: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
    title: "Góc làm việc & Lập trình ManageFieldAPI",
    category: "tech",
    caption: "Màn hình kép lúc 00:47 — Swagger ManageFieldAPI & CapCut Video",
    tags: ["Technology", "Swagger API", "Scene 02"],
    targetSection: "Scene 02 Công Nghệ & Tech Project",
  },
  "IMG_9161.JPG": {
    key: "IMG_9161.JPG",
    title: "Lễ tốt nghiệp CNTT — FPT University",
    category: "education",
    caption: "Cử nhân Công nghệ Thông tin cùng thầy cô trên bục vinh danh",
    tags: ["Graduation", "FPT University", "Degree"],
    targetSection: "Scene 02 Card 3D chồng lấn",
  },
  "IMG_3784.JPG": {
    key: "IMG_3784.JPG",
    title: "Vua phá lưới VUG 10 Cần Thơ 2024",
    category: "award",
    caption: "Chứng nhận Vua phá lưới Giải Thể Thao Sinh Viên Việt Nam",
    tags: ["Top Scorer", "VUG 10", "Gold Trophy"],
    targetSection: "Scene 01 Thành tích & Content",
  },
  "IMG_3698.JPG": {
    key: "IMG_3698.JPG",
    title: "Đội trưởng ĐH FPT Cần Thơ — Áo Cam #18",
    category: "football",
    caption: "Hải mang băng đội trưởng số 18 màu cam trên sân thi đấu",
    tags: ["FPT University", "Captain #18"],
    targetSection: "Bóng đá & Thể thao",
  },
  "IMG_3712.JPG": {
    key: "IMG_3712.JPG",
    title: "Bắt tay giao lưu & Trọng tài trận đấu",
    category: "football",
    caption: "Tinh thần thể thao fair-play cùng trọng tài và đối thủ",
    tags: ["Fair Play", "Captain"],
    targetSection: "Project FPT Telecom & Hiện Tại",
  },
  "IMG_7935.JPG": {
    key: "IMG_7935.JPG",
    title: "Họp chiến thuật sa bàn dưới bóng cây",
    category: "football",
    caption: "Thầy trò quây quần trao đổi bảng sa bàn chiến thuật ngoài trời",
    tags: ["Tactics", "Coaching", "FPT Squad"],
    targetSection: "Scene 03 Huấn luyện viên",
  },
  "IMG_5663.JPG": {
    key: "IMG_5663.JPG",
    title: "Sân vận động An Giang — Tuyến trẻ chuyên nghiệp",
    category: "football",
    caption: "Đội hình trẻ áo xanh dàn hàng chào cờ trên mặt cỏ sân lớn",
    tags: ["CLB An Giang", "Pro Youth", "Stadium"],
    targetSection: "Scene 01 6+ Năm Chuyên Nghiệp",
  },
  "IMG_5664.JPG": {
    key: "IMG_5664.JPG",
    title: "Bứt tốc trên sân cỏ",
    category: "football",
    caption: "Hải (#18 áo xanh) trong pha tranh chấp tốc độ cao",
    tags: ["Sprint", "CLB An Giang"],
    targetSection: "Lịch sử thi đấu",
  },
  "IMG_5665.JPG": {
    key: "IMG_5665.JPG",
    title: "Khán đài vàng rực & Chào cờ",
    category: "football",
    caption: "Khoảnh khắc trang nghiêm trước giờ bóng lăn",
    tags: ["Stadium", "National Anthem"],
    targetSection: "Không khí sân khấu",
  },
  "IMG_5666.JPG": {
    key: "IMG_5666.JPG",
    title: "Huy chương Bạc Giải Milo Cup",
    category: "award",
    caption: "Nụ cười rạng rỡ của toàn đội cùng chiếc huy chương",
    tags: ["Milo Cup", "Silver Medal"],
    targetSection: "Scene 01 Kỷ niệm",
  },
  "IMG_7974.JPG": {
    key: "IMG_7974.JPG",
    title: "Cầu thủ ghi bàn thắng đầu tiên — Cúp ĐH Đồng Tháp 2025",
    category: "award",
    caption: "Nhận chứng nhận cá nhân giải bóng đá sinh viên mở rộng",
    tags: ["First Goal", "Award 2025"],
    targetSection: "Thành tích cá nhân",
  },
  "IMG_8067.HEIC": {
    key: "IMG_8067.jpg",
    title: "Bảng kế hoạch kỷ luật 4h30 sáng",
    category: "life",
    caption: "4h30 thức dậy, 8h học, 14h code, chiều ra sân, 'Assess A Day'",
    tags: ["Discipline", "Routine", "Assess A Day"],
    targetSection: "Scene 02 Kỷ luật & Content",
  },
  "IMG_8067.jpg": {
    key: "IMG_8067.jpg",
    title: "Bảng kế hoạch kỷ luật 4h30 sáng",
    category: "life",
    caption: "4h30 thức dậy, 8h học, 14h code, chiều ra sân, 'Assess A Day'",
    tags: ["Discipline", "Routine", "Assess A Day"],
    targetSection: "Scene 02 Kỷ luật & Content",
  },
  "hai_fpt_badge.jpg": {
    key: "hai_fpt_badge.jpg",
    title: "Nguyễn Chí Hải — Thẻ chuyên viên FPT",
    category: "tech",
    caption: "Chuyên viên tư vấn giải pháp viễn thông FPT Telecom Cần Thơ",
    tags: ["FPT Telecom", "Sales/CTV", "Chuyên viên"],
    targetSection: "Dự án FPT Telecom & Skills",
  },
  "hai_cinematic_hero.jpg": {
    key: "hai_cinematic_hero.jpg",
    title: "Nguyễn Chí Hải — Cầu thủ #18 điện ảnh",
    category: "football",
    caption: "Khoảnh khắc sân cỏ điện ảnh trong màu áo số 18",
    tags: ["Cinematic", "Captain #18", "Hero"],
    targetSection: "Section 1 Cinematic Showcase",
  },
  "IMG_9586.JPG": {
    key: "IMG_9586.JPG",
    title: "Đội hình trẻ áo trắng cùng Ban huấn luyện",
    category: "football",
    caption: "Đội bóng trên sân cỏ nhân tạo trước giờ tập luyện",
    tags: ["Squad", "Coaches"],
    targetSection: "Huấn luyện & Cộng đồng",
  },
  "IMG_9587.JPG": {
    key: "IMG_9587.JPG",
    title: "Thời niên thiếu khởi đầu — Áo Đỏ Sân Cỏ",
    category: "football",
    caption: "Những bước chạy đầu tiên trên thảm cỏ quê hương",
    tags: ["Childhood", "Beginnings"],
    targetSection: "Khởi nguồn đam mê",
  },
};

// In-memory cache
const memoryCache: Record<string, string> = {};

/**
 * Get stored image from memory or localStorage
 */
export function getStoredImageUrl(key: string): string | null {
  if (memoryCache[key]) return memoryCache[key];
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem(`custom_img_${key}`);
    if (val) {
      memoryCache[key] = val;
      return val;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveStoredImage(key: string, base64Url: string): void {
  memoryCache[key] = base64Url;
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`custom_img_${key}`, base64Url);
  } catch (e) {
    console.warn("LocalStorage full, stored in runtime memory", e);
  }
  window.dispatchEvent(new CustomEvent("hai_images_updated", { detail: { key, url: base64Url } }));
}

export function clearStoredImage(key: string): void {
  delete memoryCache[key];
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`custom_img_${key}`);
  } catch (e) {
    console.warn(e);
  }
  window.dispatchEvent(new CustomEvent("hai_images_updated", { detail: { key, url: null } }));
}

/**
 * Intelligent file matcher: matches user uploaded files to the 15 exact slots
 */
export function matchFileNameToKey(fileName: string): string | null {
  const lower = fileName.toLowerCase();
  
  if (lower.includes("7934")) return "IMG_7934.JPG";
  if (lower.includes("3698")) return "IMG_3698.JPG";
  if (lower.includes("3712")) return "IMG_3712.JPG";
  if (lower.includes("3784")) return "IMG_3784.JPG";
  if (lower.includes("5663")) return "IMG_5663.JPG";
  if (lower.includes("5664")) return "IMG_5664.JPG";
  if (lower.includes("5665")) return "IMG_5665.JPG";
  if (lower.includes("5666")) return "IMG_5666.JPG";
  if (lower.includes("7935")) return "IMG_7935.JPG";
  if (lower.includes("7974")) return "IMG_7974.JPG";
  if (lower.includes("8067")) return "IMG_8067.HEIC";
  if (lower.includes("9161")) return "IMG_9161.JPG";
  if (lower.includes("9586")) return "IMG_9586.JPG";
  if (lower.includes("9587")) return "IMG_9587.JPG";
  if (lower.includes("z4fa") || lower.includes("att.") || lower.includes("swagger") || lower.includes("code")) {
    return "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg";
  }

  // Exact match
  for (const k of Object.keys(USER_IMAGES)) {
    if (k.toLowerCase() === lower) return k;
  }

  return null;
}
