// let n = 1        // n: number
// let b = true     // b: boolean
// let s = 'hello'  // s: string
// let o = {}       // o: object

// n = 'a'

// let x: any = 0
// x = 'hello'
// x = true
// x = {}

// let y: undefined = undefined
// y = 1

// let count = 10, message = 'Your count'
// let result = `${message} is ${count}`
// console.log(result)

// let o: object = {name: 'Jack', age: 32}
// o = {first: 1, second: 2}

// interface IPerson {
//     name: string
//     age: number
// }
//
// let good: IPerson = {name: 'Jack', age: 32}
//
// let bad1: IPerson = {name: 'Jack'} // age 속성이 없으므로 오류
// let bad2: IPerson = {age: 32}      // name 속성이 없으므로 오류
// let bad3: IPerson = {}      // name과 age 속성이 없으므로 오류
// let bad4: IPerson = {name: 'Jack', age: 32, etc: true} // etc 속성이 있어서 오류

// interface IPerson2 {
//     name: string    // 필수 속성
//     age: number     // 필수 속성
//     etc?: boolean   // 선택 속성
// }
//
// let good1: IPerson2 = {name: 'Jack', age: 32}
// let good2: IPerson2 = {name: 'Jack', age: 32, etc: true}

// let ai: {
//     name: string
//     age: number
//     etc?: boolean
// } = {name: 'Jack', age: 32}
//
// function printMe(me: {name: string, age: number, etc?: boolean}) {
//     console.log(
//         me.etc ?
//             `${me.name} ${me.age} ${me.etc}` :
//             `${me.name} ${me.age}`
//     )
// }
//
// printMe(ai)

// class Person1 {
//     name: string
//     age?: number
// }
//
// let jack1: Person1 = new Person1()
// jack1.name = 'Jack'
// jack1.age = 32
// console.log(jack1)

// class Person2 {
//     constructor(public name: string, public age?: number) {}
// }
//
// let jack2: Person2 = new Person2('Jack', 32)
// console.log(jack2)
//
// class Person3 {
//     name: string
//     age?: number
//
//     constructor(name: string, age?: number) {
//         this.name = name
//         this.age = age
//     }
// }
//
// let jack3: Person3 = new Person3('Jak', 22)
// console.log(jack3)

// interface IPerson4 {
//     name: string
//     age?: number
// }
//
// class Person4 implements IPerson4 {
// }

// interface IPerson4 {
//     name: string
//     age?: number
// }
//
// class Person4 implements IPerson4 {
//     constructor(public name: string, public age?: number) {}
// }
//
// let jack4: IPerson4 = new Person4('Jack', 32)
// console.log(jack4)

// abstract class AbstractPerson5 {
//     abstract name: string
//     constructor(public age?: number) {}
// }
//
// class IPerson5 extends AbstractPerson5 {
//     constructor(public name: string, age?: number) {
//         super(age);
//     }
// }
//
// let person2: IPerson5 = new IPerson5('Jack', 32);
// console.log(person2)


// class A {
//     static initValue = 1
// }
//
// let x = A.initValue
// console.log(x)

// let personName = 'Jack'
// let personAge = 32
//
// let companyName = 'Apple Company, Inc'
// let companyAge = 43

// import {IPerson} from "./IPerson_ICompany";
//
// let jack: IPerson = {name: 'Jack', age: 32}
// let {name, age} = jack
//
// console.log(name, age)

// let address: any = {
//     country: 'Korea',
//     city: 'Seoul',
//     address1: 'Gangnam-gu',
//     address2: 'Sinsa-dong 123-456',
//     address3: '789 street'
// }
//
// const {country, city, ...detail} = address
// console.log(detail)

// let coord = {...{x: 0}, ...{y: 0}}
// console.log(coord)
//
// let part1 = {name: 'jane'}, part2 = {age: 22}, part3 = {city: 'Seoul', country: 'Kr'};
// let merged = {...part1, ...part2, ...part3}
// console.log(merged)

// let person: object = {name: "Jack", age: 32};
// let name1 = (<{ name: string }>person).name;
// console.log(name1)

interface INameable {
    name: string
}

let obj: object = {name: 'Jack'}

let name1 = (<INameable>obj).name
let name2 = (obj as INameable).name
console.log(name1, name2)
