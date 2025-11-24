import api from './api';

export const authService = {
  register: async (name, email, password) => {
    return await api.post('/auth/register', { name, email, password });
  },

  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  verifyToken: async (token) => {
    return await api.post('/auth/verify', { token });
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (data) => {
    return await api.put('/auth/update', data);
  },

  changePassword: async (currentPassword, newPassword) => {
    return await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },
};