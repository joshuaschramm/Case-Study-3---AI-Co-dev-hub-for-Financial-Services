<template>
  <a-layout-header class="glass-topbar" style="position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; height: 64px;">
    <div style="flex: 1; display: flex; justify-content: center;">
      <a-input-search
        class="glass-input"
        placeholder="Search products, models, pipelines..."
        style="max-width: 500px; width: 100%;"
      />
    </div>
    <a-space size="large" style="margin-left: auto;">
      <a-badge :count="5">
        <a-button type="text" shape="circle" style="color: #fff;">
          <BellOutlined />
        </a-button>
      </a-badge>
      <a-button type="text" shape="circle" style="color: #fff;">
        <SettingOutlined />
      </a-button>
      <a-button type="text" shape="circle" style="color: #fff;">
        <QuestionCircleOutlined />
      </a-button>
    </a-space>
  </a-layout-header>
</template>

<script setup>
import { BellOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
</script>
