import Layout from "components/layout/layout";
import { NextPage } from "next";
import { useState } from "react";
import cb from "classnames/bind";
import styles from "./works.module.scss";
import { WorkDTO } from "interface/dto/work";
import workJson from "data/work.json";
import Popup from "components/popup/popup";
import { useRecoilState } from "recoil";
import { workFilterState } from "recoil/ui";
import ShuffleButton from "components/shuffleButton/shuffleButton";
import FilterButton from "components/filterButton/filterButton";
import WorkListItem from "../../components/popup/workPopup/workListItem/workListItem";
import WorkPopup from "../../components/popup/workPopup/workPopup";
import { firsttLetterCapitalizer } from "libs/textParser";

const cn = cb.bind(styles);

const Works: NextPage = () => {
    const [workFilterValue, setWorkFilterValue] =
        useRecoilState(workFilterState);
    const works: WorkDTO = workJson;
    const [isRandomPositon, setIsRandomPositon] = useState<boolean>(true);

    const filteredWorkData = works.data
        .slice(0)
        .reverse()
        .filter((item) =>
            workFilterValue === "All"
                ? item
                : workFilterValue === "Website" ||
                  workFilterValue === "Application"
                ? item.info.category.includes(workFilterValue)
                : item.info.role.includes(workFilterValue),
        );

    return (
        <Layout title={"Works"}>
            <Popup
                title={`${firsttLetterCapitalizer(workFilterValue)} Works`}
                index={0}
                isActive={true}
                isRandomPositon={false}
                className={cn(`popup__all-work`)}
                buttons={[
                    <FilterButton
                        onChange={(e) => setWorkFilterValue(e.target.value)}
                    />,
                ]}
            >
                {filteredWorkData.map((item, index) => {
                    return (
                        <WorkListItem
                            workPopupData={{
                                workData: item,
                                index: filteredWorkData.length - index,
                                isRandomPositon: isRandomPositon,
                            }}
                            key={filteredWorkData.length - index}
                        />
                    );
                })}
            </Popup>

            {filteredWorkData.map((item, index) => {
                return (
                    <WorkPopup
                        workPopupData={{
                            workData: item,
                            index: index,
                            isRandomPositon: isRandomPositon,
                        }}
                        key={index}
                    />
                );
            })}

            <ShuffleButton
                onClick={() => setIsRandomPositon(!isRandomPositon)}
            />
        </Layout>
    );
};

export default Works;
