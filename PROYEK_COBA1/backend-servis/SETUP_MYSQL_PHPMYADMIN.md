# Setup Database MySQL dengan phpMyAdmin

## ✅ Ya, Bisa Full Pakai MySQL!

Laravel sudah support MySQL dan bisa langsung dilihat di phpMyAdmin.

---

## Langkah-langkah Setup

### 1. Install MySQL & phpMyAdmin

**Opsi A: XAMPP (Paling Mudah - Include MySQL + phpMyAdmin)**
1. Download XAMPP: https://www.apachefriends.org/
2. Install XAMPP
3. Start Apache dan MySQL dari XAMPP Control Panel
4. phpMyAdmin sudah tersedia di: `http://localhost/phpmyadmin`

**Opsi B: Laragon (Untuk Windows - Recommended)**
1. Download Laragon: https://laragon.org/
2. Install Laragon
3. Start Laragon (MySQL dan Apache akan otomatis start)
4. phpMyAdmin: `http://localhost/phpmyadmin`

**Opsi C: MySQL Standalone + phpMyAdmin Manual**
1. Install MySQL: https://dev.mysql.com/downloads/mysql/
2. Install phpMyAdmin: https://www.phpmyadmin.net/downloads/
3. Setup sesuai dokumentasi masing-masing

---

### 2. Buat Database di MySQL

**Cara 1: Via phpMyAdmin (Paling Mudah)**

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Klik tab **"Databases"**
3. Masukkan nama database: `servis_elektronik`
4. Pilih collation: `utf8mb4_unicode_ci` (opsional)
5. Klik **"Create"**

**Cara 2: Via MySQL Command Line**

```sql
CREATE DATABASE servis_elektronik CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Cara 3: Via Terminal/PowerShell**

```bash
mysql -u root -p
# Masukkan password MySQL
CREATE DATABASE servis_elektronik;
exit
```

---

### 3. Konfigurasi .env di Laravel

Edit file `backend-servis/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

**Penjelasan:**
- `DB_CONNECTION=mysql` - Gunakan MySQL
- `DB_HOST=127.0.0.1` - Localhost
- `DB_PORT=3306` - Port default MySQL
- `DB_DATABASE=servis_elektronik` - Nama database yang sudah dibuat
- `DB_USERNAME=root` - Username MySQL (default XAMPP/Laragon)
- `DB_PASSWORD=` - Password MySQL (kosong jika default, atau isi password Anda)

**Jika pakai XAMPP:**
- Username: `root`
- Password: (kosong, atau sesuai setting XAMPP Anda)

**Jika pakai Laragon:**
- Username: `root`
- Password: (kosong)

---

### 4. Import Struktur Database

**Opsi A: Menggunakan Migrations (Recommended)**

```bash
cd backend-servis
php artisan migrate
```

Ini akan membuat semua tabel secara otomatis.

**Opsi B: Import File SQL ke phpMyAdmin**

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Pilih database `servis_elektronik` di sidebar kiri
3. Klik tab **"Import"**
4. Klik **"Choose File"**
5. Pilih file: `backend-servis/database/servis_elektronik.sql`
6. Klik **"Go"** atau **"Import"**

**Opsi C: Import via Command Line**

```bash
mysql -u root -p servis_elektronik < backend-servis/database/servis_elektronik.sql
```

---

### 5. Seed Sample Data (Optional)

```bash
cd backend-servis
php artisan db:seed --class=SampleDataSeeder
```

Ini akan membuat data sample:
- Admin: `admin@example.com` / `admin123`
- Customer: `budi@example.com` / `password123`
- Technician: `andi@example.com` / `password123`

---

## Melihat Database di phpMyAdmin

### 1. Buka phpMyAdmin

```
http://localhost/phpmyadmin
```

### 2. Login

- Username: `root`
- Password: (kosong atau sesuai setting Anda)

### 3. Pilih Database

Klik database `servis_elektronik` di sidebar kiri.

### 4. Lihat Tabel

Anda akan melihat semua tabel:
- ✅ `users` - Data pengguna
- ✅ `technicians` - Data teknisi
- ✅ `orders` - Data order
- ✅ `chats` - Data chat
- ✅ `negotiations` - Data negosiasi
- ✅ `payments` - Data pembayaran
- ✅ `reviews` - Data review
- ✅ `notifications` - Data notifikasi
- ✅ `services` - Data layanan
- ✅ `order_photos` - Foto order
- ✅ Dan tabel Laravel lainnya

### 5. Lihat Data

Klik nama tabel untuk melihat data di dalamnya.

---

## Verifikasi Setup

### Test Koneksi Database

```bash
cd backend-servis
php artisan migrate:status
```

Jika berhasil, akan menampilkan status semua migrations.

