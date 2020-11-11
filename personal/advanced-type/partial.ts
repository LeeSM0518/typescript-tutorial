interface User {
    name: string;
    age: number;
}

let user1: User = { name: 'harry', age: 23 } 
// let user2: User = { age: 23 };
let user3: Partial<User> = { age: 23 }

console.log(user1);
console.log(user3);