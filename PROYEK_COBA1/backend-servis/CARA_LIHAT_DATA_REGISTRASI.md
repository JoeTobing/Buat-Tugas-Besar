# Cara Melihat Data Registrasi di phpMyAdmin

## ✅ Ya, Data Langsung Masuk ke Database!

Ketika user melakukan registrasi melalui form, data **langsung tersimpan** ke database MySQL dan bisa langsung dilihat di phpMyAdmin.

---

## 📊 Tabel yang Terisi Saat Registrasi

### 1. Registrasi sebagai **Customer** (Pelanggan)

**Tabel yang terisi:**
- ✅ `users` - Data user (nama, email, password, role=CUSTOMER)

**Kolom yang terisi:**
- `name` - Nama lengkap
- `email` - Email
- `phone` - No. HP (jika diisi)
- `password` - Password (sudah di-hash)
- `role` - "CUSTOMER"
- `is_active` - true
- `created_at` - Waktu registrasi

### 2. Registrasi sebagai **Technician** (Teknisi)

**Tabel yang terisi:**
- ✅ `users` - Data user (nama, email, password, role=TECHNICIAN)
- ✅ `technicians` - Data profil teknisi/toko

**Kolom di tabel `users`:**
- `name` - Nama lengkap
- `email` - Email
- `phone` - No. HP (jika diisi)
- `password` - Password (sudah di-hash)
- `role` - "TECHNICIAN"
- `is_active` - true
- `created_at` - Waktu registrasi

**Kolom di tabel `technicians`:**
- `user_id` - ID dari tabel users
- `shop_name` - Nama toko/usaha
- `address` - Alamat
- `category` - Kategori layanan
- `description` - Deskripsi
- `base_price` - Harga dasar
- `verified` - false (belum diverifikasi admin)
- `status` - "OFFLINE"
- `created_at` - Waktu registrasi

---

## 🔍 Cara Melihat Data di phpMyAdmin

### Langkah-langkah:

1. **Buka phpMyAdmin:**
   ```
   http://localhost/phpmyadmin
   ```

2. **Pilih Database:**
   - Klik database yang digunakan (misalnya `db_elektronik` atau `servis_elektronik`)
   - Sesuai dengan setting di `.env`

3. **Lihat Tabel `users`:**
   - Klik tabel `users` di sidebar kiri
   - Klik tab **"Browse"** untuk melihat semua data
   - Atau klik tab **"Search"** untuk mencari data tertentu

4. **Lihat Tabel `technicians` (jika ada teknisi):**
   - Klik tabel `technicians` di sidebar kiri
   - Klik tab **"Browse"** untuk melihat semua data teknisi

---

## 📋 Contoh Data yang Terlihat

### Tabel `users`:

| id | name | email | phone | role | is_active | created_at |
|----|------|-------|-------|------|-----------|------------|
| 1 | Budi Santoso | budi@example.com | 08123456789 | CUSTOMER | 1 | 2025-12-02 02:45:04 |
| 2 | Andi Teknisi | andi@example.com | 08123456780 | TECHNICIAN | 1 | 2025-12-02 02:46:15 |

### Tabel `technicians`:

| id | user_id | shop_name | address | category | verified | status | created_at |
|----|---------|-----------|---------|----------|----------|--------|------------|
| 1 | 2 | Andi Service | Jl. Mawar No. 10 | SMARTPHONE | 0 | OFFLINE | 2025-12-02 02:46:15 |

---

## 🔐 Catatan Penting

### Password

- Password **tidak bisa dilihat** dalam bentuk plain text
- Password sudah di-**hash** oleh Laravel
- Kolom `password` akan berisi hash seperti: `$2y$10$...`

### Token (Setelah Login)

- Setelah login, token akan tersimpan di tabel `personal_access_tokens`
- Token digunakan untuk autentikasi API

---

## ✅ Verifikasi Data Masuk

### Cara 1: Via phpMyAdmin

