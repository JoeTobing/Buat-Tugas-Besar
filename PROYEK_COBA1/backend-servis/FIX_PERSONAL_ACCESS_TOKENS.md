# Fix Error: Table 'personal_access_tokens' doesn't exist

## Masalah

Error terjadi karena tabel `personal_access_tokens` (dari Laravel Sanctum) belum dibuat di database.

## Solusi Cepat

### Opsi 1: Jalankan Migration (Recommended)

```bash
cd backend-servis
php artisan migrate
```

Ini akan membuat semua tabel termasuk `personal_access_tokens`.

### Opsi 2: Import SQL yang Sudah Diperbaiki

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Pilih database `servis_elektronik` (atau `db_elektronik` sesuai error Anda)
3. Klik tab **"Import"**
4. Pilih file: `backend-servis/database/servis_elektronik.sql` (sudah di-update dengan tabel personal_access_tokens)
5. Klik **"Go"**

### Opsi 3: Buat Tabel Manual di phpMyAdmin

Jalankan SQL ini di phpMyAdmin:

```sql
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Setelah Fix

1. Refresh halaman registrasi
2. Coba registrasi lagi
3. Error seharusnya sudah hilang

---

## Catatan

- File SQL sudah di-update dengan tabel `personal_access_tokens`
- Migration file sudah ada di `database/migrations/2025_12_02_024616_create_personal_access_tokens_table.php`
- Pastikan nama database di `.env` sesuai dengan yang digunakan

---

## Verifikasi

Cek apakah tabel sudah ada:

```bash
php artisan tinker
```

```php
\Illuminate\Support\Facades\Schema::hasTable('personal_access_tokens');
// Harus return: true
exit
```

Atau cek di phpMyAdmin:
- Buka database
- Lihat daftar tabel
- Harus ada `personal_access_tokens`



## Masalah

Error terjadi karena tabel `personal_access_tokens` (dari Laravel Sanctum) belum dibuat di database.

## Solusi Cepat

### Opsi 1: Jalankan Migration (Recommended)

```bash
cd backend-servis
php artisan migrate
```

Ini akan membuat semua tabel termasuk `personal_access_tokens`.

### Opsi 2: Import SQL yang Sudah Diperbaiki

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Pilih database `servis_elektronik` (atau `db_elektronik` sesuai error Anda)
3. Klik tab **"Import"**
4. Pilih file: `backend-servis/database/servis_elektronik.sql` (sudah di-update dengan tabel personal_access_tokens)
5. Klik **"Go"**

### Opsi 3: Buat Tabel Manual di phpMyAdmin

Jalankan SQL ini di phpMyAdmin:

```sql
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Setelah Fix

1. Refresh halaman registrasi
2. Coba registrasi lagi
3. Error seharusnya sudah hilang

---

## Catatan

- File SQL sudah di-update dengan tabel `personal_access_tokens`
- Migration file sudah ada di `database/migrations/2025_12_02_024616_create_personal_access_tokens_table.php`
- Pastikan nama database di `.env` sesuai dengan yang digunakan

---

## Verifikasi

Cek apakah tabel sudah ada:

```bash
php artisan tinker
```

```php
\Illuminate\Support\Facades\Schema::hasTable('personal_access_tokens');
// Harus return: true
exit
```

Atau cek di phpMyAdmin:
- Buka database
- Lihat daftar tabel
- Harus ada `personal_access_tokens`






