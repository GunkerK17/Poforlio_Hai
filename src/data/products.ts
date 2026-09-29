export interface ProductItem {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  badge?: string;
  inquiryNote: string;
}

export const productsData: ProductItem[] = [
  {
    id: "fpt-internet",
    category: "INTERNET",
    name: "Internet FPT",
    tagline: "Cáp quang tốc độ cao · Trang bị modem Wi-Fi 6 thế hệ mới",
    description: "Đường truyền cáp quang ổn định tuyệt đối với công nghệ Wi-Fi 6 tiên tiến, giảm thiểu độ trễ, phục vụ trọn vẹn nhu cầu làm việc, học tập và giải trí không giới hạn.",
    features: [
      "Băng thông không giới hạn theo thiết bị",
      "Modem 2 băng tần Wi-Fi 6 phủ sóng xuyên tường",
      "Tối ưu ping cho game thủ và họp trực tuyến",
      "Lắp đặt thần tốc trong vòng 24–48h",
    ],
    bestFor: "Gia đình, streamer, dân IT và hộ kinh doanh cần đường truyền ổn định 24/7.",
    inquiryNote: "Hải sẽ trực tiếp kiểm tra hạ tầng tại địa chỉ của bạn để tư vấn gói cước phù hợp nhất.",
  },
  {
    id: "fpt-play",
    category: "ENTERTAINMENT",
    name: "FPT Play",
    tagline: "Truyền hình bản quyền · Thể thao đỉnh cao & phim chiếu rạp",
    description: "Trải nghiệm giải trí đỉnh cao trên mọi thiết bị: Smart TV, điện thoại, máy tính bảng với bản quyền trọn vẹn cúp Châu Âu, V-League và hàng ngàn tựa phim điện ảnh.",
    features: [
      "Độc quyền Cúp C1, C2, C3 Châu Âu & V-League",
      "Gần 200 kênh truyền hình trong nước & quốc tế",
      "Xem cùng lúc trên nhiều thiết bị tiện lợi",
      "Giao diện trực quan, dễ dàng thao tác cho mọi lứa tuổi",
    ],
    bestFor: "Tín đồ thể thao cuồng nhiệt và các gia đình yêu thích phim điện ảnh chất lượng cao.",
    inquiryNote: "Có thể kích hoạt dùng ngay trên Smart TV hoặc trang bị Box điều khiển giọng nói.",
  },
  {
    id: "fpt-camera",
    category: "SECURITY",
    name: "Camera FPT",
    tagline: "Camera an ninh thông minh AI · Lưu trữ bảo mật Cloud",
    description: "Giải pháp giám sát an ninh hàng đầu ứng dụng trí tuệ nhân tạo AI để phân biệt người và vật thể, lưu trữ trên nền tảng đám mây FPT Cloud an toàn dữ liệu 100%.",
    features: [
      "Nhận diện chuyển động người thông minh bằng AI",
      "Hình ảnh Full HD 1080p sắc nét ngay cả ban đêm",
      "Lưu trữ đám mây Cloud tại Việt Nam, không lo mất dữ liệu thẻ nhớ",
      "Đàm thoại 2 chiều và kháng nước chuẩn IP66",
    ],
    bestFor: "Gia đình có con nhỏ, người lớn tuổi hoặc cửa hàng kinh doanh cần quan sát từ xa.",
    inquiryNote: "Được hỗ trợ bảo hành và bảo trì trọn đời thiết bị trong suốt thời gian sử dụng dịch vụ.",
  },
];
