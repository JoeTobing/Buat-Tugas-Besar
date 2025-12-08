import { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import { Shield, CheckCircle, XCircle } from 'lucide-react'
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '../../utils/format'

const AdminDashboard = () => {
  const [technicians, setTechnicians] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('technicians')

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'technicians') {
        const { data } = await adminService.getTechnicians({ verified: false })
        if (data.success) {
          setTechnicians(data.data.items || [])
        }
      } else {
        const { data } = await adminService.getOrders()
        if (data.success) {
          setOrders(data.data.items || [])
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (id, verified) => {
    try {
      await adminService.verifyTechnician(id, verified)
      loadData()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal memverifikasi')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('technicians')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'technicians'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Verifikasi Teknisi
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Monitoring Order
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : activeTab === 'technicians' ? (
        <div className="space-y-4">
          {technicians.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">Tidak ada teknisi yang perlu diverifikasi</p>
            </div>
          ) : (
            technicians.map((tech) => (
              <div key={tech.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tech.shop_name}</h3>
                    <p className="text-gray-600 mb-2">{tech.description}</p>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Pemilik:</span> {tech.user?.name}</p>
                      <p><span className="font-medium">Email:</span> {tech.user?.email}</p>
                      <p><span className="font-medium">Alamat:</span> {tech.address}</p>
                      <p><span className="font-medium">Kategori:</span> {tech.category}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleVerify(tech.id, true)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verifikasi
                    </button>
                    <button
                      onClick={() => handleVerify(tech.id, false)}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">Tidak ada order</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{order.problem_description}</p>
                    <div className="text-sm text-gray-500">
                      <p>Customer: {order.customer?.name}</p>
                      {order.technician && <p>Teknisi: {order.technician.shop_name}</p>}
                      <p>{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
