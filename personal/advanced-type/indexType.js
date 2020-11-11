function pluck(o, propertyNames) {
    return propertyNames.map(function (n) { return o[n]; });
}
var taxi = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};
// Manufacturer과 model은 둘 다 문자열 타입입니다.
// 그래서 둘 다 타이핑된 문자열 배열로 끌어낼 수 있습니다.
var makeAndModel = pluck(taxi, ['manufacturer', 'model']);
console.log(makeAndModel);
// 만약 model과 year를 끌어내려고 하면,
// 유니언 타입의 배열: (string | number)[] 을 얻게 된다.
var modelYear = pluck(taxi, ['model', 'year']);
console.log(modelYear);
var carProps;
console.log(carProps);
