## Vite & Vue 생성

```bash
yanrn create vite
```

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

#### reactive()의 제한 사항

1. 제한된 데이터 타입: 객체 유형({}, 배열과 같은 컬렉션 유형)만 해당
   - 해당되지 않는 데이터 유형(Map, Set, string, number, boolean)
2. 놓친 반응성 연결을 대체할 수 없다.
   - 아래 예시는 reactive({ count: 0 }) 의 반응성 연결을 잃는다

```typescript
let state = reactive({ count: 0 });
state = reactive({ count: 1 });
```

3. 속성 분해 시 반응 연결 끊김

```typescript
const state = reactive({ count: 0 });

// 연결 끊김
let { count } = state;
count++;
callSomeFunction(state.count); // 0
```

### 반응 객체 속성

ref()는 반응 객체의 속성으로 엑세스되거나 변경될 때, 자동으로 래핑 해제된다.

```typescript
const count = ref(0);
const state = reactive({
  count,
});

console.log(state.count); // 0

state.count = 1;
console.log(count.value); // 1
```

새 ref가 기존 ref에 연결된 속성에 할당되면 이전 ref를 대체한다.

```typescript
const otherCount = ref(2);

state.count = otherCount;
console.log(state.count); // 2
// original ref is now disconnected from state.count
console.log(count.value); // 1
```

ref 언래핑은 반응 객체 내부에 중첩된 경우만 발생한다.

### 배열 및 컬렉션의 주의 사항

반응형 객체와는 달리 ref가 반응형 배열의 요소 또는 네이티브 컬렉션 유형으로 엑세스될 때 언래핑이 수행되지 않는다.

```typescript
const books = reactive([ref("Vue 3 Guide")]);
// need .value here
console.log(books[0].value);

const map = reactive(new Map([["count", ref(0)]]));
// need .value here
console.log(map.get("count").value);
```

### 템플릿에서 래핑 해제 시 주의사항

템플릿에서 ref 언래핑은 ref가 템플릿 렌더링 컨텍스트의 최상위 속성인 경우만 해당된다.

- object는 언래핑이 되지만, object.id를 호출할 경우 언래핑되지 않음.

```typescript
const count = ref(0);
const object = { id: ref(0) };
// 2
{
  {
    count + 1;
  }
}
{
  // [object Object]1
  {
    object.id + 1;
  }
}
// 언래핑 후 분해
const { id } = object;
// 2
{
  {
    id + 1;
  }
}
```

반응 객체의 언래핑은 템플릿 렌더링 컨텍스트의 최상위 속성에만 해당되지만,
{{  }} 머스타치에 단일 데이터인 경우 언래핑한다.

```typescript
{
  // [object Object]1
  {
    object.id + 1;
  }
}
{
  // 1
  {
    object.id;
  }
}
```

이는 머스타치의 편의 기능이다.(최종 평가 값일 경우 object.id.vale .value가 생략된다.)

### 속성 계산

템플릿 내 표현식은 편리하지만, 간단한 작업을 위한 것이다.
템플리셍 너무 많은 논리를 넣으면 템플릿이 커지고 유지 관리가 어려워진다.

```typescript
const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});
```

