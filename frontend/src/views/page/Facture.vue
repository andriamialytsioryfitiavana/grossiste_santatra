<template>
  <div class="facture-page">
    <div class="page-header">
      <h1>Gestion des Factures</h1>
      <div class="header-actions">
        <button @click="showCreateModal = true" class="btn-primary">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Nouvelle Facture
        </button>
        <button @click="exportFactures" class="btn-secondary">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6z"/>
          </svg>
          Exporter
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Rechercher par numéro ou client..." class="search-input">
      <select v-model="statusFilter" class="filter-select">
        <option value="">Tous les statuts</option>
        <option value="brouillon">Brouillon</option>
        <option value="envoyee">Envoyée</option>
        <option value="payee">Payée</option>
        <option value="en-retard">En retard</option>
      </select>
      <input v-model="dateFilter" type="date" class="filter-date">
    </div>

    <!-- Invoices List -->
    <div class="invoices-grid">
      <div v-for="facture in filteredFactures" :key="facture.id" class="invoice-card">
        <div class="invoice-header">
          <div class="invoice-number">#{{ facture.numero }}</div>
          <div :class="['invoice-status', facture.status]">
            {{ getStatusLabel(facture.status) }}
          </div>
        </div>
        
        <div class="invoice-info">
          <div class="client-section">
            <h3>{{ facture.client }}</h3>
            <p>{{ facture.email }}</p>
          </div>
          
          <div class="invoice-details">
            <div class="detail-row">
              <span class="label">Date émission:</span>
              <span>{{ formatDate(facture.dateEmission) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date échéance:</span>
              <span>{{ formatDate(facture.dateEcheance) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Montant HT:</span>
              <span>{{ facture.montantHT.toLocaleString() }} Ar</span>
            </div>
            <div class="detail-row">
              <span class="label">TVA:</span>
              <span>{{ facture.tva.toLocaleString() }} Ar</span>
            </div>
            <div class="detail-row total">
              <span class="label">Total TTC:</span>
              <span class="amount">{{ facture.montantTTC.toLocaleString() }} Ar</span>
            </div>
          </div>
        </div>

        <div class="invoice-actions">
          <button @click="viewInvoice(facture)" class="btn-view">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            Voir
          </button>
          <button @click="editInvoice(facture)" class="btn-edit">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Modifier
          </button>
          <button @click="downloadPDF(facture)" class="btn-download">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            PDF
          </button>
          <button @click="sendInvoice(facture)" class="btn-send" :disabled="facture.status === 'envoyee'">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            Envoyer
          </button>
        </div>
      </div>
    </div>

    <!-- Create Invoice Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content large" @click.stop>
        <div class="modal-header">
          <h2>Nouvelle Facture</h2>
          <button @click="closeCreateModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createInvoice">
            <div class="form-section">
              <h3>Informations Client</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>Client *</label>
                  <input v-model="invoiceForm.client" type="text" required>
                </div>
                <div class="form-group">
                  <label>Email *</label>
                  <input v-model="invoiceForm.email" type="email" required>
                </div>
              </div>
              <div class="form-group">
                <label>Adresse</label>
                <textarea v-model="invoiceForm.adresse" rows="2"></textarea>
              </div>
            </div>

            <div class="form-section">
              <h3>Détails Facture</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>Date d'émission *</label>
                  <input v-model="invoiceForm.dateEmission" type="date" required>
                </div>
                <div class="form-group">
                  <label>Date d'échéance *</label>
                  <input v-model="invoiceForm.dateEcheance" type="date" required>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Articles</h3>
              <div class="items-table">
                <div class="items-header">
                  <div>Description</div>
                  <div>Quantité</div>
                  <div>Prix unitaire</div>
                  <div>Total</div>
                  <div>Action</div>
                </div>
                <div v-for="(item, index) in invoiceForm.items" :key="index" class="item-row">
                  <input v-model="item.description" type="text" placeholder="Description">
                  <input v-model.number="item.quantite" type="number" min="1">
                  <input v-model.number="item.prix" type="number" min="0">
                  <div class="item-total">{{ (item.quantite * item.prix).toLocaleString() }} Ar</div>
                  <button type="button" @click="removeItem(index)" class="btn-remove">×</button>
                </div>
                <button type="button" @click="addItem" class="btn-add-item">+ Ajouter un article</button>
              </div>
            </div>

            <div class="form-section">
              <div class="totals">
                <div class="total-row">
                  <span>Sous-total HT:</span>
                  <span>{{ calculateSubtotal().toLocaleString() }} Ar</span>
                </div>
                <div class="total-row">
                  <span>TVA (20%):</span>
                  <span>{{ calculateTVA().toLocaleString() }} Ar</span>
                </div>
                <div class="total-row final">
                  <span>Total TTC:</span>
                  <span>{{ calculateTotal().toLocaleString() }} Ar</span>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeCreateModal" class="btn-cancel">Annuler</button>
              <button type="submit" class="btn-save">Créer la facture</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showCreateModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')

const invoiceForm = ref({
  client: '',
  email: '',
  adresse: '',
  dateEmission: new Date().toISOString().split('T')[0],
  dateEcheance: '',
  items: [
    { description: '', quantite: 1, prix: 0 }
  ]
})

const factures = ref([
  {
    id: 1,
    numero: 'FAC-2024-001',
    client: 'Jean Dupont',
    email: 'jean@email.com',
    dateEmission: '2024-01-15',
    dateEcheance: '2024-02-15',
    montantHT: 100000,
    tva: 20000,
    montantTTC: 120000,
    status: 'envoyee'
  },
  {
    id: 2,
    numero: 'FAC-2024-002',
    client: 'Marie Martin',
    email: 'marie@email.com',
    dateEmission: '2024-01-16',
    dateEcheance: '2024-02-16',
    montantHT: 75000,
    tva: 15000,
    montantTTC: 90000,
    status: 'brouillon'
  },
  {
    id: 3,
    numero: 'FAC-2024-003',
    client: 'Pierre Rabe',
    email: 'pierre@email.com',
    dateEmission: '2024-01-10',
    dateEcheance: '2024-02-10',
    montantHT: 150000,
    tva: 30000,
    montantTTC: 180000,
    status: 'payee'
  }
])

const filteredFactures = computed(() => {
  return factures.value.filter(facture => {
    const matchesSearch = !searchQuery.value || 
      facture.numero.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      facture.client.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || facture.status === statusFilter.value
    
    const matchesDate = !dateFilter.value || facture.dateEmission === dateFilter.value
    
    return matchesSearch && matchesStatus && matchesDate
  })
})

const getStatusLabel = (status) => {
  const labels = {
    'brouillon': 'Brouillon',
    'envoyee': 'Envoyée',
    'payee': 'Payée',
    'en-retard': 'En retard'
  }
  return labels[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const calculateSubtotal = () => {
  return invoiceForm.value.items.reduce((sum, item) => sum + (item.quantite * item.prix), 0)
}

const calculateTVA = () => {
  return calculateSubtotal() * 0.2
}

const calculateTotal = () => {
  return calculateSubtotal() + calculateTVA()
}

const addItem = () => {
  invoiceForm.value.items.push({ description: '', quantite: 1, prix: 0 })
}

const removeItem = (index) => {
  if (invoiceForm.value.items.length > 1) {
    invoiceForm.value.items.splice(index, 1)
  }
}

const createInvoice = () => {
  const newInvoice = {
    id: Date.now(),
    numero: `FAC-2024-${String(factures.value.length + 1).padStart(3, '0')}`,
    client: invoiceForm.value.client,
    email: invoiceForm.value.email,
    dateEmission: invoiceForm.value.dateEmission,
    dateEcheance: invoiceForm.value.dateEcheance,
    montantHT: calculateSubtotal(),
    tva: calculateTVA(),
    montantTTC: calculateTotal(),
    status: 'brouillon'
  }
  
  factures.value.push(newInvoice)
  closeCreateModal()
}

const closeCreateModal = () => {
  showCreateModal.value = false
  invoiceForm.value = {
    client: '',
    email: '',
    adresse: '',
    dateEmission: new Date().toISOString().split('T')[0],
    dateEcheance: '',
    items: [{ description: '', quantite: 1, prix: 0 }]
  }
}

const viewInvoice = (facture) => {
  console.log('Voir facture:', facture)
}

const editInvoice = (facture) => {
  console.log('Modifier facture:', facture)
}

const downloadPDF = (facture) => {
  console.log('Télécharger PDF:', facture)
}

const sendInvoice = (facture) => {
  if (facture.status === 'brouillon') {
    facture.status = 'envoyee'
  }
}

const exportFactures = () => {
  console.log('Exporter factures')
}
</script>

<style scoped>
.facture-page {
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

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary {
  background: #21d4a5;
  color: white;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
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

.invoices-grid {
  display: grid;
  gap: 16px;
}

.invoice-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.invoice-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.invoice-number {
  font-weight: 700;
  font-size: 18px;
  color: #1a1d29;
}

.invoice-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.invoice-status.brouillon {
  background: #f3f4f6;
  color: #6b7280;
}

.invoice-status.envoyee {
  background: #dbeafe;
  color: #1e40af;
}

.invoice-status.payee {
  background: #dcfce7;
  color: #16a34a;
}

.invoice-status.en-retard {
  background: #fef2f2;
  color: #dc2626;
}

.invoice-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.invoice-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.detail-row.total {
  font-weight: 600;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
  margin-top: 8px;
}

.label {
  color: #6b7280;
}

.amount {
  color: #21d4a5;
  font-weight: 600;
}

.invoice-actions {
  display: flex;
  gap: 8px;
}

.btn-view, .btn-edit, .btn-download, .btn-send {
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

.btn-view {
  background: #f3f4f6;
  color: #374151;
}

.btn-edit {
  background: #dbeafe;
  color: #1e40af;
}

.btn-download {
  background: #fef3c7;
  color: #d97706;
}

.btn-send {
  background: #dcfce7;
  color: #16a34a;
}

.btn-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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

.modal-content.large {
  max-width: 800px;
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

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.items-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.items-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
}

.item-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  align-items: center;
}

.item-row input {
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}

.item-total {
  font-weight: 600;
  color: #1a1d29;
}

.btn-remove {
  background: #fef2f2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-weight: 600;
}

.btn-add-item {
  padding: 12px;
  background: #f8fafc;
  border: 1px dashed #d1d5db;
  color: #21d4a5;
  cursor: pointer;
  font-weight: 600;
}

.totals {
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.total-row.final {
  font-weight: 700;
  font-size: 18px;
  color: #1a1d29;
  border-top: 1px solid #d1d5db;
  padding-top: 8px;
  margin-top: 8px;
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
  .facture-page {
    padding: 16px;
  }
  
  .invoice-info {
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
  
  .items-header, .item-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
