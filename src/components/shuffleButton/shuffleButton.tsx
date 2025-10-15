import cb from "classnames/bind";
import styles from "./shuffleButton.module.scss";
import React, {
    HtmlHTMLAttributes,
    useLayoutEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import Draggable from "react-draggable";
import { IoMdClose } from "react-icons/io";
import { setPositionRandom } from "libs/positionHandler";

const cn = cb.bind(styles);

interface ShuffleButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
    onClick: () => void;
}

const ShuffleButton = (props: ShuffleButtonProps) => {
    const { onClick } = props;
    const [visibility, setVisibility] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false); // 초기 로드 완료 여부
    const [isShuffling, setIsShuffling] = useState(false); // 셔플 진행 중
    const buttonRef = useRef<HTMLDivElement>(null);
    const shuffleTimerRef = useRef<NodeJS.Timeout | null>(null);

    useLayoutEffect(() => {
        if (buttonRef.current !== null) {
            setPositionRandom(buttonRef.current);
            // 위치 설정 후 fade-in
            setTimeout(() => {
                setIsLoaded(true);
            }, 50);
        }
    }, []);

    // onCloseButton을 useCallback으로 메모이제이션
    const onCloseButton = useCallback(() => {
        setVisibility((prev) => !prev);
    }, []);

    // handleShuffleClick - 디바운스 적용
    const handleShuffleClick = useCallback(() => {
        if (!visibility || isShuffling) return; // 셔플 중이면 무시

        // 이전 타이머 취소
        if (shuffleTimerRef.current) {
            clearTimeout(shuffleTimerRef.current);
        }

        setIsShuffling(true);
        onClick();

        // 애니메이션 완료 후 (0.28s + 여유) 다시 클릭 가능
        shuffleTimerRef.current = setTimeout(() => {
            setIsShuffling(false);
        }, 400); // 0.28s 애니메이션 + 120ms 여유
    }, [visibility, onClick, isShuffling]);

    return (
        <Draggable bounds="div" nodeRef={buttonRef}>
            <div
                className={cn(
                    "container",
                    !visibility && "hide",
                    !isLoaded && "fade-in", // 초기 로드 시 fade-in
                )}
                ref={buttonRef}
            >
                <div
                    className={cn("close__button")}
                    onClick={onCloseButton}
                    onTouchStart={onCloseButton}
                >
                    <IoMdClose size={17.5} />
                </div>
                <div
                    className={cn("wrapper")}
                    onClick={handleShuffleClick}
                    onTouchStart={handleShuffleClick}
                />
            </div>
        </Draggable>
    );
};

export default ShuffleButton;
