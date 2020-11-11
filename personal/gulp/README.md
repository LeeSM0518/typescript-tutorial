# Gulp

TypeScript를 어떻게 빌드하는지 알아보자. 그리고 `Browserify` , `uglify` , `Watchify` 도 추가해보자.

그리고 `Babelify` 를 사용하여 `Babel` 을 어떻게 추가하는지도 살펴보도록 하자.

> `Node.js` 와 `NPM` 을 사용함.

<br>

## Minimal project

1. `proj` 라는 새로운 폴더를 생성한다.

  ```bash
  mkdir proj
  cd proj
  ```

2. 아래와 같이 프로젝트를 구성한다.

  ```
  proj/
     ├─ src/
     └─ dist/
  ```

3. `npm` 패키지를 구성해준다.

   ```
    npm init
   ```

<br>

## Install our dependencies

1. `gulp-cli` 를 설치하자.

   ```
   npm install -g gulp-cli
   ```

2. 개발 의존들로 `typescript` , `gulp` , `gulp-typescript` 를 설치한다.

   ```
   npm install --save-dev typescript gulp@4.0.0 gulp-typescript
   ```

<br>

## Simple Example

Hello World 프로그램을 만들어보자.

1. `src` 에 `main.ts` 를 만든다.

   ```typescript
   function hello(compiler: string) {
       console.log(`Hello from ${compiler}`)
   }
   
   hello('TypeScript')
   ```

2. `proj` 에 `tsconfig.json` 을 만든다.

   ```json
   {
       "files": [
           "src/main.ts"
       ],
       "compilerOptions": {
           "noImplicitAny": true,
           "target": "ES3"
       }
   }
   ```

3. 프로젝트의 루트에 `gulpfile.js` 를 만든다.

   ```js
   var gulp = require('gulp');
   var ts = require('gulp-typescript');
   var tsProject = ts.createProject('tsconfig.json');
   
   gulp.task('default', function() {
       return tsProject.src()
           .pipe(tsProject())
           .js.pipe(gulp.dest('dist'));
   })
   ```

4. 테스트한다.

   ```
   gulp
   node dist/main.js
   ```

<br>

## Add modules to the code

1. `src/greet.ts` 을 만든다.

   ```typescript
   export function sayHello(name: string) {
       return `Hello from ${name}`;
   }
   ```

2. `src/main.ts` 에 `greet.ts` 의 `sayHello` 를 `improt` 하여 코드를 바꾼다.

   ```typescript
   import { sayHello } from './greet';
   
   console.log(sayHello('TypeScript'));
   ```

3. `src/greet.ts` 를 `tsconfig.json` 에 추가한다.

   ```json
   {
       "files": [
           "src/main.ts",
           "src/greet.ts"
       ],
       "compilerOptions": {
           "noImplicitAny": true,
           "target": "ES3"
       }
   }
   ```

4. `gulp` 를 하고 테스트를 진행한다.

   ```
   gulp
   node dist/main.js
   ```

<br>

## Browserify

`Browserify` 는 모든 모듈을 하나의 JavaScript 파일로 묶는 역할을 해준다.

먼저 `browserify` , `tsify` , `vinyl-source-stream` 을 설치한다.

```
npm install --save-dev browserify tsify vinyl-source-stream
```

<br>

