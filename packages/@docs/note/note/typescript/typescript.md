# TypeScript

- 블록 영역 변수
- 전개연산자 / 매개변수
- 비구조화 할당

## 블록 영역 변수

let은 var 변수가 불러오는 문제점(중복 선언, 호이스트에 따른 의도치 않은 동작)을 훌륭하게 해결하므로 사용이 권장된다.
또, let, const 키워드를 사용하면 블록 스코프를 사용할 수 있음.

```javascript
// 컴파일 전
let context = document.querySelector("html");

{
  let context = document.querySelector("body");
  console.log("블록문 내부 context = ", context);
}

console.log("글로벌 context = ", context);

// 컴파일 후
var context = document.querySelector("html");

{
  var context_1 = document.querySelector("body");
  console.log("블록문 내부 context = ", context_1);
}

console.log("글로벌 context = ", context);
```

## 전개연산자 / 매개변수

Default Parameters
function의 Argument에만 사용할 수 있다.

```javascript
// 컴파일 전

// Default Parameters는 함수 또는 생성자 "구현"에서만 사용할 수 있다.
function countDown(start: number = 10): () => number {
  return () => (start > 0 ? start-- : 0);
}

function countDown(
  start: number,
  callback: (param: number = 10) => void // 타입정의 영역 X
): () => number {
  return () => (start > 0 ? start-- : 0);
}



// 컴파일 후

function countDown(start) {
  if (start === void 0) {
    start = 10;
  }
  return function () {
    return start > 0 ? start-- : 0;
  };
}
```

Spread Operator

```javascript
// 컴파일 전
let numbers: number[] = [101, 21, -12, 934, 87];

// 배열 내부 아이템으로 결합
numbers = [10, 31, 11, ...numbers, -2, 0];

// 배열 ⟹ 개별 아이템으로 순차적 제공
let min_number: number = Math.min(...numbers);
let max_number: number = Math.max(...numbers);

// 컴파일 후
var numbers = [101, 21, -12, 934, 87];

numbers = [10, 31, 11].concat(numbers, [-2, 0]);

var min_number = Math.min.apply(Math, numbers);
var max_number = Math.max.apply(Math, numbers);
```

Rest Parameters

```javascript
// 컴파일 전
function makeArray(...args: (number | string)[]): (number | string)[] {
  return args;
}

makeArray(11, "eleven", 100, "one hundred");
// 컴파일 후
function makeArray() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args;
}

makeArray(11, "eleven", 100, "one hundred");
```

## 비구조화 할당

배열, 객체의 아이템 또는 속성을 변수에 할당할 때 유용

```javascript
//컴파일 전
// 배열 비구조화 할당
let [html, , body] = [document.documentElement, document.head, document.body];

// 객체 비구조화 할당
let numbers_module = {
  multiplyNumbers: (...n: number[]): number => n.reduce((a, b) => a * b),
  sumNumbers: (...n: number[]): number => n.reduce((a, b) => a + b),
};

let { sumNumbers } = numbers_module;

// 컴파일 후
// 배열 비구조화 할당
var _a = [document.documentElement, document.body],
  html = _a[0],
  body = _a[2];

// 객체 비구조화 할당
var numbers_module = {
  multiplyNumbers: function () {
    var n = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      n[_i] = arguments[_i];
    }
    return n.reduce(function (a, b) {
      return a * b;
    });
  },
  sumNumbers: function () {
    var n = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      n[_i] = arguments[_i];
    }
    return n.reduce(function (a, b) {
      return a + b;
    });
  },
};

var sumNumbers = numbers_module.sumNumbers;
```

```javascript
//컴파일 전
let numbers_module: { multiplyNumbers: () => number } = {
  multiplyNumbers: (...n: number[]): number => n.reduce((a, b) => a * b),
};

// ?는 선택적으로 설정할 때 사용합니다. (ES6에서는 지원하지 않습니다)
let o: { multiplyNumbers: () => number, sumNumbers?: any } = numbers_module;

// sumNumbers 속성이 없을 경우, sum 속성에 기본 값을 설정합니다.
let {
  multiplyNumbers: multiply,
  sumNumbers: sum = (...n: number[]): number => n.reduce((a, b) => a + b),
} = o;

// 컴파일 후

var numbers_module = {
  multiplyNumbers: function () {
    var n = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      n[_i] = arguments[_i];
    }
    return n.reduce(function (a, b) {
      return a * b;
    });
  },
};

// ? 는 선택적으로 설정할 때 사용합니다. (ES6에서는 지원하지 않습니다)
var o = numbers_module;

// sumNumbers 속성이 없을 경우, sum 속성에 기본 값을 설정합니다.
var multiply = o.multiplyNumbers,
  _a = o.sumNumbers,
  sum =
    _a === void 0
      ? function () {
          var n = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            n[_i] = arguments[_i];
          }
          return n.reduce(function (a, b) {
            return a + b;
          });
        }
      : _a;
```
