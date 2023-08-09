<template>
  <v-row>
    <v-col>
      <!-- <VInput v-bind="props1"></VInput> -->
      <VTextField v-bind="props1" :value="memberName" @input="handleChangeName"></VTextField>
    </v-col>
    <v-col>
      <!-- <VInput v-bind="props2"></VInput> -->
      <VTextField v-bind="props2"></VTextField>
    </v-col>
    <v-col>
      <!-- <VInput v-bind="props3"></VInput> -->
      <VTextField v-bind="props3"></VTextField>
    </v-col>
  </v-row>
  <VButton ref="confirmBtn" @click="handleClick($event)">Confirm</VButton>
</template>

<script setup lang="ts">
import { VTextField } from '@webapp/component';
import type { TextFieldProps, TextFieldChangeEvent, ButtonClickEvent, ButtonValue } from '@webapp/component';
import { ref } from 'vue';
import { memberService } from '@/composable';
import { onMounted } from 'vue';

const confirmBtn = ref();

const { member, memberInitialize, memberName, memberEmail } = memberService();

const props1: TextFieldProps = {
  loading: false,
  disabled: false,
  label: 'props1',
  color: 'success',
  rules: '',
  message: 'trst'
};
const props2: TextFieldProps = {
  loading: true,
  disabled: false,
  label: 'props2',
  color: 'success',
  rules: 'rules'
};
const props3: TextFieldProps = {
  loading: false,
  disabled: true,
  label: 'props3',
  color: 'success',
  rules: 'rules'
};
const handleChangeName: TextFieldChangeEvent = event => {
  memberName.value = event.value;
};
const handleClick: ButtonClickEvent = event => {
  console.log(event);
};

onMounted(() => {
  if (member) {
    member.value = memberInitialize({
      remark: 'test'
    });
  }
});
</script>

<style scoped lang="scss"></style>
