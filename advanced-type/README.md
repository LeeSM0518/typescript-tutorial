# 고급 타입 (Advanced Types)

## 교차 타입 (Intersection Types)

교차 타입은 **여러 타입을 하나로 결합한다.** 기존 타입을 합쳐 필요한 모든 기능을 가진 하나의 타입을 얻을 수 있다.

ex) `Person & Serializable & Loggable` 은 `Person` 과 `Serializable` 그리고 `Loggable` 입니다. 즉 이 타입의 객체는 **세 가지 타입의 모든 멤버를 갖게 된다.**

<br>

### 믹스인 (Mixins)

믹스인 만드는 방법을 예제를 통해 살펴보자.

```typescript
function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

class Person_ {
    constructor(public name: string) {}
}

interface Loggable {
    log(name: string): void;
}

class ConsoleLogger implements Loggable {
    log(name) {
        console.log(`Hello, I'm ${name}.`);       
    }
}

const jim = extend(new Person_('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);
```

<br>

## 유니언 타입 (Union Types)

```typescript
// 문자열을 받고 왼쪽에 "padding"을 추가한다.
//  만약 'padding'이 문자열이라면, 'padding'은 왼쪽에 더해질 것이다.
//  만약 'padding'이 숫자라면, 그 숫자만큼의 공백이 왼쪽에 더해질 것이다.
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }

    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 4));
```

* 위의 코드의 문제는 `padding` 이 `any` 타입으로 되어있다는 것이다.

  * 즉, `숫자` 나 `문자열` 둘 다 아닌 인수로 호출할 수 있다는 것이기 때문!

    ```typescript
    // 컴파일 타임에 통과되고, 런타임에 오류.
    let indentedString = padLeft("Hello world", true);
    ```

<br>

`any` 대신에, **유니언 타입을** 매개변수 `padding` 에 적용해보자.

```typescript
function padLeft(value: string, padding: string | number) {
    // ...
}

// 컴파일 중에 오류
let indentedString = padLeft("Hello world", true);
```

> 유니언 타입은 값이 여러 타입 중 하나임을 설명한다.

<br>

유니언 타입을 값으로 가지고 있으면, 유니언에 있는 모든 타입에 공통인 멤버에만 접근할 수 있다.

```typescript
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
    let x: Fish;
    return x;
}

let pet = getSmallPet();
pet.layEggs(); // Fish, Bird 둘다 갖고 있는 함수이므로 호출 가능
pet.swim();    // Fish 에만 있는 함수이므로 오류!!
```

<br>

## 타입 가드와 차별 타입 (Type Guards and Differentiating Types)

유니언 타입은 값의 타입이 겹쳐질 수 있는 상황을 모델링하는데 유용하다.

```typescript
let pet = getSmallPet();

// 이렇게 각 프로퍼티들에 접근하는 것은 오류를 발생시킵니다.
if (pet.swim) {
  pet.swim();
}
else if (pet.fly) {
  pet.fly();
}
```

<br>

같은 코드를 동작하게 하려면, 타입 단언을 사용해야 한다.

```typescript
let pet = getSmallPet();
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else if ((pet as Bird).fly) {
  (pet as Bird).fly();
}
```

<br>

## 사용자-정의 타입 가드 (User-Defined Type Guards)

타입 가드는 **스코프 안에서의 타입을 보장하는 런타임 검사를** 수행한다는 표현식이다.

<br>

### 타입 서술어 사용하기 (Using type predicates)

타입 가드를 정의하기 위해, 반환 타입이 **타입 서술어인** 함수를 정의만 하면 된다.

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
```

* `pet is Fish` 는 타입 서술어이다.
* 서술어는 `parameterName is Type` 형태이고, `parameterName` 는 반드시 현재 함수 시그니처의 매개변수 이름이어야 한다.

<br>

