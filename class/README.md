# 클래스

## 클래스 (Classes)

* 간단한 예제

  ```typescript
  class Greeter {
      greeting: string;
      constructor(message: string) {
          this.greeting = message;
      }
      greet() {
          return "Hello, " + this.greeting;
      }
  }
  
  // new 를 사용하여 인스턴스를 생성
  // 생성자 호출하여 초기화
  let greeter = new Greeter("world");
  ```

  * 3개의 멤버를 갖는다.
    * **프로퍼티**
    * **생성자**
    * **메서드**

<br>

## 상속 (Inheritance)

```typescript
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

> `Dog` 은 `extends` 키워드를 사용하여 `Animal` 이라는 기초 클래스로부터 파생된 파생 클래스이다.

<br>

```typescript
class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palmomino");

sam.move();
tom.move(34);
```

> 기초 클래스의 생성자를 실행할 때는 `super()` 를 호출한다.
>
> `Snake` 와 `Horse` 는 `Animal` 의 `move` 를 오버라이드해서 각각 클래스의 특성에 맞게 기능을 가진 `move` 를 생성한다.

<br>

## public, private 그리고 protected 지정자 (public, private and protected modifiers)

### 기본적으로 공개 (Public by default)

TypeScript에서는 기본적으로 각 멤버는 `public` 이다.

명시적으로 멤버를 `public` 으로 표시할 수도 있다.

```typescript
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

<br>

### ECMAScript 비공개 필드 (ECMAScript Private Fields)

```typescript
class Animal {
    #name: string;
    constructor(theName: string) {
        this.#name = theName;
    }
}

// 프로퍼티 '#name'은 비공개 식별자이기 때문에 'Animal' 클래스 외부에선 접근할 수 없다.
new Animal("Cat").#name; // 에러
```

<br>

### TypeScript의 `private` 이해하기 (Understanding TypeScript's `private`)

멤버를 포함하는 클래스 외부에서 이 멤버에 접근하지 못하도록 멤버를 `private` 으로 표시하는 방법이 있다.

```typescript
class Animal5 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

new Animal5("Cat").name; // 오류: 'name'은 비공개로 선언되어 있다.
```

<br>

`private` 및 `protected` 멤버가 있는 타입들을 비교할 때는 타입을 다르게 처리한다. 호환된다고 판단되는 두 개의 타입 중 한 쪽에서 `private` 멤버를 가지고 있다면, 다른 한쪽도 무조건 동일한 선언에 `private` 멤버를 가지고 있어야 한다.

```typescript
class Animal_ {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Rhino extends Animal {
    constructor() {
        super("Rhino");
    }
}

class Employee {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee; 오류: 'Animal'과 'Employee'은 호환될 수 없음.
```

<br>

### `protected` 이해하기 (Understanding protected)

`protected` 지정자도 `protected` 로 선언된 멤버를 파생된 클래스 내에서 접근할 수 있다는 점만 제외하면 `private` 지정자와 매우 유사하게 동작한다.

```typescript
class Person {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Employee2 extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 오류
```

> `Person` 외부에서 `name` 을 사용할 수 없지만, `Employee` 는 `Person` 에서 파생되었기 때문에 `Employee` 의 인스턴스 메서드 내에서는 여전히 사용할 수 있다.

<br>

생성자 또한 `protected` 로 표시될 수도 있다. 이는 클래스를 포함하는 클래스 외부에서 인스턴스화 할 수 없지만 확장 할 수 있다.

```typescript
class Person {
    protected name: string;
    protected constructor(name: string) {
        this.name = name;
    }
}

// Employee2는 Person을 확장할 수 있다.
class Employee2 extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}

let howard = new Employee2("Howard", "Sales");
let john = new Person("John"); // 오류: 'Person'의 생성자는 protected 입니다.
```

<br>

## 읽기전용 지정자 (Readonly modifier)

`readonly` 키워드를 사용하여 프로퍼티를 읽기전용으로 만들 수 있다. 읽기전용 프로퍼티들은 선언 또는 생성자에서 초기화해야 한다.

```typescript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}

let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 오류! name은 읽기전용 입니다.
```

<br>

## 매개변수 프로퍼티 (Parameter properties)

```typescript
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {}
}
```

* 생성자에 `readonly name: string` 파라미터를 사용하여 필드에 `theName` 을 제거하고 `name` 멤버를 생성하고 초기화를 동시에 한다.
* 매개변수 프로퍼티에 `private` 을 사용하면 비공개 멤버를 선언하고 초기화한다.
  * 마찬가지로, `public` , `protected` , `readonly` 도 동일하게 작동한다.

