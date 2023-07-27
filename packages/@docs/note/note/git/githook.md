# Git Hooks

Git에 액션을 취할 때, 설정한 정책을 강제할 수 있다.

## About

Git Hooks는 Git과 관련한 어떤 이벤트가 발생했을 때 특정 스크립트를 실행할 수 있도록 하는 기능이다.
크게 `클라이언트 훅`, `서버 훅`으로 나뉜다.

## 클라이언트 훅

Commit, Merge, Push가 발생하기 전 클라이언트에서 실행하는 훅.

### 분류

- 커밋 워크플로 훅
- 이메일 워크플로 훅
- 기타 훅

#### 커밋 워크플로 훅

`git commit` 명령으로 커밋할 때 실행하는 훅

- pre-commit: commit을 실행하기 전에 실행
- prepare-commit-msg: commit 메시지를 생성하고 편집기를 실행하기 전에 실행
- commit-msg: commit 메시지를 완성한 후 commit을 최종 완료하기 전에 실행
- post-commit: commit을 완료한 후 실행

#### 이메일 워크플로 훅

`git am` 명령으로 이메일을 통해 patch 파일을 적용할 때 실행하는 훅

- applypatch-msg: git am 명령 실행 시 가장 먼저 실행
- pre-applypatch: patch 적용 후 실행하며, patch 를 중단시킬 수 있음
- post-applypatch: git am 명령에서 마지막으로 실행하며, patch 를 중단시킬 수 없음

#### 기타 훅

Rebase, Merge, Push와 같은 이벤트를 실행할 때 실행하는 훅을 포함한다.

- pre-rebase: Rebase 하기 전에 실행
- post-rewrite: git commit –amend, git rebase 와 같이 커밋을 변경하는 명령을 실행한 후 실행
- post-merge: Merge 가 끝나고 나서 실행
- pre-push: git push 명령 실행 시 동작하며 리모트 정보를 업데이트 하고 난 후 리모트로 데이터를 전송하기 전에 실행. push 를 중단시킬 수 있음

## 서버 훅

Git Repository로 Push가 발생했을 때 서버에서 실행하는 훅.
Git Repository 서버를 관리할 수 있는 권한이 있는 경우 서버 훅을 사용하는 것이 유용하다.
Git Repository 서버에 있는 모든 프로젝트에 대해 Push 정책을 설정할 수 있기 때문이다.

## husky

husky를 사용하면 Git Hooks를 보다 쉽게 적용할 수 있다.
commit, push 정책을 관리하고 공유할 수 있다.

