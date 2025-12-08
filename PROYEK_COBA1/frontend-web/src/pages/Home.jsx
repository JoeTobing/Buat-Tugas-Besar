import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Search, Wrench, Package, Star, ArrowRight } from 'lucide-react'

const Home = () => {
  const { isAuthenticated, isCustomer, isTechnician } = useAuth()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Servis Alat Elektronik On-Demand</h1>
        <p className="text-xl mb-6">Temukan teknisi terpercaya untuk memperbaiki perangkat elektronik Anda</p>
        {!isAuthenticated && (
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
            >
              Daftar sebagai Pelanggan
            </Link>
            <Link
              to="/register-technician"
              className="bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-400"
            >
              Daftar sebagai Teknisi
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {isAuthenticated && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isCustomer && (
            <>
              <Link
                to="/technicians"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <Search className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Cari Teknisi</h3>
                <p className="text-gray-600">Temukan teknisi terdekat dan terpercaya</p>
              </Link>
              <Link
                to="/orders/create"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <Package className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Buat Order</h3>
                <p className="text-gray-600">Pesan servis untuk perangkat Anda</p>
              </Link>
              <Link
                to="/orders"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <Package className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Order Saya</h3>
                <p className="text-gray-600">Lihat semua order Anda</p>
              </Link>
            </>
          )}
          {isTechnician && (
            <>
              <Link
                to="/orders"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <Package className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Order Saya</h3>
                <p className="text-gray-600">Kelola order yang masuk</p>
              </Link>
              <Link
                to="/profile"
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <Wrench className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Profil Saya</h3>
                <p className="text-gray-600">Kelola profil toko Anda</p>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Features */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Mengapa Pilih Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Star className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Teknisi Terverifikasi</h3>
            <p className="text-gray-600">Semua teknisi telah melalui proses verifikasi</p>
          </div>
          <div>
            <Search className="w-8 h-8 text-primary-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Mudah Dicari</h3>
            <p className="text-gray-600">Cari teknisi berdasarkan lokasi dan kategori</p>
          </div>
          <div>
            <Package className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Transaksi Aman</h3>
            <p className="text-gray-600">Sistem pembayaran dan review yang terpercaya</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!isAuthenticated && (
        <div className="text-center">
          <Link
            to="/technicians"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700"
          >
            Lihat Daftar Teknisi
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home
