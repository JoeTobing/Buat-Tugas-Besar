# Troubleshooting: Data Registrasi Tidak Masuk ke Database

## 🔴 Masalah

Data registrasi tidak masuk ke database meskipun form sudah di-submit.

---

## ✅ Langkah-langkah Debug

### 1. Cek Browser Developer Tools (PENTING!)

**Buka Browser → Tekan F12 → Tab "Network":**

1. **Coba registrasi lagi**
2. **Lihat apakah ada request ke `/api/auth/register`**
3. **Klik request tersebut dan lihat:**
   - **Status Code:** Harus 201 (Created) atau 200 (OK)
   - **Response:** Lihat isinya, apakah ada error?
   - **Request Payload:** Data yang dikirim

**Jika tidak ada request:**
- Frontend tidak mengirim request
- Cek JavaScript error di Console tab
- Cek URL API di frontend

**Jika request ada tapi error:**
- Lihat response error
- Status code 422 = Validasi gagal
- Status code 500 = Server error
- Status code 404 = Route tidak ditemukan

---

### 2. Cek Log Laravel

**Buka file log:**
```
backend-servis/storage/logs/laravel.log
```

**Atau via terminal:**
```bash
cd backend-servis
tail -f storage/logs/laravel.log
```

**Cari log:**
- "Register attempt" - Request sampai ke controller
- "User created" - User berhasil dibuat
- "Registration error" - Ada error

---

### 3. Test API Langsung dengan cURL/Postman

**Test dengan cURL:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Jika berhasil:**
- Response akan berisi data user dan token
- Cek di phpMyAdmin, data harus masuk

**Jika error:**
- Lihat error message
- Fix sesuai error

---

### 4. Cek Database Connection

**Test koneksi:**
```bash
php artisan tinker
```

```php
// Test koneksi
\Illuminate\Support\Facades\DB::connection()->getPdo();

// Test insert manual
$user = \App\Models\User::create([
    'name' => 'Test Manual',
    'email' => 'manual@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'CUSTOMER',
]);

echo "User ID: " . $user->id;

// Cek di database
\App\Models\User::where('email', 'manual@test.com')->first();

exit
```

**Jika manual insert berhasil:**
- Database OK, masalahnya di API/Request

**Jika manual insert gagal:**
- Masalah database connection
- Cek `.env` file

---

### 5. Cek .env File

**Pastikan di `backend-servis/.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_elektronik  # Sesuai dengan database Anda
DB_USERNAME=root
DB_PASSWORD=
```

**Test koneksi:**
```bash
php artisan migrate:status
```

---

### 6. Cek Frontend API URL

**Jika frontend sudah diintegrasikan ke Laravel:**

Pastikan di `resources/js/services/api.js`:
```js
const API_BASE_URL = '/api'  // Relatif, karena sudah di Laravel
```

**Jika frontend masih terpisah:**

Pastikan di `frontend-web/src/services/api.js`:
```js
const API_BASE_URL = 'http://localhost:8000/api'
```

---

## 🐛 Kemungkinan Masalah & Solusi

### Masalah 1: Request Tidak Sampai ke Backend

**Gejala:**
- Network tab tidak ada request
- Error CORS di console

**Solusi:**
1. Pastikan Laravel server running: `php artisan serve`
2. Cek URL API di frontend
3. Cek CORS settings (jika frontend di domain berbeda)

---

### Masalah 2: Validasi Gagal

**Gejala:**
- Status code 422
- Response berisi validation errors

**Solusi:**
1. Lihat error di Network tab → Response
2. Pastikan semua field required sudah diisi
3. Pastikan format benar:
   - Email valid
   - Password min 8 karakter
   - Password confirmation match

---

### Masalah 3: Database Error

**Gejala:**
- Status code 500
- Log Laravel menampilkan database error

**Solusi:**
1. Cek koneksi database di `.env`
2. Pastikan tabel `users` sudah ada
3. Pastikan migration sudah dijalankan: `php artisan migrate`

---

### Masalah 4: Error Tidak Terlihat

**Gejala:**
- Request berhasil (200/201) tapi data tidak masuk
- Tidak ada error di response

**Solusi:**
1. Cek log Laravel untuk detail error
2. Pastikan tidak ada exception yang di-swallow
3. Cek apakah ada transaction rollback

---

## ✅ Quick Test

### Test 1: Manual Insert via Tinker

```bash
php artisan tinker
```

```php
$user = \App\Models\User::create([
    'name' => 'Test',
    'email' => 'test@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'role' => 'CUSTOMER',
]);
echo "Created: " . $user->id;
exit
```

**Cek di phpMyAdmin apakah data masuk.**

