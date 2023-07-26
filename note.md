# Yarn Workspace

NodeJS에서 MonoRepo를 관리하는 대표적인 방법으로 Lerna & Yarn Workspace

- Lerna는 각 패키지들을 배포하고 버전 관리하는 역할을 한다.
- yarn은 각 패키지 간의 의존성 관리 역할을 한다.

lerna 로도 의존성 관리를 할 수 있지만, 패키지 관리 시 이슈가 존재해서 각 도구가 서로 잘하는 역할만 하도록 설정한다.

## 디렉터리 구성

- lerna.json

  - 프로젝트 lerna 구성

- package.json

  - 하위 프로젝트들이 공통으로 사용할 dependencies 선언
  - 프로젝트 전체를 대상으로 하는 script

- packages
  - 하위 프로젝트들이 담길 상위 디렉터리
  - 수동/lerna create 패키지명 으로 자동 생성 모두 가능

## 패키지 추가 삭제

- project1에 패키지를 추가하고 싶은 경우
  : yarn workspace project1 add [패키지이름]

- project1에 패키지를 삭제하고 싶은 경우
  : yarn workspace project1 remove [패키지이름]

- 루트 디렉터리에 패키지를 추가하고 싶은 경우
  : yarn add [패키지이름] -W

## 패키지가 중복으로 설치되는 경우 호이스팅 된다.

`yarn workspace project1 add react`
`yarn workspace project2 add react`
project1, project2에 중복으로 설치되면, 각각의 node_modules에 패키지가 설치되지 않고, 루트의 경로의 node_modules에 추가된다.
중복(공통) 패키지는 루트 경로의 패키지로 호이스팅(상위로 끌여올려짐) 된다.

# Lerna

## lerna.json

lerna 관련 설정

단일 저장소(Repository)에서 다양한 packages를 구성하는 것을 도와주는 라이브러리.
프로젝트 전체를 빌드하거나, 테스트할 때 변경이 있는 패키지들을 배포할 때 도움을 준다.
MonoRepo에서 git, npm과 같은 패키지 매니저를 사용하기 편리하도록 도와준다.

- lerna bootstrap
  : lerna는 bootstrap 명령어를 통해 로컬 패키지의 모든 종속성을 설치하고 상호 종속성을 연결할 수 있다.
  yarn workspace를 같이 사용하면, lerna bootstrap 등의 명령을 실행하지 않으면서 더 안전하고 깔끔하게 패키지를 관리한다.

## json 설정 정리

### root/package.json

```json
// package.json
{
  "name": "root",
  "private": true, // NPM Repository로 배포되는 것을 막아줌
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/yjw8459/vue-component.git",
  "author": "yjw8459 <ryu01410@gmail.com>",
  "license": "MIT",
  "workspaces": ["packages/*"], // workspace에 담길 패키지를 지정한다.
  "dependencies": {
    "lerna": "^7.1.4"
  },
  "scripts": {
    "note:serve": "yarn workspace note serve" // 최상위에서 실행할 스크립트
  }
}
```

### root/lerna.json

```json

// lerna.json
{
  "packages": [
    "packages/*"
  ],
  "version": "independent", // 패키지 배포와 관련된 버전을 패키지 별로 독립적으로 가져가기 위한 설정
  "version": "0.0.0",
  "npmClient": "yarn",  // yarn을 사용하기 위한 설정
  "useWorkspaces": true // yarn workspace를 사용하기 위해
}

// root > packages.json
{
  "workspaces": [
   "packages/*"
  ]
}
```

# NX

확장 가능한 모노레포를 위한 도구
프레임워크의 성격이 짙다
기존 모노레포의 워크 플로우를 개선하거나 도와주는 툴이 아닌, 모든 워크 플로우를 탑재한 워크 스페이스, 저장소를 생성해서 써야 한다.

- CLI로 많은 기능을 제공
- 특정 패키지 또는 여러 패키지의 스크립트를 실행하는 기능
- 현재 커밋을 기준으로 영향을 받는 패키지에 대해서만 실행할 수 있는 기능 제공
- MonoRepo 안에 Next.js, NestJS, React 등 여러 프레임워크 사용 가능
- 해치를 벗어나는 순간 어렵다.

NX는 MonoRepo를 관리하는 plugin들을 제공하며 빠르게 project를 구성할 수 있도록 한다.
Dependency Graph, StoryBook, Testing-Library 등 기능을 제공한다.

