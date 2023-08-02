# Module System

- CommonJS(CJS)
- ECMAScript Modules(ESM)

Node.js 12부터 ECMAScript Modules라는 새로운 Module System이 추가되었다.

### CJS

- require / module.exports를 사용
- 동기적 작동
- package.json의 type 필드에 "commonjs"이 기본값
- 확장자 명은 cjs, cts

```js
// add.js
module.exports.add = (x, y) => x + y;

// main.js
const { add } = require('./add');

add(1, 2);
```

### ESM

- import / export를 사용
- 비동기적 작동
- - package.json의 type 필드에 "module"이 기본값
- - 확장자 명은 mjs, mts

동기 / 비동기 동작 방식 때문에, ESM에서는 CJS를 import 할 수 있지만, CJS에서 ESM을 require 할 수는 없다.

```ts
// add.js
export function add(x, y) {
  return x + y;
}

// main.js
import { add } from './add.js';

add(1, 2);
```
