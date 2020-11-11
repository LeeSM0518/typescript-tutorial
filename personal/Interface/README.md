# 인터페이스

## 첫 번째 인터페이스

프로퍼티 타입 확인

* **인터페이스 X**

  ```typescript
  function printLabel1(labelObj: { label: string}) {
      console.log(labelObj.label);
  }
  
  let myObj1 = {size: 10, label: "Size 10 Object"};
  printLabel1(myObj1);
  ```

* **인터페이스 O**

  ```typescript
  interface LabeledValue {
      label: string;
  }
  
  function printLabel2(labeledObj: LabeledValue) {
      console.log(labeledObj.label);
  }
  
  let myObj2 = {size: 10, label: "Size 10 Object"};
  printLabel2(myObj2)
  ```

  > 타입 검사는 프로퍼티들의 순서를 요구하지 않는다. 단지 인터페이스가 요구하는 프로퍼티들이 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만 확인한다.

<br>

## 선택적 프로퍼티 (Optional Properties)

인터페이스의 모든 프로퍼티가 필요한 것은 아니다. 어떤 조건에서만 존재하거나 아예 없을 수도 있다.

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```

* 선택적 프로퍼티는 선언에서 프로퍼티 이름 끝에 `?` 를 붙여 표시한다.

<br>

## 읽기 전용 프로퍼티 (Readonly properties)

객체가 처음 생성될 때만 값이 할당되고 값을 수정할 수 없다.

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; 에러
```

<br>

모든 변경 메서드가 제거된 `Array<T>` 와 동일한 `ReadonlyArray<T>` 타입을 제공한다.

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12;      // 오류
ro.push(5);      // 오류
ro.length = 100; // 오류
a = ro;          // 오류
```

> `ReadonlyArray` 를 타입 단언으로 오버라이드하는 것은 가능하다.
>
> ```typescript
> a = ro as number[];
> ```

<br>

## `readonly` vs `const`

* 변수는 `const` 를 사용
* 프로퍼티는 `readonly` 를 사용

> 프로퍼티는 객체의 일부로 이름과 값 사이의 관계. object의 특징이다.

<br>

## 초과 프로퍼티 검사 (Excess Property Checks)

* 에러 예시

  ```typescript
  interface SquareConfig {
      color?: string;
      width?: number;
  }
  
  function createSquare(config: SquareConfig): { color: string; area: number } {
      // ...
  }
  
  // color가 아닌 colour가 전달되므로 에러가 발생한다.
  let mySquare = createSquare({ colour: "red", width: 100 })
  ```

  > 객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때, 만약 객체 리터럴이 "대상 타입"이 갖고 있지 않은 프로퍼티를 갖고 있으면 에러가 발생한다.
  >
  > 이 검사를 피하는 방법은 **타입 단언을** 사용하는 것이다.

* 에러 제거

  ```typescript
  interface SquareConfig {
      color?: string;
      width?: number;
  }
  
  function createSquare(config: SquareConfig): { color: string; area: number } {
      // ...
  }
  
  // let mySquare = createSquare({ colour: "red", width: 100 });
  let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
  ```

  > 타입 단언 사용

<br>

## 함수 타입 (Function Types)

인터페이스는 프로퍼티로 객체를 기술하는 것 외에 함수 타입을 설명할 수 있다.

이는 **매개변수 목록과 반환 타입만** 작성한다.

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 매개변수의 이름이 같을 필요는 없다.
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

// 타입 추론 가능
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1; // 만약 반환 타입이 일치하지 않으면 에러 발생
}
```

<br>

## 인덱서블 타입 (Indexable Types)

`a[10]` 이나 `ageMap["daniel"]` 처럼 타입을 **인덱스로** 기술할 수 있다.

타입은 인덱싱 할때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 타입을 기술하는 *인덱스 시그니처(index signature)를* 가지고 있다.

```typescript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

> `StringArray` 인터페이스의 인덱스 서명은 `number` 로 색인화(indexed)되면 `string` 을 반환한다.

<br>

인덱스 서명을 지원하는 타입에는 두 가지가 있다: **문자열, 숫자**

두 타입의 인덱서(indexer)를 모두 지원하는 것은 가능하지만, 숫자 인덱서에서 반환된 타입은 반드시 문자열 인덱서에서 반환된 타입의 하위 타입(subtype)이어야 한다. 왜냐하면 `number` 로 인덱싱 할 때, 인덱싱하기 전에 `string` 으로 변환하기 때문이다.

```typescript
class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string;
}

// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 된다.
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;
  length: number;          // 성공, length는 숫자
  name: string;            // 오류, 'name'의 타입은 인덱서의 하위타입이 아니다.
}

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number;          // 성공, length는 숫자
  name: string;            // 성공, name은 문자열
}

interface ReadonlyStringArray {
  readonly [index: nubmer]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory";  // 오류
```

<br>

## 클래스 타입 (Class Types)

### 인터페이스 구현하기 (Implementing an interface)

클래스가 특정 계약을 충족시키도록 명시적으로 강제된다.

```typescript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(public h: number, public m: number){};
}
```

`setTime` 처럼 클래스에 구현된 메서드를 인터페이스 안에서도 기술할 수 있다.

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(public h: number, public m: number){};
}
```

