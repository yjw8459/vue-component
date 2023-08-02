# package.json 설정 정리

패키지의 전반적인 내용을 관리한다.

```json
{
  "name": "@webapp/component",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  // 즉, 외부에 파일을 지원하기 위한 옵션 plugin sub path를 바로 import 할 수 있음.
  "exports": {
    ".": {
      "import": "./dist/index.js"
    },
    "./dist/style.css": {
      "import": "./dist/style.css"
    }
  },
  "files": ["dist"], // src를 제외한 dist 폴더 내부의 파일만 라이브러리로 npm에 배포하기 위한 옵션... dist 폴더 내부만 배포하기 위한 목적
  "scripts": {
    "serve": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@eslint/eslint-config-typescript": "^1.6.0",
    "@eslint/eslint-config-vue": "^1.5.0",
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vue-tsc": "^1.8.5",
    "vuetify": "^3.3.11"
  }
}
```

## package.json exports 옵션

### subpath export 지원

```json
  "exports": {
    ".": {
      "import": "./dist/index.js"
    },
    "./dist/style.css": {
      "import": "./dist/style.css"
    }
  },
```

exports 옵션을 활용하여 sub path로 라이브러리를 참조하기 쉽게 만듬.
즉, 외부에 파일을 지원하기 위한 옵션 plugin sub path를 바로 import 할 수 있음.
subpath exports를 사용하면, 명시된 subpath 외에는 사용할 수 없음.

```json
// CJS 패키지
{
  "name": "cjs-package",
  "exports": {
    ".": "./index.js",
    "./a": "./modules/a.js"
  }
}
```

```javascript
// ./a.js가 아니라
// ./modules/a.js를 불러온다.
require('cjs-package/a');

// 에러
// ./b는 exports field에 명시하지 않은 subpath이다.
require('cjs-package/b');
```

### conditional exports 지원

conditional exports를 통해 똑같은 import path에 대해 특정 조건에 따라 다른 모듈을 제공할 수 있다.

```json
{
  "name": "cjs-package",
  "exports": {
    ".": {
      "require": "./dist/index.cjs",
      "import": "./esm/index.mjs"
    }
  }
}
```

```javascript
// CJS 환경
// ./dist/index.cjs를 불러온다.
const pkg = require('cjs-package');

// ESM 환경
// ./esm/index.mjs를 불러온다.
import pkg from 'cjs-package';
```

### exports field 작성 시 주의!

#### exports field는 모두 .으로 시작하는 상대 경로로 작성

```json
// X
{
  "exports": {
    "sub-module": "dist/modules/sub-module.js"
  }
}

// O
{
  "exports": {
    ".": "./dist/index.js",
    "./sub-module": "./dist/modules/sub-module.js"
  }
}
```

#### Module System에 따라 올바른 확장자 사용

```json
// ESM은 .mjs로 명시해야함
{
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs"
    }
  }
}
// CJS는 .cjs로 명시해야함
{
  "type": "module"
  "exports": {
    ".": {
      "require": "./dist/index.cjs",
      "import": "./dist/index.js"
    }
  }
}
```

> CJS ? ESM ?
>
> - CJS: CommonJS
> - ESM: ECMAScript Modules

```json

```

```javascript

```

```json

```

```javascript

```
