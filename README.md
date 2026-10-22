# App installer (GitHub Pages)

Trang web cài app nội bộ: iOS (IPA) trực tiếp từ Safari qua `itms-services://` (OTA) và Android (APK) tải thẳng về máy.

## Cách dùng

1. Chép file `.ipa` vào `ipa/`, file `.apk` vào `apk/` và icon vào `icons/`.
2. Sửa `apps.json` (id, name, version, bundleId, ipa, apk, icon, description).
   `apk` là tuỳ chọn; thiếu thì không hiện nút Android (tương tự `ipa`).
   `ipa` có thể là đường dẫn tương đối hoặc URL `https://` tuyệt đối (ví dụ asset của GitHub Release, dùng khi file > 100 MB).
3. Repo → **Settings → Pages → Source: GitHub Actions**.
4. Push lên `main`; workflow `pages.yml` sinh `manifests/<id>.plist` và deploy.
5. Mở `https://<user>.github.io/<repo>/`: trên iPhone dùng Safari → **iOS**; trên Android → **Android** để tải APK.

Build thử local: `BASE_URL=https://<user>.github.io/<repo> node scripts/build.mjs` (kết quả ở `dist/`).

## Yêu cầu

- Android: APK phải được ký (release keystore). Khi cài cần cho phép "Cài đặt ứng dụng không rõ nguồn". Không commit file keystore (`*.jks` đã nằm trong `.gitignore`).
- GitHub cảnh báo file > 50 MB và từ chối file > 100 MB; APK lớn hơn thì đặt ở GitHub Release và điền URL `https://` tuyệt đối vào `apk`.
- Phải là HTTPS (GitHub Pages đã có).
- IPA phải được ký hợp lệ: Ad Hoc / Development (UDID có trong profile) hoặc Enterprise. IPA chưa ký hoặc ký sai sẽ không cài được.
- `bundleId` và `version` trong `apps.json` phải khớp với IPA.
- Repo public thì ai cũng tải được IPA — đừng đưa bản có dữ liệu nhạy cảm.
- Lần đầu cần tin cậy chứng chỉ: Cài đặt → Cài đặt chung → VPN & Quản lý thiết bị.
