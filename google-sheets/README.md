# Kích hoạt bảng nhận khách cho Hải

Google Drive đã được thêm trong Codex. Để khách gửi trực tiếp từ website GitHub Pages, cần thêm Web App nhận dữ liệu. Chỉ kết nối Drive chưa tạo ra URL nhận form.

## Thiết lập một lần trong tài khoản Google của Hải

1. Mở [Google Apps Script](https://script.google.com/home/start), tạo **Dự án mới**, đặt tên **Hải FPT – Nhận khách website**.
2. Thay nội dung `Code.gs` bằng toàn bộ [Code.gs](./Code.gs) trong thư mục này và lưu. Chọn hàm **setup**, bấm **Run / Chạy**. Google sẽ hỏi bạn cho phép script tạo và ghi Google Sheets; bạn tự đăng nhập và duyệt quyền trong tài khoản của mình. Hàm này tạo bảng riêng, chạy lại vẫn dùng cùng bảng. Link bảng xuất hiện trong nhật ký thực thi.
3. Chọn **Deploy / Triển khai → New deployment / Lần triển khai mới → Web app / Ứng dụng web**. Chọn **Execute as: Me / Tôi**, **Who has access: Anyone / Bất kỳ ai**, rồi Deploy. Quyền này dành cho endpoint nhận form, không công khai bảng khách. Script không có API đọc danh sách khách. Xem [hướng dẫn Web Apps của Google](https://developers.google.com/apps-script/guides/web).
4. Sao chép **Web app URL** có dạng `https://script.google.com/macros/s/…/exec` và gửi vào chat. Không gửi mật khẩu, mã xác thực hoặc token Google.

Sau khi nhận URL, mình sẽ đặt `VITE_LEAD_GOOGLE_SCRIPT_URL`, khởi động lại bản xem thử, gửi một yêu cầu kiểm thử có ghi rõ **TEST**, và kiểm tra đúng một dòng xuất hiện trong bảng. URL `/dev` chỉ dành cho người sửa script nên không dùng cho khách.

## Luồng đã chuẩn bị

Web POST JSON dưới dạng `text/plain` để tránh preflight không được Apps Script xử lý, đọc JSON xác nhận sau redirect. [Content Service của Google](https://developers.google.com/apps-script/guides/content) trả dữ liệu qua URL `script.googleusercontent.com`; chỉ báo thành công nếu đọc được `success: true`. Cần kiểm tra bằng URL thật trước khi nhận khách; không dùng `no-cors` để báo thành công giả.

Mỗi dòng: ngày nhận, mã yêu cầu, họ tên, điện thoại, khu vực, gói, nhu cầu, nhà/số lầu, loại TV, khả năng Wi-Fi của TV, thời gian lắp, ghi chú, nguồn, trạng thái. Có thể đổi **Trạng thái** từ **Mới** sang **Đã liên hệ / Đã lên hợp đồng** trực tiếp trong bảng. Giữ nguyên tên các cột.

Script kiểm tra lại dữ liệu, khóa khi ghi, giữ số điện thoại có số 0 đầu, xử lý nội dung giống công thức thành văn bản. Cùng mã yêu cầu và cùng nội dung chỉ tạo một dòng dù web phải thử gửi lại. Endpoint công khai có thể nhận spam; theo dõi số yêu cầu và quota Apps Script khi dùng thật. Không công khai bảng có thông tin khách.

Nếu dùng một bảng đã có, đặt Script Property `LEAD_SPREADSHEET_ID` là ID bảng rồi chạy `setup()`. Script thêm tab riêng **Khách đăng ký**, không sửa các tab khác. Chỉ làm khi tài khoản triển khai có quyền sửa bảng.

Khi sửa script sau khi deploy: **Deploy → Manage deployments → Edit → New version → Deploy**, giữ nguyên URL `/exec`.
