export const setPositionRandom = (element: HTMLDivElement) => {
    element.style.left = `${Math.floor(
        Math.random() * (window.innerWidth - element.offsetWidth),
    )}px`;
    element.style.top = `${Math.floor(
        Math.random() * (window.innerHeight - element.offsetHeight * 1.2),
    )}px`;
};
