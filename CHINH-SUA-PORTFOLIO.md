# Chỉnh sửa và đăng portfolio

Website là portfolio tĩnh: khách xem nội dung, không có trang quản trị hoặc chức năng sửa trên web. Nội dung và ảnh luôn lấy từ bản code đã deploy; bản lưu cũ trong trình duyệt không còn được dùng.

## Sửa nội dung trong code

- Thông tin cá nhân, công ty, học vấn, giới thiệu, liên hệ: `src/data/profile.ts` (được xuất qua `src/data/profileContent.ts`).
- Kỹ năng: `src/data/skills.ts`.
- Chi tiết dự án: `src/data/projects.ts`. Tiêu đề và ảnh một số thẻ đang được chọn thêm trong `src/App.tsx`.
- Nhật ký và hành trình: mảng `moments` và `journey` trong `src/App.tsx`.
- Ảnh: thay file tương ứng trong `public/images`, giữ nguyên tên; hoặc sửa tên ảnh được tham chiếu trong code.
- Giao diện: `src/portfolio.css`.

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
