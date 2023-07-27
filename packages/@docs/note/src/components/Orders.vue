<template>
  <OrderButtonGroup />
  <OrderList />
</template>
<script setup lang="ts">
import OrderButtonGroup from "./active/OrderButtonGroup.vue";
import OrderList from "./table/OrderList.vue";
const version: string = "0.0.1";
console.log(version);
</script>
