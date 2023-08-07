<template>
  <v-container>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Member } from '@/types/service/exercise';
// const props = defineProps<Member>();
const props = withDefaults(defineProps<Member>(), {
  remark: 'test'
});
console.log(props);
</script>

<style scoped lang="scss"></style>
