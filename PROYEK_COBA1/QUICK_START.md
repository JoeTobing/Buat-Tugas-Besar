# ⚡ Quick Start - Menjalankan Aplikasi

## 🚀 Setup Pertama Kali (Hanya Sekali)

```powershell
# 1. Masuk ke folder backend
cd backend-servis

# 2. Install dependencies
composer install
npm install

# 3. Setup environment
copy .env.example .env
php artisan key:generate

# 4. Edit .env - sesuaikan database:
#    DB_DATABASE=db_elektronik
#    DB_USERNAME=root
#    DB_PASSWORD=

# 5. Buat database di MySQL: db_elektronik

# 6. Jalankan migrations
php artisan migrate

# 7. Buat storage link
php artisan storage:link

# 8. Buat admin user
php artisan db:seed --class=AdminSeeder
```

---

## ▶️ Menjalankan Aplikasi (Setiap Kali)

**Buka 2 Terminal:**

**Terminal 1:**
```powershell
cd backend-servis
php artisan serve
```

**Terminal 2:**
```powershell
cd backend-servis
npm run dev
```

**Buka Browser:** `http://localhost:8000`

---

## 🔑 Login Admin

- **Email:** `admin@example.com`
- **Password:** `admin123`

---

## 📖 Dokumentasi Lengkap

Lihat: `CARA_MENJALANKAN_APLIKASI.md`