```typescript
// 이제 'swim'과 'fly'에 대한 모든 호출은 허용된다.
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

<br>

## `in` 연산자 사용하기 (Using the `in` operator)

`in` 연산자는 타입을 좁히는 표현으로 작용한다.

`n in x` 표현에서, `n` 은 **문자열 리터럴** 혹은 문자열 리터럴 타입이고 `x` 는 **유니언 타입** 이다.

```typescript
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

<br>

## `typeof` 타입 가드 ( `typeof` type guards )

* typeof 쓰기 전 예시

  ```typescript
  function isNumber(x: any): x is number {
    return typeof x === "number";
  }
  
  function isString(x: any): x is string {
    return typeof x === "string";
  }
  
  function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}.'`)
  }
  ```

  > 타입이 원시 값인지 확인하는 함수를 정의하는 것은 너무나 귀찮다.

* typeof 를 쓴 예시

  ```typescript
  function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'`);
  }
  ```

  > `typeof` 를 타입 가드로 인식하기 때문에 `typeof x === "number"` 를 함수로 추상할 필요가 없다.

<br>

## `instanceof` 타입 가드 ( `instanceof` type guards )

`instanceof` 타입 가드는 생성자 함수를 사용하여 타입을 좁히는 방법이다.

```typescript
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpace: number) {}
    getPaddingString() {
        return Array(this.numSpace + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string){}
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder(" ");
}

// 타입은 'SpaceRepeatingPadder | StringPadder' 이다.
let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
    padder; // 타입은 'SpaceRepeatingPadder' 으로 좁혀진다.
}
if (padder instanceof StringPadder) {
    padder; // 타입은 'StringPadder' 으로 좁힌다.
}
```

`instanceof` 의 오른쪽은 생성자 함수여야 하며, TypeScript는 다음과 같이 좁힌다.

1. 함수의 `prototype` 프로퍼티 타입 `any` 가 아닌 경우
2. 타입의 생성자 시그니처에서 반환된 유니언 타입일 경우

<br>

## 널러블 타입 (Nullable types)

TypeScript는 JavaScript와 맞추기 위해 `null` 과 `undefined` 를 다르게 처리한다.

```typescript
let s = "foo";
s = null;       // 오류, 'null'은 'string'에 할당할 수 없다.
let sn: string | null = "bar";
sn = null;      // 성공

sn = undefined; // 오류, 'undefined'는 'string | null'에 할당할 수 없다.
```

* `null` 과 `undefined` 를 다르게 처리한다.
* `string | null` 은 `string | undefined` 와 `string | undefined | null` 과는 다른 타입이다.

<br>

## 선택적 매개변수와 프로퍼티 (Optional parameters and properties)

```typescript
function f(x: number, y?: number) {
  return x + (y || 0);
}

console.log(f(1, 2));
console.log(f(1));
console.log(f(1, undefined));
console.log(f(1, null));

class C {
    a: number;
    b?: number;
}

let d = new C();
console.log(d.a = 12);
console.log(d.a = undefined);
console.log(d.b = 13);
console.log(d.b = undefined);
console.log(d.b = null);
```

실행 결과

```
3
1
1
1
12
undefined
13
undefined
null
```

<br>

## 타입 가드와 타입 단언 (Type guards and type assertions)

널러블 타입이 유니언으로 구현되기 때문에, `null` 을 제거하기 위해 타입 가드를 사용할 필요가 있따.

```typescript
function f(sn: string | null): string {
  if (sn == null) {
    return "default";
  } else {
    return sn;
  }
}
```

> `null` 은 확실하게 제거되어 보이지만, 간단한 연산자를 사용할 수도 있다.

```typescript
function f(sn: string | null): string {
  return sn || "default";
}
```

* 컴파일러가 `null` 이나 `undefined` 를 제거할 수 없는 경우, 타입 단언 연산자를 사용하여 수동으로 제거할 수 있다.
* 구문은 `!` 를 후위 표기하는 방법이다: `identifier!` 는 `null` 과 `undefined` 를 `identifier` 의 타입에서 제거한다.

<br>

```typescript
function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + ". the " + epithet;
  }
  name = name || "Bob";
  return postfix("great");
}

