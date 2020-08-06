function area(s) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * Math.pow(s.radius, 2);
    }
}
var test3 = { kind: "triangle", radius: 3 };
console.log(area(test3));