<br>

### 클래스의 스태틱과 인스턴스의 차이점 (Difference between the static and instance sides of classes)

클래스는 **스태틱 타입과 인스턴스 타입입니다.** 

```typescript
interface ClockConstructor {
    new (hour: number, minute: number);
}

// 인터페이스의 생성자가 스태틱이기 때문에 에러 발생
class Clock2 implements ClockConstructor {
    constructor(h: number, m: number){}
}
```

<br>

클래스의 스태틱 부분을 직접적으로 다룰 필요 없다.

```typescript
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m:number) {}
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

또 다른 쉬운 방법은 클래스 표현을 사용하는 것이다.

```typescript
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
```

<br>

## 인터페이스 확장하기 (Extending Interface)

한 인터페이스의 멤버를 다른 인터페이스에 복사하는 것을 가능하게 해준다. 인터페이스를 재사용성 높은 컴포넌트로 쪼갤 때, 유연함을 제공한다.

```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

<br>

인터페이스는 여러 인터페이스를 확장할 수 있어, 모든 인터페이스의 조합을 만들어낼 수 있다.

```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

console.log(square);
```

<br>

## 하이브리드 타입 (Hybrid Types)

* 다양한 타입들을 기술할 수 있다. 

* 몇몇 타입의 조합으로 동작하는 객체를 작성할 수 있다.

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) {}) as Counter;
    counter.interval = 123;
    counter.reset = function() {};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

> 타입의 형태를 완전히 기술하기 위해 위와 같은 패턴을 사용해야할 수도 있다.

<br>

## 클래스를 확장한 인터페이스 (Interface Extending Classes)

인터페이스 타입이 클래스 타입을 확장하면, 클래스의 멤버는 상속받지만 구현은 상속받지 않는다. 이것은 인터페이스가 구현을 제공하지 않고, 클래스의 멤버 모두를 선언한 것과 마찬가지이다.

```typescript
class Control {
    private state: any;
}

// private state 프로퍼티를 포함하여, Control의 모든 멤버를 갖는다.
interface SelectableControl extends Control {
    select(): void;
}

// SelectableControl를 구현하는 것은 Control의 자식만 가능하므로
// Control을 상속받고 SelectableControl을 구현하는 것을 확인할 수 있다.
class Button extends Control implements SelectableControl {
    select() {}
}
```

<br>

## 엄격한 검사 (Exhaustiveness checking)

판별 유니언의 모든 변형을 커버할 수 없을 때, 컴파일러가 알려주길 원한다.

만약 `Triangle` 을 `Shape` 에 추가하면, `area` 도 업데이트를 해야한다.

```typescript
type Shape = Square | Rectangle | Circle | Triangle;

function area(s: Shape) {
    switch(s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
let test3: Triangle =  {kind: "triangle", radius: 3}

console.log(area(test3));
// "triangle"의 케이스를 처리하지 않아서 undefined가 반환된다.
```

위의 오류를 해결하기 위해 `never` 타입을 사용한다.

```typescript
type Shape = Square | Rectangle | Circle | Triangle;

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function area(s: Shape): number {
    switch(s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // 빠진 케이스가 있다면 여기서 오류 발생
    }
}
```

> default 라인에서 `Triangle` 케이스가 빠졌다는 컴파일 오류가 발생한다.

<br>

## 다형성 `this` 타입 (Polymorphic `this` types)

다형성 `this` 타입은 포함하는 클래스나 **인터페이스의 하위 타입** 을 나타낸다. **F-bounded polymorphism** 이라고 부른다.

예를 들어, 계층적으로 유연한 인터페이스를 표현하기 더 쉽게 만든다. 각 연산 후에 `this` 를 반환하는 간단한 계산기를 보자.

```typescript
class BasicCalculator {
    public constructor(protected value: number = 0) {}
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number) {
        this.value *= operand;
        return this;
    }
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```

클래스가 `this` 타입을 사용하기 때문에, 이를 `extend` 할 수 있고 새로운 클래스가 아무 변경 없이 이전 메서드를 사용할 수 있다.

```typescript
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}

let v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```

<br>

## 인덱스 타입 (Index types)

인덱스 타입을 사용하면, 동적인 프로퍼티 이름을 사용하는 코드를 컴파일러가 검사할 수 있다.

예를 들어, 객체에서 프로퍼티의 부분집합을 뽑아내는 것을 보자.

```typescript
function pluck(o, propertyNames) {
    return propertyNames.map(n => o[n]);
}
```

여기서는 **인덱스 타입 쿼리와 인덱스 접근 연산자를** 사용해서 TypeScript에서 이 함수를 어떻게 작성하고 사용하는지 살펴보자.

```typescript
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

// Manufacturer과 model은 둘 다 문자열 타입입니다.
// 그래서 둘 다 타이핑된 문자열 배열로 끌어낼 수 있습니다.
let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
console.log(makeAndModel);

// 만약 model과 year를 끌어내려고 하면,
// 유니언 타입의 배열: (string | number)[] 을 얻게 된다.
let modelYear: (string | number)[] = pluck(taxi, ['model', 'year'])
console.log(modelYear);
```

