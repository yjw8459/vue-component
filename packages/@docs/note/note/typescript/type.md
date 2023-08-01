```javascript
let milk_chocolate = '밀크 초콜릿'; // 초기 문자열 할당 시 자동 Type String
milk_chocolate = 2018;

/*
  오류 출력:
    [ts] '2018' 형식은 'string' 형식에 할당할 수 없습니다.
    let milk_chocolate: string
*/
```

## TypeScript 의 명시적 타입 설정

let product_name: string = 'OGT'

런타임에 예기치 못하게 발생할 오류를 사전에 방지

- null
- undefined
- number
- string
- boolean
- array
- function
- object
- Symbol

## Any

동적인 데이터 타입을 할당하려 할 때, 사용할 수 있다.
자바스크립트의 기본 변수 데이터 타입

## Array

```javascript
let array: (number | string)[] = [102, '유종원'];
```

## Tuple

배열의 타입과 순서를 Type 지정할 수 있음.

```javascript
let array: [string, number] = ['유종원', 1111];

// Error let array: [string, number] = [1111, '유종원'];
```

## Enum

열거형 데이터 타입
멤버라 불리는 명명된 값의 집합을 이루는 자료형

```javascript
enum Team {
  Manager, // 0
  Planner, // 1
  Developer, // 2
  Designer, // 3
}

let sarha:number = Team.Designer; // (enum member) Team.Designer = 3

enum Team {
  Manager = 101,
  Planner = 208,
  Developer = 302,
  Designer, // 302 + 1
}

let yamoo9:number = Team.Manager; // (enum member) Team.Manager = 101
let sarha:number = Team.Designer; // (enum member)
let role:string = Team[302]; // 'Developer'
```

## function / union / void 타입

tsconfig.json 의 noImplicitAny 옵션이 true인 경우 암시적인 any 사용 시 오류

- 암시적인 any

function func(id, name) id, name -> function(id: number, name: string)
let age;

### union

number, string 타입 모두 사용하려면 |(파이프) 로 설정

let id: (number | string)

### void

함수 리턴 타입에서 결과 값이 없는 경우 설정한다
결과 값을 반환하는 경우는 명시적으로 반환 값의 타입을 기술한다.

```javascript
// 리턴 값 타입이 명시적으로 설정되지 않는 함수
function assignClass(name:string): void {
  document.documentElement.classList.add(name);
}

// 리턴 값 타입이 숫자인 함수
function factorial(n:number): number {
  if (n < 0) { return 0; }
  if (n === 1) { return 1; }
  return n \* factorial(n-1);
}

// 리턴 값 타입이 문자인 경우
function repeat(text:string, count:number=1): string {
  let result:string = '';
  while(count--) { result += text; }
  return result;
}
```

- void는 undefined 와 같다. 반환 값이 없는 함수는 undefined를 반환하기 때문.

### 함수 식

변수에 함수 값을 할당하는 식(Expression)은 컴파일 과정에서 오류를 발생시키지 않음.

```javascript
let assignClass = function (name) {
  document.documentElement.classList.add(name);
};
```

하지만 보다 명시적으로 함수에 설정 가능한 타입을 정의하고자 한다면

```javascript
// 변수에 함수 매개변수, 리턴 타입에 대한 명시적 설정
let assignClass: (n: string) => void;

// 변수에 함수 값 할당
assignClass = function (name) {
  document.documentElement.classList.add(name);
};
```

변수에 명시적 타입 설정과 함수 값 할당 구문을 별도로 나누지 않고 한번에 정의

```javascript
/* 
  factorical의 Type (n: number) => number
  
*/
let factorial: (n: number) => number = n => {
  if (n < 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};
```

## object

```javascript
let Dom: {
  version: string,
  el: () => void,
  css: () => void,
  [propName: string]: any // ⬅︎
};

Dom = {
  version: '0.0.1',
  el() {},
  css() {}
};

Dom.each = function () {};
Dom.map = function () {};
Dom.filter = function () {};
```

## null / undefined

null을 허용할 시, union 타입을 이용하여 사용할 것.

```javascript
let test: string | null = null;

// tsconfig.json "strictNullChecks": true, /* 엄격한 null 검사 사용 모든 데이터에 null 또는 undefined를 할당할 수 없음. */
let nullable: null = null; // null이 아닌 다른 값을 대입할 경우 오류

let undefinedable: undefined = undefined;

//tsconfig.json에서 "strictNullChecks": false 할 경우 타입 지정 없이 null 사용가능
let nullTest: string = null;
```

## never 타입

일반적으로 함수의 리턴 타입으로 사용
함수의 리턴 타입으로 never가 사용될 경우, 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미
never 타입의 변수에는 never가 아닌 타입을 할당할 수 없음.

```javascript
// 항상 오류 발생
function invalid(message: string): never {
  throw new Error(message);
}

// never 타입을 결과 추론(Inferred)
function fail() {
  return invalid('실패');
}

// 무한 루프
function infiniteAnimate(): never {
  while (true) {
    infiniteAnimate();
  }
}
```

## 사용자 정의 타입

복잡한 타입을 사용자 정의하여 재사용하기 용이하도록 "타입 별칭(Type Alias)"를 정의할 수 있음.

```javascript
// 사용자 정의 타입 operation 정의
// 타입 별칭(Type Alias)
type operation = {
  data: number[],
  output: (num: number) => number[]
};

// 사용자 정의 타입 operation 적용 예시
let sum: operation = {
  data: [10, 30, 60],
  output(num) {
    return this.data.map(n => n + num);
  }
};

let multiply: operation = {
  data: [110, 230, 870, 231],
  output(num) {
    return this.data.map(n => n * num);
  }
};
```

## 타입 어설션

컴파일러에게 타입이 특정 타입임을 단언한다.(캐스팅)
타입 캐스팅과 비슷하지만 특별한 검사나 데이터 재구성을 하지않음.(명시적)
런타임 시, 영향을 미치지 않으며 오직 컴파일 과정에서만 사용됨.

```javascript
// 1. 앵글 브라캣(angle-bracket, <>)
let word:any = "타입 어설션은 '타입을 단언'합니다.";

// 방법 1: assertion 변수의 타입을 string으로 단언 처리
let assertion_count:number = (<string>word).length;
```

```javascript
// 2. as
let word:any = "타입 어설션은 '타입을 단언'합니다.";

// 방법 2: assertion 변수의 타입을 string으로 단언 처리
let assertion_count:number = (word as string).length;
```

- JSX와 함께 사용하는 경우 as 문법만 허용

## defineExpose

- 부모 컴포넌트가 자식 컴포넌트의 API에 직접적으로 접근할 수 있도록 하는 방법을 제공하는 함수
- 자식 컴포넌트의 setup 함수 내에서 사용된다.

- 기존 Vue2 에서는 props, emit, ref 등의 속성을 사용하여 자식 컴포넌트의 API를 부모 컴포넌트에 노출할 수 있었다.
- Vue3에서는 defineExpose 함수를 사용하여 자식 컴포넌트에서 노출할 API를 직접 정의할 수 있다.
