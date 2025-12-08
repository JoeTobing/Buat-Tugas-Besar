import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { orderService } from '../services/orderService'
import { reviewService } from '../services/reviewService'
import { useAuth } from '../contexts/AuthContext'
import { formatCurrency, formatDateTime, getStatusColor, getStatusLabel } from '../utils/format'
import ChatSection from '../components/ChatSection'
import NegotiationSection from '../components/NegotiationSection'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isCustomer, isTechnician } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadOrder()
  }, [id])

  const loadOrder = async () => {
    setLoading(true)
    try {
      const { data } = await orderService.getById(id)
      if (data.success) {
        setOrder(data.data)
      }
    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (action, data = {}) => {
    setActionLoading(true)
    try {
      let response
      switch (action) {
        case 'accept':
          response = await orderService.accept(id)
          break
        case 'reject':
          response = await orderService.reject(id, data.reason)
          break
        case 'start':
          response = await orderService.start(id)
          break
        case 'complete':
          response = await orderService.complete(id)
          break
        case 'cancel':
          response = await orderService.cancel(id, data.reason)
          break
        default:
          return
      }
      if (response.data.success) {
        loadOrder()
      }
    } catch (error) {
      console.error('Error performing action:', error)
      alert(error.response?.data?.message || 'Gagal melakukan aksi')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!order) {
    return <div className="text-center py-12">Order tidak ditemukan</div>
  }

  const canAccept = isTechnician && order.status === 'PENDING' && order.technician_id === user?.technician?.id
  const canReject = isTechnician && ['PENDING', 'IN_NEGOTIATION'].includes(order.status) && order.technician_id === user?.technician?.id
  const canStart = isTechnician && order.status === 'ACCEPTED' && order.technician_id === user?.technician?.id
  const canComplete = isTechnician && order.status === 'ON_PROGRESS' && order.technician_id === user?.technician?.id
  const canCancel = (isCustomer && order.customer_id === user?.id) || (isTechnician && order.technician_id === user?.technician?.id)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
            <span className={`px-3 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>
          <div className="flex space-x-2">
            {canAccept && (
              <button
                onClick={() => handleAction('accept')}
                disabled={actionLoading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Terima
              </button>
            )}
            {canReject && (
              <button
                onClick={() => {
                  const reason = prompt('Alasan menolak:')
                  if (reason) handleAction('reject', { reason })
                }}
                disabled={actionLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Tolak
              </button>
            )}
            {canStart && (
              <button
                onClick={() => handleAction('start')}
                disabled={actionLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Mulai
              </button>
            )}
            {canComplete && (
              <button
                onClick={() => handleAction('complete')}
                disabled={actionLoading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Selesai
              </button>
            )}
            {canCancel && (
              <button
                onClick={() => {
                  const reason = prompt('Alasan membatalkan:')
                  if (reason) handleAction('cancel', { reason })
                }}
                disabled={actionLoading}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
              >
                Batal
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Informasi Order</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Kategori:</span> {order.category}</p>
              {order.device_model && <p><span className="font-medium">Model:</span> {order.device_model}</p>}
              <p><span className="font-medium">Deskripsi:</span> {order.problem_description}</p>
              <p><span className="font-medium">Tipe Servis:</span> {order.service_type === 'HOME_SERVICE' ? 'Servis ke Rumah' : 'Bawa ke Toko'}</p>
              <p><span className="font-medium">Alamat:</span> {order.address}</p>
              {order.agreed_price && (
                <p><span className="font-medium">Harga:</span> {formatCurrency(order.agreed_price)}</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Informasi {isCustomer ? 'Teknisi' : 'Pelanggan'}</h2>
            {isCustomer && order.technician ? (
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Toko:</span> {order.technician.shop_name}</p>
                <p><span className="font-medium">Alamat:</span> {order.technician.address}</p>
              </div>
            ) : order.customer ? (
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Nama:</span> {order.customer.name}</p>
                <p><span className="font-medium">Email:</span> {order.customer.email}</p>
              </div>
            ) : (
              <p className="text-gray-500">Belum ada teknisi yang menerima</p>
            )}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <ChatSection orderId={id} />

      {/* Negotiation Section */}
      {['PENDING', 'IN_NEGOTIATION'].includes(order.status) && (
        <NegotiationSection orderId={id} order={order} onUpdate={loadOrder} />
      )}

      {/* Payment CTA when price agreed */}
      {order.status === 'ACCEPTED' && order.agreed_price && (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <p className="text-green-800 font-medium mb-2">
            Harga disepakati: {formatCurrency(order.agreed_price)}
          </p>
          <button
            onClick={() => navigate(`/payments/${order.id}`)} // sesuaikan rute/metode pembayaran Anda
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      )}
      
      {/* Payment Section */}
      {order.status === 'COMPLETED' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pembayaran</h2>
          {order.payment ? (
            <div>
              <p>Status: {getStatusLabel(order.payment.status)}</p>
              <p>Jumlah: {formatCurrency(order.payment.amount)}</p>
              <p>Metode: {order.payment.method}</p>
            </div>
          ) : (
            <p className="text-gray-500">Belum ada pembayaran</p>
          )}
        </div>
      )}

      {/* Review Section */}
      {order.status === 'COMPLETED' && order.payment?.status === 'PAID' && isCustomer && !order.review && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Beri Ulasan</h2>
          <ReviewForm orderId={id} onSuccess={loadOrder} />
        </div>
      )}
    </div>
  )
}

const ReviewForm = ({ orderId, onSuccess }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await reviewService.createReview(orderId, { rating, comment })
      onSuccess()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal membuat review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRating(r)}
              className={`w-10 h-10 rounded ${r <= rating ? 'bg-yellow-500' : 'bg-gray-200'}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Komentar</label>
        <textarea
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Kirim Review'}
      </button>
    </form>
  )
}

export default OrderDetail
