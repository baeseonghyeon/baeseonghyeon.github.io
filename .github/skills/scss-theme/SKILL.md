# 스킬: SCSS 테마 시스템

## 파일 구조

```
src/styles/
├── globals.scss          ← 전역 스타일, 테마 클래스 적용
└── base/
    ├── _variables.scss   ← SCSS 변수 ($fs-m, $fw 등)
    └── _mixins.scss      ← 미디어 쿼리, 컬러 믹스인
```

## 컴포넌트에서 변수/믹스인 사용하기

```scss
// 컴포넌트 scss 파일 상단에 import
@import "../../styles/base/variables";  // 경로는 깊이에 맞게 조정
@import "../../styles/base/mixins";
// 또는 tsconfig paths가 설정된 경우 절대경로 사용 가능
```

---

## CSS 변수 (런타임, 테마에 따라 값 변동)

다크/라이트 모드에 따라 자동으로 바뀌는 값들입니다. 색상은 항상 이 변수를 사용하세요.

| 변수 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `var(--background-color)` | `#fff` | `#171717` | 배경 |
| `var(--on-background-color)` | `#222` | `#eee` | 텍스트, 아이콘 |
| `var(--blue-color)` | `#323efd` | `#0078ff` | 링크, 강조 |
| `var(--shadow-color)` | `#777777` | `#000` | 그림자 |
| `var(--lightgray-color)` | `#ddd` | `#333` | 구분선, 보조 배경 |
| `var(--gray-color)` | `#969696` | `#7e7e7e` | 보조 텍스트 |

```scss
.container {
    background-color: var(--background-color);
    color: var(--on-background-color);
    border: 1.5px solid var(--on-background-color);
}
```

---

## SCSS 변수 (빌드타임, 고정값)

### 폰트 크기

| 변수 | 값 | 모바일 |
|------|----|--------|
| `$fs-xs` | `0.9rem` | `$fs-xs-mobile: 0.7rem` |
| `$fs-s` | `1rem` | `$fs-s-mobile: 0.8rem` |
| `$fs-m` | `1.1rem` (기본) | `$fs-m-mobile: 0.95rem` |
| `$fs-l` | `1.3rem` | `$fs-l-mobile: 1.15rem` |

### 기타

```scss
$fw: 500;         // 기본 폰트 웨이트
$lh-m: 1.6;       // 기본 줄간격
$bw: 1.5px;       // 기본 테두리 두께
$z-layout: 999;   // 레이아웃 기본 z-index
```

---

## 미디어 쿼리 믹스인

| 믹스인 | 범위 |
|--------|------|
| `@include media-mobile` | `max-width: 480px` |
| `@include media-tablet` | `480px ~ 844px` |
| `@include media-desktop` | `min-width: 1280px` |
| `@include media-not-mobile` | `min-width: 845px` |
| `@include media-not-desktop` | `max-width: 843px` |

```scss
.container {
    font-size: $fs-m;

    @include media-mobile {
        font-size: $fs-m-mobile;
    }
}
```

---

## 다크모드 대응 패턴

CSS 변수(`var(--)`)를 사용하면 다크모드가 자동 적용됩니다. 별도 분기가 필요한 경우에만 아래 패턴을 사용하세요.

```scss
// CSS 변수로 해결 안 되는 경우에만 (이미지 필터, 특수 색상 등)
.icon {
    filter: invert(0);

    :global(.dark-theme) & {
        filter: invert(1);
    }
}
```

---

## 공통 컴포넌트 스타일 (`@include shadow-outline`)

팝업, 카드 등 테두리+배경이 있는 컴포넌트에 사용합니다.

```scss
.popup {
    @include shadow-outline(1);
    // 결과: border: 1.5px solid var(--on-background-color)
    //        background: var(--background-color)
    //        모바일에서는 border 제거, border-top만 유지
}
```

---

## 주의사항

- 색상 하드코딩 금지 — 반드시 CSS 변수 또는 SCSS 변수 사용
- 폰트 크기 직접 수치 지정 금지 — `$fs-*` 변수 사용
- `transition: all` 은 `globals.scss`에서 전역으로 이미 설정됨 (0.2s ease)
