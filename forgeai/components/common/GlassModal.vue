<template>
  <a-modal
    v-bind="$attrs"
    :open="open"
    :title="title"
    :width="width"
    class="glass-modal"
    :footer="footer"
    @ok="$emit('ok')"
    @cancel="$emit('cancel')"
  >
    <slot />
  </a-modal>
</template>

<script setup>
defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: '' },
  width: { type: [String, Number], default: 600 },
  footer: { type: [Array, Object, String, null], default: null }
})
</script>
