<template>
  <v-btn @click="onClick('test', $event)">Default</v-btn>
  <v-btn @click="(event: Event) => onClick('test', event)"
    >Arrow Function</v-btn
  >

  <v-btn
    @click="onClick('test', $event)"
    v-on:click.stop="onClickStop($event)"
    @click.stop.prevent="onClickStopPreEvent($event)"
  ></v-btn>
  <v-text-field @keyup-enter="onSubmit($event)"></v-text-field>
  <input @keyup-enter="onSubmit($event)" />
</template>
<script setup lang="ts">
function onClick(message: string, event: Event): void {
  console.log(message);
  console.log(event);
}
function onClickStop(event: Event) {
  console.log("onClickStop");
  console.log(event);
}
function onClickStopPreEvent(event: Event) {
  console.log("onClickStopPreEvent");
  console.log(event);
}
function onSubmit(event: Event) {
  console.log("onSubmit");
  console.log(event);
}
</script>
