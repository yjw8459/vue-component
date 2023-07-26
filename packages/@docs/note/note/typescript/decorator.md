# 데코레이터

데코레이터(Decorator)는 ECMAScript에 새롭게 제안된 기능이며, TypeScript의 실험적 기능으로 클래스 선언과 멤버에 대한 주석(annotations)과 메타 프로그래밍 구문을 모두 추가 할 수있는 방법을 제공합니다.

- 클래스 선언
- 멤버에 대한 주석
- 메타 프로그래밍 구문

사용 방법

```json
tsconfig.json
{
  "compilerOptions": {
  ...,
  "experimentalDecorators": true,
  ...
  }
}
```

## 데코레이터 / 팩토리

데코레이터는 클래스, 속성, 메서드, 접근 제어자, 매개변수 등에 사용할 수 있는 특별한 함수입니다. 선언된 데코레이터 함수를 사용할 때는 데코레이터 이름 앞에 "@"를 붙입니다.

```typescript
// 데코레이터 함수
function Component(target: Function) {
  console.log(target);
  console.log(target.prototype);
}

// 데코레이터를 사용한 클래스 TabsComponent 정의
@Component
class TabsComponent {}
```

함수 사용 시, 사용자가 인자를 전달할 수 있는 것과 유사하게, 데코레이터 함수 또한 팩토리를 사용해 사용자로부터 인자를 전달 받도록 설정할 수 있다.
데코레이터 팩토리 함수는 데코레이터 함수를 감싸는 래퍼 함수
팩토리는 사용자로부터 전달 받은 인자를, 내부에서 반환되는 데코레이터 함수는 데코레이터로 사용됩니다.

- 데코레이터 팩토리 함수 = 래퍼 함수
- 팩토리 = 사용자로부터 전달 받은 인자
- 데코레이터 함수 = 데코레이터

```typescript
// 데코레이터 팩토리 -> 팩토리
function Component(value: string) {
  console.log(value);

  // 데코레이터 함수 -> 데코레이터
  return function (target: Function) {
    console.log(target);
    console.log(target.prototype);
  };
}

// 데코레이터 팩토리를 사용하면 값을 전달할 수 있습니다.
@Component("tabs")
class TabsComponent {}

// TabsComponent 객체 생성
const tabs = new TabsComponent();
```

## 멀티 데코레이터

데코레이터는 하나 이상 연결해 사용할 수 있다.
멀티 데코레이터는 수평 또는 수직 나열하여 사용할 수 있다.

```typescript
// 수직나열
@Size
@Color
// @Size @Color 수평 나열
class Button {}
```

### 실행흐름

1. 각 데코레이터 표현식은 위에서 아래 방향(⬇︎)으로 평가된다.
2. 결과는 아래에서 위로(⬆︎) 함수를 호출한다.

```typescript
// Size 데코레이터 팩토리
function Size() {
  console.log("Size(): 평가됨");
  // Size 데코레이터
  return function (target: any, prop: string, desc: PropertyDescriptor) {
    console.log("Size(): 실행됨");
  };
}
// Color 데코레이터 팩토리
function Color() {
  console.log("Color(): 평가됨");
  // Color 데코레이터
  return function (target: any, prop: string, desc: PropertyDescriptor) {
    console.log("Color(): 실행됨");
  };
}
// Button 클래스 정의
class Button {
  // 메서드에 멀티 데코레이터 적용
  @Size()
  @Color()
  isPressed() {}
}
```

결과

```console
Size(): 평가됨
Color(): 평가됨
Color(): 실행됨
Size(): 실행
```

## 클래스 데코레이터

클래스에 설정하는 데코레이터
클래스 데코레이터가 설정된 클래스 선언을 관찰, 수정 또는 대체하는데 사용할 수 있다.
클래스 데코레이터는 런타임에 함수로 호출 되며, 데코레이팅 되는 클래스가 유일한 인자로 전달되어 호출된다.

