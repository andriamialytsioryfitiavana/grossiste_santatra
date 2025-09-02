<template>
  <div class="livraison-page">
    <div class="page-header">
      <h1>Gestion des Livraisons</h1>
      <button @click="showAddModal = true" class="btn-primary">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Nouvelle Livraison
      </button>
    </div>

    <!-- Delivery Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon pending">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ pendingDeliveries }}</h3>
          <p>En attente</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon transit">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ inTransitDeliveries }}</h3>
          <p>En transit</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon delivered">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ deliveredCount }}</h3>
          <p>Livrées</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Rechercher par numéro ou client..." class="search-input">
      <select v-model="statusFilter" class="filter-select">
        <option value="">Tous les statuts</option>
        <option value="en-attente">En attente</option>
        <option value="en-transit">En transit</option>
        <option value="livree">Livrée</option>
        <option value="echec">Échec</option>
      </select>
      <input v-model="dateFilter" type="date" class="filter-date">
    </div>

    <!-- Deliveries List -->
    <div class="deliveries-grid">
      <div v-for="livraison in filteredLivraisons" :key="livraison.id" class="delivery-card">
        <div class="delivery-header">
          <div class="delivery-number">#{{ livraison.numero }}</div>
          <div :class="['delivery-status', livraison.status]">
            {{ getStatusLabel(livraison.status) }}
          </div>
        </div>
        
        <div class="delivery-info">
          <div class="client-section">
            <h3>{{ livraison.client }}</h3>
            <p>{{ livraison.commande }}</p>
          </div>
          
          <div class="address-section">
            <div class="address-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {{ livraison.adresse }}
            </div>
            <div class="address-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {{ livraison.telephone }}
            </div>
          </div>
          
          <div class="delivery-details">
            <div class="detail-row">
              <span class="label">Date prévue:</span>
              <span>{{ formatDate(livraison.datePrevue) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Transporteur:</span>
              <span>{{ livraison.transporteur }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Coût:</span>
              <span class="amount">{{ livraison.cout.toLocaleString() }} Ar</span>
            </div>
          </div>
        </div>

        <div class="delivery-actions">
          <button @click="trackDelivery(livraison)" class="btn-track">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Suivre
          </button>
          <button @click="editDelivery(livraison)" class="btn-edit">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
            </svg>
            Modifier
          </button>
          <button @click="updateStatus(livraison)" class="btn-update" v-if="livraison.status !== 'livree'">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Marquer livrée
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingDelivery" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingDelivery ? 'Modifier' : 'Nouvelle' }} Livraison</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveDelivery">
            <div class="form-section">
              <h3>Informations Client</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>Client *</label>
                  <input v-model="deliveryForm.client" type="text" required>
                </div>
                <div class="form-group">
                  <label>Commande *</label>
                  <input v-model="deliveryForm.commande" type="text" required>
                </div>
              </div>
              <div class="form-group">
                <label>Adresse de livraison *</label>
                <textarea v-model="deliveryForm.adresse" rows="2" required></textarea>
              </div>
              <div class="form-group">
                <label>Téléphone</label>
                <input v-model="deliveryForm.telephone" type="tel">
              </div>
            </div>

            <div class="form-section">
              <h3>Détails Livraison</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>Date prévue *</label>
                  <input v-model="deliveryForm.datePrevue" type="date" required>
                </div>
                <div class="form-group">
                  <label>Transporteur</label>
                  <select v-model="deliveryForm.transporteur">
                    <option value="DHL Madagascar">DHL Madagascar</option>
                    <option value="Colissimo Madagascar">Colissimo Madagascar</option>
                    <option value="Transport Local">Transport Local</option>
                    <option value="Livraison Propre">Livraison Propre</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Coût de livraison</label>
                  <input v-model.number="deliveryForm.cout" type="number" min="0">
                </div>
                <div class="form-group">
                  <label>Statut</label>
                  <select v-model="deliveryForm.status">
                    <option value="en-attente">En attente</option>
                    <option value="en-transit">En transit</option>
                    <option value="livree">Livrée</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeModal" class="btn-cancel">Annuler</button>
              <button type="submit" class="btn-save">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showAddModal = ref(false)
const editingDelivery = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')

const deliveryForm = ref({
  client: '',
  commande: '',
  adresse: '',
  telephone: '',
  datePrevue: '',
  transporteur: 'DHL Madagascar',
  cout: 0,
  status: 'en-attente'
})

const livraisons = ref([
  {
    id: 1,
    numero: 'LIV-001',
    client: 'Jean Dupont',
    commande: 'CMD-001',
    adresse: 'Antananarivo, Madagascar',
    telephone: '+261 34 12 345 67',
    datePrevue: '2024-01-20',
    transporteur: 'DHL Madagascar',
    cout: 15000,
    status: 'en-transit'
  },
  {
    id: 2,
    numero: 'LIV-002',
    client: 'Marie Martin',
    commande: 'CMD-002',
    adresse: 'Toamasina, Madagascar',
    telephone: '+261 33 98 765 43',
    datePrevue: '2024-01-22',
    transporteur: 'Colissimo Madagascar',
    cout: 12000,
    status: 'en-attente'
  },
  {
    id: 3,
    numero: 'LIV-003',
    client: 'Pierre Rabe',
    commande: 'CMD-003',
    adresse: 'Fianarantsoa, Madagascar',
    telephone: '+261 32 55 444 33',
    datePrevue: '2024-01-18',
    transporteur: 'Transport Local',
    cout: 8000,
    status: 'livree'
  }
])

const filteredLivraisons = computed(() => {
  return livraisons.value.filter(livraison => {
    const matchesSearch = !searchQuery.value || 
      livraison.numero.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      livraison.client.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || livraison.status === statusFilter.value
    const matchesDate = !dateFilter.value || livraison.datePrevue === dateFilter.value
    
    return matchesSearch && matchesStatus && matchesDate
  })
})

const pendingDeliveries = computed(() => livraisons.value.filter(l => l.status === 'en-attente').length)
const inTransitDeliveries = computed(() => livraisons.value.filter(l => l.status === 'en-transit').length)
const deliveredCount = computed(() => livraisons.value.filter(l => l.status === 'livree').length)

const getStatusLabel = (status) => {
  const labels = {
    'en-attente': 'En attente',
    'en-transit': 'En transit',
    'livree': 'Livrée',
    'echec': 'Échec'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const trackDelivery = (livraison) => {
  console.log('Suivre livraison:', livraison)
  alert(`Suivi de la livraison ${livraison.numero}`)
}

const editDelivery = (livraison) => {
  editingDelivery.value = livraison
  deliveryForm.value = { ...livraison }
  showAddModal.value = true
}

const updateStatus = (livraison) => {
  livraison.status = 'livree'
  alert(`Livraison ${livraison.numero} marquée comme livrée`)
}

const saveDelivery = () => {
  if (editingDelivery.value) {
    const index = livraisons.value.findIndex(l => l.id === editingDelivery.value.id)
    livraisons.value[index] = { ...deliveryForm.value, id: editingDelivery.value.id }
  } else {
    const newDelivery = {
      ...deliveryForm.value,
      id: Date.now(),
      numero: `LIV-${String(livraisons.value.length + 1).padStart(3, '0')}`
    }
    livraisons.value.push(newDelivery)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingDelivery.value = null
  deliveryForm.value = {
    client: '',
    commande: '',
    adresse: '',
    telephone: '',
    datePrevue: '',
    transporteur: 'DHL Madagascar',
    cout: 0,
    status: 'en-attente'
  }
}
</script>

<style scoped>
.livraison-page {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.pending { background: #f59e0b; }
.stat-icon.transit { background: #3b82f6; }
.stat-icon.delivered { background: #10b981; }

.stat-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.stat-content p {
  color: #6b7280;
  margin: 0;
  font-size: 14px;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-input, .filter-select, .filter-date {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
}

.search-input {
  flex: 1;
  max-width: 300px;
}

.deliveries-grid {
  display: grid;
  gap: 16px;
}

.delivery-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.delivery-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.delivery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.delivery-number {
  font-weight: 700;
  font-size: 18px;
  color: #1a1d29;
}

.delivery-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.delivery-status.en-attente {
  background: #fef3c7;
  color: #d97706;
}

.delivery-status.en-transit {
  background: #dbeafe;
  color: #1e40af;
}

.delivery-status.livree {
  background: #dcfce7;
  color: #16a34a;
}

.delivery-status.echec {
  background: #fef2f2;
  color: #dc2626;
}

.delivery-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;
}

.client-section h3 {
  margin: 0 0 4px 0;
  color: #1a1d29;
}

.client-section p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.address-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}

.address-item svg {
  color: #9ca3af;
}

.delivery-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.label {
  color: #6b7280;
}

.amount {
  color: #21d4a5;
  font-weight: 600;
}

.delivery-actions {
  display: flex;
  gap: 8px;
}

.btn-track, .btn-edit, .btn-update {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-track {
  background: #dbeafe;
  color: #1e40af;
}

.btn-edit {
  background: #f3f4f6;
  color: #374151;
}

.btn-update {
  background: #dcfce7;
  color: #16a34a;
}

.btn-track:hover { background: #bfdbfe; }
.btn-edit:hover { background: #e5e7eb; }
.btn-update:hover { background: #bbf7d0; }

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
  max-width: 600px;
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

.form-section {
  margin-bottom: 24px;
}

.form-section h3 {
  margin: 0 0 16px 0;
  color: #1a1d29;
  font-size: 16px;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

.form-group input, .form-group select, .form-group textarea {
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
  .livraison-page {
    padding: 16px;
  }
  
  .delivery-info {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-input {
    max-width: none;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
