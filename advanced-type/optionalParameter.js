// function f(x: number, y?: number) {
//     return x + (y || 0);
// }
// console.log(f(1, 2));
// console.log(f(1));
// console.log(f(1, undefined));
// console.log(f(1, null));
// class C {
//     a: number;
//     b?: number;
// }
// let d = new C();
// console.log(d.a = 12);
// console.log(d.a = undefined);
// console.log(d.b = 13);
// console.log(d.b = undefined);
// console.log(d.b = null);
function broken(name) {
    function postfix(epithet) {
        return name.charAt(0) + ". the " + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}
console.log(broken(null));
function fixed(name) {
    function postfix(epithet) {
        return name.charAt(0) + ". the " + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}
console.log(fixed(null));
