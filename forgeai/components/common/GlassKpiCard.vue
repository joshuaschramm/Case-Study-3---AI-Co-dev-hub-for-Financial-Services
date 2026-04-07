<template>
  <div :class="['glass-card', glowClass]" style="padding: 20px; display: flex; align-items: center; gap: 16px;">
    <div style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: rgba(124,77,255,0.12);">
      <component :is="icon" style="font-size: 28px; color: #fff;" />
    </div>
    <div style="flex: 1;">
      <div style="font-size: 15px; color: rgba(255,255,255,0.7); font-weight: 500;">{{ title }}</div>
      <div style="font-size: 26px; color: #fff; font-weight: bold; line-height: 1.1;">{{ value }}</div>
      <div v-if="trendText" style="margin-top: 4px;">
        <a-tag :color="trendType === 'success' ? 'success' : trendType === 'warning' ? 'warning' : trendType === 'error' ? 'error' : 'default'">
          <slot name="trendIcon" />
          {{ trendText }}
        </a-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  glowClass: String,
  trendText: String,
  trendType: String // 'success' | 'warning' | 'error' | undefined
})
</script>
