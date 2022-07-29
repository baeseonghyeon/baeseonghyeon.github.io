import cb from "classnames/bind";
import Footer from "components/footer/footer";
import Navbar from "components/navbar/navbar";
import ScrollToTopButton from "components/scrollToTopButton/scrollToTopButton";
import useDarkMode from "hooks/useDarkMode";
import { googleCloudImageUrl } from "libs/textParser";
import Head from "next/head";
import { useRouter } from "next/router";
import { HtmlHTMLAttributes, useEffect, useState } from "react";

import styles from "./layout.module.scss";

const cn = cb.bind(styles);

interface LayoutProps extends HtmlHTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    image?: string;
}

const Layout = (props: LayoutProps) => {
    const { title, description, image } = props;
    const router = useRouter();
    const isDarkMode = useDarkMode();
    const [isLaod, setIsLoad] = useState(false);
    const defaultTitle = "Bae Seonghyeon 배성현";
    const defaultDescription =
        "배성현은 프론트엔드 개발자 입니다. 아름답고 효과적인 서비스를 만들고 있습니다.";

    const pageTitle = `${defaultTitle}${
        (router && router.pathname === "/") || !title ? "" : ` | ${title}`
    }`;

    const pageDescription =
        description != undefined ? description : defaultDescription;

    const googleAnalyticsScript = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-174985234-1');
    `;

    useEffect(() => {
        setIsLoad(true);
    }, [router]);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                {router.pathname !== "/works" && (
                    <meta
                        property="og:image"
                        content={googleCloudImageUrl(
                            image ? image : "1yMHIgjjWl4YKRpM9HPdta1YhAjqya6nD",
                        )}
                    />
                )}
                <meta property="og:description" content={pageDescription} />
                <meta
                    name="theme-color"
                    content={isDarkMode ? "#272727" : "#fff"}
                />
                <link rel="icon" href="/favicon.ico" />
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
                    color="#000000"
                />
                <meta
                    name="/favicon/msapplication-TileColor"
                    content="#ffffff"
                />
                <meta name="theme-color" content="#ffffff" />

                <script
                    dangerouslySetInnerHTML={{ __html: googleAnalyticsScript }}
                />
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=UA-174985234-1"
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
