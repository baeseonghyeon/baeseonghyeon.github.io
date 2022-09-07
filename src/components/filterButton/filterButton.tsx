import cb from "classnames/bind";
import styles from "./filterButton.module.scss";
import React, { HtmlHTMLAttributes, useRef } from "react";
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

    return (
        <div
            className={cn("button")}
            onTouchStart={() => selectRef.current?.focus()}
        >
            <IoMdOptions></IoMdOptions>
            <select
                defaultValue={workFilterValue}
                className={cn("select")}
                onChange={onChange}
                ref={selectRef}
            >
                <option value="All">All</option>
                {Object.keys(WorkCategoryEnums).map((item) => {
                    return <option value={item}>{item}</option>;
                })}

                {Object.keys(WorkRoleEnums).map((item) => {
                    return <option value={item}>{item}</option>;
                })}
            </select>
        </div>
    );
};

export default FilterButton;
