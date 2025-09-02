<template>
  <div class="rapports-page">
    <div class="page-header">
      <h1>Rapports et Analyses</h1>
      <div class="header-actions">
        <select v-model="selectedPeriod" class="period-select">
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="3m">3 derniers mois</option>
          <option value="1y">1 an</option>
        </select>
        <button @click="exportReport" class="btn-primary">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6z"/>
          </svg>
          Exporter
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="metrics-grid">
      <div class="metric-card revenue">
        <div class="metric-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
        </div>
        <div class="metric-content">
          <h3>{{ totalRevenue.toLocaleString() }} Ar</h3>
          <p>Chiffre d'affaires</p>
          <span class="metric-change positive">+15.2%</span>
        </div>
      </div>

      <div class="metric-card orders">
        <div class="metric-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v2h-2v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H2V4h5z"/>
          </svg>
        </div>
        <div class="metric-content">
          <h3>{{ totalOrders }}</h3>
          <p>Commandes</p>
          <span class="metric-change positive">+8.7%</span>
        </div>
      </div>

      <div class="metric-card customers">
        <div class="metric-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 .96l-2.54 2.54c-.4.4-.4 1.06 0 1.46s1.06.4 1.46 0L15 11h1l1.5 4.5L15 18v4h2z"/>
          </svg>
        </div>
        <div class="metric-content">
          <h3>{{ totalCustomers }}</h3>
          <p>Clients actifs</p>
          <span class="metric-change positive">+12.3%</span>
        </div>
      </div>

      <div class="metric-card profit">
        <div class="metric-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
        </div>
        <div class="metric-content">
          <h3>{{ profitMargin }}%</h3>
          <p>Marge bénéficiaire</p>
          <span class="metric-change negative">-2.1%</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <div class="chart-card">
        <div class="chart-header">
          <h3>Évolution du chiffre d'affaires</h3>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color revenue"></div>
              <span>Revenus</span>
            </div>
            <div class="legend-item">
              <div class="legend-color profit"></div>
              <span>Bénéfices</span>
            </div>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div class="bar-group">
                <div class="bar revenue" style="height: 60%"></div>
                <div class="bar profit" style="height: 40%"></div>
              </div>
              <div class="bar-group">
                <div class="bar revenue" style="height: 80%"></div>
                <div class="bar profit" style="height: 55%"></div>
              </div>
              <div class="bar-group">
                <div class="bar revenue" style="height: 45%"></div>
                <div class="bar profit" style="height: 30%"></div>
              </div>
              <div class="bar-group">
                <div class="bar revenue" style="height: 90%"></div>
                <div class="bar profit" style="height: 70%"></div>
              </div>
              <div class="bar-group">
                <div class="bar revenue" style="height: 70%"></div>
                <div class="bar profit" style="height: 50%"></div>
              </div>
              <div class="bar-group">
                <div class="bar revenue" style="height: 85%"></div>
                <div class="bar profit" style="height: 65%"></div>
              </div>
              <div class="bar-group">
                <div class="bar revenue" style="height: 95%"></div>
                <div class="bar profit" style="height: 75%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>Répartition par catégorie</h3>
        </div>
        <div class="pie-chart-container">
          <div class="category-stats">
            <div class="category-item">
              <div class="category-color electronics"></div>
              <div class="category-info">
                <span class="category-name">Électronique</span>
                <span class="category-value">45%</span>
              </div>
            </div>
            <div class="category-item">
              <div class="category-color textile"></div>
              <div class="category-info">
                <span class="category-name">Textile</span>
                <span class="category-value">30%</span>
              </div>
            </div>
            <div class="category-item">
              <div class="category-color food"></div>
              <div class="category-info">
                <span class="category-name">Alimentaire</span>
                <span class="category-value">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Reports -->
    <div class="reports-section">
      <div class="report-card">
        <h3>Top Produits</h3>
        <div class="top-products">
          <div v-for="product in topProducts" :key="product.id" class="product-item">
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-category">{{ product.category }}</div>
            </div>
            <div class="product-stats">
              <div class="stat">
                <span class="stat-value">{{ product.sales }}</span>
                <span class="stat-label">Ventes</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ product.revenue.toLocaleString() }} Ar</span>
                <span class="stat-label">Revenus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="report-card">
        <h3>Performance Mensuelle</h3>
        <div class="monthly-performance">
          <div class="performance-header">
            <div>Mois</div>
            <div>Commandes</div>
            <div>Revenus</div>
            <div>Croissance</div>
          </div>
          <div v-for="month in monthlyData" :key="month.month" class="performance-row">
            <div class="month-name">{{ month.month }}</div>
            <div class="orders-count">{{ month.orders }}</div>
            <div class="revenue-amount">{{ month.revenue.toLocaleString() }} Ar</div>
            <div :class="['growth-rate', month.growth >= 0 ? 'positive' : 'negative']">
              {{ month.growth >= 0 ? '+' : '' }}{{ month.growth }}%
            </div>
          </div>
        </div>
      </div>

      <div class="report-card">
        <h3>Analyse des Clients</h3>
        <div class="customer-analysis">
          <div class="analysis-item">
            <div class="analysis-label">Nouveaux clients</div>
            <div class="analysis-value">{{ newCustomers }}</div>
            <div class="analysis-change positive">+{{ newCustomersGrowth }}%</div>
          </div>
          <div class="analysis-item">
            <div class="analysis-label">Clients récurrents</div>
            <div class="analysis-value">{{ returningCustomers }}</div>
            <div class="analysis-change positive">+{{ returningCustomersGrowth }}%</div>
          </div>
          <div class="analysis-item">
            <div class="analysis-label">Panier moyen</div>
            <div class="analysis-value">{{ averageOrderValue.toLocaleString() }} Ar</div>
            <div class="analysis-change negative">-{{ averageOrderValueChange }}%</div>
          </div>
          <div class="analysis-item">
            <div class="analysis-label">Taux de rétention</div>
            <div class="analysis-value">{{ retentionRate }}%</div>
            <div class="analysis-change positive">+{{ retentionRateChange }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('30d')

// Sample data
const totalRevenue = ref(2450000)
const totalOrders = ref(156)
const totalCustomers = ref(89)
const profitMargin = ref(23.5)

const newCustomers = ref(34)
const newCustomersGrowth = ref(18.2)
const returningCustomers = ref(55)
const returningCustomersGrowth = ref(8.7)
const averageOrderValue = ref(15700)
const averageOrderValueChange = ref(3.2)
const retentionRate = ref(67)
const retentionRateChange = ref(4.1)

const topProducts = ref([
  {
    id: 1,
    name: 'iPhone 13',
    category: 'Électronique',
    sales: 45,
    revenue: 36000000
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21',
    category: 'Électronique',
    sales: 32,
    revenue: 24000000
  },
  {
    id: 3,
    name: 'T-shirt Coton',
    category: 'Textile',
    sales: 78,
    revenue: 1950000
  },
  {
    id: 4,
    name: 'Riz Makalioka',
    category: 'Alimentaire',
    sales: 156,
    revenue: 546000
  }
])

const monthlyData = ref([
  { month: 'Janvier', orders: 142, revenue: 2100000, growth: 12.5 },
  { month: 'Février', orders: 156, revenue: 2450000, growth: 16.7 },
  { month: 'Mars', orders: 134, revenue: 2200000, growth: -10.2 },
  { month: 'Avril', orders: 178, revenue: 2800000, growth: 27.3 },
  { month: 'Mai', orders: 165, revenue: 2650000, growth: -5.4 },
  { month: 'Juin', orders: 189, revenue: 3100000, growth: 17.0 }
])

const exportReport = () => {
  console.log('Exporter rapport pour la période:', selectedPeriod.value)
}
</script>

<style scoped>
.rapports-page {
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
  align-items: center;
}

.period-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
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
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.metric-card.revenue .metric-icon { background: #10b981; }
.metric-card.orders .metric-icon { background: #3b82f6; }
.metric-card.customers .metric-icon { background: #8b5cf6; }
.metric-card.profit .metric-icon { background: #f59e0b; }

.metric-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.metric-content p {
  color: #6b7280;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.metric-change {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

.metric-change.positive {
  background: #dcfce7;
  color: #16a34a;
}

.metric-change.negative {
  background: #fef2f2;
  color: #dc2626;
}

.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.revenue { background: #21d4a5; }
.legend-color.profit { background: #3b82f6; }

.chart-container {
  height: 200px;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 16px;
  height: 100%;
}

.bar-group {
  display: flex;
  gap: 4px;
  align-items: end;
}

.bar {
  width: 20px;
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;
}

.bar.revenue { background: #21d4a5; }
.bar.profit { background: #3b82f6; }

.pie-chart-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.category-color.electronics { background: #21d4a5; }
.category-color.textile { background: #3b82f6; }
.category-color.food { background: #f59e0b; }

.category-info {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.category-name {
  font-weight: 500;
}

.category-value {
  font-weight: 600;
  color: #1a1d29;
}

.reports-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.report-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.report-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0 0 20px 0;
}

.top-products {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.product-name {
  font-weight: 600;
  color: #1a1d29;
}

.product-category {
  font-size: 12px;
  color: #6b7280;
}

.product-stats {
  display: flex;
  gap: 20px;
}

.stat {
  text-align: right;
}

.stat-value {
  display: block;
  font-weight: 600;
  color: #1a1d29;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
}

.monthly-performance {
  display: flex;
  flex-direction: column;
}

.performance-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 2px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
}

.performance-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.growth-rate.positive { color: #16a34a; }
.growth-rate.negative { color: #dc2626; }

.customer-analysis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.analysis-item {
  text-align: center;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.analysis-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.analysis-value {
  font-size: 20px;
  font-weight: 700;
  color: #1a1d29;
  margin-bottom: 4px;
}

.analysis-change {
  font-size: 12px;
  font-weight: 600;
}

.analysis-change.positive { color: #16a34a; }
.analysis-change.negative { color: #dc2626; }

@media (max-width: 768px) {
  .rapports-page {
    padding: 16px;
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .customer-analysis {
    grid-template-columns: 1fr;
  }
  
  .performance-header, .performance-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
