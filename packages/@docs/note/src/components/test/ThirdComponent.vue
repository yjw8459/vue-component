<template>
  <ThirdChildComponent1 />
  <ThirdChildComponent2 />
</template>
<script setup lang="ts">
import { provide } from "vue";
import ThirdChildComponent1 from "./third-child/ThirdChildComponent1.vue";
import ThirdChildComponent2 from "./third-child/ThirdChildComponent2.vue";
import { ref } from "vue";
import { MessageType } from "@/types/service/dto/third/MessageType";
import { readonly } from "vue";

const message = ref("안녕하세요");
const remark = ref("Remark");

provide("thirdChild1", ref<number>(101));
provide("thirdChild3", {
  message: message,
  updateMessage: () => (message.value += "@@@@"),
  remark: readonly(remark),
} as MessageType);
</script>
