import cb from "classnames/bind";
import styles from "./filterButton.module.scss";
import React, { HtmlHTMLAttributes, useRef, useCallback, memo } from "react";
import { IoMdOptions } from "react-icons/io";
import { WorkCategoryEnums, WorkRoleEnums } from "interface/dto/work";
import { workFilterState } from "recoil/ui";
import { useRecoilValue } from "recoil";

const cn = cb.bind(styles);

interface FilterButtonProps extends HtmlHTMLAttributes<HTMLSelectElement> {
    onChange: (value: any) => void;
}

const FilterButton = (props: FilterButtonProps) => {
    const { onChange } = props;
    const workFilterValue = useRecoilValue(workFilterState);
    const selectRef = useRef<HTMLSelectElement>(null);

    // handleTouchStart를 useCallback으로 메모이제이션
    const handleTouchStart = useCallback(() => {
        selectRef.current?.focus();
    }, []);

    return (
        <div className={cn("button")} onTouchStart={handleTouchStart}>
            <IoMdOptions></IoMdOptions>
            <select
                defaultValue={workFilterValue}
                className={cn("select")}
                onChange={onChange}
                ref={selectRef}
            >
                <option value="All">All</option>
                {Object.keys(WorkCategoryEnums).map((item, index) => {
                    return (
                        <option value={item} key={`${item}-${index}`}>
                            {item}
                        </option>
                    );
                })}

                {Object.keys(WorkRoleEnums).map((item, index) => {
                    return (
                        <option value={item} key={`${item}-${index}`}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

// React.memo로 불필요한 리렌더링 방지
export default memo(FilterButton);
