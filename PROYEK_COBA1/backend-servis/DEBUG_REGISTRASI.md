# Debug: Kenapa Data Registrasi Tidak Masuk ke Database

## 🔍 Langkah-langkah Debug

### 1. Cek Apakah Request Sampai ke Backend

**Buka browser Developer Tools (F12):**
1. Buka tab **"Network"**
2. Coba registrasi lagi
3. Lihat apakah ada request ke `/api/auth/register`
4. Klik request tersebut dan lihat:
   - **Status Code** (harus 201 atau 200)
   - **Response** (lihat isinya)
   - **Request Payload** (data yang dikirim)

### 2. Cek Log Laravel

**Buka file log:**
```bash
cd backend-servis
tail -f storage/logs/laravel.log
```

Atau buka file: `backend-servis/storage/logs/laravel.log`

**Cari log dengan keyword:**
- "Register attempt"
- "User created"
- "Registration error"

### 3. Cek Database Connection

**Test koneksi database:**
```bash
php artisan tinker
```

```php
\Illuminate\Support\Facades\DB::connection()->getPdo();
// Harus return: PDO object (berarti koneksi OK)

// Test insert manual
\App\Models\User::create([
    'name' => 'Test',
    'email' => 'test@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'role' => 'CUSTOMER',
]);

// Cek apakah masuk
\App\Models\User::where('email', 'test@test.com')->first();
exit
```

### 4. Cek Error di Browser Console

**Buka browser Console (F12 → Console tab):**
- Lihat apakah ada error JavaScript
- Lihat apakah ada error network

### 5. Cek Response API

**Test dengan cURL atau Postman:**

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

Lihat response-nya. Jika error, akan muncul pesan error.

---

## 🐛 Kemungkinan Masalah

### 1. Request Tidak Sampai ke Backend

**Gejala:**
- Network tab tidak ada request ke `/api/auth/register`
- Error CORS di console

**Solusi:**
- Cek apakah Laravel server running: `php artisan serve`
- Cek CORS settings di Laravel
- Cek URL API di frontend (harus `http://localhost:8000/api`)

### 2. Validasi Gagal

**Gejala:**
- Request sampai tapi return error 422
- Response berisi validation errors

**Solusi:**
- Cek response error di Network tab
- Pastikan semua field required sudah diisi
- Pastikan format data benar (email valid, password match, dll)

### 3. Database Error

**Gejala:**
- Request sampai tapi return error 500
- Log Laravel menampilkan database error

**Solusi:**
- Cek koneksi database di `.env`
- Cek apakah tabel `users` sudah ada
- Cek apakah migration sudah dijalankan

### 4. Error Tidak Terlihat

**Gejala:**
- Request berhasil (status 200/201) tapi data tidak masuk
- Tidak ada error di response

**Solusi:**
- Cek log Laravel untuk detail error
- Pastikan tidak ada exception yang di-swallow
- Cek apakah ada transaction rollback

---

## ✅ Quick Fix

### Test Manual Insert

```bash
php artisan tinker
```

```php
$user = \App\Models\User::create([
    'name' => 'Test Manual',
    'email' => 'manual@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'CUSTOMER',
]);

echo "User ID: " . $user->id;
exit
```

Jika ini berhasil, berarti database OK, masalahnya di API/Request.

---

## 📝 Checklist

- [ ] Laravel server running (`php artisan serve`)
- [ ] Database connection OK (cek `.env`)
- [ ] Tabel `users` sudah ada (cek di phpMyAdmin)
- [ ] Request sampai ke backend (cek Network tab)
- [ ] Tidak ada error di response (cek Network tab)
- [ ] Log Laravel tidak ada error (cek `storage/logs/laravel.log`)
- [ ] Frontend mengirim request ke URL yang benar

---

## 🔧 Solusi yang Sudah Ditambahkan

Saya sudah menambahkan:
1. ✅ **Error handling** di AuthController
2. ✅ **Logging** untuk debug
3. ✅ **Error message** yang lebih jelas

Coba registrasi lagi dan:
1. Cek **Network tab** di browser (F12)
2. Cek **Log Laravel** (`storage/logs/laravel.log`)
3. Lihat **Response** dari API

