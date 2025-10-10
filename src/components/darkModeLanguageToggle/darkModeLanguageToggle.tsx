import cb from "classnames/bind";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { darkModeState, languageState } from "recoil/ui";
import styles from "./darkModeLanguageToggle.module.scss";
import { FiSun, FiMoon } from "react-icons/fi";
import moment from "moment";
import "moment/locale/ko";
import { Language } from "interface/enums";
import {
    darkModeStateCookieKey,
    getCookie,
    languageStateCookieKey,
    setCookie,
} from "libs/cookies";
import { useEffect, useCallback, useMemo, useState } from "react";

const cn = cb.bind(styles);

// 전역 플래그로 최초 1회만 초기화 (페이지 이동 시에도 유지)
let hasInitialized = false;

const DarkModeLanguageToggle: NextPage = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);
    const [language, setLanguage] = useRecoilState(languageState);
    const [isDarkModeAnimating, setIsDarkModeAnimating] = useState(false);
    const [isLanguageAnimating, setIsLanguageAnimating] = useState(false);
    const [isInitialized, setIsInitialized] = useState(hasInitialized);

    // darkModeCookieHandler를 useCallback으로 메모이제이션
    const darkModeCookieHandler = useCallback(
        (darkModeValue: boolean) => {
            setCookie(darkModeStateCookieKey, darkModeValue, { path: "/" });
            setDarkMode(darkModeValue);
        },
        [setDarkMode],
    );

    // languageCookieHandler를 useCallback으로 메모이제이션
    const languageCookieHandler = useCallback(
        (languageValue: Language) => {
            setCookie(languageStateCookieKey, languageValue, { path: "/" });
            setLanguage(languageValue);
        },
        [setLanguage],
    );

    const getNextLanguage = (currentLang: Language): Language => {
        switch (currentLang) {
            case Language.ko:
                return Language.en;
            case Language.en:
                return Language.jp;
            case Language.jp:
                return Language.ko;
            default:
                return Language.ko;
        }
    };

    const getLanguageLabel = (currentLang: Language): string => {
        switch (currentLang) {
            case Language.ko:
                return "EN";
            case Language.en:
                return "JP";
            case Language.jp:
                return "KO";
            default:
                return "EN";
        }
    };

    // toggleDarkMode를 useCallback으로 메모이제이션
    const toggleDarkMode = useCallback(() => {
        setIsDarkModeAnimating(true);
        darkModeCookieHandler(!darkMode);

        // 애니메이션 완료 후 상태 리셋
        setTimeout(() => {
            setIsDarkModeAnimating(false);
        }, 300);
    }, [darkMode, darkModeCookieHandler]);

    // toggleLanguage를 useCallback으로 메모이제이션
    const toggleLanguage = useCallback(() => {
        setIsLanguageAnimating(true);
        languageCookieHandler(getNextLanguage(language));

        // 애니메이션 완료 후 상태 리셋
        setTimeout(() => {
            setIsLanguageAnimating(false);
        }, 300);
    }, [language, languageCookieHandler]);

    // languageLabel을 useMemo로 메모이제이션
    const languageLabel = useMemo(() => getLanguageLabel(language), [language]);

    // 클라이언트에서만 쿠키 읽어서 초기화 (Hydration 에러 방지)
    // 전역 플래그로 최초 1회만 실행 (페이지 이동 시에도 다시 실행 안 함)
    useEffect(() => {
        if (!hasInitialized) {
            // 다크모드 초기화
            const darkModeCookie = getCookie(darkModeStateCookieKey);
            if (darkModeCookie !== null) {
                setDarkMode(darkModeCookie === "true");
            } else {
                // 쿠키가 없으면 시스템 설정 사용
                const isSystemThemeDark =
                    typeof window !== "undefined" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches;
                setDarkMode(isSystemThemeDark);
            }

            // 언어 초기화
            const languageCookie = getCookie(languageStateCookieKey);
            if (languageCookie !== undefined && languageCookie !== null) {
                let langValue = Language.ko;
                if (languageCookie === "en") langValue = Language.en;
                else if (languageCookie === "jp") langValue = Language.jp;
                setLanguage(langValue);
            }

            hasInitialized = true;
            setIsInitialized(true);
        }
    }, [setDarkMode, setLanguage]);

    return (
        <div className={cn("container", !isInitialized && "hidden")}>
            <span className={cn("toggle__container")}>
                <span
                    className={cn("toggle__wrapper")}
                    onClick={toggleDarkMode}
                >
                    <span
                        className={cn(
                            "toggle__darkmode",
                            isDarkModeAnimating && "animating",
                        )}
                        key={darkMode ? "sun" : "moon"} // key 변경으로 리마운트
                    >
                        {darkMode ? <FiSun size="20" /> : <FiMoon size="20" />}
                    </span>
                </span>
                <span
                    className={cn("toggle__wrapper")}
                    onClick={toggleLanguage}
                >
                    <span
                        className={cn(
                            "toggle__language",
                            isLanguageAnimating && "animating",
                        )}
                        key={language} // key 변경으로 리마운트
                    >
                        {languageLabel}
                    </span>
                </span>
            </span>
        </div>
    );
};

export default DarkModeLanguageToggle;
