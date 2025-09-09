import api from './api';

export const ProductsAPI = {
  list() {
    return api.get('/products').then(r => r.data.data || r.data);
  },
  get(id) {
    return api.get(`/products/${id}`).then(r => r.data.data || r.data);
  },
  create(payload) {
    return api.post('/products', payload).then(r => r.data.data || r.data);
  },
  update(id, payload) {
    return api.put(`/products/${id}`, payload).then(r => r.data.data || r.data);
  },
  remove(id) {
    return api.delete(`/products/${id}`).then(r => r.data.data || r.data);
  },
};
