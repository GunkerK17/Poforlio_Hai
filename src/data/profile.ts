export interface ProfileData {
  name: string;
  nickname: string;
  birthDate: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  currentCompany: string;
  university: string;
  footballClub: string;
  yearsInFootball: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    zaloUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
    tiktokUrl: string;
    instagramUrl: string;
    email: string;
  };
  answers: {
    whoIsHai: string;
    whatDidHaiDo: string;
    whatSkillsHaiHas: string;
    whatIsHaiBuilding: string;
    whyContactHai: string;
  };
}

export const profileData: ProfileData = {
  name: "Nguyễn Chí Hải",
  nickname: "GUN",
  birthDate: "11/10/2003",
  role: "Footballer · Tech Developer · Business Consultant",
  tagline: "Football · Technology · Business · Content",
  bio: "Từng là cầu thủ chuyên nghiệp, tốt nghiệp ngành Kỹ thuật phần mềm tại Đại học FPT Cần Thơ. Sau những trải nghiệm và học hỏi, giờ mình làm kinh doanh và vẫn sống cùng bóng đá.",
  location: "Cần Thơ & Miền Tây, Việt Nam",
  currentCompany: "FPT Telecom Cần Thơ",
  university: "Đại học FPT Cần Thơ — Chuyên ngành Kỹ thuật Phần mềm / CNTT",
  footballClub: "CLB Bóng Đá An Giang",
  yearsInFootball: "06+",
  contact: {
    phone: "0764640415",
    phoneFormatted: "0764 640 415",
    zaloUrl: "https://zalo.me/0764640415",
    facebookUrl: "https://www.facebook.com/profile.php?id=61595076260244",
    youtubeUrl: "https://www.youtube.com/@KerGun-s4w",
    tiktokUrl: "https://www.tiktok.com/@gunker180",
    instagramUrl: "https://www.instagram.com/gunker_18/",
    email: "chihai11102003@gmail.com",
  },
  answers: {
    whoIsHai:
      "Nguyễn Chí Hải (GUN) — Chàng trai sinh năm 2003 tại miền Tây, kết hợp giữa tinh thần chiến đấu kỷ luật của cầu thủ chuyên nghiệp và tư duy logic của một kỹ sư công nghệ.",
    whatDidHaiDo:
      "Khoảng 6 năm thi đấu bóng đá chuyên nghiệp tại các tuyến trẻ CLB An Giang; Đội trưởng đội bóng ĐH FPT Cần Thơ; Đoạt danh hiệu Vua phá lưới VUG 10 Cần Thơ 2024; Tốt nghiệp Cử nhân CNTT ĐH FPT Cần Thơ.",
    whatSkillsHaiHas:
      "Tư duy bóng đá & Huấn luyện (Chiến thuật, Thể lực, Lãnh đạo); Lập trình phần mềm (React, TypeScript, Web App, RESTful API); Kinh doanh & Bán hàng (Giải pháp viễn thông FPT, Tư vấn khách hàng); Sáng tạo nội dung (CapCut, Xây dựng thương hiệu cá nhân).",
    whatIsHaiBuilding:
      "Đang phát triển giải pháp viễn thông tại FPT Telecom Cần Thơ; Huấn luyện các đội bóng sinh viên & phong trào; Xây dựng hệ thống quản lý thể thao ManageField và nền tảng số.",
    whyContactHai:
      "Lắp đặt Internet FPT, truyền hình FPT Play, Camera an ninh; Kết nối giao lưu, thi đấu hoặc huấn luyện bóng đá; Hợp tác triển khai dự án công nghệ và truyền thông số.",
  },
};

