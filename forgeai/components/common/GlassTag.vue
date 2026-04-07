<template>
  <a-tag :color="color" class="glass-tag" v-bind="$attrs">
    <slot />
  </a-tag>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'default' }
})
</script>
