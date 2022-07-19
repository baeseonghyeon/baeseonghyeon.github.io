import React, { HTMLAttributes, useEffect, useState } from "react";
import cb from "classnames/bind";
import styles from "./animatedContainer.module.scss";

const cn = cb.bind(styles);

interface AnimatedContainerProps extends HTMLAttributes<HTMLDivElement> {}

const AnimatedContainer = (props: AnimatedContainerProps) => {
    const { className, children, ...rest } = props;
    const [fade, setFade] = useState<Boolean>(false);

    useEffect(() => {
        setFade(true);
    }, []);

    return (
        <div
            className={cn("default", fade ? "show" : "hide", className)}
            {...rest}
        >
            {children}
        </div>
    );
};

export default AnimatedContainer;
