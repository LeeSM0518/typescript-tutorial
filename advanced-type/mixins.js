function extend(first, second) {
    var result = {};
    for (var prop in first) {
        console.log('1');
        console.log(prop);
        if (first.hasOwnProperty(prop)) {
            result[prop] = first[prop];
        }
    }
    for (var prop in second) {
        console.log(2);
        console.log(prop);
        if (second.hasOwnProperty(prop)) {
            result[prop] = second[prop];
        }
    }
    return result;
}
var Person_ = /** @class */ (function () {
    function Person_(name) {
        this.name = name;
    }
    return Person_;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (name) {
        console.log("Hello, I'm " + name + ".");
    };
    return ConsoleLogger;
}());
var jim = extend(new Person_('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);
console.log(jim);
console.log(typeof jim);
