<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Negotiation;
use App\Models\Order;
use App\Models\OrderPhoto;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Service;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'ADMIN',
            'is_active' => true,
        ]);

        // Create Customer
        $customer = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'phone' => '08123456789',
            'password' => Hash::make('password123'),
            'role' => 'CUSTOMER',
            'is_active' => true,
        ]);

        // Create Technician
        $technicianUser = User::create([
            'name' => 'Andi Teknisi',
            'email' => 'andi@example.com',
            'phone' => '08123456780',
            'password' => Hash::make('password123'),
            'role' => 'TECHNICIAN',
            'is_active' => true,
        ]);

        $technician = Technician::create([
            'user_id' => $technicianUser->id,
            'shop_name' => 'Andi Service Center',
            'address' => 'Jl. Mawar No. 10, Jakarta',
            'latitude' => -6.2088,
            'longitude' => 106.8456,
            'category' => 'SMARTPHONE',
            'description' => 'Servis HP segala merk, ganti layar, baterai, dll.',
            'base_price' => 50000,
            'status' => 'AVAILABLE',
            'verified' => true,
            'open_time' => '09:00',
            'close_time' => '17:00',
            'rating' => 4.5,
            'review_count' => 2,
        ]);

        // Create Services
        Service::create([
            'technician_id' => $technician->id,
            'name' => 'Ganti Layar HP',
            'description' => 'Ganti layar HP berbagai merk',
            'estimated_price_min' => 150000,
            'estimated_price_max' => 500000,
        ]);

        Service::create([
            'technician_id' => $technician->id,
            'name' => 'Ganti Baterai',
            'description' => 'Ganti baterai HP',
            'estimated_price_min' => 100000,
            'estimated_price_max' => 300000,
        ]);

        // Create Order
        $order = Order::create([
            'customer_id' => $customer->id,
            'technician_id' => $technician->id,
            'category' => 'SMARTPHONE',
            'device_model' => 'Samsung A50',
            'problem_description' => 'Layar retak, perlu diganti',
            'service_type' => 'HOME_SERVICE',
            'address' => 'Jl. Mangga No. 5, Jakarta',
            'latitude' => -6.2090,
            'longitude' => 106.8458,
            'status' => 'COMPLETED',
            'agreed_price' => 200000,
            'completed_at' => now()->subDays(1),
        ]);

        // Create Order Photos
        OrderPhoto::create([
            'order_id' => $order->id,
            'photo_url' => 'https://example.com/photo1.jpg',
        ]);

        // Create Payment
        Payment::create([
            'order_id' => $order->id,
            'amount' => 200000,
            'method' => 'CASH',
            'status' => 'PAID',
            'paid_at' => now()->subDays(1),
        ]);

        // Create Review
        Review::create([
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'technician_id' => $technician->id,
            'rating' => 5,
            'comment' => 'Pelayanan cepat dan ramah. Hasilnya memuaskan!',
        ]);

        // Create another Order (Pending)
        $order2 = Order::create([
            'customer_id' => $customer->id,
            'technician_id' => $technician->id,
            'category' => 'SMARTPHONE',
            'device_model' => 'iPhone 12',
            'problem_description' => 'Baterai cepat habis',
            'service_type' => 'AT_SHOP',
            'address' => 'Jl. Mawar No. 10, Jakarta',
            'latitude' => -6.2088,
            'longitude' => 106.8456,
            'status' => 'IN_NEGOTIATION',
        ]);

        // Create Negotiation
        Negotiation::create([
            'order_id' => $order2->id,
            'sender_id' => $customer->id,
            'offered_price' => 150000,
            'message' => 'Bisa 150 ribu saja?',
            'status' => 'PENDING',
        ]);

        // Create Chat
        Chat::create([
            'order_id' => $order2->id,
            'sender_id' => $customer->id,
            'message' => 'Halo, kira-kira bisa selesai hari ini?',
        ]);

        Chat::create([
            'order_id' => $order2->id,
            'sender_id' => $technicianUser->id,
            'message' => 'Bisa mas, tapi mungkin agak sore karena ada order lain dulu.',
        ]);

        $this->command->info('Sample data created successfully!');
        $this->command->info('Admin: admin@example.com / admin123');
        $this->command->info('Customer: budi@example.com / password123');
        $this->command->info('Technician: andi@example.com / password123');
    }
}





namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Negotiation;
use App\Models\Order;
use App\Models\OrderPhoto;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Service;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'ADMIN',
            'is_active' => true,
        ]);

        // Create Customer
        $customer = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'phone' => '08123456789',
            'password' => Hash::make('password123'),
            'role' => 'CUSTOMER',
            'is_active' => true,
        ]);

        // Create Technician
        $technicianUser = User::create([
            'name' => 'Andi Teknisi',
            'email' => 'andi@example.com',
            'phone' => '08123456780',
            'password' => Hash::make('password123'),
            'role' => 'TECHNICIAN',
            'is_active' => true,
        ]);

        $technician = Technician::create([
            'user_id' => $technicianUser->id,
            'shop_name' => 'Andi Service Center',
            'address' => 'Jl. Mawar No. 10, Jakarta',
            'latitude' => -6.2088,
            'longitude' => 106.8456,
            'category' => 'SMARTPHONE',
            'description' => 'Servis HP segala merk, ganti layar, baterai, dll.',
            'base_price' => 50000,
            'status' => 'AVAILABLE',
            'verified' => true,
            'open_time' => '09:00',
            'close_time' => '17:00',
            'rating' => 4.5,
            'review_count' => 2,
        ]);

        // Create Services
        Service::create([
            'technician_id' => $technician->id,
            'name' => 'Ganti Layar HP',
            'description' => 'Ganti layar HP berbagai merk',
            'estimated_price_min' => 150000,
            'estimated_price_max' => 500000,
        ]);

        Service::create([
            'technician_id' => $technician->id,
            'name' => 'Ganti Baterai',
            'description' => 'Ganti baterai HP',
            'estimated_price_min' => 100000,
            'estimated_price_max' => 300000,
        ]);

        // Create Order
        $order = Order::create([
            'customer_id' => $customer->id,
            'technician_id' => $technician->id,
            'category' => 'SMARTPHONE',
            'device_model' => 'Samsung A50',
            'problem_description' => 'Layar retak, perlu diganti',
            'service_type' => 'HOME_SERVICE',
            'address' => 'Jl. Mangga No. 5, Jakarta',
            'latitude' => -6.2090,
            'longitude' => 106.8458,
            'status' => 'COMPLETED',
            'agreed_price' => 200000,
            'completed_at' => now()->subDays(1),
        ]);

        // Create Order Photos
        OrderPhoto::create([
            'order_id' => $order->id,
            'photo_url' => 'https://example.com/photo1.jpg',
        ]);

        // Create Payment
        Payment::create([
            'order_id' => $order->id,
            'amount' => 200000,
            'method' => 'CASH',
            'status' => 'PAID',
            'paid_at' => now()->subDays(1),
        ]);

        // Create Review
        Review::create([
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'technician_id' => $technician->id,
            'rating' => 5,
            'comment' => 'Pelayanan cepat dan ramah. Hasilnya memuaskan!',
        ]);

        // Create another Order (Pending)
        $order2 = Order::create([
            'customer_id' => $customer->id,
            'technician_id' => $technician->id,
            'category' => 'SMARTPHONE',
            'device_model' => 'iPhone 12',
            'problem_description' => 'Baterai cepat habis',
            'service_type' => 'AT_SHOP',
            'address' => 'Jl. Mawar No. 10, Jakarta',
            'latitude' => -6.2088,
            'longitude' => 106.8456,
            'status' => 'IN_NEGOTIATION',
        ]);

        // Create Negotiation
        Negotiation::create([
            'order_id' => $order2->id,
            'sender_id' => $customer->id,
            'offered_price' => 150000,
            'message' => 'Bisa 150 ribu saja?',
            'status' => 'PENDING',
        ]);

        // Create Chat
        Chat::create([
            'order_id' => $order2->id,
            'sender_id' => $customer->id,
            'message' => 'Halo, kira-kira bisa selesai hari ini?',
        ]);

        Chat::create([
            'order_id' => $order2->id,
            'sender_id' => $technicianUser->id,
            'message' => 'Bisa mas, tapi mungkin agak sore karena ada order lain dulu.',
        ]);

        $this->command->info('Sample data created successfully!');
        $this->command->info('Admin: admin@example.com / admin123');
        $this->command->info('Customer: budi@example.com / password123');
        $this->command->info('Technician: andi@example.com / password123');
    }
}








