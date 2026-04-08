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
          <AppHeader :theme="appTheme" :notif-enabled="notifEnabled" @update:theme="setTheme" @update:notif-enabled="setNotifEnabled" />
          <a-layout-content style="padding: 24px; position: relative; z-index: 1;">
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script setup>

import { ref, computed, provide } from 'vue'
import { theme } from 'ant-design-vue'

import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'


const appTheme = ref('dark')
const notifEnabled = ref(true)
provide('theme', appTheme)

const themeConfig = computed(() => ({
  token: {
    colorPrimary: '#7C4DFF',
    colorSuccess: '#69F0AE',
    colorWarning: '#FFD740',
    colorError: '#FF5252',
    colorInfo: '#448AFF',
    colorBgBase: appTheme.value === 'dark' ? '#0a0a1a' : '#fff',
    colorBgContainer: 'transparent',
    colorBgElevated: appTheme.value === 'dark' ? 'rgba(20, 20, 40, 0.85)' : 'rgba(255,255,255,0.85)',
    colorBorder: 'rgba(255, 255, 255, 0.1)',
    colorText: appTheme.value === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#222',
    colorTextSecondary: appTheme.value === 'dark' ? 'rgba(255, 255, 255, 0.45)' : '#888',
    colorTextTertiary: appTheme.value === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#bbb',
    borderRadius: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    controlHeight: 40,
  },
  algorithm: appTheme.value === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
}))

function setTheme(val) { appTheme.value = val }
function setNotifEnabled(val) { notifEnabled.value = val }
</script>
