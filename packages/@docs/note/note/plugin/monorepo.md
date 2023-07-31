# MonoRepo

## NX Workspace

확장 가능한 모노레포를 위한 도구
프레임워크의 성격이 짙다
기존 모노레포의 워크 플로우를 개선하거나 도와주는 툴이 아닌, 모든 워크 플로우를 탑재한 워크 스페이스, 저장소를 생성해서 써야 한다.

- CLI로 많은 기능을 제공
- 특정 패키지 또는 여러 패키지의 스크립트를 실행하는 기능
- 현재 커밋을 기준으로 영향을 받는 패키지에 대해서만 실행할 수 있는 기능 제공
- MonoRepo 안에 Next.js, NestJS, React 등 여러 프레임워크 사용 가능
- 해치를 벗어나는 순간 어렵다.

## Lerna

단일 저장소(Repository)에서 다양한 packages를 구성하는 것을 도와주는 라이브러리.
프로젝트 전체를 빌드하거나, 테스트할 때 변경이 있는 패키지들을 배포할 때 도움을 준다.
MonoRepo에서 git, npm과 같은 패키지 매니저를 사용하기 편리하도록 도와준다.

```json

// lerna.json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}

// root > packages.json
{
  "workspaces": [
   "packages/*"
  ]
}

 - lerna bootstrap
  : lerna는 bootstrap 명령어를 통해 로컬 패키지의 모든 종속성을 설치하고 상호 종속성을 연결할 수 있음.

```

## Yarn Workspace

모든 제어 권한이 사용자에게 있음
원하는대로 구성할 수 있지만 편리하진 않음.

- 초반 설정이 번거로움
- 나에게 맞는 워크 플로우를 구성할 수 있음.
- pnpm

lerna.json의 packages = package.json의 workspaces 경로가 같아야 한다.
