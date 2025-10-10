import cb from "classnames/bind";
import { NextPage } from "next";
import styles from "./scrollToTopButton.module.scss";
import { animateScroll as scroll } from "react-scroll";
import React, {
    useLayoutEffect,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react";

const cn = cb.bind(styles);

const ScrollToTopButton: NextPage = () => {
    const [visibility, setVisibility] = useState(false);
    const [isPcScreenSize, setIsPcScreenSize] = useState(false);
    const ticking = useRef<boolean>(false);

    // PC 화면인지 확인하는 함수
    const isPcScreen = () => {
        return window.innerWidth > 844; // $medium 기준
    };

    // listenScrollEvent를 useCallback으로 메모이제이션
    const listenScrollEvent = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                let scrollY = 0;

                // PC 화면이면 .body 컨테이너의 스크롤 확인
                if (isPcScreen()) {
                    const scrollContainer = document.querySelector(
                        '[data-scroll-container="true"]',
                    ) as HTMLElement;
                    scrollY = scrollContainer ? scrollContainer.scrollTop : 0;
                } else {
                    // 모바일 화면이면 window 스크롤 확인
                    scrollY =
                        window.scrollY || document.documentElement.scrollTop;
                }

                if (scrollY > 150) {
                    setVisibility(true);
                } else {
                    setVisibility(false);
                }
                ticking.current = false;
            });
            ticking.current = true;
        }
    }, []);

    // 화면 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            setIsPcScreenSize(isPcScreen());
        };

        // 초기값 설정
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
        const scrollContainer = document.querySelector(
            '[data-scroll-container="true"]',
        ) as HTMLElement;

        // PC에서는 .body 컨테이너의 스크롤 이벤트 감지
        if (scrollContainer && isPcScreenSize) {
            scrollContainer.addEventListener("scroll", listenScrollEvent, {
                passive: true,
            });
        }

        // 모바일에서는 window의 스크롤 이벤트 감지
        if (!isPcScreenSize) {
            window.addEventListener("scroll", listenScrollEvent, {
                passive: true,
            });
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener(
                    "scroll",
                    listenScrollEvent,
                );
            }
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, [listenScrollEvent, isPcScreenSize]);

    // onClickButton을 useCallback으로 메모이제이션
    const onClickButton = useCallback(() => {
        if (isPcScreenSize) {
            // PC에서는 .body 컨테이너를 스크롤
            const scrollContainer = document.querySelector(
                '[data-scroll-container="true"]',
            ) as HTMLElement;
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        } else {
            // 모바일에서는 window를 스크롤
            scroll.scrollToTop();
        }
    }, [isPcScreenSize]);

    return (
        <span
            className={cn("wrapper", visibility && "visible")}
            onClick={onClickButton}
        >
            ↑
        </span>
    );
};

export default React.memo(ScrollToTopButton);
