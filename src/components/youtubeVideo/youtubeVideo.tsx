import cb from "classnames/bind";
import styles from "./youtubeVideo.module.scss";
import React, { HtmlHTMLAttributes, useState } from "react";
import SkeletonBox from "components/skeletonBox/skeletonBox";

const cn = cb.bind(styles);

interface YoutubeVideoProps extends HtmlHTMLAttributes<HTMLDivElement> {
    link: string;
    iframeClassName?: string;
    skeletonClassName?: string;
}

const YoutubeVideo = (props: YoutubeVideoProps) => {
    const { link, iframeClassName, skeletonClassName } = props;

    const [loading, setLoading] = useState(true);

    return (
        <div className={cn(props.className)}>
            {loading && (
                <SkeletonBox className={cn(skeletonClassName, "skeleton")} />
            )}
            <iframe
                className={cn(iframeClassName, loading && "hide")}
                title="youtube_video"
                src={`${link}?autoplay=1&showinfo=0&loop=1&mute=1&rel=0`}
                frameBorder="0"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoading(false)}
            />
        </div>
    );
};

export default YoutubeVideo;
