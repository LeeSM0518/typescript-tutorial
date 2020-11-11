interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}