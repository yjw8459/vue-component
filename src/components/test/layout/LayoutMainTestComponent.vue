<template>
  <!-- <main>
    <slot name="content"></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer> -->

  <LayoutContentTestComponent>
    <slot name="content"></slot>
  </LayoutContentTestComponent>

  <LayoutFooterTestComponent>
    <slot name="footer"></slot>
  </LayoutFooterTestComponent>

  <LayoutDynamic1TestComponent>
    <slot name="dynamic1"></slot>
  </LayoutDynamic1TestComponent>
  <LayoutDynamic2TestComponent>
    <slot name="dynamic2"></slot>
  </LayoutDynamic2TestComponent>
</template>
<script setup lang="ts">
import LayoutContentTestComponent from "./LayoutContentTestComponent.vue";
import LayoutFooterTestComponent from "./LayoutFooterTestComponent.vue";
import LayoutDynamic1TestComponent from "./LayoutDynamic1TestComponent.vue";
import LayoutDynamic2TestComponent from "./LayoutDynamic2TestComponent.vue";
</script>
