import cb from "classnames/bind";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { darkModeState, languageState } from "recoil/ui";
import { Language } from "interface";
import styles from "./footer.module.scss";
import { FiSun, FiMoon } from "react-icons/fi";
import moment from "moment";
import "moment/locale/ko";

const cn = cb.bind(styles);

const Footer: NextPage = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);
    const [language, setLanguage] = useRecoilState(languageState);
    const currentYear = moment().format("YYYY");

    // useEffect(()=> {
    //     return () => {
    //         const nowYear = moment().format("YYYY");
    //     }
    // }, [])

    return (
        <div className={cn("container")}>
            <span className={cn("copy-right")}>
                <a
                    href="https://analytics.google.com/analytics/web/?authuser=1#/report-home/a174985234w242601509p226122997"
                    target="blank"
                    rel="noopener noreferrer"
                />
                <span>
                    {currentYear ? currentYear : "2022"} Bae Seonghyeon
                    (github.io)
                </span>
            </span>
            <span className={cn("toggle__container")}>
                <span className={cn("toggle__wrapper")}>
                    <span
                        className={cn("toggle__darkmode")}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <FiSun size="20" /> : <FiMoon size="20" />}
                    </span>
                </span>
                <span className={cn("toggle__wrapper")}>
                    <span
                        className={cn("toggle__language")}
                        onClick={() =>
                            setLanguage(
                                language === Language.ko
                                    ? Language.en
                                    : Language.ko,
                            )
                        }
                    >
                        {language === Language.ko ? "EN" : "KO"}
                    </span>
                </span>
            </span>
        </div>
    );
};

export default Footer;
