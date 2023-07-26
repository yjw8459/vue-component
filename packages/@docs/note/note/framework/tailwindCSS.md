# Tailwind CSS

쉽고 빠르게 스타일링을 할 수 있고 일관된 디자인을 가능하게 해주는 Utility-First 컨셉을 가진 CSS 프레임워크이다.
Bootstrap처럼 `m-1`, `flex`와 같이 미리 세팅된 유틸리티 클래스를 활용하는 방식으로 HTML 코드 내에서 스타일링 할 수 있다.
styled-components 등과 같이 작은 스타일 변경에도 컴포넌트를 만들어야 하거나, 클래스 명 때문에 번거로울 때 많은 도움이 될 수 있다.

```html
<h1 class="text-3xl font-bold underline">Hello world!</h1>
```

`text-3xl`, `font-bold underline` 등 미리 세팅된 유틸리티 클래스를 활용하여 스타일링한다.

## Get Started

### Tailwind CSS 설치

Tailwind CSS 설치 및 `tailwind.config.js` 파일 생성

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 템플릿 경로 지정

tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // 템플릿 경로 설정
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Main CSS 파일에 Tailwind 지시문 추가

ex) common.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind CSS Build

```bash
npx tailwindcss -i ./src/common.css ./dist/common.css -watch
```

./src/common.css <- input 경로
./dist/common.css <- output 경로

### Use Tailwind CSS

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/dist/output.css" rel="stylesheet" />
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </body>
</html>
```

Reference

- https://tailwindcss.com/docs/installation
