## 속성 with 접근 제어자

접근 제어자(access modifiers)를 통해 접근 가능한 범위를 설정할 수 있고 각 속성에 데이터 타입을 지정할 수 있음.

```javascript
// 컴파일 전
class Book {

  // 제목
  // public: 클래스 외부에서 접근 가능
  public title:string;

  // 저자
  // public은 기본 값으로 생략 가능합니다.
  author:string;

  // 제조 공장
  // private: Book 클래스 내부에서만 접근 가능
  private _manufacturing_plant:string;

  // 종이 유형
  // protected: Book 클래스를 포함한 서브 클래스에서만 접근 가능
  protected paper_type:string;

  // constructor() 매개변수 앞에
  // public, private, protected를 사용하면
  // Book 클래스의 타입(type)을 별도 선언하지 않아도 됩니다.
  constructor(title:string, author:string, public pages:number) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

}

/* 인스턴스 생성 ------------------------------------------------ */

let indRevo = new Book('한 권으로 정리하는 4차 산업혁명', '최진기', 367);
console.log(indRevo); // Book {}
```

## 메서드 with 접근 제어자

```javascript
class Book {

  public    title:string;
  public    author:string;
  public    pages:number = 150;
  private   _manufacturing_plant:string = '충무로 공장';
  protected paper_type:string = '밍크지';

  constructor(title:string, author:string, pages:number) {
    this.title  = title;
    this.author = author;
    this.pages  = pages;
  }

  /* 메서드 ------------------------------------------------ */

  // public 메서드
  // 클래스 외부에서 접근 가능
  public printPages(): string {
    return `${this.pages}페이지`;
  }

  // protected 메서드
  // Book 클래스를 포함한 서브 클래스에서만 접근 가능
  protected changePaperType(type:string): void {
    this.paper_type = type;
  }

  // private 메서드
  // Book 클래스 내부에서만 접근 가능
  private setManufacturingPlant(plant:string): void {
    this._manufacturing_plant = plant;
  }


  /* 클래스 내부 메서드에서 private, protected 메서드 접근 가능 */

  public setPaperType(type:string):void {
    // protected 메서드 접근 가능
    this.changePaperType(type);
    console.log(this.paper_type);
  }

  public setPlant(plant:string):void {
    // private 메서드 접근 가능
    this.setManufacturingPlant(plant);
    console.log(this._manufacturing_plant);
  }

}


/* 인스턴스 생성 ------------------------------------------------ */

let indRevo = new Book('한 권으로 정리하는 4차 산업혁명', '최진기', 367);

console.log(indRevo.printPages()); // '367페이지'

// [오류]
// [ts] 'changePaperType' 속성은 보호된 속성이며
// 'Book' 클래스 및 해당 하위 클래스 내에서만 액세스할 수 있습니다.
// (method) Book.changePaperType(type: string): void
console.log(indRevo.changePaperType('인디언지'));

// [오류]
// [ts] 'setManufacturingPlant' 속성은 private이며
// 'Book' 클래스 내에서만 액세스할 수 있습니다.
// (method) Book.setManufacturingPlant(plant: string): void
console.log(indRevo.setManufacturingPlant('파주 공장'));


// 컴파일 후
var Book = /** @class */ (function () {

  function Book(title, author, pages) {
    this.pages = 150;
    this._manufacturing_plant = '충무로 공장';
    this.paper_type = '밍크지';
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  /* 메서드 ------------------------------------------------ */

  Book.prototype.printPages = function () {
    return this.pages + "\uD398\uC774\uC9C0";
  };

  Book.prototype.changePaperType = function (type) {
    this.paper_type = type;
  };

  Book.prototype.setManufacturingPlant = function (plant) {
    this._manufacturing_plant = plant;
  };

  Book.prototype.setPaperType = function (type) {
    this.changePaperType(type);
    console.log(this.paper_type);
  };
  Book.prototype.setPlant = function (plant) {
    this.setManufacturingPlant(plant);
    console.log(this._manufacturing_plant);
  };

  return Book;

}());

/* 인스턴스 생성 ------------------------------------------------ */

var indRevo = new Book('한 권으로 정리하는 4차 산업혁명', '최진기', 367);
console.log(indRevo.printPages()); // '367페이지'
console.log(indRevo.changePaperType('인디언지'));
console.log(indRevo.setManufacturingPlant('파주 공장'));
```

