import { MultilingualContent } from "interface";

export interface ProfileDTO {
    text: textProfileType[];
    list: listProfileType[];
}

export interface textProfileType extends MultilingualContent {
    sort: number;
}
export interface listProfileType {
    title: string;
    sort: number;
    listData: ListContent[];
}

export interface ListContent {
    title: MultilingualContent;
    icon?: boolean;
    url?: string;
}
