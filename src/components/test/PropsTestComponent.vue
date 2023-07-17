<template>
  <div>
    {{ props.test }}
    <br />
    {{ props.testObject.title }}
    <br />
    {{ props.testObject.codeArray }}
    <br />
    {{ props.testObject.callback }}
    <br />
  </div>
</template>
<script setup lang="ts">
interface TestType {
  title: string;
  codeArray: number[];
  callback: Function;
}
// 상위 컴포넌트의 Props
const props = defineProps<{
  test: string;
  testObject: TestType;
}>();
</script>