```html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

템플릿에 계산이 추가되면 복잡해진다.
따라서, 아래와 같이 리팩토링 할 수 있다.

```html
<script setup lang="ts">
  import { reactive, computed } from "vue";

  const author = reactive({
    name: "John Doe",
    books: [
      "Vue 2 - Advanced Guide",
      "Vue 3 - Basic Guide",
      "Vue 4 - The Mystery",
    ],
  });

  // 캐싱 반환 author.books 의 변경이 일어나지 않으면, 이전 결과 값을 계산없이 반환
  const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? "Yes" : "No";
  });
  // 직접 함수를 호출하는 경우 반응 객체의 변경이 일어났을 경우 새로 계산
  function calculateBooksMessage() {
    return author.books.length > 0 ? "Yes" : "No";
  }
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
<p>{{ calculateBooksMessage() }}</p>
```

computed() 함수는 계산된 ref를 반환한다.
author.books에 따라 데이터를 바인딩한다.
publishedBooksMessage 와 calculateBooksMessage()의 차이점은 publishedBooksMessage은 캐싱 기능을 지원한다. author.books가 변경되지 않는 한 불필요한 계산 없이 이전 계산된 결과를 즉시 반환한다.

- computed() 함수를 사용하면 author.books를 변경하지 않는 한, 다른 반응 객체의 변경이 일어나도 캐싱으로 이전 데이터를 계산없이 반환한다.
- 직접 함수를 호출한 경우는 반응 객체의 변경이 일어났을 때, 항상 계산을 처리하고 결과를 반환한다.

### 수정 가능한 계산 속성

계산된 속성에 새 값을 할당하려면 런타임 경고가 발생한다.
쓰기도 가능한 계산 속성이 필요한 경우 getter & setter를 모두 제공하면 된다.

```html
<script setup>
  import { ref, computed } from "vue";

  const firstName = ref("John");
  const lastName = ref("Doe");

  const fullName = computed({
    // getter
    get() {
      return firstName.value + " " + lastName.value;
    },
    // setter
    set(newValue) {
      // Note: we are using destructuring assignment syntax here.
      [firstName.value, lastName.value] = newValue.split(" ");
    },
  });
</script>
```

### v-if

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

```html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

```html
<!--
This will throw an error because property "todo"
is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
```

### v-show

```html
<h1 v-show="ok">Hello!</h1>
```

### v-for

```typescript
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
```

```html
<li v-for="item in items">{{ item.message }}</li>
```

```typescript
const parentMessage = ref("Parent");
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
```

```html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

```typescript
const parentMessage = "Parent";
const items = [
  /* ... */
];

items.forEach((item, index) => {
  // has access to outer scope `parentMessage`
  // but `item` and `index` are only available in here
  console.log(parentMessage, item.message, index);
});
```

```html
<li v-for="{ message } in items">{{ message }}</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">{{ message }} {{ index }}</li>
```

```html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

```html
<div v-for="item of items"></div>
```

```typescript
const myObject = reactive({
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
});
```

```html
<ul>
  <li v-for="value in myObject">{{ value }}</li>
</ul>
```

```html
<li v-for="(value, key) in myObject">{{ key }}: {{ value }}</li>
```

```html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

```html
<span v-for="n in 10">{{ n }}</span>
```

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

```html
<!--
This will throw an error because property "todo"
is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
```

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">{{ todo.name }}</li>
</template>
```

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

```html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

```html
<MyComponent v-for="item in items" :key="item.id" />
```

```html
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

### 배열 변경 감지

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

### 이벤트 수정자

```html
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
<input @keyup.page-down="onPageDown" />
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

### 값 바인딩

true, false에 따라 데이터 바인딩

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

동적인 데이터 바인딩

```html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue"
/>
```

#### .lazy

이벤트 후에 데이터 동기화

```html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```

## Life Cycle Hooks

### onMounted

초기 렌더링을 완료하고 DOM 노드를 만든 후 실행되는 코드

```html
<script setup>
  import { onMounted } from "vue";

  onMounted(() => {
    console.log(`the component is now mounted.`);
  });
</script>
```

### Watch

computed의 경우 상태 변경에 따른 반응으로 예기치 못한 상황이 발생할 수 있다.(비동기 처리 등)
watch() 함수를 사용하여 반응 상태에 따른 콜백 트리거를 할 수 있다.

```vue
<script setup>
import { ref, watch } from "vue";

const question = ref("");
const answer = ref("Questions usually contain a question mark. ;-)");

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf("?") > -1) {
    answer.value = "Thinking...";
    try {
      const res = await fetch("https://yesno.wtf/api");
      answer.value = (await res.json()).answer;
    } catch (error) {
      answer.value = "Error! Could not reach the API. " + error;
    }
  }
});
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

watch의 첫 번째 매개 변수는 다양한 유형의 "반응형" 객체일 수 있다.

