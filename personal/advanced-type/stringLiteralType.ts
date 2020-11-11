type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        } else if (easing === "ease-out") {
        } else if (easing === "ease-in-out") {
        } else {
            // 오류: null 이나 undefined를 전달하면 안된다.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in")
button.animate(0, 0, "uneasy"); // 오류: "uneasy"는 허용되지 않는다.