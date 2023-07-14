<template>
  <!-- 컴포넌트에 Attibute를 추가할 경우 기존 Attribute에 가산됨. -->
  <EventTestComponent></EventTestComponent>
  <BindTestComponent></BindTestComponent>
  <FirstChildComponent class="test2"></FirstChildComponent>
</template>
<script setup lang="ts">
import { onUpdated } from "vue";
import { onMounted } from "vue";
import FirstChildComponent from "./FirstChildComponent.vue";
import EventTestComponent from "./EventTestComponent.vue";
import BindTestComponent from "./BindTestComponent.vue";

// On Mounted
onMounted(() => {
  console.log("onMounted");
});

// On Updated
onUpdated(() => {
  console.log("onUpdated");
});
</script>
<style>
.container {
  width: 500px;
  height: 500px;
  display: inline-block;
}
.error {
  color: red;
}
.active {
  background-color: antiquewhite;
}
</style>
