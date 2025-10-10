"use client";
import styles from "./workPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { currentActivePopupState, languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import {
    useLayoutEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
    memo,
} from "react";
import useMediaQuery from "hooks/useMediaQuery";
import YoutubeVideo from "components/youtubeVideo/youtubeVideo";
import WorkDescriptionPopup, {
    getWorkPopupId,
} from "./workDescriptionPopup/workDescriptionPopup";
import { convertImgurUrlToDirectLink } from "libs/textParser";
import ContentImage from "components/contentImage/contentImage";
import { getLocalizedText } from "libs/languageHelper";

const cn = cb.bind(styles);

export interface WorkPopupProps {
    workPopupData: {
        workData: WorkData;
        isRandomPosition?: boolean | number;
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
    const isRandomPosition = workPopupData.isRandomPosition;

    // id를 useMemo로 메모이제이션
    const id = useMemo(
        () => getWorkPopupId(workData.title.en, workData.info.category[0]),
        [workData.title.en, workData.info.category],
    );

    // title을 useMemo로 메모이제이션
    const localizedTitle = useMemo(
        () => getLocalizedText(workData.title, language),
        [workData.title, language],
    );

    useLayoutEffect(() => {
        if (currentActivePopup === popupRef.current) {
            setInnerPopupVisibility(true);
        } else {
            setInnerPopupVisibility(false);
        }
    }, [currentActivePopup]);

    // onMouseEnter를 useCallback으로 메모이제이션
    const handleMouseEnter = useCallback(() => {
        isPcScreenSize && setInnerPopupVisibility(true);
    }, [isPcScreenSize]);

    // onMouseLeave를 useCallback으로 메모이제이션
    const handleMouseLeave = useCallback(() => {
        isPcScreenSize &&
            !(currentActivePopup === popupRef.current) &&
            setInnerPopupVisibility(false);
    }, [isPcScreenSize, currentActivePopup]);

    // onClickClose를 useCallback으로 메모이제이션
    const handleCloseInnerPopup = useCallback(() => {
        setInnerPopupVisibility(false);
    }, []);

    if (workData) {
        return (
            <Popup
                id={id}
                title={localizedTitle}
                isRandomPosition={isRandomPosition}
                index={index + 1}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                        src={convertImgurUrlToDirectLink(workData.thumbUrl)}
                        className={cn("image__container")}
                        skeletonClassName={cn("video__container")}
                        isBackgroundImage
                        alt={`${getLocalizedText(
                            workData.title,
                            language,
                        )}-thumbnail`}
                    />
                ) : workData.image && workData.image[0] ? (
                    <ContentImage
                        src={convertImgurUrlToDirectLink(workData.image[0].url)}
                        className={cn("image__container")}
                        skeletonClassName={cn("video__container")}
                        isBackgroundImage
                        alt={`${getLocalizedText(
                            workData.title,
                            language,
                        )}-thumbnail`}
                    />
                ) : (
                    <div className={cn("image__container", "placeholder")}>
                        <div className={cn("placeholder__content")}>
                            <img 
                                src="/favicon/apple-touch-icon.png" 
                                alt="logo"
                                className={cn("placeholder__icon")}
                            />
                            <h3>{localizedTitle}</h3>
                            <p>{workData.info.category.join(" · ")}</p>
                        </div>
                    </div>
                )}

                <WorkDescriptionPopup
                    className={cn(
                        "description-popup",
                        !innerPopupVisibility && "description-popup--hide",
                    )}
                    workPopupData={workPopupData}
                    onClickClose={handleCloseInnerPopup}
                />
            </Popup>
        );
    } else {
        return null;
    }
};

// React.memo로 불필요한 리렌더링 방지
export default memo(WorkPopup);
