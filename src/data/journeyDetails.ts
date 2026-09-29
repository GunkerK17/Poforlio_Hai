import { checkpoints } from './journey';

// Add photos and milestones here; dates below follow the existing portfolio.
export const journeyStages = checkpoints.map(stage => {
  if (stage.id === 'youth-football') return {
    ...stage,
    quote: 'Kỷ luật từ sân cỏ, bản lĩnh cho cuộc sống.',
    milestones: [
      { date: '2015', title: 'Bắt đầu hành trình chuyên nghiệp', description: 'Tập luyện và phát triển cùng các tuyến trẻ CLB Bóng đá An Giang.' },
      { date: '2015 – 2021', title: 'Những năm tháng trên sân', description: 'Rèn thể lực, tư duy chiến thuật và tinh thần đồng đội qua tập luyện, thi đấu.' },
      { date: '2021', title: 'Mang bản lĩnh sang chặng mới', description: 'Khép lại giai đoạn tuổi trẻ sân cỏ, bước tiếp với tinh thần kỷ luật đã được tôi luyện.' },
    ],
    photos: [...stage.photos,
      { src: '/images/IMG_5665.JPG', alt: 'Đội bóng trước giờ thi đấu', caption: 'Những khoảnh khắc cùng đồng đội trước giờ bóng lăn.' },
      { src: '/images/IMG_5666.JPG', alt: 'Kỷ niệm cùng đội bóng', caption: 'Một phần ký ức tuổi trẻ, cùng nhau tập luyện và trưởng thành.' },
    ],
  };
  if (stage.id === 'university-tech') return {
    ...stage,
    quote: 'Đổi sân chơi. Giữ nguyên tinh thần tiến lên.',
    milestones: [
      { date: '2021', title: 'Bước vào Đại học FPT', description: 'Theo học Kỹ thuật phần mềm tại Đại học FPT Cần Thơ.' },
      { date: '2024', title: 'Dấu ấn trên sân bóng sinh viên', description: 'Danh hiệu Vua phá lưới VUG 10 Cần Thơ, cùng hành trình đội trưởng đội bóng.' },
      { date: '2025', title: 'Đồ án & tốt nghiệp', description: 'Bảo vệ Capstone Project, phát triển ManageField và hoàn thành chương trình đại học.' },
    ],
    photos: [
      { src: '/images/journey-university-capstone.jpg', alt: 'Hải tại buổi bảo vệ Capstone Project', caption: 'Hải tại buổi bảo vệ Capstone Project.' },
      { src: '/images/journey-university-warmup.jpg', alt: 'Khởi động cùng đội bóng Đại học FPT', caption: 'Khởi động cùng đội bóng Đại học FPT.' },
      { src: '/images/journey-university-award.jpg', alt: 'Nhận giải cầu thủ ghi bàn thắng đầu tiên tại giải sinh viên Đồng Tháp 2025', caption: 'Nhận giải cầu thủ ghi bàn thắng đầu tiên tại giải sinh viên Đồng Tháp 2025.' },
      { src: '/images/journey-university-ball.jpg', alt: 'Khoảnh khắc tâng bóng trong màu áo FPT', caption: 'Khoảnh khắc tâng bóng trong màu áo FPT.' },
      { src: '/images/journey-university-study.jpg', alt: 'Những giờ học tập và lập trình thời sinh viên', caption: 'Những giờ học tập và lập trình thời sinh viên.' },
      { src: '/images/journey-university-desk.jpg', alt: 'Góc làm đồ án và phát triển phần mềm', caption: 'Góc làm đồ án và phát triển phần mềm.' },
      { src: '/images/IMG_8067.jpg', alt: 'Bảng kế hoạch học tập thời đại học', caption: 'Lên kế hoạch học tập và lập trình mỗi ngày.' },
      { src: '/images/journey-university-team.jpg', alt: 'Chiếc áo số 18 cùng đội bóng Đại học FPT Cần Thơ', caption: 'Chiếc áo số 18 cùng đội bóng Đại học FPT Cần Thơ.' },
      { src: '/images/journey-university-captain.jpg', alt: 'Mang băng đội trưởng trong trận đấu sinh viên', caption: 'Mang băng đội trưởng trong trận đấu sinh viên.' },
      { src: '/images/journey-university-vug.jpg', alt: 'Kỷ niệm nhận giải Vua phá lưới VUG 10 Cần Thơ 2024', caption: 'Kỷ niệm nhận giải Vua phá lưới VUG 10 Cần Thơ 2024.' },
      { src: '/images/journey-university-match.jpg', alt: 'Đồng hành cùng đồng đội trên sân bóng', caption: 'Đồng hành cùng đồng đội trên sân bóng.' },
      { src: '/images/journey-university-graduation.jpg', alt: 'Khoảnh khắc nhận bằng tốt nghiệp Đại học FPT', caption: 'Khoảnh khắc nhận bằng tốt nghiệp Đại học FPT.' },
    ],
  };
  return {
    ...stage,
    quote: 'Làm việc hết mình. Sống trọn đam mê.',
    milestones: [
      { date: 'SAU TỐT NGHIỆP', title: 'Kinh doanh tại FPT Telecom', description: 'Tư vấn và đồng hành cùng khách hàng tại Cần Thơ.' },
      { date: 'HIỆN TẠI', title: 'Truyền đam mê cho thế hệ mới', description: 'Huấn luyện bóng đá thiếu nhi, chia sẻ kinh nghiệm và tinh thần thể thao.' },
      { date: 'TIẾP NỐI', title: 'Tiếp tục học hỏi mỗi ngày', description: 'Kết hợp kinh doanh, công nghệ và bóng đá trong hành trình phát triển bản thân.' },
    ],
    mainPhoto: '/images/journey-current-day-training.jpg',
    alt: 'Buổi tập bóng đá thiếu nhi trên sân cỏ',
    photos: [
      { src: '/images/journey-current-portrait.jpg', alt: 'Hải trong trang phục đi làm với thẻ nhân viên', caption: 'Một khoảnh khắc trong ngày làm việc của Hải.' },
      { src: '/images/journey-current-night-training.jpg', alt: 'Buổi tập bóng đá buổi tối của các cầu thủ nhí', caption: 'Sau giờ làm, tiếp tục sống cùng bóng đá dưới ánh đèn sân tập.' },
      { src: '/images/journey-current-fpt-office.jpg', alt: 'Văn phòng FPT Telecom chi nhánh Cần Thơ', caption: 'FPT Telecom Cần Thơ — nơi đồng hành trong hành trình công việc hiện tại.' },
      { src: '/images/journey-current-day-training.jpg', alt: 'Các em nhỏ luyện tập bóng đá trên sân cỏ', caption: 'Những buổi tập cùng các cầu thủ nhí, nuôi dưỡng kỹ năng và niềm vui với bóng đá.' },
    ],
  };
});
