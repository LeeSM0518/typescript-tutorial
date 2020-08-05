function printLabel1(labelObj: { label: string}) {
    console.log(labelObj.label);
}

let myObj1 = {size: 10, label: "Size 10 Object"};
printLabel1(myObj1);

interface LabeledValue {
    label: string;
}

function printLabel2(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj2 = {size: 10, label: "Size 10 Object"};
printLabel2(myObj2)