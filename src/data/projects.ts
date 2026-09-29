export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  details: string[];
  image: string;
  client: string;
  year: string;
  deliverables: string[];
  ctaText: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "fpt-telecom",
    number: "01",
    title: "FPT TELECOM",
    category: "BUSINESS / SALES",
    tagline: "Hạ tầng kết nối & giải pháp công nghệ viễn thông",
    description: "Tư vấn giải pháp Internet & giải trí cho khách hàng cá nhân và gia đình.",
    details: [
      "Khảo sát thực tế mặt bằng, vị trí đặt modem Wi-Fi 6 để phủ sóng tối ưu mọi góc nhà.",
      "Tư vấn trọn gói Internet tốc độ cao kết hợp FPT Play truyền hình bản quyền và Camera an ninh AI.",
      "Hỗ trợ thủ tục đăng ký nhanh gọn trong ngày, trực tiếp theo dõi quá trình lắp đặt và hỗ trợ trọn đời.",
    ],
    image: "IMG_3712.JPG",
    client: "FPT Telecom Cần Thơ & Miền Tây",
    year: "2024 — Hiện tại",
    deliverables: ["Internet Wi-Fi 6", "Truyền hình FPT Play", "Camera Cloud AI"],
    ctaText: "Xem giải pháp viễn thông",
  },
  {
    id: "football-coaching",
    number: "02",
    title: "FOOTBALL COACHING",
    category: "COACHING",
    tagline: "Dẫn dắt thế hệ trẻ & văn hóa thể thao kỷ luật",
    description: "Huấn luyện bóng đá và tham gia các hoạt động bóng đá tại Cần Thơ.",
    details: [
      "Truyền tải bài học chiến thuật từ 6+ năm đào tạo tại CLB An Giang và kinh nghiệm dẫn dắt đội bóng FPT.",
      "Xây dựng giáo án rèn luyện thể lực, tư duy chọn vị trí và cách xử lý bóng trong không gian hẹp.",
      "Tổ chức các buổi giao hữu, giải đấu nội bộ nhằm kết nối sinh viên và cộng đồng đam mê túc cầu.",
    ],
    image: "IMG_7934.JPG",
    client: "CLB & Cộng đồng Thể thao Cần Thơ",
    year: "2023 — Hiện tại",
    deliverables: ["Huấn luyện chiến thuật", "Đào tạo kỹ thuật cá nhân", "Xây dựng tinh thần đồng đội"],
    ctaText: "Xem hoạt động huấn luyện",
  },
  {
    id: "sport-tech",
    number: "03",
    title: "TECH PROJECT",
    category: "TECHNOLOGY",
    tagline: "Số hóa thể thao và nền tảng quản lý thông minh",
    description: "Các sản phẩm web/app và hệ thống mình đang nghiên cứu, thiết kế và xây dựng.",
    details: [
      "Hệ thống ManageField: Nền tảng quản lý đặt sân bóng trực tuyến, quản lý lịch đấu và phân tích doanh thu.",
      "Tích hợp RESTful API với Swagger UI chuẩn mực, giao diện người dùng tối ưu trên thiết bị di động.",
      "Áp dụng React, TypeScript và các công cụ AI để rút ngắn thời gian phát triển và nâng cao trải nghiệm người dùng.",
    ],
    image: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
    client: "Personal Research & Development",
    year: "2024 — 2026",
    deliverables: ["React / TypeScript Web App", "RESTful API / Swagger Docs", "UI / UX Design System"],
    ctaText: "Xem chi tiết công nghệ",
  },
];
