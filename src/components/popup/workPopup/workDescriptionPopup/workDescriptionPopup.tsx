import styles from "./workDescriptionPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import Popup from "components/popup/popup";
import Link from "next/link";
import { WorkPopupProps } from "../workPopup";
import { useRouter } from "next/router";
import useMediaQuery from "hooks/useMediaQuery";
import { lowerCaseParser } from "libs/textParser";
import { Language } from "interface/enums";
import { getLocalizedText } from "libs/languageHelper";
import { useMemo, useCallback, memo } from "react";
import useClearQueryString from "hooks/useClearQueryString";
const cn = cb.bind(styles);

export interface WorkDescriptionPopupProps extends WorkPopupProps {
    className?: string;
    onClickClose?: () => void;
}

export const getWorkPopupId = (title: string | undefined, category: string) => {
    return `${lowerCaseParser(title)}-${lowerCaseParser(category)}`;
};

// 언어별 한 줄당 문자 수 설정 (언어별 문자 폭 특성 반영)
const CHARS_PER_LINE = {
    PC: {
        [Language.en]: 45, // 영어: 알파벳은 좁음
        [Language.ko]: 35, // 한국어: 중간
        [Language.jp]: 25, // 일본어: 한자+히라가나는 넓음
    },
    MOBILE: {
        [Language.en]: 28,
        [Language.ko]: 22,
        [Language.jp]: 15,
    },
} as const;

// 최대 표시 줄 수
const MAX_LINES = 5;

const WorkDescriptionPopup = (props: WorkDescriptionPopupProps) => {
    const { workPopupData, className, onClickClose } = props;
    const router = useRouter();
    const language = useRecoilValue(languageState);
    const { isPcScreenSize } = useMediaQuery();

    const workData = workPopupData.workData;

    // id를 useMemo로 메모이제이션
    const id = useMemo(
        () => getWorkPopupId(workData.title.en, workData.info.category[0]),
        [workData.title.en, workData.info.category],
    );

    const index = workPopupData.index;

    // localizedDescription을 useMemo로 메모이제이션
    const localizedDescription = useMemo(
        () => getLocalizedText(workData.description, language),
        [workData.description, language],
    );

    // 원본 텍스트를 줄 단위로 분할
    const descriptionLines = useMemo(
        () => localizedDescription?.split("\n") || [],
        [localizedDescription],
    );

    // 현재 화면/언어에 따른 한 줄당 문자 수
    const charsPerLine = useMemo(
        () =>
            isPcScreenSize
                ? CHARS_PER_LINE.PC[language]
                : CHARS_PER_LINE.MOBILE[language],
        [isPcScreenSize, language],
    );

    // 줄 수 계산 헬퍼 함수
    const calculateWrappedLines = useCallback(
        (line: string): number => {
            if (line.trim().length === 0) return 1;
            return Math.max(1, Math.ceil(line.length / charsPerLine));
        },
        [charsPerLine],
    );

    // 각 줄이 word-wrap으로 몇 줄이 될지 예상 계산
    const estimatedTotalLines = useMemo(
        () =>
            descriptionLines.reduce(
                (total, line) => total + calculateWrappedLines(line),
                0,
            ),
        [descriptionLines, calculateWrappedLines],
    );

    // 예상 줄 수가 MAX_LINES를 초과하는지 확인
    const isOverMaxLength = estimatedTotalLines > MAX_LINES;

    // MAX_LINES까지만 표시할 텍스트
    const trimmedDescription = useMemo(() => {
        if (!isOverMaxLength) {
            return descriptionLines.join("\n");
        }

        let currentLines = 0;
        const result: string[] = [];

        for (const line of descriptionLines) {
            const wrappedLines = calculateWrappedLines(line);
            const newTotal = currentLines + wrappedLines;

            if (newTotal <= MAX_LINES) {
                result.push(line);
                currentLines = newTotal;
            } else {
                // MAX_LINES를 초과하면 현재 줄을 잘라서 추가
                const remainingLines = MAX_LINES - currentLines;
                if (remainingLines > 0 && line.trim().length > 0) {
                    const maxChars = remainingLines * charsPerLine;
                    result.push(line.substring(0, maxChars).trim());
                }
                break;
            }
        }

        return result.join("\n");
    }, [
        descriptionLines,
        isOverMaxLength,
        charsPerLine,
        calculateWrappedLines,
    ]);

    // workDetailPath를 useMemo로 메모이제이션
    const workDetailPath = useMemo(() => `/works/${id}`, [id]);

    // title을 useMemo로 메모이제이션
    const popupTitle = useMemo(
        () =>
            `${workData.info.category.join(", ")} - ${workData.info.role.join(
                ", ",
            )}`,
        [workData.info.category, workData.info.role],
    );

    const handleClearQueryString = useClearQueryString();

    if (workData) {
        return (
            <Popup
                title={popupTitle}
                index={index + 1}
                className={cn("container", className)}
                isActive={false}
                isDraggable={false}
                onClickClose={onClickClose}
                isRandomPosition={false}
            >
                <p>
                    {trimmedDescription}

                    {isOverMaxLength && (
                        <>
                            ...
                            <Link
                                href={workDetailPath}
                                onClick={handleClearQueryString}
                            >
                                <span
                                    className={cn("link")}
                                    onTouchStart={() =>
                                        isPcScreenSize &&
                                        router.push(workDetailPath)
                                    }
                                >
                                    read more
                                </span>
                            </Link>
                        </>
                    )}
                </p>

                {!isOverMaxLength && (
                    <Link
                        href={workDetailPath}
                        onClick={handleClearQueryString}
                    >
                        <span
                            className={cn("link", "link--block")}
                            onTouchStart={() =>
                                isPcScreenSize && router.push(workDetailPath)
                            }
                        >
                            Read More →
                        </span>
                    </Link>
                )}
            </Popup>
        );
    } else {
        return null;
    }
};

// React.memo로 불필요한 리렌더링 방지
export default memo(WorkDescriptionPopup);
