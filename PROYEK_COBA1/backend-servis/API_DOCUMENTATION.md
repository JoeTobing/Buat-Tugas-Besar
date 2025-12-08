# API Documentation - Aplikasi Servis Alat Elektronik

## Base URL
```
http://localhost:8000/api
```

## Authentication
Semua endpoint yang memerlukan autentikasi menggunakan **Laravel Sanctum**. 
Tambahkan header berikut pada request:
```
Authorization: Bearer {token}
```

---

## Endpoints

### 1. Authentication

#### Register Customer
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "phone": "08123456789",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "08123456789",
      "role": "CUSTOMER"
    },
    "token": "1|xxxxxxxxxxxxx"
  }
}
```

#### Register Technician
```http
POST /auth/register-technician
```

**Request Body:**
```json
{
  "name": "Andi Teknisi",
  "email": "andi@example.com",
  "phone": "08123456780",
  "password": "password123",
  "password_confirmation": "password123",
  "shop_name": "Andi Service",
  "address": "Jl. Mawar No. 10",
  "category": "SMARTPHONE",
  "description": "Servis HP segala merk",
  "base_price": 50000,
  "latitude": -6.2,
  "longitude": 106.8
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /auth/logout
```
**Headers:** `Authorization: Bearer {token}`

#### Get Current User
```http
GET /auth/me
```
**Headers:** `Authorization: Bearer {token}`

---

### 2. Profile

#### Get Profile
```http
GET /profile
```

#### Update Profile
```http
PUT /profile
```

**Request Body:**
```json
{
  "name": "Budi Santoso Updated",
  "phone": "08123456789",
  "profile_photo_url": "https://example.com/photo.jpg"
}
```

#### Update Password
```http
PUT /profile/password
```

**Request Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword123",
  "new_password_confirmation": "newpassword123"
}
```

---

### 3. Technician

#### List Technicians (Public)
```http
GET /technicians
```

**Query Parameters:**
- `category` - Filter by category (COMPUTER, SMARTPHONE, HOME_APPLIANCE, OTHER)
- `lat` - Latitude for location filter
- `lng` - Longitude for location filter
- `radius` - Radius in km
- `sort` - Sort by: nearest, rating, price
- `page` - Page number

**Example:**
```
GET /technicians?category=SMARTPHONE&lat=-6.2&lng=106.8&radius=10&sort=nearest
```

#### Get Technician Detail
```http
GET /technicians/{id}
```

#### Get Technician Services
```http
GET /technicians/{id}/services
```

#### Update Technician Profile (Technician Only)
```http
PUT /technician/profile
```

**Request Body:**
```json
{
  "shop_name": "Andi Service Baru",
  "address": "Alamat baru",
  "category": "SMARTPHONE",
  "description": "Deskripsi baru",
  "base_price": 60000,
  "latitude": -6.21,
  "longitude": 106.81,
  "open_time": "09:00",
  "close_time": "17:00"
}
```

#### Update Technician Status (Technician Only)
```http
PUT /technician/status
```

**Request Body:**
```json
{
  "status": "AVAILABLE"
}
```
**Status values:** `AVAILABLE`, `ON_DUTY`, `OFFLINE`

---

### 4. Orders

#### Create Order (Customer Only)
```http
POST /orders
```

**Request Body:**
```json
{
  "technician_id": 1,
  "category": "SMARTPHONE",
  "device_model": "Samsung A50",
  "problem_description": "Layar retak",
  "service_type": "HOME_SERVICE",
  "address": "Jl. Mangga No. 5",
  "latitude": -6.2,
  "longitude": 106.8,
  "photos": [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg"
  ]
}
```

#### List Orders
```http
GET /orders
```

**Query Parameters:**
- `status` - Filter by status

**Note:** Returns orders based on user role (customer sees their orders, technician sees assigned orders)

#### Get Order Detail
```http
GET /orders/{id}
```

#### Accept Order (Technician Only)
```http
POST /orders/{id}/accept
```

#### Reject Order (Technician Only)
```http
POST /orders/{id}/reject
```

**Request Body:**
```json
{
  "reason": "Luar jangkauan"
}
```

#### Start Order (Technician Only)
```http
POST /orders/{id}/start
```

#### Complete Order (Technician Only)
```http
POST /orders/{id}/complete
```

#### Cancel Order
```http
POST /orders/{id}/cancel
```

**Request Body:**
```json
{
  "reason": "Pelanggan membatalkan"
}
```

#### Get Order History
```http
GET /me/orders/history
```

**Query Parameters:**
- `status` - Filter by status (COMPLETED, CANCELLED)

#### Get Invoice
```http
GET /me/orders/{id}/invoice
```

---

### 5. Chat

#### Get Chats
```http
GET /orders/{id}/chats
```

**Query Parameters:**
- `page` - Page number

#### Send Chat Message
```http
POST /orders/{id}/chats
```

**Request Body:**
```json
{
  "message": "Mas, kira-kira bisa selesai hari ini?",
  "attachment": null
}
```

---

### 6. Negotiation

#### Get Negotiations
```http
GET /orders/{id}/negotiations
```

#### Create Negotiation
```http
POST /orders/{id}/negotiations
```

**Request Body:**
```json
{
  "offered_price": 150000,
  "message": "Bisa 150 ribu saja?"
}
```

#### Accept Negotiation
```http
POST /orders/{id}/negotiations/{negotiationId}/accept
```

#### Reject Negotiation
```http
POST /orders/{id}/negotiations/{negotiationId}/reject
```

---

### 7. Payment

#### Get Payment
```http
GET /orders/{id}/payment
```

#### Create Payment (Technician/Admin Only)
```http
POST /orders/{id}/payment
```

**Request Body:**
```json
{
  "amount": 150000,
  "method": "CASH",
  "status": "PAID",
  "transaction_ref": "BuktiTransfer123"
}
```

**Method values:** `CASH`, `TRANSFER`, `EWALLET`, `OTHER`  
**Status values:** `UNPAID`, `PAID`, `FAILED`, `REFUNDED`

#### Update Payment (Technician/Admin Only)
```http
PUT /payments/{id}
```

---

### 8. Review

#### Create Review (Customer Only)
```http
POST /orders/{id}/review
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Pelayanan cepat dan ramah."
}
```

**Note:** Order must be COMPLETED and payment must be PAID

#### Get Technician Reviews (Public)
```http
GET /technicians/{id}/reviews
```

#### Get Technician Rating (Public)
```http
GET /technicians/{id}/rating
```

---

### 9. Notifications

#### Get Notifications
```http
GET /notifications
```

#### Mark Notification as Read
```http
POST /notifications/{id}/read
```

#### Mark All Notifications as Read
```http
POST /notifications/read-all
```

---

### 10. Admin

#### Get Technicians (Admin Only)
```http
GET /admin/technicians
```

**Query Parameters:**
- `verified` - Filter by verification status (true/false)

#### Verify Technician (Admin Only)
```http
POST /admin/technicians/{id}/verify
```

**Request Body:**
```json
{
  "verified": true
}
```

#### Update User Status (Admin Only)
```http
PUT /admin/users/{id}/status
```

**Request Body:**
```json
{
  "is_active": true
}
```

#### Get All Orders (Admin Only)
```http
GET /admin/orders
```

**Query Parameters:**
- `status` - Filter by status

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Error message 1", "Error message 2"]
  }
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## Order Status Flow

