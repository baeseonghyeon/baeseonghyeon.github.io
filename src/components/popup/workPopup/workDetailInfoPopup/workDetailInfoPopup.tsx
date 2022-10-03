import styles from "./workDetailInfoPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import { firsttLetterCapitalizer } from "libs/textParser";
import ScrollTargetPopup from "components/popup/scrollTargetPopup/scrollTargetPopup";
import { Fragment } from "react";
const cn = cb.bind(styles);

export interface WorkDetailInfoPopupProps {
    workData: WorkData;
}

const WorkDetailInfoPopup = (props: WorkDetailInfoPopupProps) => {
    const { workData } = props;
    const language = useRecoilValue(languageState);

    if (workData) {
        return (
            <ScrollTargetPopup
                id={workData.title[language] as string}
                title={workData.title[language]}
                isActive={true}
                index={0}
                className={cn("container")}
            >
                {Object.entries(workData.info).map((item, index) => {
                    return (
                        <li className={cn("list")} key={index}>
                            <p>
                                <strong>
                                    {item[1] &&
                                        firsttLetterCapitalizer(item[0])}
                                    {item[1] && " : "}
                                </strong>
                                {item[1]
                                    ? typeof item[1] === "string"
                                        ? item[1]
                                        : Array.isArray(item[1])
                                        ? item[1].map(
                                              (
                                                  item: string,
                                                  index,
                                                  { length },
                                              ) => {
                                                  let isLast: boolean =
                                                      index === length - 1;
                                                  return (
                                                      <Fragment key={index}>
                                                          {item}
                                                          {!isLast ? ", " : ""}
                                                      </Fragment>
                                                  );
                                              },
                                          )
                                        : item[1][language]
                                    : null}
                            </p>
                        </li>
                    );
                })}
            </ScrollTargetPopup>
        );
    } else {
        return null;
    }
};

export default WorkDetailInfoPopup;
