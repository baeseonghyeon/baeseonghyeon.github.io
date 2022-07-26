import { Language } from "interface/enums";
import { atom, selector } from "recoil";

export const darkModeState = atom<boolean>({
    key: "darkModeState",
    default: false,
});

export const languageState = atom<Language>({
    key: "languageState",
    default: Language.ko,
});

export const workFilterState = atom<string>({
    key: "workFilterState",
    default: "All",
});

export const popupOverlayState = atom<number>({
    key: "popupOverlayState",
    default: 999,
});

export const currentActivePopupState = atom<HTMLDivElement | null>({
    key: "currentActivePopupState",
    default: null,
});
