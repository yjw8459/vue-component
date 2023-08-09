<template>
  <div>
    <Test ref="childRef" @click="handleClick"> </Test>
  </div>
  <div>
    <TestEmit @click="emitHandleClick($event)"> </TestEmit>
  </div>
  <div>
    <!-- withDefault -->
    <TestProps v-bind="member"></TestProps>
  </div>
  <div>
    <!--
      withDefault + Extends take Child
      StandardMember standardMember = new Member => NO
    -->
    <TestProps2 v-bind="member"></TestProps2>
  </div>
  <div>
    <!--
      withDefault + Extends take Parent
      Member member = new StandardMember => OK
    -->
    <TestProps3 v-bind="standardMember"></TestProps3>
  </div>
</template>

<script setup lang="ts">
import type { Member, StandardMember } from '@/types/service/exercise';
import { getMember, getStandarMember } from '@/api';
import { Test, TestEmit, TestProps, TestProps2, TestProps3 } from '@/components/exercise/ex3';
import { ref } from 'vue';

const childRef = ref();

const TEST_MESSAGE = 'Test Message';
const member: Member = getMember();
const standardMember: StandardMember = getStandarMember();
const handleClick = (event: any) => {
  childRef.value.alertMessage(TEST_MESSAGE);
};
const emitHandleClick = (event: any) => {
  alert('emit Event');
};
</script>
