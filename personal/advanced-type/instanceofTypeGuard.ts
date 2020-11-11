interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpace: number) {}
    getPaddingString() {
        return Array(this.numSpace + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string){}
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder(" ");
}

// 타입은 'SpaceRepeatingPadder | StringPadder' 이다.
let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
    padder; // 타입은 'SpaceRepeatingPadder' 으로 좁혀진다.
}
if (padder instanceof StringPadder) {
    padder // 타입은 'StringPadder' 으로 좁힌다.
}