## 인터페이스

인터페이스는 Javascript와 같은 동적 타입 언어 환경에서는 다뤄지지 않았음.
하지만, 정적 타입 언어인 TypeScript 에서는 타입 검사가 요구 되므로 "인터페이스"를 지원
"interface" 키워드를 사용해 정의

```javascript
// 인터페이스 Button 정의
interface ButtonInterface {
  onInit(): void;
  onClick(): void;
}

// 사용자 정의 타입(Type Alias)
type ButtonType = {
  onInit(): void,
  onClick(): void,
};
```

사용자 정의 타입이 할 수 없는 것을 인터페이스는 할 수 있음.

- 선언을 병합

```javascript

// 인터페이스는 선언이 병합됨.
interface ButtonInterface {
  onInit():void;
  onClick():void;
}

...

interface ButtonInterface {
  onToggle():void;
}


// 사용자 정의 타입은 ERROR
type ButtonType = {
  onInit():void;
  onClick():void;
}

// [오류]
// 'ButtonType' 식별자가 중복되었습니다.
type ButtonType = {
  onToggle():void;
}

```

## 인터페이스와 클래스

인터페이스는 클래스와 비슷한데, 클래스와 달리 정의만 할 뿐 실제 구현되지 않음.
즉, 어떠한 객체를 생성 했을 때 가져야할 속성 또는 메서드를 정의

```javascript
// 인터페이스 Button 정의
interface ButtonInterface {
  onInit(): void;
  onClick(): void;
}

// 클래스 Y9Button 인터페이스 Button 확장
// implements: 클래스가 인터페이스에 정의된 실행 규칙을 따를 것임을 선언.
class Y9Button implements ButtonInterface {
  width: number;
  height: number;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // [오류]
  // 'Y9Button' 클래스가 'Button' 인터페이스를 잘못 구현합니다.
  // 'onInit' 속성이 'Y9Button' 형식에 없습니다.
}
```

## 인터페이스와 매개 변수

매개 변수에도 인터페이스를 설정할 수 있음.
인터페이스가 설정된 매개변수는 인터페이스에 정의된 요구 사항을 충족해야 한다.

```typescript
// onInit(), initialize() 메서드가 필요함을 정의한 인터페이스
interface OnInitInterface {
  onInit(): void;
  initialize(): void;
}
// 인터페이스 요구 조건에 충족하는 객체
const o = {
  onInit(): void {
    console.log("onInit 라이프 사이클");
  },
  initialize(): void {
    console.log("객체 초기화");
  },
};

// 인터페이스 요구 조건에 충족하지 않은 객체​
const j = {
  settings(): void {
    console.log("객체 설정");
  },
};
// 매개변수에 인터페이스가 설정된 함수
function ready(m: OnInitInterface): void {
  m.onInit();
  m.initialize();
}
// 전달된 객체 o는 OnInitInterface 인터페이스 요구 조건을 충족
ready(o);

// [오류]
// '{ settings(): void; }' 형식의 인수는 'OnInitInterface' 형식의 매개 변수에 할당될 수 없습니다.
// 'onInit' 속성이 '{ settings(): void; }' 형식에 없습니다.
ready(j);
```

## 인터페이스와 객체 리터럴

클래스 선언 과정에서 "implements" 키워드를 사용해 명시적으로 인터페이스를 설정하는 방법이 아니어도, 객체 리터럴에 인터페이스를 설정할 수 있다.

```typescript
interface OnInitInterface {
  onInit(): void;
  initialize(): void;
}
const o: OnInitInterface = {
  onInit(): void {
    console.log("onInit 라이프 사이클");
  },
  initialize(): void {
    console.log("객체 초기화");
  },
};
// [오류]
// '{ settings(): void; }' 형식은 'OnInitInterface' 형식에 할당할 수 없습니다.
// 개체 리터럴은 알려진 속성만 지정할 수 있으며 'OnInitInterface' 형식에 'settings'이(가) 없습니다.
const j: OnInitInterface = {
  settings(): void {
    console.log("객체 설정");
  },
};
```

## 인터페이스 옵션 속성

인터페이스는 클래스와 흡사하지만, 사용 목적이 다르다.
인터페이스는 객체 인스턴스를 생성할 수 없으므로 "타입 검사"가 사용 목적이 된다.