1. Buka phpMyAdmin
2. Pilih database
3. Klik tabel `users`
4. Klik tab **"Browse"**
5. Data registrasi akan terlihat di sini

### Cara 2: Via Laravel Tinker

```bash
cd backend-servis
php artisan tinker
```

```php
// Lihat semua users
\App\Models\User::all();

// Lihat user terbaru
\App\Models\User::latest()->first();

// Hitung jumlah users
\App\Models\User::count();

// Lihat users dengan role CUSTOMER
\App\Models\User::where('role', 'CUSTOMER')->get();

// Lihat users dengan role TECHNICIAN
\App\Models\User::where('role', 'TECHNICIAN')->get();

exit
```

### Cara 3: Via API Response

Setelah registrasi berhasil, response API akan mengembalikan data user yang baru dibuat.

---

## 🔄 Real-time Update

- Data **langsung muncul** di phpMyAdmin setelah registrasi berhasil
- Tidak perlu refresh database
- Refresh halaman phpMyAdmin untuk melihat data terbaru

---

## 📝 Tips

1. **Sort by Created At:**
   - Di phpMyAdmin, klik kolom `created_at` untuk sort berdasarkan waktu
   - Data terbaru akan muncul di atas/bawah

2. **Search:**
   - Gunakan tab **"Search"** untuk mencari data tertentu
   - Bisa search berdasarkan email, nama, dll.

3. **Edit Data:**
   - Bisa edit data langsung di phpMyAdmin (tapi hati-hati!)
   - Lebih baik edit melalui aplikasi atau API

4. **Export Data:**
   - Bisa export data ke CSV atau SQL untuk backup

---

## 🎯 Kesimpulan

✅ **Ya, data registrasi langsung masuk ke database MySQL**
✅ **Bisa langsung dilihat di phpMyAdmin**
✅ **Tidak perlu menunggu atau refresh khusus**
✅ **Data tersimpan di tabel `users` (dan `technicians` jika teknisi)**

**Coba registrasi sekarang, lalu cek di phpMyAdmin!** 🚀



## ✅ Ya, Data Langsung Masuk ke Database!

Ketika user melakukan registrasi melalui form, data **langsung tersimpan** ke database MySQL dan bisa langsung dilihat di phpMyAdmin.

---

## 📊 Tabel yang Terisi Saat Registrasi

### 1. Registrasi sebagai **Customer** (Pelanggan)

**Tabel yang terisi:**
- ✅ `users` - Data user (nama, email, password, role=CUSTOMER)

**Kolom yang terisi:**
- `name` - Nama lengkap
- `email` - Email
- `phone` - No. HP (jika diisi)
- `password` - Password (sudah di-hash)
- `role` - "CUSTOMER"
- `is_active` - true
- `created_at` - Waktu registrasi

### 2. Registrasi sebagai **Technician** (Teknisi)

**Tabel yang terisi:**
- ✅ `users` - Data user (nama, email, password, role=TECHNICIAN)
- ✅ `technicians` - Data profil teknisi/toko

**Kolom di tabel `users`:**
- `name` - Nama lengkap
- `email` - Email
- `phone` - No. HP (jika diisi)
- `password` - Password (sudah di-hash)
- `role` - "TECHNICIAN"
- `is_active` - true
- `created_at` - Waktu registrasi

**Kolom di tabel `technicians`:**
- `user_id` - ID dari tabel users
- `shop_name` - Nama toko/usaha
- `address` - Alamat
- `category` - Kategori layanan
- `description` - Deskripsi
- `base_price` - Harga dasar
- `verified` - false (belum diverifikasi admin)
- `status` - "OFFLINE"
- `created_at` - Waktu registrasi

---

## 🔍 Cara Melihat Data di phpMyAdmin

### Langkah-langkah:

1. **Buka phpMyAdmin:**
   ```
   http://localhost/phpmyadmin
   ```

