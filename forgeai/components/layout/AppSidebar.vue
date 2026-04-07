<template>
  <a-layout-sider
    width="280"
    collapsible
    class="glass-sidebar"
    :style="{ minHeight: '100vh', position: 'relative', zIndex: 2 }"
    v-model:collapsed="collapsed"
  >
    <div style="padding: 32px 24px 12px 24px;">
      <div style="font-weight: bold; font-size: 22px; color: #fff; letter-spacing: 1px;">⚡ ForgeAI</div>
      <div class="text-muted" style="font-size: 13px; margin-top: 2px;">Summit National Bank</div>
    </div>
    <a-divider style="border-color: rgba(255,255,255,0.08); margin: 0 0 16px 0;" />
    <a-menu
      theme="dark"
      mode="inline"
      :selectedKeys="[selectedKey]"
      :openKeys="openKeys"
      @update:selectedKeys="onSelect"
      @update:openKeys="onOpenChange"
      style="background: transparent; border: none; color: #fff;"
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
    <div style="position: absolute; bottom: 24px; left: 24px; right: 24px;">
      <div class="glass-card-subtle" style="padding: 16px; display: flex; align-items: center; gap: 12px;">
        <a-avatar style="background: #7c4dff;">JC</a-avatar>
        <div>
          <div style="font-weight: 500; color: #fff;">Jordan Chen</div>
          <div class="text-muted" style="font-size: 13px;">Platform Engineering Lead</div>
        </div>
        <a-tag color="purple" style="margin-left: auto;">Admin</a-tag>
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup>
import { ref, computed } from 'vue'
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
const collapsed = ref(false)
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