```typescript
const x = ref(0);
const y = ref(0);

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

watch의 콜백 인자는 watch 인자와 같음

```typescript
const obj = reactive({ count: 0 });

// this won't work because we are passing a number to watch()
watch(obj.count, (count) => {
  console.log(`count is: ${count}`);
});

// instead, use a getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);
```

### deep Watch

반응 객체를 직접 호출하면 watch()는 암시적으로 깊은 관찰자를 생성
watch 콜백은 모든 중첩된 변형에서 트리거된다.

```typescript
// Object 전체 Watch
watch(obj, (newValue, oldValue) => {
  console.log(newValue);
  console.log(oldValue);
  console.log(`newValue is ${newValue}, oldValue is ${oldValue}`);
});

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

// deep Watch 중첩된 객체의 Watch
watch(
  () => obj.state.someObject,
  (newValue, oldValue) => {
    console.log(newValue);
    console.log(oldValue);
  },
  { deep: true }
);

// ?
watch(
  source,
  (newValue, oldValue) => {
    // executed immediately, then again when `source` changes
  },
  { immediate: true }
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

// watchEffect 화면 로딩 시 호출
// immediate 설정이 따로 필요없음. todoId의 Watching이 따로 필요없음.
watchEffect(async () => {
  console.log("watchEffect");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});
```

watch와 watchEffect 차이
watch는 명시적 소스만을 추적
콜백 내에서 엑세스되는 항목은 추적하지 않음.

watchEffect는 동기식 실행 중에 엑세스되는 모든 반응 속성을 자동으로 추적한다.

### watch 콜백 플러시 타이밍

반응 상태 변경 시 Vue 구성 요소 업데이트(ref)와 사용자의 Watch 콜백이 트리거 모두 트리거된다.
Watch 콜백은 Vue 구성 요소 업데이트 전에 호출되므로, 업데이트 되기 이전 상태의 DOM에 접근하게 된다.
그래서, Vue가 업데이트한 이 후에 DOM을 엑세스하려면 flush: 'post' 옵션이 필요하다.

```typescript
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});

// or

import { watchPostEffect } from "vue";

watchPostEffect(() => {
  /* executed after Vue updates */
});
```

### $emit

부모 컴포넌트로 변경값 보내기
자식 컴포넌트에서 emit을 통해 부모 컴포넌트로 이벤트를 날림.
부모 컴포넌트에서 자식 컴포넌트의 이벤트를 Catch하여 처리

```html
<!-- 부모 컴포넌트 -->
<script setup lang="ts">
  const word = ref("");
</script>

<div>
  <h1>{{ word }}</h1>
  <!-- Catch emitEvent -->
  <WatchTestComponent @emitEvent="word = $event.target.value" />
</div>

<!-- 자식 컴포넌트( WatchTestComponent.vue ) -->
<input @input="$emit('emitEvent', $event)" />
```

### is

### 전역 컴포넌트 등록

```typescript
import { createApp } from "vue";

const app = createApp({});

app.component(
  // the registered name
  "MyComponent",
  // the implementation
  {
    /* ... */
  }
);
```

```typescript
import MyComponent from "./App.vue";

app.component("MyComponent", MyComponent);
```

```typescript
app
  .component("ComponentA", ComponentA)
  .component("ComponentB", ComponentB)
  .component("ComponentC", ComponentC);
```

### 지역 컴포넌트 등록

```html
<script setup>
  import ComponentA from "./ComponentA.vue";
</script>

<template>
  <ComponentA />
</template>
```

### props

상위 컴포넌트에서 하위 컴포넌트로 값을 바인딩하는 것.
모든 props는 자식 속성과 부모 속성 사이에 단방향 바인딩을 형성한다.
이렇게 해야 자식 컴포넌트에서 부모 컴포넌트의 상태를 변경하여 데이터 흐름을 어렵게 만드는 것을 방지할 수 있다.
또한, 상위 컴포넌트가 업데이트 될 때마다 하위 컴포넌트의 구성 요소를 최신 데이터로 업데이트한다.
defineProps는 따로 import가 필요없고 Proxy로 만들어진 Object가 반환된다.

```html
<script setup>
  const props = defineProps(["foo"]);

  console.log(props.foo);
