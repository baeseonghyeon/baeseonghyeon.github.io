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

const Navbar: NextPage = () => {
    const router = useRouter();
    const navItems: NavItem[] = [
        { title: "Bae Seonghyeon", path: "/profile" },
        { title: "Works", path: "/works" },
    ];

    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    const ticking = useRef<boolean>(false);

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
                    {navItems.map((item, idx) => {
                        return (
                            <Link
                                href={item.path}
                                key={idx}
                                className={cn(
                                    "link__label",
                                    router &&
                                        router.pathname === item.path &&
                                        "link__label-active",

                                    router &&
                                        router.pathname === "/" &&
                                        item.path === "/profile" &&
                                        "link__label-active",
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
