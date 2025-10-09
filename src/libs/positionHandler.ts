// 상수 정의
const OVERLAP_THRESHOLD = 0.3; // 30% 이상 겹치면 충돌로 판정
const SAFE_MARGIN = 60; // 화면 가장자리로부터의 최소 거리
const BASE_MAX_ATTEMPTS = 100; // 기본 최대 시도 횟수
const DEFAULT_POPUP_WIDTH = 500;
const DEFAULT_POPUP_HEIGHT = 330;
const DENSITY_THRESHOLD = 0.6; // 화면의 60% 이상 차면 밀도가 높다고 판단

// 이미 배치된 팝업들의 위치를 저장 (면적 포함하여 캐싱)
interface PopupPosition {
    left: number;
    top: number;
    width: number;
    height: number;
    area: number; // 면적 캐싱
}

const occupiedPositions: PopupPosition[] = [];

// 두 영역이 심하게 겹치는지 확인하는 함수 (살짝 겹치는 건 허용)
const isOverlapping = (
    rect1: { left: number; top: number; width: number; height: number },
    rect2: PopupPosition,
): boolean => {
    // 겹치는 영역 계산
    const overlapLeft = Math.max(rect1.left, rect2.left);
    const overlapRight = Math.min(
        rect1.left + rect1.width,
        rect2.left + rect2.width,
    );

    // 겹치지 않으면 조기 종료 (Y축 체크 전에)
    if (overlapLeft >= overlapRight) {
        return false;
    }

    const overlapTop = Math.max(rect1.top, rect2.top);
    const overlapBottom = Math.min(
        rect1.top + rect1.height,
        rect2.top + rect2.height,
    );

    // 겹치지 않으면 false
    if (overlapTop >= overlapBottom) {
        return false;
    }

    // 겹치는 영역의 넓이
    const overlapArea =
        (overlapRight - overlapLeft) * (overlapBottom - overlapTop);

    // rect1의 면적 계산
    const area1 = rect1.width * rect1.height;

    // 더 작은 팝업 기준으로 겹침 비율 계산 (rect2.area는 캐싱됨)
    const minArea = Math.min(area1, rect2.area);
    const overlapRatio = overlapArea / minArea;

    // 30% 이상 겹치면 true (충돌)
    return overlapRatio > OVERLAP_THRESHOLD;
};

// 화면 밀도 계산 (팝업이 화면을 얼마나 차지하는지)
const calculateScreenDensity = (
    viewportWidth: number,
    viewportHeight: number,
): number => {
    const viewportArea = viewportWidth * viewportHeight;
    const occupiedArea = occupiedPositions.reduce(
        (sum, pos) => sum + pos.area,
        0,
    );
    return occupiedArea / viewportArea;
};

// 겹치지 않는 랜덤 위치를 찾는 함수
const findNonOverlappingPosition = (
    popupWidth: number,
    popupHeight: number,
    viewportWidth: number,
    viewportHeight: number,
    safeMargin: number = SAFE_MARGIN,
): { left: number; top: number } => {
    const maxLeft = Math.max(
        safeMargin,
        viewportWidth - popupWidth - safeMargin,
    );
    const maxTop = Math.max(
        safeMargin,
        viewportHeight - popupHeight - safeMargin,
    );

    // 가용 공간이 너무 작으면 바로 랜덤 분산 배치로
    if (maxLeft < safeMargin * 2 || maxTop < safeMargin * 2) {
        return getRandomDistributedPosition(maxLeft, maxTop, safeMargin);
    }

    // 화면 밀도 확인
    const density = calculateScreenDensity(viewportWidth, viewportHeight);

    // 밀도에 따라 시도 횟수 동적 조정
    // 밀도가 높을수록 시도 횟수를 줄여 성능 개선
    // 밀도가 낮을 때: 100회, 높을 때(60%+): 50회
    const maxAttempts =
        density > DENSITY_THRESHOLD
            ? Math.floor(BASE_MAX_ATTEMPTS * 0.5)
            : BASE_MAX_ATTEMPTS;

    // 새 위치 객체 재사용 (매번 생성하지 않음)
    const newPosition = {
        left: 0,
        top: 0,
        width: popupWidth,
        height: popupHeight,
    };

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        newPosition.left =
            Math.floor(Math.random() * (maxLeft - safeMargin)) + safeMargin;
        newPosition.top =
            Math.floor(Math.random() * (maxTop - safeMargin)) + safeMargin;

        // 다른 팝업들과 겹치는지 확인 (some은 조기 종료됨)
        const hasOverlap = occupiedPositions.some((pos) =>
            isOverlapping(newPosition, pos),
        );

        if (!hasOverlap) {
            return { left: newPosition.left, top: newPosition.top };
        }
    }

    // 겹치지 않는 위치를 찾지 못한 경우에도 완전 랜덤하게 배치 (약간 겹쳐도 OK)
    return {
        left: Math.floor(Math.random() * (maxLeft - safeMargin)) + safeMargin,
        top: Math.floor(Math.random() * (maxTop - safeMargin)) + safeMargin,
    };
};

// 완전 랜덤 배치 (그리드 느낌 제거)
const getRandomDistributedPosition = (
    maxLeft: number,
    maxTop: number,
    safeMargin: number,
): { left: number; top: number } => {
    // 화면 전체에서 완전히 랜덤한 위치 (이미 계산된 maxLeft, maxTop 사용)
    return {
        left: Math.floor(safeMargin + Math.random() * (maxLeft - safeMargin)),
        top: Math.floor(safeMargin + Math.random() * (maxTop - safeMargin)),
    };
};

export const setPositionRandom = (element: HTMLDivElement) => {
    // 팝업의 실제 크기를 가져옵니다
    const popupWidth = element.offsetWidth || DEFAULT_POPUP_WIDTH;
    const popupHeight = element.offsetHeight || DEFAULT_POPUP_HEIGHT;

    // 화면 크기
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 겹치지 않는 위치 찾기
    const position = findNonOverlappingPosition(
        popupWidth,
        popupHeight,
        viewportWidth,
        viewportHeight,
    );

    // 위치를 설정합니다
    element.style.left = `${position.left}px`;
    element.style.top = `${position.top}px`;

    // 배치된 위치를 저장 (면적 포함)
    const area = popupWidth * popupHeight;
    occupiedPositions.push({
        left: position.left,
        top: position.top,
        width: popupWidth,
        height: popupHeight,
        area,
    });
};

// 팝업이 닫힐 때 위치를 제거하는 함수 (필요시 사용)
export const removePosition = (element: HTMLDivElement) => {
    const left = parseInt(element.style.left);
    const top = parseInt(element.style.top);

    const index = occupiedPositions.findIndex(
        (pos) => pos.left === left && pos.top === top,
    );

    if (index !== -1) {
        occupiedPositions.splice(index, 1);
    }
};

// 모든 위치를 초기화하는 함수 (셔플 버튼용)
// 팝업 수에 관계없이 메모리 효율적으로 초기화
export const clearAllPositions = () => {
    // 배열의 길이를 0으로 설정하여 메모리 해제 (splice(0)보다 빠름)
    occupiedPositions.length = 0;
};

// 현재 배치된 팝업 수 조회 (디버깅/모니터링용)
export const getOccupiedCount = (): number => {
    return occupiedPositions.length;
};
