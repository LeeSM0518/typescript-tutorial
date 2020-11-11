var Animal5 = /** @class */ (function () {
    function Animal5(theName) {
        this.name = theName;
    }
    return Animal5;
}());
// new Animal5("Cat").name; // 오류: 'name'은 비공개로 선언되어 있다.
