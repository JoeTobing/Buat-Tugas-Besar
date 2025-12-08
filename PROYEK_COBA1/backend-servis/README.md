# Backend API - Aplikasi Servis Alat Elektronik

Backend API untuk aplikasi servis alat elektronik on-demand menggunakan Laravel 12 dengan Sanctum authentication.

## Fitur

- ✅ Authentication & Authorization (Customer, Technician, Admin)
- ✅ Manajemen Profil User & Teknisi
- ✅ Pencarian Teknisi dengan Filter (Kategori, Lokasi, Rating)
- ✅ Manajemen Order (Create, Accept, Reject, Start, Complete, Cancel)
- ✅ Chat antara Customer dan Technician
- ✅ Negosiasi Harga (Tawar-menawar)
- ✅ Manajemen Pembayaran
- ✅ Review & Rating
- ✅ Notifikasi
- ✅ Admin Panel (Verifikasi Teknisi, Monitoring)

## Requirements

- PHP >= 8.2
- Composer
- MySQL/PostgreSQL/SQLite
- Laravel 12

## Installation

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure database di `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=servis_elektronik
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations:
```bash
php artisan migrate
```

6. (Optional) Publish Sanctum config:
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

7. Start development server:
```bash
php artisan serve
```

API akan tersedia di `http://localhost:8000/api`

## Database Structure

### Tables:
- `users` - User accounts (Customer, Technician, Admin)
- `technicians` - Technician profiles
- `services` - Service listings per technician
- `orders` - Service orders
- `order_photos` - Photos attached to orders
- `chats` - Chat messages
- `negotiations` - Price negotiations
- `payments` - Payment records
- `reviews` - Customer reviews
- `notifications` - User notifications

## API Documentation

Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk dokumentasi lengkap semua endpoint.

## Testing

Untuk testing API, kamu bisa menggunakan:
- Postman
- Insomnia
- cURL
- Aplikasi Android yang akan dibuat

## Default Admin

Untuk membuat admin user pertama, jalankan:
```bash
php artisan tinker
```

Kemudian:
```php
$user = \App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'role' => 'ADMIN',
]);
```

## File Upload

Saat ini, foto order dikirim sebagai URL string. Untuk implementasi upload file:

1. Setup storage:
```bash
php artisan storage:link
```

2. Gunakan Laravel Storage untuk handle upload:
```php
$path = $request->file('photo')->store('order-photos', 'public');
```

3. Update `CreateOrderRequest` untuk accept file upload

## Notes

- Pastikan CORS sudah dikonfigurasi jika frontend di domain berbeda
- Untuk production, update `APP_ENV=production` dan `APP_DEBUG=false`
- Setup queue worker untuk notifikasi real-time (opsional)
- Setup FCM untuk push notification ke Android (opsional)

## License

MIT


7. Start development server:
```bash
php artisan serve
```

API akan tersedia di `http://localhost:8000/api`

## Database Structure

### Tables:
- `users` - User accounts (Customer, Technician, Admin)
- `technicians` - Technician profiles
- `services` - Service listings per technician
- `orders` - Service orders
- `order_photos` - Photos attached to orders
- `chats` - Chat messages
- `negotiations` - Price negotiations
- `payments` - Payment records
- `reviews` - Customer reviews
- `notifications` - User notifications

## API Documentation

Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk dokumentasi lengkap semua endpoint.

## Testing

Untuk testing API, kamu bisa menggunakan:
- Postman
- Insomnia
- cURL
- Aplikasi Android yang akan dibuat

## Default Admin

Untuk membuat admin user pertama, jalankan:
```bash
php artisan tinker
```

Kemudian:
```php
$user = \App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password'),
    'role' => 'ADMIN',
]);
```

## File Upload

Saat ini, foto order dikirim sebagai URL string. Untuk implementasi upload file:

1. Setup storage:
```bash
php artisan storage:link
```

2. Gunakan Laravel Storage untuk handle upload:
```php
$path = $request->file('photo')->store('order-photos', 'public');
```

3. Update `CreateOrderRequest` untuk accept file upload

## Notes

- Pastikan CORS sudah dikonfigurasi jika frontend di domain berbeda
- Untuk production, update `APP_ENV=production` dan `APP_DEBUG=false`
- Setup queue worker untuk notifikasi real-time (opsional)
- Setup FCM untuk push notification ke Android (opsional)

## License

MIT
