export interface StoryScene {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  quote: string;
  highlightNumber?: string;
  highlightLabel?: string;
  primaryImage: string;
  secondaryImage?: string;
  meta: string[];
}

export const storyData: StoryScene[] = [
  {
    id: "football",
    chapter: "01",
    title: "BÓNG ĐÁ.",
    subtitle: "Khởi đầu từ khát khao và sân cỏ",
    quote: "Khoảng 6 năm thi đấu bóng đá chuyên nghiệp tại CLB An Giang.",
    highlightNumber: "06+",
    highlightLabel: "NĂM CHUYÊN NGHIỆP",
    primaryImage: "IMG_7934.JPG",
    secondaryImage: "IMG_5663.JPG",
    meta: ["CLB An Giang", "Đội trưởng số 18", "Vua phá lưới VUG 10"],
  },
  {
    id: "tech",
    chapter: "02",
    title: "CÔNG NGHỆ.",
    subtitle: "Rời sân bóng, bước vào giảng đường công nghệ",
    quote: "Công nghệ Thông tin — FPT University Cần Thơ.",
    highlightNumber: "4.0",
    highlightLabel: "KỸ SƯ PHẦN MỀM",
    primaryImage: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
    secondaryImage: "IMG_9161.JPG",
    meta: ["FPT University Cần Thơ", "ManageField System", "React & RESTful API"],
  },
  {
    id: "present",
    chapter: "03",
    title: "HIỆN TẠI.",
    subtitle: "Hai nửa đam mê trong một con người",
    quote: "Ban ngày làm việc. Buổi tối vẫn ở trên sân.",
    highlightNumber: "24/7",
    highlightLabel: "NHỊP SỐNG KỶ LUẬT",
    primaryImage: "IMG_7935.JPG",
    secondaryImage: "IMG_3712.JPG",
    meta: ["FPT Telecom Solution", "Football Coach Cần Thơ", "Sống trọn đam mê"],
  },
];
