# 스킬: 테스트 작성 패턴 (Jest + React Testing Library)

## 환경

- **Jest 28** + **jest-environment-jsdom**
- **React Testing Library 13**
- 설정: `jest.config.js`, `jest.setup.js`
- 실행: `npm run test:ci`

## 테스트 파일 위치

테스트할 파일 옆에 `__tests__/` 디렉토리를 만들어 배치합니다.

```
src/libs/
├── languageHelper.ts
└── __tests__/
    └── languageHelper.test.ts

src/components/filterButton/
├── filterButton.tsx
└── __tests__/
    └── filterButton.test.tsx
```

## 순수 함수 테스트 (libs/)

`src/libs/`의 유틸 함수들은 순수 함수로 단위 테스트하기 가장 쉽습니다.

```typescript
// languageHelper.test.ts
import { getLocalizedText } from "../languageHelper";
import { Language } from "interface/enums";

describe("getLocalizedText", () => {
    it("현재 언어의 텍스트를 반환한다", () => {
        const content = { ko: "안녕", en: "Hello", jp: "こんにちは" };
        expect(getLocalizedText(content, Language.ko)).toBe("안녕");
    });

    it("jp 텍스트가 없으면 en으로 fallback한다", () => {
        const content = { ko: "안녕", en: "Hello" };
        expect(getLocalizedText(content, Language.jp)).toBe("Hello");
    });

    it("content가 undefined면 빈 문자열을 반환한다", () => {
        expect(getLocalizedText(undefined, Language.ko)).toBe("");
    });
});
```

## 컴포넌트 테스트

Recoil 상태를 사용하는 컴포넌트는 `RecoilRoot`로 감싸야 합니다.

```tsx
// filterButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import FilterButton from "../filterButton";

const renderWithRecoil = (ui: React.ReactElement) =>
    render(<RecoilRoot>{ui}</RecoilRoot>);

describe("FilterButton", () => {
    it("label 텍스트를 렌더링한다", () => {
        renderWithRecoil(<FilterButton label="Web" filterValue="Web" />);
        expect(screen.getByText("Web")).toBeInTheDocument();
    });

    it("클릭 시 onClick 콜백을 호출한다", () => {
        const handleClick = jest.fn();
        renderWithRecoil(
            <FilterButton label="Web" filterValue="Web" onClick={handleClick} />
        );
        fireEvent.click(screen.getByText("Web"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

## 테스트 우선순위

이 프로젝트에서 테스트 효과가 높은 순서:

1. **`src/libs/`** — 순수 함수, 외부 의존성 없음 (positionHandler, languageHelper, textParser)
2. **단순 UI 컴포넌트** — FilterButton, ShuffleButton, ScrollToTopButton 등
3. **커스텀 훅** — `useDarkMode`, `useMediaQuery`

팝업 시스템(`Popup`, `positionHandler`)은 DOM 레이아웃 의존성이 높아 테스트 비용이 큽니다. 우선순위 낮게 처리하세요.

## 주의사항

- `window.matchMedia`는 jsdom에서 미지원 → 모킹 필요
  ```typescript
  Object.defineProperty(window, "matchMedia", {
      value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
      })),
  });
  ```
- `react-draggable`은 DOM 레이아웃 의존 → 팝업 테스트 시 주의
