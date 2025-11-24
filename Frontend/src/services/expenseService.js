import api from './api';

export const expenseService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/expenses${queryString ? '?' + queryString : ''}`);
  },

  getById: async (id) => {
    return await api.get(`/expenses/${id}`);
  },

  create: async (expenseData) => {
    // If there's a receipt file, use FormData
    if (expenseData.receipt && expenseData.receipt instanceof File) {
      const formData = new FormData();
      Object.keys(expenseData).forEach(key => {
        formData.append(key, expenseData[key]);
      });
      return await api.post('/expenses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return await api.post('/expenses', expenseData);
  },

  update: async (id, expenseData) => {
    if (expenseData.receipt && expenseData.receipt instanceof File) {
      const formData = new FormData();
      Object.keys(expenseData).forEach(key => {
        formData.append(key, expenseData[key]);
      });
      return await api.put(`/expenses/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return await api.put(`/expenses/${id}`, expenseData);
  },

  delete: async (id) => {
    return await api.delete(`/expenses/${id}`);
  },

  uploadReceipt: async (id, file) => {
    const formData = new FormData();
    formData.append('receipt', file);
    return await api.post(`/expenses/${id}/receipt`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteReceipt: async (id) => {
    return await api.delete(`/expenses/${id}/receipt`);
  },

  getStats: async () => {
    return await api.get('/expenses/stats');
  },
};