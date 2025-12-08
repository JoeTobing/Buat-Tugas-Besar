# Cara Login sebagai Admin

## 📋 Informasi Login Admin

**Default Admin Credentials:**
- **Email:** `admin@example.com`
- **Password:** `admin123`

---

## 🚀 Cara 1: Login via Frontend Web

1. **Buka halaman login:**
   ```
   http://localhost:8000/login
   ```
   (atau URL frontend Anda)

2. **Masukkan credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Klik "Masuk"**

4. **Setelah login berhasil**, Anda akan diarahkan ke dashboard sesuai role:
   - Admin → `/admin` (Admin Dashboard)
   - Customer → `/` (Home)
   - Technician → `/` (Home)

---

## 🔧 Cara 2: Login via API (Postman/cURL)

### Menggunakan cURL:

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@example.com",
      "role": "ADMIN",
      ...
    },
    "token": "1|xxxxxxxxxxxxx"
  }
}
```

### Menggunakan Postman:

1. **Method:** POST
2. **URL:** `http://localhost:8000/api/auth/login`
3. **Headers:**
   - `Content-Type: application/json`
4. **Body (raw JSON):**
   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }
   ```

5. **Copy token** dari response untuk digunakan di request berikutnya

---

## 👤 Membuat Admin Baru

### Opsi 1: Menggunakan Seeder

```bash
cd backend-servis
php artisan db:seed --class=AdminSeeder
```

### Opsi 2: Manual via Tinker

```bash
cd backend-servis
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Admin Baru',
    'email' => 'admin2@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
    'role' => 'ADMIN',
    'is_active' => true,
]);
exit
```

### Opsi 3: Via phpMyAdmin

1. Buka phpMyAdmin
2. Pilih database `db_elektronik`
3. Buka tabel `users`
4. Klik "Insert"
5. Isi data:
   - `name`: Admin
   - `email`: admin@example.com
   - `password`: (gunakan bcrypt hash, atau buat via Laravel)
   - `role`: ADMIN
   - `is_active`: 1
   - `created_at`: (current timestamp)
   - `updated_at`: (current timestamp)

**Untuk password**, gunakan Laravel Tinker untuk generate hash:
```bash
php artisan tinker
\Illuminate\Support\Facades\Hash::make('admin123')
# Copy hasil hash tersebut
```

---

## ✅ Verifikasi Admin Sudah Ada

### Cek via Tinker:

```bash
cd backend-servis
php artisan tinker
```

```php
\App\Models\User::where('role', 'ADMIN')->get();
exit
```

### Cek via phpMyAdmin:

1. Buka phpMyAdmin
2. Pilih database `db_elektronik`
3. Buka tabel `users`
4. Cari user dengan `role = 'ADMIN'`

---

## 🔐 Mengubah Password Admin

### Via Tinker:

```bash
cd backend-servis
php artisan tinker
```

```php
$admin = \App\Models\User::where('email', 'admin@example.com')->first();
$admin->password = \Illuminate\Support\Facades\Hash::make('password_baru');
$admin->save();
exit
```

### Via phpMyAdmin:

1. Buka tabel `users`
2. Edit user admin
3. Generate password hash via Tinker (lihat di atas)
4. Paste hash ke kolom `password`
5. Save

---

## 🎯 Fitur Admin Dashboard

Setelah login sebagai admin, Anda bisa:

1. **Melihat semua teknisi:**
   - GET `/api/admin/technicians`

2. **Verifikasi teknisi:**
   - POST `/api/admin/technicians/{id}/verify`

3. **Update status user:**
   - PUT `/api/admin/users/{id}/status`

4. **Melihat semua order:**
   - GET `/api/admin/orders`

---

## ⚠️ Catatan Penting

1. **Default Password:** Pastikan mengubah password default setelah pertama kali login!

2. **Security:** Jangan commit file `.env` atau seeder dengan password production ke repository.

3. **Role Check:** Pastikan user memiliki `role = 'ADMIN'` di database.

4. **Active Status:** Pastikan `is_active = 1` (true) agar bisa login.

---

## 🐛 Troubleshooting

### Admin tidak bisa login

1. **Cek apakah admin sudah ada:**
   ```bash
   php artisan tinker
   \App\Models\User::where('email', 'admin@example.com')->first();
   ```

2. **Cek role:**
   - Pastikan `role = 'ADMIN'` (huruf besar semua)

3. **Cek is_active:**
   - Pastikan `is_active = 1` atau `true`

4. **Cek password:**
   - Pastikan password sudah di-hash dengan bcrypt
   - Coba reset password via Tinker

### Admin tidak muncul di frontend

1. **Cek route admin:**
   - Pastikan route `/admin` sudah ada di `App.jsx`

2. **Cek ProtectedRoute:**
   - Pastikan `requireRole="ADMIN"` sudah benar

3. **Cek token:**
   - Pastikan token masih valid
   - Coba logout dan login lagi

---

## 📝 Quick Reference

**Login Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**API Endpoint:**
- Login: `POST /api/auth/login`
- Get Profile: `GET /api/auth/me` (dengan token)
- Admin Dashboard: `GET /api/admin/*` (dengan token + role ADMIN)




