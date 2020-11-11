interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // .length 프로퍼티가 있는 것을 알기 때문에 오류가 발생하지 않는다.
    return arg;    
}

// loggingIdentity(3);