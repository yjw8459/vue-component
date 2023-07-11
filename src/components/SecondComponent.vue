<template>
  <div class="second">
    <h1>{{ reactiveObj.title }}</h1>
    <h2 ref="zeze">dada</h2>
    <button @click="testFunction">Action Button</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUpdated, reactive, ref } from 'vue'

interface Order {
  id: number
  currentState: string
  lastEvent: string
  currency: string
  supplyAmount: number
}

interface Props {
  title: string
  messgage: string
  code: number
  state: State
  orders: [Order]
}

interface State {
  isDisplayed: Boolean
  isCreated: Boolean
}

// 부모 컴포넌트에서 전달받은 props는 defineProps()를 호출하여 가져올 수 있음.

// script 영역 안에서 변수를 선언하고 해당 변수의 값을 변경하더라도 리렌더링 되지 않는다.

// 반응형
const reactiveObj = reactive({ title: 'OrderList' })

let props = defineProps<Props>()

let zeze = ref(null)

console.log(props.code)
// 반응형 상태 정의
onMounted((props: void) => {
  console.log('onMounted')
})

onUpdated((props: void) => {
  console.log('onUpdated')
  console.log(props)
})

function testFunction() {
  reactiveObj.title += '1'
}
</script>
<style></style>
