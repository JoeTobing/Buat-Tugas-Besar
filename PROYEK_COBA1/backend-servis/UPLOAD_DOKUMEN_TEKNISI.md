# Fitur Upload Dokumen Teknisi

## 📋 Deskripsi

Fitur ini memungkinkan teknisi untuk mengupload dokumen KTP dan sertifikat keahlian saat pendaftaran.

## ✅ Fitur yang Ditambahkan

1. **Upload KTP** (Wajib)
   - Format: JPG, PNG, atau PDF
   - Maksimal ukuran: 5MB
   - Disimpan di: `storage/app/public/technicians/ktp/`

2. **Upload Sertifikat Keahlian** (Opsional)
   - Format: JPG, PNG, atau PDF
   - Maksimal ukuran: 5MB
   - Disimpan di: `storage/app/public/technicians/certificates/`

## 🗄️ Database

### Migration
File: `database/migrations/2025_12_02_100000_add_documents_to_technicians_table.php`

Menambahkan kolom:
- `ktp_url` (string, nullable) - URL file KTP
- `certificate_url` (string, nullable) - URL file sertifikat

### Model
File: `app/Models/Technician.php`

Field `ktp_url` dan `certificate_url` sudah ditambahkan ke `$fillable`.

## 🔧 Backend Changes

### 1. Request Validation
File: `app/Http/Requests/RegisterTechnicianRequest.php`

```php
'ktp' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
'certificate' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
```

### 2. Controller
File: `app/Http/Controllers/AuthController.php`

File upload ditangani di method `registerTechnician()`:
- File disimpan menggunakan Laravel Storage
- Path disimpan di database sebagai URL relatif (`/storage/...`)

### 3. Resource
File: `app/Http/Resources/TechnicianResource.php`

Field `ktp_url` dan `certificate_url` sudah ditambahkan ke response.

## 🎨 Frontend Changes

### 1. Form Upload
File: `frontend-web/src/pages/auth/RegisterTechnician.jsx`

- Menambahkan input file untuk KTP (wajib)
- Menambahkan input file untuk sertifikat (opsional)
- Preview nama file setelah dipilih
- Validasi file sebelum submit

### 2. API Service
File: `frontend-web/src/services/api.js`

- Update interceptor untuk handle FormData
- Tidak set `Content-Type` header jika data adalah FormData (biarkan browser set dengan boundary)

## 📝 Cara Menggunakan

### 1. Setup Storage Link

Pastikan storage link sudah dibuat:
```bash
cd backend-servis
php artisan storage:link
```

Ini akan membuat symlink dari `public/storage` ke `storage/app/public`.

### 2. Test Upload

1. Buka halaman registrasi teknisi
2. Isi semua field yang diperlukan
3. Upload KTP (wajib)
4. Upload sertifikat (opsional)
5. Submit form

### 3. Cek File

File yang diupload akan tersimpan di:
- `backend-servis/storage/app/public/technicians/ktp/`
- `backend-servis/storage/app/public/technicians/certificates/`

Dan bisa diakses via URL:
- `http://localhost:8000/storage/technicians/ktp/{filename}`
- `http://localhost:8000/storage/technicians/certificates/{filename}`

## 🔍 Cek di Database

Setelah registrasi, cek di tabel `technicians`:
- Kolom `ktp_url` berisi path file KTP
- Kolom `certificate_url` berisi path file sertifikat (jika diupload)

## ⚠️ Catatan Penting

1. **Storage Link**: Pastikan sudah menjalankan `php artisan storage:link` agar file bisa diakses via URL.

2. **Permissions**: Pastikan folder `storage/app/public` memiliki permission write.

3. **File Size**: Maksimal ukuran file adalah 5MB. Jika perlu lebih besar, ubah di:
   - Backend: `RegisterTechnicianRequest.php` (rule `max:5120`)
   - Frontend: Validasi di form (opsional)

4. **File Types**: Hanya menerima JPG, PNG, dan PDF. Jika perlu format lain, ubah di:
   - Backend: `RegisterTechnicianRequest.php` (rule `mimes:jpg,jpeg,png,pdf`)

## 🐛 Troubleshooting

### File tidak bisa diakses via URL
- Pastikan sudah menjalankan `php artisan storage:link`
- Cek apakah symlink `public/storage` sudah ada
- Pastikan web server bisa mengakses folder `public`

### Upload gagal
- Cek permission folder `storage/app/public`
- Cek ukuran file (max 5MB)
- Cek format file (hanya JPG, PNG, PDF)
- Cek log Laravel: `storage/logs/laravel.log`

### File tidak tersimpan
- Cek disk space
- Cek permission folder
- Cek log Laravel untuk error detail




