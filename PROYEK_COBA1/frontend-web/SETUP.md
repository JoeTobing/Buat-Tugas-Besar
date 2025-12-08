# Setup Frontend Web

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Edit `.env` dan pastikan API URL sudah benar:
```
VITE_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## Build for Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## Requirements

- Node.js >= 16
- npm atau yarn
- Backend API harus running di `http://localhost:8000`

## Features

✅ Authentication (Login, Register Customer, Register Technician)
✅ Pencarian Teknisi dengan Filter
✅ Manajemen Order
✅ Chat
✅ Negosiasi Harga
✅ Pembayaran & Review
✅ Riwayat Order
✅ Notifikasi
✅ Admin Panel

## Troubleshooting

### Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: API connection failed
- Pastikan backend API sudah running
- Cek `.env` file, pastikan `VITE_API_URL` benar
- Cek CORS settings di backend

### Port already in use
Edit `vite.config.js` dan ubah port:
```js
server: {
  port: 3001, // atau port lain
}
```





## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Edit `.env` dan pastikan API URL sudah benar:
```
VITE_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## Build for Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## Requirements

- Node.js >= 16
- npm atau yarn
- Backend API harus running di `http://localhost:8000`

## Features

✅ Authentication (Login, Register Customer, Register Technician)
✅ Pencarian Teknisi dengan Filter
✅ Manajemen Order
✅ Chat
✅ Negosiasi Harga
✅ Pembayaran & Review
✅ Riwayat Order
✅ Notifikasi
✅ Admin Panel

## Troubleshooting

### Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: API connection failed
- Pastikan backend API sudah running
- Cek `.env` file, pastikan `VITE_API_URL` benar
- Cek CORS settings di backend

### Port already in use
Edit `vite.config.js` dan ubah port:
```js
server: {
  port: 3001, // atau port lain
}
```