```typescript
interface ButtonInterface {
  onInit(): void;
  onClick(): void;
}

class ButtonComponent implements ButtonInterface {
  onInit() {
    console.log("버튼 컴포넌트 초기화");
  }
  onClick() {
    console.log("버튼 클릭");
  }
}
```

### 인터페이스 옵션 설정

클래스는 설정된 인터페이스에 정의된 속성 또는 메서드를 반드시 사용하지 않고,
필요에 따라 선택적으로 사용하고 싶을 수도 있다.
이 경우 옵션(Optional) 속성 설정을 통해 사용자가 선택적으로 사용하게 설정한다.
속성 이름 뒤에 "?"를 붙이면 옵션 속성이 된다.

```typescript
interface ButtonInterface {
  // 속성 이름 뒤에 ? 기호가 붙으면 옵션 속성이 됩니다.
  onInit?(): void;
  onClick(): void;
}

class ButtonComponent implements ButtonInterface {
  // onInit 메서드가 설정되지 않아도 오류를 발생하지 않습니다.
  onClick() {
    console.log("버튼 클릭");
  }
}
```

## 인터페이스 읽기 전용 속성

일부 속성은 처음 만들어 질 때외 수정할 수 없도록 설정할 수 있음.

```typescript
interface Notebook {
  readonly CPU: string;
  readonly RAM: string;
}
let mackbook: Notebook = {
  CPU: "2.9GHz 코어 i9",
  RAM: "32GB",
};

// [오류]
// 'RAM'은 읽기 전용 속성 또는 상수로 변경할 수 없습니다.
// (property) Notebook["RAM"]: string
macbook.RAM = "128GB";
```

## 인덱스 시그니처 속성

인터페이스는 클래스에 설정 되었을 때, 주어진 요구사항을 준수한다면 새로운 속성이 추가되어도 오류를 발생시키지 않는다.

```typescript
interface ButtonInterface {
  onInit?(): void;
  onClick(): void;
}

class ButtonComponent implements ButtonInterface {
  type: string = "button";
  disabled: boolean = false;

  constructor() {}
  onClick() {
    console.log("버튼 클릭");
  }
}
```

하지만 인터페이스를 타입으로 하는 객체 리터럴의 경우는 새로운 속성을 추가할 수 없다고 오류를 출력한다.

```typescript
interface ButtonInterface {
  onInit?(): void;
  onClick(): void;
}

const button: ButtonInterface = {
  // [오류]
  // '{ type: string; disabled: boolean; onClick(): void; }' 형식은
  // 'ButtonInterface' 형식에 할당할 수 없습니다. 개체 리터럴은 알려진 속성만
  // 지정할 수 있으며 'ButtonInterface' 형식에 'type'이(가) 없습니다.
  type: "button",
  disabled: false,
  onClick() {
    console.log("버튼 클릭");
  },
};
```

오류 발생 이유는 인터페이스에 정의되지 않은 "동적 타입이 할당"되는 것을 TypeScript는 기본적으로 오류로 보기 때문이다.

1. 동적 타입 할당 오류를 없애기 위한 tsconfig.json 설정
   noImplicitAny 옵션 값을 false

2. 인터페이스 인덱스 시그니처

```typescript
interface ButtonInterface {
  onInit?(): void;
  onClick(): void;
  // 인덱스 시그니처
  [prop: string]: any;
}

const button: ButtonInterface = {
  type: "button",
  disabled: false,
  onClick() {
    console.log("버튼 클릭");
  },
};
```

## 인터페이스와 함수 타입

인터페이스는 함수 타입도 정의할 수 있다.
함수를 할당 받을 변수에 인터페이스를 설정하면 함수 매개변수, 리턴 값 타입을 명시적으로 입력하지 않아도 오류가 발생하지 않는다.

```typescript
// 인터페이스를 연결하지 않은 함수의 경우, 매개변수, 리턴 값을 설정합니다.
const factorial = (n: number): number => {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

// 펙토리얼 함수 인터페이스 정의
interface FactorialInterface {
  (n: number): number;
}
// 인터페이스를 함수 타입에 설정했기에 별도의 매개변수, 리턴 값 설정을 생략해도 됩니다.
const facto: FactorialInterface = (n) => {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return n * facto(n - 1);
};
```

