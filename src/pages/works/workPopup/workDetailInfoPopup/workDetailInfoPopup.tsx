import styles from "./workDetailInfoPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import { firsttLetterCapitalizer } from "libs/textParser";
const cn = cb.bind(styles);

export interface WorkDetailInfoPopupProps {
    workData: WorkData;
}

const WorkDetailInfoPopup = (props: WorkDetailInfoPopupProps) => {
    const { workData } = props;
    const language = useRecoilValue(languageState);

    return (
        <Popup
            title={workData.title[language]}
            isActive={true}
            idx={0}
            className={cn("container")}
        >
            {Object.entries(workData.info).map((item) => {
                return (
                    <li className={cn("list")}>
                        <p>
                            <strong>
                                {item[1] && firsttLetterCapitalizer(item[0])}
                                {item[1] && " : "}
                            </strong>
                            {item[1]
                                ? typeof item[1] === "string"
                                    ? item[1]
                                    : Array.isArray(item[1])
                                    ? item[1].map(
                                          (item: string, idx, { length }) => {
                                              let isLast: boolean =
                                                  idx === length - 1;
                                              return `${item}${
                                                  !isLast ? ", " : ""
                                              }`;
                                          },
                                      )
                                    : item[1][language]
                                : null}
                        </p>
                    </li>
                );
            })}
        </Popup>
    );
};

export default WorkDetailInfoPopup;
