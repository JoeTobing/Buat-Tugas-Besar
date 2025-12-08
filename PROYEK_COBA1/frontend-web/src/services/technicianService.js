import api from './api'

export const technicianService = {
  getAll: (params) => api.get('/technicians', { params }),
  getById: (id) => api.get(`/technicians/${id}`),
  getServices: (id) => api.get(`/technicians/${id}/services`),
  getReviews: (id) => api.get(`/technicians/${id}/reviews`),
  getRating: (id) => api.get(`/technicians/${id}/rating`),
  updateProfile: (data) => api.put('/technician/profile', data),
  updateStatus: (status) => api.put('/technician/status', { status }),
}
