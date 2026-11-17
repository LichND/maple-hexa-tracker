# Maple HEXA Matrix Tracker (6th Job)

Ứng dụng web theo dõi tiến độ **HEXA Matrix (6th Job)** cho MapleStory (giao diện Sheet Style), xây dựng bằng **React + TypeScript + Vite + Tailwind CSS**, đồng bộ phi tập trung qua **Nostr Relays** và tối ưu để host tĩnh miễn phí trên **GitHub Pages**.

---

## 🌟 Tính Năng Chính

1. **Local-first 100%:**
   - Dữ liệu lưu tự động vào `localStorage`. Sử dụng mượt mà không cần đăng nhập hay tạo tài khoản.

2. **Đồng Bộ Đa Thiết Bị Qua Nostr Relays (Không Cần Server Riêng / Không Cần Firebase):**
   - **Mã đồng bộ 1 chuỗi (`HEXA-XXXX-XXXX-XXXX`):** Vừa dùng làm định danh Nostr (`NIP-78`, `kind: 30078`) vừa dùng làm khóa mã hóa **AES-GCM** toàn bộ dữ liệu ngay trên trình duyệt trước khi gửi lên Relay.
   - **Auto-sync thông minh (Debounce 60s):** Khi có thay đổi, nút Sync trên Header hiển thị đếm ngược `60s` để tránh spam Relay; bấm trực tiếp vào nút để **đồng bộ ngay lập tức**.
   - **Lắng nghe Realtime giữa nhiều thiết bị:** Tự động cập nhật khi thiết bị khác đẩy bản mới (tự tạm dừng kết nối khi tab ẩn để tiết kiệm pin/mạng). Nếu máy hiện tại đang có thay đổi chưa sync, app sẽ hiện thanh thông báo cho phép chọn **Tải bản mới** hoặc **Giữ bản hiện tại**.
   - **Tùy chỉnh Nostr Relays:** Cấu hình sẵn 4 public relays (`wss://relay.damus.io`, `wss://nos.lol`, `wss://relay.nostr.band`, `wss://nostr.mom`) và hỗ trợ chỉnh sửa/khôi phục mặc định ngay trong modal đồng bộ.
   - **File Backup (`.JSON`):** Xuất/nhập file dự phòng thủ công mọi lúc.

3. **Theo Dõi HEXA Matrix & Thứ Tự Nâng Cấp (Upgrade Order):**
   - Chia rõ 4 nhóm Node: **Skill Nodes** (Origin, Sovereign Everlasting, Void Origin), **Enhancement Nodes** (5th Job Boosts), **Mastery Nodes** (ghép chéo 2 skill với icon split), và **Common Nodes** (Sol Janus, Sol Hecate, kỹ năng chung theo branch như HEXA Demonic Wrath cho branch `demon`).
   - **Tính chi phí còn thiếu:** Tự động tính tổng **Sol Erda** và **Mảnh Sol Erda (Fragments)** còn lại để đạt Lv. 30.
   - **Thứ Tự Nâng Cấp Kỹ Năng (167 Bước):** Hỗ trợ xem dạng **Lưới Icon** và **Danh Sách**, tự động đánh dấu viền vàng (`★ Cần Nâng Tiếp`) bước kế tiếp cần nâng.
   - **Toggle `Ignore Skill 3`:** Cho phép bỏ qua kỹ năng thứ 3 trong bảng **Skill Nodes** (ví dụ: Void Origin) khỏi thứ tự ưu tiên và tổng chi phí còn thiếu.

4. **HEXA Stat Nodes (I, II, III):**
   - Theo dõi 3 **HEXA Stat Nodes** với bộ 3 dòng stat cố định theo class (với **Lethe**: `M.ATT`, `INT`, `Crit Damage` xoay vòng theo `A, B, C` / `B, A, C` / `C, A, B`).
   - Mỗi dòng nâng độc lập tối đa **Lv. 10**, tổng 3 dòng đạt **20 / 20** được tính là hoàn thành và mở khóa tuần tự **I → II → III**.

5. **Quản Lý Nhiều Nhân Vật & Chọn Class:**
   - Hỗ trợ thêm mới, đổi tên, chuyển đổi và xóa nhân vật trực tiếp trên Header.
   - Chọn class bằng **Search + Dropdown custom** (lọc theo tên class hoặc branch).

---

## 📁 Cấu Trúc Thư Mục Icon

```text
public/icons/
├── common/                 # Icon dùng chung cho mọi class (HEXA Stat I/II/III, Sol Janus, Sol Hecate)
├── branches/
│   └── demon/              # Icon dùng chung theo branch (HEXA Demonic Wrath)
└── lethe/                  # Icon riêng của từng class
```

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages

Dự án đã tích hợp sẵn GitHub Actions workflow (`.github/workflows/deploy.yml`) tự động build và deploy:

1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git push origin main
   ```
2. Trên GitHub, vào **Settings** -> **Pages** -> **Build and deployment** -> **Source**: chọn **GitHub Actions**.
3. Mỗi khi push lên `main`, GitHub Actions sẽ tự động build và xuất bản trang web tại:
   ```text
   https://<username>.github.io/<repo-name>/
   ```

---

## 💻 Phát Triển Trên Máy Cục Bộ (Local Development)

```bash
# Cài đặt thư viện
npm install

# Chạy server phát triển (HMR)
npm run dev

# Kiểm tra TypeScript và build bản phát hành
npm run build
```
