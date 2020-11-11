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

let greeterMaker: typeof Greeter__ = Greeter__;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter__ = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"

