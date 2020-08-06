class BasicCalculator {
    public constructor(protected value: number = 0) {}
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number) {
        this.value *= operand;
        return this;
    }
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1);

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}

let v2 = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();

console.log(v2);
