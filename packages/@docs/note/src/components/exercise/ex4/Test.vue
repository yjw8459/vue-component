<template>
  <VFormWapper v-bind="formProps">
    <template #form>
      <v-row>
        <v-col>
          <VInput v-bind="props1"></VInput>
        </v-col>
        <v-col>
          <VInput v-bind="props2"></VInput>
        </v-col>
        <v-col>
          <VInput v-bind="props3"></VInput>
        </v-col>
      </v-row>
    </template>
  </VFormWapper>
</template>

<script setup lang="ts">
import { VInput, VFormWrapper } from '@webapp/component';
import type { InputProps, FormWrapperProps } from '@webapp/component';
const formProps: FormWrapperProps = {
  name: 'test'
};
const props1: InputProps = {
  name: 'name1',
  value: 'value1'
};
const props2: InputProps = {
  name: 'name2',
  value: 'value2'
};
const props3: InputProps = {
  name: 'name3',
  value: 'value3'
};
</script>

<style scoped lang="scss"></style>
