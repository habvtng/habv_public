// Tạo dist/ cho GitHub Pages: copy site + sinh manifest .plist cho từng app.
// Chạy: node scripts/build.mjs   (tuỳ chọn: BASE_URL=https://user.github.io/repo)
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from "node:fs";

const apps = JSON.parse(readFileSync("apps.json", "utf8"));
const repo = process.env.GITHUB_REPOSITORY; // owner/name
const base = (
  process.env.BASE_URL ||
  (repo ? `https://${repo.split("/")[0]}.github.io/${repo.split("/")[1]}` : "http://localhost:8000")
).replace(/\/$/, "");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (p) => (/^https?:\/\//.test(p) ? p : `${base}/${p.replace(/^\//, "")}`);

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/manifests", { recursive: true });

for (const f of ["index.html", "apps.json"]) cpSync(f, `dist/${f}`);
for (const d of ["ipa", "apk", "icons", "setup"]) if (existsSync(d)) cpSync(d, `dist/${d}`, { recursive: true });

for (const a of apps) {
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key><string>software-package</string>
          <key>url</key><string>${esc(abs(a.ipa))}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key><string>${esc(a.bundleId)}</string>
        <key>bundle-version</key><string>${esc(a.version)}</string>
        <key>kind</key><string>software</string>
        <key>title</key><string>${esc(a.name)}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>
`;
  writeFileSync(`dist/manifests/${a.id}.plist`, plist);
}

console.log(`Built ${apps.length} app(s) for ${base}`);