```typescript
// Component 데코레이터
// 데코레이팅 될 함수가 매개변수(TabsComponent)
function Component(target: Function) {
  // 프로토타입 객체 참조
  let $ = target.prototype;

  // 프로토타입 객체 확장
  $.type = "component";
  $.version = "0.0.1";
}
// Component 데코레이터 사용
@Component
class TabsComponent {}

// TabsComponent 객체 인스턴스 생성
const tabs = new TabsComponent();

// 데코레이터로 설정된 프로토타입 확장은
// 타입 단언(Type Assertion) 필요
console.log((tabs as any).type); // 'component' 출력
```

클래스 데코레이터 함수에 생성자 함수 제너릭을 사용한 후, 새로운 클래스를 반환하면 생성자 함수 및 속성 등을 재 정의 할 수 있습니다. 클래스 데코레이터 함수에서 재정의한 속성 및 메서드는 사용자 정의 속성 및 메서드 보다 우선합니다.

```typescript
// Component 데코레이터
// function Component(target) {
function Component<T extends new (...args: any[]) => {}>(target: T) {
  // 재정의
  return class extends target {
    // 속성
    type: string = "component";
    version: string = "0.1.0";
    // 메서드
    open() {
      console.log("탭 활성화");
    }
    close() {
      console.log("탭 비활성화");
    }
  };
}
// Component 데코레이터 사용
@Component
class TabsComponent {
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  open() {
    console.log("사용자 정의 탭 open 메서드");
  }
}
// TabsComponent 객체 인스턴스 생성
const tabs = new TabsComponent(document.querySelector(".tabs"));

console.log((tabs as any).type); // 'component' 출력
console.log((tabs as any).open()); // '탭 활성화' 출력
```

## 클래스 데코레이터 팩토리

사용자로부터 옵션 객체를 전달 받으려면 데코레이터 팩토리를 사용해야 합니다. 데코레이터 함수를 반환하는 래퍼 함수를 만들어 사용자로부터 옵션을 전달 받을 수 있습니다.

```typescript
// ComponentType 타입 앨리어스 정의
type ComponentType = {
  el: string;
  [prop: string]: any;
};

// Component 데코레이터 팩토리
function Component(options: ComponentType) {
  const _el = document.querySelector(options.el);
  // Component 데코레이터
  return function Component<T extends new (...args: any[]) => {}>(target: T) {
    return class extends target {
      el: HTMLElement = <HTMLElement>_el;
    };
  };
}
// Component 데코레이터 사용
@Component({
  el: ".tabs",
})
class TabsComponent {}
// TabsComponent 객체 인스턴스 생성
const tabs = new TabsComponent();
console.log((tabs as any).el);
```

## 메서드 데코레이터

메서드 데코레이터는 메서드 선언 앞에 사용됩니다. 데코레이터는 메서드 선언을 확인, 수정, 교체하는데 사용될 수 있습니다. 메서드 데코레이터 함수가 전달 받는 인자는 총 3가지로 다음과 같습니다.

- target: any
- prop: string
- descriptor: PropertyDescriptor

writable이 false일 경우 수정이 불가능하다.

```typescript
// Write 데코레이터 팩토리
function Write(able: boolean = true) {
  // Write 데코레이터
  return function (t: any, p: string, d: PropertyDescriptor) {
    d.writable = able;
  };
}

// Button 클래스
class Button {
  // 생성자
  constructor(public el: HTMLButtonElement) {}
  // Write 데코레이터 사용
  // false 전달 ⟹ 쓰기 불가
  @Write(false)
  disable() {
    this.el.setAttribute("disabled", "disabled");
  }
}

// Button 객체 인스턴스 생성 및 변수 참조
const btn = new Button(<HTMLButtonElement>document.querySelector(".button"));

// [오류]
// 쓸 수 없는 메서드를 쓰려고 하였기에 쓸 수 없다고 오류 메시지를 출력합니다.
// Uncaught TypeError:
// Cannot assign to read only property 'disable' of object '#<Button>'
btn.disable = function () {
  console.log(this);
};
```

## 접근제어자 데코레이터

접근 제어자 데코레이터는 접근 제어자 앞에 사용됩니다.
접근 제어자 데코레이터는 접근 제어자에 대한 선언 확인, 수정, 교체하는데 사용될 수 있습니다.
접근 제어자 데코레이터 함수가 전달 받는 인자는 총 3가지로 다음과 같습니다.

- target: any
- prop: string
- descriptor: PropertyDescriptor

