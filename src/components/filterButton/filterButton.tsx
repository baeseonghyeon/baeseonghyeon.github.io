import cb from "classnames/bind";
import styles from "./filterButton.module.scss";
import React, { HtmlHTMLAttributes } from "react";
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

    return (
        <div className={cn("button")}>
            <IoMdOptions></IoMdOptions>
            <select
                defaultValue={workFilterValue}
                className={cn("select")}
                onChange={onChange}
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
