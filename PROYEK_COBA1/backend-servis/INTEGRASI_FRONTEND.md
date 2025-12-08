# Integrasi Frontend React ke Laravel

## Opsi 1: Build React dan Serve dari Laravel (Recommended)

### Langkah-langkah:

1. **Build React App:**
   ```bash
   cd frontend-web
   npm run build
   ```
   Ini akan membuat folder `dist/` dengan file-file yang sudah di-compile.

2. **Copy hasil build ke Laravel public:**
   ```bash
   # Dari folder frontend-web
   # Copy semua isi folder dist/ ke backend-servis/public/
   xcopy /E /I dist\* ..\backend-servis\public\
   ```

3. **Update routes/web.php:**
   Semua route selain `/api/*` akan serve `index.html` dari React.

4. **Update vite.config.js di Laravel:**
   Atau gunakan Laravel Vite untuk compile React.

---

## Opsi 2: Setup Laravel Vite untuk Compile React (Lebih Baik)

### Langkah-langkah:

1. **Copy file React ke resources:**
   - Copy semua file dari `frontend-web/src/` ke `backend-servis/resources/js/`
   - Copy `index.html` dan ubah menjadi Blade template

2. **Install dependencies di Laravel:**
   ```bash
   cd backend-servis
   npm install react react-dom react-router-dom axios lucide-react
   npm install -D @vitejs/plugin-react
   ```

3. **Update vite.config.js:**
   Setup untuk compile React

4. **Update resources/js/app.js:**
   Import dan render React app

---

## Opsi 3: Serve React dari Public Folder (Paling Sederhana)

1. Build React: `npm run build` di folder frontend-web
2. Copy folder `dist/` ke `backend-servis/public/frontend/`
3. Update route untuk serve index.html

---

## Rekomendasi

**Gunakan Opsi 3** untuk kemudahan, atau **Opsi 2** untuk development yang lebih terintegrasi.




## Opsi 1: Build React dan Serve dari Laravel (Recommended)

### Langkah-langkah:

1. **Build React App:**
   ```bash
   cd frontend-web
   npm run build
   ```
   Ini akan membuat folder `dist/` dengan file-file yang sudah di-compile.

2. **Copy hasil build ke Laravel public:**
   ```bash
   # Dari folder frontend-web
   # Copy semua isi folder dist/ ke backend-servis/public/
   xcopy /E /I dist\* ..\backend-servis\public\
   ```

3. **Update routes/web.php:**
   Semua route selain `/api/*` akan serve `index.html` dari React.

4. **Update vite.config.js di Laravel:**
   Atau gunakan Laravel Vite untuk compile React.

---

## Opsi 2: Setup Laravel Vite untuk Compile React (Lebih Baik)

### Langkah-langkah:

1. **Copy file React ke resources:**
   - Copy semua file dari `frontend-web/src/` ke `backend-servis/resources/js/`
   - Copy `index.html` dan ubah menjadi Blade template

2. **Install dependencies di Laravel:**
   ```bash
   cd backend-servis
   npm install react react-dom react-router-dom axios lucide-react
   npm install -D @vitejs/plugin-react
   ```

3. **Update vite.config.js:**
   Setup untuk compile React

4. **Update resources/js/app.js:**
   Import dan render React app

---

## Opsi 3: Serve React dari Public Folder (Paling Sederhana)

1. Build React: `npm run build` di folder frontend-web
2. Copy folder `dist/` ke `backend-servis/public/frontend/`
3. Update route untuk serve index.html

---

## Rekomendasi

**Gunakan Opsi 3** untuk kemudahan, atau **Opsi 2** untuk development yang lebih terintegrasi.







