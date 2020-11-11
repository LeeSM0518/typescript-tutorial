# 제네릭 (Generics)

제네릭(Generic)은 **재사용 가능한 컴포넌트를 생성하는 도구상자의 주요 도구 중 하나이다.**

<br>

## 제네릭의 Hello Wolrd (Hello World of Generics)

제네릭이 없다면 함수에 특정 타입을 주어야 한다.

```typescript
function identity(arg: number): number {
  return arg;
}
```

또는 `any` 타입을 사용하여 함수를 기술할 수 있다.

```typescript
function identity(arg: any): any {
  return arg;
}
```

제네릭을 사용하게 된다면 무엇이 반환되는지 표시하고 인수의 타입을 캡처할 수 있다. 제네릭에서는 **타입 변수를** 사용한다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

`T` 는 유저가 준 인수의 타입을 캡처하고, 이 정보를 나중에 사용할 수 있게 한다.

<br>

제네릭 함수를 작성하고 나면, 두 가지 방법 중 하나로 호출할 수 있다.

1. 함수에 타입 인수를 포함한 모든 인수를 전달하는 방법

   ```typescript
   let output = identity<string>("myString"); // 출력 타입은 "string" 이다.
   ```

2. 타입 인수 추론 방법

   ```typescript
   let output = identity("myString");  // 출력 타입은 'string' 이다.
   ```

<br>

## 제네릭 타입 변수 작업 (Working with Generic Type Variables)

함수 호출 시마다 인수 `arg` 의 길이를 로그에 찍고 싶으면?

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);  // 오류: T에는 .length 가 없습니다.
  return arg;
}
```

> `T` 타입은 아직 모르는 타입이기 때문에 `length` 를 사용할 수 없다.

오류를 막기 위해 배열을 사용해보자.

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // 배열은 .length를 가지고 있다. 따라서 오류는 없다.
  return arg;
}
```

이제 오류는 안나지만 아래와 같이 대처할 수도 있다.

```typescript
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // 배열은 .length를 가지고 있습니다. 따라서 오류는 없다.
  return arg;
}
```

<br>

## 제네릭 타입 (Generic Types)

함수 자체의 타입과 제네릭 인터페이스를 만드는 방법을 살펴보자.

제네릭 함수의 타입은 함수 선언과 유사하게 타입 매개변수가 먼저 나열되는, 비-제네릭 함수의 타입과 비슷하다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

// 제네릭 타입 매개변수에 다른 이름을 사용할 수도 있다.
let myIdentity2: <U>(arg: U) => U = identity;

// 제네릭 타입을 객체 리터럴 타입의 함수 호출 시그니처로 작성할 수도 있다.
let myIdentity3: { <T>(arg: T): T } = identity;
```

<br>

위의 것들로 첫 번째 제네릭 인터페이스를 작성할 수 있다. 객체 리터럴을 인터페이스로 가져와보자.

```typescript
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

<br>

인터페이스의 다른 모든 멤버가 타입 매개변수를 볼 수 있도록 할 수 있다.

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

> 제네릭 열거형과 네임스페이스는 만들 수 없다.

<br>

## 제네릭 클래스 (Generic Classes)

제네릭 클래스는 클래스 이름 뒤에 꺽쇠괄호( `<>` ) 안쪽에 제네릭 타입 매개변수 목록을 가진다.

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// number 타입만 쓰도록 제한하지 않고 string 이나 더 복잡한 객체도 사용할 수 있다.
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

> 클래스는 두 가지 타입을 가진다: **정적 측면과 인스턴스 측면**
>
> 제네릭 클래스는 정적 측면이 아닌 **인스턴스 측면에서만 제네릭이므로 정적 멤버는 클래스의 타입 매개변수를 쓸 수 없다.** 

<br>

## 제네릭 제약조건 (Generic Constraints)

제약사항을 `extends` 키워드로 표현한다.

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // .length 프로퍼티가 있는 것을 알기 때문에 오류가 발생하지 않는다.
    return arg;    
}
```

제네릭 함수는 이제 제한되어 있기 때문에 모든 타입에 대해서는 동작하지 않는다.

```typescript
loggingIdentity(3); // 오류, number는 .length 프로퍼티가 없다.
// 즉, 필요한 프로퍼티들이 있는 타입의 값을 전달해야 한다.
loggingIdentity({ length: 10, value: 3 });
```

<br>

## 제네릭 제약조건에서 타입 매개변수 사용 (Using Type Parameters in Generic Constraints)

다른 타입 매개변수로 제한된 타입 매개변수를 선언할 수 있다.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");     // 성공
getProperty(x, "m");     // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd' 에 해당되지 않음.
```

<br>

## 제네릭에서 클래스 타입 사용 (Using Class Types in Generics)

제네릭을 사용하는 TypeScript에서 팩토리를 생성할 때 생성자 함수로 클래스 타입을 참조해야 한다.

```typescript
function create<T>(c: { new(): T; }): T {
    return new c();
}
```

고급 예제에서는 prototype 프로퍼티를 사용하여 생성자 함수와 클래스 타입의 인스턴스 사이의 관계를 유추하고 제한한다.

```typescript
class Beekeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new() => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // 타입검사!
createInstance(Bee).keeper.hasMask;   // 타입검사!
```

