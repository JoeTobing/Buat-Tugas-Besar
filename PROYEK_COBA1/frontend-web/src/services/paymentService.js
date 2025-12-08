import api from './api'

export const paymentService = {
  getPayment: (orderId) => api.get(`/orders/${orderId}/payment`),
  createPayment: (orderId, data) => api.post(`/orders/${orderId}/payment`, data),
  updatePayment: (paymentId, data) => api.put(`/payments/${paymentId}`, data),
}
