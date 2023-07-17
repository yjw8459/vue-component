<template>
  <div>
    <input @input="$emit('emitFunction', $event)" />
    <input @keyup="inputEvent($event)" />
    <v-btn @click="$emit('someEvent', $event)">Emit Button</v-btn>
    <v-btn @click="$emit('dataEvent', 'code12', 3, $event)"
      >Emit Button (Data)</v-btn
    >
  </div>
</template>
<script setup lang="ts">
function inputEvent(param: any) {
  console.log("inputEvent");
  console.log(param);
}
</script>