### Dependency Graph

```bash
yarn nx graph
```

# Conventional Commits

Conventional Commits 스펙은 커밋 메세지에 곁들여진 가벼운 컨벤션으로 명확한 커밋 히스토리를 생성하기 위한 간단한 규칙을 제공한다.

- 커밋 히스토리를 이용한 자동화 도구를 만들 수 있음.
- 커밋 메세지에 신규 기능 추가, 문제 수정, 큰 변화가 있음을 기술함으로써 Sementic Versioning의 역할을 한다.

## Why Use Conventional Commits?

- CHANGELOG를 자동으로 생성한다.
- Simentic Versioning을 자동화 할 수 있다.
- 팀 동료, 타인 등에게 변화의 본질을 전달할 수 있다.
- 빌드 배포 프로세스를 수행할 수 있다.
- 구조화 된 커밋 히스토리로 프로젝트에 기여하기 더 쉽도록한다.

## 구조

```text
<타입>[적용 범위(선택 사항)]: <설명>

[본문(선택 사항)]

[꼬리말(선택 사항)]
```

## 타입

### fix

코드베이스에서 버그를 패치하는 `fix` 타입의 커밋
Simentic Versioning에서 `PATCH`와 관련

### feat

코드베이스에서 새 기능이 추가되는 `feat` 타입의 커밋
Simentic Versioning에서 `MINOR`와 관련

### BREAKING CHANGE

`BREAKING CHANGE:` 라는 꼬리말을 가지거나 타입/스코프 뒤에 `!`문자열을 붙인 커밋은 단절적 API 변경(breaking API change)가 있음을 알린다.
어떤 커밋 타입에도 BREAKING CHANGE는 해당 커밋에 포함할 수 있다.
Simentic Versioning에서 `MAJOR`와 관련

커밋 메세지와 BREAKING CHANGE 꼬리말을 가지는 커밋 메세지

```bash
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

BREAKING CHANGE 에 주의를 주기 위해 `!`를 포함한 커밋 메세지

```bash
feat!: send an email to the customer when a product is shipped
```

BREAKING CHANGE 꼬리말과 `!`를 함께 포함한 커밋 메세지

```bash
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

### 그 외

그 외에도 아래의 타입을 사용할 것을 권장

- build: 시스템 또는 외부 종속성에 영향을 미치는 변경사항(npm, gulp, yarn)
- chore: 코드 수정 없이 설정 변경
- ci: ci구성파일 및 스크립트 변경
- docs: documentation 변경
- style: 코드 의미에 영향을 주지 않는 변경사항
- refactor: 버그를 수정하거나 기능을 추가하지 않는 코드 변경, 리팩토링
- perf: 성능 개선
- test: 누락된 테스트 추가 또는 기존 테스트 수정

위 타입의 경우 컨벤션 커밋 규격에 의무화되지 않고, Simentic Versioning에 잠재적인 영향을 주지 않음(BREAKING CHANGE가 포함되지 않을 때).
추가적인 문맥 정보를 제공하기 위한 목적으로 사용되는 적용 범위는 커밋의 타입에 덧붙일 수 있다.

적용 범위를 덧붙일 땐, `()`를 사용한다.

적용 범위를 가지는 커밋 메세지

```bash
# 1
feat(parser): 배열에 기능 추가

# 2
feat(lang): add polish language
```

본문이 없는 커밋 메세지

```bash
docs: correct spelling of CHANGELOG
```

## 규칙

1. 모든 커밋에는 `feat`, `fix` 같은 명사로 된 접두어를 포함해야 하고 그 뒤로 선택 사항인 적용 범위, `!`, 그리고 필수인 `:`과 공백이 있어야 한다.
2. 적용 범위는 타입 다음에 기술한다. 그리고 적용되는 영역을 기술하는 명사로 괄호에 감싸져야 한다.(ex. fix(parser))
3. 설명은 타입/적용 범위 접두어 뒤에 있는 `:`과 공백 다음에 작성되어야 한다.(ex. fix(order): 버그수정)
4. 더 긴 커밋 본문은 설명 다음에 위치할 수 있으며, 코드 변경 사항에 대한 추가적인 정보를 작성한다.
   본문은 반드시 설명 다음 빈 행으로 시작한다.

```bash
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

Reference

- https://www.conventionalcommits.org/ko/v1.0.0/
