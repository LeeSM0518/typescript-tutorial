interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

console.log(myStr);

class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 된다.
// interface NotOkay {
//     [x: number]: Animal;
//     [x: string]: Dog;
// }

interface NotOkay1 {
    [x: number]: Animal;
    // [x: string]: Dog;
}

let okay: NotOkay1;

let a: Dog;
a = new Dog
a.breed = "a"

okay = [a]

console.log(okay[0]);

interface NotOkay2 {
    // [x: number]: Animal;
    [x: string]: Dog;
}

let okay2: NotOkay2 = {a: new Dog, b: new Dog};

okay2['a'].name = 'test1'
okay2['b'].name = 'test2'

console.log(okay2);

interface NumberOrStringDictionay {
    [index: string]: number | string;
    length: number;
    name: string;
}

let test1: NumberOrStringDictionay = [
    'c',
    'b'
]

console.log(test1)