interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

interface Triangle {
    kind: "triangle";
    radius: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function area(s: Shape): number {
    switch(s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        case "triangle": return 1;
        default: return assertNever(s);
    }
}

let test3: Triangle =  {kind: "triangle", radius: 3}

console.log(area(test3));
