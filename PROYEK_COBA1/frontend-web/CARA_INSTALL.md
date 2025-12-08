# Cara Install & Menjalankan Frontend Web

## Langkah 1: Install Dependencies

Buka terminal/PowerShell di folder `frontend-web` dan jalankan:

```bash
npm install
```

**Penjelasan:**
- Command ini akan membaca file `package.json`
- Mengunduh semua dependencies yang diperlukan (React, Vite, Tailwind, dll)
- Proses ini mungkin memakan waktu beberapa menit
- Tunggu sampai selesai (akan muncul "added X packages")

**Jika error "npm is not recognized":**
- Install Node.js terlebih dahulu: https://nodejs.org/
- Pilih versi LTS (Long Term Support)
- Setelah install, restart terminal/PowerShell

---

## Langkah 2: Setup .env File

### Cara 1: Buat Manual

1. Buka folder `frontend-web`
2. Buat file baru dengan nama `.env` (tanpa ekstensi)
3. Isi dengan:

```
VITE_API_URL=http://localhost:8000/api
```

### Cara 2: Copy dari .env.example (jika ada)

```bash
copy .env.example .env
```

Kemudian edit file `.env` dan pastikan isinya:
```
VITE_API_URL=http://localhost:8000/api
```

**Catatan:**
- Pastikan backend Laravel sudah running di `http://localhost:8000`
- Jika backend di port lain, sesuaikan URL-nya

---

## Langkah 3: Jalankan Development Server

Setelah dependencies terinstall dan `.env` sudah dibuat, jalankan:

```bash
npm run dev
```

**Hasil yang diharapkan:**
- Terminal akan menampilkan:
  ```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ```
- Buka browser dan akses: `http://localhost:3000`

**Untuk stop server:**
- Tekan `Ctrl + C` di terminal

---

## Troubleshooting

### Error: "npm is not recognized"
**Solusi:**
1. Install Node.js dari https://nodejs.org/
2. Pilih versi LTS
3. Restart terminal/PowerShell
4. Cek dengan: `node --version` dan `npm --version`

### Error: "Cannot find module"
**Solusi:**
```bash
# Hapus node_modules dan package-lock.json
rm -r node_modules
rm package-lock.json

# Install ulang
npm install
```

### Error: "Port 3000 already in use"
**Solusi:**
1. Tutup aplikasi lain yang menggunakan port 3000
2. Atau edit `vite.config.js` dan ubah port:
   ```js
   server: {
     port: 3001, // atau port lain
   }
   ```

### Error: "API connection failed"
**Solusi:**
1. Pastikan backend Laravel sudah running:
   ```bash
   cd backend-servis
   php artisan serve
   ```
2. Cek file `.env` di frontend-web, pastikan URL benar
3. Pastikan backend bisa diakses di `http://localhost:8000`

### Error saat npm install (network/timeout)
**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
npm install
```

---

## Checklist Sebelum Menjalankan

- [ ] Node.js sudah terinstall (`node --version`)
- [ ] npm sudah terinstall (`npm --version`)
- [ ] Sudah masuk ke folder `frontend-web`
- [ ] File `.env` sudah dibuat dengan isi `VITE_API_URL=http://localhost:8000/api`
- [ ] Backend Laravel sudah running di `http://localhost:8000`
- [ ] Dependencies sudah terinstall (`npm install`)

---

## Quick Start (Copy-Paste)

```bash
# 1. Masuk ke folder frontend-web
cd frontend-web

# 2. Install dependencies
npm install

# 3. Buat file .env (jika belum ada)
echo VITE_API_URL=http://localhost:8000/api > .env

# 4. Jalankan development server
npm run dev
```

---

## Setelah Berhasil

1. Buka browser: `http://localhost:3000`
2. Halaman login akan muncul
3. Test dengan:
   - Register sebagai Customer
   - Register sebagai Technician
   - Login
   - Cari teknisi
   - Buat order
   - dll.