2. **Pilih Database:**
   - Klik database yang digunakan (misalnya `db_elektronik` atau `servis_elektronik`)
   - Sesuai dengan setting di `.env`

3. **Lihat Tabel `users`:**
   - Klik tabel `users` di sidebar kiri
   - Klik tab **"Browse"** untuk melihat semua data
   - Atau klik tab **"Search"** untuk mencari data tertentu

4. **Lihat Tabel `technicians` (jika ada teknisi):**
   - Klik tabel `technicians` di sidebar kiri
   - Klik tab **"Browse"** untuk melihat semua data teknisi

---

## 📋 Contoh Data yang Terlihat

### Tabel `users`:

| id | name | email | phone | role | is_active | created_at |
|----|------|-------|-------|------|-----------|------------|
| 1 | Budi Santoso | budi@example.com | 08123456789 | CUSTOMER | 1 | 2025-12-02 02:45:04 |
| 2 | Andi Teknisi | andi@example.com | 08123456780 | TECHNICIAN | 1 | 2025-12-02 02:46:15 |

### Tabel `technicians`:

| id | user_id | shop_name | address | category | verified | status | created_at |
|----|---------|-----------|---------|----------|----------|--------|------------|
| 1 | 2 | Andi Service | Jl. Mawar No. 10 | SMARTPHONE | 0 | OFFLINE | 2025-12-02 02:46:15 |

---

## 🔐 Catatan Penting

### Password

- Password **tidak bisa dilihat** dalam bentuk plain text
- Password sudah di-**hash** oleh Laravel
- Kolom `password` akan berisi hash seperti: `$2y$10$...`

### Token (Setelah Login)

- Setelah login, token akan tersimpan di tabel `personal_access_tokens`
- Token digunakan untuk autentikasi API

---

## ✅ Verifikasi Data Masuk

### Cara 1: Via phpMyAdmin

1. Buka phpMyAdmin
2. Pilih database
3. Klik tabel `users`
4. Klik tab **"Browse"**
5. Data registrasi akan terlihat di sini

### Cara 2: Via Laravel Tinker

```bash
cd backend-servis
php artisan tinker
```

```php
// Lihat semua users
\App\Models\User::all();

// Lihat user terbaru
\App\Models\User::latest()->first();

// Hitung jumlah users
\App\Models\User::count();

// Lihat users dengan role CUSTOMER
\App\Models\User::where('role', 'CUSTOMER')->get();

// Lihat users dengan role TECHNICIAN
\App\Models\User::where('role', 'TECHNICIAN')->get();

exit
```

### Cara 3: Via API Response

Setelah registrasi berhasil, response API akan mengembalikan data user yang baru dibuat.

---

## 🔄 Real-time Update

- Data **langsung muncul** di phpMyAdmin setelah registrasi berhasil
- Tidak perlu refresh database
- Refresh halaman phpMyAdmin untuk melihat data terbaru

---

## 📝 Tips

1. **Sort by Created At:**
   - Di phpMyAdmin, klik kolom `created_at` untuk sort berdasarkan waktu
   - Data terbaru akan muncul di atas/bawah

2. **Search:**
   - Gunakan tab **"Search"** untuk mencari data tertentu
   - Bisa search berdasarkan email, nama, dll.

3. **Edit Data:**
   - Bisa edit data langsung di phpMyAdmin (tapi hati-hati!)
   - Lebih baik edit melalui aplikasi atau API

4. **Export Data:**
   - Bisa export data ke CSV atau SQL untuk backup

---

## 🎯 Kesimpulan

✅ **Ya, data registrasi langsung masuk ke database MySQL**
✅ **Bisa langsung dilihat di phpMyAdmin**
✅ **Tidak perlu menunggu atau refresh khusus**
✅ **Data tersimpan di tabel `users` (dan `technicians` jika teknisi)**

**Coba registrasi sekarang, lalu cek di phpMyAdmin!** 🚀






