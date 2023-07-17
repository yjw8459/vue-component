<template>
  <!-- 자식 컴포넌트에서 emitFunction 이벤트를 발생하고, 부모 컴포넌트에서 emitFunction 이벤트를 Catch -->
  <div>
    <EmitTestComponent
      @emitFunction="test = $event.target.value"
      @some-event="someEvent"
      @data-event="dataEvent"
    />
  </div>

  <div>
    <PropsTestComponent :test="testWord" :testObject="testObject" />
  </div>

  <div>
    <h1>{{ test }}</h1>
    <WatchTestComponent />
  </div>

  <ModelTestComponent />
  <EventTestComponent></EventTestComponent>
  <BindTestComponent></BindTestComponent>
  <!-- 컴포넌트에 Attibute를 추가할 경우 기존 Attribute에 가산됨. -->
  <FirstChildComponent class="test2"></FirstChildComponent>
</template>
<script setup lang="ts">
import { onUpdated } from "vue";
import { onMounted } from "vue";
import FirstChildComponent from "./FirstChildComponent.vue";
import EventTestComponent from "./EventTestComponent.vue";
import BindTestComponent from "./BindTestComponent.vue";
import ModelTestComponent from "./ModelTestComponent.vue";
import WatchTestComponent from "./WatchTestComponent.vue";
import PropsTestComponent from "./PropsTestComponent.vue";
import EmitTestComponent from "./EmitTestComponent.vue";
import { ref } from "vue";

const test = ref("");

const testWord = "안녕하세요.";

const testObject = {
  title: "타이틀입니다." as string,
  codeArray: [127, 150, 620] as number[],
  callback: (a: number, b: number) => a + b,
};

// On Mounted
onMounted(() => {
  console.log("onMounted");
});

// On Updated
onUpdated(() => {
  console.log("onUpdated");
});

function someEvent(event: Event) {
  console.log(event);
}

function dataEvent(code: string, index: number, event: Event) {
  console.log(code);
  console.log(index);
  console.log(event);
}
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