TypeScript 상에서 접근 제어자를 통한 접근 차단을 할 수 있지만,
컴파일된 Javascript 코드에서는 접근이 가능하다.
즉, 명시적인 용도로 사용한다.

## 싱글톤

constructor() 앞에 private을 붙임으로써 인스턴스를 생성하지 못하도록 제한할 수 있다.

```javascript
//컴파일 전
class OnlyOne {

  private static instance: OnlyOne;

  public name:string;

  // new 클래스 구문 사용 제한을 목적으로
  // constructor() 함수 앞에 private 접근 제어자 추가
  private constructor(name:string) {
    this.name = name;
  }

  // 오직 getInstance() 스태틱 메서드를 통해서만
  // 단 하나의 객체를 생성할 수 있습니다.
  public static getInstance() {
    if (!OnlyOne.instance) {
      OnlyOne.instance = new OnlyOne('싱글턴 객체');
    }
    return OnlyOne.instance;
  }

}


/* 인스턴스 생성 ------------------------------------------------ */

// [오류]
// [ts] 'OnlyOne' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.
// constructor OnlyOne(name: string): OnlyOne
let bad_case = new OnlyOne('오류 발생');

let good_case = OnlyOne.getInstance();
// 컴파일 후
var OnlyOne = /** @class */ (function () {
  function OnlyOne(name) {
    this.name = name;
  }
  OnlyOne.getInstance = function () {
    if (!OnlyOne.instance) {
      OnlyOne.instance = new OnlyOne('싱글턴 객체');
    }
    return OnlyOne.instance;
  };
  return OnlyOne;
}());


let only_one    = new OnlyOne('오류 발생'); // 정상 작동
let special_one = new OnlyOne('스페셜 원'); // 새로운 인스턴스 생성!
let normal_one  = new OnlyOne('노멀 원');  // 새로운 인스턴스 생성!!
```

## readonly

자바의 final 개념
클래스 속성 이름 앞에 추가하면 읽기 전용 속성으로 다른 값을 쓸 수 없다.

```javascript
//컴파일 전
class OnlyOne {

  private static instance:OnlyOne;

  // 읽기 전용 속성 설정
  public readonly name:string;

  private constructor(name:string) {
    this.name = name;
  }

  public static getInstance(name:string):OnlyOne {
    if (!OnlyOne.instance) {
      OnlyOne.instance = new OnlyOne(name);
    }
    return OnlyOne.instance;
  }

}


/* 인스턴스 생성 ------------------------------------------------ */

let special_one = OnlyOne.getInstance('스페셜 원');

console.log(special_one.name);

// [오류]
// [ts] 상수 또는 읽기 전용 속성이므로 'name'에 할당할 수 없습니다.
// (property) OnlyOne.name: string
special_one.name = '노멀 원';

// 컴파일 후
var OnlyOne = /** @class */ (function () {
  function OnlyOne(name) {
    this.name = name;
  }
  OnlyOne.getInstance = function (name) {
    if (!OnlyOne.instance) {
      OnlyOne.instance = new OnlyOne(name);
    }
    return OnlyOne.instance;
  };
  return OnlyOne;
}());


/* 인스턴스 생성 ------------------------------------------------ */

var special_one = OnlyOne.getInstance('스페셜 원');

console.log(special_one.name); // '스페셜 원'

special_one.name = '노멀 원';

console.log(special_one.name); // '노멀 원'
```
