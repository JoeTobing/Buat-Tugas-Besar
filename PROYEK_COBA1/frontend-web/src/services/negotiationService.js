import api from './api'

export const negotiationService = {
  getNegotiations: (orderId) => api.get(`/orders/${orderId}/negotiations`),
  createNegotiation: (orderId, data) => api.post(`/orders/${orderId}/negotiations`, data),
  acceptNegotiation: (orderId, negotiationId) => 
    api.post(`/orders/${orderId}/negotiations/${negotiationId}/accept`),
  rejectNegotiation: (orderId, negotiationId) => 
    api.post(`/orders/${orderId}/negotiations/${negotiationId}/reject`),
}
