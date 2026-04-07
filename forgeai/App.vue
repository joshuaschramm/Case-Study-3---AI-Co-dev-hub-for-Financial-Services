<template>
  <a-config-provider :theme="themeConfig">
    <div class="forge-bg" style="min-height: 100vh;">
      <div class="forge-orb-container">
        <div class="forge-orb forge-orb--purple"></div>
        <div class="forge-orb forge-orb--teal"></div>
        <div class="forge-orb forge-orb--orange"></div>
      </div>
      <a-layout style="min-height: 100vh; background: transparent; position: relative; z-index: 1;">
        <AppSidebar />
        <a-layout>
          <AppHeader />
          <a-layout-content style="padding: 24px; position: relative; z-index: 1;">
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'

const themeConfig = {
  token: {
    colorPrimary: '#7C4DFF',
    colorSuccess: '#69F0AE',
    colorWarning: '#FFD740',
    colorError: '#FF5252',
    colorInfo: '#448AFF',
    colorBgBase: '#0a0a1a',
    colorBgContainer: 'transparent',
    colorBgElevated: 'rgba(20, 20, 40, 0.85)',
    colorBorder: 'rgba(255, 255, 255, 0.1)',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.45)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    controlHeight: 40,
  },
  algorithm: theme.darkAlgorithm,
}
</script>