1. `src` 에 `index.html` 페이지를 만든다.

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <meta charset="UTF-8"/>
           <title>Hello World!</title>
       </head>
       <body>
           <p id="greeting">Loading ...</p>
           <script src="bundle.js"></script>
       </body>
   </html>
   ```

2. `main.ts` 를 수정한다.

   ```typescript
   import { sayHello } from './greet';
   
   function showHello(divName: string, name: string) {
       const elt = document.getElementById(divName);
       elt.innerText = sayHello(name);
   }
   
   showHello('greeting', 'TypeScript');
   ```

3. `gulpfile.js` 를 수정한다.

   ```js
   var gulp = require('gulp');
   var browserify = require('browserify');
   var source = require('vinyl-source-stream');
   var tsify = require('tsify');
   var ts = require('gulp-typescript');
   var paths = {
     pages: ['src/*.html']
   };
   
   gulp.task('copy-html', function() {
     return gulp.src(paths.pages)
       .pipe(gulp.dest('dist'));
   });
   
   gulp.task('default', gulp.series(gulp.parallel('copy-html'), function() {
     return browserify({
       basedir: '.',
       debug: true,
       entries: ['src/main.ts'],
       cache: {},
       packageCache: {}
     })
       .plugin(tsify)
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('dist'));
   }));
   ```

4. `gulp` 를 진행하고 `dist/index.html` 를 열어 테스트한다.

   ```
   gulp
   ```

   > 페이지에는 "Hello from TypeScript" 가 표시된다.

<br>

## Watchify, Babel and Uglify

이제 코드를 `Browserify` 및 `tsify` 를 번들로 제공하므로 `browserify` 플러그인을 사용하여 빌드에 다양한 기능을 추가할 수 있다.

* **Watchify** : 

<br>

### Watchify

`Watchify` 는 백그라운드 컴파일을 제공하게 한다.

<br>

1. `watchify` 와 `fancy-log` 를 설치한다.

  ```
  npm install --save-dev watchify fancy-log
  ```

2. `gulpfile` 을 변경한다.

   ```js
   var gulp = require('gulp');
   var browserify = require('browserify');
   var source = require('vinyl-source-stream');
   var watchify = require('watchify');
   var tsify = require('tsify');
   var fancy_log = require('fancy-log');
   const { watch } = require('gulp');
   var paths = {
       pages: ['src/*.html']
   };
   
   var watchedBrowserify = watchify(browserify({
       basedir: '.',
       debug: true,
       entries: ['src/main.ts'],
       cache: {},
       packageCache: {}
   }).plugin(tsify));
   
   gulp.task('copy-html', function() {
       return gulp.src(paths.pages)
           .pipe(gulp.dest('dist'));
   });
   
   function bundle() {
       return watchedBrowserify
       .bundle()
       .on('error', fancy_log)
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('dist'));
   }
   
   gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
   watchedBrowserify.on('update', bundle);
   watchedBrowserify.on('log', fancy_log);
   ```

   * TypeScript 파일 중 하나가 변경 될 때마다 `watchedBrowserify,on('update', bundle);` 로 인해 `Browserify` 가 `bundle` 함수를 호출한다.
   * `watchedBrowserify.on('log', fancy_log);` 는 콘솔에 로그를 남기기 위해 작성
   
3. `gulp` 로 실행

   ```
   gulp
   ```

   > 코드를 변경하면 곧 바로 컴파일 한다.

   * 실행 결과

     ```
     [16:35:32] Using gulpfile ~/typescript-tutorial/proj/gulpfile.js
     [16:35:32] Starting 'default'...
     [16:35:32] Starting 'copy-html'...
     [16:35:32] Finished 'copy-html' after 16 ms
     [16:35:32] Starting 'bundle'...
     [16:35:33] 2694 bytes written (0.03 seconds)
     [16:35:33] Finished 'bundle' after 1.21 s
     [16:35:33] Finished 'default' after 1.23 s
     [16:35:40] 2702 bytes written (0.01 seconds)
     [16:35:57] 2705 bytes written (0.02 seconds)
     [16:36:01] 2705 bytes written (0.01 seconds)
     ```

<br>

### Uglify

`Uglify` 는 코드를 압축하고 읽지 못하도록 하는 것이다.

1. 먼저 `Uglify` 를 설치한다. `Uglify` 는 소스 맵이 계속 작동하므로 `vinyl-buffer` 와 `gulp-sourcemaps` 또한 설치해야 한다.

   ```
   npm install --save-dev gulp-uglify vinyl-buffer gulp-sourcemaps
   ```

2. `gulpfile` 을 수정한다.

   ```js
   var gulp = require('gulp');
   var browserify = require('browserify');
   var source = require('vinyl-source-stream');
   var tsify = require('tsify');
   var uglify = require('gulp-uglify');
   var sourcemaps = require('gulp-sourcemaps');
   var buffer = require('vinyl-buffer');
   var paths = {
       pages: ['src/*.html']
   };
   
   gulp.task('copy-html', function() {
       return gulp.src(paths.pages)
           .pipe(gulp.dest('dist'));
   });
   
   function bundle() {
       return browserify({
           basedir: '.',
           debug: true,
           entries: ['src/main.ts'],
           cache: {},
           packageCache: {}
       })
       .plugin(tsify)
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(buffer())
       .pipe(sourcemaps.init({loadMaps: true}))
       .pipe(uglify())
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest('dist'));
   }
   
   gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
   ```

3. `gulp` 실행

<br>

### Babel

먼저 `Babelify` 및 ES2015를 위한 `babel-preset-es2015` 들을 설치한다.

```
npm install --save-dev babelify@8 babel-core babel-preset-es2015 vinyl-buffer gulp-sourcemaps
```

<br>

`gulpfile` 을 수정한다.

```js
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copy-html', function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

function bundle() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
}

gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
```

<br>

`tsconfig.json` 을 수정해서 `Babel` 이 TypeScript가 ES2015 코드에서 ES5 코드를 생성하도록 한다,

```json
{
    "files": [
        "src/main.ts",
        "src/greet.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es2015"
    }
}
```

<br>

`gulp` 를 실행