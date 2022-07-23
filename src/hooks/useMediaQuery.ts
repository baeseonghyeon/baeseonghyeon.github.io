import { useState, useLayoutEffect } from "react";

const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);
    const [isPcScreenSize, setIsPcScreenSize] = useState<boolean>();

    useLayoutEffect(() => {
        const updateScreenSize = () => {
            setScreenSize([window.innerWidth, window.innerHeight]);
            setIsPcScreenSize(screenSize[0] > 768);
        };
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return { screenSize, isPcScreenSize };
};

export default useMediaQuery;
