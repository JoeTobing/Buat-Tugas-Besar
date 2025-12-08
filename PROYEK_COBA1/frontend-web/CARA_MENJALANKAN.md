# 🚀 Cara Menjalankan Frontend

## ⚠️ Error: ERR_CONNECTION_REFUSED

Error ini muncul karena **server Vite belum berjalan**. Anda perlu menjalankan server terlebih dahulu sebelum membuka browser.

---

## 📋 Langkah-langkah Menjalankan Frontend

### 1. Buka Terminal/PowerShell

Buka terminal baru (PowerShell atau Command Prompt).

### 2. Masuk ke Folder Frontend

```powershell
cd "D:\FALIQ\KULIAH\MATKUL\SEMESTER 3\RPL\PROYEK_COBA1\frontend-web"
```

Atau jika sudah di folder project:
```powershell
cd frontend-web
```

### 3. Pastikan Dependencies Sudah Terinstall

```powershell
npm install
```

**Tunggu sampai selesai** (akan muncul "added X packages").

### 4. Buat File .env (Jika Belum Ada)

Buat file `.env` di folder `frontend-web` dengan isi:

```
VITE_API_URL=http://localhost:8000/api
```

**Cara membuat via PowerShell:**
```powershell
echo VITE_API_URL=http://localhost:8000/api > .env
```

### 5. Jalankan Development Server

```powershell
npm run dev
```

**Output yang diharapkan:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 6. Buka Browser

Setelah melihat output di atas, **baru buka browser** dan akses:
```
http://localhost:3000
```

---

## ⚠️ Penting!

1. **Jangan tutup terminal** saat server berjalan
2. **Server harus tetap running** agar frontend bisa diakses
3. **Untuk stop server**, tekan `Ctrl + C` di terminal

---

## 🔄 Jika Masih Error

### Error: "npm is not recognized"
**Solusi:** Install Node.js dari https://nodejs.org/

### Error: "Cannot find module"
**Solusi:**
```powershell
npm install
```

### Error: "Port 3000 already in use"
**Solusi:** 
1. Tutup aplikasi lain yang menggunakan port 3000
2. Atau edit `vite.config.js` dan ubah port ke 3001

### Error saat `npm run dev`
**Solusi:**
1. Pastikan semua dependencies terinstall: `npm install`
2. Cek apakah ada error di terminal
3. Pastikan file `vite.config.js` sudah benar (tidak ada duplikasi)

---

## ✅ Checklist

Sebelum membuka browser, pastikan:

- [ ] Terminal sudah dibuka
- [ ] Sudah masuk ke folder `frontend-web`
- [ ] `npm install` sudah dijalankan
- [ ] File `.env` sudah dibuat
- [ ] `npm run dev` sudah dijalankan
- [ ] Terminal menampilkan "Local: http://localhost:3000/"
- [ ] Terminal **TIDAK ditutup**

---

## 🎯 Quick Start

```powershell
# 1. Masuk ke folder frontend-web
cd frontend-web

# 2. Install dependencies (jika belum)
npm install

# 3. Buat file .env (jika belum ada)
echo VITE_API_URL=http://localhost:8000/api > .env

# 4. Jalankan server
npm run dev

# 5. Buka browser: http://localhost:3000
```

---

**Ingat:** Server harus **tetap running** di terminal agar frontend bisa diakses!


