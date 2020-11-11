var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _name;
var Animal = /** @class */ (function () {
    function Animal(theName) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, theName);
    }
    return Animal;
}());
_name = new WeakMap();
// 프로퍼티 '#name'은 비공개 식별자이기 때문에 'Animal' 클래스 외부에선 접근할 수 없다.
// new Animal("Cat").#name;
