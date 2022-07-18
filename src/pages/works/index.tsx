import Layout from "components/layout/layout";
import { NextPage } from "next";
import { useState } from "react";
import cb from "classnames/bind";
import styles from "./works.module.scss";
import { WorkCategoryEnums, WorkDTO } from "interface/dto/work";
import workJson from "data/work.json";
import Popup from "components/popup/popup";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import ShuffleButton from "components/shuffleButton/shuffleButton";
import FilterButton from "components/filterButton/filterButton";
import WorkListItem from "./workListItem/workListItem";
import WorkPopup from "./workPopup/workPopup";

const cn = cb.bind(styles);

const Works: NextPage = () => {
    const language = useRecoilValue(languageState);
    const works: WorkDTO = workJson;
    const [isRandomPositon, setIsRandomPositon] = useState<boolean>(true);
    const [activePopup, setActivePopup] = useState<number>();
    const [filterValue, setFilterValue] = useState<"All" | WorkCategoryEnums>(
        "All",
    );

    const filteredWorkData = works.data
        .slice(0)
        .reverse()
        .filter((item) =>
            filterValue === "All"
                ? item
                : item.info.category.includes(filterValue),
        );

    return (
        <Layout title={"Page"}>
            <Popup
                title={`${filterValue} Works`}
                idx={0}
                isActive={true}
                isRandomPositon={false}
                className={cn(`popup__all-work`)}
                buttons={[
                    <FilterButton
                        onChange={(e) => setFilterValue(e.target.value)}
                    />,
                ]}
            >
                {filteredWorkData.map((item, idx) => {
                    return (
                        <WorkListItem
                            workData={item}
                            idx={filteredWorkData.length - idx}
                        />
                    );
                })}
            </Popup>

            {filteredWorkData.map((item, idx) => {
                return (
                    <WorkPopup
                        workData={item}
                        isRandomPositon={isRandomPositon}
                        idx={idx}
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
