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

    // const scrollToPopup = () => {
    //     const currentPopup = document.getElementById(id);
    //     const screenHeight = document.documentElement.clientHeight;

    //     if (currentPopup)
    //         window.scrollTo({
    //             top:
    //                 currentPopup.offsetTop -
    //                 (screenHeight / 2 - currentPopup.offsetHeight / 2),

    //             behavior: "smooth",
    //         });
    // };

    useEffect(() => {
        if (currentActivePopup == document.getElementById(id)) {
            setInnerPopupVisibility(true);
            // scrollToPopup();
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
                idx={idx + 1}
                onMouseEnter={() =>
                    isPcScreenSize && setInnerPopupVisibility(true)
                }
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
                        skeletonClassName={cn("video__container", "skeleton")}
                    />
                ) : (
                    workData.thumbUrl && (
                        <ContentImage
                            src={googleCloudImageUrl(workData.thumbUrl)}
                            className={cn("image__container")}
                            skeletonClassName={cn("video__container")}
                            isBackgroundImage
                        />
                    )
                )}

                <WorkDescriptionPopup
                    className={cn(
                        `description-popup${!innerPopupVisibility && "--hide"}`,
                    )}
                    workData={workData}
                    idx={idx}
                    id={id}
                    onClickClose={() => setInnerPopupVisibility(false)}
                />
            </Popup>
        );
    } else {
        return null;
    }
};

export default WorkPopup;
