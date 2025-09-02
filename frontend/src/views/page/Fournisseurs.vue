<template>
  <div class="fournisseurs-page">
    <div class="page-header">
      <h1>Gestion des Fournisseurs</h1>
      <button @click="showAddModal = true" class="btn-primary">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Nouveau Fournisseur
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Rechercher par nom ou email..." class="search-input">
      <select v-model="statusFilter" class="filter-select">
        <option value="">Tous les statuts</option>
        <option value="actif">Actif</option>
        <option value="inactif">Inactif</option>
      </select>
    </div>

    <!-- Suppliers Grid -->
    <div class="suppliers-grid">
      <div v-for="fournisseur in filteredFournisseurs" :key="fournisseur.id" class="supplier-card">
        <div class="supplier-header">
          <div class="supplier-avatar">
            {{ fournisseur.nom.charAt(0).toUpperCase() }}
          </div>
          <div :class="['supplier-status', fournisseur.status]">
            {{ fournisseur.status === 'actif' ? 'Actif' : 'Inactif' }}
          </div>
        </div>
        
        <div class="supplier-info">
          <h3 class="supplier-name">{{ fournisseur.nom }}</h3>
          <p class="supplier-category">{{ fournisseur.categorie }}</p>
          <div class="contact-info">
            <div class="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              {{ fournisseur.email }}
            </div>
            <div class="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              {{ fournisseur.telephone }}
            </div>
            <div class="contact-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {{ fournisseur.adresse }}
            </div>
          </div>
          <div class="supplier-stats">
            <div class="stat">
              <span class="stat-value">{{ fournisseur.commandes }}</span>
              <span class="stat-label">Commandes</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ fournisseur.produits }}</span>
              <span class="stat-label">Produits</span>
            </div>
          </div>
        </div>

        <div class="supplier-actions">
          <button @click="viewSupplier(fournisseur)" class="btn-view">Voir</button>
          <button @click="editSupplier(fournisseur)" class="btn-edit">Modifier</button>
          <button @click="deleteSupplier(fournisseur.id)" class="btn-delete">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingSupplier" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingSupplier ? 'Modifier' : 'Nouveau' }} Fournisseur</h2>
          <button @click="closeModal" class="btn-close">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveSupplier">
            <div class="form-row">
              <div class="form-group">
                <label>Nom *</label>
                <input v-model="supplierForm.nom" type="text" required>
              </div>
              <div class="form-group">
                <label>Catégorie</label>
                <select v-model="supplierForm.categorie">
                  <option value="Électronique">Électronique</option>
                  <option value="Alimentaire">Alimentaire</option>
                  <option value="Textile">Textile</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input v-model="supplierForm.email" type="email" required>
              </div>
              <div class="form-group">
                <label>Téléphone</label>
                <input v-model="supplierForm.telephone" type="tel">
              </div>
            </div>
            <div class="form-group">
              <label>Adresse</label>
              <textarea v-model="supplierForm.adresse" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Statut</label>
              <select v-model="supplierForm.status">
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
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
const editingSupplier = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')

const supplierForm = ref({
  nom: '',
  categorie: 'Électronique',
  email: '',
  telephone: '',
  adresse: '',
  status: 'actif'
})

const fournisseurs = ref([
  {
    id: 1,
    nom: 'TechSupply Madagascar',
    categorie: 'Électronique',
    email: 'contact@techsupply.mg',
    telephone: '+261 34 12 345 67',
    adresse: 'Antananarivo, Madagascar',
    status: 'actif',
    commandes: 45,
    produits: 120
  },
  {
    id: 2,
    nom: 'Alimentaire Tana',
    categorie: 'Alimentaire',
    email: 'info@alimtana.mg',
    telephone: '+261 33 98 765 43',
    adresse: 'Toamasina, Madagascar',
    status: 'actif',
    commandes: 32,
    produits: 85
  },
  {
    id: 3,
    nom: 'Textile Malagasy',
    categorie: 'Textile',
    email: 'vente@textilmg.com',
    telephone: '+261 32 55 444 33',
    adresse: 'Fianarantsoa, Madagascar',
    status: 'inactif',
    commandes: 18,
    produits: 67
  }
])

const filteredFournisseurs = computed(() => {
  return fournisseurs.value.filter(fournisseur => {
    const matchesSearch = !searchQuery.value || 
      fournisseur.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      fournisseur.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || fournisseur.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const viewSupplier = (fournisseur) => {
  console.log('Voir fournisseur:', fournisseur)
}

const editSupplier = (fournisseur) => {
  editingSupplier.value = fournisseur
  supplierForm.value = { ...fournisseur }
  showAddModal.value = true
}

const deleteSupplier = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
    fournisseurs.value = fournisseurs.value.filter(f => f.id !== id)
  }
}

const saveSupplier = () => {
  if (editingSupplier.value) {
    const index = fournisseurs.value.findIndex(f => f.id === editingSupplier.value.id)
    fournisseurs.value[index] = { ...supplierForm.value, id: editingSupplier.value.id }
  } else {
    const newSupplier = {
      ...supplierForm.value,
      id: Date.now(),
      commandes: 0,
      produits: 0
    }
    fournisseurs.value.push(newSupplier)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingSupplier.value = null
  supplierForm.value = {
    nom: '',
    categorie: 'Électronique',
    email: '',
    telephone: '',
    adresse: '',
    status: 'actif'
  }
}
</script>

<style scoped>
.fournisseurs-page {
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

.search-input {
  flex: 1;
  max-width: 400px;
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

.suppliers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.supplier-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.supplier-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.supplier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.supplier-avatar {
  width: 48px;
  height: 48px;
  background: #21d4a5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.supplier-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.supplier-status.actif {
  background: #dcfce7;
  color: #16a34a;
}

.supplier-status.inactif {
  background: #fef2f2;
  color: #dc2626;
}

.supplier-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.supplier-category {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 16px 0;
}

.contact-info {
  margin-bottom: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}

.contact-item svg {
  color: #9ca3af;
}

.supplier-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px solid #f3f4f6;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #1a1d29;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
}

.supplier-actions {
  display: flex;
  gap: 8px;
}

.btn-view, .btn-edit, .btn-delete {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
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

.form-group textarea {
  resize: vertical;
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
  .fournisseurs-page {
    padding: 16px;
  }
  
  .suppliers-grid {
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
