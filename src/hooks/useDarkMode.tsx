import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "recoil/ui";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    useEffect(() => {
        const isSystemThemeDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;

        return () => {
            if (isSystemThemeDark) {
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }
        };
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("bright-theme");
        } else {
            document.body.classList.add("bright-theme");
            document.body.classList.remove("dark-theme");
        }
    }, [darkMode]);

    return darkMode;
};

export default useDarkMode;
