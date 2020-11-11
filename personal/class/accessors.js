// class Employee3 {
//     fullName: string;
// }
// let employee3 = new Employee3();
// employee3.fullName = "Bob Smith";
// if (employee3.fullName) {
//     console.log(employee3.fullName);
// }
var fullNameMaxLength = 10;
var Employee_ = /** @class */ (function () {
    function Employee_() {
    }
    Object.defineProperty(Employee_.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (newName && newName.length > fullNameMaxLength) {
                throw new Error("fullName has a max length of " + fullNameMaxLength);
            }
            this._fullName = newName;
        },
        enumerable: false,
        configurable: true
    });
    return Employee_;
}());
var employee_ = new Employee_();
employee_.fullName = "Bob Smith";
if (employee_.fullName) {
    console.log(employee_.fullName);
}
