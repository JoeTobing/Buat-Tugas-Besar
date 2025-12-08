# 🚀 Panduan Menjalankan Backend & Frontend

Panduan lengkap untuk menjalankan aplikasi Servis Elektronik (Backend Laravel + Frontend React).

---

## 📋 Prerequisites (Yang Harus Diinstall)

Sebelum mulai, pastikan sudah terinstall:

1. **PHP >= 8.2**
   - Download: https://www.php.net/downloads.php
   - Cek versi: `php --version`

2. **Composer**
   - Download: https://getcomposer.org/download/
   - Cek versi: `composer --version`

3. **Node.js & npm**
   - Download: https://nodejs.org/ (pilih versi LTS)
   - Cek versi: `node --version` dan `npm --version`

4. **MySQL**
   - Download: https://dev.mysql.com/downloads/mysql/
   - Atau gunakan XAMPP/WAMP yang sudah include MySQL

5. **phpMyAdmin** (Opsional, untuk manage database)
   - Biasanya sudah include di XAMPP/WAMP

---

## 🗄️ Setup Database

### 1. Buat Database di MySQL

**Via phpMyAdmin:**
1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Klik "New" untuk buat database baru
3. Nama database: `db_elektronik`
4. Collation: `utf8mb4_unicode_ci`
5. Klik "Create"

**Via MySQL Command Line:**
```sql
CREATE DATABASE db_elektronik CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Konfigurasi Database di Laravel

1. Buka file `backend-servis/.env`
2. Edit bagian database:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=db_elektronik
   DB_USERNAME=root
   DB_PASSWORD=
   ```
   (Sesuaikan dengan konfigurasi MySQL Anda)

---

## ⚙️ Setup Backend (Laravel)

### Langkah 1: Install Dependencies

Buka PowerShell/Terminal di folder `backend-servis`:

```powershell
cd backend-servis
composer install
```

**Tunggu sampai selesai** (mungkin beberapa menit).

### Langkah 2: Setup Environment

```powershell
# Copy file .env (jika belum ada)
copy .env.example .env

# Generate application key
php artisan key:generate
```

### Langkah 3: Jalankan Migrations

```powershell
# Buat semua tabel di database
php artisan migrate
```

### Langkah 4: Buat Storage Link (Untuk File Upload)

```powershell
php artisan storage:link
```

### Langkah 5: Buat Admin User (Opsional)

```powershell
php artisan db:seed --class=AdminSeeder
```

**Default Admin:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 🎨 Setup Frontend (React)

### Langkah 1: Install Dependencies

Buka PowerShell/Terminal di folder `backend-servis`:

```powershell
cd backend-servis
npm install
```

**Jika frontend belum terintegrasi**, install dependencies React:

```powershell
npm install react react-dom react-router-dom axios lucide-react
npm install -D @vitejs/plugin-react @types/react @types/react-dom
```

### Langkah 2: Copy File Frontend (Jika Belum)

**Cara 1: Menggunakan Script (Jika ada)**
```powershell
.\copy-frontend.ps1
```

**Cara 2: Manual**
Copy folder berikut dari `frontend-web/src/` ke `backend-servis/resources/js/`:
- `components/`
- `pages/`
- `contexts/`
- `services/`
- `utils/`

### Langkah 3: Update API Base URL

Edit file `backend-servis/resources/js/services/api.js`:

```javascript
const API_BASE_URL = '/api'  // Relatif karena sudah di Laravel
```

---

## 🚀 Menjalankan Aplikasi

### Cara 1: Development Mode (Recommended)

**Buka 2 Terminal/PowerShell:**

**Terminal 1 - Laravel Server:**
```powershell
cd backend-servis
php artisan serve
```

Output:
```
Starting Laravel development server: http://127.0.0.1:8000
```

**Terminal 2 - Vite Dev Server (untuk hot reload React):**
```powershell
cd backend-servis
npm run dev
```

Output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

**Akses Aplikasi:**
- Buka browser: `http://localhost:8000`
- Frontend React akan di-serve oleh Laravel
- API tersedia di: `http://localhost:8000/api`

---

### Cara 2: Production Mode

**Build Frontend:**
```powershell
cd backend-servis
npm run build
```

**Jalankan Laravel:**
```powershell
php artisan serve
```

**Akses:** `http://localhost:8000`

---

## 📝 Checklist Sebelum Menjalankan

- [ ] PHP >= 8.2 sudah terinstall
- [ ] Composer sudah terinstall
- [ ] Node.js & npm sudah terinstall
- [ ] MySQL sudah running
- [ ] Database `db_elektronik` sudah dibuat
- [ ] File `.env` sudah dikonfigurasi dengan benar
- [ ] `composer install` sudah dijalankan
- [ ] `php artisan migrate` sudah dijalankan
- [ ] `php artisan storage:link` sudah dijalankan
- [ ] `npm install` sudah dijalankan
- [ ] File frontend sudah di-copy ke `resources/js/` (jika belum terintegrasi)

