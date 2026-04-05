# 스킬: 다국어 처리 패턴

## 개요

이 프로젝트는 i18n 라이브러리 없이 JSON 데이터 파일과 `getLocalizedText()` 헬퍼로 ko/en/jp 3개 언어를 지원합니다.

## 핵심 타입 (`src/interface/index.ts`)

```typescript
interface MultilingualContent {
    ko?: string;
    en?: string;
    jp?: string;
    common?: string;  // 언어 무관 공통 텍스트 (고유명사 등)
}
```

## getLocalizedText 사용법 (`src/libs/languageHelper.ts`)

```tsx
import { getLocalizedText } from "libs/languageHelper";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";

const language = useRecoilValue(languageState);

// content가 MultilingualContent 타입이면 됨
const text = getLocalizedText(content, language);
```

**fallback 체인**: 현재 언어 → (jp인 경우 en으로) → en → ko → common

## 데이터 파일 구조

텍스트 콘텐츠는 `src/data/` JSON 파일에 위치합니다.

```json
// profile.json 예시
{
  "text": [
    {
      "sort": 1,
      "common": "bae-seonghyeon",
      "ko": "배성현은 웹과 앱을 만드는 프론트엔드 엔지니어입니다.",
      "en": "Bae Seonghyeon is a frontend engineer...",
      "jp": "ベ・ソンヒョンは..."
    }
  ]
}
```

## 새 텍스트 추가 규칙

**IMPORTANT: ko/en/jp 세 가지를 반드시 동시에 작성**합니다. 하나라도 누락 시 fallback으로 처리되어 의도치 않은 언어가 노출됩니다.

```json
{
  "ko": "한국어 텍스트",
  "en": "English text",
  "jp": "日本語テキスト"
}
```

고유명사(이름, 브랜드)처럼 번역이 필요 없는 경우 `common`만 사용해도 됩니다.

```json
{
  "common": "React"
}
```

## 언어 상태 (`src/recoil/ui.ts`)

```typescript
languageState: atom<Language>  // 기본값: Language.ko
```

언어 전환은 `DarkModeLanguageToggle` 컴포넌트에서만 처리합니다. 직접 `setLanguage`를 호출하지 마세요.

## 언어별 순환 순서

```
ko → en → jp → ko (반복)
```

토글 버튼은 "다음 언어"를 라벨로 표시합니다 (현재 ko면 "EN" 표시).
