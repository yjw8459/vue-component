<template>
  <VFormWrapper v-bind="formProps">
    <template #form="{ props }">
      {{ props.name }}
      <Test></Test>
    </template>
  </VFormWrapper>
</template>

<script setup lang="ts">
import { Test } from '@/components/exercise/ex4';
import type { FormWrapperProps } from '@webapp/component';
import { VFormWrapper } from '@webapp/component';
const formProps: FormWrapperProps = {
  name: 'test'
};
</script>

<style scoped lang="scss"></style>
