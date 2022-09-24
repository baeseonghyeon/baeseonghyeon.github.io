import Link from "next/link";
import cb from "classnames/bind";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { NextPage } from "next";
import { useRecoilValue } from "recoil";
import { prefixState } from "recoil/env";

const cn = cb.bind(styles);

interface NavItem {
    title: string;
    path: string;
}

const Navbar: NextPage = () => {
    const router = useRouter();
    const prefix = useRecoilValue(prefixState);
    const navItems: NavItem[] = [
        { title: "Bae Seonghyeon", path: "/profile" },
        { title: "Works", path: "/works" },
    ];

    return (
        <div className={cn("container", "flex-row", "d-flex")}>
            {navItems.map((item, idx) => {
                return (
                    <Link href={item.path} as={prefix + item.path} key={idx}>
                        <a
                            href={item.path}
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
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

export default Navbar;
