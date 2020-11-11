enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
// 아래 코드와 주석 코드와 같다.
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log('Log level key is: ', key);
        console.log('Log level value is: ', num);
        console.log('Log level message is: ', message);
    }
}

printImportant('ERROR', 'This is a message');