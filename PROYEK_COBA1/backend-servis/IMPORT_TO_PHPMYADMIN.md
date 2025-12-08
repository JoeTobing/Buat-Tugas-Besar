# Cara Import Database ke phpMyAdmin

## File yang Harus Di-import

**File:** `database/servis_elektronik.sql`

File ini berisi semua struktur tabel database yang diperlukan untuk aplikasi.

---

## Langkah-langkah Import ke phpMyAdmin

### 1. Buat Database Baru

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Klik tab **"Databases"** atau **"New"**
3. Buat database baru dengan nama: `servis_elektronik`
4. Pilih collation: `utf8mb4_unicode_ci` (opsional)
5. Klik **"Create"**

### 2. Import File SQL

1. Pilih database `servis_elektronik` di sidebar kiri
2. Klik tab **"Import"** di menu atas
3. Klik **"Choose File"** atau **"Browse"**
4. Pilih file: `backend-servis/database/servis_elektronik.sql`
5. Pastikan format: **SQL**
6. Klik **"Go"** atau **"Import"**

### 3. Verifikasi

Setelah import selesai, kamu akan melihat semua tabel:
- ✅ `users`
- ✅ `technicians`
- ✅ `services`
- ✅ `orders`
- ✅ `order_photos`
- ✅ `chats`
- ✅ `negotiations`
- ✅ `payments`
- ✅ `reviews`
- ✅ `notifications`
- ✅ `cache`, `jobs`, `sessions`, dll (Laravel default)

---

## Alternatif: Menggunakan Command Line (Lebih Cepat)

Jika kamu lebih suka menggunakan terminal:

```bash
# 1. Masuk ke MySQL
mysql -u root -p

# 2. Buat database
CREATE DATABASE servis_elektronik;

# 3. Keluar dari MySQL
exit

# 4. Import file SQL
mysql -u root -p servis_elektronik < backend-servis/database/servis_elektronik.sql
```

---

## Setup .env

Setelah import, pastikan file `.env` sudah dikonfigurasi:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

Sesuaikan `DB_USERNAME` dan `DB_PASSWORD` dengan credentials MySQL kamu.

---

## Seed Sample Data (Optional)

Setelah import struktur database, kamu bisa menambahkan sample data:

```bash
cd backend-servis
php artisan db:seed --class=SampleDataSeeder
```

Ini akan membuat:
- 1 Admin user
- 1 Customer user
- 1 Technician user
- Sample orders, payments, reviews, dll.

---

## Catatan Penting

⚠️ **PENTING:**
- File SQL ini hanya berisi **struktur tabel** (CREATE TABLE)
- **Tidak ada data** di dalamnya (kecuali kamu tambahkan manual)
- Untuk data sample, gunakan seeder: `php artisan db:seed --class=SampleDataSeeder`

---

## Troubleshooting

### Error: "Access denied"
- Pastikan username dan password MySQL benar
- Pastikan user memiliki permission untuk create database

### Error: "Table already exists"
- Database sudah ada tabel dengan nama yang sama
- Hapus database dan buat ulang, atau gunakan `DROP TABLE` dulu

### Error: "Unknown collation"
- Pastikan MySQL version >= 5.7
- Atau hapus bagian `COLLATE=utf8mb4_unicode_ci` dari file SQL

### Error: "Foreign key constraint fails"
- Pastikan semua tabel di-import dengan urutan yang benar
- File SQL sudah include semua constraints

---

## Cara yang Lebih Baik (Recommended)

Sebenarnya, cara yang **lebih baik** adalah menggunakan Laravel migrations:

```bash
cd backend-servis
php artisan migrate
```

Ini akan membuat semua tabel secara otomatis sesuai dengan migrations yang ada.

Tapi kalau kamu lebih suka import langsung ke phpMyAdmin, file SQL ini sudah siap digunakan! ✅





## File yang Harus Di-import

**File:** `database/servis_elektronik.sql`

File ini berisi semua struktur tabel database yang diperlukan untuk aplikasi.

---

## Langkah-langkah Import ke phpMyAdmin

### 1. Buat Database Baru

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Klik tab **"Databases"** atau **"New"**
3. Buat database baru dengan nama: `servis_elektronik`
4. Pilih collation: `utf8mb4_unicode_ci` (opsional)
5. Klik **"Create"**

### 2. Import File SQL

1. Pilih database `servis_elektronik` di sidebar kiri
2. Klik tab **"Import"** di menu atas
3. Klik **"Choose File"** atau **"Browse"**
4. Pilih file: `backend-servis/database/servis_elektronik.sql`
5. Pastikan format: **SQL**
6. Klik **"Go"** atau **"Import"**

### 3. Verifikasi

Setelah import selesai, kamu akan melihat semua tabel:
- ✅ `users`
- ✅ `technicians`
- ✅ `services`
- ✅ `orders`
- ✅ `order_photos`
- ✅ `chats`
- ✅ `negotiations`
- ✅ `payments`
- ✅ `reviews`
- ✅ `notifications`
- ✅ `cache`, `jobs`, `sessions`, dll (Laravel default)

---

## Alternatif: Menggunakan Command Line (Lebih Cepat)

Jika kamu lebih suka menggunakan terminal:

```bash
# 1. Masuk ke MySQL
mysql -u root -p

# 2. Buat database
CREATE DATABASE servis_elektronik;

# 3. Keluar dari MySQL
exit

# 4. Import file SQL
mysql -u root -p servis_elektronik < backend-servis/database/servis_elektronik.sql
```

---

## Setup .env

Setelah import, pastikan file `.env` sudah dikonfigurasi:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

Sesuaikan `DB_USERNAME` dan `DB_PASSWORD` dengan credentials MySQL kamu.

---

## Seed Sample Data (Optional)

Setelah import struktur database, kamu bisa menambahkan sample data:

```bash
cd backend-servis
php artisan db:seed --class=SampleDataSeeder
```

Ini akan membuat:
- 1 Admin user
- 1 Customer user
- 1 Technician user
- Sample orders, payments, reviews, dll.

---

## Catatan Penting

⚠️ **PENTING:**
- File SQL ini hanya berisi **struktur tabel** (CREATE TABLE)
- **Tidak ada data** di dalamnya (kecuali kamu tambahkan manual)
- Untuk data sample, gunakan seeder: `php artisan db:seed --class=SampleDataSeeder`

---

## Troubleshooting

### Error: "Access denied"
- Pastikan username dan password MySQL benar
- Pastikan user memiliki permission untuk create database

### Error: "Table already exists"
- Database sudah ada tabel dengan nama yang sama
- Hapus database dan buat ulang, atau gunakan `DROP TABLE` dulu

### Error: "Unknown collation"
- Pastikan MySQL version >= 5.7
- Atau hapus bagian `COLLATE=utf8mb4_unicode_ci` dari file SQL

### Error: "Foreign key constraint fails"
- Pastikan semua tabel di-import dengan urutan yang benar
- File SQL sudah include semua constraints

---

## Cara yang Lebih Baik (Recommended)

Sebenarnya, cara yang **lebih baik** adalah menggunakan Laravel migrations:

```bash
cd backend-servis
php artisan migrate
```

Ini akan membuat semua tabel secara otomatis sesuai dengan migrations yang ada.

Tapi kalau kamu lebih suka import langsung ke phpMyAdmin, file SQL ini sudah siap digunakan! ✅








