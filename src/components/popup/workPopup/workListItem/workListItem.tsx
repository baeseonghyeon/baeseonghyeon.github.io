import styles from "./workListItem.module.scss";
import cb from "classnames/bind";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentActivePopupState, languageState } from "recoil/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { animateScroll as scroll } from "react-scroll";
import { WorkPopupProps } from "../workPopup";
import { useEffect, useLayoutEffect, useCallback, useMemo, memo } from "react";
import useMediaQuery from "hooks/useMediaQuery";
import { getWorkPopupId } from "../workDescriptionPopup/workDescriptionPopup";
import { getLocalizedText } from "libs/languageHelper";
const cn = cb.bind(styles);

export interface WorkListItemProps extends WorkPopupProps {}

export const scrollToPopup = (targetPopup: HTMLElement | null) => {
    const screenHeight = document.documentElement.clientHeight;

    if (targetPopup !== null) {
        scroll.scrollTo(
            targetPopup.offsetTop -
                (screenHeight / 2 - targetPopup.offsetHeight / 2),
        );
    }
};

const WorkListItem = (props: WorkListItemProps) => {
    const { workPopupData } = props;
    const language = useRecoilValue(languageState);
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );
    const { isPcScreenSize } = useMediaQuery();
    const router = useRouter();
    const workData = workPopupData.workData;

    // 파생 값들을 useMemo로 메모이제이션
    const id = useMemo(
        () => getWorkPopupId(workData.title.en, workData.info.category[0]),
        [workData.title.en, workData.info.category],
    );
    const index = workPopupData.index;

    const workDetailPath = useMemo(() => `/works/${id}`, [id]);

    // popupActivator 함수를 useCallback으로 메모이제이션
    const popupActivator = useCallback(
        (targetId: string) => {
            const currentPopup = document.getElementById(targetId);
            if (currentPopup) {
                setCurrentActivePopup(currentPopup as HTMLDivElement);
                scrollToPopup(currentPopup);
                router.push(`?target=${targetId}`);
            } else {
                router.push(workDetailPath);
            }
        },
        [setCurrentActivePopup, router, workDetailPath],
    );

    useLayoutEffect(() => {
        if (router.isReady) {
            if (id === router.query.target) {
                popupActivator(router.query.target as string);
            }
        }
    }, [router.isReady]);

    // handleFootnoteClick을 useCallback으로 메모이제이션
    const handleFootnoteClick = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            e.preventDefault();
            e.stopPropagation();
            popupActivator(id);
        },
        [popupActivator, id],
    );

    // 링크 텍스트를 useMemo로 메모이제이션
    const linkText = useMemo(
        () =>
            `${getLocalizedText(workData.title, language)} (${
                workData.info.date
            }) [${workData.info.category.join(", ")}]`,
        [workData.title, workData.info.date, workData.info.category, language],
    );

    if (workData) {
        return (
            <span className={cn("wrapper", "mr-2")} key={index}>
                <span
                    className={cn("footnote")}
                    onClick={handleFootnoteClick}
                    onTouchEnd={handleFootnoteClick}
                    style={{
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    [{index}]
                </span>
                <Link href={workDetailPath}>
                    <span className={cn("link")}>{linkText}</span>
                </Link>
            </span>
        );
    } else {
        return null;
    }
};

// React.memo로 불필요한 리렌더링 방지
export default memo(WorkListItem);
