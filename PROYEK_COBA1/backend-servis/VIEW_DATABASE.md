# Cara Melihat Database

## 1. Menggunakan Laravel Tinker (Terminal)

Cara termudah untuk melihat data langsung dari terminal:

```bash
cd backend-servis
php artisan tinker
```

### Contoh Query di Tinker:

**Lihat semua users:**
```php
\App\Models\User::all();
```

**Lihat user dengan role tertentu:**
```php
\App\Models\User::where('role', 'CUSTOMER')->get();
```

**Lihat semua technicians:**
```php
\App\Models\Technician::with('user')->get();
```

**Lihat semua orders:**
```php
\App\Models\Order::with(['customer', 'technician'])->get();
```

**Lihat jumlah records per tabel:**
```php
\App\Models\User::count();
\App\Models\Order::count();
\App\Models\Technician::count();
```

**Lihat detail user:**
```php
$user = \App\Models\User::find(1);
$user;
```

**Exit tinker:**
```php
exit
```

---

## 2. Menggunakan Database Client (GUI)

### Jika menggunakan MySQL:

#### A. phpMyAdmin
1. Install XAMPP/WAMP/Laragon (sudah include phpMyAdmin)
2. Buka browser: `http://localhost/phpmyadmin`
3. Login dengan credentials dari `.env`
4. Pilih database `servis_elektronik`

#### B. MySQL Workbench
1. Download: https://dev.mysql.com/downloads/workbench/
2. Install dan buka
3. Buat connection baru:
   - Host: `127.0.0.1` (atau dari `.env`)
   - Port: `3306` (atau dari `.env`)
   - Username: dari `.env` (DB_USERNAME)
   - Password: dari `.env` (DB_PASSWORD)
4. Connect dan pilih database

#### C. DBeaver (Universal Database Tool)
1. Download: https://dbeaver.io/download/
2. Install dan buka
3. New Database Connection → MySQL
4. Isi credentials dari `.env`
5. Connect

### Jika menggunakan SQLite:

#### A. DB Browser for SQLite
1. Download: https://sqlitebrowser.org/
2. Install dan buka
3. Open Database → pilih file `database/database.sqlite` di folder `backend-servis`

#### B. VS Code Extension
1. Install extension "SQLite Viewer" di VS Code
2. Buka file `database/database.sqlite`
3. Bisa langsung lihat tabel dan data

---

## 3. Menggunakan Artisan Commands

### Lihat struktur tabel:
```bash
php artisan db:table users
```

### Lihat semua migrations:
```bash
php artisan migrate:status
```

### Refresh database (HATI-HATI: akan hapus semua data):
```bash
php artisan migrate:fresh
```

---

## 4. Membuat Seeder untuk Sample Data

Buat file seeder untuk populate database dengan data dummy:

```bash
php artisan make:seeder SampleDataSeeder
```

Kemudian edit file `database/seeders/SampleDataSeeder.php` dan jalankan:
```bash
php artisan db:seed --class=SampleDataSeeder
```

---

## 5. Menggunakan Query Builder di Controller (untuk debugging)

Bisa tambahkan di controller untuk debug:

```php
use Illuminate\Support\Facades\DB;

// Di method controller
$users = DB::table('users')->get();
dd($users);
```

---

## Rekomendasi

**Untuk Development:**
- **SQLite** + **DB Browser for SQLite** (paling mudah, tidak perlu setup server)
- Atau **MySQL** + **phpMyAdmin** (jika sudah pakai XAMPP/Laragon)

**Untuk Production:**
- **MySQL Workbench** atau **DBeaver** (lebih professional)

---

## Quick Setup SQLite (Paling Mudah)

1. Edit `.env`:
```env
DB_CONNECTION=sqlite
# Hapus atau comment DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
```

2. Pastikan file database ada:
```bash
touch database/database.sqlite
```

3. Run migrations:
```bash
php artisan migrate
```

4. Buka dengan DB Browser for SQLite:
   - File → Open Database
   - Pilih `backend-servis/database/database.sqlite`

---

## Tips

- **Jangan edit data langsung di database** saat development, gunakan seeder atau tinker
- **Backup database** sebelum migrate:fresh
- Gunakan **tinker** untuk quick check data
- Gunakan **database client** untuk melihat struktur dan relasi





