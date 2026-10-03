# Form tư vấn Internet FPT

Trang: `/wifi/dang-ky/`. Nút đăng ký trên Wi-Fi mở trang này; gói và mẫu camera đã chọn được điền sẵn. Form chỉ lấy thông tin tư vấn, Hải liên hệ khách để xác nhận địa chỉ, hạ tầng và lập hợp đồng.

## Trạng thái nhận khách

Người dùng đã chọn chuyển sang Zalo. Mặc định `VITE_LEAD_DELIVERY=zalo`: khách điền và bấm **GỬI YÊU CẦU QUA ZALO** → web sao chép toàn bộ nội dung và mở `https://zalo.me/0764640415`. Khách dán rồi bấm Gửi trong Zalo; chỉ bước đó mới gửi yêu cầu đến Hải. Không cần đăng nhập Google.

Nội dung gồm tên, số điện thoại, khu vực, gói, nhu cầu, nhà/số lầu, loại TV, khả năng Wi-Fi, thời gian lắp và ghi chú (bao gồm mẫu camera đã chọn). Câu hỏi bỏ qua vẫn có dòng ghi rõ chưa cung cấp. Không đưa thông tin khách lên URL, localStorage hay console. Khi sao chép bị chặn, web hiển thị nội dung để chọn/sao chép thủ công. Khi popup bị chặn, có link **Mở Zalo của Hải**. Sửa thông tin sẽ tạo nội dung mới; đăng ký thêm sẽ xóa form cũ.

Mã Sheets đã chuẩn bị trong `google-sheets/`, nhưng chưa được kết nối thật. Không tiếp tục thiết lập Google khi đang dùng Zalo. API/Sheets chỉ hoạt động khi chủ động chọn `VITE_LEAD_DELIVERY=api` hoặc `sheets` và cấu hình endpoint tương ứng. Chỉ các chế độ nhận trực tiếp này mới báo đăng ký thành công sau khi lưu.

## Kết nối nơi lưu

- Trong `.env.local`, đặt `VITE_LEAD_API_URL` là URL nhận dữ liệu. Khởi động lại Vite khi đổi env.
- Chọn `VITE_LEAD_DELIVERY=api` hoặc `sheets` để bật nơi nhận đã kết nối. Chỉ có URL mà không chọn mode vẫn dùng Zalo.
- Với Apps Script, chọn `VITE_LEAD_DELIVERY=sheets` và đặt `VITE_LEAD_GOOGLE_SCRIPT_URL` là URL Web App `/exec`. Chế độ đã chọn quyết định endpoint được dùng. Không cần token Google trên website.
- Khi deploy GitHub Pages, đặt repository variable `VITE_LEAD_DELIVERY` cùng URL tương ứng, rồi build/deploy lại. Workflow mặc định dùng Zalo nếu không cấu hình chế độ khác.
- Endpoint công khai cho phép POST từ domain của website, xử lý CORS cho `Content-Type: application/json`. Không đặt mật khẩu, service-role key hoặc token quản trị vào biến `VITE_*`.
- API kiểm tra lại dữ liệu phía server, lưu vào nơi chỉ Hải có quyền đọc và trả JSON `{ "success": true }` sau khi lưu thành công. Lỗi phải trả HTTP lỗi hoặc `{ "success": false }`. Không dùng `no-cors`: trình duyệt cần đọc xác nhận nhận dữ liệu.
- Thời gian chờ là 12 giây với API, 25 giây với Apps Script; backend nên chống spam và chống tạo trùng khi khách thử gửi lại sau lỗi mạng.

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
