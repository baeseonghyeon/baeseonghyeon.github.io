import { darkModeStateCookieKey, getCookie } from "libs/cookies";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "recoil/ui";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);
    const darkModeStateCookie = getCookie(darkModeStateCookieKey);
    const isSystemThemeDark = useMemo(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches,
        [],
    );

    useEffect(() => {
        if (darkModeStateCookie === null) {
            setDarkMode(isSystemThemeDark);
        } else {
            setDarkMode(darkModeStateCookie === "true" ? true : false);
        }
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