---

## 🎯 Quick Start (Copy-Paste)

```powershell
# ============================================
# SETUP PERTAMA KALI (Hanya sekali)
# ============================================

# 1. Masuk ke folder backend
cd backend-servis

# 2. Install dependencies backend
composer install

# 3. Setup environment
copy .env.example .env
php artisan key:generate

# 4. Edit .env dan sesuaikan database

# 5. Jalankan migrations
php artisan migrate

# 6. Buat storage link
php artisan storage:link

# 7. Buat admin user
php artisan db:seed --class=AdminSeeder

# 8. Install dependencies frontend
npm install

# 9. Install React dependencies (jika belum)
npm install react react-dom react-router-dom axios lucide-react
npm install -D @vitejs/plugin-react @types/react @types/react-dom

# ============================================
# MENJALANKAN APLIKASI (Setiap kali)
# ============================================

# Terminal 1 - Laravel Server
cd backend-servis
php artisan serve

# Terminal 2 - Vite Dev Server
cd backend-servis
npm run dev

# Buka browser: http://localhost:8000
```

---

## 🔍 Verifikasi Setup

### 1. Cek Backend API

Buka browser atau gunakan cURL:

```bash
curl http://localhost:8000/api/technicians
```

**Jika berhasil**, akan muncul response JSON.

### 2. Cek Frontend

Buka browser: `http://localhost:8000`

**Jika berhasil**, akan muncul halaman login/register.

### 3. Test Login Admin

1. Buka: `http://localhost:8000/login`
2. Email: `admin@example.com`
3. Password: `admin123`
4. Klik "Masuk"

---

## 🐛 Troubleshooting

### Error: "Class 'PDO' not found"
**Solusi:** Install PHP PDO extension:
```bash
# Windows (XAMPP): Aktifkan di php.ini
extension=pdo_mysql
```

### Error: "SQLSTATE[HY000] [1045] Access denied"
**Solusi:** 
1. Cek username dan password MySQL di `.env`
2. Pastikan MySQL sudah running
3. Cek user MySQL memiliki akses ke database

### Error: "Port 8000 already in use"
**Solusi:**
```powershell
# Gunakan port lain
php artisan serve --port=8001
```

### Error: "Cannot find module 'react'"
**Solusi:**
```powershell
npm install react react-dom react-router-dom axios lucide-react
npm install -D @vitejs/plugin-react
```

### Error: "API connection failed"
**Solusi:**
1. Pastikan Laravel server running (`php artisan serve`)
2. Cek API base URL di `resources/js/services/api.js` harus `/api`
3. Cek browser console untuk error detail

### Error: "Storage link failed"
**Solusi:**
```powershell
# Windows: Hapus link manual dulu (jika ada)
# Kemudian jalankan lagi
php artisan storage:link
```

### Error: "Migration failed"
**Solusi:**
```powershell
# Reset database (HATI-HATI: akan hapus semua data!)
php artisan migrate:fresh

# Atau rollback dan migrate lagi
php artisan migrate:rollback
php artisan migrate
```

---

## 📚 Informasi Penting

### Port yang Digunakan

- **Laravel:** `http://localhost:8000` (default)
- **Vite Dev Server:** `http://localhost:5173` (untuk hot reload)
- **MySQL:** `3306` (default)
- **phpMyAdmin:** `http://localhost/phpmyadmin` (jika pakai XAMPP)

### File Penting

- **Backend Config:** `backend-servis/.env`
- **Frontend Config:** `backend-servis/resources/js/services/api.js`
- **Database:** `db_elektronik` (di MySQL)

### Default Credentials

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**Customer/Technician:**
- Buat via halaman register di frontend

---

## 🎓 Langkah Selanjutnya

Setelah aplikasi berjalan:

1. **Test Registrasi:**
   - Register sebagai Customer
   - Register sebagai Technician (dengan upload KTP)

2. **Test Login:**
   - Login sebagai Customer
   - Login sebagai Technician
   - Login sebagai Admin

3. **Test Fitur:**
   - Cari teknisi
   - Buat order
   - Chat dengan teknisi
   - Negosiasi harga
   - Pembayaran
   - Review & rating

---

## 📞 Butuh Bantuan?

Jika masih ada masalah:

1. Cek log Laravel: `backend-servis/storage/logs/laravel.log`
2. Cek browser console (F12) untuk error frontend
3. Pastikan semua prerequisites sudah terinstall
4. Pastikan database sudah dibuat dan dikonfigurasi dengan benar

---

**Selamat! Aplikasi sudah siap digunakan!** 🎉


