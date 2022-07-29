import styles from "./workDescriptionPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import Popup from "components/popup/popup";
import Link from "next/link";
import { WorkPopupProps } from "../workPopup";
const cn = cb.bind(styles);

export interface WorkDescriptionPopupProps extends WorkPopupProps {
    className?: string;
    onClickClose?: () => void;
}

const WorkDescriptionPopup = (props: WorkDescriptionPopupProps) => {
    const { workData, idx, id, className, onClickClose } = props;
    const language = useRecoilValue(languageState);
    const maxLength = 90;
    const descriptionLenght =
        workData && workData.description[language]?.length;
    const isOverMaxLenght: boolean =
        descriptionLenght !== undefined && descriptionLenght > maxLength;

    if (workData) {
        return (
            <span>
                <Popup
                    title={`${workData.info.category} - ${workData.info.role}`}
                    idx={idx + 1}
                    className={cn("container", className)}
                    isActive={false}
                    isDraggable={false}
                    onClickClose={onClickClose}
                >
                    <p>
                        {workData.description[language]
                            ?.substring(0, maxLength)
                            .trimEnd()}

                        {isOverMaxLenght && (
                            <>
                                ...
                                <Link href={`/works/${id}`}>
                                    <span className={cn("link")}>
                                        read more
                                    </span>
                                </Link>
                            </>
                        )}
                    </p>

                    {workData.link &&
                        workData.link.map((link) => {
                            return (
                                <Link href={link.url} target="_blank">
                                    <span className={cn("link", "link--block")}>
                                        Visit the {link.type} →
                                    </span>
                                </Link>
                            );
                        })}

                    {!isOverMaxLenght && (
                        <Link href={`/works/${id}`}>
                            <span className={cn("link", "link--block")}>
                                Read More →
                            </span>
                        </Link>
                    )}
                </Popup>
            </span>
        );
    } else {
        return null;
    }
};

export default WorkDescriptionPopup;
