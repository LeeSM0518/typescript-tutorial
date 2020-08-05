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
// let john = new Person("John"); // 오류: 'Person'의 생성자는 protected 입니다.