### Test 2: Test API dengan Postman/cURL

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","password_confirmation":"password123"}'
```

**Lihat response dan cek database.**

---

## 📝 Checklist Debug

- [ ] Laravel server running (`php artisan serve`)
- [ ] Database connection OK (cek `.env`)
- [ ] Tabel `users` sudah ada (cek phpMyAdmin)
- [ ] Request sampai ke backend (cek Network tab F12)
- [ ] Tidak ada error di response (cek Network tab)
- [ ] Log Laravel tidak ada error (cek `storage/logs/laravel.log`)
- [ ] Frontend mengirim request ke URL yang benar
- [ ] Tidak ada JavaScript error di Console

---

## 🔧 Perbaikan yang Sudah Ditambahkan

Saya sudah menambahkan:
1. ✅ **Error handling** lengkap di AuthController
2. ✅ **Logging** untuk tracking
3. ✅ **Error message** yang lebih jelas

**Sekarang coba:**
1. **Buka Browser F12 → Network tab**
2. **Coba registrasi lagi**
3. **Lihat request dan response**
4. **Cek log Laravel:** `storage/logs/laravel.log`

Dari situ kita bisa tahu masalahnya! 🔍



## 🔴 Masalah

Data registrasi tidak masuk ke database meskipun form sudah di-submit.

---

## ✅ Langkah-langkah Debug

### 1. Cek Browser Developer Tools (PENTING!)

**Buka Browser → Tekan F12 → Tab "Network":**

1. **Coba registrasi lagi**
2. **Lihat apakah ada request ke `/api/auth/register`**
3. **Klik request tersebut dan lihat:**
   - **Status Code:** Harus 201 (Created) atau 200 (OK)
   - **Response:** Lihat isinya, apakah ada error?
   - **Request Payload:** Data yang dikirim

**Jika tidak ada request:**
- Frontend tidak mengirim request
- Cek JavaScript error di Console tab
- Cek URL API di frontend

**Jika request ada tapi error:**
- Lihat response error
- Status code 422 = Validasi gagal
- Status code 500 = Server error
- Status code 404 = Route tidak ditemukan

---

### 2. Cek Log Laravel

**Buka file log:**
```
backend-servis/storage/logs/laravel.log
```

**Atau via terminal:**
```bash
cd backend-servis
tail -f storage/logs/laravel.log
```

**Cari log:**
- "Register attempt" - Request sampai ke controller
- "User created" - User berhasil dibuat
- "Registration error" - Ada error

---

### 3. Test API Langsung dengan cURL/Postman

**Test dengan cURL:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Jika berhasil:**
- Response akan berisi data user dan token
- Cek di phpMyAdmin, data harus masuk

**Jika error:**
- Lihat error message
- Fix sesuai error

---

### 4. Cek Database Connection

**Test koneksi:**
```bash
php artisan tinker
```

```php
// Test koneksi
\Illuminate\Support\Facades\DB::connection()->getPdo();

// Test insert manual
$user = \App\Models\User::create([
    'name' => 'Test Manual',
    'email' => 'manual@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'CUSTOMER',
]);

echo "User ID: " . $user->id;

// Cek di database
\App\Models\User::where('email', 'manual@test.com')->first();

exit
```

**Jika manual insert berhasil:**
- Database OK, masalahnya di API/Request

**Jika manual insert gagal:**
- Masalah database connection
- Cek `.env` file

---

### 5. Cek .env File

**Pastikan di `backend-servis/.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_elektronik  # Sesuai dengan database Anda
DB_USERNAME=root
DB_PASSWORD=
```

**Test koneksi:**
```bash
php artisan migrate:status
```

---

### 6. Cek Frontend API URL

**Jika frontend sudah diintegrasikan ke Laravel:**

Pastikan di `resources/js/services/api.js`:
```js
const API_BASE_URL = '/api'  // Relatif, karena sudah di Laravel
```

**Jika frontend masih terpisah:**

Pastikan di `frontend-web/src/services/api.js`:
```js
const API_BASE_URL = 'http://localhost:8000/api'
```

---

## 🐛 Kemungkinan Masalah & Solusi

### Masalah 1: Request Tidak Sampai ke Backend

**Gejala:**
- Network tab tidak ada request
- Error CORS di console

**Solusi:**
1. Pastikan Laravel server running: `php artisan serve`
2. Cek URL API di frontend
3. Cek CORS settings (jika frontend di domain berbeda)

---

### Masalah 2: Validasi Gagal

**Gejala:**
- Status code 422
- Response berisi validation errors

**Solusi:**
1. Lihat error di Network tab → Response
2. Pastikan semua field required sudah diisi
3. Pastikan format benar:
   - Email valid
   - Password min 8 karakter
   - Password confirmation match

---

### Masalah 3: Database Error

**Gejala:**
- Status code 500
- Log Laravel menampilkan database error

**Solusi:**
1. Cek koneksi database di `.env`
2. Pastikan tabel `users` sudah ada
3. Pastikan migration sudah dijalankan: `php artisan migrate`

---

### Masalah 4: Error Tidak Terlihat

**Gejala:**
- Request berhasil (200/201) tapi data tidak masuk
- Tidak ada error di response

**Solusi:**
1. Cek log Laravel untuk detail error
2. Pastikan tidak ada exception yang di-swallow
3. Cek apakah ada transaction rollback

---

## ✅ Quick Test

### Test 1: Manual Insert via Tinker

```bash
php artisan tinker
```

```php
$user = \App\Models\User::create([
    'name' => 'Test',
    'email' => 'test@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'role' => 'CUSTOMER',
]);
echo "Created: " . $user->id;
exit
```

**Cek di phpMyAdmin apakah data masuk.**

### Test 2: Test API dengan Postman/cURL

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","password_confirmation":"password123"}'
```

**Lihat response dan cek database.**

---

## 📝 Checklist Debug

- [ ] Laravel server running (`php artisan serve`)
- [ ] Database connection OK (cek `.env`)
- [ ] Tabel `users` sudah ada (cek phpMyAdmin)
- [ ] Request sampai ke backend (cek Network tab F12)
- [ ] Tidak ada error di response (cek Network tab)
- [ ] Log Laravel tidak ada error (cek `storage/logs/laravel.log`)
- [ ] Frontend mengirim request ke URL yang benar
- [ ] Tidak ada JavaScript error di Console

---

## 🔧 Perbaikan yang Sudah Ditambahkan

Saya sudah menambahkan:
1. ✅ **Error handling** lengkap di AuthController
2. ✅ **Logging** untuk tracking
3. ✅ **Error message** yang lebih jelas

**Sekarang coba:**
1. **Buka Browser F12 → Network tab**
2. **Coba registrasi lagi**
3. **Lihat request dan response**
4. **Cek log Laravel:** `storage/logs/laravel.log`

Dari situ kita bisa tahu masalahnya! 🔍






