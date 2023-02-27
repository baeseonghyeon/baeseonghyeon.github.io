import styles from "./workDescriptionPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import Popup from "components/popup/popup";
import Link from "next/link";
import { WorkPopupProps } from "../workPopup";
import { useRouter } from "next/router";
import { touchRedirect } from "libs/touchHandler";
import useMediaQuery from "hooks/useMediaQuery";
import { lowerCaseParser } from "libs/textParser";
const cn = cb.bind(styles);

export interface WorkDescriptionPopupProps extends WorkPopupProps {
    className?: string;
    onClickClose?: () => void;
}

export const getWorkPopupId = (title: string | undefined, category: string) => {
    return `${lowerCaseParser(title)}-${lowerCaseParser(category)}`;
};

const WorkDescriptionPopup = (props: WorkDescriptionPopupProps) => {
    const { workPopupData, className, onClickClose } = props;
    const router = useRouter();
    const language = useRecoilValue(languageState);
    const { isPcScreenSize } = useMediaQuery();
    const maxLength = isPcScreenSize ? 120 : 80;
    const workData = workPopupData.workData;
    const id = getWorkPopupId(workData.title.en, workData.info.category[0]);
    const index = workPopupData.index;
    const descriptionLenght =
        workData && workData.description[language]?.length;
    const isOverMaxLenght: boolean =
        descriptionLenght !== undefined && descriptionLenght > maxLength;
    const workDetailPath = `/works/${id}`;

    if (workData) {
        return (
            <Popup
                title={`${workData.info.category} - ${workData.info.role.join(
                    ", ",
                )}`}
                index={index + 1}
                className={cn("container", className)}
                isActive={false}
                isDraggable={false}
                onClickClose={onClickClose}
                isRandomPositon={false}
            >
                <p>
                    {workData.description[language]
                        ?.substring(0, maxLength)
                        .trimEnd()}

                    {isOverMaxLenght && (
                        <>
                            ...
                            <Link href={workDetailPath}>
                                <span
                                    className={cn("link")}
                                    onTouchStart={() =>
                                        isPcScreenSize &&
                                        router.push(workDetailPath)
                                    }
                                >
                                    read more
                                </span>
                            </Link>
                        </>
                    )}
                </p>

                {isPcScreenSize &&
                    workData.link &&
                    workData.link.map((link, index) => {
                        return (
                            <Link
                                href={link.url}
                                target="_blank"
                                className={cn("link", "link--block")}
                                onTouchStart={() =>
                                    isPcScreenSize && touchRedirect(link.url)
                                }
                                key={`${link.url}-${index}`}
                            >
                                Visit the {link.type} →
                            </Link>
                        );
                    })}

                {!isPcScreenSize && workData.link && (
                    <Link
                        href={workData.link[0].url}
                        target="_blank"
                        className={cn("link", "link--block")}
                        onTouchStart={() =>
                            isPcScreenSize &&
                            workData.link &&
                            touchRedirect(workData.link[0].url)
                        }
                    >
                        Visit the {workData.link[0].type} →
                    </Link>
                )}

                {!isOverMaxLenght && (
                    <Link href={workDetailPath}>
                        <span
                            className={cn("link", "link--block")}
                            onTouchStart={() =>
                                isPcScreenSize && router.push(workDetailPath)
                            }
                        >
                            Read More →
                        </span>
                    </Link>
                )}
            </Popup>
        );
    } else {
        return null;
    }
};

export default WorkDescriptionPopup;
