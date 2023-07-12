## 네임 스페이스

- Javascript 객체를 사용해 범주를 생성
- 여러 파일로 나눠 개발 확장 및 연결 가능
- 의존성 파일을 HTML 페이지 <script> 요소를 사용해 웹 애플리케이션 코드를 구성

```javascript
//컴파일 전
// 네임스페이스 Dom 정의
namespace Dom {

  // 외부에서 접근 불가
  const document = window.document;

  // 외부에서 접근 가능하도록 export
  export function el(selector:string, context:HTMLElement|Document = document) {
    return context.querySelector(selector);
  }

  // 외부에서 접근 가능하도록 export
  export function els(selector:string, context:HTMLElement|Document = document) {
    return context.querySelectorAll(selector);
  }

  // export 하지 않은 네임스페이스 내부에 정의된 함수는 외부에서 접근 불가
  function each(list:any[], callback:(item:any, index:number, list:any[])=>void): void {
    list.forEach(callback);
  }

}

// [오류]
// [ts] 'el' 이름을 찾을 수 없습니다.
// any
console.log(el('body')); // 오류

// [오류]
// [ts] 'typeof Dom' 형식에 'each' 속성이 없습니다.
// any
Dom.each([1, 4, 9], (item, index) => console.log(index, item));

// 네임스페이스 Dom을 통해서만 정의된 el()에 접근 사용 가능합니다.
console.log(Dom.el('body')); // <body>

// 컴파일 후

// 네임스페이스 Dom 정의
var Dom;
(function (Dom) {
  // 외부에서 접근 불가
  var document = window.document;
  // 외부에서 접근 가능하도록 export
  function el(selector, context) {
    if (context === void 0) { context = document; }
    return context.querySelector(selector);
  }
  Dom.el = el;
  // 외부에서 접근 가능하도록 export
  function els(selector, context) {
    if (context === void 0) { context = document; }
    return context.querySelectorAll(selector);
  }
  Dom.els = els;
  // export 하지 않은 네임스페이스 내부에 정의된 함수는 외부에서 접근 불가
  function each(list, callback) {
    list.forEach(callback);
  }
})(Dom || (Dom = {}));
```

## 네임 스페이스 멀티 파일

### 1. 컴파일된 파일 로드

```javascript
// Dom/events.ts
namespace Dom {

  export let version:string = '0.0.2';

  export function on(
    el         : Element|Document,
    type       : string,
    handler    : (e:Event)=>void,
    is_capture : boolean = false
  ):void {
    el.addEventListener(type, handler, is_capture);
  }

  export function off(
    el         : Element|Document,
    type       : string,
    handler    : (e:Event)=>void,
    is_capture : boolean = false
  ):void {
    el.removeEventListener(type, handler, is_capture);
  }

}

// Dom/selector.ts
namespace Dom {

  const document = window.document;

  export function el(
    selector:string,
    context:Element|Document = document
  ): Element {
    return context.querySelector(selector);
  }

  export function els(
    selector:string,
    context:Element|Document = document
  ): NodeList {
    return context.querySelectorAll(selector);
  }

}

// app.ts

// Dom/selector.ts의 Dom 사용
let body = Dom.el('body');

// Dom/events.ts의 Dom 사용
Dom.on(body, 'click', function(e) {
  this.classList.toggle('clicked');
});

// html
<head>
  <style> body { min-height: 100vh; } </style>

  <!-- 네임스페이스 파일 로드 -->
  <script src="./Dom/selectors.js">
  <script src="./Dom/events.js">

  <!-- 앱 파일 로드 async -->
  <script async defer src="./app.js">

</head>

```

app.ts보다 네임스페이스 Dom의 파일들이 먼저 호출되면 정상 작동한다.
하지만, 나눠진 파일 개수가 많아질수록 서버에 요청하는 횟수가 증가하여 성능에 악영향을 미친다.

### 2. 파일 번들링

Dom 디렉토리 내부에 있는 네임스페이스 파일들을 병합한 후, dist 디렉토리 안에 Dom.js를 생성한다.

```bash
# tsc --outFile <생성할 파일.js> [<namespace 파일 1>, <namespace 파일 1>, ...]
$ tsc --outFile dist/Dom.js Dom/selector.ts Dom/events.ts
or
$ tsc --outFile dist/Dom.js Dom/*
```

### 3. 임포트 활용

임포트하여 한꺼번에 번들링.

```javascript
//app.ts
/// <reference path="./Dom/selectors.ts" />
/// <reference path="./Dom/events.ts" />

let body = Dom.el("body");

Dom.on(body, "click", function (e) {
  this.classList.toggle("clicked");
});
```

tsc 명령을 사용해 app.ts 파일을 번들링하여 dist/app.js로 내보낸다.

```bash
$ tsc app.ts --outFile dist/app.js
```

## 네임스페이스 중첩

네임스페이스 내부에 네임스페이스를 선언할 수 있고, 공개(export)할 수도 있음.

```javascript
// Dom.ts
namespace Dom {

  // 중첩된 Events 네임스페이스
  export namespace Events {
    export function on(
      el         : Element|Document,
      type       : string,
      handler    : (e:Event)=>void,
      is_capture : boolean = false
    ):void {
      el.addEventListener(type, handler, is_capture);
    }

    export function off(
      el         : Element|Document,
      type       : string,
      handler    : (e:Event)=>void,
      is_capture : boolean = false
    ):void {
      el.removeEventListener(type, handler, is_capture);
    }
  }

}
```

### 중첩된 네임스페이스 별칭

중첩된 네임스페이스에 접근하기 위해 코드가 길어진다면 별칭(Alias)를 만들어 사용할 수 있다.
`import` 키워드를 사용

```javascript
/// <reference path="./Dom.ts" />

// Dom.Events 네임스페이스를 import 하여 Events 변수에 참조
import Events = Dom.Events;

let body = Dom.el('body');

Events.on(body, 'click', function(e) {
  this.classList.toggle('clicked');
});
```

## 모듈

- 모듈 상단에 의존성을 선언
- 모듈을 활용하기 위해선 모듈 로더, 번들러가 필요하다.
- 대규모 애플리케이션을 개발할 경우 장기적으로 모듈성, 유지관리 이점이 있다.
- Node.js 애플리케이션 개발의 기본 방식, 코드 구조화를 위한 방법
- ES6부터 모듈 지원
- 파일 자체 범위 내에서 실행된다.(모듈 내 선언된 변수, 함수, 클래스 등을 명시적으로 내보내지 않는 이상 모듈 외부에서 접근할 수 없음.)

```javascript
//컴파일 전

// 컴파일 후
```

```javascript
//컴파일 전

// 컴파일 후
```

```javascript
//컴파일 전

// 컴파일 후
```

```javascript
//컴파일 전

// 컴파일 후
```

```javascript
//컴파일 전

// 컴파일 후
```
