# 열거형 (Enums)

열거형으로 이름이 있는 상수들의 집합을 정의할 수 있다. 열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들 수 있다.

<br>

## 숫자 열거형 (Numeric enums)

열거형은 `enum` 키워드를 사용해 정의할 수 있다.

```typescript
enum Direction {
    Up = 1,
    Down,  // 2
    Left,  // 3
    Right // 4
}

enum Direction2 {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right,  // 3
}
```

<br>

열거형을 사용하는 것은 간단하다. 열거형 자체에서 프로퍼티로 모든 멤버에 접근하며, 열거형의 이름을 사용해 타입을 선언한다.

```typescript
enum Response2 {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response2): void {
    // ...
}

respond("Princess Caroline", Response2.Yes);
```

<br>

숫자 열거형은 **계산된 멤버와 상수 멤버를** 섞어서 사용할 수 있다.

```typescript
enum E {
    A = function(){ return 1+1}(),
    B = 1 // 초기화가 되어있지만, 안되어있는 경우에는 에러 발생!!
}
```

<br>

## 문자열 열거형 (String enums)

문자열 열거형은 **런타임에서 열거형의** 동작이 약간 다르다. 문자열 열거형에서 각 멤버들은 문자열 리터럴 또는 다른 문자열 열거형의 멤버로 상수 초기화 해야 한다.

```typescript
enum Direction3 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT", // 초기화가 되어있지 않으면 에러 발생!!
}
```

<br>

## 이종 열거형 (Heterogeneous enums)

```typescript
enum BooleanLikeEnum {
    No = 0,
    Yes = "YES"
}
```

<br>

## 유니언 열거형과 열거형 멤버 타입 (Union enums and enum member types)

특정 멤버가 오직 열거형 멤버의 값만 가지게 할 수 있다.

```typescript
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  // 오류! 'ShapeKind.Circle' 타입에 'ShapeKind.Square' 타입을 할당할 수 없습니다.
  kind: ShapeKind.Square,
  radius: 100,
};
```

<br>

열거형타입자체가 효율적으로 각각의 열거형 멤버의 유니언이 된다.

유니언 타입 열거형을 사용하면 타입 시스템이 열거형 자체에 존재하는 정확한 값의 집합을 알고 있다는 사실을 활용할 수 있다.

```typescript
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    //               ~~~~~~~~~~~
    // 에러! E 타입은 Foo, Bar 둘 중 하나이기 때문에 이 조건은 항상 true를 반환합니다.
  }
}
```

<br>

## 런타임에서 열거형 (Enums at runtime)

열거형은 런타입에 존재하는 실제 객체이다.

실제로 아래와 같이 함수로 전달될 수 있다.

```typescript
enum E {
  X, Y, Z
}

function f(obj: { X: number }) {
  return obj.X;
}

// E가 X라는 숫자 프로퍼티를 갖고 있기 때문에 동작하는 코드이다.
f(E);
```

<br>

## 컴파일 시점에서 열거형 (Enums at compile time)

`keyof typeof` 를 사용하면 모든 열거형의 키를 문자열로 나타내는 타입을 가져온다.

```typescript
enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}

// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
// 아래 코드와 주석 코드와 같다.
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log('Log level key is: ', key);
    console.log('Log level value is: ', num);
    console.log('Log level message is: ', message);
  }
}

printImportant('ERROR', 'This is a message');
```

<br>

## 역 매핑 (Reverse mappings)

열거형 값에서 열거형 이름으로 **역 매핑을** 받는다.

```typescript
enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

열거형은 정방향 ( `name` -> `value` ) 매핑과 역방향 ( `value` -> `name` ) 매핑 두 정보를 모두 저장하는 객체로 컴파일 된다.

>  문자열 열거형은 역 매핑을 생성하지 않는다.

<br>

## `const` 열거형 ( `const` enums)

```typescript
const enum Enum {
  A = 1,
  B = A * 2
}
```

`const` 열거형은 상수 열거형 표현식만 사용될 수 있으며 일반적인 열거형과 달리 컴파일 과정에서 완전히 제거된다.

`const` 열거형은 사용하는 공간에 인라인된다. 왜냐하면 계산된 멤버를 가지고 있지 않기 때문이다.

```typescript
const enum Directions {
   Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

<br>

## Ambient 열거형 (Ambient enums)

Ambient 열거형은 이미 존재하는 열거형 타입의 모습을 묘사하기 위해 사용된다.

```typescript
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```

일반적인 열거형에서 초기화되지 않은 멤버가 상수로 간주하는 멤버 뒤에 있다면, 이 멤버도 상수로 간주할 것이다.

반면 `ambient` 열거형에서 초기화되지 않는 멤버는 **항상 계산된 멤버로 간주한다.**