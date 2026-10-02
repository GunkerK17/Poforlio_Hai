# Hải Wi-Fi — hệ thiết kế và chuyển động

Mục tiêu: người mới hiểu ngay Hải tư vấn Internet FPT, FPT Play và camera tại Cần Thơ. Mọi cảnh 3D dẫn về ba gói 195k / 220k / 230k, chọn đúng một camera và liên hệ Hải.

## Hình ảnh

- Nền ivory `#fffaf3`, chữ charcoal `#252820`, điểm nhấn cam `#ef6e20`.
- Chữ lớn giới thiệu sản phẩm, chữ nhỏ hơn giải thích lợi ích. Sản phẩm là tâm điểm; vòng quỹ đạo chỉ bổ trợ.
- Mô hình dựng bằng hình học Three.js theo ảnh tham chiếu có sẵn. Không phải mô hình CAD chính thức của nhà sản xuất.
- Router có anten, cổng phía sau, chân đế và khe thoát nhiệt. Khách kéo ngang/dọc hoặc chọn góc trước/sau/trên/dưới.

## Chuyển động

- Desktop: một vùng sticky, tiến trình cuộn điều khiển timeline GSAP đang pause: router → router + Play → hệ sinh thái với hai mẫu camera để lựa chọn.
- Lenis làm mượt con lăn trên desktop. Liên kết nội trang dùng offset để tránh thanh điều hướng.
- Mobile: cuộn trang native; nút trước/sau chọn cảnh. Chạm bật xoay để kéo vật thể, bấm “Cuộn trang” để trở lại thao tác cuộn.
- Rê chuột chỉ tạo depth nhỏ. Kéo ngang/dọc xoay nhiều trục; các preset cho phép xem cả mặt dưới.
- Chuyển chữ 0,24 giây; thiết bị xuất hiện 0,55 giây; không dùng bounce hay particle không liên quan sản phẩm.
- Tải renderer khi cảnh sắp vào màn hình; dừng RAF khi ngoài màn hình hoặc tab ẩn. DPR tối đa 1,5. Giảm chuyển động vẫn cho chọn thiết bị/góc nhìn; không chạy chuyển động tự động.
- Khi không có WebGL, hiện poster và giữ nguyên chức năng chọn camera, giá và liên hệ.

## Nội dung và luồng tư vấn

- Gói 230k tặng **01 camera**, chọn Camera Play 4 hoặc Camera IQ 4S. Không diễn đạt rằng cả hai cùng được tặng.
- Xem mẫu và xác nhận mẫu là hai thao tác riêng. Xác nhận mới thay đổi phần tóm tắt yêu cầu và gói 230k.
- “Sao chép yêu cầu” tạo văn bản theo mẫu đã chọn; khách tự gửi qua Zalo. Không tự gửi tin hoặc báo đăng ký thành công.
- Quyền xem FPT Play theo gói; Box được tư vấn riêng. Điều kiện lắp đặt/lưu trữ nằm trong phần hỏi đáp.

## Kiến trúc

- `src/data/wifiExperience.ts`: ba chương, điểm cuộn và địa điểm FPT.
- `src/data/wifiPlans.ts`: giá và lợi ích dùng chung với portfolio.
- `src/data/wifiDevices.ts`: thông tin thiết bị theo ảnh người dùng cung cấp.
- `src/components/wifi/deviceModels.ts`: hình học, ánh sáng, GSAP timeline, xoay và quản lý tài nguyên WebGL.
- `src/components/wifi/DeviceStage.tsx`: lazy renderer, thao tác chuột/chạm, preset, poster fallback.
- `src/components/wifi/ProductShowcase.tsx`: các cảnh hero và mũi tên.
- `src/components/wifi/CameraChooser.tsx`: xem, chọn một camera và sao chép yêu cầu.
- `src/components/wifi/WifiFooter.tsx`: danh tính Hải, mạng xã hội và Google Maps.
- `src/wifi-cinematic.css`: token và bố cục mới, nạp cuối và scope `.wl-experience`.

Địa điểm: FPT Telecom Ninh Kiều, 10 Phan Văn Trị, phường Ninh Kiều, TP. Cần Thơ; đối chiếu [danh sách điểm giao dịch chính thức](https://fpt.vn/vi/khach-hang-ca-nhan/ho-tro/lien-he-24-7/diem-giao-dich) ngày 02/10/2026. Map dùng embed công khai và có liên kết mở Google Maps, không cần API key.
