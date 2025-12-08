# Solusi Error: Table 'personal_access_tokens' doesn't exist

## 🔴 Masalah

Error: `Table 'db_elektronik.personal_access_tokens' doesn't exist`

**Penyebab:**
1. Tabel `personal_access_tokens` belum dibuat di database
2. Database yang digunakan adalah `db_elektronik` (bukan `servis_elektronik`)

---

## ✅ Solusi Cepat (Pilih Salah Satu)

### Solusi 1: Buat Tabel Manual di phpMyAdmin (Paling Cepat)

1. **Buka phpMyAdmin:** `http://localhost/phpmyadmin`
2. **Pilih database:** `db_elektronik` (atau database yang digunakan sesuai error)
3. **Klik tab "SQL"**
4. **Copy-paste SQL ini:**

```sql
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
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

5. **Klik "Go"**
6. **Selesai!** Refresh halaman registrasi dan coba lagi

---

### Solusi 2: Jalankan Migration Lagi

```bash
cd backend-servis
php artisan migrate
```

Jika masih error, coba:

```bash
php artisan migrate:fresh
```

**⚠️ PERINGATAN:** `migrate:fresh` akan **menghapus semua data** di database!

---

### Solusi 3: Pastikan Database di .env Benar

1. **Edit file:** `backend-servis/.env`
2. **Pastikan nama database sesuai:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_elektronik  # Sesuai dengan error Anda
DB_USERNAME=root
DB_PASSWORD=
```

3. **Jalankan migration:**

```bash
php artisan migrate
```

---

## 🔍 Verifikasi

### Cek di phpMyAdmin:

1. Buka phpMyAdmin
2. Pilih database `db_elektronik`
3. Lihat daftar tabel
4. Harus ada `personal_access_tokens`

### Cek via Tinker:

```bash
php artisan tinker
```

```php
\Illuminate\Support\Facades\Schema::hasTable('personal_access_tokens');
// Harus return: true
exit
```

---

## 📝 File SQL

Saya sudah membuat file `FIX_DATABASE.sql` yang berisi SQL untuk create tabel.

Atau gunakan file `database/servis_elektronik.sql` yang sudah di-update (tapi pastikan nama database sesuai).

---

## ⚡ Quick Fix (Copy-Paste)

**Di phpMyAdmin, pilih database `db_elektronik`, klik tab SQL, paste ini:**

```sql
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
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

**Klik "Go" → Selesai!** ✅

---

## Setelah Fix

1. Refresh halaman registrasi di browser
2. Coba registrasi lagi
3. Error seharusnya sudah hilang

---

**File SQL lengkap ada di:** `backend-servis/FIX_DATABASE.sql`



## 🔴 Masalah

Error: `Table 'db_elektronik.personal_access_tokens' doesn't exist`

**Penyebab:**
1. Tabel `personal_access_tokens` belum dibuat di database
2. Database yang digunakan adalah `db_elektronik` (bukan `servis_elektronik`)

---

## ✅ Solusi Cepat (Pilih Salah Satu)

### Solusi 1: Buat Tabel Manual di phpMyAdmin (Paling Cepat)

1. **Buka phpMyAdmin:** `http://localhost/phpmyadmin`
2. **Pilih database:** `db_elektronik` (atau database yang digunakan sesuai error)
3. **Klik tab "SQL"**
4. **Copy-paste SQL ini:**

```sql
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
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

5. **Klik "Go"**
6. **Selesai!** Refresh halaman registrasi dan coba lagi

---

### Solusi 2: Jalankan Migration Lagi

```bash
cd backend-servis
php artisan migrate
```

Jika masih error, coba:

```bash
php artisan migrate:fresh
```

**⚠️ PERINGATAN:** `migrate:fresh` akan **menghapus semua data** di database!

---

### Solusi 3: Pastikan Database di .env Benar

1. **Edit file:** `backend-servis/.env`
2. **Pastikan nama database sesuai:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_elektronik  # Sesuai dengan error Anda
DB_USERNAME=root
DB_PASSWORD=
```

3. **Jalankan migration:**

```bash
php artisan migrate
```

---

## 🔍 Verifikasi

### Cek di phpMyAdmin:

1. Buka phpMyAdmin
2. Pilih database `db_elektronik`
3. Lihat daftar tabel
4. Harus ada `personal_access_tokens`

### Cek via Tinker:

```bash
php artisan tinker
```

```php
\Illuminate\Support\Facades\Schema::hasTable('personal_access_tokens');
// Harus return: true
exit
```

---

## 📝 File SQL

Saya sudah membuat file `FIX_DATABASE.sql` yang berisi SQL untuk create tabel.

Atau gunakan file `database/servis_elektronik.sql` yang sudah di-update (tapi pastikan nama database sesuai).

---

## ⚡ Quick Fix (Copy-Paste)

**Di phpMyAdmin, pilih database `db_elektronik`, klik tab SQL, paste ini:**

```sql
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
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

**Klik "Go" → Selesai!** ✅

---

## Setelah Fix

1. Refresh halaman registrasi di browser
2. Coba registrasi lagi
3. Error seharusnya sudah hilang

---

**File SQL lengkap ada di:** `backend-servis/FIX_DATABASE.sql`






