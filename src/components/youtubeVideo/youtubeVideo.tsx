import cb from "classnames/bind";
import styles from "./youtubeVideo.module.scss";
import React, { HtmlHTMLAttributes, useState } from "react";

const cn = cb.bind(styles);

interface YoutubeVideoProps extends HtmlHTMLAttributes<HTMLDivElement> {
    link: string;
    iframeClassName?: string;
}

const YoutubeVideo = (props: YoutubeVideoProps) => {
    const { link, iframeClassName } = props;

    return (
        <div className={props.className}>
            <iframe
                className={iframeClassName}
                title="youtube_video"
                src={`${link}?autoplay=1&showinfo=0&loop=1&mute=1&rel=0`}
                frameBorder="0"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default YoutubeVideo;
