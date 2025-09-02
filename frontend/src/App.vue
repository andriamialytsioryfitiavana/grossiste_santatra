<template>
  <div
    class="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white bg-white text-gray-900 transition-colors duration-300"
  >
    <template v-if="shouldShowSidebar">
      <div class="flex flex-1">
        <MainSidebar :darkMode="darkMode" />
        <main class="flex-1 transition-all duration-300" :style="{ marginLeft: sidebarCollapsed ? '80px' : '280px' }">
          <router-view v-slot="{ Component }">
            <component :is="Component" :darkMode="darkMode" />
          </router-view>
        </main>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import MainSidebar from "./components/MainSidebar.vue";

export default {
  components: { MainSidebar },
  data() {
    return {
      darkMode: false,
      sidebarCollapsed: false,
      // Liste des pages qui doivent avoir le sidebar
      pagesWithSidebar: [
        'produit',       // Page de gestion des produits avec sidebar
        'fournisseurs',         // Page setup avec sidebar
        'commandes',     // Page dashboard avec sidebar
        'tableau-bord',
        'stock',
        'facture',
        'rapports',
        'parametre', 
        'livraison',
        'deconnexion' // Page tableau de bord avec sidebar
        // Ajoutez ici les noms des autres nouvelles pages que vous créez
        // Exemple: 'users', etc.
      ]
    };
  },
  computed: {
    shouldShowSidebar() {
      // Le sidebar s'affiche uniquement sur les pages listées dans pagesWithSidebar
      return this.pagesWithSidebar.includes(this.$route.name);
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
      this.persistDarkMode();
    },
    persistDarkMode() {
      this.$emit("dark-mode-changed", this.darkMode);
    },
    initializeDarkMode() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.darkMode = true;
        document.documentElement.classList.add("dark");
      }
    },
  },
  created() {
    this.initializeDarkMode();
  },
  mounted() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", (e) => {
        this.darkMode = e.matches;
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });
    }
  },
};
</script>