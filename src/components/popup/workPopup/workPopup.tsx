import styles from "./workPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { currentActivePopupState, languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useMediaQuery from "hooks/useMediaQuery";
import YoutubeVideo from "components/youtubeVideo/youtubeVideo";
import WorkDescriptionPopup, {
    getWorkPopupId,
} from "./workDescriptionPopup/workDescriptionPopup";
import { googleCloudImageUrl } from "libs/textParser";
import ContentImage from "components/contentImage/contentImage";

const cn = cb.bind(styles);

export interface WorkPopupProps {
    workPopupData: {
        workData: WorkData;
        isRandomPositon?: boolean;
        index: number;
    };
}

const WorkPopup = (props: WorkPopupProps) => {
    const { workPopupData } = props;
    const language = useRecoilValue(languageState);
    const currentActivePopup = useRecoilValue(currentActivePopupState);
    const popupRef = useRef<HTMLDivElement>(null);
    const { isPcScreenSize } = useMediaQuery();
    const [innerPopupVisibility, setInnerPopupVisibility] = useState(false);
    const workData = workPopupData.workData;
    const index = workPopupData.index;
    const isRandomPositon = workPopupData.isRandomPositon;
    const id = getWorkPopupId(workData.title.en, workData.info.category[0]);

    useLayoutEffect(() => {
        if (currentActivePopup === popupRef.current) {
            setInnerPopupVisibility(true);
        } else {
            setInnerPopupVisibility(false);
        }
    }, [currentActivePopup]);

    if (workData) {
        return (
            <Popup
                id={id}
                title={workData.title[language]}
                isRandomPositon={isRandomPositon}
                index={index + 1}
                onMouseEnter={() =>
                    isPcScreenSize && setInnerPopupVisibility(true)
                }
                onMouseLeave={() =>
                    isPcScreenSize &&
                    !(currentActivePopup === popupRef.current) &&
                    setInnerPopupVisibility(false)
                }
                className={cn("container")}
                bodyClassName={cn("body")}
                popupRef={popupRef}
            >
                {workData.video ? (
                    <YoutubeVideo
                        link={workData.video[0].url}
                        className={cn("video__container")}
                        skeletonClassName={cn("video__container", "skeleton")}
                    />
                ) : workData.thumbUrl ? (
                    <ContentImage
                        src={googleCloudImageUrl(workData.thumbUrl)}
                        className={cn("image__container")}
                        skeletonClassName={cn("video__container")}
                        isBackgroundImage
                        alt={`${workData.title[language]}-thumbnail`}
                    />
                ) : (
                    workData.image &&
                    workData.image[0] && (
                        <ContentImage
                            src={googleCloudImageUrl(workData.image[0].url)}
                            className={cn("image__container")}
                            skeletonClassName={cn("video__container")}
                            isBackgroundImage
                            alt={`${workData.title[language]}-thumbnail`}
                        />
                    )
                )}

                <WorkDescriptionPopup
                    className={cn(
                        "description-popup",
                        !innerPopupVisibility && "description-popup--hide",
                    )}
                    workPopupData={workPopupData}
                    onClickClose={() => setInnerPopupVisibility(false)}
                />
            </Popup>
        );
    } else {
        return null;
    }
};

export default WorkPopup;
