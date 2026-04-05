# 스킬: 팝업 시스템

## 개요

이 프로젝트의 UI는 드래그 가능한 팝업 창들로 구성됩니다. 팝업은 `Popup` 또는 `ScrollTargetPopup` 컴포넌트를 사용하며, 위치 배치·Z-index·셔플 애니메이션이 자동 관리됩니다.

## 팝업 컴포넌트 Props

```tsx
interface PopupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    index: number;              // 팝업 고유 순서 (Z-index 계산에 사용)
    title?: string;             // 팝업 헤더 제목
    isActive?: boolean;         // 초기 열림 여부 (기본: true)
    isDraggable?: boolean;      // 드래그 허용 여부 (기본: true)
    isRandomPosition?: boolean | number; // 셔플 트리거 (숫자 변경 시 재배치)
    buttons?: ReactNode[];      // 헤더 커스텀 버튼
    onClickClose?: () => void;  // 닫기 버튼 콜백
    popupRef?: RefObject<HTMLDivElement>;
}
```

## 기본 사용법

```tsx
// profile 페이지 패턴
<ScrollTargetPopup
    id="popup__about"
    title="ABOUT"
    isActive={true}          // 첫 번째만 true
    isRandomPosition={shuffleTrigger}
    index={1}
    style={{ order: 1 }}
>
    <p>{getLocalizedText(item, language)}</p>
</ScrollTargetPopup>
```

## 위치 배치 알고리즘 (`src/libs/positionHandler.ts`)

팝업이 마운트될 때 자동으로 겹치지 않는 위치를 계산합니다.

| 항목 | 값 |
|------|----|
| 겹침 허용 임계값 | 30% |
| 최대 시도 횟수 | 화면 밀도에 따라 50~100회 |
| 화면 가장자리 안전 마진 | 60px |

**팝업 추가/제거 시 반드시 호출해야 하는 함수:**

```tsx
import { clearAllPositions } from "libs/positionHandler";

// 셔플 버튼 클릭 시
clearAllPositions();
setShuffleTrigger(prev => prev + 1);

// 페이지 마운트 시 (깨끗한 상태 보장)
useEffect(() => {
    clearAllPositions();
}, []);
```

## Z-index 관리

클릭된 팝업이 최상단으로 올라오는 로직은 Recoil로 관리됩니다.

```tsx
// recoil/ui.ts
popupOverlayState: atom<number>         // 현재 최상단 z-index (기본: 999)
currentActivePopupState: atom<HTMLDivElement | null>  // 현재 활성 팝업
```

이 상태는 `Popup` 컴포넌트 내부에서 자동 처리하므로 직접 조작하지 않습니다.

## 셔플 기능

```tsx
const [shuffleTrigger, setShuffleTrigger] = useState<number>(0);

// isRandomPosition에 숫자를 넘기면 변화 감지 → 재배치 실행
<ScrollTargetPopup isRandomPosition={shuffleTrigger} ...>

// 셔플 버튼
<ShuffleButton onClick={() => {
    clearAllPositions();
    setShuffleTrigger(prev => prev + 1);
}} />
```

## 새 팝업 페이지 추가 시 체크리스트

- [ ] `index` prop에 고유한 순서 번호 부여
- [ ] 페이지 마운트 `useEffect`에서 `clearAllPositions()` 호출
- [ ] `shuffleTrigger` 상태와 `ShuffleButton` 연결
- [ ] 첫 번째 팝업만 `isActive={true}`, 나머지는 기본값 유지
