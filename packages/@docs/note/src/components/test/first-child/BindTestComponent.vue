<template>
  <div>
    <div class="title">
      <!-- Slot -->
      <h1>Slot Title</h1>
      <slot>11111111</slot>
    </div>
    <!-- Attribute 바인딩 -->
    <div class="container" :class="{ active: isActive }">
      <span :class="{ error: hasError }"> Text Dummy </span>
      <div>
        <v-btn @click="Action1()"> Active Button </v-btn>
        <v-btn @click="Action2()"> Error Button </v-btn>
      </div>
    </div>
    <!-- Object.Attribute 바인딩 -->
    <div class="container" :class="{ active: object.isActive }">
      <span :class="{ error: object.hasError }"> Text Dummy </span>
      <div>
        <v-btn @click="Action3()"> Active Button </v-btn>
        <v-btn @click="Action4()"> Error Button </v-btn>
      </div>
    </div>
    <!-- Object 바인딩 -->
    <div class="container" :class="classObject">
      <span> Text Dummy </span>
      <div>
        <v-btn @click="Action5()"> Active Button </v-btn>
        <v-btn @click="Action6()"> Error Button </v-btn>
      </div>
    </div>
    <!-- Array 바인딩 -->
    <div class="container" :class="[activeClass, errorClass]">
      <span> Text Dummy </span>
      <div>
        <v-btn @click="Action7()"> Active Button </v-btn>
        <v-btn @click="Action8()"> Error Button </v-btn>
      </div>
    </div>
    <!-- Object, Array 바인딩 -->
    <div class="container" :class="[{ active: isActive }, errorClass]">
      <span> Text Dummy </span>
      <div>
        <v-btn @click="Action9()"> Active Button </v-btn>
        <v-btn @click="Action10()"> Error Button </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { ref } from "vue";

interface State {
  active?: boolean;
  isActive?: boolean;
  hasError?: boolean;
  "text-danger"?: boolean;
}

let isActive = ref(true);
let hasError = ref(true);

const dummy: State = {
  isActive: false,
  hasError: false,
};

const dummy2 = {
  active: true,
  "text-danger": false,
};

// 1
let object: State = reactive(dummy); // 타입 설정 방법 1

// 2
let object2 = reactive<State>(dummy); // 타입 설정 방법 2

// let object3 = computed(() => dummy2);
const classObject = reactive<State>(dummy2);

const activeClass = ref("active");
const errorClass = ref("error");

function Action10() {
  errorClass.value = errorClass.value === "" ? "error" : "";
  console.log(classObject);
}
function Action9() {
  isActive.value = !isActive.value;
  console.log(classObject);
}

function Action7() {
  activeClass.value = activeClass.value === "" ? "active" : "";
  console.log(classObject);
}
function Action8() {
  errorClass.value = errorClass.value === "" ? "error" : "";
  console.log(classObject);
}

function Action1() {
  isActive.value = !isActive.value;
  console.log("isActive");
}
function Action2() {
  hasError.value = !hasError.value;
  console.log("hasError");
}

function Action3() {
  object2.isActive = !object2.isActive;
  console.log("object.isActive");
}
function Action4() {
  object2.hasError = !object2.hasError;
  console.log("object.hasError");
}

function Action5() {
  classObject.active = !classObject.active;
  console.log(classObject);
}
function Action6() {
  classObject["text-danger"] = !classObject["text-danger"];
  console.log(classObject);
}
</script>
