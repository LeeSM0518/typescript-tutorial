class Animal {
    #name: string;
    constructor(theName: string) {
        this.#name = theName;
    }
}

// 프로퍼티 '#name'은 비공개 식별자이기 때문에 'Animal' 클래스 외부에선 접근할 수 없다.
// new Animal("Cat").#name;