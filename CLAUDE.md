# baeseonghyeon.github.io — Claude Code Instructions

## 프로젝트 개요

배성현의 개인 포트폴리오 웹사이트. **Next.js 13 + TypeScript + SCSS Modules + Recoil** 스택으로 구성되며, GitHub Pages에 정적 배포됩니다.

## 페르소나

- **모든 설명과 코드 내 주석은 한국어(Korean)로 작성하세요.**
- 요청받지 않은 전역 설정 파일(`package.json`, `tsconfig.json`, `next.config.js` 등)은 임의로 수정하지 마세요. 수정이 필요하면 이유를 먼저 제안.
- 디자인/스타일은 요청받지 않은 한 임의 수정 금지.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 13 (Pages Router) |
| 언어 | TypeScript |
| 스타일 | SCSS Modules + classnames/bind |
| 상태관리 | Recoil |
| 테스트 | Jest + React Testing Library |
| 배포 | GitHub Pages (`next export` + git subtree push) |

## 핵심 파일 위치

| 역할 | 경로 |
|------|------|
| 타입 정의 | `src/interface/` |
| 순수 유틸 | `src/libs/` |
| 커스텀 훅 | `src/libs/` (`use*.ts`) |
| 전역 상태 | `src/recoil/ui.ts` |
| 콘텐츠 데이터 | `src/data/profile.json`, `src/data/work.json` |

## 코드 작성 규칙

- SCSS는 CSS Modules 방식. `classnames/bind`로 바인딩 후 `cn()` 사용.
- 컴포넌트는 `src/components/[컴포넌트명]/` 디렉토리에 tsx + scss 함께 배치.
- 성능 최적화: `React.memo`, `useCallback`, `useMemo` 적극 활용.
- Hydration 에러 방지: Recoil atom 기본값은 서버/클라이언트에서 동일하게 설정.

## 다국어 처리 규칙

이 프로젝트는 i18n 라이브러리 없이 **JSON 데이터 파일의 `ko`/`en`/`jp` 키**로 텍스트를 관리합니다.

- **UI에 새 텍스트 추가 시 ko/en/jp 세 가지를 반드시 동시에 작성** (누락 시 의도치 않은 언어 노출)
- 텍스트 렌더링은 반드시 `getLocalizedText(content, language)` 사용 (`src/libs/languageHelper.ts`)
- 언어 상태는 `languageState` (Recoil), 직접 `setLanguage` 호출 금지

## 자동 로드 스킬 (항상 활성)

@.github/skills/workflow/SKILL.md

## 스킬 카탈로그

코드 작업 전 관련 스킬을 직접 참조하세요.

| 스킬 | 경로 | 사용 시점 |
|------|------|-----------|
| 컴포넌트 생성 | `.github/skills/component/SKILL.md` | 새 컴포넌트 추가 시 |
| 팝업 시스템 | `.github/skills/popup-system/SKILL.md` | 팝업 추가/수정 시 |
| 다국어 처리 | `.github/skills/multilingual/SKILL.md` | 텍스트 콘텐츠 추가 시 |
| 데이터 추가 | `.github/skills/data/SKILL.md` | 포트폴리오 항목 추가 시 |
| SCSS 테마 | `.github/skills/scss-theme/SKILL.md` | 컴포넌트 스타일 작성 시 |
| 테스트 작성 | `.github/skills/testing/SKILL.md` | 단위 테스트 작성 시 |
