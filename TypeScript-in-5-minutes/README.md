# 5분 안에 TypeScript

TypeScript를 사용하여 간단한 웹 응용 프로그램을 만들어보자.

<br>

## TypeScript Install

* NPM

  ```shell
  bash$ npm install -g typescript
  ```

<br>

## Create first TypeScript file

* **greeter.ts**

  ```typescript
  function greeter(person) {
      return "Hello, " + person
  }
  
  let user = "Jane User"
  
  document.body.textContent = greeter(user);
  ```

<br>

## Compile

* Command line

  ```bash
  bash$ tsc greeter.ts
  ```

  > greeter.ts가 greeter.js로 컴파일된다.

<br>

## Type Annotations

`: string` 타입 애노테이션을 `person` 파라미터에 추가해보자.

```typescript
function greeter(person: string) {
    return "Hello, " + person
}

let user = "Jane User"

document.body.textContent = greeter(user);
```

<br>

`person` 매개변수에 문자열 대신 배열을 전달해보자.

```typescript
function greeter(person: string) {
    return "Hello, " + person
}

let user = [0, 1, 2]

document.body.textContent = greeter(user);
```

* **컴파일 결과**

  ```typescript
  greeter.ts:7:21 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
  
  7 document.body.textContent = greeter(user);
                                        ~~~~
  Found 1 error.
  ```

  > 예기치 않은 매개 변수를 사용하여 함수를 호출했음을 알려준다.

<br>

## Interface

`person` 의 `firstNmae` 및 `lastName` 필드가 있는 객체와 유사한 인터페이스 만들어보자.

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.textContent = greeter(user);
```

<br>

## Class

`Student` 클래스와 생성자를 만들어보자.

```typescript
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);
```

* 생성자의 파라미터에 `public` 을 사용하면 해당 이름의 속성은 자동으로 필드로 만들어진다.

<br>

## Running TypeScript web app

`greeter.html` 을 작성하자.

```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```