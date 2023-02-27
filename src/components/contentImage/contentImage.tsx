import cb from "classnames/bind";
import styles from "./contentImage.module.scss";
import React, { HtmlHTMLAttributes, useState } from "react";
import SkeletonBox from "components/skeletonBox/skeletonBox";
import Image from "next/image";

const cn = cb.bind(styles);

interface ContentImageProps extends HtmlHTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    skeletonClassName?: string;
    isBackgroundImage?: boolean;
}

const ContentImage = (props: ContentImageProps) => {
    const { src, isBackgroundImage = false, skeletonClassName, alt } = props;

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
                alt={alt}
                onLoad={() => setLoading(false)}
            />
        </>
    );
};

export default ContentImage;
