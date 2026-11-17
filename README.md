# Maple Hexa Matrix Tracker (6th Job)

Ứng dụng web theo dõi tiến độ **Hexa Matrix (Job 6)** cho MapleStory, xây dựng bằng **React + TypeScript + Vite + Tailwind CSS**, tối ưu hóa để lưu trữ tĩnh hoàn toàn miễn phí trên **GitHub Pages**.

---

## 🌟 Tính Năng Nổi Bật

1. **Local-first 100%:**
   - Dữ liệu lưu tức thì vào `localStorage`. Sử dụng mượt mà không cần mạng, không cần tạo tài khoản.
2. **Đồng Bộ Đa Thiết Bị Không Cần Server Riêng (Cross-device Sync):**
   - **Mã Đồng Bộ (Sync Code):** Sinh mã ngắn (vd: `HEXA-8821` + PIN 4 số). Thiết bị khác chỉ cần nhập mã là kéo dữ liệu về, hai máy **không cần online cùng lúc**.
   - **Google Login:** Đăng nhập 1-click qua tài khoản Google để sync tự động.
   - **File Backup (.JSON):** Xuất/nhập file dự phòng thủ công mọi lúc.
3. **Theo Dõi Tài Nguyên & Tính Toán Tự Động:**
   - Theo dõi **Sol Erda** (0 - 20) và **Sol Erda Energy** (0 - 1000).
   - Theo dõi **Mảnh Sol Erda (Fragments)**.
   - Bảng chi phí chuẩn cho từng loại Core: **Origin Skill**, **Mastery Core (I, II)**, **Enhancement Core (I - IV)**, **Common Core (Sol Janus)**.
   - Tính toán chính xác lượng Sol Erda & Mảnh cần để đạt cấp độ mục tiêu (Target Level).
   - Dự báo **số ngày hoàn thành (ETA)** dựa trên nhiệm vụ hằng ngày và tốc độ farm.
4. **Nhiệm Vụ Hằng Ngày & Hằng Tuần (Income Tracker):**
   - Check-in **Daily Erda Quest** (tự cộng 600 Energy + 12 Fragments vào kho).
   - Check-in **High Mountain Weekly** (tự cộng 2 Sol Erda + 20 Fragments vào kho).
5. **Hexa Stat Core:**
   - Theo dõi 2 Core Hexa Stat (Main Stat + 2 Sub Stats) tối đa 20 level.
6. **Hỗ Trợ Nhiều Nhân Vật:**
   - Quản lý đồng thời Main và các Sub-main / Boss mule.

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages

Dự án đã tích hợp sẵn GitHub Actions workflow tự động build và deploy:

1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git add .
   git commit -m "feat: complete maple hexa tracker with sync"
   git push origin main
   ```
2. Trên GitHub, vào tab **Settings** của repository:
   - Vào mục **Pages** (ở cột bên trái).
   - Dưới phần **Build and deployment** -> **Source**: Chọn **GitHub Actions**.
3. Mỗi khi bạn `git push origin main`, GitHub sẽ tự động build và xuất bản trang web của bạn tại địa chỉ:
   ```
   https://<username>.github.io/<repo-name>/
   ```

---

## ☁️ Cấu Hình Firebase Miễn Phí (Để Bật Tính Năng Đồng Bộ Đám Mây)

Bạn không cần bỏ ra bất kỳ chi phí nào (gói Spark của Firebase là **miễn phí vĩnh viễn**):

1. Truy cập [Firebase Console](https://console.firebase.google.com) và bấm **Add project** (Đặt tên tùy ý, ví dụ `my-maple-tracker`).
2. Vào mục **Build** ở menu bên trái:
   - **Firestore Database**: Bấm *Create database*, chọn vị trí gần bạn (vd `asia-southeast1`), chọn *Start in test mode* (hoặc đặt rules cho phép đọc/ghi).
   - **Authentication**: Bấm *Get started*, trong tab *Sign-in method* kích hoạt **Google** (nếu muốn dùng đăng nhập Google).
3. Vào **Project Settings (biểu tượng bánh răng)** -> cuộn xuống mục **Your apps** -> Chọn icon **Web (</>)** để tạo web app.
4. Copy toàn bộ đoạn `firebaseConfig`:
   ```json
   {
     "apiKey": "AIzaSy...",
     "authDomain": "my-project.firebaseapp.com",
     "projectId": "my-project",
     "storageBucket": "my-project.appspot.com",
     "messagingSenderId": "123456789",
     "appId": "1:123456789:web:abcdef"
   }
   ```
5. Mở ứng dụng web Maple Hexa Tracker của bạn -> Bấm nút **Cài đặt / Đồng bộ** (góc trên bên phải) -> Chọn tab **Firebase Setup** -> Dán đoạn JSON trên vào và bấm **Lưu Cấu Hình Vào Trình Duyệt**.
   *(Hoặc tạo file `.env` với các biến `VITE_FIREBASE_*` nếu muốn nhúng sẵn khi build).*

---

## 💻 Phát Triển Trên Máy Cục Bộ (Local Development)

```bash
# Cài đặt thư viện
npm install

# Chạy server phát triển (HMR)
npm run dev

# Kiểm tra TypeScript và Build bản phát hành
npm run build
```
