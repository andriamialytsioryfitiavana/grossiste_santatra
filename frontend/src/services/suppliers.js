import api from './api';

export const SuppliersAPI = {
  list() {
    return api.get('/suppliers').then(r => r.data.data || r.data);
  },
  get(id) {
    return api.get(`/suppliers/${id}`).then(r => r.data.data || r.data);
  },
  create(payload) {
    return api.post('/suppliers', payload).then(r => r.data.data || r.data);
  },
  update(id, payload) {
    return api.put(`/suppliers/${id}`, payload).then(r => r.data.data || r.data);
  },
  remove(id) {
    return api.delete(`/suppliers/${id}`).then(r => r.data.data || r.data);
  },
};