1. `PENDING` - Order dibuat, menunggu teknisi
2. `IN_NEGOTIATION` - Sedang negosiasi harga
3. `ACCEPTED` - Harga disepakati, siap dikerjakan
4. `ON_PROGRESS` - Sedang dikerjakan
5. `COMPLETED` - Selesai
6. `REJECTED` - Ditolak teknisi
7. `CANCELLED` - Dibatalkan

---

## Notes

- Semua endpoint yang memerlukan autentikasi harus menyertakan token di header
- Role-based access: beberapa endpoint hanya bisa diakses oleh role tertentu
- Foto dapat dikirim sebagai URL string (implementasi upload file dapat ditambahkan kemudian)
- Untuk production, pastikan menggunakan HTTPS
- Rate limiting dapat ditambahkan untuk keamanan





## Base URL
```
http://localhost:8000/api
```

## Authentication
Semua endpoint yang memerlukan autentikasi menggunakan **Laravel Sanctum**. 
Tambahkan header berikut pada request:
```
Authorization: Bearer {token}
```

---

## Endpoints

### 1. Authentication

#### Register Customer
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "phone": "08123456789",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "08123456789",
      "role": "CUSTOMER"
    },
    "token": "1|xxxxxxxxxxxxx"
  }
}
```

#### Register Technician
```http
POST /auth/register-technician
```

**Request Body:**
```json
{
  "name": "Andi Teknisi",
  "email": "andi@example.com",
  "phone": "08123456780",
  "password": "password123",
  "password_confirmation": "password123",
  "shop_name": "Andi Service",
  "address": "Jl. Mawar No. 10",
  "category": "SMARTPHONE",
  "description": "Servis HP segala merk",
  "base_price": 50000,
  "latitude": -6.2,
  "longitude": 106.8
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /auth/logout
```
**Headers:** `Authorization: Bearer {token}`

#### Get Current User
```http
GET /auth/me
```
**Headers:** `Authorization: Bearer {token}`

---

### 2. Profile

#### Get Profile
```http
GET /profile
```

#### Update Profile
```http
PUT /profile
```

**Request Body:**
```json
{
  "name": "Budi Santoso Updated",
  "phone": "08123456789",
  "profile_photo_url": "https://example.com/photo.jpg"
}
```

#### Update Password
```http
PUT /profile/password
```

**Request Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword123",
  "new_password_confirmation": "newpassword123"
}
```

---

### 3. Technician

#### List Technicians (Public)
```http
GET /technicians
```

**Query Parameters:**
- `category` - Filter by category (COMPUTER, SMARTPHONE, HOME_APPLIANCE, OTHER)
- `lat` - Latitude for location filter
- `lng` - Longitude for location filter
- `radius` - Radius in km
- `sort` - Sort by: nearest, rating, price
- `page` - Page number

**Example:**
```
GET /technicians?category=SMARTPHONE&lat=-6.2&lng=106.8&radius=10&sort=nearest
```

#### Get Technician Detail
```http
GET /technicians/{id}
```

#### Get Technician Services
```http
GET /technicians/{id}/services
```

#### Update Technician Profile (Technician Only)
```http
PUT /technician/profile
```

**Request Body:**
```json
{
  "shop_name": "Andi Service Baru",
  "address": "Alamat baru",
  "category": "SMARTPHONE",
  "description": "Deskripsi baru",
  "base_price": 60000,
  "latitude": -6.21,
  "longitude": 106.81,
  "open_time": "09:00",
  "close_time": "17:00"
}
```

#### Update Technician Status (Technician Only)
```http
PUT /technician/status
```

**Request Body:**
```json
{
  "status": "AVAILABLE"
}
```
**Status values:** `AVAILABLE`, `ON_DUTY`, `OFFLINE`

---

### 4. Orders

#### Create Order (Customer Only)
```http
POST /orders
```

**Request Body:**
```json
{
  "technician_id": 1,
  "category": "SMARTPHONE",
  "device_model": "Samsung A50",
  "problem_description": "Layar retak",
  "service_type": "HOME_SERVICE",
  "address": "Jl. Mangga No. 5",
  "latitude": -6.2,
  "longitude": 106.8,
  "photos": [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg"
  ]
}
```

#### List Orders
```http
GET /orders
```

**Query Parameters:**
- `status` - Filter by status

**Note:** Returns orders based on user role (customer sees their orders, technician sees assigned orders)

#### Get Order Detail
```http
GET /orders/{id}
```

#### Accept Order (Technician Only)
```http
POST /orders/{id}/accept
```

#### Reject Order (Technician Only)
```http
POST /orders/{id}/reject
```

**Request Body:**
```json
{
  "reason": "Luar jangkauan"
}
```

#### Start Order (Technician Only)
```http
POST /orders/{id}/start
```

#### Complete Order (Technician Only)
```http
POST /orders/{id}/complete
```

#### Cancel Order
```http
POST /orders/{id}/cancel
```

**Request Body:**
```json
{
  "reason": "Pelanggan membatalkan"
}
```

#### Get Order History
```http
GET /me/orders/history
```

**Query Parameters:**
- `status` - Filter by status (COMPLETED, CANCELLED)

#### Get Invoice
```http
GET /me/orders/{id}/invoice
```

---

### 5. Chat

#### Get Chats
```http
GET /orders/{id}/chats
```

**Query Parameters:**
- `page` - Page number

#### Send Chat Message
```http
POST /orders/{id}/chats
```

**Request Body:**
```json
{
  "message": "Mas, kira-kira bisa selesai hari ini?",
  "attachment": null
}
```

---

### 6. Negotiation

#### Get Negotiations
```http
GET /orders/{id}/negotiations
```

#### Create Negotiation
```http
POST /orders/{id}/negotiations
```

**Request Body:**
```json
{
  "offered_price": 150000,
  "message": "Bisa 150 ribu saja?"
}
```

#### Accept Negotiation
```http
POST /orders/{id}/negotiations/{negotiationId}/accept
```

#### Reject Negotiation
```http
POST /orders/{id}/negotiations/{negotiationId}/reject
```

---

### 7. Payment

#### Get Payment
```http
GET /orders/{id}/payment
```

#### Create Payment (Technician/Admin Only)
```http
POST /orders/{id}/payment
```

**Request Body:**
```json
{
  "amount": 150000,
  "method": "CASH",
  "status": "PAID",
  "transaction_ref": "BuktiTransfer123"
}
```

**Method values:** `CASH`, `TRANSFER`, `EWALLET`, `OTHER`  
**Status values:** `UNPAID`, `PAID`, `FAILED`, `REFUNDED`

#### Update Payment (Technician/Admin Only)
```http
PUT /payments/{id}
```

---

### 8. Review

#### Create Review (Customer Only)
```http
POST /orders/{id}/review
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Pelayanan cepat dan ramah."
}
```

**Note:** Order must be COMPLETED and payment must be PAID

#### Get Technician Reviews (Public)
```http
GET /technicians/{id}/reviews
```

#### Get Technician Rating (Public)
```http
GET /technicians/{id}/rating
```

---

### 9. Notifications

#### Get Notifications
```http
GET /notifications
```

#### Mark Notification as Read
```http
POST /notifications/{id}/read
```

#### Mark All Notifications as Read
```http
POST /notifications/read-all
```

---

### 10. Admin

#### Get Technicians (Admin Only)
```http
GET /admin/technicians
```

**Query Parameters:**
- `verified` - Filter by verification status (true/false)

#### Verify Technician (Admin Only)
```http
POST /admin/technicians/{id}/verify
```

**Request Body:**
```json
{
  "verified": true
}
```

#### Update User Status (Admin Only)
```http
PUT /admin/users/{id}/status
```

**Request Body:**
```json
{
  "is_active": true
}
```

#### Get All Orders (Admin Only)
```http
GET /admin/orders
```

**Query Parameters:**
- `status` - Filter by status

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["Error message 1", "Error message 2"]
  }
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## Order Status Flow

1. `PENDING` - Order dibuat, menunggu teknisi
2. `IN_NEGOTIATION` - Sedang negosiasi harga
3. `ACCEPTED` - Harga disepakati, siap dikerjakan
4. `ON_PROGRESS` - Sedang dikerjakan
5. `COMPLETED` - Selesai
6. `REJECTED` - Ditolak teknisi
7. `CANCELLED` - Dibatalkan

---

## Notes

- Semua endpoint yang memerlukan autentikasi harus menyertakan token di header
- Role-based access: beberapa endpoint hanya bisa diakses oleh role tertentu
- Foto dapat dikirim sebagai URL string (implementasi upload file dapat ditambahkan kemudian)
- Untuk production, pastikan menggunakan HTTPS
- Rate limiting dapat ditambahkan untuk keamanan








