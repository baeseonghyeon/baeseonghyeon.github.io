import styles from "./workDetailDescriptionPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import { touchRedirect } from "libs/touchHandler";
import useMediaQuery from "hooks/useMediaQuery";
import ScrollTargetPopup from "components/popup/scrollTargetPopup/scrollTargetPopup";
import Link from "next/link";
import { getLocalizedText } from "libs/languageHelper";
const cn = cb.bind(styles);

export interface WorkDetailDescriptionPopupProps {
    workData: WorkData;
}

const WorkDetailDescriptionPopup = (props: WorkDetailDescriptionPopupProps) => {
    const { workData } = props;
    const language = useRecoilValue(languageState);
    const { isPcScreenSize } = useMediaQuery();

    if (workData) {
        const localizedTitle = getLocalizedText(workData.title, language);
        const localizedDescription = getLocalizedText(
            workData.description,
            language,
        );

        return (
            <ScrollTargetPopup
                id={`${localizedTitle}-description` as string}
                title={localizedTitle}
                index={1}
                className={cn("container")}
            >
                {localizedDescription}{" "}
                {workData.description.link?.map((item, index, { length }) => {
                    return (
                        <Link
                            href={item.url ? item.url : ""}
                            target="_blank"
                            onTouchStart={() =>
                                isPcScreenSize && touchRedirect(item.url)
                            }
                            key={`${item.common}-${index}`}
                        >
                            {index === 0 && "("}
                            {item.common
                                ? item.common
                                : getLocalizedText(item, language)}
                            {index !== length - 1 ? ", " : ")"}
                        </Link>
                    );
                })}
                {workData.link?.map((item, index) => {
                    return (
                        <Link
                            href={item.url}
                            target="_blank"
                            className={cn("link")}
                            onTouchStart={() =>
                                isPcScreenSize && touchRedirect(item.url)
                            }
                            key={`${item.url}-${index}`}
                        >
                            Visit the {item.type} →
                        </Link>
                    );
                })}
            </ScrollTargetPopup>
        );
    } else {
        return null;
    }
};

export default WorkDetailDescriptionPopup;
