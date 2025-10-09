export const setPositionRandom = (element: HTMLDivElement) => {
    // 팝업의 실제 크기를 가져옵니다
    const popupWidth = element.offsetWidth || 300; // 기본값 300px
    const popupHeight = element.offsetHeight || 200; // 기본값 200px

    // 화면 크기와 안전 마진을 설정합니다
    const safeMargin = 20; // 화면 가장자리로부터의 최소 거리
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 최대 이동 가능 범위를 계산합니다 (음수 방지)
    const maxLeft = Math.max(
        safeMargin,
        viewportWidth - popupWidth - safeMargin,
    );
    const maxTop = Math.max(
        safeMargin,
        viewportHeight - popupHeight - safeMargin,
    );

    // 랜덤 위치를 계산합니다 (safeMargin부터 maxLeft/maxTop 사이)
    const randomLeft =
        Math.floor(Math.random() * (maxLeft - safeMargin)) + safeMargin;
    const randomTop =
        Math.floor(Math.random() * (maxTop - safeMargin)) + safeMargin;

    // 위치를 설정합니다
    element.style.left = `${Math.max(
        safeMargin,
        Math.min(randomLeft, maxLeft),
    )}px`;
    element.style.top = `${Math.max(
        safeMargin,
        Math.min(randomTop, maxTop),
    )}px`;
};
