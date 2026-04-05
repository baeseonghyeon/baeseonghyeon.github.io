import Layout from "components/layout/layout";
import { NextPage } from "next";
import { useState, useEffect, useMemo } from "react";
import cb from "classnames/bind";
import { useRecoilState } from "recoil";
import styles from "./works.module.scss";
import { WorkData, WorkDTO } from "interface/dto/work";
import Popup from "components/popup/popup";
import { workFilterState } from "recoil/ui";
import ShuffleButton from "components/shuffleButton/shuffleButton";
import FilterButton from "components/filterButton/filterButton";
import WorkListItem from "../../components/popup/workPopup/workListItem/workListItem";
import WorkPopup from "../../components/popup/workPopup/workPopup";
import { firstLetterCapitalizer } from "libs/textParser";
import { clearAllPositions } from "libs/positionHandler";
import { fetchWork } from "libs/firestore";

const cn = cb.bind(styles);

const Works: NextPage = () => {
    const [workFilterValue, setWorkFilterValue] =
        useRecoilState(workFilterState);
    const [workData, setWorkData] = useState<WorkData[]>([]);
    const [shuffleTrigger, setShuffleTrigger] = useState<number>(0);

    // 페이지 마운트 시 위치 초기화 및 Firestore 데이터 로드
    useEffect(() => {
        clearAllPositions();
        fetchWork().then((works: WorkDTO) => {
            setWorkData(works.data);
        });
    }, []);

    // 필터링된 작업 데이터 메모이제이션 (workFilterValue 변경 시에만 재계산)
    const filteredWorkData = useMemo(() => {
        return workData
            .slice(0)
            .reverse()
            .filter((item) =>
                workFilterValue === "All"
                    ? item
                    : workFilterValue === "Web" || workFilterValue === "Mobile"
                    ? item.info.category.includes(workFilterValue)
                    : item.info.role.includes(workFilterValue),
            );
    }, [workFilterValue, workData]);

    return (
        <Layout title={"Works"}>
            <Popup
                title={`${firstLetterCapitalizer(workFilterValue)} Works`}
                index={0}
                isActive={true}
                isRandomPosition={false}
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
                                isRandomPosition: shuffleTrigger,
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
                            isRandomPosition: shuffleTrigger,
                        }}
                        key={index}
                    />
                );
            })}

            <ShuffleButton
                onClick={() => {
                    clearAllPositions(); // 저장된 위치 초기화
                    setShuffleTrigger((prev) => prev + 1); // 트리거 값 증가로 항상 변경 감지
                }}
            />
        </Layout>
    );
};

export default Works;
