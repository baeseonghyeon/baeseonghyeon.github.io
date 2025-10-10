import { useState, useLayoutEffect, useCallback, useMemo } from "react";

const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);

    // isPcScreenSize를 useMemo로 메모이제이션
    const isPcScreenSize = useMemo(() => screenSize[0] > 768, [screenSize]);

    useLayoutEffect(() => {
        // throttle을 위한 변수
        let timeoutId: NodeJS.Timeout | null = null;

        const updateScreenSize = () => {
            setScreenSize([window.innerWidth, window.innerHeight]);
        };

        // throttle된 resize 핸들러 (100ms)
        const throttledResize = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                updateScreenSize();
                timeoutId = null;
            }, 100);
        };

        // passive listener로 성능 향상
        window.addEventListener("resize", throttledResize, { passive: true });
        updateScreenSize();

        return () => {
            window.removeEventListener("resize", throttledResize);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return { screenSize, isPcScreenSize };
};

export default useMediaQuery;
