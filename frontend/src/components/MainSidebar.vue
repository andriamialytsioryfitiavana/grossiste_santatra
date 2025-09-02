<template>
  <div class="sidebar-container">
    <!-- Main Sidebar -->
    <nav :class="['sidebar', { 'is-collapsed': collapsed }]">
      <!-- Brand -->
      <div class="brand" @click="toggle">
        <div class="logo">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#21d4a5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <span v-if="!collapsed" class="brand-text">GROSSISTE<br>SANTATRA</span>
      </div>

      <!-- Navigation Items -->
      <div class="nav-section">
        <div class="nav-item" :class="{ active: activeItem === 'tableau-bord' }" @click="setActive('tableau-bord')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Tableau de bord</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'produit' }" @click="setActive('produit')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 6h-2c0-2.18-1.79-4-4-4H10C7.79 2 6 3.82 6 6H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4c1.1 0 2 .9 2 2H8c0-1.1.9-2 2-2z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Produit</span>
        </div>

        <div class="nav-item active-highlight" :class="{ active: activeItem === 'commandes' }" @click="setActive('commandes')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v2h-2v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H2V4h5zM9 2v2h6V2H9zm9 4H6v13h12V6z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Commandes</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'fournisseurs' }" @click="setActive('fournisseurs')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Fournisseurs</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'stock' }" @click="setActive('stock')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Stock</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'facture' }" @click="setActive('facture')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Facture</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'rapports' }" @click="setActive('rapports')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Rapports</span>
        </div>

        <div class="section-divider" v-if="!collapsed"></div>

        <div class="nav-item wallet-highlight" :class="{ active: activeItem === 'parametre' }" @click="setActive('parametre')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Parametre</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'livraison' }" @click="setActive('livraison')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Livraison</span>
        </div>

        <div class="nav-item" :class="{ active: activeItem === 'deconnexion' }" @click="setActive('deconnexion')">
          <div class="nav-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
          </div>
          <span v-if="!collapsed" class="nav-label">Déconnexion</span>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="social-icons">
        <div class="social-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
        <div class="social-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </div>
        <div class="social-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.378-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
          </svg>
        </div>
        <div class="social-icon reddit">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </div>
      </div>
    </nav>

    <!-- Collapsed Sidebar -->
    <nav v-if="collapsed" class="collapsed-sidebar">
      <div class="collapsed-brand" @click="toggle">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#21d4a5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      
      <div class="collapsed-items">
        <div class="collapsed-item" :class="{ active: activeItem === 'tableau-bord' }" @click="setActive('tableau-bord')">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <div class="collapsed-item" :class="{ active: activeItem === 'produit' }" @click="setActive('produit')">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20 6h-2c0-2.18-1.79-4-4-4H10C7.79 2 6 3.82 6 6H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4c1.1 0 2 .9 2 2H8c0-1.1.9-2 2-2z"/>
          </svg>
        </div>
        <div class="collapsed-item active" :class="{ active: activeItem === 'commandes' }" @click="setActive('commandes')">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v2h-2v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H2V4h5zM9 2v2h6V2H9zm9 4H6v13h12V6z"/>
          </svg>
        </div>
        <div class="collapsed-item wallet-btn" :class="{ active: activeItem === 'parametre' }" @click="setActive('parametre')">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06z"/>
          </svg>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  darkMode: { type: Boolean, default: false }
});

const router = useRouter();
const route = useRoute();
const collapsed = ref(false);
const activeItem = ref('commandes');

function toggle() {
  collapsed.value = !collapsed.value;
}

function setActive(id) {
  activeItem.value = id;
  
  // Navigate to the appropriate page
  switch(id) {
    case 'tableau-bord':
      router.push('/tableau-de-bord');
      break;
    case 'produit':
      router.push('/produit');
      break;
    case 'commandes':
      router.push('/commandes');
      break;
    case 'fournisseurs':
      router.push('/fournisseurs');
      break;
    case 'stock':
      router.push('/stock');
      break;
    case 'facture':
      router.push('/facture');
      break;
    case 'rapports':
      router.push('/rapports');
      break;
    case 'parametre':
      router.push('/parametre');
      break;
    case 'livraison':
      router.push('/livraison');
      break;
    case 'deconnexion':
      // Handle logout
      console.log('Déconnexion');
      break;
    default:
      console.log(`Navigation vers ${id}`);
  }
}
</script>


<style scoped>
.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
}

/* Main Sidebar */
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1d29 0%, #16192a 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}

.sidebar.is-collapsed {
  width: 80px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logo {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #21d4a5 0%, #1ea87a 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(33, 212, 165, 0.3);
}

.brand-text {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-align: left;
}

/* Navigation Section */
.nav-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(4px);
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(33, 212, 165, 0.15) 0%, rgba(33, 212, 165, 0.05) 100%);
  border-left: 3px solid #21d4a5;
  padding-left: 9px;
}

.nav-item.active-highlight {
  background: linear-gradient(90deg, #21d4a5 0%, #1ea87a 100%);
  color: #1a1d29;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(33, 212, 165, 0.4);
}

.nav-item.wallet-highlight {
  background: linear-gradient(90deg, #00d4ff 0%, #0099cc 100%);
  color: #1a1d29;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.4);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.nav-item:hover .nav-icon,
.nav-item.active .nav-icon {
  color: #21d4a5;
}

.nav-item.active-highlight .nav-icon,
.nav-item.wallet-highlight .nav-icon {
  color: currentColor;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
  color: #d1d5db;
  transition: color 0.2s ease;
}

.nav-item:hover .nav-label,
.nav-item.active .nav-label {
  color: #ffffff;
}

.nav-item.active-highlight .nav-label,
.nav-item.wallet-highlight .nav-label {
  color: currentColor;
}

.section-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px 0;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 12px;
  padding: 16px 8px;
  justify-content: center;
}

.social-icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #9ca3af;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #21d4a5;
  transform: translateY(-2px);
}

.social-icon.reddit {
  color: #ff4500;
}

/* Collapsed Sidebar */
.collapsed-sidebar {
  width: 80px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1d29 0%, #16192a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 12px;
  box-sizing: border-box;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}

.collapsed-brand {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #21d4a5 0%, #1ea87a 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(33, 212, 165, 0.3);
}

.collapsed-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.collapsed-item {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #9ca3af;
}

.collapsed-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #21d4a5;
  transform: scale(1.05);
}

.collapsed-item.active {
  background: linear-gradient(135deg, #21d4a5 0%, #1ea87a 100%);
  color: #1a1d29;
  box-shadow: 0 4px 16px rgba(33, 212, 165, 0.4);
}

.collapsed-item.wallet-btn {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #1a1d29;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100vw;
    border-radius: 0;
  }
  
  .collapsed-sidebar {
    width: 80px;
  }
}
</style>