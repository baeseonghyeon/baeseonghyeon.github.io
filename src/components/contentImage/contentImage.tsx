import cb from "classnames/bind";
import styles from "./contentImage.module.scss";
import React, { HtmlHTMLAttributes, useState } from "react";
import SkeletonBox from "components/skeletonBox/skeletonBox";

const cn = cb.bind(styles);

interface ContentImageProps extends HtmlHTMLAttributes<HTMLDivElement> {
    src: string;
    skeletonClassName?: string;
    isBackgroundImage?: boolean;
}

const ContentImage = (props: ContentImageProps) => {
    const { src, isBackgroundImage = false, skeletonClassName } = props;

    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && (
                <SkeletonBox className={cn("skeleton", skeletonClassName)} />
            )}

            {isBackgroundImage && (
                <div
                    className={cn(props.className, loading && "hide")}
                    style={{
                        backgroundImage: `url(${src})`,
                    }}
                />
            )}

            <img
                src={src}
                className={cn(
                    props.className,
                    (loading || isBackgroundImage) && "hide",
                )}
                onLoad={() => setLoading(false)}
            />
        </>
    );
};

export default ContentImage;