<br>

## 접근자 (Accessors)

TypeScript는 `getters/setters` 를 지원한다. 이를 통해 각 객체의 멤버에 접근하는 방법을 세밀하게 제어할 수 있다.

* **getters 와 setters가 없는 예제**

  ```typescript
  class Employee3 {
    fullName: string;
  }
  
  let employee3 = new Employee3();
  employee3.fullName = "Bob Smith";
  if (employee3.fullName) {
    console.log(employee3.fullName);
  }
  ```

* **getters 와 setters가 있는 예제**

  ```typescript
  const fullNameMaxLength = 10;
  
  class Employee_ {
    private _fullName: string;
  
    get fullName(): string {
      return this._fullName;
    }
  
    set fullName(newName: string) {
      if (newName && newName.length > fullNameMaxLength) {
        throw new Error("fullName has a max length of " + fullNameMaxLength);
      }
      this._fullName = newName;
    }
  }
  
  let employee_ = new Employee_();
  employee_.fullName = "Bob Smith";
  if (employee_.fullName) {
    console.log(employee_.fullName);
  }
  ```

  <br>

  ## 전역 프로퍼티 (Static Properties)

  인스턴스가 아닌 클래스 자체에서 보이는 전역 멤버를 생성할 수 있다. 이때 `static` 을 사용한다.

  각 인스턴스는 클래스 이름을 앞에 붙여 이 값에 접근할 수 있다.

  ```typescript
  class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number){}
  }
  
  let grid1 = new Grid(1.0);
  let grid2 = new Grid(5.0);
  
  console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
  console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
  ```

  <br>

  ## 추상 클래스 (Abstract Classes)

  추상 클래스는 인터페이스와 달리 멤버에 대한 구현 세부 정보를 포함할 수 있다. `abstract` 키워드는 추상 클래스뿐만 아니라 추상 클래스 내에서 추상 메서드를 정의하는데 사용 된다.

  ```typescript
  abstract class Animal {
      abstract makeSound(): void;
      move(): void {
          console.log("roaming the earch...");        
      }
  }
  ```

  <br>

  추상 메서드는 반드시 파생된 클래스에서 구현되어야 한다.

  ```typescript
  abstract class Department {
    constructor(public name: string) {
    }
  
    printName(): void {
      console.log("Department name: " + this.name);        
    }
  
    abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현되어야 한다.
  }
  
  class AccountingDepartment extends Department {
  
    constructor() {
      // 파생된 클래스의 생성자는 반드시 super()를 호출해야 한다.
      super("Accounting and Auditing");
    }
  
    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am.");
    }
  
    generateReports(): void {
      console.log("qasdasd");
    }
  }
  
  let department: Department;               // 추상 타입의 레퍼런스를 생성한다.
  department = new Department();            // 오류: 추상 클래스는 인스턴스화 할 수 없다.
  department = new AccountingDepartment();  // 추상이 아닌 하위 클래스를 생성하고 할당한다.
  department.printName();
  department.printMeeting();
  department.generateReports();             // 오류: 선언된 추상 타입에 메서드가 존재하지 않는다.
  ```

<br>

## 고급 기법 (Advanced Techniques)

### 생성자 함수 (Constructor functions)

TypeScript에서는 클래스를 선언하면 실제로 여러 개의 선언이 동시에 생성된다.

```typescript
class Greeter__ {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greet: Greeter__;
greet = new Greeter__("world");
console.log(greet.greet());
```

각 클래스를 생각하는 또 다른 방법은 **인스턴스 측면과 정적 측면이** 있다는 것이다.

<br>

```typescript
class Greeter__ {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        } else {
            return Greeter__.standardGreeting;
        }
    }
}

let greeter1: Greeter__;
greeter1 = new Greeter__();
console.log(greeter1.greet()); // "Hello, there"

// typeof Greeter 를 사용하여 인스턴스 타입이 아닌 
// Greeter 클래스 자체의 타입을 제공한다.
// 이 타입은 Greeter 클래스의 인스턴스를 만드는 생성자와 함께
// Greeter의 모든 정적 멤버를 포함한다.
let greeterMaker: typeof Greeter__ = Greeter__;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter__ = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"
```

<br>

## 인터페이스로써 클래스 사용하기 (Using a class as an interface)

클래스는 타입을 생성하기 때문에 인터페이스를 사용할 수 있는 동일한 위치에서 사용할 수 있다.

```typescript
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

