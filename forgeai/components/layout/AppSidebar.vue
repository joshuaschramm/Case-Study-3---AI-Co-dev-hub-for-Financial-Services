<template>
  <a-layout-sider
    width="280"
    :class="['glass-sidebar', theme === 'light' ? 'glass-sidebar--light' : '']"
    :style="{ minHeight: '100vh', position: 'relative', zIndex: 2, color: theme === 'light' ? '#222' : '#fff' }"
  >
    <div style="padding: 32px 24px 12px 24px;">
      <img :src="theme === 'light' ? '/assets/logo-dark.svg' : '/assets/logo.svg'" alt="ForgeAI Logo" style="height: 36px; margin-bottom: 2px;" />
      <div :class="theme === 'light' ? 'text-dark' : 'text-muted'" style="font-size: 13px; margin-top: 2px;">Summit National Bank</div>
    </div>
    <a-divider style="border-color: rgba(255,255,255,0.08); margin: 0 0 16px 0;" />
    <div class="glass-card-subtle" style="padding: 16px; display: flex; align-items: center; gap: 12px; margin: 0 24px 18px 24px;">
      <div>
        <div :style="{ fontWeight: 500, color: theme === 'light' ? '#222' : '#fff' }">Jordan Chen</div>
        <div :class="theme === 'light' ? 'text-dark' : 'text-muted'" style="font-size: 13px;">Platform Engineering Lead</div>
      </div>
      <a-tag color="purple" style="margin-left: auto;">Admin</a-tag>
    </div>
    <a-menu
      :theme="theme"
      mode="inline"
      :selectedKeys="[selectedKey]"
      :openKeys="openKeys"
      @update:selectedKeys="onSelect"
      @update:openKeys="onOpenChange"
      :style="{ background: 'transparent', border: 'none', color: theme === 'light' ? '#222' : '#fff' }"
    >
      <a-menu-item-group key="overview" title="OVERVIEW">
        <a-menu-item key="/">
          <DashboardOutlined /> Command Center
        </a-menu-item>
        <a-menu-item key="/velocity">
          <RocketOutlined /> Team Velocity
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group key="ai-products" title="AI PRODUCTS">
        <a-menu-item key="/products">
          <AppstoreOutlined /> Product Catalog
        </a-menu-item>
        <a-menu-item key="/models">
          <ExperimentOutlined /> Model Registry
        </a-menu-item>
        <a-menu-item key="/deployments">
          <CloudUploadOutlined /> Deployments
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group key="engineering" title="ENGINEERING">
        <a-menu-item key="/components">
          <BuildOutlined /> Component Library
        </a-menu-item>
        <a-menu-item key="/pipelines">
          <ApiOutlined /> Pipeline Monitor
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group key="insights" title="INSIGHTS">
        <a-menu-item key="/analytics">
          <LineChartOutlined /> Performance Analytics
        </a-menu-item>
        <a-menu-item key="/costs">
          <DollarOutlined /> Cost & Usage
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
    <!-- User card moved to top -->
  </a-layout-sider>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DashboardOutlined,
  RocketOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  CloudUploadOutlined,
  BuildOutlined,
  ApiOutlined,
  LineChartOutlined,
  DollarOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const theme = inject('theme', 'dark')
const selectedKey = computed(() => route.path)
const openKeys = ref(['overview', 'ai-products', 'engineering', 'insights'])

function onSelect(keys) {
  if (keys[0] && keys[0] !== route.path) {
    router.push(keys[0])
  }
}
function onOpenChange(keys) {
  openKeys.value = keys
}
</script>
