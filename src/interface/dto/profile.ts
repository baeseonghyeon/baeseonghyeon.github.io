import { MultilingualContent } from "interface";
import { StackCapitalize, Stacks } from "./stack";

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

// export interface ProfileData {
//     bae_seonghyeon: MultilingualContent;
//     comment: MultilingualContent;
//     contact: ListContent[];
//     career: ListContent[];
//     skill: ListContent[];
//     description: MultilingualContent;
// }

export interface ListContent {
    title: MultilingualContent;
    icon?: boolean;
    url?: string;
}

// export interface Career {
//     title: MultilingualContent;
//     date: string;
//     url: string;
// }

// export interface Skill {
//     category: MultilingualContent;
//     // stack: StackCapitalize[];
//     stack: string[];
// }