console.log(fixed(null));
```

* 중첩 함수를 사용하지 않으면 함수가 어디에서 호출되었는지 알 수 없기 때문에, `name` 타입을 알 수 없다.

<br>

## 타입 별칭 (Type Aliases)

* 타입 별칭은 타입의 새로운 이름을 만든다.
* 타입 별칭은 때때로 인터페이스와 유사하다.

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    } else {
        return n();
    }
}
```

<br>

인터페이스처럼, 타입 별칭은 제네릭이 될 수 있다.

```typescript
type Container<T> = { value: T };
```

<br>

프로퍼티 안에서 자기 자신을 참조하는 타입 별칭을 가질 수 있다.

```typescript
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

<br>

교차 타입과 같이 사용할 수도 있다.

```typescript
var people: LinkedList<Person>;
var q = people.name;
var q = people.next.name;
var q = people.next.next.name;
var q = people.next.next.next.name;
```

하지만, 타입 별칭을 선언의 오른쪽 이외에 사용하는 것은 불가능하다.

```typescript
type Yikes = Array<Yikes>; // 오류
```

<br>

## 인터페이스 vs. 타입 별칭 (Interfaces vs Type Aliases)

인터페이스와 타입 별칭의 차이점은 **인터페이스는 어디에서나 사용할 수 있는 새로운 이름을 만들 수 있다** 는 것이다. 타입 별칭은 새로운 이름을 만들지 못 한다.

```typescript
type Alias = { num: number }
interface Interface {
    num: number;
}

declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

> 에디터에서 `interfaced` 에 마우스를 올리면 `Interface` 를 반환한도고 보여주지만 `aliased` 는 객체 리터럴 타입을 반환한다고 보여준다.

타입 별칭은 교차 타입을 생성함으로써 extend 할 수 있다. 예를 들어, `type Cat = Animal & { purrs: true }` 

가능하면 항상 **타입 별칭보다 인터페이스를 사용해야 한다.**

반면에, 만약 인터페이스로 어떤 형태를 표현할 수 없고 **유니언이나 튜플 타입을 사용해야 한다면, 일반적으로 타입 별칭을 사용한다.**

<br>

## 문자열 리터럴 타입 (String Literal Types)

문자열 리터럴 타입은 문자열에 값을 정확하게 지정할 수 있게 해준다.

문자열 리터럴 타입은 유니언 타입, 타입 가드, 타입 별칭과 잘 결합된다.

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        } else if (easing === "ease-out") {
        } else if (easing === "ease-in-out") {
        } else {
            // 오류: null 이나 undefined를 전달하면 안된다.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in")
button.animate(0, 0, "uneasy"); // 오류: "uneasy"는 허용되지 않는다.
```

문자열 리터럴 타입은 오버로드를 구별하기 위해 같은 방법으로 사용할 수 있다.

```typescript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
function createElement(tagName: string): Element {
  // ...
}
```

<br>

## 숫자 리터럴 타입 (Numeric Literal Types)

```typescript
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return 1;
}
```

<br>

## 열거형 멤버 타입 (Enum Member Types)

열거형 멤버는 모든 멤버가 리터럴로 초기화될 때 타입을 가진다.

**싱글톤 타입** 과 **리터럴 타입** 을 상호 교환적으로 사용한다.

<br>

## 판별 유니언 (Discriminated Unions)

**태그 된 유니언** 또는 **대수적 데이터 타입** 이라고도 하는 **판별 유니언** 고급 패턴을 만들기 위해서 **싱글톤 타입, 유니언 타입, 타입 가드, 타입 별칭을** 합칠 수 있다. 판별 유니언은 **함수형 프로그래밍에서 유용하다.** 

이것에는 세 가지 요소가 있다.

1. 공통 싱글톤 타입 프로퍼티를 갖는 타입 - **판별식**
2. 해당 타입들의 유니언을 갖는 타입 별칭 - **유니언**
3. 공통 프로퍼티의 타입 가드

<br>

먼저 통합할 인터페이스를 선언한다. 각 인터페이스는 다른 문자열 리터럴 타입의 `kind` 프로퍼티를 가진다. `kind` 프로퍼티는 **판별식** 혹은 **태그** 라고 부른다.

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}
```

