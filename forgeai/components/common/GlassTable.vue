<template>
  <a-table
    :columns="columns"
    :data-source="data"
    class="glass-table"
    :row-key="rowKey"
    :pagination="pagination"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </a-table>
</template>

<script setup>
defineProps({
  columns: { type: Array, required: true },
  data: { type: Array, required: true },
  rowKey: { type: [String, Function], default: 'id' },
  pagination: { type: [Object, Boolean], default: () => ({ pageSize: 10 }) }
})
</script>
