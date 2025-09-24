import api from './api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getTasks = (params) => api.get('/tasks', { params, ...getAuthHeaders() });

export const createTask = (title) => api.post('/tasks', { title }, getAuthHeaders());
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data, getAuthHeaders());
export const deleteTask = (id) => api.delete(`/tasks/${id}`, getAuthHeaders());