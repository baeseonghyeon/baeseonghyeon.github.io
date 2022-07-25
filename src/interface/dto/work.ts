import { MultilingualContent } from "interface";
export interface WorkDTO {
    data: WorkData[];
}

export interface WorkData {
    title: MultilingualContent;
    info: WorkInfo;
    description: WorkDescription;
    link?: WorkLink[] | null;
    thumbUrl?: string | null;
    image?: WorkMediaContent[] | null;
    video?: WorkMediaContent[] | null;
}

export interface WorkInfo {
    date: string;
    category: string[];
    role: string[];
    stack: string[];
    team?: MultilingualContent | null;
}

export enum WorkCategoryEnums {
    Website = "Website",
    Application = "Application",
}

export enum WorkRoleEnums {
    Development = "Development",
    Planning = "Planning",
    Design = "Design",
}

export interface WorkDescription extends MultilingualContent {
    link?: WorkDescriptionLink[];
}

export interface WorkDescriptionLink extends MultilingualContent {
    url?: string;
}

export interface WorkLink {
    type: string;
    url: string;
}

export type WorkLinkType = "Github Repository" | "Website";

export interface WorkMediaContent {
    url: string;
    fullSize?: boolean;
}
