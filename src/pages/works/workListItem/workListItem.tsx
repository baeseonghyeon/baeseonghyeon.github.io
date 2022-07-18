import styles from "./workListItem.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Link from "next/link";
import useMediaQuery from "hooks/useMediaQuery";
import { useRouter } from "next/router";
import { animateScroll as scroll } from "react-scroll";
const cn = cb.bind(styles);

export interface WorkListItemProps {
    workData: WorkData;
    idx: number;
}

const WorkListItem = (props: WorkListItemProps) => {
    const { workData, idx } = props;
    const language = useRecoilValue(languageState);
    const router = useRouter();
    const [screenSize] = useMediaQuery();
    const redirectLink = `/works/${idx + 1}`;

    const footnoteHandler = (id: number) => {
        if (document.getElementById(`popup${id}`)) {
            scrollToActivePopup(id);
        } else {
            router.push(`/work/${id}`);
        }
    };

    const scrollToActivePopup = (id: number) => {
        // setActivePopup(id);
        const targetPopup = document.getElementById(`popup${id}`);
        const screenHeight = document.body.clientHeight;

        if (targetPopup !== null) {
            router.push(`#work${id}`);
            scroll.scrollTo(
                targetPopup.offsetTop -
                    (screenHeight / 2 - targetPopup.offsetHeight / 2),
            );
        } else {
            router.push(`/work/${id}`);
        }
    };

    return (
        <span className={cn("wrapper", "mr-2")} key={idx}>
            <span
                className={cn("footnote")}
                onClick={() => scrollToActivePopup(idx)}
                onTouchStart={() => scrollToActivePopup(idx)}
            >
                [{idx}]
            </span>
            <Link
                href={redirectLink}
                onTouchStart={() => {
                    screenSize > 769 && (window.location.href = redirectLink);
                }}
            >
                <span className={cn("link")}>
                    {workData.title[language]} ( {workData.info.date} ) [
                    {workData.info.category}]
                </span>
            </Link>
        </span>
    );
};

export default WorkListItem;
