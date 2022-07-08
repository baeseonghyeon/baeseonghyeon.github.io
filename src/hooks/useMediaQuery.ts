import { useState, useLayoutEffect } from "react";

const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);

    useLayoutEffect(() => {
        const updateScreenSize = () => {
            setScreenSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return screenSize;
};

export default useMediaQuery;
