export interface SkillItem {
  id: string;
  number: string;
  name: string;
  subSkills: string[];
  description: string;
  photoKey: string;
  accent: string;
  resources?: { title: string; url: string }[];
}

export const skillsData: SkillItem[] = [
  {
    id: "football",
    number: "01",
    name: "FOOTBALL",
    subSkills: ["Chiến thuật thi đấu", "Huấn luyện chuyên sâu", "Kỷ luật & Thể lực"],
    description: "Kinh nghiệm thi đấu tại CLB An Giang, huấn luyện kỹ thuật và rèn tinh thần đồng đội.",
    photoKey: "IMG_7934.JPG",
    accent: "#FF5A1F",
  },
  {
    id: "technology",
    number: "02",
    name: "TECHNOLOGY",
    subSkills: ["Web Development", "UI / UX Design", "AI Tools & APIs"],
    description: "Phát triển giao diện web và API; kết hợp tư duy phần mềm với trải nghiệm người dùng.",
    photoKey: "att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg",
    accent: "#3B82F6",
  },
  {
    id: "sales",
    number: "03",
    name: "SALES",
    subSkills: ["Giải pháp FPT Telecom", "Tư vấn nhu cầu thực", "Chăm sóc khách hàng"],
    description: "Lắng nghe nhu cầu, tư vấn dịch vụ Internet và đồng hành cùng khách hàng.",
    photoKey: "hai_fpt_badge.jpg",
    accent: "#F59E0B",
  },
  {
    id: "content",
    number: "04",
    name: "CONTENT",
    subSkills: ["Short-form Video", "Kể chuyện thương hiệu", "CapCut & Media"],
    description: "Quay dựng video ngắn, chia sẻ câu chuyện và xây dựng nội dung thương hiệu.",
    photoKey: "IMG_3784.JPG",
    accent: "#EC4899",
  },
];