이제 유니언을 넣어보자.

```typescript
type Shape = Square | Rectangle | Circle;
```

이제 판별 유니언을 사용해보자.

```typescript
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

<br>

## 엄격한 검사 (Exhaustiveness checking)

판별 유니언의 모든 변형을 커버할 수 없을 때, 컴파일러가 알려주길 원합니다. 예를 들어, 만약 `Triangle`을 `Shape`에 추가하면, `area`도 업데이트해야 합니다.

```ts
type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // 여기서 오류 발생 - "triangle"의 케이스를 처리하지 않음
}
```

컴파일러가 완전함을 검사하기 위해 사용하는 `never` 타입을 사용하는 것입니다.

```ts
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // 빠진 케이스가 있다면 여기서 오류 발생
    }
}
```

여기서, `assertNever`는 `s`가 `never` 타입인지 검사합니다 — 모든 다른 케이스들이 제거된 후 남은 타입. 만약 케이스를 잊었다면, `s`는 실제 타입을 가질 것이고 타입 오류가 발생합니다. 이 방법은 추가 함수를 정의해야 합니다만 잊어버렸을 때, 훨씬 더 명백해집니다.

<br>

## 다형성 `this` 타입 (Polymorphic `this` types)

다형성 `this` 타입은 포함하는 클래스나 인터페이스의 *하위 타입*을 나타냅니다. *F*-bounded polymorphism이라고 부릅니다. 예를 들어, 계층적으로 유연한 인터페이스를 표현하기 더 쉽게 만듭니다. 각 연산 후에 `this`를 반환하는 간단한 계산기를 보겠습니다:

```ts
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... 다른 연산들은 여기에 작성 ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```

클래스가 `this` 타입을 사용하기 때문에, 이를 extend 할 수 있고 새로운 클래스가 아무 변경 없이 이전 메서드를 사용할 수 있습니다.

```ts
class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... 다른 연산들은 여기에 작성 ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```

`this` 타입 없이, `ScientificCalculator`는 `BasicCalculator`를 extend 할 수 없을 것이고 유연한 인터페이스를 유지하지 못할 것입니다. `multiply`는 `sin` 메서드를 가지지 않는 `BasicCalculator`를 반환합니다. 하지만, `this` 타입으로, `multiply`는 `this`를 반환하고, 여기서는 `ScientificCalculator`을 말합니다.

<br>

## 인덱스 타입 (Index types)

인덱스 타입을 사용하면, 동적인 프로퍼티 이름을 사용하는 코드를 컴파일러가 검사할 수 있습니다. 예를 들어, 일반적인 JavaScript 패턴은 객체에서 프로퍼티의 부분집합을 뽑아내는 것입니다:

```js
function pluck(o, propertyNames) {
    return propertyNames.map(n => o[n]);
}
```

여기서는 **인덱스 타입 쿼리**와 **인덱스 접근** 연산자를 사용해서 TypeScript에서 이 함수를 어떻게 작성하고 사용하는지 보여줍니다:

```ts
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

// Manufacturer과 model은 둘 다 문자열 타입입니다,
// 그래서 둘 다 타이핑된 문자열 배열로 끌어낼 수 있습니다.
let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);

// 만약 model과 year를 끌어내려고 하면,
// 유니언 타입의 배열: (string | number)[] 을 얻게됩니다.
let modelYear = pluck(taxi, ['model', 'year'])
```

