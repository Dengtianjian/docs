<template>
  <KFlex vertical gap="xl">
    <KFieldGroup label="开票信息" required bordered status="error" message="纳税人识别号不能为空">
      <KInput placeholder="发票抬头" />
      <KInput placeholder="纳税人识别号" status="error" />
    </KFieldGroup>
    <KFieldGroup label="通知方式" layout="horizontal" description="可多选" size="sm">
      <KFlex>
        <KCheckbox>站内信</KCheckbox>
        <KCheckbox>邮件</KCheckbox>
        <KCheckbox>短信</KCheckbox>
      </KFlex>
    </KFieldGroup>
  </KFlex>
</template>

<script setup lang="ts">
import KCheckbox from 'kit/vue/ui/components/data-entry/Checkbox/Checkbox.vue'
import KFieldGroup from 'kit/vue/ui/components/data-entry/FieldGroup/FieldGroup.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>