import cb from "classnames/bind";
import Layout from "components/layout/layout";
import { Language } from "interface/enums";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import styles from "./404.module.scss";

const cn = cb.bind(styles);

const NotFound: NextPage = () => {
    const language = useRecoilValue(languageState);
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (counter > 0) {
                setCounter(counter - 1);
            }
            if (counter === 0) {
                clearInterval(countdown);
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [counter]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            Router.push("/");
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Layout title="Oops!">
            <div className={cn("container")}>
                <h2 className={cn("num__label")}>404 :-(</h2>
                <h3 className={cn("label")}>
                    {language === Language.en
                        ? "Page Not Found"
                        : "페이지를 찾을 수 없습니다!"}
                </h3>

                {language === Language.en ? (
                    <p>
                        After <strong>{counter}</strong> seconds, move to{" "}
                        <Link href="/" className={cn("link__label")}>
                            home
                        </Link>
                        .
                    </p>
                ) : (
                    <p>
                        <strong>{counter}</strong>초 후{" "}
                        <Link href="/" className={cn("link__label")}>
                            메인
                        </Link>
                        으로 이동합니다.
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default NotFound;
