let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("A", "B", "C", "D");
console.log(employeeName);