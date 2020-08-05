interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(public h: number, public m: number){};
}

let clock: Clock = new Clock(1, 1);

console.log(clock)