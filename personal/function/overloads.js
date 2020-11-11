var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택한다.
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않다면 그냥 card를 선택한다.
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
console.log(pickedCard2);
