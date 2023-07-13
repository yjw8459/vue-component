### 애플리케이션 인스턴스 생성 createApp

```typescript
import { createApp } from "vue";

const app = createApp({
  /* 
    root component options 
    모든 앱에는 다른 구성 요소를 자식으로 포함할 수 있는 "루트 구성 요소"가 필요합니다.
  */
});
```

### 루트 구성 요소

```typescript
import { createApp } from "vue";
// import the root component App from a single-file component.
import App from "./App.vue";

const app = createApp(App);
```

실제 응용 프로그램은 중첩된 재사용 가능한 구성 요소 트리로 구성된다.

- Todo 애플리케이션의 구성 요소 트리

```text
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

### 앱 탑재

#### .mount()

```html
<div id="app"></div>
```

.mount()를 호출해야 렌더링된다.
매개변수는 DOM 요소 또는 선택자(Selector) 컨테이너이다.

```typescript
// 루트 구성 요소(app)를 "#app"에 mount
app.mount("#app");
```

앱의 루트 구성 요소 컨텐츠("App.vue")는 컨테이너 요소("#app") 내부에 렌더링된다.
컨테이너 요소 자체는("#app") 앱의 일부로 간주되지 않는다.

.mount() 메서드는 모든 앱 구성 및 리소스 등록이 완료된 후 항상 호출되어야 한다.
그리고 .mount()의 반환 값은 응용 프로그램 인스턴스가 아닌 "루트 구성 요소 인스턴스"이다.

#### In-DOM 루트 구성 요소 템플릿

```typescript
import { createApp } from "vue";
// 직접 작성 가능 Template이 없을 경우 자동으로 기본 컨테이너를 제공함
const app = createApp({
  data() {
    return {
      count: 0,
    };
  },
});

app.mount("#app");
```

app에 직접 등록한 경우 app 어디서나 사용할 수 있음.

```typescript
app.config.errorHandler = (err) => {
  /* handle error */
};
app.component("TodoDeleteButton", TodoDeleteButton);
```

#### 여러 애플리케이션 인스턴스

createApp을 사용하면 여러 Vue의 응용 프로그램에 마운트 할 수 있다.

```typescript
const app1 = createApp({
  /* ... */
});
app1.mount("#container-1");

const app2 = createApp({
  /* ... */
});
app2.mount("#container-2");
```

## 템플릿 구문

Vue는 렌더링 된 DOM에 선언적으로 데이터 바인딩을 할 수 있는 HTML 기반 템플릿 구문을 사용한다.
모든 Vue 템플릿은 사양 호환 브라우저 및 HTML 파서에서 구문 분석할 수 있는 구문적으로 유효한 HTML이다.
Vue 템플릿은 JavaScript로 컴파일됨.
Vue는 앱 상태가 변경될 때 다시 렌더링하고 최소한의 DOM 조작을 하도록 한다.

#### Mustache

속성이 변경될 때마다 업데이트
HTML이 아닌 일반 텍스트로 인식

```vue
<span>Message: {{ msg }}</span>
```

#### 원시 HTML

실제 HTML을 출력하려면 "v-html"을 사용

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

#### 지시문

Vue에서 제공하는 특수 속성임을 나타내기위해 접두사로 표시되며, v-로 표시되고 렌더링된 DOM에 특수반응 동작을 적용한다.
현재 활성 인스턴스의 속성을 사용하여 내부 HTML을 최신 상태로 유지한다.

```html
<!-- v-if: 조건에 따른 태그 삽입, 생략 -->
<p v-if="seen">Now you see me</p>
<!-- v-href: href -->
<a v-bind:href="url"> ... </a>
<a :href="url"> ... </a>

<!-- v-on: 이벤트 수신 지시문 -->
<a v-on:click="doSomething"> ... </a>
<a @click="doSomething"> ... </a>

<!-- 
  동적 속성 할당 
  ex) v-bind:href="url" ...
  동적으로 속성을 할당할 땐, 문자열로 할당하여야 한다.
  문자열이 아닐 경우 경고를 trigger 한다.

  또, 속성 이름은 소문자로 강제 변환이 되므로 되도록 소문자 지정을 권장한다.  
-->
<a v-bind:[attributeName]="url"> ... </a>
<a :[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
<a @[eventName]="doSomething"></a>
<!--  -->

<!--  -->
```

#### 속성 바인딩

바운드 값이 null 또는 undefined일 경우 렌더링된 요소에서 제거된다.

```html
<!-- 요소의 id 속성이 dynamicID 속성과 동기화 상태로 유지하도록 지시 -->
<div v-bind:id="dynamicId"></div>

<!-- v-bind:id의 속기 방법 -->
<div :id="dynamicId"></div>
<!-- v-on의 속기 방법 -->
<div @click="onClickEvent"></div>
```

#### 부울 속성

부울 속성은 요소에 존재하여 참/거짓 값을 나타낼 수 있는 속성입니다. 예를 들어 disabled가장 일반적으로 사용되는 부울 특성 중 하나입니다.

```html
<button :disabled="isButtonDisabled">Button</button>

<!-- 
  빈 문자열의 경우도 포함되어 나오고, true, false 따라서 생략 혹은 속성에 포함된다.
  false일 경우 속성 생략됨.
 -->
isButtonDisabled<button disabled=""></button>
```

#### 여러 속성 바인딩

```typescript
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
};
```

```html
<div v-bind="objectOfAttrs"></div>
```

#### JavaScript 표현식 사용

모든 데이터 바인딩 내에서 JavaScript 표현식의 모든 기능을 지원한다.

```html
{{ number + 1 }} {{ ok ? 'YES' : 'NO' }} {{ message.split('').reverse().join('')
}}
<!-- 리터럴 방식 -->
<div :id="`list-${id}`"></div>
```

Vue 템플릿에서 JavaScript를 사용할 수 있는 위치

- 내부 텍스트 보간 {{}}
- 모든 Vue 지시문의 속성 값 (v-로 시작하는 특수 속성)

또, 각 바인딩에는 하나의 단일 표현식만 포함될 수 있다.(return)

작동하지 않는 예

```html
<!-- this is a statement, not an expression: -->
{{ var a = 1 }}

