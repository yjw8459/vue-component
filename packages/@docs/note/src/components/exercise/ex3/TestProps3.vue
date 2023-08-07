<template>
  <v-container>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Member } from '@/types/service/exercise';

const props: Member = withDefaults(defineProps<Member>(), {
  remark: 'test'
});
console.log('testProps3');
console.log(props);
</script>

<style scoped lang="scss"></style>
