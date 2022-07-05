import { Language } from "interface";
import { atom } from "recoil";

export const darkModeState = atom<boolean>({
    key: "darkModeState",
    default: false,
});

export const languageState = atom<Language>({
    key: "languageState",
    default: Language.ko,
});
