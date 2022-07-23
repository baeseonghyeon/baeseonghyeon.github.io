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
    image?: WorkImage[] | null;
    video?: { url: string }[] | null;
}

export interface WorkInfo {
    date: string;
    category: string[];
    role: string[];
    stack: string[];
    team?: MultilingualContent | null;
}

// export type WorkCategory = "Website" | "Web" | "Application";

export enum WorkCategoryEnums {
    Website = "Website",
    Application = "Application",
}

// export type WorkRole = "development" | "planning" | "design";

export enum WorkRoleEnums {
    development = "development",
    planning = "planning",
    design = "design",
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

export interface WorkImage {
    url: string;
    fullSize?: boolean;
}
