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
