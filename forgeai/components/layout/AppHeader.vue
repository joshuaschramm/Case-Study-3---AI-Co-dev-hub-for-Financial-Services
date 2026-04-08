<template>
  <a-layout-header :class="['glass-topbar', theme === 'light' ? 'glass-topbar--light' : '']" style="position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 101px;">
    <div style="flex: 1; display: flex; justify-content: center;">
      <a-input-search
        class="glass-input"
        :class="theme === 'light' ? 'text-dark' : ''"
        v-model:value="searchValue"
        @search="onSearch"
        placeholder="Search products, models, pipelines..."
        style="max-width: 500px; width: 100%;"
      />
    </div>
    <a-space size="large" style="margin-left: auto;">
      <!-- Notifications Dropdown -->
      <template v-if="notifEnabled">
        <a-dropdown placement="bottomRight" trigger="['click']">
          <template #overlay>
            <a-list style="width: 320px; max-height: 340px; overflow-y: auto; padding: 16px 12px;">
              <a-list-item v-for="n in notifications" :key="n.id">
                <a-list-item-meta
                  :title="n.title"
                  :description="n.time"
                />
                <a-tag :color="n.type === 'alert' ? 'red' : n.type === 'info' ? 'blue' : 'green'">{{ n.type }}</a-tag>
              </a-list-item>
            </a-list>
          </template>
          <span style="position: relative; display: inline-block;">
            <a-button type="text" shape="circle" :style="{ color: theme === 'light' ? '#222' : '#fff' }">
              <span style="position: absolute; top: 9px; right: 4px; pointer-events: none;">
                <span v-if="notifications.length > 0"
                  style="display: block; width: 9px; height: 9px; background: #ff4d4f; border-radius: 50%; border: 1.5px solid #181c2a; z-index: 2; box-shadow: 0 0 0 1.5px #181c2a;"></span>
              </span>
              <BellOutlined />
            </a-button>
          </span>
        </a-dropdown>
      </template>
    </a-space>
  </a-layout-header>
</template>

<script setup>

import { ref, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { BellOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  theme: { type: String, default: 'dark' },
  notifEnabled: { type: Boolean, default: true }
})
const theme = inject('theme', 'dark')
const emit = defineEmits(['update:theme', 'update:notif-enabled'])

const searchValue = ref('')
const router = useRouter()

function onSearch(value) {
  const query = value.trim()
  if (!query) return
  router.push({ path: '/search', query: { q: query } })
}

const showSettings = ref(false)
const themeLocal = ref(props.theme)
const notifEnabledLocal = ref(props.notifEnabled)

watch(() => props.theme, val => { themeLocal.value = val })
watch(() => props.notifEnabled, val => { notifEnabledLocal.value = val })

function onThemeChange(e) {
  emit('update:theme', e.target.value)
}
function onNotifChange(val) {
  emit('update:notif-enabled', val)
}

const notifications = [
  { id: 1, title: 'Deployment succeeded: Sentinel Fraud Detection', time: '2 min ago', type: 'info' },
  { id: 2, title: 'Model retraining completed: Athena Insights', time: '10 min ago', type: 'success' },
  { id: 3, title: 'Pipeline failed: DocuMind ETL', time: '30 min ago', type: 'alert' },
  { id: 4, title: 'New user added: Maria Lopez', time: '1 hour ago', type: 'info' },
  { id: 5, title: 'Cost threshold exceeded: March', time: '2 hours ago', type: 'alert' }
]
</script>
