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
import { useLayoutEffect, useEffect } from "react";

const cn = cb.bind(styles);

const DarkModeLanguageToggle: NextPage = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);
    const [language, setLanguage] = useRecoilState(languageState);
    const languageStateCookie = getCookie(languageStateCookieKey);

    const darkModeCookieHandler = (darkModeValue: boolean) => {
        setCookie(darkModeStateCookieKey, darkModeValue, { path: "/" });
        setDarkMode(darkModeValue);
    };

    const languageCookieHandler = (languageValue: Language) => {
        setCookie(languageStateCookieKey, languageValue, { path: "/" });
        setLanguage(languageValue);
    };

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

    useLayoutEffect(() => {
        if (languageStateCookie !== undefined) {
            let langValue = Language.ko;
            if (languageStateCookie === "en") langValue = Language.en;
            else if (languageStateCookie === "jp") langValue = Language.jp;
            setLanguage(langValue);
        }
    }, []);

    return (
        <div className={cn("container")}>
            <span className={cn("toggle__container")}>
                <span
                    className={cn("toggle__wrapper")}
                    onClick={() => {
                        darkModeCookieHandler(!darkMode);
                    }}
                >
                    <span className={cn("toggle__darkmode")}>
                        {darkMode ? <FiSun size="20" /> : <FiMoon size="20" />}
                    </span>
                </span>
                <span
                    className={cn("toggle__wrapper")}
                    onClick={() =>
                        languageCookieHandler(getNextLanguage(language))
                    }
                >
                    <span className={cn("toggle__language")}>
                        {getLanguageLabel(language)}
                    </span>
                </span>
            </span>
        </div>
    );
};

export default DarkModeLanguageToggle;