### Test dari Laravel

```bash
php artisan tinker
```

```php
\App\Models\User::count();
\App\Models\Order::count();
exit
```

---

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

**Solusi:**
1. Cek username dan password di `.env`
2. Jika pakai XAMPP, default password kosong
3. Jika pakai MySQL standalone, gunakan password yang sudah diset

### Error: "Unknown database 'servis_elektronik'"

**Solusi:**
1. Buat database dulu di phpMyAdmin atau MySQL
2. Pastikan nama database di `.env` sama dengan yang dibuat

### Error: "SQLSTATE[HY000] [2002] Connection refused"

**Solusi:**
1. Pastikan MySQL service sudah running
2. Cek di XAMPP/Laragon Control Panel
3. Pastikan port 3306 tidak digunakan aplikasi lain

### Error: "Table already exists"

**Solusi:**
1. Database sudah ada tabel
2. Hapus database dan buat ulang, atau
3. Gunakan `php artisan migrate:fresh` (HATI-HATI: akan hapus semua data)

---

## Quick Setup (Copy-Paste)

```bash
# 1. Buat database di phpMyAdmin atau MySQL
# Nama: servis_elektronik

# 2. Edit .env
# DB_CONNECTION=mysql
# DB_DATABASE=servis_elektronik
# DB_USERNAME=root
# DB_PASSWORD=

# 3. Run migrations
cd backend-servis
php artisan migrate

# 4. Seed sample data (optional)
php artisan db:seed --class=SampleDataSeeder

# 5. Buka phpMyAdmin: http://localhost/phpmyadmin
# 6. Pilih database servis_elektronik
# 7. Lihat semua tabel dan data
```

---

## Keuntungan Pakai MySQL + phpMyAdmin

✅ **Mudah dilihat** - Interface visual di phpMyAdmin
✅ **Mudah di-edit** - Bisa edit data langsung
✅ **Export/Import** - Bisa export ke SQL atau CSV
✅ **Query Builder** - Bisa buat query SQL dengan mudah
✅ **User Management** - Kelola user dan permission
✅ **Production Ready** - MySQL cocok untuk production

---

## Setelah Setup

✅ Database MySQL sudah siap
✅ Bisa dilihat di phpMyAdmin
✅ Laravel sudah terkoneksi
✅ Semua tabel sudah dibuat
✅ Siap untuk development dan production!

**Selamat! Database MySQL sudah siap digunakan!** 🎉



## ✅ Ya, Bisa Full Pakai MySQL!

Laravel sudah support MySQL dan bisa langsung dilihat di phpMyAdmin.

---

## Langkah-langkah Setup

### 1. Install MySQL & phpMyAdmin

**Opsi A: XAMPP (Paling Mudah - Include MySQL + phpMyAdmin)**
1. Download XAMPP: https://www.apachefriends.org/
2. Install XAMPP
3. Start Apache dan MySQL dari XAMPP Control Panel
4. phpMyAdmin sudah tersedia di: `http://localhost/phpmyadmin`

**Opsi B: Laragon (Untuk Windows - Recommended)**
1. Download Laragon: https://laragon.org/
2. Install Laragon
3. Start Laragon (MySQL dan Apache akan otomatis start)
4. phpMyAdmin: `http://localhost/phpmyadmin`

**Opsi C: MySQL Standalone + phpMyAdmin Manual**
1. Install MySQL: https://dev.mysql.com/downloads/mysql/
2. Install phpMyAdmin: https://www.phpmyadmin.net/downloads/
3. Setup sesuai dokumentasi masing-masing

---

### 2. Buat Database di MySQL

**Cara 1: Via phpMyAdmin (Paling Mudah)**

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Klik tab **"Databases"**
3. Masukkan nama database: `servis_elektronik`
4. Pilih collation: `utf8mb4_unicode_ci` (opsional)
5. Klik **"Create"**

**Cara 2: Via MySQL Command Line**

```sql
CREATE DATABASE servis_elektronik CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Cara 3: Via Terminal/PowerShell**

```bash
mysql -u root -p
# Masukkan password MySQL
CREATE DATABASE servis_elektronik;
exit
```

---

### 3. Konfigurasi .env di Laravel

Edit file `backend-servis/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

**Penjelasan:**
- `DB_CONNECTION=mysql` - Gunakan MySQL
- `DB_HOST=127.0.0.1` - Localhost
- `DB_PORT=3306` - Port default MySQL
- `DB_DATABASE=servis_elektronik` - Nama database yang sudah dibuat
- `DB_USERNAME=root` - Username MySQL (default XAMPP/Laragon)
- `DB_PASSWORD=` - Password MySQL (kosong jika default, atau isi password Anda)