Dari situ kita bisa tahu masalahnya di mana!



## 🔍 Langkah-langkah Debug

### 1. Cek Apakah Request Sampai ke Backend

**Buka browser Developer Tools (F12):**
1. Buka tab **"Network"**
2. Coba registrasi lagi
3. Lihat apakah ada request ke `/api/auth/register`
4. Klik request tersebut dan lihat:
   - **Status Code** (harus 201 atau 200)
   - **Response** (lihat isinya)
   - **Request Payload** (data yang dikirim)

### 2. Cek Log Laravel

**Buka file log:**
```bash
cd backend-servis
tail -f storage/logs/laravel.log
```

Atau buka file: `backend-servis/storage/logs/laravel.log`

**Cari log dengan keyword:**
- "Register attempt"
- "User created"
- "Registration error"

### 3. Cek Database Connection

**Test koneksi database:**
```bash
php artisan tinker
```

```php
\Illuminate\Support\Facades\DB::connection()->getPdo();
// Harus return: PDO object (berarti koneksi OK)

// Test insert manual
\App\Models\User::create([
    'name' => 'Test',
    'email' => 'test@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'role' => 'CUSTOMER',
]);

// Cek apakah masuk
\App\Models\User::where('email', 'test@test.com')->first();
exit
```

### 4. Cek Error di Browser Console

**Buka browser Console (F12 → Console tab):**
- Lihat apakah ada error JavaScript
- Lihat apakah ada error network

### 5. Cek Response API

**Test dengan cURL atau Postman:**

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

Lihat response-nya. Jika error, akan muncul pesan error.

---

## 🐛 Kemungkinan Masalah

### 1. Request Tidak Sampai ke Backend

**Gejala:**
- Network tab tidak ada request ke `/api/auth/register`
- Error CORS di console

**Solusi:**
- Cek apakah Laravel server running: `php artisan serve`
- Cek CORS settings di Laravel
- Cek URL API di frontend (harus `http://localhost:8000/api`)

### 2. Validasi Gagal

**Gejala:**
- Request sampai tapi return error 422
- Response berisi validation errors

**Solusi:**
- Cek response error di Network tab
- Pastikan semua field required sudah diisi
- Pastikan format data benar (email valid, password match, dll)

### 3. Database Error

**Gejala:**
- Request sampai tapi return error 500
- Log Laravel menampilkan database error

**Solusi:**
- Cek koneksi database di `.env`
- Cek apakah tabel `users` sudah ada
- Cek apakah migration sudah dijalankan

### 4. Error Tidak Terlihat

**Gejala:**
- Request berhasil (status 200/201) tapi data tidak masuk
- Tidak ada error di response

**Solusi:**
- Cek log Laravel untuk detail error
- Pastikan tidak ada exception yang di-swallow
- Cek apakah ada transaction rollback

---

## ✅ Quick Fix

### Test Manual Insert

```bash
php artisan tinker
```

```php
$user = \App\Models\User::create([
    'name' => 'Test Manual',
    'email' => 'manual@test.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'CUSTOMER',
]);

echo "User ID: " . $user->id;
exit
```

Jika ini berhasil, berarti database OK, masalahnya di API/Request.

---

## 📝 Checklist

- [ ] Laravel server running (`php artisan serve`)
- [ ] Database connection OK (cek `.env`)
- [ ] Tabel `users` sudah ada (cek di phpMyAdmin)
- [ ] Request sampai ke backend (cek Network tab)
- [ ] Tidak ada error di response (cek Network tab)
- [ ] Log Laravel tidak ada error (cek `storage/logs/laravel.log`)
- [ ] Frontend mengirim request ke URL yang benar

---

## 🔧 Solusi yang Sudah Ditambahkan

Saya sudah menambahkan:
1. ✅ **Error handling** di AuthController
2. ✅ **Logging** untuk debug
3. ✅ **Error message** yang lebih jelas

Coba registrasi lagi dan:
1. Cek **Network tab** di browser (F12)
2. Cek **Log Laravel** (`storage/logs/laravel.log`)
3. Lihat **Response** dari API

Dari situ kita bisa tahu masalahnya di mana!






