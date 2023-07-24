<template>
  <div>
    {{ injectValue }}
  </div>
</template>
<script setup lang="ts">
import { inject } from "vue";

class InjectValue2 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const injectValue = inject(
  "thirdChild2",
  () => new InjectValue2("InjectName"),
  true
);
</script>
