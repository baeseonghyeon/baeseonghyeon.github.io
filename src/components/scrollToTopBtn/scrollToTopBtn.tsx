import cb from "classnames/bind";
import { NextPage } from "next";
import styles from "./scrollToTopBtn.module.scss";
import { animateScroll as scroll } from "react-scroll";
import React, { useEffect, useState } from "react";

const cn = cb.bind(styles);

const ScrollToTopBtn: NextPage = () => {
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    const listenScrollEvent = () => {
        if (window.scrollY > 150) {
            setVisibility(true);
        } else {
            setVisibility(false);
        }
    };

    const onClickButton = () => {
        scroll.scrollToTop();
    };

    return (
        <span
            className={cn("wrapper", visibility && "visible")}
            onClick={() => onClickButton()}
        >
            ↑
        </span>
    );
};

export default React.memo(ScrollToTopBtn);
