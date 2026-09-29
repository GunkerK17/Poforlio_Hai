export interface ContentItem {
  id: string;
  category: "all" | "football" | "tech" | "work" | "life";
  categoryLabel: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
  videoPlaceholderUrl?: string;
  highlight?: boolean;
  contentBody: string[];
}

export const contentItems: ContentItem[] = [
  {
    id: "discipline-routine",
    category: "life",
    categoryLabel: "Cuộc sống",
    title: "Kỷ luật 4h30 sáng: Từ phòng tập đến dòng code lúc nửa đêm",
    summary: "Nhìn lại tấm bảng thời gian biểu: 4h30 thức dậy, 8h học, 14h code, chiều ra sân và đêm lại ngồi trước màn hình. Thói quen tạo nên số phận.",
    date: "Tháng 03, 2026",
    readTime: "3 phút đọc",
    image: "IMG_8067.HEIC",
    highlight: true,
    contentBody: [
      "Nhiều người hỏi mình: vừa đá bóng, vừa đi làm công nghệ và kinh doanh thì thời gian đâu để ngủ? Thật ra bí quyết không nằm ở việc ngủ ít, mà là quản trị sự tập trung.",
      "Từ những năm tháng ở lò đào tạo An Giang, việc phải thức dậy từ tờ mờ sáng để chạy bền dưới sương đã dạy mình một điều: động lực chỉ là nhất thời, kỷ luật mới là thứ giữ đôi chân bước tiếp khi mệt mỏi.",
      "Khi chuyển hướng sang công nghệ thông tin tại FPT University, mình áp dụng đúng tinh thần đó vào việc học lập trình: mỗi ngày dành ít nhất 4–6 tiếng ngồi giải quyết bug và làm project.",
    ],
  },
  {
    id: "vug-top-scorer",
    category: "football",
    categoryLabel: "Bóng đá",
    title: "Khoảnh khắc Vua phá lưới VUG 10: Chiếc băng đội trưởng và lòng tin",
    summary: "Đằng sau danh hiệu cá nhân là mồ hôi của cả tập thể Đại học FPT Cần Thơ. Đứng trước khung thành, điều quyết định không chỉ là kỹ năng mà là sự bình tĩnh.",
    date: "Mùa giải 2024",
    readTime: "4 phút đọc",
    image: "IMG_3784.JPG",
    highlight: false,
    contentBody: [
      "VUG luôn là giải đấu có tính cạnh tranh khốc liệt nhất của đời sinh viên. Với chiếc băng đội trưởng trên tay, áp lực không chỉ là ghi bàn, mà là vực dậy tinh thần anh em khi bị dẫn bàn.",
      "Trận chung kết khu vực, khi tiếng còi kết thúc vang lên và nghe xướng tên 'Vua phá lưới', mình chỉ muốn ôm lấy tất cả đồng đội và ban huấn luyện.",
    ],
  },
  {
    id: "coding-swagger-system",
    category: "tech",
    categoryLabel: "Công nghệ",
    title: "Xây dựng hệ thống ManageField: Khi tình yêu bóng đá gặp công nghệ",
    summary: "Tại sao quản lý sân bóng phong trào ở Việt Nam vẫn còn phụ thuộc vào sổ tay và tin nhắn Zalo rời rạc? Mình bắt tay vào viết API và giải quyết bài toán này.",
    date: "Dự án 2025",
    readTime: "5 phút đọc",
    image: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
    highlight: false,
    contentBody: [
      "Là người vừa trực tiếp đá bóng vừa đi thuê sân hàng tuần, mình thấu hiểu nỗi khổ của các chủ sân khi trùng giờ, mất cọc hoặc tính tiền nhầm.",
      "ManageFieldAPI được thiết kế chuẩn RESTful với Swagger documentation rõ ràng, giúp kết nối người chơi và chủ sân một cách liền mạch chỉ với vài thao tác chạm.",
    ],
  },
  {
    id: "fpt-graduation-milestone",
    category: "work",
    categoryLabel: "Công việc",
    title: "Tốt nghiệp FPT University: Khép lại giảng đường, mở ra đường đua lớn",
    summary: "Cầm tấm bằng Cử nhân Công nghệ Thông tin trên tay với chiếc kính râm phong cách. Một cột mốc đáng nhớ sau 4 năm nỗ lực không ngừng nghỉ.",
    date: "Tốt nghiệp 2025",
    readTime: "3 phút đọc",
    image: "IMG_9161.JPG",
    highlight: false,
    contentBody: [
      "Khoảnh khắc bước lên bục nhận bằng tốt nghiệp là lúc mình cảm ơn gia đình, thầy cô và chính bản thân đã không bỏ cuộc giữa chừng.",
      "Giờ đây, bước chân vào FPT Telecom và các dự án mới, hành trình thật sự mới chỉ bắt đầu!",
    ],
  },
];
