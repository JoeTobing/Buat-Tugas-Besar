import api from './api'

export const chatService = {
  getChats: (orderId, params) => api.get(`/orders/${orderId}/chats`, { params }),
  sendMessage: (orderId, data) => api.post(`/orders/${orderId}/chats`, data),
}
