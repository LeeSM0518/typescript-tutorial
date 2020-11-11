enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

enum Direction2 {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right,  // 3
}

enum Response2 {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response2): void {
    // ...
}

respond("Princess Caroline", Response2.Yes);

enum E {
    A = function(){ return 1+1}(),
    B = 1
}

enum Direction3 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

enum BooleanLikeEnum {
    No = 0,
    Yes = "YES"
}