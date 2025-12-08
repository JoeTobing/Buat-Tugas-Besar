import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Wrench, Upload, FileText } from 'lucide-react'

const RegisterTechnician = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    shop_name: '',
    address: '',
    category: 'SMARTPHONE',
    description: '',
    base_price: '',
    latitude: '',
    longitude: '',
  })
  const [ktpFile, setKtpFile] = useState(null)
  const [certificateFile, setCertificateFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { registerTechnician } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.password_confirmation) {
      setError('Password tidak cocok')
      return
    }

    if (!ktpFile) {
      setError('KTP wajib diupload')
      return
    }

    setLoading(true)

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('password_confirmation', formData.password_confirmation)
      formDataToSend.append('shop_name', formData.shop_name)
      formDataToSend.append('address', formData.address)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('description', formData.description)
      if (formData.base_price) {
        formDataToSend.append('base_price', formData.base_price)
      }
      if (formData.latitude) {
        formDataToSend.append('latitude', formData.latitude)
      }
      if (formData.longitude) {
        formDataToSend.append('longitude', formData.longitude)
      }
      formDataToSend.append('ktp', ktpFile)
      if (certificateFile) {
        formDataToSend.append('certificate', certificateFile)
      }

      await registerTechnician(formDataToSend)
      navigate('/')
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registrasi gagal. Periksa data Anda.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Daftar sebagai Teknisi/Mitra
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Masuk di sini
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">No. HP</label>
              <input
                type="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Toko/Usaha</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.shop_name}
                onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kategori Layanan</label>
              <select
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
              <label className="block text-sm font-medium text-gray-700">Harga Dasar (Rp)</label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Alamat</label>
              <textarea
                required
                rows="2"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude (Opsional)</label>
              <input
                type="number"
                step="any"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude (Opsional)</label>
              <input
                type="number"
                step="any"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            
            {/* File Upload Fields */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload KTP <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary-400 transition-colors">
                <div className="space-y-1 text-center">
                  {ktpFile ? (
                    <div className="flex items-center justify-center">
                      <FileText className="w-8 h-8 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{ktpFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>Upload file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*,.pdf"
                            onChange={(e) => setKtpFile(e.target.files[0])}
                            required
                          />
                        </label>
                        <p className="pl-1">atau drag & drop</p>
                      </div>
                      <p className="text-xs text-gray-500">JPG, PNG, atau PDF (max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Sertifikat Keahlian (Opsional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-primary-400 transition-colors">
                <div className="space-y-1 text-center">
                  {certificateFile ? (
                    <div className="flex items-center justify-center">
                      <FileText className="w-8 h-8 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{certificateFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>Upload file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*,.pdf"
                            onChange={(e) => setCertificateFile(e.target.files[0])}
                          />
                        </label>
                        <p className="pl-1">atau drag & drop</p>
                      </div>
                      <p className="text-xs text-gray-500">JPG, PNG, atau PDF (max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : (
                <>
                  <Wrench className="w-5 h-5 mr-2" />
                  Daftar sebagai Teknisi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterTechnician
