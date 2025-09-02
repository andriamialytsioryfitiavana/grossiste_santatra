<template>
  <div class="parametre-page">
    <div class="page-header">
      <h1>Paramètres</h1>
    </div>

    <div class="settings-container">
      <!-- Company Settings -->
      <div class="settings-section">
        <h2>Informations de l'entreprise</h2>
        <div class="settings-card">
          <form @submit.prevent="saveCompanySettings">
            <div class="form-row">
              <div class="form-group">
                <label>Nom de l'entreprise *</label>
                <input v-model="companySettings.name" type="text" required>
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input v-model="companySettings.email" type="email" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Téléphone</label>
                <input v-model="companySettings.phone" type="tel">
              </div>
              <div class="form-group">
                <label>Site web</label>
                <input v-model="companySettings.website" type="url">
              </div>
            </div>
            <div class="form-group">
              <label>Adresse</label>
              <textarea v-model="companySettings.address" rows="3"></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>

      <!-- User Settings -->
      <div class="settings-section">
        <h2>Paramètres utilisateur</h2>
        <div class="settings-card">
          <form @submit.prevent="saveUserSettings">
            <div class="form-row">
              <div class="form-group">
                <label>Nom d'utilisateur *</label>
                <input v-model="userSettings.username" type="text" required>
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input v-model="userSettings.email" type="email" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Prénom</label>
                <input v-model="userSettings.firstName" type="text">
              </div>
              <div class="form-group">
                <label>Nom</label>
                <input v-model="userSettings.lastName" type="text">
              </div>
            </div>
            <div class="form-group">
              <label>Langue</label>
              <select v-model="userSettings.language">
                <option value="fr">Français</option>
                <option value="mg">Malagasy</option>
                <option value="en">English</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>

      <!-- System Settings -->
      <div class="settings-section">
        <h2>Paramètres système</h2>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-info">
              <h3>Mode sombre</h3>
              <p>Activer le thème sombre pour l'interface</p>
            </div>
            <div class="setting-control">
              <label class="toggle">
                <input v-model="systemSettings.darkMode" type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Notifications email</h3>
              <p>Recevoir des notifications par email</p>
            </div>
            <div class="setting-control">
              <label class="toggle">
                <input v-model="systemSettings.emailNotifications" type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Sauvegarde automatique</h3>
              <p>Sauvegarder automatiquement les données</p>
            </div>
            <div class="setting-control">
              <label class="toggle">
                <input v-model="systemSettings.autoBackup" type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Devise</h3>
              <p>Devise par défaut pour les prix</p>
            </div>
            <div class="setting-control">
              <select v-model="systemSettings.currency">
                <option value="MGA">Ariary (MGA)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar (USD)</option>
              </select>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Taux de TVA</h3>
              <p>Taux de TVA par défaut (%)</p>
            </div>
            <div class="setting-control">
              <input v-model.number="systemSettings.taxRate" type="number" min="0" max="100" step="0.1">
            </div>
          </div>

          <div class="form-actions">
            <button @click="saveSystemSettings" class="btn-save">Enregistrer</button>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="settings-section">
        <h2>Sécurité</h2>
        <div class="settings-card">
          <form @submit.prevent="changePassword">
            <div class="form-group">
              <label>Mot de passe actuel *</label>
              <input v-model="passwordForm.currentPassword" type="password" required>
            </div>
            <div class="form-group">
              <label>Nouveau mot de passe *</label>
              <input v-model="passwordForm.newPassword" type="password" required>
            </div>
            <div class="form-group">
              <label>Confirmer le mot de passe *</label>
              <input v-model="passwordForm.confirmPassword" type="password" required>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save">Changer le mot de passe</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Data Management -->
      <div class="settings-section">
        <h2>Gestion des données</h2>
        <div class="settings-card">
          <div class="data-actions">
            <div class="action-item">
              <div class="action-info">
                <h3>Exporter les données</h3>
                <p>Télécharger toutes vos données au format JSON</p>
              </div>
              <button @click="exportData" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6z"/>
                </svg>
                Exporter
              </button>
            </div>

            <div class="action-item">
              <div class="action-info">
                <h3>Sauvegarder la base de données</h3>
                <p>Créer une sauvegarde complète de la base de données</p>
              </div>
              <button @click="backupDatabase" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Sauvegarder
              </button>
            </div>

            <div class="action-item danger">
              <div class="action-info">
                <h3>Réinitialiser les données</h3>
                <p>Supprimer toutes les données (action irréversible)</p>
              </div>
              <button @click="resetData" class="btn-danger">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const companySettings = ref({
  name: 'Grossiste Santatra',
  email: 'contact@grossiste-santatra.mg',
  phone: '+261 34 12 345 67',
  website: 'www.grossiste-santatra.mg',
  address: 'Antananarivo, Madagascar'
})

const userSettings = ref({
  username: 'admin',
  email: 'admin@grossiste-santatra.mg',
  firstName: 'Admin',
  lastName: 'User',
  language: 'fr'
})

const systemSettings = ref({
  darkMode: false,
  emailNotifications: true,
  autoBackup: true,
  currency: 'MGA',
  taxRate: 20.0
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const saveCompanySettings = () => {
  console.log('Sauvegarde des paramètres entreprise:', companySettings.value)
  // Simulate API call
  alert('Paramètres de l\'entreprise sauvegardés avec succès!')
}

const saveUserSettings = () => {
  console.log('Sauvegarde des paramètres utilisateur:', userSettings.value)
  // Simulate API call
  alert('Paramètres utilisateur sauvegardés avec succès!')
}

const saveSystemSettings = () => {
  console.log('Sauvegarde des paramètres système:', systemSettings.value)
  // Simulate API call
  alert('Paramètres système sauvegardés avec succès!')
}

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas!')
    return
  }
  
  console.log('Changement de mot de passe')
  // Simulate API call
  alert('Mot de passe changé avec succès!')
  
  // Reset form
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const exportData = () => {
  console.log('Export des données')
  alert('Export des données en cours...')
}

const backupDatabase = () => {
  console.log('Sauvegarde de la base de données')
  alert('Sauvegarde de la base de données en cours...')
}

const resetData = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
    console.log('Réinitialisation des données')
    alert('Données réinitialisées!')
  }
}
</script>

<style scoped>
.parametre-page {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0;
}

.settings-container {
  max-width: 800px;
  margin: 0 auto;
}

.settings-section {
  margin-bottom: 32px;
}

.settings-section h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0 0 16px 0;
}

.settings-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.btn-save, .btn-secondary, .btn-danger {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-save {
  background: #21d4a5;
  color: white;
}

.btn-save:hover {
  background: #1ea87a;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.setting-info p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.setting-control {
  display: flex;
  align-items: center;
}

.setting-control input, .setting-control select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #21d4a5;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.data-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.action-item.danger {
  border-color: #fecaca;
  background: #fef2f2;
}

.action-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.action-info p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .parametre-page {
    padding: 16px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .action-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
