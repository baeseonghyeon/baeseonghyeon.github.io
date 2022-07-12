import Layout from "components/layout/layout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import cb from "classnames/bind";
import styles from "./works.module.scss";
import { WorkCategoryEnums, WorkData, WorkDTO } from "interface/dto/work";
import workJson from "data/work.json";
import Popup from "components/popup/popup";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import ShuffleButton from "components/shuffleButton/shuffleButton";

import { MdFilterList } from "react-icons/md";
import { RiFilter3Fill } from "react-icons/ri";
import { IoMdOptions, IoIosOptions } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import FilterButton from "components/filterButton/filterButton";

const cn = cb.bind(styles);

interface PageItem {
    title: string;
}

const Works: NextPage = () => {
    const language = useRecoilValue(languageState);
    const works: WorkDTO = workJson;
    const [isRandomPositon, setIsRandomPositon] = useState<boolean>(true);
    const [filterValue, setFilterValue] = useState<"All" | WorkCategoryEnums>(
        "All",
    );

    const onFilterChange = (filterValue: "All" | WorkCategoryEnums) => {};

    //     const a: Map<WorkData, number> =

    //         const arr2 = arr1.map((currValue) => currValue + 1);

    //         const arr3 = arr1.map(function add(currValue) {
    //   return currValue + 1;
    // })

    const arr = works.data
        .slice(0)
        .reverse()
        .filter((item) =>
            filterValue === "All"
                ? item
                : item.info.category.includes(filterValue),
        )
        .map((item, idx) => {
            return { item, idx };
        });

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
            ></Popup>

            {works.data
                .slice(0)
                .reverse()
                .filter((item) =>
                    filterValue === "All"
                        ? item
                        : item.info.category.includes(filterValue),
                )
                .map((item, idx) => {
                    return (
                        <Popup
                            title={item.title[language]}
                            // isActive={idx === 0}
                            isRandomPositon={isRandomPositon}
                            key={`popup--${idx + 1}`}
                            idx={idx + 1}
                            className={cn(`popup__${idx + 1}`)}
                            // style={{ order: item.sort }}
                        >
                            {/* {item[language]} */}
                            {item.title[language]}
                        </Popup>
                    );
                })}

            <ShuffleButton
                onClick={() => setIsRandomPositon(!isRandomPositon)}
            />
        </Layout>
    );
};

export default Works;
