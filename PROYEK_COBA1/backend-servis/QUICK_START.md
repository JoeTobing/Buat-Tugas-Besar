# Quick Start - Setup Database & Lihat Data

## Langkah Cepat Setup Database

### 1. Setup Environment
```bash
cd backend-servis
cp .env.example .env
php artisan key:generate
```

### 2. Pilih Database

#### Opsi A: SQLite (Paling Mudah - Tidak perlu setup server)
Edit `.env`:
```env
DB_CONNECTION=sqlite
# Comment atau hapus baris DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
```

Buat file database:
```bash
touch database/database.sqlite
```

#### Opsi B: MySQL (Jika sudah punya MySQL server)
Edit `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

Buat database di MySQL:
```sql
CREATE DATABASE servis_elektronik;
```

### 3. Run Migrations
```bash
php artisan migrate
```

### 4. Seed Sample Data (Optional)
```bash
php artisan db:seed --class=SampleDataSeeder
```

Ini akan membuat:
- 1 Admin user
- 1 Customer user
- 1 Technician user (verified)
- Sample orders, payments, reviews, chats, dll.

**Login credentials:**
- Admin: `admin@example.com` / `admin123`
- Customer: `budi@example.com` / `password123`
- Technician: `andi@example.com` / `password123`

---

## Cara Melihat Database

### 1. Menggunakan Tinker (Terminal)
```bash
php artisan tinker
```

Contoh query:
```php
// Lihat semua users
\App\Models\User::all();

// Lihat semua orders
\App\Models\Order::with(['customer', 'technician'])->get();

// Lihat detail user
$user = \App\Models\User::find(1);
$user->load('technician');
$user;

// Exit
exit
```

### 2. Menggunakan Database Client

#### Untuk SQLite:
**DB Browser for SQLite** (Recommended)
1. Download: https://sqlitebrowser.org/
2. Install
3. Open Database → pilih `backend-servis/database/database.sqlite`

#### Untuk MySQL:
**phpMyAdmin** (Jika pakai XAMPP/Laragon)
1. Buka: `http://localhost/phpmyadmin`
2. Login
3. Pilih database `servis_elektronik`

**MySQL Workbench**
1. Download: https://dev.mysql.com/downloads/workbench/
2. Buat connection baru dengan credentials dari `.env`
3. Connect

**DBeaver** (Universal - Support SQLite & MySQL)
1. Download: https://dbeaver.io/download/
2. Install
3. New Connection → pilih SQLite atau MySQL
4. Connect

---

## Test API

### 1. Start Server
```bash
php artisan serve
```

### 2. Test dengan cURL atau Postman

**Register Customer:**
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

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "budi@example.com",
    "password": "password123"
  }'
```

**Get Technicians:**
```bash
curl -X GET http://localhost:8000/api/technicians
```

**Get Orders (dengan token):**
```bash
curl -X GET http://localhost:8000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### Error: "SQLSTATE[HY000] [2002] Connection refused"
- Pastikan MySQL server berjalan
- Atau gunakan SQLite (lebih mudah)

### Error: "Database does not exist"
- Buat database dulu di MySQL
- Atau pastikan file `database.sqlite` sudah dibuat

### Error: "Class not found"
```bash
composer dump-autoload
```

### Error: "Route not found"
- Pastikan sudah run: `php artisan serve`
- Cek `routes/api.php` sudah ada

---

## Next Steps

1. ✅ Database sudah setup
2. ✅ Sample data sudah di-seed
3. ✅ Server sudah running
4. 📱 Mulai develop Android app
5. 🌐 Atau mulai develop web frontend

Lihat `API_DOCUMENTATION.md` untuk semua endpoint yang tersedia!





## Langkah Cepat Setup Database

### 1. Setup Environment
```bash
cd backend-servis
cp .env.example .env
php artisan key:generate
```

### 2. Pilih Database

#### Opsi A: SQLite (Paling Mudah - Tidak perlu setup server)
Edit `.env`:
```env
DB_CONNECTION=sqlite
# Comment atau hapus baris DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
```

Buat file database:
```bash
touch database/database.sqlite
```

#### Opsi B: MySQL (Jika sudah punya MySQL server)
Edit `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

Buat database di MySQL:
```sql
CREATE DATABASE servis_elektronik;
```

### 3. Run Migrations
```bash
php artisan migrate
```

### 4. Seed Sample Data (Optional)
```bash
php artisan db:seed --class=SampleDataSeeder
```

Ini akan membuat:
- 1 Admin user
- 1 Customer user
- 1 Technician user (verified)
- Sample orders, payments, reviews, chats, dll.

**Login credentials:**
- Admin: `admin@example.com` / `admin123`
- Customer: `budi@example.com` / `password123`
- Technician: `andi@example.com` / `password123`

---

## Cara Melihat Database

### 1. Menggunakan Tinker (Terminal)
```bash
php artisan tinker
```

Contoh query:
```php
// Lihat semua users
\App\Models\User::all();

// Lihat semua orders
\App\Models\Order::with(['customer', 'technician'])->get();

// Lihat detail user
$user = \App\Models\User::find(1);
$user->load('technician');
$user;

// Exit
exit
```

### 2. Menggunakan Database Client

#### Untuk SQLite:
**DB Browser for SQLite** (Recommended)
1. Download: https://sqlitebrowser.org/
2. Install
3. Open Database → pilih `backend-servis/database/database.sqlite`

#### Untuk MySQL:
**phpMyAdmin** (Jika pakai XAMPP/Laragon)
1. Buka: `http://localhost/phpmyadmin`
2. Login
3. Pilih database `servis_elektronik`

**MySQL Workbench**
1. Download: https://dev.mysql.com/downloads/workbench/
2. Buat connection baru dengan credentials dari `.env`
3. Connect

**DBeaver** (Universal - Support SQLite & MySQL)
1. Download: https://dbeaver.io/download/
2. Install
3. New Connection → pilih SQLite atau MySQL
4. Connect

---

## Test API

### 1. Start Server
```bash
php artisan serve
```

### 2. Test dengan cURL atau Postman

**Register Customer:**
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

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "budi@example.com",
    "password": "password123"
  }'
```

**Get Technicians:**
```bash
curl -X GET http://localhost:8000/api/technicians
```

**Get Orders (dengan token):**
```bash
curl -X GET http://localhost:8000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### Error: "SQLSTATE[HY000] [2002] Connection refused"
- Pastikan MySQL server berjalan
- Atau gunakan SQLite (lebih mudah)

### Error: "Database does not exist"
- Buat database dulu di MySQL
- Atau pastikan file `database.sqlite` sudah dibuat

### Error: "Class not found"
```bash
composer dump-autoload
```

### Error: "Route not found"
- Pastikan sudah run: `php artisan serve`
- Cek `routes/api.php` sudah ada

---

## Next Steps

1. ✅ Database sudah setup
2. ✅ Sample data sudah di-seed
3. ✅ Server sudah running
4. 📱 Mulai develop Android app
5. 🌐 Atau mulai develop web frontend

Lihat `API_DOCUMENTATION.md` untuk semua endpoint yang tersedia!