주의할 점은 인터페이스가 설정된 함수의 매개변수, 리턴 값 타입을 임의로 변경하면 오류가 발생한다.

```typescript
// [오류]
// '(n: number[]) => number' 형식은 'FactorialInterface' 형식에 할당할 수 없습니다.
// 'n' 및 'number' 매개 변수의 형식이 호환되지 않습니다.
// 'number' 형식은 'number[]' 형식에 할당할 수 없습니다.
const fct: FactorialInterface = (n: number[]): number => {
  if (n[0] === 0) {
    return 0;
  }
  if (n[0] === 1) {
    return 1;
  }
  return n[0] * facto(n[0] - 1);
};
```

## 인터페이스 확장

클래스를 상속하는 클래스가 있듯이, 인터페이스 또 한 "extends" 키워드를 사용하여 인터페이스를 확장할 수 있다.

상속: 클래스 -> 클래스
확장: 인터페이스 -> 인터페이스

```typescript
interface ButtonInterface {
  readonly _type: string;
  width?: number;
  height?: number;
  onInit?(): void;
  onClick(): void;
}

// ButtonInterface를 확장하는 ToggleButtonInterface
interface ToggleButtonInterface extends ButtonInterface {
  toggle(): void;
  onToggled?(): void;
}

// ButtonInterface를 확장하는 CounterButtonInterface
interface CounterButtonInterface extends ButtonInterface {
  increase(): void;
  decrease(): void;
  onIncreased?(): void;
  onDecreased?(): void;
}
```

2개 이상의 인터페이스를 확장하는 인터페이스 구현도 가능하다.

```typescript
interface ButtonInterface {
  readonly _type: string;
  width?: number;
  height?: number;
  onInit?(): void;
  onClick(): void;
}
interface ButtonSizeInterface {
  readonly _size: number;
  small(): void;
  medium(): void;
  large(): void;
  onChangeSize?(): void;
}
// ButtonInterface, ButtonSizeInterface를 다중 확장하는 ImageButtonInterface
interface ImageButtonInterface extends ButtonInterface, ButtonSizeInterface {
  readonly _url: string;
  getUrl(): string;
  setUrl?(url: string): void;
  onChangeUrl?(): void;
}
```

인터페이스를 확장한 클래스는 인터페이스에 정의된 준수사항에 따라 구현되어야 한다.

```typescript
class ImageButton implements ImageButtonInterface {
  readonly _type: string;
  readonly _url: string;
  readonly _size: number;
  onClick() {}
  getUrl() {
    return this._url;
  }
  small() {}
  medium() {}
  large() {}
}
```

클래스 방식이 아닌 객체 리터럴 방식으로 객체를 사용하고자 할 경우, 객체를 할당 받을 변수에 인터페이스를 설정할 수 있다.

```typescript
// [오류]
// '{}' 형식은 'ImageButtonInterface' 형식에 할당할 수 없습니다.
// '_url' 속성이 '{}' 형식에 없습니다.
let imageButton: ImageButtonInterface = {};

let imageButton: ImageButtonInterface = {
  _url: "",
  _size: 14,
  _type: "button",
  getUrl() {
    return this._url;
  },
  setUrl(url: string) {},
  small() {},
  medium() {},
  large() {},
  onClick() {},
};
```

객체를 초기 선언하는 과정이 아닌, 추후 인터페이스에 정의된 속성을 추가할 수 있도록 사용하려면, 제네릭 문법을 사용한다.

```typescript
// 제네릭(Generic) 문법을 사용하여 설정하면 선언 과정에서 오류가 발생하지 않습니다.
let imageButton = <ImageButtonInterface>{};

imageButton.small = () => {
  console.log("버튼 크기 small 설정");
};
imageButton.large = () => {
  console.log("버튼 크기 large 설정");
};
```

하지만 readonly 속성의 경우, 읽기 전용 속성으로 초기 선언 과정에서 정의되어 있어야 한다.
설정하지 않으면 추후에 초기화할 수 없다.

```typescript
let imageButton = <ImageButtonInterface>{
  _type: "button",
  _size: 14,
  _url: "",
};

imageButton.small = () => {
  console.log("버튼 크기 small 설정");
};
imageButton.large = () => {
  console.log("버튼 크기 large 설정");
};
```
