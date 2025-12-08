import api from './api'

export const adminService = {
  getTechnicians: (params) => api.get('/admin/technicians', { params }),
  verifyTechnician: (id, verified) => api.post(`/admin/technicians/${id}/verify`, { verified }),
  updateUserStatus: (id, isActive) => api.put(`/admin/users/${id}/status`, { is_active: isActive }),
  getOrders: (params) => api.get('/admin/orders', { params }),
}
