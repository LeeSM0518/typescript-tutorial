# 기본 타입

## Boolean

```js
let isDone: boolean = false;
```

<br>

## Number

TypeScript의 모든 숫자는 부동 소수 값 이다.

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

<br>

## String

```typescript
let color: string = "blue";
color = 'red';
```

<br>

템플릿 문자열을 사용하면 여러 줄에 걸쳐 문자열을 작성할 수 있으며, 표현식을 포함시킬 수도 있다.

```typescript
let fullNmae: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month.`;
// 위의 코드와 아래 코드가 동일하다.
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
```

<br>

## Array

* **[ ] 방법**

  ```typescript
  let list: number[] = [1, 2, 3];
  ```

* **Array\<elemType> 방법**

  ```typescript
  let list: Array<number> = [1, 2, 3];
  ```

<br>

## Tuple

튜플 타입을 사용하면, 요소의 타입과 개수가 고정된 배열을 표현할 수 있다.

```typescript
let x: [string, number]; // 튜플 선언
x = ["hello", 10]        // 성공
x = [10, "hello"]        // 오류
```

<br>

정해진 인덱스에 위치한 요소에 접근하면 해당 타입이 나타난다.

```typescript
console.log(x[0].substring(1));  // 성공
console.log(x[1].substring(1));  // 오류, 'number'에는 'substring'이 없다.
```

<br>

정해진 인덱스 외에 다른 인덱스에 있는 요소에 접근하면, 오류가 발생하며 실패한다.

```javascript
x[3] = "world";  // 오류, '[string, number]' 타입에는 인덱스3 이 없습니다.
```

<br>

## Enum

```typescript
enum Color {Red, Green Blue}
let c: Color = Color.Green;
```

<br>

기본적으로 `enum` 은 `0` 부터 시작하는데 멤버의 값을 수동으로 설정할 수 있다.

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

<br>

매겨진 값을 사용해 `enum` 멤버의 이름을 알아낼 수 있다.

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // 값이 2인 'Green'이 출력된다.
```

<br>

## Any

알지 못하는 타입을 표현

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;	// 가능

let notSure: any = 4;
notSure.ifItExists(); // 성공
notSure.toFixed();    // 성공

let prettySure: Object = 4;
prettySure.toFixed();  // 오류
```

<br>

또한, any 타입은 여러 다른 타입이 섞인 배열을 다룰 수 있다.

```typescript
let list: any[] = [1, true, "free"];

list[1] = 100;
```

<br>

## Void

어떤 타입도 존재할 수 없음을 나타낸다. `void` 는 보통 함수에서 반환 값이 없을 때 사용

```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

<br>

`void` 가 타입 션수로 선언될 때는 `null` 또는 `undefined` 만 할당될 수 있다.

```typescript
let unusable: void = undefined;
unusable = null;  // 성공
```

<br>

## Null and Undefined

`null` 과 `undefined` 는 오직 `any` 와 각자 자신들 타입에만 할당 가능하다.

`string` 또는 `null` 또는 `undefined` 를 허용하고 싶은 경우 유니언 타입인 `string | null | undefined` 를 사용할 수 있다.

```typescript
let u: undefined = undefined;
let n: null = null;
```

<br>

## Never

`never` 타입은 절대 발생할 수 없는 타입이다.

```typescript
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
  throw new Error(message);
}

// 반환 타입이 never로 추론된다.
function fail() {
  return error("Something failed");
}

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
  while (true) {
  }
}
```

<br>

## Object

원시 타입이 아닌 타입을 나타낸다. 예를 들어, `number` , `string` , `boolean` , `bigint` , `symbol` , `null` , `undefined` 가 아닌 나머지를 의미한다.

```typescript
declare function create(o: object | null): void;

create({ prop: 0}); // 성공
create(null);       // 성공

create(42);         // 오류
create("string");   // 오류
create(false);      // 오류
create(undefined);  // 오류
```

<br>

## Type assertions

엔티티의 실제 타입이 현재 타입보다 더 구체적인 때 사용한다.

* 타입 단언은 두 가지 형태가 있다.

  * **angle-bracket**

    ```typescript
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    ```

  * **as**

    ```typescript
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    ```

<br>

## let

`var` 는 변수를 재선언해도 문제가 없지만 `let` 은 변수 재선언이 불가능하고 `let` 과 `const` 의 차이는 `let` 은 변수 재할당이 가능하지만, `const` 는 변수 재선언, 재할당 모두 불가능하다.

그러므로 `var` 말고 `let` , `const` 를 사용해야 한다.