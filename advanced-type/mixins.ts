function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        console.log('1');
        console.log(prop);
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        console.log(2);
        console.log(prop);
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

class Person_ {
    constructor(public name: string) {}
}

interface Loggable {
    log(name: string): void;
}

class ConsoleLogger implements Loggable {
    log(name) {
        console.log(`Hello, I'm ${name}.`);       
    }
}

const jim = extend(new Person_('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);
console.log(jim);
console.log(typeof jim);
