import api from './api'

export const authService = {
  register: (data) => api.post('/auth/register', data),
  registerTechnician: (data) => api.post('/auth/register-technician', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}
