# 스킬: 컴포넌트 생성 패턴

## 디렉토리 구조

컴포넌트는 `src/components/[컴포넌트명]/` 아래에 tsx와 scss를 함께 배치합니다.

```
src/components/
└── myComponent/
    ├── myComponent.tsx
    └── myComponent.module.scss
```

## 기본 템플릿

```tsx
import cb from "classnames/bind";
import styles from "./myComponent.module.scss";
import { memo } from "react";

const cn = cb.bind(styles);

export interface MyComponentProps {
    // 필수 props
    title: string;
    // 선택 props
    className?: string;
    onClick?: () => void;
}

const MyComponent = (props: MyComponentProps) => {
    const { title, className, onClick } = props;

    return (
        <div className={cn("container", className)} onClick={onClick}>
            {title}
        </div>
    );
};

// 부모로부터 자주 리렌더링되는 컴포넌트에만 memo 적용
export default memo(MyComponent);
```

## 성능 최적화 규칙

- **`React.memo`**: props가 자주 바뀌지 않는 순수 표시용 컴포넌트에 적용
- **`useCallback`**: 이벤트 핸들러, 자식 컴포넌트에 넘기는 함수
- **`useMemo`**: 언어/필터에 따라 파생되는 표시 값, 무거운 계산

```tsx
// 이벤트 핸들러
const handleClick = useCallback(() => {
    doSomething(value);
}, [value]);

// 파생 표시값 (언어 관련)
const displayText = useMemo(
    () => getLocalizedText(content, language),
    [content, language]
);
```

## Recoil 상태 사용 시

```tsx
import { useRecoilValue, useRecoilState } from "recoil";
import { languageState, darkModeState } from "recoil/ui";

// 읽기만: useRecoilValue
const language = useRecoilValue(languageState);

// 읽기 + 쓰기: useRecoilState
const [darkMode, setDarkMode] = useRecoilState(darkModeState);
```

## SCSS 모듈 패턴

```scss
// myComponent.module.scss

.container {
    // 기본 스타일

    // 조건부 modifier
    &.is-active {
        opacity: 1;
    }

    // 다크모드: body 클래스로 분기
    :global(.dark-theme) & {
        background-color: var(--bg-dark);
    }
}
```

## 주의사항

- `typeof window !== 'undefined'` 체크는 SSR/CSR 분기가 필요한 경우에만 사용
- Hydration 에러 방지: atom 기본값은 서버/클라이언트에서 동일해야 함
- 이미지는 `ContentImage` 컴포넌트 사용 (Imgur URL 변환 포함)
- 외부 링크 터치 이벤트는 `touchRedirect` (`src/libs/touchHandler.ts`) 사용
