type Alias = { num: number }
interface Interface {
    num: number;
}

declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

type Cat = Animal & { purrs: true };

let test: Cat = new Animal('wfe');

test.name = 'a';

console.log(test);
