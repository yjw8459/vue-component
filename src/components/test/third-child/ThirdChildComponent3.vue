<template>
  <div>
    <v-btn @click="updateMessage">{{ message }}</v-btn>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Ref } from "vue";
import { inject } from "vue";
import { MessageType } from "@/types/service/dto/third/MessageType";

const { message, updateMessage, remark } = inject<MessageType>("message", {
  message: ref(""),
  updateMessage: () => {},
});
</script>
