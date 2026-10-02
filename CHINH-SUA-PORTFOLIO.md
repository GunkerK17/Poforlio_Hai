# Chỉnh sửa và đăng portfolio

Website là portfolio tĩnh: khách xem nội dung, không có trang quản trị hoặc chức năng sửa trên web. Nội dung và ảnh luôn lấy từ bản code đã deploy; bản lưu cũ trong trình duyệt không còn được dùng.

## Sửa nội dung trong code

- Thông tin cá nhân, công ty, học vấn, giới thiệu, liên hệ: `src/data/profile.ts` (được xuất qua `src/data/profileContent.ts`).
- Kỹ năng: `src/data/skills.ts`.
- Chi tiết dự án: `src/data/projects.ts`. Tiêu đề và ảnh một số thẻ đang được chọn thêm trong `src/App.tsx`.
- Nhật ký và hành trình: mảng `moments` và `journey` trong `src/App.tsx`.
- Ảnh: thay file tương ứng trong `public/images`, giữ nguyên tên; hoặc sửa tên ảnh được tham chiếu trong code.
- Giao diện đen–cam và responsive: `src/gun-design.css` (được nạp sau các stylesheet nền).
- Chế độ sáng/tối chung cho portfolio và Wi-Fi: `src/components/ui/ThemeToggle.tsx`, bảng màu trong `src/theme.css`. Lần đầu theo thiết bị; lựa chọn lưu ở `localStorage` với khóa `hai-theme`, đồng bộ giữa các tab. Script trong `index.html` áp dụng màu trước khi React khởi động.
- Hiệu ứng portfolio bổ sung: `src/portfolio-motion.css`, chiều sâu ảnh nhân vật trong `IntroHero.tsx`, tương tác thẻ/nhật ký trong `MotionGraphics.tsx`. Tôn trọng cài đặt giảm chuyển động của thiết bị.
- Hero và hiệu ứng chữ/ảnh: `src/components/hero/IntroHero.tsx`.
- CV xem trực tiếp và tải về: `public/cv/ITSale_FPTTelecom.pdf`; thay đúng file này để cập nhật CV. Nút ở hero và cửa sổ Hồ sơ dùng chung `src/components/ui/CvLinks.tsx`, tự theo đường dẫn triển khai.
- Giới thiệu dịch vụ Wi-Fi và tuyển học viên bóng đá: `src/components/ServicesSection.tsx`.
- Hiệu ứng cuộn trang, cursor và nút liên hệ nổi: `src/components/MotionGraphics.tsx`.
- Card nghiêng theo chuột, nút magnetic, parallax và màu ảnh nhân vật: `src/interaction-polish.css`.
- Ba gói chính 195k / 220k / 230k: `src/data/wifiPlans.ts`, dùng chung cho portfolio và trang Wi-Fi.
- Trang Wi-Fi nền sáng và kể chuyện theo cuộn: `src/components/WifiLanding.tsx`, `src/wifi-cinematic.css` nạp cuối. Quy tắc hình ảnh, chuyển động và kiến trúc được ghi tại `DESIGN-WIFI.md`.
- Nội dung bốn thiết bị: `src/data/wifiDevices.ts`. Ba chương hero: `src/data/wifiExperience.ts`. Mũi tên chuyển cảnh: `src/components/wifi/ProductShowcase.tsx`; xoay nhiều trục, preset góc và chế độ xoay bằng chạm: `src/components/wifi/DeviceStage.tsx`.
- Gói 230k tặng 01 camera, chọn 1 trong 2: `src/components/wifi/CameraChooser.tsx`. Xác nhận mẫu để cập nhật tóm tắt; khách sao chép yêu cầu và tự gửi qua Zalo.
- Footer với Google Maps FPT Ninh Kiều tại Cần Thơ: `src/components/wifi/WifiFooter.tsx`; địa chỉ, nguồn xác minh và URL Maps nằm trong `src/data/wifiExperience.ts`.
- Mô phỏng modem, FPT Play, Camera Play 4 và IQ 4S bằng Three.js: `src/components/wifi/deviceModels.ts`. Module tải riêng khi mở trang Wi-Fi; dừng dựng hình khi thiết bị ra khỏi màn hình, hỗ trợ giảm chuyển động và hiện poster nếu trình duyệt không có WebGL.
- Poster combo dùng ảnh bạn cung cấp tại `public/images/wifi/combo-vvip-hai.png`. Hai ảnh bảng thông số camera là tài liệu tham chiếu; không hiển thị số điện thoại người bán khác trên trang.
- Liên kết mạng xã hội lấy từ `src/data/profile.ts`; hero hiển thị qua `src/components/ui/SocialLinks.tsx`.
- Phần đăng ký bóng đá mở Zalo hoặc gọi trực tiếp; phụ huynh trao đổi tuổi học viên, lịch tập, địa điểm và học phí với Hải.

## Quy trình cập nhật

1. Sửa nội dung hoặc ảnh trong dự án.
2. Chạy `npm run dev` để xem trước.
3. Chạy `npm run lint` rồi `npm run build`.
4. Deploy bản `dist` mới vào cùng dự án hosting đang dùng. Đường link giữ nguyên, khách sẽ thấy bản mới sau khi cập nhật/tải lại trang.

Nếu hosting được nối với Git và bật tự động deploy, đẩy thay đổi vào nhánh đã cấu hình sẽ kích hoạt build/deploy. Không cần cơ sở dữ liệu hoặc admin cho quy trình này.

Chỉ người có quyền truy cập mã nguồn và hosting mới có thể cập nhật bản website công khai. Các nút Zalo, gọi điện, email và xem chi tiết vẫn hoạt động cho khách.

## Thêm mốc và ảnh vào section Hành trình

- `src/data/journey.ts`: thông tin các chương, năm, ảnh bìa, nội dung giới thiệu và ảnh cơ bản. Thêm một chương mới bằng cách thêm phần tử vào mảng `checkpoints`.
- `src/data/journeyDetails.ts`: các dấu mốc nhỏ (`milestones`: date, title, description), câu trích dẫn (`quote`) và ảnh bổ sung (`photos`: src, alt, caption). Khi thêm chương có id mới, thêm nhánh xử lý tương ứng trước phần return cuối.
- Đặt ảnh mới vào `public/images`, tham chiếu bằng `/images/ten-anh.jpg`. Không cần giới hạn ở 3 ảnh; số ảnh và ảnh thu nhỏ được tính tự động.
- Năm và thành tích phải đúng thông tin của bạn. Các mốc hiện tại dựa trên nội dung có sẵn trong dự án; mục “TIẾP NỐI” là định hướng, không phải thành tích đã hoàn thành.
- Album hỗ trợ ảnh trước/sau, chọn ảnh thu nhỏ, phím mũi tên trong vùng album, chuyển chương và Escape để đóng.


## Sản phẩm và liên kết (section 4)
Sửa `src/data/showcase.ts`. Mỗi mục có `resources: []`. Khi có link thật, thêm `{ title: "Xem video", url: "https://..." }` vào mảng này. Có thể thêm nhiều link. Để trống sẽ hiện Đang cập nhật. Kỹ năng chỉ giới thiệu năng lực trong `src/data/skills.ts`.
Section 5 tư vấn Wi-Fi dùng số điện thoại và Zalo từ `src/data/profile.ts`.
