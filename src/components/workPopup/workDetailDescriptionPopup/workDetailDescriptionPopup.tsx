import styles from "./workDetailDescriptionPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import { touchRedirect } from "libs/touchHandler";
import useMediaQuery from "hooks/useMediaQuery";
const cn = cb.bind(styles);

export interface WorkDetailDescriptionPopupProps {
    workData: WorkData;
}

const WorkDetailDescriptionPopup = (props: WorkDetailDescriptionPopupProps) => {
    const { workData } = props;
    const language = useRecoilValue(languageState);
    const { isPcScreenSize } = useMediaQuery();

    if (workData) {
        return (
            <Popup
                title={workData.title[language]}
                idx={1}
                className={cn("container")}
            >
                <p>
                    {workData.description[language]}{" "}
                    {workData.description.link?.map((item, idx, { length }) => {
                        return (
                            <a
                                href={item.url}
                                target="_blank"
                                onTouchStart={() =>
                                    isPcScreenSize && touchRedirect(item.url)
                                }
                            >
                                {idx === 0 && "("}
                                {item.common ? item.common : item[language]}
                                {idx !== length - 1 ? ", " : ")"}
                            </a>
                        );
                    })}
                </p>

                {workData.link?.map((item) => {
                    return (
                        <a
                            href={item.url}
                            target="_blank"
                            className={cn("link")}
                            onTouchStart={() =>
                                isPcScreenSize && touchRedirect(item.url)
                            }
                        >
                            Visit the {item.type} →
                        </a>
                    );
                })}
            </Popup>
        );
    } else {
        return null;
    }
};

export default WorkDetailDescriptionPopup;
