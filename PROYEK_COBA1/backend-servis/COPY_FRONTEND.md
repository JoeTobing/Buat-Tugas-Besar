# Cara Copy Frontend React ke Laravel Resources

## Langkah-langkah:

### 1. Install Dependencies React di Laravel

```bash
cd backend-servis
npm install react react-dom react-router-dom axios lucide-react
npm install -D @vitejs/plugin-react @types/react @types/react-dom
```

### 2. Copy File-File React

**Copy dari `frontend-web/src/` ke `backend-servis/resources/js/`:**

Struktur yang perlu di-copy:
- `src/components/` → `resources/js/components/`
- `src/pages/` → `resources/js/pages/`
- `src/contexts/` → `resources/js/contexts/`
- `src/services/` → `resources/js/services/`
- `src/utils/` → `resources/js/utils/`
- `src/index.css` → `resources/css/app.css` (merge dengan yang sudah ada)

### 3. Update API Base URL

Di semua file service (`resources/js/services/*.js`), pastikan base URL:
```js
const API_BASE_URL = '/api'  // Relatif, karena sudah di Laravel
```

### 4. Update vite.config.js

Sudah di-update untuk support React.

### 5. Update resources/js/app.jsx

Sudah dibuat untuk render React app.

### 6. Update resources/views/app.blade.php

Sudah dibuat untuk serve React app.

### 7. Jalankan

```bash
# Development
npm run dev

# Atau build untuk production
npm run build
```

Laravel akan serve React app di semua route (kecuali `/api/*`).

---

## Quick Copy Script (PowerShell)

Jalankan di PowerShell dari folder `backend-servis`:

```powershell
# Copy components
Copy-Item -Path "..\frontend-web\src\components\*" -Destination "resources\js\components\" -Recurse -Force

# Copy pages
Copy-Item -Path "..\frontend-web\src\pages\*" -Destination "resources\js\pages\" -Recurse -Force

# Copy contexts
Copy-Item -Path "..\frontend-web\src\contexts\*" -Destination "resources\js\contexts\" -Recurse -Force

# Copy services
Copy-Item -Path "..\frontend-web\src\services\*" -Destination "resources\js\services\" -Recurse -Force

# Copy utils
Copy-Item -Path "..\frontend-web\src\utils\*" -Destination "resources\js\utils\" -Recurse -Force

# Copy CSS (merge manual)
Copy-Item -Path "..\frontend-web\src\index.css" -Destination "resources\css\app.css" -Force
```

---

## Update API Service

Setelah copy, update `resources/js/services/api.js`:

```js
const API_BASE_URL = '/api'  // Relatif karena sudah di Laravel
```

Atau bisa juga tetap pakai:
```js
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
```

---

## Setelah Copy

1. Install dependencies: `npm install`
2. Jalankan: `npm run dev`
3. Buka: `http://localhost:8000`

Frontend React akan terintegrasi dengan Laravel!




## Langkah-langkah:

### 1. Install Dependencies React di Laravel

```bash
cd backend-servis
npm install react react-dom react-router-dom axios lucide-react
npm install -D @vitejs/plugin-react @types/react @types/react-dom
```

### 2. Copy File-File React

**Copy dari `frontend-web/src/` ke `backend-servis/resources/js/`:**

Struktur yang perlu di-copy:
- `src/components/` → `resources/js/components/`
- `src/pages/` → `resources/js/pages/`
- `src/contexts/` → `resources/js/contexts/`
- `src/services/` → `resources/js/services/`
- `src/utils/` → `resources/js/utils/`
- `src/index.css` → `resources/css/app.css` (merge dengan yang sudah ada)

### 3. Update API Base URL

Di semua file service (`resources/js/services/*.js`), pastikan base URL:
```js
const API_BASE_URL = '/api'  // Relatif, karena sudah di Laravel
```

### 4. Update vite.config.js

Sudah di-update untuk support React.

### 5. Update resources/js/app.jsx

Sudah dibuat untuk render React app.

### 6. Update resources/views/app.blade.php

Sudah dibuat untuk serve React app.

### 7. Jalankan

```bash
# Development
npm run dev

# Atau build untuk production
npm run build
```

Laravel akan serve React app di semua route (kecuali `/api/*`).

---

## Quick Copy Script (PowerShell)

Jalankan di PowerShell dari folder `backend-servis`:

```powershell
# Copy components
Copy-Item -Path "..\frontend-web\src\components\*" -Destination "resources\js\components\" -Recurse -Force

# Copy pages
Copy-Item -Path "..\frontend-web\src\pages\*" -Destination "resources\js\pages\" -Recurse -Force

# Copy contexts
Copy-Item -Path "..\frontend-web\src\contexts\*" -Destination "resources\js\contexts\" -Recurse -Force

# Copy services
Copy-Item -Path "..\frontend-web\src\services\*" -Destination "resources\js\services\" -Recurse -Force

# Copy utils
Copy-Item -Path "..\frontend-web\src\utils\*" -Destination "resources\js\utils\" -Recurse -Force

# Copy CSS (merge manual)
Copy-Item -Path "..\frontend-web\src\index.css" -Destination "resources\css\app.css" -Force
```

---

## Update API Service

Setelah copy, update `resources/js/services/api.js`:

```js
const API_BASE_URL = '/api'  // Relatif karena sudah di Laravel
```

Atau bisa juga tetap pakai:
```js
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
```

---

## Setelah Copy

1. Install dependencies: `npm install`
2. Jalankan: `npm run dev`
3. Buka: `http://localhost:8000`

Frontend React akan terintegrasi dengan Laravel!







