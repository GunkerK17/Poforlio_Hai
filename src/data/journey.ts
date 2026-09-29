export interface StagePhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface CheckpointData {
  id: string;
  number: string;
  phaseName: string;
  stepNum: string;
  yearBadge: string;
  cardBadge: string;
  isCurrent?: boolean;
  title: string;
  subtitle: string;
  mainPhoto: string;
  alt: string;
  defaultRotate: number;
  stageName: string;
  modalTitle: string;
  modalDescription: string;
  photos: StagePhoto[];
  tags: string[];
  milestones?: { date: string; title: string; description: string }[];
}

export const checkpoints: CheckpointData[] = [
  {
    id: 'youth-football',
    number: '01',
    phaseName: 'TUỔI TRẺ',
    stepNum: '01 · TUỔI TRẺ',
    yearBadge: '2015 – 2021',
    cardBadge: 'TUỔI TRẺ · 2015 – 2021',
    title: 'CLB Bóng đá An Giang',
    subtitle: 'Giai đoạn tập luyện và thi đấu bóng đá chuyên nghiệp.',
    mainPhoto: '/images/journey_angiang_team.jpg',
    alt: 'Nguyễn Chí Hải cùng đồng đội tuyến trẻ CLB Bóng đá An Giang',
    defaultRotate: -1.5,
    stageName: 'GIAI ĐOẠN 01 · TUỔI TRẺ (2015 – 2021)',
    modalTitle: 'Tuổi trẻ sân cỏ · 6 năm rèn giũa bản lĩnh tại CLB An Giang',
    modalDescription:
      'Giai đoạn thanh xuân rèn luyện và cống hiến hết mình cho niềm đam mê bóng đá. Ăn tập từ các lứa trẻ U15, U17, U19 Quốc gia, tôi luyện thể lực sung mãn, tư duy chiến thuật và tính kỷ luật thép trước mọi thử thách.',
    photos: [
      {
        src: '/images/journey_angiang_team.jpg',
        alt: 'Đội hình thi đấu giải trẻ CLB An Giang',
        caption: 'Đội hình thi đấu giải Quốc gia cùng đồng đội tuyến trẻ CLB An Giang',
      },
      {
        src: '/images/IMG_5663.JPG',
        alt: 'Nguyễn Chí Hải thi đấu bóng đá chuyên nghiệp',
        caption: 'Nguyễn Chí Hải trong màu áo thi đấu số 18 trên sân cỏ',
      },
      {
        src: '/images/IMG_5664.JPG',
        alt: 'Khoảnh khắc tranh bóng trên sân',
        caption: 'Những trận cầu nảy lửa trui rèn ý chí kiên định không bỏ cuộc',
      },
    ],
    tags: ['Tuổi trẻ sân cỏ', '6 năm thể thao chuyên nghiệp', 'CLB Bóng đá An Giang', 'U15 · U17 · U19 Quốc gia', 'Ý chí thép'],
  },
  {
    id: 'university-tech',
    number: '02',
    phaseName: 'ĐẠI HỌC',
    stepNum: '02 · ĐẠI HỌC',
    yearBadge: '2021 – 2025',
    cardBadge: 'ĐẠI HỌC · 2021 – 2025',
    title: 'FPT University',
    subtitle: 'Cử nhân Kỹ thuật Phần mềm · Bước chuyển mình CNTT.',
    mainPhoto: '/images/journey_fpt_capstone.jpg',
    alt: 'Nguyễn Chí Hải bảo vệ thành công đồ án tốt nghiệp Capstone Project tại Đại học FPT',
    defaultRotate: 1.5,
    stageName: 'GIAI ĐOẠN 02 · ĐẠI HỌC (2021 – 2025)',
    modalTitle: 'Thời sinh viên Đại học FPT · Cử nhân Kỹ thuật Phần mềm',
    modalDescription:
      'Bước chuyển mình sang lĩnh vực Công nghệ thông tin. Bảo vệ thành công đồ án tốt nghiệp Capstone Project; nghiên cứu và phát triển hệ sinh thái ManageField; đồng thời giữ vai trò Đội trưởng và giành danh hiệu Vua phá lưới VUG 10 Cần Thơ 2024.',
    photos: [
      {
        src: '/images/journey_fpt_capstone.jpg',
        alt: 'Bảo vệ thành công đồ án tốt nghiệp Capstone Project',
        caption: 'Lễ bảo vệ đồ án tốt nghiệp Capstone Project tại Đại học FPT Cần Thơ',
      },
      {
        src: '/images/journey_tech_nightcode.jpg',
        alt: 'Bàn làm việc lập trình lúc 00:05',
        caption: 'Góc học tập & lập trình nghiên cứu hệ sinh thái ManageField lúc 00:05',
      },
      {
        src: '/images/hero-graduation.jpg',
        alt: 'Lễ tốt nghiệp Đại học FPT',
        caption: 'Khoảnh khắc ngày nhận bằng tốt nghiệp Cử nhân Kỹ thuật Phần mềm',
      },
    ],
    tags: ['Thời sinh viên', 'Cử nhân Kỹ thuật Phần mềm', 'Đại học FPT Cần Thơ', 'ManageField Ecosystem', 'Vua phá lưới VUG 10'],
  },
  {
    id: 'post-graduation',
    number: '03',
    phaseName: 'SAU KHI TỐT NGHIỆP',
    stepNum: '03 · SAU KHI TỐT NGHIỆP',
    yearBadge: 'HIỆN TẠI',
    cardBadge: 'SAU TỐT NGHIỆP · HIỆN TẠI',
    isCurrent: true,
    title: 'FPT Telecom & Coach',
    subtitle: 'Chuyên viên kinh doanh FPT Telecom · HLV bóng đá thiếu nhi.',
    mainPhoto: '/images/journey_coach_kids.jpg',
    alt: 'Nguyễn Chí Hải huấn luyện các em nhỏ trên sân bóng đá',
    defaultRotate: -1.0,
    stageName: 'GIAI ĐOẠN 03 · SAU KHI TỐT NGHIỆP (HIỆN TẠI)',
    modalTitle: 'Sau khi tốt nghiệp · FPT Telecom & Huấn luyện viên bóng đá',
    modalDescription:
      'Hiện làm Nhân viên kinh doanh tại FPT Telecom Cần Thơ, chuyên tư vấn giải pháp mạng viễn thông & thiết bị thông minh (Internet Wi-Fi 6, Camera AI, FPT Play). Song song đó, duy trì đam mê huấn luyện bóng đá mầm non rèn luyện kỹ năng và truyền lửa cho các cầu thủ nhí Tây Đô.',
    photos: [
      {
        src: '/images/journey_coach_kids.jpg',
        alt: 'Huấn luyện viên bóng đá thiếu nhi',
        caption: 'Buổi huấn luyện kỹ thuật và truyền lửa đam mê cho các em nhỏ tại Cần Thơ',
      },
      {
        src: '/images/journey_fpt_telecom_badge.jpg',
        alt: 'Tác phong chuyên viên FPT Telecom',
        caption: 'Công tác tại FPT Telecom Cần Thơ — Tác phong chuẩn mực, hỗ trợ khách hàng tận tâm',
      },
      {
        src: '/images/hai_fpt_badge.jpg',
        alt: 'Thẻ nhân viên FPT Telecom',
        caption: 'Đại diện kinh doanh dịch vụ viễn thông & công nghệ FPT Telecom Cần Thơ',
      },
    ],
    tags: ['Sau khi tốt nghiệp', 'FPT Telecom Cần Thơ', 'Chuyên viên kinh doanh', 'HLV bóng đá thiếu nhi', 'Hỗ trợ khách hàng 24/7'],
  },
];


