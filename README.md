# iOS IPA installer (GitHub Pages)

Trang web cài IPA trực tiếp từ Safari qua `itms-services://` (OTA).

## Cách dùng

1. Chép file `.ipa` vào `ipa/` và icon vào `icons/`.
2. Sửa `apps.json` (id, name, version, bundleId, ipa, icon, description).
   `ipa` có thể là đường dẫn tương đối hoặc URL `https://` tuyệt đối (ví dụ asset của GitHub Release, dùng khi file > 100 MB).
3. Repo → **Settings → Pages → Source: GitHub Actions**.
4. Push lên `main`; workflow `pages.yml` sinh `manifests/<id>.plist` và deploy.
5. Mở `https://<user>.github.io/<repo>/` bằng Safari trên iPhone → **Cài đặt**.

Build thử local: `BASE_URL=https://<user>.github.io/<repo> node scripts/build.mjs` (kết quả ở `dist/`).

## Yêu cầu

- Phải là HTTPS (GitHub Pages đã có).
- IPA phải được ký hợp lệ: Ad Hoc / Development (UDID có trong profile) hoặc Enterprise. IPA chưa ký hoặc ký sai sẽ không cài được.
- `bundleId` và `version` trong `apps.json` phải khớp với IPA.
- Repo public thì ai cũng tải được IPA — đừng đưa bản có dữ liệu nhạy cảm.
- Lần đầu cần tin cậy chứng chỉ: Cài đặt → Cài đặt chung → VPN & Quản lý thiết bị.
