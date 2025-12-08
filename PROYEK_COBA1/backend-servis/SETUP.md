# Setup Guide - Backend API

## Langkah-langkah Setup

### 1. Install Dependencies
```bash
cd backend-servis
composer install
```

### 2. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

**Atau gunakan SQLite (untuk development cepat):**
```env
DB_CONNECTION=sqlite
# DB_DATABASE=:memory:  # atau
# DB_DATABASE=database/database.sqlite
```

### 4. Jalankan Migrations
```bash
php artisan migrate
```

### 5. (Optional) Buat Admin User
```bash
php artisan db:seed --class=AdminSeeder
```

Default admin:
- Email: `admin@example.com`
- Password: `admin123`

**Atau buat manual via tinker:**
```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
    'role' => 'ADMIN',
]);
```

### 6. Publish Sanctum Config (Optional)
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 7. Start Server
```bash
php artisan serve
```

API akan berjalan di: `http://localhost:8000`

Base API URL: `http://localhost:8000/api`

---

## Testing API

### Menggunakan cURL

**Register Customer:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Budi",
    "email": "budi@test.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "budi@test.com",
    "password": "password123"
  }'
```

**Get Profile (dengan token):**
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Menggunakan Postman

1. Import collection (jika ada)
2. Atau buat request manual:
   - Method: POST/GET sesuai endpoint
   - URL: `http://localhost:8000/api/...`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer {token}` (untuk protected routes)
   - Body: JSON sesuai dokumentasi

---

## Troubleshooting

### Error: "Class 'Laravel\Sanctum\SanctumServiceProvider' not found"
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Error: "SQLSTATE[HY000] [2002] Connection refused"
- Pastikan database server berjalan
- Cek konfigurasi di `.env`

### Error: "Route [api] not defined"
- Pastikan `routes/api.php` sudah dibuat
- Cek `bootstrap/app.php` sudah include API routes

### Error: "419 CSRF token mismatch"
- API menggunakan Sanctum, tidak perlu CSRF token
- Pastikan request menggunakan header `Authorization: Bearer {token}`

---

## Next Steps

1. Setup frontend web (React/Vue/Next.js)
2. Setup Android app
3. Integrate dengan API
4. Setup file upload untuk foto order
5. Setup push notification (FCM)
6. Deploy ke production

---

## Production Checklist

- [ ] Update `APP_ENV=production`
- [ ] Update `APP_DEBUG=false`
- [ ] Setup HTTPS
- [ ] Konfigurasi CORS untuk domain frontend
- [ ] Setup queue worker untuk notifikasi
- [ ] Setup backup database
- [ ] Setup monitoring/logging
- [ ] Optimize database indexes
- [ ] Setup rate limiting
- [ ] Setup file storage (S3 atau local)





## Langkah-langkah Setup

### 1. Install Dependencies
```bash
cd backend-servis
composer install
```

### 2. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Konfigurasi Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

**Atau gunakan SQLite (untuk development cepat):**
```env
DB_CONNECTION=sqlite
# DB_DATABASE=:memory:  # atau
# DB_DATABASE=database/database.sqlite
```

### 4. Jalankan Migrations
```bash
php artisan migrate
```

### 5. (Optional) Buat Admin User
```bash
php artisan db:seed --class=AdminSeeder
```

Default admin:
- Email: `admin@example.com`
- Password: `admin123`

**Atau buat manual via tinker:**
```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
    'role' => 'ADMIN',
]);
```

### 6. Publish Sanctum Config (Optional)
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 7. Start Server
```bash
php artisan serve
```

API akan berjalan di: `http://localhost:8000`

Base API URL: `http://localhost:8000/api`

---

## Testing API

### Menggunakan cURL

**Register Customer:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Budi",
    "email": "budi@test.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "budi@test.com",
    "password": "password123"
  }'
```

**Get Profile (dengan token):**
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Menggunakan Postman

1. Import collection (jika ada)
2. Atau buat request manual:
   - Method: POST/GET sesuai endpoint
   - URL: `http://localhost:8000/api/...`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer {token}` (untuk protected routes)
   - Body: JSON sesuai dokumentasi

---

## Troubleshooting

### Error: "Class 'Laravel\Sanctum\SanctumServiceProvider' not found"
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Error: "SQLSTATE[HY000] [2002] Connection refused"
- Pastikan database server berjalan
- Cek konfigurasi di `.env`

### Error: "Route [api] not defined"
- Pastikan `routes/api.php` sudah dibuat
- Cek `bootstrap/app.php` sudah include API routes

### Error: "419 CSRF token mismatch"
- API menggunakan Sanctum, tidak perlu CSRF token
- Pastikan request menggunakan header `Authorization: Bearer {token}`

---

## Next Steps

1. Setup frontend web (React/Vue/Next.js)
2. Setup Android app
3. Integrate dengan API
4. Setup file upload untuk foto order
5. Setup push notification (FCM)
6. Deploy ke production

---

## Production Checklist

- [ ] Update `APP_ENV=production`
- [ ] Update `APP_DEBUG=false`
- [ ] Setup HTTPS
- [ ] Konfigurasi CORS untuk domain frontend
- [ ] Setup queue worker untuk notifikasi
- [ ] Setup backup database
- [ ] Setup monitoring/logging
- [ ] Optimize database indexes
- [ ] Setup rate limiting
- [ ] Setup file storage (S3 atau local)








