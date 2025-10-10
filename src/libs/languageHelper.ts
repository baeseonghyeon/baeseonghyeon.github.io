import { Language } from "interface/enums";
import { MultilingualContent } from "interface";

/**
 * 다국어 콘텐츠에서 현재 언어의 텍스트를 가져옵니다.
 * 해당 언어가 없으면 영어, 그것도 없으면 한국어로 fallback합니다.
 * @param content 다국어 콘텐츠 객체
 * @param language 현재 언어
 * @returns 해당 언어의 텍스트 또는 fallback 텍스트
 */
export const getLocalizedText = (
    content: MultilingualContent | undefined,
    language: Language,
): string => {
    if (!content) return "";

    // 현재 언어가 있으면 반환
    if (content[language]) {
        return content[language]!;
    }

    // fallback: jp -> en -> ko -> common
    if (language === Language.jp && content.en) {
        return content.en;
    }

    if (content.en) {
        return content.en;
    }

    if (content.ko) {
        return content.ko;
    }

    if (content.common) {
        return content.common;
    }

    return "";
};
