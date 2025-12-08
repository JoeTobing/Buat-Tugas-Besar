import api from './api'

export const reviewService = {
  createReview: (orderId, data) => api.post(`/orders/${orderId}/review`, data),
}
