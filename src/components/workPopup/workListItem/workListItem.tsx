import styles from "./workListItem.module.scss";
import cb from "classnames/bind";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentActivePopupState, languageState } from "recoil/ui";
import Link from "next/link";
import useMediaQuery from "hooks/useMediaQuery";
import { useRouter } from "next/router";
import { animateScroll as scroll } from "react-scroll";
import { WorkPopupProps } from "../workPopup";
import { useEffect } from "react";
const cn = cb.bind(styles);

export interface WorkListItemProps extends WorkPopupProps {}

const WorkListItem = (props: WorkListItemProps) => {
    const { workData, idx, id } = props;
    const language = useRecoilValue(languageState);
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );
    const router = useRouter();
    const redirectLink = `/works/${id}`;

    useEffect(() => {
        if (id === router.query.target) {
            popupActivator(router.query.target as string);
        }
    }, [router.query.target]);

    const popupActivator = (id: string) => {
        const currentPopup = document.getElementById(id);
        if (currentPopup) {
            setCurrentActivePopup(currentPopup as HTMLDivElement);
            scrollToPopup(currentPopup);
        } else {
            router.push(redirectLink);
        }
    };

    const scrollToPopup = (targetPopup: HTMLElement | null) => {
        const screenHeight = document.documentElement.clientHeight;
        router.push(`?target=${id}`);
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
                    onTouchStart={() => popupActivator(id)}
                >
                    [{idx}]
                </span>
                <Link href={redirectLink}>
                    <span
                        className={cn("link")}
                        onTouchStart={() => {
                            router.push(redirectLink);
                        }}
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
