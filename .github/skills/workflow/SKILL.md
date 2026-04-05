# 워크플로우 가이드 (항상 활성)

## 브랜치 전략

```
main ← dev ← feature/#이슈번호-설명
```

- 모든 작업은 `dev` 기준으로 feature 브랜치를 생성
- PR base는 반드시 `dev`
- `main`에는 직접 커밋하지 않음

## 작업 순서

```
0 계획 → 1 코드 작성 → 2 단위 테스트 → 3 정적 검증 → 4 커밋/PR
```

### 0. 계획
- 변경 범위를 먼저 파악 (영향받는 컴포넌트, 데이터 파일, 타입 확인)
- 다국어 텍스트 추가가 필요한지 판단

### 1. 코드 작성
- 관련 스킬 파일 먼저 참조
- 새 컴포넌트: `.github/skills/component/SKILL.md`
- 팝업 관련: `.github/skills/popup-system/SKILL.md`
- 텍스트 추가: `.github/skills/multilingual/SKILL.md`
- 데이터 추가: `.github/skills/data/SKILL.md`

### 2. 단위 테스트
- 순수 함수(`src/libs/`) 변경 시 테스트 필수
- 패턴: `.github/skills/testing/SKILL.md`

### 3. 정적 검증 (커밋 전 필수)
```bash
npm run lint && npm run build
```
실패 시 step 1로 돌아가 수정. **통과 전 커밋 금지.**

### 4. 커밋 / PR

```bash
# feature 브랜치 생성
git checkout -b feature/#이슈번호-설명

# 커밋
git add [파일명]
git commit -m "feat: 변경 내용 요약"

# PR 생성 (base: dev)
gh pr create --base dev
```

## 커밋 메시지 컨벤션

| prefix | 용도 |
|--------|------|
| `feat:` | 새 기능 |
| `fix:` | 버그 수정 |
| `chore:` | 설정, 스크립트 등 기타 |
| `style:` | 스타일(CSS) 변경 |
| `refactor:` | 동작 변경 없는 코드 개선 |

## 배포

```bash
npm run deploy
# main 브랜치에서 실행
# next build → next export → out/ → gh-pages 브랜치 push
```
