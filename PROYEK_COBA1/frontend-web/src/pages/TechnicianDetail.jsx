import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { technicianService } from '../services/technicianService'
import { useAuth } from '../contexts/AuthContext'
import { MapPin, Star, DollarSign, Phone, Mail } from 'lucide-react'
import { formatCurrency } from '../utils/format'

const TechnicianDetail = () => {
  const { id } = useParams()
  const { isCustomer } = useAuth()
  const navigate = useNavigate()
  const [technician, setTechnician] = useState(null)
  const [services, setServices] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    setLoading(true)
    try {
      const [techRes, servicesRes, reviewsRes] = await Promise.all([
        technicianService.getById(id),
        technicianService.getServices(id),
        technicianService.getReviews(id),
      ])
      if (techRes.data.success) setTechnician(techRes.data.data)
      if (servicesRes.data.success) setServices(servicesRes.data.data || [])
      if (reviewsRes.data.success) setReviews(reviewsRes.data.data?.items || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrder = () => {
    if (!isCustomer) {
      navigate('/login')
      return
    }
    navigate(`/orders/create?technician_id=${id}`)
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!technician) {
    return <div className="text-center py-12">Teknisi tidak ditemukan</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{technician.shop_name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">{technician.description}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span>{technician.address}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="font-medium">{technician.rating || 0}</span>
                <span className="text-gray-500 ml-2">({technician.review_count || 0} review)</span>
              </div>
              {technician.base_price && (
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Mulai dari {formatCurrency(technician.base_price)}</span>
                </div>
              )}
              {technician.user && (
                <>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{technician.user.email}</span>
                  </div>
                  {technician.user.phone && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-gray-500" />
                      <span>{technician.user.phone}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {isCustomer && (
              <button
                onClick={handleCreateOrder}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700"
              >
                Buat Order
              </button>
            )}
          </div>
        </div>
      </div>

      {services.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Layanan yang Tersedia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                {service.estimated_price_min && service.estimated_price_max && (
                  <p className="text-sm font-medium">
                    {formatCurrency(service.estimated_price_min)} - {formatCurrency(service.estimated_price_max)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Ulasan</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {review.customer?.name || 'Anonymous'}
                  </span>
                </div>
                {review.comment && <p className="text-gray-700">{review.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TechnicianDetail
