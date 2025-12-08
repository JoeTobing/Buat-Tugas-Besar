import { useState, useEffect } from 'react'
import { negotiationService } from '../services/negotiationService'
import { useAuth } from '../contexts/AuthContext'
import { formatCurrency, formatDateTime } from '../utils/format'

const NegotiationSection = ({ orderId, order, onUpdate }) => {
  const { user } = useAuth()
  const [negotiations, setNegotiations] = useState([])
  const [offeredPrice, setOfferedPrice] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadNegotiations()
  }, [orderId])

  const loadNegotiations = async () => {
    try {
      const { data } = await negotiationService.getNegotiations(orderId)
      if (data.success) {
        setNegotiations(data.data || [])
      }
    } catch (error) {
      console.error('Error loading negotiations:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!offeredPrice) return

    setLoading(true)
    try {
      await negotiationService.createNegotiation(orderId, {
        offered_price: parseFloat(offeredPrice),
        message,
      })
      setOfferedPrice('')
      setMessage('')
      loadNegotiations()
      onUpdate()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal mengirim penawaran')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (negotiationId) => {
    if (!confirm('Terima penawaran harga ini?')) return

    try {
      await negotiationService.acceptNegotiation(orderId, negotiationId)
      loadNegotiations()
      onUpdate()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menerima penawaran')
    }
  }

  const handleReject = async (negotiationId) => {
    if (!confirm('Tolak penawaran harga ini?')) return

    try {
      await negotiationService.rejectNegotiation(orderId, negotiationId)
      loadNegotiations()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menolak penawaran')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Negosiasi Harga</h2>
      
      {order.agreed_price ? (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <p className="text-green-800 font-medium">
            Harga telah disepakati: {formatCurrency(order.agreed_price)}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {negotiations.map((neg) => (
              <div
                key={neg.id}
                className={`border rounded-lg p-4 ${
                  neg.sender_id === user?.id ? 'bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-lg">{formatCurrency(neg.offered_price)}</p>
                    {neg.message && <p className="text-sm text-gray-600 mt-1">{neg.message}</p>}
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDateTime(neg.created_at)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {neg.status === 'PENDING' && neg.sender_id !== user?.id && (
                      <>
                        <button
                          onClick={() => handleAccept(neg.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => handleReject(neg.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                    {neg.status === 'ACCEPTED' && (
                      <span className="text-green-600 font-medium text-sm">Diterima</span>
                    )}
                    {neg.status === 'REJECTED' && (
                      <span className="text-red-600 font-medium text-sm">Ditolak</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Harga yang Ditawarkan (Rp)</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(e.target.value)}
                placeholder="150000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pesan (Opsional)</label>
              <textarea
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bisa 150 ribu saja?"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !offeredPrice}
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Mengirim...' : 'Kirim Penawaran'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default NegotiationSection
