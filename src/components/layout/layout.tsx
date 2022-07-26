import cb from "classnames/bind";
import Footer from "components/footer/footer";
import Navbar from "components/navbar/navbar";
import ScrollToTopButton from "components/scrollToTopButton/scrollToTopButton";
import useDarkMode from "hooks/useDarkMode";
import Head from "next/head";
import { useRouter } from "next/router";
import { HtmlHTMLAttributes, useEffect, useState } from "react";

import styles from "./layout.module.scss";

const cn = cb.bind(styles);

interface LayoutProps extends HtmlHTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
}

const Layout = (props: LayoutProps) => {
    const { title, description } = props;
    const router = useRouter();
    const isDarkMode = useDarkMode();
    const [isLaod, setIsLoad] = useState(false);
    const defaultTitle = "Bae Seonghyeon 배성현";
    const defaultDescription =
        "배성현은 아름답고 효과적인 서비스를 만드는 프론트엔드 개발자 입니다.";

    useEffect(() => {
        setIsLoad(true);
    }, [router]);

    return (
        <>
            <Head>
                <title>
                    {defaultTitle}
                    {router && router.pathname === "/" ? "" : ` | ${title}`}
                </title>
                <meta
                    name="description"
                    content={
                        description != undefined
                            ? description
                            : defaultDescription
                    }
                />
                <meta
                    name="theme-color"
                    content={isDarkMode ? "#272727" : "#fff"}
                />

                <link rel="icon" href="/favicon/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/favicon/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
            </Head>
            <Navbar />
            <div className={cn("container", isLaod && "animated")}>
                <div className={cn("body", props.className)}>
                    {props.children}
                </div>
            </div>
            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default Layout;
