<template>
  <v-btn> Click Here </v-btn>
</template>

<script setup lang="ts">
defineExpose({
  alertMessage: (message: string) => {
    alert(message);
  }
});
</script>

<style scoped lang="scss"></style>
