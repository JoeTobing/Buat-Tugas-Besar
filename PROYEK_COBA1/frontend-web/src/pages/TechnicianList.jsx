import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { technicianService } from '../services/technicianService'
import { Search, MapPin, Star, DollarSign } from 'lucide-react'
import { formatCurrency, getStatusColor, getStatusLabel } from '../utils/format'

const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    sort: 'rating',
    lat: '',
    lng: '',
    radius: '',
  })

  useEffect(() => {
    loadTechnicians()
  }, [filters])

  const loadTechnicians = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.category) params.category = filters.category
      if (filters.sort) params.sort = filters.sort
      if (filters.lat && filters.lng && filters.radius) {
        params.lat = filters.lat
        params.lng = filters.lng
        params.radius = filters.radius
      }
      const { data } = await technicianService.getAll(params)
      if (data.success) {
        setTechnicians(data.data.items || [])
      }
    } catch (error) {
      console.error('Error loading technicians:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Teknisi</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">Semua Kategori</option>
              <option value="SMARTPHONE">Smartphone</option>
              <option value="COMPUTER">Komputer</option>
              <option value="HOME_APPLIANCE">Elektronik Rumah Tangga</option>
              <option value="OTHER">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="rating">Rating Tertinggi</option>
              <option value="nearest">Terdekat</option>
              <option value="price">Harga Terendah</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
            <input
              type="number"
              step="any"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="-6.2"
              value={filters.lat}
              onChange={(e) => setFilters({ ...filters, lat: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
            <input
              type="number"
              step="any"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="106.8"
              value={filters.lng}
              onChange={(e) => setFilters({ ...filters, lng: e.target.value })}
            />
          </div>
        </div>
        {filters.lat && filters.lng && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Radius (km)</label>
            <input
              type="number"
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="10"
              value={filters.radius}
              onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Technician List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : technicians.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Tidak ada teknisi ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map((tech) => (
            <Link
              key={tech.id}
              to={`/technicians/${tech.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{tech.shop_name}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tech.status)}`}>
                  {getStatusLabel(tech.status)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{tech.description || 'Tidak ada deskripsi'}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {tech.address}
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="font-medium">{tech.rating || 0}</span>
                  <span className="text-gray-500 ml-1">({tech.review_count || 0} review)</span>
                </div>
                {tech.base_price && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Mulai dari {formatCurrency(tech.base_price)}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default TechnicianList