## 1. Menggunakan Laravel Tinker (Terminal)

Cara termudah untuk melihat data langsung dari terminal:

```bash
cd backend-servis
php artisan tinker
```

### Contoh Query di Tinker:

**Lihat semua users:**
```php
\App\Models\User::all();
```

**Lihat user dengan role tertentu:**
```php
\App\Models\User::where('role', 'CUSTOMER')->get();
```

**Lihat semua technicians:**
```php
\App\Models\Technician::with('user')->get();
```

**Lihat semua orders:**
```php
\App\Models\Order::with(['customer', 'technician'])->get();
```

**Lihat jumlah records per tabel:**
```php
\App\Models\User::count();
\App\Models\Order::count();
\App\Models\Technician::count();
```

**Lihat detail user:**
```php
$user = \App\Models\User::find(1);
$user;
```

**Exit tinker:**
```php
exit
```

---

## 2. Menggunakan Database Client (GUI)

### Jika menggunakan MySQL:

#### A. phpMyAdmin
1. Install XAMPP/WAMP/Laragon (sudah include phpMyAdmin)
2. Buka browser: `http://localhost/phpmyadmin`
3. Login dengan credentials dari `.env`
4. Pilih database `servis_elektronik`

#### B. MySQL Workbench
1. Download: https://dev.mysql.com/downloads/workbench/
2. Install dan buka
3. Buat connection baru:
   - Host: `127.0.0.1` (atau dari `.env`)
   - Port: `3306` (atau dari `.env`)
   - Username: dari `.env` (DB_USERNAME)
   - Password: dari `.env` (DB_PASSWORD)
4. Connect dan pilih database

#### C. DBeaver (Universal Database Tool)
1. Download: https://dbeaver.io/download/
2. Install dan buka
3. New Database Connection → MySQL
4. Isi credentials dari `.env`
5. Connect

### Jika menggunakan SQLite:

#### A. DB Browser for SQLite
1. Download: https://sqlitebrowser.org/
2. Install dan buka
3. Open Database → pilih file `database/database.sqlite` di folder `backend-servis`

#### B. VS Code Extension
1. Install extension "SQLite Viewer" di VS Code
2. Buka file `database/database.sqlite`
3. Bisa langsung lihat tabel dan data

---

## 3. Menggunakan Artisan Commands

### Lihat struktur tabel:
```bash
php artisan db:table users
```

### Lihat semua migrations:
```bash
php artisan migrate:status
```

### Refresh database (HATI-HATI: akan hapus semua data):
```bash
php artisan migrate:fresh
```

---

## 4. Membuat Seeder untuk Sample Data

Buat file seeder untuk populate database dengan data dummy:

```bash
php artisan make:seeder SampleDataSeeder
```

Kemudian edit file `database/seeders/SampleDataSeeder.php` dan jalankan:
```bash
php artisan db:seed --class=SampleDataSeeder
```

---

## 5. Menggunakan Query Builder di Controller (untuk debugging)

Bisa tambahkan di controller untuk debug:

```php
use Illuminate\Support\Facades\DB;

// Di method controller
$users = DB::table('users')->get();
dd($users);
```

---

## Rekomendasi

**Untuk Development:**
- **SQLite** + **DB Browser for SQLite** (paling mudah, tidak perlu setup server)
- Atau **MySQL** + **phpMyAdmin** (jika sudah pakai XAMPP/Laragon)

**Untuk Production:**
- **MySQL Workbench** atau **DBeaver** (lebih professional)

---

## Quick Setup SQLite (Paling Mudah)

1. Edit `.env`:
```env
DB_CONNECTION=sqlite
# Hapus atau comment DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
```

2. Pastikan file database ada:
```bash
touch database/database.sqlite
```

3. Run migrations:
```bash
php artisan migrate
```

4. Buka dengan DB Browser for SQLite:
   - File → Open Database
   - Pilih `backend-servis/database/database.sqlite`

---

## Tips

- **Jangan edit data langsung di database** saat development, gunakan seeder atau tinker
- **Backup database** sebelum migrate:fresh
- Gunakan **tinker** untuk quick check data
- Gunakan **database client** untuk melihat struktur dan relasi








