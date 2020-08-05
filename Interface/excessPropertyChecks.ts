interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
    return {color: "red", area: 3}
}

let mySquare2 = createSquare({ width: 100, opacity: 100 } as SquareConfig);
mySquare.area;