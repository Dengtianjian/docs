<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KControlGroup>
      <KControlGroupItem>
        <KCheckbox v-model="inStock">只看有货</KCheckbox>
      </KControlGroupItem>
      <KControlGroupItem>
        <KCheckbox v-model="freeShip">包邮</KCheckbox>
      </KControlGroupItem>
      <KControlGroupItem>
        <KSwitch v-model="autoRefresh" size="sm" />自动刷新
      </KControlGroupItem>
      <KButton type="primary">筛选</KButton>
    </KControlGroup>

    <KControlGroup vertical style="width: 300px">
      <KControlGroupItem>
        <KCheckbox v-model="notify">接收更新通知</KCheckbox>
      </KControlGroupItem>
      <KControlGroupItem>
        <KRadio v-model="syncMode" value="auto">自动同步</KRadio>
      </KControlGroupItem>
      <KControlGroupItem>
        <KRadio v-model="syncMode" value="manual">手动同步</KRadio>
      </KControlGroupItem>
      <KControlGroupItem>
        <KSwitch v-model="dark">深色模式</KSwitch>
      </KControlGroupItem>
    </KControlGroup>

    <KControlGroup block style="max-width: 480px">
      <KControlGroupItem style="flex: none">
        <KSwitch v-model="exportRaw" size="sm" />含原始数据
      </KControlGroupItem>
      <KInput v-model="fileName" placeholder="导出文件名" />
      <KButton>导出</KButton>
    </KControlGroup>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KControlGroup from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroup.vue'
import KControlGroupItem from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroupItem.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KCheckbox from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'
import KRadio from 'kit/vue/ui/components/data-entry/Radio/Radio.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const inStock = ref(true)
const freeShip = ref(false)
const autoRefresh = ref(true)
const notify = ref(true)
const syncMode = ref('auto')
const dark = ref(false)
const exportRaw = ref(true)
const fileName = ref('')
</script>