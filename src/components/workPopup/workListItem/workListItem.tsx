import styles from "./workListItem.module.scss";
import cb from "classnames/bind";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentActivePopupState, languageState } from "recoil/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { animateScroll as scroll } from "react-scroll";
import { WorkPopupProps } from "../workPopup";
import { useEffect } from "react";
import useMediaQuery from "hooks/useMediaQuery";
const cn = cb.bind(styles);

export interface WorkListItemProps extends WorkPopupProps {}

const WorkListItem = (props: WorkListItemProps) => {
    const { workData, idx, id } = props;
    const language = useRecoilValue(languageState);
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );
    const { isPcScreenSize } = useMediaQuery();
    const router = useRouter();
    const workDetailPath = `/works/${id}`;

    useEffect(() => {
        if (router.isReady) {
            if (id === router.query.target) {
                popupActivator(router.query.target as string);
            }
        }
    }, [router.isReady]);

    const popupActivator = (id: string) => {
        const currentPopup = document.getElementById(id);
        if (currentPopup) {
            setCurrentActivePopup(currentPopup as HTMLDivElement);
            scrollToPopup(currentPopup);
            router.push(`?target=${id}`);
        } else {
            router.push(workDetailPath);
        }
    };

    const scrollToPopup = (targetPopup: HTMLElement | null) => {
        const screenHeight = document.documentElement.clientHeight;

        if (targetPopup !== null) {
            scroll.scrollTo(
                targetPopup.offsetTop -
                    (screenHeight / 2 - targetPopup.offsetHeight / 2),
            );
        }
    };

    if (workData) {
        return (
            <span className={cn("wrapper", "mr-2")} key={idx}>
                <span
                    className={cn("footnote")}
                    onClick={() => popupActivator(id)}
                    onTouchStart={() => isPcScreenSize && popupActivator(id)}
                >
                    [{idx}]
                </span>
                <Link href={workDetailPath}>
                    <span
                        className={cn("link")}
                        onTouchStart={() =>
                            isPcScreenSize && router.push(workDetailPath)
                        }
                    >
                        {workData.title[language]} ( {workData.info.date} ) [
                        {workData.info.category}]
                    </span>
                </Link>
            </span>
        );
    } else {
        return null;
    }
};

export default WorkListItem;
