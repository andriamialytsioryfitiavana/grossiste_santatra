<template>
  <div class="produit-container">
    <!-- Header -->
    <div class="header-section">
      <h1 class="page-title">Gestion des Produits</h1>
      <button class="btn-primary" @click="showAddModal = true">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Ajouter Produit
      </button>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="search-box">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
          v-model="searchTerm"
          class="search-input"
        />
      </div>
      <select v-model="selectedCategory" class="filter-select">
        <option value="">Toutes les catégories</option>
        <option value="electronique">Électronique</option>
        <option value="vetement">Vêtement</option>
        <option value="alimentaire">Alimentaire</option>
        <option value="maison">Maison</option>
      </select>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div 
        v-for="produit in filteredProduits" 
        :key="produit.id" 
        class="product-card"
      >
        <div class="product-image">
          <img :src="produit.image || '/placeholder-product.jpg'" :alt="produit.nom" />
          <div class="product-status" :class="produit.status">
            {{ produit.status === 'active' ? 'Actif' : 'Inactif' }}
          </div>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ produit.nom }}</h3>
          <p class="product-category">{{ produit.categorie }}</p>
          <div class="product-price">{{ produit.prix }} Ar</div>
          <div class="product-stock">Stock: {{ produit.stock }}</div>
        </div>

        <div class="product-actions">
          <button @click="editProduit(produit)" class="btn-edit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button @click="deleteProduit(produit.id)" class="btn-delete">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || editingProduit" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingProduit ? 'Modifier' : 'Ajouter' }} Produit</h2>
          <button @click="closeModal" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveProduit" class="modal-form">
          <div class="form-group">
            <label>Nom du produit</label>
            <input type="text" v-model="formData.nom" required class="form-input" />
          </div>

          <div class="form-group">
            <label>Catégorie</label>
            <select v-model="formData.categorie" required class="form-input">
              <option value="">Sélectionner une catégorie</option>
              <option value="electronique">Électronique</option>
              <option value="vetement">Vêtement</option>
              <option value="alimentaire">Alimentaire</option>
              <option value="maison">Maison</option>
            </select>
          </div>

          <div class="form-group">
            <label>Prix (Ar)</label>
            <input type="number" v-model="formData.prix" required class="form-input" />
          </div>

          <div class="form-group">
            <label>Stock</label>
            <input type="number" v-model="formData.stock" required class="form-input" />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="formData.description" class="form-input" rows="3"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Annuler</button>
            <button type="submit" class="btn-primary">
              {{ editingProduit ? 'Modifier' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const produits = ref([
  {
    id: 1,
    nom: 'Smartphone Samsung',
    categorie: 'electronique',
    prix: 250000,
    stock: 15,
    status: 'active',
    description: 'Smartphone dernière génération',
    image: null
  },
  {
    id: 2,
    nom: 'T-shirt Coton',
    categorie: 'vetement',
    prix: 15000,
    stock: 50,
    status: 'active',
    description: 'T-shirt 100% coton',
    image: null
  },
  {
    id: 3,
    nom: 'Riz Makalioka',
    categorie: 'alimentaire',
    prix: 3500,
    stock: 100,
    status: 'active',
    description: 'Riz de qualité supérieure',
    image: null
  }
])

const searchTerm = ref('')
const selectedCategory = ref('')
const showAddModal = ref(false)
const editingProduit = ref(null)
const formData = ref({
  nom: '',
  categorie: '',
  prix: 0,
  stock: 0,
  description: ''
})

// Computed
const filteredProduits = computed(() => {
  return produits.value.filter(produit => {
    const matchesSearch = produit.nom.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || produit.categorie === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

// Methods
const editProduit = (produit) => {
  editingProduit.value = produit
  formData.value = { ...produit }
}

const deleteProduit = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    const index = produits.value.findIndex(p => p.id === id)
    if (index > -1) {
      produits.value.splice(index, 1)
    }
  }
}

const saveProduit = () => {
  if (editingProduit.value) {
    // Modifier
    const index = produits.value.findIndex(p => p.id === editingProduit.value.id)
    if (index > -1) {
      produits.value[index] = { ...formData.value }
    }
  } else {
    // Ajouter
    const newProduit = {
      ...formData.value,
      id: Date.now(),
      status: 'active'
    }
    produits.value.push(newProduit)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingProduit.value = null
  formData.value = {
    nom: '',
    categorie: '',
    prix: 0,
    stock: 0,
    description: ''
  }
}

onMounted(() => {
  // Initialisation si nécessaire
})
</script>

<style scoped>
.produit-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.btn-primary {
  background: linear-gradient(135deg, #21d4a5 0%, #1ea87a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(33, 212, 165, 0.4);
}

.filters-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #21d4a5;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 200px;
  background: #f3f4f6;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.product-status.active {
  background: #d1fae5;
  color: #065f46;
}

.product-status.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.product-category {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 12px 0;
  text-transform: capitalize;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #21d4a5;
  margin-bottom: 8px;
}

.product-stock {
  font-size: 14px;
  color: #6b7280;
}

.product-actions {
  display: flex;
  gap: 8px;
  padding: 0 20px 20px;
}

.btn-edit, .btn-delete {
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #dbeafe;
  color: #1d4ed8;
}

.btn-edit:hover {
  background: #bfdbfe;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
}

.btn-delete:hover {
  background: #fecaca;
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

.modal-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #21d4a5;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .produit-container {
    color: white;
  }
  
  .page-title {
    color: white;
  }
  
  .product-card {
    background: #374151;
  }
  
  .modal-content {
    background: #374151;
  }
}
</style>
