var Greeter__ = /** @class */ (function () {
    function Greeter__(message) {
        this.greeting = message;
    }
    Greeter__.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter__;
}());
var greet;
greet = new Greeter__("world");
console.log(greet.greet());
