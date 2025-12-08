import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderService } from '../services/orderService'
import { useAuth } from '../contexts/AuthContext'
import { Package, Clock } from 'lucide-react'
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '../utils/format'

const OrderList = () => {
  const { isCustomer, isTechnician } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    loadOrders()
  }, [statusFilter])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const params = statusFilter ? { status: statusFilter } : {}
      const { data } = await orderService.getAll(params)
      if (data.success) {
        setOrders(data.data.items || [])
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Order</h1>
        {isCustomer && (
          <Link
            to="/orders/create"
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Buat Order Baru
          </Link>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter Status</label>
        <select
          className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Semua Status</option>
          <option value="PENDING">Menunggu</option>
          <option value="IN_NEGOTIATION">Negosiasi</option>
          <option value="ACCEPTED">Diterima</option>
          <option value="ON_PROGRESS">Sedang Dikerjakan</option>
          <option value="COMPLETED">Selesai</option>
          <option value="REJECTED">Ditolak</option>
          <option value="CANCELLED">Dibatalkan</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Tidak ada order</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{order.problem_description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(order.created_at)}
                  </div>
                  {order.technician && (
                    <p className="text-sm text-gray-600 mt-2">
                      Teknisi: {order.technician.shop_name}
                    </p>
                  )}
                  {order.agreed_price && (
                    <p className="text-sm font-medium text-gray-900 mt-2">
                      Harga: {formatCurrency(order.agreed_price)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderList
