# ES6

Reference:

- https://tech.toktokhan.dev/2021/08/22/es6/
- https://ssungkang.tistory.com/entry/ES6-Array-Method#google_vignette

## const and let

- const
  객체와 함께 사용할 때를 제외하면 변경 불가능한 변수를 선언할 때 사용하는 키워드

- let
  var와 같은 변경 가능한 변수 선언할 때 사용하지만 var의 호이스팅 현상을 해결해주는 키워드

```javascript
// ES5
var button = document.getElementById("button1");

// ES6
const button = document.getElementById("button2");
let name = "toktokhan";

name = "dev";

console.log(name); //dev
```

## Template Literal

Template Literal은 문자열과 변수가 합쳐진 것을 말한다.

```javascript
let intro = (name = "anonymous") => "My name is " + name;

console.log(intro("name"));

intro = (name = "anonymous") => `My name is ${name}`;

console.log(intro("name"));
```

문자열과 변수를 합쳐주는 부분이 많아질수록 가독성이 떨어지기 때문에, Template Literal이 가독성을 높일 수 있다.

```javascript
const calulateMoney = (count, price) => `the total price is ${count * price}`;

console.log(calulateMoney(5, 1000));
```

변수가 아닌 표현식도 사용할 수 있다.

```javascript
const styled = (css) => console.log(css);

styled("border-radius: 10px;");
// border-radius: 10px;
styled`
    border-radius: 10px;
    color: blue;
`;
// [ '\n    border-radius: 10px;\n    color: blue;\n' ] Array 반환
```

`\`\를 사용해서 함수를 호출할 수도 있다.
이 때, 특징은 ()를 사용하지 않는다.

## String Method

### include

`Array.prototype.includes()`는 배열에 특정 요소가 포함되어 있는지를 판별한다.

```javascript
const isP = (fruit) => fruit.includes("P");

console.log(isA("apple")); // true
console.log(isA("banana")); // false
```

### repeat

`String.prototype.repeat()` 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환

```javascript
const repeatStr = "123".repeat(3);

console.log(repeatStr);
```

### startsWith / endWith

`String.prototype.startsWith()` 어떤 문자열이 특정 문자로 시작하는지 확인하여 boolean을 반환
`String.prototype.endWith()` 어떤 문자열이 특정 문자로 끝나는지 확인하여 boolean을 반환

```javascript
const fruit = "apple";
console.log(fruit.startsWith("ap")); // true
console.log(fruit.endWith("ap")); // false
```

### Array Method

### Array.of

`Array.of()` 인자의 수나 유형에 관계없이 가변 인자를 갖는 새 Array 인스턴스 생성

```javascript
const fruit = Array.of("apple", "banana", "strawberry");

console.log(fruit);
// [ 'apple', 'banana', 'strawberry' ]
```

### Array.from

`Array.from()`은 유사 배열 객체나 반복 가능한 객체를 얕게 복사해 새로운 Array 객체를 만든다.(유사 배열 객체를 Array 객체로 만들 때 사용)

```html
<body>
  <button class="btn">1</button>
  <button class="btn">2</button>
  <button class="btn">3</button>
  <button class="btn">4</button>
  <button class="btn">5</button>
  <button class="btn">6</button>
  <button class="btn">7</button>
  <button class="btn">8</button>
  <button class="btn">9</button>
  <button class="btn">10</button>
</body>
<script>
  const buttonsByTag = document.querySelectorAll("button");
  const buttonsByClass = document.getElementsByClassName("btn");

  // NodeList와 HTMLCollection은 유사 배열 객체(array-like object)
  console.log(buttonsByTag); // NodeList(10)
  console.log(buttonsByClass); // HTMLCollection(10)

  // X HTMLCollection은 유사 배열 객체이므로 forEach 사용 불가능하다.

  buttonsByClass.forEach((button) => {
    button.addEventListener("click", () => console.log("clicked"));
  });

  // O Array.from을 통해 Array로 만들어준다.
  Array.from(buttonsByClass).forEach((button) => {
    button.addEventListener("click", () => console.log("clicked"));
  });

  // uncaught TypeError: buttonsByClass.forEach is not a function
</script>
```

### Array.find

`Array.find()` 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다.

```javascript
const fruits = ["apple", "banana", "mango", "strawberry"];

const foundFruit = fruits.find((fruit) => fruit.includes("ap"));

console.log(foundFruit); // apple
```

### Array.findIndex

`Array.findIndex()` 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환.
만족하는 요소가 없을 경우 -1를 반환

```javascript
const fruits = ["apple", "banana", "mango", "pineapple"];

const foundFruitIndex = fruits.findIndex((fruit) => fruit.includes("ap"));

console.log(foundFruitIndex); // 0
```

### Array.fill

``Array.fill() 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채운다.

- value
  - 배열을 채울 값
- start
  - Optional
  - 시작 인덱스, 기본 값은 0
- end
  - Optional
  - 끝 인덱스, 기본 값은 `this.length`

```javascript
const array = [1, 2, 3, 4, 5];

console.log(array.fill(0, 2, 4));
// [ 1, 2, 0, 0, 5 ]
```

## Arrow Function

함수를 정의하는 function 키워드 없이 함수를 만들 수 있고, return 키워드 없이 식을 계산한 값이 자동으로 반환된다.
()안에 인자가 들어가고 => 오른쪽에는 결과를 반환하는 식

```javascript
// ---------------- ES5
function myFunc(name) {
  return "TokTokHan" + name;
}

console.log(myFunc(".dev"));

// ---------------- ES6 화살표 함수
// 함수 myFunc는 화살표(=>) 우측의 표현식(expression)을 평가하고, 평가 결과를 반환합니다.
const myFunc = (name) => {
  return `TokTokHan ${name}`;
};
console.log(myFunc(".dev"));

// 'return' 키워드를 사용하지 않아도 됩니다
const myFunc = (name) => `TokTokHan ${name}`;
console.log(myFunc(".dev")); // 출력 => 안녕 영희

//인수가 하나밖에 없다면 인수를 감싸는 괄호를 생략할 수 있습니다.
let double = (n) => n * 2;
```

## 비구조화 할당

```javascript
const ToktokhanCompany = {
  company: "TokTokHan",
  name: ".dev",
  age: 1,
};

// ES5
let company = contacts.company;
let name = contacts.name;
let age = contacts.age;

console.log(company);
console.log(name);
console.log(age);

// ES6
let { company, name, age } = ToktokhanCompany;

console.log(company);
console.log(name);
console.log(age);
```

## for...of

특정 행위를 반복시켜 결과 값을 얻어야할 때

```javascript
const iterable = [10, 20, 30];

//es5
for (let i = 0; i < iterable.length; i++) {
  console.log(value);
}

//es6
for (const value of iterable) {
  console.log(value);
}
```

## Spread Operator

spread 연산자는 특정 객체 또는 배열의 값을 다른 객체나 배열로 복제하거나 옮길 때 사용한다.

```javascript
const obj = {
  a: 10,
  b: 20,
};
const newObj = { ...obj };
console.log(newObj); // { a: 10, b: 20 }

const arr = [1, 2, 3];
const newArr = [...arr]; // [1, 2, 3]
console.log(newArr);
```

## Default Parameter(기본 매개변수)

```javascript
//es5
var foo = (a, b, c) => {
  console.log(a, b, c);
};

foo("a");
//a undefined undefined

//es6
const foo = (a, b = "b", c = "c") => {
  console.log(a, b, c);
};

foo("a");
//a b c
```

## Destructuring

Object나 Array, 그 외의 여러 요소들 안의 변수를 바깥으로 꺼내서 사용하는 것을 의미

### Object Destructuring

```javascript
// No Destructuring
const settings = {
  notifications: {
    follow: true,
    alerts: true,
  },
  color: {
    theme: "dark",
  },
};

if (settings.notifications.follow) {
  console.log("follow 중입니다.");
} else {
  console.log("follow 중이 아닙니다.");
}

// Destructuring
const {
  notifications: { follow },
  color,
} = settings;

console.log(follow); // true
console.log(color); // { theme: 'dark' }
console.log(notifications); // ReferenceError: notifications is not defined
```

settings 안에 있는 notifications 안으로 접근해서 follow만 가져온다.
큰 오브젝트에서 특정 변수나 그 안에 속한 작은 오브젝트에 접근할 수 있도록 해준다.
결과를 보면 `notifications`는 정의 되어있지 않은데 이는 follow로 접근하기 위한 것이지 변수로 선언한 것이 아니기 때문이다.

Destructuring X Default Value

```javascript
// Ex1
const {
  notifications: { follow = false },
  color,
} = settings;

console.log(follow);
// false

// Ex2 one-line-statement
const { notifications: { follow = false } = {}, color } = settings;

console.log(follow);
// false
```

notifications와 follow 모두 Default Value를 줄 수 있다.

### Array Destructuring

비슷한 개념을 array에 적용한 것으로 가져온 정보를 조작하지 않을 때 쓰기 편하다.
array는 object처럼 key 값은 존재하지 않고 포지션 값만 존재하기 때문에 따로 key 값을 기재하지 않고 `{}` 대신 `[]`를 사용한다.

```javascript
// No Destructuring
const fruits = ["apple", "banana", "melon", "strawberry"];

const f1 = fruits[0];
const f2 = fruits[1];
const f3 = fruits[2];

console.log(f1, f2, f3);
// apple banana melon

// Destructuring
const fruits = ["apple", "banana", "melon", "strawberry"];

const [f1, f2, f3] = fruits;

console.log(f1, f2, f3);
// apple banana melon

// Destructuring X Default Value
const fruits = ["apple", "banana"];
const [f1, f2, f3 = "melon"] = fruits;

console.log(f1, f2, f3);
// apple banana melon
```

### Renaming

변수의 이름 바꿔주기
`Destructuring`을 사용하지 않았을 경우에는 다음과 같이 변경이 가능하다.

```javascript
// No Destructuring
const settings = {
  color: {
    theme: "dark",
  },
};

const changeName = settings.color.theme || "light";

console.log(changeName);
// dark

// Destructuring const 변수를 재정의하는 경우 오류 발생
const {
  color: { theme: changeName = "light" },
} = settings;

console.log(changeName);
// dark

// const 재정의
({
  color: { theme: changeName = "light" },
} = settings);

console.log(changeName);
```

### Function Destructuring

```javascript
// No Function Destructuring
function saveSettings(settings) {
  console.log(`follow: ${settings.follow}`);
}

saveSettings({
  follow: true,
  alerts: true,
});

// follow: true

// Function Destructuring X Default Value
function saveSettings({ follow, alerts, color = "light" }) {
  console.log(`follow: ${follow}`);
}

saveSettings({
  follow: true,
  alerts: true,
});

// follow: true
```

### Value Shorthands

```javascript
// No Value Shorthands
const follow = true;
const alerts = true;

const settings = {
  follow: follow,
  alerts: alerts,
};

console.log(settings);
// { follow: true, alerts: true }

// Value Shorthands

const settings = {
  follow,
  alerts,
};

console.log(settings);
// { follow: true, alerts: true }
```

### Swapping and Skipping

두 방법 모두 Array Destructuring을 사용하는 방법

- swapping 은 array Destructuring을 이용해서 변수의 값을 바꿔주는 방법

```javascript
let apple = "banana";
let banana = "apple";

[banana, apple] = [apple, banana];

console.log(apple, banana);
// apple banana
```

- skipping
  array에서 중간의 값들만 필요할 때 사용하는 방법

```javascript
const fruits = ["apple", "banana", "melon", "strawberry"];

const [, banana, , strawberry] = fruits;

console.log(banana, strawberry);
// banana strawberry
```

`,`를 통해서 자리를 표시해주고 필요한 값들만 받아주도록 한다.
