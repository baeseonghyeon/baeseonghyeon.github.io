import Link from "next/link";
import cb from "classnames/bind";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { NextPage } from "next";
import { useEffect, useState, useRef, useCallback } from "react";
import DarkModeLanguageToggle from "components/darkModeLanguageToggle/darkModeLanguageToggle";

const cn = cb.bind(styles);

interface NavItem {
    title: string;
    path: string;
}

// 상수를 컴포넌트 외부로 이동하여 메모리 최적화
const NAV_ITEMS: NavItem[] = [
    { title: "Bae Seonghyeon", path: "/profile" },
    { title: "Works", path: "/works" },
];

const ANIMATION_DURATION = 180; // 0.18초

const Navbar: NextPage = () => {
    const router = useRouter();

    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    const [animatingPath, setAnimatingPath] = useState<string>("");
    const hasAnimatedRef = useRef<Set<string>>(new Set()); // useState 대신 useRef 사용
    const ticking = useRef<boolean>(false);
    const [, forceUpdate] = useState({}); // 리렌더링 트리거용

    // 초기 로드 시 현재 경로를 hasAnimated에 추가
    useEffect(() => {
        const pathname = router.pathname;
        if (pathname) {
            hasAnimatedRef.current.add(pathname);

            // "/" 경로는 "/profile"로도 매핑되므로 둘 다 추가
            if (pathname === "/") {
                hasAnimatedRef.current.add("/profile");
            }

            forceUpdate({}); // 한 번만 리렌더링
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 페이지 전환 시 애니메이션 트리거
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setAnimatingPath(url);

            // 애니메이션 후 hasAnimated에 추가
            setTimeout(() => {
                hasAnimatedRef.current.add(url);
                setAnimatingPath("");
            }, ANIMATION_DURATION);
        };

        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    const handleScroll = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                const currentScrollPos = window.scrollY;
                const scrollableHeight =
                    document.body.scrollHeight - window.innerHeight;

                // 스크롤 가능한 높이가 100px 미만이면 항상 표시
                if (scrollableHeight < 100) {
                    setVisible(true);
                    setPrevScrollPos(currentScrollPos);
                    ticking.current = false;
                    return;
                }

                // 최상단 근처(10px 이내)면 항상 표시
                if (currentScrollPos < 10) {
                    setVisible(true);
                }
                // 아래로 스크롤 중이면 숨김
                else if (
                    currentScrollPos > prevScrollPos &&
                    currentScrollPos > 10
                ) {
                    setVisible(false);
                }
                // 위로 스크롤 중이면 표시
                else if (currentScrollPos < prevScrollPos) {
                    setVisible(true);
                }

                setPrevScrollPos(currentScrollPos);
                ticking.current = false;
            });
            ticking.current = true;
        }
    }, [prevScrollPos]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div
            className={cn(
                "container",
                "flex-row",
                "d-flex",
                !visible && "hide",
            )}
        >
            <div
                className={cn(
                    "wrapper",
                    "flex-row",
                    "d-flex",
                    "justify-content-between",
                )}
            >
                <span className={cn("links__wrapper")}>
                    {NAV_ITEMS.map((item, idx) => {
                        const isActive =
                            router.pathname === item.path ||
                            (router.pathname === "/" &&
                                item.path === "/profile");
                        const shouldAnimate =
                            isActive && animatingPath === item.path;
                        const hasAnimatedBefore = hasAnimatedRef.current.has(
                            item.path,
                        );

                        return (
                            <Link
                                href={item.path}
                                key={item.path} // idx 대신 path 사용으로 더 안정적
                                className={cn(
                                    "link__label",
                                    isActive && "link__label-active",
                                    (shouldAnimate ||
                                        (isActive && hasAnimatedBefore)) &&
                                        "link__label-animate",
                                )}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </span>
                <div className={cn("divider")} />
                <DarkModeLanguageToggle />
            </div>
        </div>
    );
};

export default Navbar;
