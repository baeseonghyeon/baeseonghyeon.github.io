import { useState, useLayoutEffect } from "react";

const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);
    let isPcScreenSize = screenSize[0] > 768;

    useLayoutEffect(() => {
        const updateScreenSize = () => {
            setScreenSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return { screenSize, isPcScreenSize };
};

export default useMediaQuery;
