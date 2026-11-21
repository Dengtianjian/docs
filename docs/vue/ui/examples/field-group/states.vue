<template>
  <KSpace direction="vertical" size="xl">
    <KFieldGroup label="开票信息" required bordered status="error" message="纳税人识别号不能为空">
      <KInput placeholder="发票抬头" />
      <KInput placeholder="纳税人识别号" status="error" />
    </KFieldGroup>
    <KFieldGroup label="通知方式" layout="horizontal" description="可多选" size="sm">
      <KSpace>
        <KCheckbox>站内信</KCheckbox>
        <KCheckbox>邮件</KCheckbox>
        <KCheckbox>短信</KCheckbox>
      </KSpace>
    </KFieldGroup>
  </KSpace>
</template>

<script setup lang="ts">
import KCheckbox from 'kit/vue/ui/components/Checkbox/Checkbox.vue'
import KFieldGroup from 'kit/vue/ui/components/FieldGroup/FieldGroup.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>