</script>
<script>
  // non setup
  export default {
    props: ["foo"],
    setup(props) {
      // setup() receives props as the first argument.
      console.log(props.foo);
    },
  };
</script>
```

```typescript
// in <script setup>
defineProps({
  title: String,
  likes: Number,
});
// non setup
// in non-<script setup>
export default {
  props: {
    title: String,
    likes: Number,
  },
};
```

하위 컴포넌트에서 상위 컴포넌트를 로컬 데이터로 사용할 경우, 반응성 부여

```typescript
const props = defineProps(["initialCounter"]);

// counter only uses props.initialCounter as the initial value;
// it is disconnected from future prop updates.
const counter = ref(props.initialCounter);
```

TypeScript interface를 통해 설정할 수도 있다.
interface를 사용할 경우 default 값은 withDefaults 라는 내부 함수를 이용해 따로 지정해야 한다.
또, withDefaults를 사용하면 default 값을 설정할 수 있다.

```typescript
export type ButtonGroupProps = {
  dataItems?: ButtonGroupDataItems;
  dir?: ButtonGroupDir;
  disabled?: ButtonGroupDisabled;
  value?: ButtonGroupValue;
  width?: ButtonGroupWidth;
};

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  dataItems: () => [],
});
```

## Provide / Inject

### Prop Drilling

부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때, props를 사용한다.
깊이있게, 자식 컴포넌트로 Props를 전달하는 경우를 Prop Drilling이라고 한다.
Prop Drilling은 많은 구성 요소가 영향을 받기 때문에 관리하기 어렵다.
Provice, Inject를 활용하여 Props Drilling 을 해결할 수 있다.

부모 구송 요소는 모든 하위 구성 요소에 대해 종속성 공급자 역할을 할 수 있다.
하위 트리의 모든 구성 요소는 깊이에 관계 없이 상위 체인의 구성 요소에서 종속성을 주입 받을 수 있다.

#### provide()

Vers.setup script

```html
<script setup>
  import { provide, ref } from "vue";
  const count = ref(0);
  provide(/* key */ "message", /* value */ "hello!");
  provide("key", count); // 반응형 객체도 Provide 가능하다.
</script>
```

Vers.CompositionAPI

```typescript
import { provide } from "vue";
export default {
  setup() {
    provide(/* key */ "message", /* value */ "hello!");
  },
};
```

전역 Provide도 가능하다.

```html
<script setup lang="ts">
  import { createApp } from "vue";

  const app = createApp({});

  app.provide(/* key */ "message", /* value */ "hello!");
</script>
```

#### inject()

부모 요소로 부터 Props 주입받기

```html
<script setup>
  import { inject } from "vue";

  const message = inject("message");
  const count = inject("key"); // inject 시 언래핑되지 않음.
  const value = inject("message", "default value"); // default Value를 설정할 수 있다.

  // 경우에 따라 함수를 호출하거나 새 클래스를 인스턴스화하여 기본 값을 만들 수 있다.
  // 선택적 값을 사용하지 않는 경우 불필요한 계산이나 부작용을 피하기 위해 기본 값을 생성하는 팩토리 함수를 사용할 수 있다.
  // 세번 째 매개 변수는 기본 값이 팩토리 함수로 처리되어야 함을 나타냄.
  const value = inject("key", () => new ExpensiveClass(), true);
</script>
```

ref 등의 반응성 객체는 inject 시 언래핑되지 않으므로, 반응성 연결을 유지할 수 있다.
또 inject를 받을 때, Provide된 키가 없다면 오류가 발생하므로, default Value를 설정할 수 있다.

```html
<script setup lang="ts"></script>
```

```html
<script setup lang="ts"></script>
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

```typescript

```

```typescript

```

```typescript

```