<!-- flow control won't work either, use ternary expressions -->
{{ if (ok) { return message } }}
```

바인딩 식 내에서 메서드를 호출할 수 있다.

```html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

바인딩 표현식 내부에서 호출되는 함수는 구성 요소가 업데이트 될 때마다 호출되므로 데이터 변경 또는 비동기 작업 트리거와 같은 문제에 대해 고려해야한다.

#### 전역 엑세스

Vue는 전역을 엑세스할 때, window에서 엑세스 할 수 없다.
app.config.globalProperties.\* 를 사용

### 반응성

#### 반응 상태 선언

`ref()`
Composition API에서 반응 상태를 선언할 때 권장하는 방법

```typescript
import { ref } from "vue";

const count = ref(0);
```

ref()는 인수를 받아 속성이 있는 데이터를 ref() 객체에 래핑하여 반환한다.
반응 객체를 구성 요소 템플릿에 바인딩하려면 구성 요소의 setup() 함수에서 선언하고 반환해야 한다.

```typescript
import { ref } from "vue";

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0);

    // expose the ref to the template
    return {
      count,
    };
  },
};
```

ref로 래핑된 객체는 템플릿 내부에서 사용될 때 편의상 자동으로 래핑 해제된다.

```typescript
const myRef = {
  _value: 0,
  get value() {
    track();
    return this._value;
  },
  set value(newValue) {
    this._value = newValue;
    trigger(); // 변경사항 감지
  },
};
```

ref는 보다 깊은 반응성을 가진다.

```typescript
import { ref } from "vue";

// ref(ref())로 래핑할 경우 객체의 경우는 반응형 프록시(reactive())로 전환
const obj = ref({
  nested: { count: 0 },
  arr: ["foo", "bar"],
});

function mutateDeeply() {
  // these will work as expected.
  obj.value.nested.count++;
  obj.value.arr.push("baz");
}
```

객체의 변경이 일어나도 변경 사항 감지가 가능하다.
또, 기본 데이터가 아닌 객체의 경우는 reactive()를 통해 "반응형 프록시"로 전환된다.

### <script setup>

setup()을 통해 수동으로 상태 및 메서드를 노출하는 것은 번거롭다.
SFC(Single-File Components)를 사용하면 피할 수 있다.

```html
<script setup>
  import { ref } from "vue";

  const count = ref(0);

  function increment() {
    count.value++;
  }
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

### DOM 업데이트 타이밍

반응 상태를 변경하면 DOM이 자동으로 업데이트 된다.
하지만, DOM의 업데이트는 동기식으로 적용되지 않는다.
그래서 Vue는 업데이트 주기의 "다음 틱"까지 버퍼링 하여 그 사이동안 상태 변경 횟수와 관계없이 한 번만 업데이트 되도록 한다.

또, 상태 변경 후 DOM 업데이트가 완료될 때까지 기다리려면 nextTick() 전역 API를 사용할 수 있다.

```typescript
import { nextTick } from "vue";

async function increment() {
  count.value++;
  await nextTick(); // DOM UPDATE 동기 처리
  // Now the DOM is updated
}
```

### reactive()

반응 상태를 선언하는 또 다른 방법으로 reactive()가 있다.
내부 값을 특수 개체로 감싸는 ref()와 달리 reactive()는 개체 자체를 반응형으로 만든다.(프록시화)

```typescript
import { reactive } from "vue";

// 개체 자체를 반응 객체화
const state = reactive({ count: 0 });

const raw = {};
const proxy = reactive(raw);

// 프록시이므로 실제 객체와 갖지않음.
// 즉, 프록시만 반응형이고 실제 객체는 아님.
console.log(proxy === raw); // false
```

reactive()로 만든 반응형 개체는 JavaScript 프록시이며, 일반 개체처럼 작동한다.
Vue가 반응성 추적 및 트리거링을 위해 반응성 객체의 모든 속성에 대한 엑세스 및 변형을 가로챌 수 있다.
reactive()는 원본 객체를 반응형 객체화한 프록시 버전을 만드므로, 반응형 작업이 필요할 경우 프록시 버전을 사용한다.
또, 프록시에 대한 일관된 엑세스를 보장하기 위해 reactive()를 동일한 객체를 인자로 호출할 경우 동일한 프록시를 반환한다.

```typescript
console.log(reactive(raw) === proxy); // true
console.log(reactive(proxy) === proxy); // true
```

reactive()의 반응성은 깊다.
반응 객체의 내부의 중첩 객체도 프록시 한다.

```typescript
const proxy = reactive({});

const raw = {};
proxy.nested = raw;

//proxy.nested도 proxy화
console.log(proxy.nested === raw); // false
```

```html

```

```html

```

```html

```

```html

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```

```typescript

```
