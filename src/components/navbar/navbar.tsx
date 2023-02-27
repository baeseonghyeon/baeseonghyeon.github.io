import Link from "next/link";
import cb from "classnames/bind";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { NextPage } from "next";
import { useEffect, useState } from "react";

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

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const scrollHeight =
            document.body.scrollHeight - window.screen.height + 99;

        if (currentScrollPos > 10 && currentScrollPos - prevScrollPos > 0) {
            setVisible(false);
        } else {
            if (currentScrollPos < scrollHeight) setVisible(true);
        }
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <div
            className={cn(
                "container",
                "flex-row",
                "d-flex",
                !visible && "hide",
            )}
        >
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
        </div>
    );
};

export default Navbar;
