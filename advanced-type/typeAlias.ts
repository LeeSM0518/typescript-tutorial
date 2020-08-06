// type Name = string;
// type NameResolver = () => string;
// type NameOrResolver = Name | NameResolver;

// function getName(n: NameOrResolver): Name {
//     if (typeof n === "string") {
//         return n;
//     } else {
//         return n();
//     }
// }

// type Container<T> = { value: T };

// type Tree<T> = {
//     value: T;
//     left: Tree<T>;
//     right: Tree<T>;
// }

// type LinkedList<T> = T & { next: LinkedList<T> };

// interface Person {
//     name: string;
// }

// var people: LinkedList<Person>;
// var q = people.name;
// var q = people.next.name;
// var q = people.next.next.name;
// var q = people.next.next.next.name;

// type Yikes = Array<Yikes>;
// let e: Yikes;
// a.push(e);
// console.log(a);
