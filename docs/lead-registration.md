# Form tư vấn Internet FPT

Trang: `/wifi/dang-ky/`. Nút đăng ký trên Wi-Fi mở trang này; gói và mẫu camera đã chọn được điền sẵn. Form chỉ lấy thông tin tư vấn, Hải liên hệ khách để xác nhận địa chỉ, hạ tầng và lập hợp đồng.

## Trạng thái nhận khách

Người dùng đã đồng ý dùng FormSubmit nhận email tại `chihai11102003@gmail.com`. Mặc định `VITE_LEAD_DELIVERY=email`: khách điền và bấm **GỬI YÊU CẦU TƯ VẤN** → web POST JSON tới `https://formsubmit.co/ajax/chihai11102003%40gmail.com`. Khách ở lại trang, không cần mở Zalo hay dán nội dung. Chủ email phải bấm **Activate Form** trong thư FormSubmit một lần cho website này. HTTP 200 nhưng `success: "false"` hoặc yêu cầu kích hoạt vẫn là lỗi, giữ nguyên form và không báo thành công.

Ngày 03/10/2026 đã gửi một yêu cầu kiểm tra được ghi rõ, từ URL production tới email này. FormSubmit trả `success: "true"`, `message: "The form was submitted successfully."` sau kích hoạt. Chưa kiểm tra bên trong hộp thư của chủ email.

Email gồm tên, số điện thoại, khu vực, gói, nhu cầu, nhà/số lầu, loại TV, khả năng Wi-Fi, thời gian lắp, ghi chú (bao gồm mẫu camera đã chọn), thời gian gửi và mã yêu cầu. Câu hỏi bỏ qua vẫn có dòng ghi rõ chưa cung cấp. Không đưa thông tin khách lên URL, localStorage hay console. FormSubmit là bên xử lý dữ liệu; link chính sách được hiển thị dưới form. Theo tài liệu dịch vụ, yêu cầu được lưu tối đa 30 ngày. Phản hồi thành công xác nhận dịch vụ đã tiếp nhận, không chứng minh email đã vào Inbox. Có thể cần kiểm tra Spam. Mã yêu cầu giúp Hải đối chiếu; không đảm bảo dịch vụ tự chống tạo trùng khi thử lại sau lỗi mạng.

Nếu gửi lỗi, khách có thể thử lại, gọi Hải hoặc bấm **Gửi qua Zalo thay thế**. Luồng Zalo sao chép đủ nội dung rồi mở `https://zalo.me/0764640415`; khách vẫn cần dán và gửi. `VITE_LEAD_DELIVERY=zalo` giữ chế độ Zalo độc lập. Mã Sheets đã chuẩn bị trong `google-sheets/`, nhưng chưa kết nối thật. API/Sheets chỉ hoạt động khi chủ động chọn mode tương ứng và cấu hình endpoint.

## Kết nối nơi lưu

- Trong `.env.local`, đặt `VITE_LEAD_API_URL` là URL nhận dữ liệu. Khởi động lại Vite khi đổi env.
- Chọn `VITE_LEAD_DELIVERY=api` hoặc `sheets` để bật nơi nhận đã kết nối. Chỉ có URL mà không chọn mode vẫn dùng email. `VITE_LEAD_EMAIL` tùy chỉnh địa chỉ nhận; địa chỉ mới cần kích hoạt lại.
- Với Apps Script, chọn `VITE_LEAD_DELIVERY=sheets` và đặt `VITE_LEAD_GOOGLE_SCRIPT_URL` là URL Web App `/exec`. Chế độ đã chọn quyết định endpoint được dùng. Không cần token Google trên website.
- Khi deploy GitHub Pages, đặt repository variable `VITE_LEAD_DELIVERY` cùng URL/email tương ứng, rồi build/deploy lại. Workflow mặc định dùng email nếu không cấu hình chế độ khác.
- Endpoint công khai cho phép POST từ domain của website, xử lý CORS cho `Content-Type: application/json`. Không đặt mật khẩu, service-role key hoặc token quản trị vào biến `VITE_*`.
- API kiểm tra lại dữ liệu phía server, lưu vào nơi chỉ Hải có quyền đọc và trả JSON `{ "success": true }` sau khi lưu thành công. Lỗi phải trả HTTP lỗi hoặc `{ "success": false }`. Không dùng `no-cors`: trình duyệt cần đọc xác nhận nhận dữ liệu.
- Thời gian chờ là 12 giây với API, 25 giây với Apps Script/email; backend nên chống spam và chống tạo trùng khi khách thử gửi lại sau lỗi mạng.

Payload POST JSON:

```json
{
  "fullName": "Nguyễn Văn A",
  "phone": "0912345678",
  "area": "Phường Ninh Kiều, Cần Thơ",
  "packageInterest": "camera",
  "usageNeeds": ["Wi-Fi gia đình", "Camera"],
  "installationTime": "Trong tuần này",
  "homeFloors": "Có 1 lầu",
  "tvType": "TV thường / đời cũ",
  "tvWifi": "Không kết nối Wi-Fi",
  "note": "Muốn nhận 01 Camera Play 4.",
  "createdAt": "2026-10-03T00:00:00.000Z",
  "source": "Website Form"
}
```

`packageInterest`: `wifi`, `play`, `camera`, `advice`. Họ tên, số di động Việt Nam, khu vực và gói quan tâm là bắt buộc. Nhu cầu, thời gian, ghi chú có thể rỗng. Tên tối đa 80, khu vực 180, ghi chú 600 ký tự. Server tự ghi thêm thời gian nhận, không dựa hoàn toàn vào timestamp từ khách.

Chạy thử không gửi thật: `VITE_LEAD_DELIVERY=demo`. UI luôn ghi rõ bản xem thử. Không bật demo khi nhận khách thật.
