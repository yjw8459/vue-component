<template>
  <v-container>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// import type { Member, StandardMember } from '@/types/service/exercise';
// const props = defineProps<Member>();
import type { StandardMember, Member } from '@/types/service/exercise';
const props: StandardMember = withDefaults(defineProps<Member>(), {
  remark: '01041028459',
  tel: 'tetete'
});
// const props = defineProps<Member>();

console.log('testProps2');
console.log(props);
console.log(props.tel);
</script>

<style scoped lang="scss"></style>
