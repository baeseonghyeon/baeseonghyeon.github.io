import styles from "./workPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import { useRef, useState } from "react";
import useMediaQuery from "hooks/useMediaQuery";
import WorkDescription from "./workDescriptionPopup/workDescription";
import YoutubeVideo from "components/youtubeVideo/youtubeVideo";
const cn = cb.bind(styles);

export interface WorkPopupProps {
    workData: WorkData;
    isRandomPositon: boolean;
    idx: number;
}

const WorkPopup = (props: WorkPopupProps) => {
    const { workData, isRandomPositon, idx } = props;
    const language = useRecoilValue(languageState);
    const [screenSize] = useMediaQuery();
    const isPcScreenSize = screenSize > 768;

    const cardRef = useRef(null);
    const iconRef = useRef(null);

    const [innerPopupVisibility, setInnerPopupVisibility] = useState(false);
    const [iconVisibility, setIconVisibility] = useState(true);

    const showInnerPopup = () => {
        setIconVisibility(false);
        setInnerPopupVisibility(true);
    };

    return (
        <Popup
            title={workData.title[language]}
            isRandomPositon={isRandomPositon}
            idx={idx + 1}
            onMouseEnter={() => isPcScreenSize && showInnerPopup()}
            onMouseLeave={() =>
                isPcScreenSize && setInnerPopupVisibility(false)
            }
            // className={cn(`popup__${idx + 1}`)}
            className={cn("container")}
            bodyClassName={cn("body")}
        >
            {iconVisibility && (
                <span
                    className={cn("pointer-cursor__icon")}
                    // id={`pointer${id}`}
                    onClick={showInnerPopup}
                    onTouchStart={showInnerPopup}
                    ref={iconRef}
                />
            )}

            {workData.video ? (
                <YoutubeVideo
                    link={workData.video[0].url}
                    className={cn("video__container")}
                />
            ) : (
                workData.thumbUrl && (
                    <div
                        className={cn("image__container")}
                        style={{ backgroundImage: `url(${workData.thumbUrl})` }}
                    />
                )
            )}

            {!workData.video ||
                (!workData.thumbUrl && workData.title[language])}

            {innerPopupVisibility && (
                <WorkDescription workData={workData} idx={idx} />
            )}
        </Popup>
    );
};

export default WorkPopup;
