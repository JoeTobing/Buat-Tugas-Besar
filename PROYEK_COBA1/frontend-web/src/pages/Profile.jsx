import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { technicianService } from '../services/technicianService'
import api from '../services/api'
import { User, Wrench } from 'lucide-react'

const Profile = () => {
  const { user, isTechnician } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })
  const [technicianData, setTechnicianData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isTechnician && user?.technician) {
      loadTechnicianData()
    }
  }, [user, isTechnician])

  const loadTechnicianData = async () => {
    try {
      const { data } = await technicianService.getById(user.technician.id)
      if (data.success) {
        setTechnicianData(data.data)
        setFormData({
          ...formData,
          shop_name: data.data.shop_name,
          address: data.data.address,
          category: data.data.category,
          description: data.data.description,
          base_price: data.data.base_price || '',
        })
      }
    } catch (error) {
      console.error('Error loading technician data:', error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')

    try {
      await api.put('/profile', formData)
      if (isTechnician && technicianData) {
        await technicianService.updateProfile({
          shop_name: formData.shop_name,
          address: formData.address,
          category: formData.category,
          description: formData.description,
          base_price: formData.base_price ? parseFloat(formData.base_price) : null,
        })
      }
      setSuccess('Profil berhasil diperbarui')
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal memperbarui profil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>

      <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow p-6 space-y-6">
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            value={user?.email || ''}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">No. HP</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {isTechnician && technicianData && (
          <>
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Informasi Toko</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Toko</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.shop_name || ''}
                  onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="SMARTPHONE">Smartphone</option>
                  <option value="COMPUTER">Komputer</option>
                  <option value="HOME_APPLIANCE">Elektronik Rumah Tangga</option>
                  <option value="OTHER">Lainnya</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Harga Dasar (Rp)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.base_price || ''}
                  onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  )
}

export default Profile