속성 기술자의 configurable 속성 값을 false로 설정한 접근 제어자 속성은 외부에서 제거할 수 없습니다.

```typescript
// Configurable 데코레이터 팩토리
function Configurable(remove: boolean) {
  // Configurable 데코레이터
  return function (t: any, k: string, d: PropertyDescriptor) {
    d.configurable = remove;
  };
}

// Rectangle 클래스
class Rectangle {
  private _width: number;
  private _height: number;

  constructor(w: number, h: number, public color: string = "#000") {
    this._width = w;
    this._height = h;
  }

  // 접근 제어자 데코레이트 사용
  @Configurable(false)
  get width() {
    return this._width;
  }

  @Configurable(false)
  get height() {
    return this._height;
  }
}

// Rectangle 객체 인스턴스 생성
const rect = new Rectangle(400, 210);

// 속성 제거 가능
delete rect.color;

// [오류]
// delete 연산자의 피연산자는 읽기 전용 속성일 수 없습니다.
delete rect.width;
```

## 속성 데코레이터

속성 선언 앞에 사용
속성 선언을 확인, 수정, 교체하는데 사용
속성 데코레이터 함수는 전달 받는 인자가 총 2가지 입니다.

- target: any
- prop: string

```typescript
// logProp 속성 데코레이터 정의
function logProp(t: any, p: string) {
  // 속성 값
  let v = t[p];

  // getter 속성
  let getter = function () {
    console.log(`GET: ${p} => ${v}`);
    return v;
  };

  // setter 속성
  let setter = function (new_v: any) {
    v = new_v;
    console.log(`SET: ${p} => ${v}`);
  };

  // 속성 값을 제거한 후,
  if (delete t[p]) {
    // 새 속성 정의
    Object.defineProperty(t, p, {
      // getter 속성 연결
      get: getter,
      // settert 속성 연결
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}
// Button 클래스
class Button {
  // logProp 속성 데코레이터 사용
  @logProp
  type: string = "button";

  @logProp
  version: string = "0.0.2";

  // 생성자
  constructor(public el: HTMLButtonElement) {}
}

// Button 객체 인스턴스 생성
const btn = new Button(document.querySelector(".button") as HTMLButtonElement);

// btn.type 읽기 시도
console.log(btn.type);

// btn.type 쓰기 시도
btn.type = "버튼";
```

```bash
// getter
GET: type => button
typescript.js:54 button

// setter
typescript.js:20 SET: type => 버튼
```

## 매개변수 데코레이터

매개변수 데코레이터는 매개변수 선언 앞에 사용됩니다.
매개변수 데코레이터는 클래스 생성자 함수 또는 메서드의 매개변수 에 사용될 수 있습니다.
매개변수 데코레이터 함수는 전달 받는 인자가 총 3가지 입니다.

- target: any
- prop:string
- parameter_index: number

전달 받은 인자 중 마지막 매개변수 인덱스(parameter_index)는 클래스 생성자 또는 메서드 매개변수 내 데코레이터를 사용한 순서입니다.

```typescript
// Log 매개변수 데코레이터
function Log(t: any, p: string, i: number) {
  console.log(t.name);
  console.log(`
    매개변수 순서: ${i}, 
    멤버 이름: ${p === undefined ? "constructor" : p}
  `);
}
// Button 클래스
class Button {
  el: HTMLButtonElement;
  color: string;

  // 생성자 함수 내에 Log 데코레이터 사용
  constructor(@Log el: HTMLButtonElement, @Log color: string = "transparent") {
    this.el = el;
    this.color = color;
  }

  // 스태틱 메서드 내에 Log 데코레이터 사용
  static initialize(@Log els: NodeList, @Log color: string = "transparent") {
    return [].slice.call(els).map((el) => new Button(el, color));
  }
}

// Button.initialize() 스태틱 메서드 사용
const btns = Button.initialize(document.querySelectorAll(".button"), "#900");
```

데코레이터 실행 순서에 따른 역순

```bash
Button
매개변수 순서: 1, 멤버 이름: initialize

Button
매개변수 순서: 0, 멤버 이름: initialize

Button
매개변수 순서: 1, 멤버 이름: constructor

Button
매개변수 순서: 0, 멤버 이름: constructor
```
