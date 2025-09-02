<template>
  <div class="stock-page">
    <div class="page-header">
      <h1>Gestion du Stock</h1>
      <div class="header-actions">
        <button @click="showAddModal = true" class="btn-primary">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Ajouter Stock
        </button>
        <button @click="exportStock" class="btn-secondary">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6z"/>
          </svg>
          Exporter
        </button>
      </div>
    </div>

    <!-- Stock Summary -->
    <div class="stock-summary">
      <div class="summary-card">
        <div class="summary-icon total">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <div class="summary-content">
          <h3>{{ totalProducts }}</h3>
          <p>Produits totaux</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon low">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        </div>
        <div class="summary-content">
          <h3>{{ lowStockCount }}</h3>
          <p>Stock faible</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon out">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div class="summary-content">
          <h3>{{ outOfStockCount }}</h3>
          <p>Rupture de stock</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon value">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        </div>
        <div class="summary-content">
          <h3>{{ totalValue }} Ar</h3>
          <p>Valeur totale</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Rechercher un produit..." class="search-input">
      <select v-model="categoryFilter" class="filter-select">
        <option value="">Toutes catégories</option>
        <option value="Électronique">Électronique</option>
        <option value="Alimentaire">Alimentaire</option>
        <option value="Textile">Textile</option>
      </select>
      <select v-model="stockFilter" class="filter-select">
        <option value="">Tous les stocks</option>
        <option value="low">Stock faible</option>
        <option value="out">Rupture de stock</option>
        <option value="normal">Stock normal</option>
      </select>
    </div>

    <!-- Stock Table -->
    <div class="stock-table-container">
      <table class="stock-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Catégorie</th>
            <th>Stock actuel</th>
            <th>Stock minimum</th>
            <th>Prix unitaire</th>
            <th>Valeur stock</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredStock" :key="item.id" :class="getRowClass(item)">
            <td>
              <div class="product-cell">
                <div class="product-image">{{ item.nom.charAt(0) }}</div>
                <div class="product-info">
                  <div class="product-name">{{ item.nom }}</div>
                  <div class="product-code">{{ item.code }}</div>
                </div>
              </div>
            </td>
            <td>{{ item.categorie }}</td>
            <td>
              <span :class="['stock-quantity', getStockClass(item)]">
                {{ item.quantite }}
              </span>
            </td>
            <td>{{ item.stockMin }}</td>
            <td>{{ item.prix }} Ar</td>
            <td>{{ (item.quantite * item.prix).toLocaleString() }} Ar</td>
            <td>
              <span :class="['status-badge', getStockStatus(item)]">
                {{ getStockStatusLabel(item) }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button @click="adjustStock(item)" class="btn-adjust">Ajuster</button>
                <button @click="editItem(item)" class="btn-edit">Modifier</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingItem" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingItem ? 'Modifier' : 'Ajouter' }} Stock</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveItem">
            <div class="form-row">
              <div class="form-group">
                <label>Nom du produit *</label>
                <input v-model="itemForm.nom" type="text" required>
              </div>
              <div class="form-group">
                <label>Code produit</label>
                <input v-model="itemForm.code" type="text">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Catégorie</label>
                <select v-model="itemForm.categorie">
                  <option value="Électronique">Électronique</option>
                  <option value="Alimentaire">Alimentaire</option>
                  <option value="Textile">Textile</option>
                </select>
              </div>
              <div class="form-group">
                <label>Prix unitaire *</label>
                <input v-model.number="itemForm.prix" type="number" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Quantité *</label>
                <input v-model.number="itemForm.quantite" type="number" required>
              </div>
              <div class="form-group">
                <label>Stock minimum</label>
                <input v-model.number="itemForm.stockMin" type="number">
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

    <!-- Stock Adjustment Modal -->
    <div v-if="showAdjustModal" class="modal-overlay" @click="closeAdjustModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Ajuster le Stock - {{ adjustingItem?.nom }}</h2>
          <button @click="closeAdjustModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <div class="current-stock">
            <p>Stock actuel: <strong>{{ adjustingItem?.quantite }}</strong></p>
          </div>
          <form @submit.prevent="saveAdjustment">
            <div class="form-group">
              <label>Type d'ajustement</label>
              <select v-model="adjustmentType">
                <option value="add">Ajouter au stock</option>
                <option value="remove">Retirer du stock</option>
                <option value="set">Définir la quantité</option>
              </select>
            </div>
            <div class="form-group">
              <label>Quantité</label>
              <input v-model.number="adjustmentQuantity" type="number" required>
            </div>
            <div class="form-group">
              <label>Motif</label>
              <textarea v-model="adjustmentReason" rows="3" placeholder="Raison de l'ajustement..."></textarea>
            </div>
            <div class="form-actions">
              <button type="button" @click="closeAdjustModal" class="btn-cancel">Annuler</button>
              <button type="submit" class="btn-save">Ajuster</button>
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
const showAdjustModal = ref(false)
const editingItem = ref(null)
const adjustingItem = ref(null)
const searchQuery = ref('')
const categoryFilter = ref('')
const stockFilter = ref('')

const itemForm = ref({
  nom: '',
  code: '',
  categorie: 'Électronique',
  prix: 0,
  quantite: 0,
  stockMin: 5
})

const adjustmentType = ref('add')
const adjustmentQuantity = ref(0)
const adjustmentReason = ref('')

const stockItems = ref([
  {
    id: 1,
    nom: 'iPhone 13',
    code: 'IP13-001',
    categorie: 'Électronique',
    quantite: 25,
    stockMin: 10,
    prix: 800000
  },
  {
    id: 2,
    nom: 'Samsung Galaxy S21',
    code: 'SG21-002',
    categorie: 'Électronique',
    quantite: 5,
    stockMin: 10,
    prix: 750000
  },
  {
    id: 3,
    nom: 'Riz Makalioka',
    code: 'RIZ-003',
    categorie: 'Alimentaire',
    quantite: 0,
    stockMin: 50,
    prix: 3500
  },
  {
    id: 4,
    nom: 'T-shirt Coton',
    code: 'TSH-004',
    categorie: 'Textile',
    quantite: 150,
    stockMin: 20,
    prix: 25000
  }
])

const filteredStock = computed(() => {
  return stockItems.value.filter(item => {
    const matchesSearch = !searchQuery.value || 
      item.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !categoryFilter.value || item.categorie === categoryFilter.value
    
    const matchesStock = !stockFilter.value || 
      (stockFilter.value === 'low' && item.quantite <= item.stockMin && item.quantite > 0) ||
      (stockFilter.value === 'out' && item.quantite === 0) ||
      (stockFilter.value === 'normal' && item.quantite > item.stockMin)
    
    return matchesSearch && matchesCategory && matchesStock
  })
})

const totalProducts = computed(() => stockItems.value.length)
const lowStockCount = computed(() => stockItems.value.filter(item => item.quantite <= item.stockMin && item.quantite > 0).length)
const outOfStockCount = computed(() => stockItems.value.filter(item => item.quantite === 0).length)
const totalValue = computed(() => stockItems.value.reduce((sum, item) => sum + (item.quantite * item.prix), 0))

const getStockClass = (item) => {
  if (item.quantite === 0) return 'out-of-stock'
  if (item.quantite <= item.stockMin) return 'low-stock'
  return 'normal-stock'
}

const getStockStatus = (item) => {
  if (item.quantite === 0) return 'out'
  if (item.quantite <= item.stockMin) return 'low'
  return 'normal'
}

const getStockStatusLabel = (item) => {
  if (item.quantite === 0) return 'Rupture'
  if (item.quantite <= item.stockMin) return 'Faible'
  return 'Normal'
}

const getRowClass = (item) => {
  if (item.quantite === 0) return 'row-out-of-stock'
  if (item.quantite <= item.stockMin) return 'row-low-stock'
  return ''
}

const adjustStock = (item) => {
  adjustingItem.value = item
  adjustmentType.value = 'add'
  adjustmentQuantity.value = 0
  adjustmentReason.value = ''
  showAdjustModal.value = true
}

const editItem = (item) => {
  editingItem.value = item
  itemForm.value = { ...item }
  showAddModal.value = true
}

const saveItem = () => {
  if (editingItem.value) {
    const index = stockItems.value.findIndex(item => item.id === editingItem.value.id)
    stockItems.value[index] = { ...itemForm.value, id: editingItem.value.id }
  } else {
    const newItem = {
      ...itemForm.value,
      id: Date.now(),
      code: itemForm.value.code || `PRD-${Date.now().toString().slice(-3)}`
    }
    stockItems.value.push(newItem)
  }
  closeModal()
}

const saveAdjustment = () => {
  const item = adjustingItem.value
  const index = stockItems.value.findIndex(i => i.id === item.id)
  
  let newQuantity = item.quantite
  
  switch (adjustmentType.value) {
    case 'add':
      newQuantity += adjustmentQuantity.value
      break
    case 'remove':
      newQuantity = Math.max(0, newQuantity - adjustmentQuantity.value)
      break
    case 'set':
      newQuantity = adjustmentQuantity.value
      break
  }
  
  stockItems.value[index].quantite = newQuantity
  closeAdjustModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingItem.value = null
  itemForm.value = {
    nom: '',
    code: '',
    categorie: 'Électronique',
    prix: 0,
    quantite: 0,
    stockMin: 5
  }
}

const closeAdjustModal = () => {
  showAdjustModal.value = false
  adjustingItem.value = null
}

const exportStock = () => {
  console.log('Exporter le stock')
}
</script>

<style scoped>
.stock-page {
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

.btn-primary:hover { background: #1ea87a; }
.btn-secondary:hover { background: #f9fafb; }

.stock-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.summary-icon.total { background: #3b82f6; }
.summary-icon.low { background: #f59e0b; }
.summary-icon.out { background: #ef4444; }
.summary-icon.value { background: #10b981; }

.summary-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.summary-content p {
  color: #6b7280;
  margin: 0;
  font-size: 14px;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-input {
  flex: 1;
  max-width: 300px;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
}

.stock-table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stock-table {
  width: 100%;
  border-collapse: collapse;
}

.stock-table th {
  background: #f8fafc;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.stock-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-image {
  width: 40px;
  height: 40px;
  background: #21d4a5;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.product-name {
  font-weight: 600;
  color: #1a1d29;
}

.product-code {
  font-size: 12px;
  color: #6b7280;
}

.stock-quantity {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.stock-quantity.normal-stock {
  background: #dcfce7;
  color: #16a34a;
}

.stock-quantity.low-stock {
  background: #fef3c7;
  color: #d97706;
}

.stock-quantity.out-of-stock {
  background: #fef2f2;
  color: #dc2626;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.normal {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge.low {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.out {
  background: #fef2f2;
  color: #dc2626;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-adjust, .btn-edit {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-adjust {
  background: #dbeafe;
  color: #1e40af;
}

.btn-edit {
  background: #f3f4f6;
  color: #374151;
}

.btn-adjust:hover { background: #bfdbfe; }
.btn-edit:hover { background: #e5e7eb; }

.row-low-stock {
  background: #fffbeb;
}

.row-out-of-stock {
  background: #fef2f2;
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

.current-stock {
  background: #f8fafc;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
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
  .stock-page {
    padding: 16px;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .search-input {
    max-width: none;
  }
  
  .stock-table-container {
    overflow-x: auto;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