**Selamat! Frontend sudah siap digunakan!** 🎉





## Langkah 1: Install Dependencies

Buka terminal/PowerShell di folder `frontend-web` dan jalankan:

```bash
npm install
```

**Penjelasan:**
- Command ini akan membaca file `package.json`
- Mengunduh semua dependencies yang diperlukan (React, Vite, Tailwind, dll)
- Proses ini mungkin memakan waktu beberapa menit
- Tunggu sampai selesai (akan muncul "added X packages")

**Jika error "npm is not recognized":**
- Install Node.js terlebih dahulu: https://nodejs.org/
- Pilih versi LTS (Long Term Support)
- Setelah install, restart terminal/PowerShell

---

## Langkah 2: Setup .env File

### Cara 1: Buat Manual

1. Buka folder `frontend-web`
2. Buat file baru dengan nama `.env` (tanpa ekstensi)
3. Isi dengan:

```
VITE_API_URL=http://localhost:8000/api
```

### Cara 2: Copy dari .env.example (jika ada)

```bash
copy .env.example .env
```

Kemudian edit file `.env` dan pastikan isinya:
```
VITE_API_URL=http://localhost:8000/api
```

**Catatan:**
- Pastikan backend Laravel sudah running di `http://localhost:8000`
- Jika backend di port lain, sesuaikan URL-nya

---

## Langkah 3: Jalankan Development Server

Setelah dependencies terinstall dan `.env` sudah dibuat, jalankan:

```bash
npm run dev
```

**Hasil yang diharapkan:**
- Terminal akan menampilkan:
  ```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ```
- Buka browser dan akses: `http://localhost:3000`

**Untuk stop server:**
- Tekan `Ctrl + C` di terminal

---

## Troubleshooting

### Error: "npm is not recognized"
**Solusi:**
1. Install Node.js dari https://nodejs.org/
2. Pilih versi LTS
3. Restart terminal/PowerShell
4. Cek dengan: `node --version` dan `npm --version`

### Error: "Cannot find module"
**Solusi:**
```bash
# Hapus node_modules dan package-lock.json
rm -r node_modules
rm package-lock.json

# Install ulang
npm install
```

### Error: "Port 3000 already in use"
**Solusi:**
1. Tutup aplikasi lain yang menggunakan port 3000
2. Atau edit `vite.config.js` dan ubah port:
   ```js
   server: {
     port: 3001, // atau port lain
   }
   ```

### Error: "API connection failed"
**Solusi:**
1. Pastikan backend Laravel sudah running:
   ```bash
   cd backend-servis
   php artisan serve
   ```
2. Cek file `.env` di frontend-web, pastikan URL benar
3. Pastikan backend bisa diakses di `http://localhost:8000`

### Error saat npm install (network/timeout)
**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Install ulang
npm install
```

---

## Checklist Sebelum Menjalankan

- [ ] Node.js sudah terinstall (`node --version`)
- [ ] npm sudah terinstall (`npm --version`)
- [ ] Sudah masuk ke folder `frontend-web`
- [ ] File `.env` sudah dibuat dengan isi `VITE_API_URL=http://localhost:8000/api`
- [ ] Backend Laravel sudah running di `http://localhost:8000`
- [ ] Dependencies sudah terinstall (`npm install`)

---

## Quick Start (Copy-Paste)

```bash
# 1. Masuk ke folder frontend-web
cd frontend-web

# 2. Install dependencies
npm install

# 3. Buat file .env (jika belum ada)
echo VITE_API_URL=http://localhost:8000/api > .env

# 4. Jalankan development server
npm run dev
```

---

## Setelah Berhasil

1. Buka browser: `http://localhost:3000`
2. Halaman login akan muncul
3. Test dengan:
   - Register sebagai Customer
   - Register sebagai Technician
   - Login
   - Cari teknisi
   - Buat order
   - dll.

**Selamat! Frontend sudah siap digunakan!** 🎉








