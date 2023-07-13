# 제네릭

클래스 또는 함수에서 사용할 타입을, 클래스나 함수를 사용할 때 결정하는 프로그래밍 기법

제네릭이 왜 필요한가.
TypeScript로 구현한 Model 클래스는 일반적으로 특정 데이터 타입을 규정하지 않고, 어떤 타입이든 아이템으로 추가하거나, 추출할 수 있다.

```typescript
class Model {
  private _data: any[] = [];

  constructor(data: any[]) {
    this._data = data;
  }

  get data(): any {
    return this._data;
  }

  add(item: any): void {
    this._data.push(item);
  }

  remove(index: number): void {
    this._data.splice(index, 1);
  }

  item(index: number): any {
    return this._data[index];
  }

  clear(): void {
    this._data = [];
  }
}
```

하지만 특정 데이터 타입을 규정한 Model 클래스를 사용하고자 할 수도 있다.
이 경우 클래스 상속을 이용한 새로운 클래스를 생성하여 해결할 수 있다.

```typescript
class ObjectModel extends Model {
  constructor(data: object[] = []) {
    super(data);
  }

  add(item: object): void {
    super.add(item);
  }
}
```

하지만 클래스 상속을 사용하면 별도의 자료 타입을 받고자 하는 클래스를 추가해야 하고 중복되는 코드를 양산하기에 불편하다. (생산성)

# 클래스 x 제네릭

클래스 정의 시, 제네릭을 사용하면 클래스를 사용해 객체를 생성할 때 사용자가 타입을 지정해 사용할 수 있습니다. 사용 방법은 클래스 이름 뒤에 <T>를 붙입니다. T는 "관용적인 식별자"로 다른 이니셜을 사용해도 무방합니다.

```typescript
class Model<T> {
  private _data: T[] = [];

  constructor(data: T[] = []) {
    this._data = data;
  }

  get data(): T[] {
    return this._data;
  }

  add(item: T): void {
    this._data.push(item);
  }

  remove(index: number): void {
    this._data.splice(index, 1);
  }

  item(index: number): T {
    return this._data[index];
  }

  clear(): void {
    this._data = [];
  }
}
```

문자 데이터만 허용하는 Model 객체 인스턴스를 사용하고자 한다면, 클래스를 통해 객체를 생성하는 코드에 제네릭 타입 변수 값을 "<string>" 으로 설정해 사용합니다.(타입 제한)

```typescript
const stringModel = new Model<string>();

stringModel.add("흔들의자");

// [오류]
// '2018' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
stringModel.add(2018);
```

하지만 TypeScript 프로그래밍 과정에서 부득이하게 정해진 타입이 아닌, 경우를 사용해야 하는 경우 타입 어설션 문법을 사용해 컴파일 과정의 타입 검사를 우회할 수 있다. (꼭 필요한 경우만 사용)

```typescript
stringModel.add(2018 as any);

// 또는

stringModel.add(<any>2018);
```

## 제네릭과 함수

함수 x 제네릭

JavaScript 함수는 배열의 아이템을 특정 타입으로 한정할 수 없습니다.

```javascript
// javascript
function getItemArray(arr, index) {
  return arr[index];
}

function pushItemArray(arr, item) {
  arr.push(item);
}
```

TypeScript에선 다음과 같이 구현할 수 있다.

```typescript
function getItemArray(arr: any[], index: number): any {
  return arr[index];
}

function pushItemArray(arr: any[], item: any): void {
  arr.push(item);
}
```

제네릭을 사용하여 외부에서 특정 타입을 지정할 수도 있도록 구현하면 사용자가 함수 호출 시 지정한 타입으로 한정할 수 있어 보다 사용하기 좋아진다.

```typescript
function getItemArray<T>(arr: T[], index: number): T {
  return arr[index];
}

function pushItemArray<T>(arr: T[], item: T): void {
  arr.push(item);
}

const potatoChip_materials = ["어니언"];

getItemArray(potatoChip_materials, 0); // '어니언'
pushItemArray<string>(potatoChip_materials, "사워크림"); // ['어니언', '사워크림']
```

하지만 TypeScript 프로그래밍 과정에서 부득이하게 정해진 타입이 아닌, 경우를 사용해야 하는 경우 타입 어설션 문법을 사용해 컴파일 과정의 타입 검사를 우회할 수 있다. (꼭 필요한 경우만 사용)

```typescript
// pushItemArray()에 사용자가 타입을 지정한 경우
pushItemArray<number>(potatoChip_materials as any, 61);

// pushItemArray()에 사용자가 타입을 지정하지 않은 경우
pushItemArray(potatoChip_materials, <any>999);
```

## 멀티 타입 설정

함수 또는 클래스에서 멀티 타입 변수를 활용할 수 있다.
배열 내부에 사용자가 지정한 멀티 타입을 포함하는 배열을 추가하는 함수를 만든다면 TypeScript 멀티 타입 변수를 사용하여 다음과 같이 작성할 수 있다.

```typescript
// pairArray 사용자 정의 타입(Type Alias) 정의
type pairArray = [any, any][];

// 멀티 타입 T, M 설정된 함수 pushPairItem 정의
function pushPairItem<T, M>(arr: pairArray, item: [T, M]): pairArray {
  arr.push(item);
  return arr;
}

// piarArray 타입으로 설정된 data 배열 선언
const data: pairArray = [];

// 멀티 타입을 지정한 후, 적절한 타입을 포함하는 데이터 추가
pushPairItem<boolean, string>(data, [false, "false"]);
pushPairItem<number, string>(data, [2019, "이천십구년"]);
```

팩토리 함수로 처리할 경우

```typescript
// 클래스 Model
class Model {
  constructor(public options: any) {}
}

// 팩토리 함수
// C: {new (U): T} 표현에서 new ()는 외부에서 전달된 생성자 함수 또는 클래스를 나타냅니다.
// C: new (U) => T로도 표현할 수 읐다.
function create<T, U>(C: { new (U): T }, options: U): T {
  return new C(options);
}
// create() 팩토리 함수에 Model, string[] 멀티 타입 설정
create<Model, string[]>(Model, ["class type"]);
```

## 타입 변수 상속

제네릭 타입 변수는 기존의 타입 변수를 상속할 수도 있습니다.

```typescript
// Model 클래스
class Model<T> {
  constructor(private _data: T[] = []) {}

  add(item: T): void {
    this._data.push(item);
  }
}

// Model 초기화 팩토리 함수
function initializeModel<T extends Model<U>, U>(C: new () => T, items: U[]): T {
  const c = new C();
  items.forEach((item) => c.add(item));
  return c;
}

// 사용 예시
initializeModel<Model<string>, string>(Model, ["타입", "변수", "상속"]);
```
