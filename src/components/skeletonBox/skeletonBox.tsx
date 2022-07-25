import cb from "classnames/bind";
import styles from "./skeletonBox.module.scss";
import React, { HtmlHTMLAttributes } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { darkModeState } from "recoil/ui";
import { useRecoilValue } from "recoil";

const cn = cb.bind(styles);

interface SkeletonBoxProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const SkeletonBox = (props: SkeletonBoxProps) => {
    const {} = props;
    const darkMode = useRecoilValue(darkModeState);

    return (
        <SkeletonTheme
            baseColor={darkMode ? "#383838" : ""}
            highlightColor={darkMode ? "#404040" : ""}
            borderRadius={0}
        >
            <Skeleton className={cn(props.className)} />
        </SkeletonTheme>
    );
};

export default SkeletonBox;
