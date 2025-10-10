import { Language } from "interface/enums";
import { atom, selector } from "recoil";

// SSR과 CSR 모두 동일한 기본값 사용 (Hydration 에러 방지)
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
