# Thư mục chứa file .ipa (iOS)

Đặt file `.ipa` đã ký vào đây rồi commit + push lên `main`. GitHub Actions (`.github/workflows/pages.yml`)
sẽ tự dựng trang cài đặt và đăng lên GitHub Pages: `https://<tài-khoản>.github.io/<tên-repo>/`.

Nếu có nhiều file `.ipa`, trang dùng file có phiên bản/build **lớn nhất**.
Xem hướng dẫn đầy đủ ở mục "Cài app qua GitHub Pages" trong [../README.md](../README.md).

Bản Android: đặt file `.apk` đã ký vào `apk/` và khai báo trường `apk` trong `apps.json`; trang sẽ hiện nút **Android** để tải về.
