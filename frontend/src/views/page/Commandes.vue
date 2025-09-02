<template>
  <div>
    <h1>tay zavatar</h1>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showAddModal = ref(false)
const statusFilter = ref('')
const searchQuery = ref('')

const newOrder = ref({
  client: '',
  email: '',
  status: 'en-attente'
})

const commandes = ref([
  {
    id: 1,
    numero: 'CMD001',
    client: 'Jean Dupont',
    email: 'jean@email.com',
    status: 'confirmee',
    date: '2024-01-15',
    total: 125000,
    articles: 3
  },
  {
    id: 2,
    numero: 'CMD002',
    client: 'Marie Martin',
    email: 'marie@email.com',
    status: 'en-attente',
    date: '2024-01-16',
    total: 89000,
    articles: 2
  },
  {
    id: 3,
    numero: 'CMD003',
    client: 'Pierre Rabe',
    email: 'pierre@email.com',
    status: 'livree',
    date: '2024-01-14',
    total: 156000,
    articles: 5
  }
])

const filteredCommandes = computed(() => {
  return commandes.value.filter(commande => {
    const matchesStatus = !statusFilter.value || commande.status === statusFilter.value
    const matchesSearch = !searchQuery.value || 
      commande.client.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesStatus && matchesSearch
  })
})

const getStatusLabel = (status) => {
  const labels = {
    'en-attente': 'En attente',
    'confirmee': 'Confirmée',
    'expediee': 'Expédiée',
    'livree': 'Livrée',
    'annulee': 'Annulée'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const viewOrder = (commande) => {
  console.log('Voir commande:', commande)
}

const editOrder = (commande) => {
  console.log('Modifier commande:', commande)
}

const deleteOrder = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
    commandes.value = commandes.value.filter(c => c.id !== id)
  }
}

const saveOrder = () => {
  const id = Date.now()
  commandes.value.push({
    ...newOrder.value,
    id,
    numero: `CMD${String(id).slice(-3)}`,
    date: new Date().toISOString().split('T')[0],
    total: 0,
    articles: 0
  })
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  newOrder.value = { client: '', email: '', status: 'en-attente' }
}
</script>

<style scoped>
.commandes-page {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #21d4a5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #1ea87a;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.filter-select, .search-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
}

.search-input {
  flex: 1;
  max-width: 300px;
}

.orders-grid {
  display: grid;
  gap: 16px;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-number {
  font-weight: 700;
  font-size: 18px;
  color: #1a1d29;
}

.order-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.order-status.en-attente {
  background: #fef3c7;
  color: #92400e;
}

.order-status.confirmee {
  background: #dbeafe;
  color: #1e40af;
}

.order-status.expediee {
  background: #e0e7ff;
  color: #5b21b6;
}

.order-status.livree {
  background: #dcfce7;
  color: #16a34a;
}

.order-status.annulee {
  background: #fef2f2;
  color: #dc2626;
}

.order-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.client-info h3 {
  margin: 0 0 4px 0;
  color: #1a1d29;
}

.client-info p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.label {
  color: #6b7280;
}

.amount {
  font-weight: 600;
  color: #21d4a5;
}

.order-actions {
  display: flex;
  gap: 8px;
}

.btn-view, .btn-edit, .btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-view {
  background: #f3f4f6;
  color: #374151;
}

.btn-edit {
  background: #dbeafe;
  color: #1e40af;
}

.btn-delete {
  background: #fef2f2;
  color: #dc2626;
}

.btn-view:hover { background: #e5e7eb; }
.btn-edit:hover { background: #bfdbfe; }
.btn-delete:hover { background: #fecaca; }

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  color: #1a1d29;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  color: #374151;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-cancel, .btn-save {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
}

.btn-save {
  background: #21d4a5;
  color: white;
}

@media (max-width: 768px) {
  .commandes-page {
    padding: 16px;
  }
  
  .order-info {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-input {
    max-width: none;
  }
}
</style>