**Jika pakai XAMPP:**
- Username: `root`
- Password: (kosong, atau sesuai setting XAMPP Anda)

**Jika pakai Laragon:**
- Username: `root`
- Password: (kosong)

---

### 4. Import Struktur Database

**Opsi A: Menggunakan Migrations (Recommended)**

```bash
cd backend-servis
php artisan migrate
```

Ini akan membuat semua tabel secara otomatis.

**Opsi B: Import File SQL ke phpMyAdmin**

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Pilih database `servis_elektronik` di sidebar kiri
3. Klik tab **"Import"**
4. Klik **"Choose File"**
5. Pilih file: `backend-servis/database/servis_elektronik.sql`
6. Klik **"Go"** atau **"Import"**

**Opsi C: Import via Command Line**

```bash
mysql -u root -p servis_elektronik < backend-servis/database/servis_elektronik.sql
```

---

### 5. Seed Sample Data (Optional)

```bash
cd backend-servis
php artisan db:seed --class=SampleDataSeeder
```

Ini akan membuat data sample:
- Admin: `admin@example.com` / `admin123`
- Customer: `budi@example.com` / `password123`
- Technician: `andi@example.com` / `password123`

---

## Melihat Database di phpMyAdmin

### 1. Buka phpMyAdmin

```
http://localhost/phpmyadmin
```

### 2. Login

- Username: `root`
- Password: (kosong atau sesuai setting Anda)

### 3. Pilih Database

Klik database `servis_elektronik` di sidebar kiri.

### 4. Lihat Tabel

Anda akan melihat semua tabel:
- ✅ `users` - Data pengguna
- ✅ `technicians` - Data teknisi
- ✅ `orders` - Data order
- ✅ `chats` - Data chat
- ✅ `negotiations` - Data negosiasi
- ✅ `payments` - Data pembayaran
- ✅ `reviews` - Data review
- ✅ `notifications` - Data notifikasi
- ✅ `services` - Data layanan
- ✅ `order_photos` - Foto order
- ✅ Dan tabel Laravel lainnya

### 5. Lihat Data

Klik nama tabel untuk melihat data di dalamnya.

---

## Verifikasi Setup

### Test Koneksi Database

```bash
cd backend-servis
php artisan migrate:status
```

Jika berhasil, akan menampilkan status semua migrations.

### Test dari Laravel

```bash
php artisan tinker
```

```php
\App\Models\User::count();
\App\Models\Order::count();
exit
```

---

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

**Solusi:**
1. Cek username dan password di `.env`
2. Jika pakai XAMPP, default password kosong
3. Jika pakai MySQL standalone, gunakan password yang sudah diset

### Error: "Unknown database 'servis_elektronik'"

**Solusi:**
1. Buat database dulu di phpMyAdmin atau MySQL
2. Pastikan nama database di `.env` sama dengan yang dibuat

### Error: "SQLSTATE[HY000] [2002] Connection refused"

**Solusi:**
1. Pastikan MySQL service sudah running
2. Cek di XAMPP/Laragon Control Panel
3. Pastikan port 3306 tidak digunakan aplikasi lain

### Error: "Table already exists"

**Solusi:**
1. Database sudah ada tabel
2. Hapus database dan buat ulang, atau
3. Gunakan `php artisan migrate:fresh` (HATI-HATI: akan hapus semua data)

---

## Quick Setup (Copy-Paste)

```bash
# 1. Buat database di phpMyAdmin atau MySQL
# Nama: servis_elektronik

# 2. Edit .env
# DB_CONNECTION=mysql
# DB_DATABASE=servis_elektronik
# DB_USERNAME=root
# DB_PASSWORD=

# 3. Run migrations
cd backend-servis
php artisan migrate

# 4. Seed sample data (optional)
php artisan db:seed --class=SampleDataSeeder

# 5. Buka phpMyAdmin: http://localhost/phpmyadmin
# 6. Pilih database servis_elektronik
# 7. Lihat semua tabel dan data
```

---

## Keuntungan Pakai MySQL + phpMyAdmin

✅ **Mudah dilihat** - Interface visual di phpMyAdmin
✅ **Mudah di-edit** - Bisa edit data langsung
✅ **Export/Import** - Bisa export ke SQL atau CSV
✅ **Query Builder** - Bisa buat query SQL dengan mudah
✅ **User Management** - Kelola user dan permission
✅ **Production Ready** - MySQL cocok untuk production

---

## Setelah Setup

✅ Database MySQL sudah siap
✅ Bisa dilihat di phpMyAdmin
✅ Laravel sudah terkoneksi
✅ Semua tabel sudah dibuat
✅ Siap untuk development dan production!

**Selamat! Database MySQL sudah siap digunakan!** 🎉






