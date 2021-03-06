// 문자열을 받고 왼쪽에 "padding"을 추가한다.
//  만약 'padding'이 문자열이라면, 'padding'은 왼쪽에 더해질 것이다.
//  만약 'padding'이 숫자라면, 그 숫자만큼의 공백이 왼쪽에 더해질 것이다.
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
console.log(padLeft("Hello world", 4));
