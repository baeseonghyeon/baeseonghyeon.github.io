import styles from "./workPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { currentActivePopupState, languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import { useEffect, useState } from "react";
import useMediaQuery from "hooks/useMediaQuery";
import YoutubeVideo from "components/youtubeVideo/youtubeVideo";
import WorkDescriptionPopup from "./workDescriptionPopup/workDescriptionPopup";
import { googleCloudImageUrl } from "libs/textParser";
import SkeletonBox from "components/skeletonBox/skeletonBox";
import ContentImage from "components/contentImage/contentImage";
const cn = cb.bind(styles);

export interface WorkPopupProps {
    workData: WorkData;
    isRandomPositon?: boolean;
    idx: number;
    id: string;
}

const WorkPopup = (props: WorkPopupProps) => {
    const { workData, isRandomPositon, idx, id } = props;
    const language = useRecoilValue(languageState);
    const currentActivePopup = useRecoilValue(currentActivePopupState);
    const { isPcScreenSize } = useMediaQuery();
    const [innerPopupVisibility, setInnerPopupVisibility] = useState(false);

    useEffect(() => {
        if (currentActivePopup == document.getElementById(id)) {
            setInnerPopupVisibility(true);
        } else {
            setInnerPopupVisibility(false);
        }
    }, [currentActivePopup]);

    return (
        <Popup
            id={id}
            title={workData.title[language]}
            isRandomPositon={isRandomPositon}
            idx={idx + 1}
            onMouseEnter={() => isPcScreenSize && setInnerPopupVisibility(true)}
            onMouseLeave={() =>
                isPcScreenSize &&
                !(currentActivePopup == document.getElementById(id)) &&
                setInnerPopupVisibility(false)
            }
            className={cn("container")}
            bodyClassName={cn("body")}
        >
            {workData.video ? (
                <YoutubeVideo
                    link={workData.video[0].url}
                    className={cn("video__container")}
                />
            ) : (
                workData.thumbUrl && (
                    <ContentImage
                        src={googleCloudImageUrl(workData.thumbUrl)}
                        className={cn("image__container")}
                        skeletonClassName={cn("skeleton", "video__container")}
                        isBackgroundImage
                    />
                )
            )}

            {innerPopupVisibility && (
                <WorkDescriptionPopup workData={workData} idx={idx} id={id} />
            )}
        </Popup>
    );
};

export default WorkPopup;
