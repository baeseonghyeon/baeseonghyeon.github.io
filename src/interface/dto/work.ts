import { MultilingualContent } from "interface";
import {
    AppStack,
    DatabaseStack,
    DevTool,
    InfraStack,
    LanguageStack,
    Stacks,
    ThreeDStack,
    WebStack,
} from "./stack";

export interface WorkDTO {
    data: WorkData;
}

export interface WorkData {
    title: MultilingualContent;
    info: WorkInfo;
    description: WorkDescription;
    link?: WorkLink;
    thumbUrl?: string;
    image?: WorkImage[];
    video?: { url: string }[];
}

export interface WorkInfo {
    date: string;
    category: WorkCategory[];
    role: WorkRole[];
    stack: Stacks[];
    team?: MultilingualContent;
}

export type WorkCategory = "WebSite" | "Web" | "Application";

export type WorkRole = "development" | "planning" | "design";

export interface WorkDescription extends MultilingualContent {
    link?: WorkDescriptionLink;
}

export interface WorkDescriptionLink extends MultilingualContent {
    url: string;
}

export interface WorkLink {
    type: WorkLinkType;
    url: string;
}

export type WorkLinkType = "Github Repository" | "Website";

export interface WorkImage {
    url: string;
    fullSize?: boolean;
}
