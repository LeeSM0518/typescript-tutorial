# 함수 (Function)

## 소개 (Introduction)

JavaScript 함수는 **추상화 계층을 구축하거나 클래스 모방, 정보 은닉, 모듈에** 대한 방법을 제공한다.

TypeScript에서는 표준 JavaScript 함수가 작업을 수월하게 하도록 몇 가지 새로운 기능을 추가한다.

<br>

## 함수 (Function)

**기명 함수(named function)과 익명 함수(anonymous function)을** 만들 수 있다.

이를 통해 API에서 **함수 목록을** 작성하든 **일회성 함수를** 써서 다른 함수로 전달할 수 있다.

```javascript
// named function
function add(x, y) {
  return x + y;
}

// anonymous function
let myAdd = function(x, y) { return x + y };
```

<br>

함수는 함수 외부의 변수를 참조할 수 있다. 이런 경우를 **변수를 캡처(capture) 한다고** 한다.

```js
let z = 100;

function addToZ(x, y) {
  return x + y + z;
}
```

<br>

## 함수 타입 (Function Types)

### 함수의 타이핑 (Typing the function)

```typescript
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y };
```

<br>

### 함수 타입 작성하기 (Writing the function type)

함수의 전체 타입을 작성해보자.

```typescript
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

* **함수의 타입**
  * 매개변수의 타입
  * 반환 타입
    * 매개변수 타입과 반환 타입 사이에 '화살표 표기( `=>` )' 를 쓴다.
    * 만약 함수가 값을 반환하지 않는다면 `void` 를 써서 표시한다.

<br>

### 타입의 추론 (Inferring the types)

방정식의 한쪽에만 타입이 있더라도 타입을 추론할 수 있다.

```typescript
// myAdd는 전체 함수 타입을 가진다.
let myAdd = function(x: number, y: number): number { return x + y; };

// 매개변수 x 와 y는 number 타입을 가진다.
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

<br>

## 선택적 매개변수와 기본 매개변수 (Optional and Default Parameter)

함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치해야 한다.

```typescript
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 오류, 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확
```

<br>

선택적 매개변수를 원한다면 매개변수 이름 끝에 `?` 를 붙임으로써 해결할 수 있다.

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

let result1 = buildName("Bob");            // 올바른 동작
let result2 = buildName("a", "b", "c");    // 오류, 많은 매개변수
let result3 = buildName("a", "b");         // 올바른 동작
```

<br>

할당될 매개변수의 값을 정해놓을 수 있다. 이것을 `기본-초기화 매개변수` 라고 한다.

```typescript
function buildName(firstName: string, lastName = "Smith") {
  return firstName = " " + lastName;
}
```

<br>

## 나머지 매개변수 (Rest Parameters)

때로는 다수의 매개변수를 그룹 지어 작업하기를 원하거나, 함수가 최종적으로 얼마나 많은 매개변수를 취할지 모를 때도 있다.

```typescript
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("A", "B", "C", "D");
console.log(employeeName);
```

<br>

## this

### `this` 와 화살표 함수 (this and arrow functions)

`this` 는 **함수가 호출될 때 정해지는 변수이다.** 매우 강력하고 유연한 기능이지만 이것은 항상 함수가 실행되는 콘텍스트에 대해 알아야 한다.

```typescript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

> `createCardPicker` 에 의해 생성된 함수에서 사용 중인 `this` 가 `deck` 객체가 아닌 `window` 에 설정되었기 때문에 오류가 발생한다.

**문제해결**

```typescript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

<br>

명시적으로 `this` 매개변수를 줄 수 있다.

```typescript
function t(this: void) {
    // 독립형 함수에서 'this'를 사용할 수 없는 것을 확인
}
```

명확하고 재사용하기 쉽게 `Card` 와 `Deck` 두 가지 인터페이스 타입들을 예시에 추가해 보겠습니다.

```typescript
function t(this: void) {
  // 독립형 함수에서 'this'를 사용할 수 없는 것을 확인
}

interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: 아래 함수는 이제 callee가 반드시 Deck 타입이어야 함을 명시적으로 지정합니다. 
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      // this 가 Deck 타입이라는 것을 안다.
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

<br>

## 콜백에서 `this` 매개변수 (`this` parameters in callbacks)

콜백을 일반 함수처럼 호출하므로 `this` 는 `undefined` 가 된다. 라이브러리 작성자는 콜백 타입을 `this` 로 표시해주어야 한다.

```typescript
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void) : void;
}
```

<br>

`this` 호출 코드 예시2

```typescript
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
      // 이 콜백을 쓰면 런타임에서 충돌을 일으킨다.
        this.info = e.message;
    }
}

let h = new Handler();
uiElement.addClickListener(h.onClickBad);
```

오류를 고치기 위해 `this` 의 타입을 바꿔준다.

```typescript
class Handler {
  info: string;
  onClickGood(this: void, e: Event) {
    // void 타입이기 때문에 this는 이곳에서 쓸 수 없다!
    console.log('clicked!');
  }
}

let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

만약 `this.info` 를 사용하길 원하면 화살표 함수를 사용해야 한다.

```typescript
class Handler {
  info: string;
  onClickGood = (e: Event) => { this.info = e.message }
}
```

> 화살표 함수를 사용하면 외부의 `this` 를 사용한다.

<br>

## 오버로드 (Overloads)

* 오버로드 사용하기 전 코드

  ```typescript
  let suits = ["hearts", "spades", "clubs", "diamonds"];
  
  function pickCard(x): any {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택한다.
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
  
    // 그렇지 않다면 그냥 card를 선택한다.
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }
  
  let myDeck = 
      [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4}];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
  
  let pickedCard2 = pickCard(15);
  console.log(pickedCard2);
  ```

* 오버로드 사용 코드

  ```typescript
  let suits = ["hearts", "spades", "clubs", "diamonds"];
  
  function pickCard(x: { suit: string; card: number; }[]): number;
  function pickCard(x: number): {suit: string; card: number;};
  function pickCard(x): any {
      if (typeof x == "object") {
          let pickedCard = Math.floor(Math.random() * x.length);
          return pickedCard
      }
      else if (typeof x == "number") {
          let pickedSuit = Math.floor(x / 13);
          return { suit: suits[pickedSuit], card: x % 13 };
      }
  }
  
  let myDeck = [{ suit: "diamonds", card: 2 }, 
      { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
  
  let pickedCard2 = pickCard(15);
  console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
  ```