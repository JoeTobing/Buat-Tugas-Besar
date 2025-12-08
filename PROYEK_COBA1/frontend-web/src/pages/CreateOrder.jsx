import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { orderService } from '../services/orderService'
import { technicianService } from '../services/technicianService'
import { useAuth } from '../contexts/AuthContext'
import { Package } from 'lucide-react'

const CreateOrder = () => {
  const { isCustomer } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const technicianId = searchParams.get('technician_id')

  const [formData, setFormData] = useState({
    technician_id: technicianId || '',
    category: 'SMARTPHONE',
    device_model: '',
    problem_description: '',
    service_type: 'HOME_SERVICE',
    address: '',
    latitude: '',
    longitude: '',
    photos: [],
  })
  const [technicians, setTechnicians] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!technicianId) {
      loadTechnicians()
    }
  }, [technicianId])

  const loadTechnicians = async () => {
    try {
      const { data } = await technicianService.getAll({ verified: true })
      if (data.success) {
        setTechnicians(data.data.items || [])
      }
    } catch (error) {
      console.error('Error loading technicians:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isCustomer) {
      navigate('/login')
      return
    }

    setError('')
    setLoading(true)

    try {
      const data = {
        ...formData,
        technician_id: formData.technician_id || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      }
      const response = await orderService.create(data)
      if (response.data.success) {
        navigate(`/orders/${response.data.data.id}`)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat order')
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    // In production, upload to server and get URLs
    // For now, just store file names
    setFormData({ ...formData, photos: files.map(f => f.name) })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Buat Order Baru</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!technicianId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Teknisi (Opsional)
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.technician_id}
              onChange={(e) => setFormData({ ...formData, technician_id: e.target.value })}
            >
              <option value="">Pilih Teknisi (atau biarkan kosong untuk broadcast)</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.shop_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="SMARTPHONE">Smartphone</option>
            <option value="COMPUTER">Komputer</option>
            <option value="HOME_APPLIANCE">Elektronik Rumah Tangga</option>
            <option value="OTHER">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Perangkat (Opsional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.device_model}
            onChange={(e) => setFormData({ ...formData, device_model: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Kerusakan *
          </label>
          <textarea
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.problem_description}
            onChange={(e) => setFormData({ ...formData, problem_description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Servis</label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.service_type}
            onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
          >
            <option value="HOME_SERVICE">Servis ke Rumah</option>
            <option value="AT_SHOP">Bawa ke Toko</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alamat *</label>
          <textarea
            required
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude (Opsional)
            </label>
            <input
              type="number"
              step="any"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude (Opsional)
            </label>
            <input
              type="number"
              step="any"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Barang Rusak (Opsional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Buat Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
