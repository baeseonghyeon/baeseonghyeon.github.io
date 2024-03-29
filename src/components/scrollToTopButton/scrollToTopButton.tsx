import cb from "classnames/bind";
import { NextPage } from "next";
import styles from "./scrollToTopButton.module.scss";
import { animateScroll as scroll } from "react-scroll";
import React, { useLayoutEffect, useEffect, useState } from "react";

const cn = cb.bind(styles);

const ScrollToTopButton: NextPage = () => {
    const [visibility, setVisibility] = useState(false);

    useLayoutEffect(() => {
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

export default React.memo(ScrollToTopButton);
