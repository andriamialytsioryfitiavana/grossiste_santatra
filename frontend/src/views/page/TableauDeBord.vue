<template>
  <div>
    <h1>groupe vody</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Reactive data
const salesData = ref([])
const isLoading = ref(true)

// Methods
const loadDashboardData = async () => {
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.tableau-de-bord {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

.dashboard-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.sales { background: linear-gradient(135deg, #21d4a5 0%, #1ea87a 100%); }
.stat-icon.orders { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
.stat-icon.products { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.stat-icon.suppliers { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0 0 4px 0;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.stat-change {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.stat-change.positive {
  background: #dcfce7;
  color: #16a34a;
}

.stat-change.negative {
  background: #fef2f2;
  color: #dc2626;
}

.stat-change.neutral {
  background: #f3f4f6;
  color: #6b7280;
}

/* Charts Section */
.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: white;
  border-radius: 16px;
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

.chart-filter {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  color: #374151;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: end;
  justify-content: center;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 12px;
  height: 100%;
}

.bar {
  width: 32px;
  background: linear-gradient(180deg, #21d4a5 0%, #1ea87a 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.bar:hover {
  opacity: 0.8;
}

.pie-chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

/* Activity Section */
.activity-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.activity-card, .quick-actions-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.activity-card h3, .quick-actions-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1d29;
  margin: 0 0 20px 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.activity-item:hover {
  background: #f9fafb;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.activity-icon.new-order { background: #21d4a5; }
.activity-icon.stock-alert { background: #f59e0b; }
.activity-icon.delivery { background: #3b82f6; }

.activity-content p {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #374151;
}

.activity-time {
  font-size: 12px;
  color: #9ca3af;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-action-btn:hover {
  background: #21d4a5;
  color: white;
  border-color: #21d4a5;
}

/* Responsive */
@media (max-width: 1024px) {
  .charts-section,
  .activity-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .tableau-de-bord {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
