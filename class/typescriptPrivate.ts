// class Animal5 {
//     private name: string;
//     constructor(theName: string) {
//         this.name = theName;
//     }
// }

// new Animal5("Cat").name; // 오류: 'name'은 비공개로 선언되어 있다.

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
animal = employee;