<template>
  <span> Test </span>
  <v-btn @click="x++">Add X</v-btn>
  <v-btn @click="y++">Add Y</v-btn>
  <v-btn @click="z++">Add Z</v-btn>
  <v-btn @click="obj.count++">Add Object Count</v-btn>
  <v-btn @click="obj.number++">Add Object Number</v-btn>
  <v-btn @click="todoId++">Add Todo Id</v-btn>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { watchEffect } from "vue";
import { Ref } from "vue";
import { watch, ref } from "vue";

const x: Ref<number> = ref(0);
const y: Ref<number> = ref(0);
const z: Ref<number> = ref(0);

const obj = reactive({
  count: 0,
  number: 0,
  state: {
    someObject: {
      someNumber: 0,
      someCount: 0,
    },
  },
});

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter
watch(
  () => x.value + y.value, // 두 합산이 달라지면
  (sum: number) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// array of multiple sources
watch([x, () => y.value, z], ([newX, newY, newZ]) => {
  console.log(`x is ${newX} and y is ${newY} and z is ${newZ}`);
});

// Object 전체 Watch
// watch(obj, (newValue, oldValue) => {
//   console.log(newValue);
//   console.log(oldValue);
//   console.log(`newValue is ${newValue}, oldValue is ${oldValue}`);
// });

// Object Property "Count" Watch
watch(
  () => obj.count,
  (newCount) => {
    console.log(`count is ${newCount}`);
  }
);

// Object Property "Number" Watch
watch(
  () => obj.number,
  (newNumber) => {
    console.log(`number is ${newNumber}`);
  }
);

watch(
  () => obj.state.someObject,
  (newValue, oldValue) => {
    console.log(newValue);
    console.log(oldValue);
  },
  { deep: true }
);

const todoId = ref(1);
const data = ref(null);

watch(
  todoId,
  async () => {
    // 최초는 todoId 초기 값으로 호출, 그 후 Watch 하고있는 소스의 변경이 있을 시 호출
    console.log("immediate");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    );
    data.value = await response.json();
  },
  { immediate: true }
);

watchEffect(async () => {
  console.log("watchEffect");
  obj.count++;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});
</script>
