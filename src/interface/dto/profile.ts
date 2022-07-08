import { MultilingualContent } from "interface";
import { StackCapitalize, Stacks } from "./stack";

export interface ProfileDTO {
    data: ProfileData;
}

export interface ProfileData {
    intro: MultilingualContent;
    comment: MultilingualContent;
    contact: Contact[];
    career: Career[];
    skill: Skill[];
    description: MultilingualContent;
}

export interface Contact {
    name: string;
    url: string;
}

export interface Career {
    title: MultilingualContent;
    date: string;
    url: string;
}

export interface Skill {
    category: MultilingualContent;
    // stack: StackCapitalize[];
    stack: string[];
}
