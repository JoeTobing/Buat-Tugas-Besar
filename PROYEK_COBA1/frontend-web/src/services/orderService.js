import api from './api'

export const orderService = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  accept: (id) => api.post(`/orders/${id}/accept`),
  reject: (id, reason) => api.post(`/orders/${id}/reject`, { reason }),
  start: (id) => api.post(`/orders/${id}/start`),
  complete: (id) => api.post(`/orders/${id}/complete`),
  cancel: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
  getHistory: (params) => api.get('/me/orders/history', { params }),
  getInvoice: (id) => api.get(`/me/orders/${id}/invoice`),
}
