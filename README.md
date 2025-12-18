<<<<<<< HEAD
# Himajo Outdoor Rent

Repositori monorepo (Vite + Express + MySQL) untuk Himajo Outdoor Rent. Frontend React SPA dan backend Express berjalan pada port yang sama sehingga proses pengembangan dan deployment lebih sederhana. Dokumen ini menjelaskan seluruh langkah dari persiapan sampai aplikasi siap produksi dalam **bahasa Indonesia**.

---

## 1. Kebutuhan Sistem

| Tool | Versi Minimum | Keterangan |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | 20.x LTS | Wajib untuk menjalankan pnpm, Vite, dan Express |
| [pnpm](https://pnpm.io/) | 10.x | Gunakan `corepack enable` lalu `corepack prepare pnpm@10 --activate` jika belum terpasang |
| [MySQL](https://www.mysql.com/) / MariaDB | 8.x | Database utama aplikasi |
| Opsional: phpMyAdmin / MySQL Workbench | — | Mempermudah eksekusi script SQL |

---

## 2. Clone & Install

```bash
git clone <repo-url> himajo-outdoor-rent
cd himajo-outdoor-rent

pnpm install   # gunakan npm install bila tidak memakai pnpm
```

---

## 3. Konfigurasi Environment

Isi file `.env` (contoh nilai default):

```
VITE_PUBLIC_BUILDER_KEY=__BUILDER_PUBLIC_KEY__
PING_MESSAGE=ping pong
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=himajo
```

> Sesuaikan kredensial DB dengan server lokal/produksi Anda.

---

## 4. Inisialisasi Database

1. Buat database baru bernama `himajo` (atau nama lain lalu sesuaikan `.env`).
2. Jalankan script berikut melalui phpMyAdmin / MySQL Workbench / CLI:

```sql
SOURCE fix_database.sql;
```

Script tersebut:
- Membuat tabel `admin_users`, `products`, `stock`, dan `faqs` (lengkap dengan data sampel).
- Mengisi user admin default `admin / password`.

> Jika Anda sudah menghapus kolom `description` atau tabel `featured_items`, lewati bagian tersebut di script.

---

## 5. Menjalankan Aplikasi (Development)

```bash
pnpm dev        # atau npm run dev
```

- Server berjalan di <http://localhost:3000>
- Endpoint publik: `/api/products`, `/api/products/:slug`, `/api/faqs`
- Endpoint admin (perlu JWT): `/api/admin/*` (login, profile, produk CRUD, FAQ CRUD)
- Hot reload aktif untuk kode client & server

### Login Admin
1. Akses <http://localhost:3000/admin/login>
2. Gunakan akun pada tabel `admin_users` (default `admin / password`)
3. Setelah login tersedia menu Dashboard, Products, FAQ

---

## 6. Build Produksi & Pratinjau

```bash
pnpm build        # atau npm run build (membangun client + server)
pnpm start        # atau npm start (menjalankan dist/server/node-build.mjs)
```

Folder output:
- `dist/client`  → aset statis hasil build Vite
- `dist/server`  → bundle Express + entry `node-build.mjs`

---

## 7. Proses Deployment Spesifik (contoh Ubuntu 22.04)

1. **Persiapan Server**
   ```bash
   sudo apt update && sudo apt install -y nginx mysql-server
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo corepack enable
   sudo corepack prepare pnpm@10 --activate
   ```
2. **Kloning Repo & Install Dependensi**
   ```bash
   git clone <repo-url> /var/www/himajo
   cd /var/www/himajo
   pnpm install --prod
   ```
3. **Konfigurasi `.env` Produksi**
   - Pastikan kredensial DB produksi terisi.
   - Jangan pernah commit file `.env`.
4. **Migrasi Database**
   ```bash
   mysql -u <user> -p < database > < fix_database.sql
   ```
   (Sesuaikan nama DB & user.)
5. **Build**
   ```bash
   pnpm build
   ```
6. **Menjalankan Server Node**
   - Sementara:
     ```bash
     pnpm start
     ```
   - Permanen (gunakan PM2):
     ```bash
     pnpm add pm2 -g
     pm2 start dist/server/node-build.mjs --name himajo
     pm2 save && pm2 startup
     ```
7. **Konfigurasi Nginx sebagai Reverse Proxy**
   ```
   server {
     listen 80;
     server_name himajo.yourdomain.com;

     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```
   - Aktifkan site: `sudo ln -s /etc/nginx/sites-available/himajo /etc/nginx/sites-enabled/`
   - Restart Nginx: `sudo systemctl reload nginx`
   - Gunakan [Certbot](https://certbot.eff.org/) untuk HTTPS.

---

## 8. Testing & Quality Check

| Perintah | Fungsi |
| --- | --- |
| `pnpm typecheck` | Validasi tipe TypeScript |
| `pnpm test` | Menjalankan unit test dengan Vitest |

---

## 9. Struktur Proyek

```
client/
  pages/          → Halaman publik & admin
  layouts/        → Layout termasuk AdminLayout
  components/     → Komponen UI & utilitas
server/
  index.ts        → Bootstrap Express
  routes/         → Endpoint publik + admin
  middleware/     → Auth & helper lainnya
shared/           → Tipe TypeScript bersama (bila dibutuhkan)
fix_database.sql  → Skrip inisialisasi database
```

---

## 10. Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `Unknown column ... description` | Hapus referensi kolom tersebut atau jalankan lagi ALTER di `fix_database.sql`. |
| `Table 'himajo.faqs' doesn't exist` | Jalankan ulang langkah inisialisasi DB (bagian 4). |
| Gagal login admin | Pastikan `/api/admin/login` mengembalikan token dan data `admin_users` benar. |
| Tidak bisa konek DB | Cek service MySQL, kredensial `.env`, serta firewall/port. |

---

## 11. Checklist Final Sebelum Go-Live

1. `.env` produksi terisi lengkap (API key, kredensial DB, dsb).
2. Database sudah dimigrasi + data awal masuk.
3. `pnpm build` sukses tanpa error.
4. Proses Node dijalankan via PM2/systemd.
5. Reverse proxy + HTTPS aktif.
6. Tes manual:
   - List produk
   - Detail produk
   - Login admin & CRUD Produk/FAQ
   - Halaman Bantuan menampilkan FAQ dari DB

---
Untuk panduan end-user (cara memakai situs), lihat `USER_MANUAL.md`. Jika ada pertanyaan teknis tambahan, silakan hubungi tim pengembang.
=======
# Himajo-Outdoor-Rent
Repositori monorepo (Vite + Express + MySQL) untuk Himajo Outdoor Rent. 
>>>>>>> 7ded2c8734db3c268e86391f1ea8881ab6222fe2
