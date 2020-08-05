var Clock = /** @class */ (function () {
    function Clock(h, m) {
        this.h = h;
        this.m = m;
        this.currentTime = new Date();
    }
    ;
    return Clock;
}());
var clock = new Clock(1, 1);
console.log(clock);
