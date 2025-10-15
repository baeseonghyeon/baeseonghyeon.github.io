import styles from "./popup.module.scss";
import cb from "classnames/bind";
import {
    Fragment,
    HtmlHTMLAttributes,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Draggable from "react-draggable";
import useMediaQuery from "hooks/useMediaQuery";
import { currentActivePopupState, popupOverlayState } from "recoil/ui";
import { useRecoilState } from "recoil";
import { IoMdClose } from "react-icons/io";
import { setPositionRandom } from "libs/positionHandler";
import { scrollToPopup } from "components/popup/workPopup/workListItem/workListItem";
const cn = cb.bind(styles);

export interface PopupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    index: number;
    title?: string;
    isActive?: boolean;
    isDraggable?: boolean;
    isRandomPosition?: boolean | number; // boolean 또는 number(트리거) 허용
    buttons?: ReactNode[];
    bodyClassName?: string;
    onClickClose?: () => void;
    popupRef?: RefObject<HTMLDivElement>;
}

const Popup = (props: PopupProps) => {
    const {
        title = "title",
        index,
        isActive = false,
        isDraggable = true,
        isRandomPosition: isRandomPosition = true,
        buttons = null,
        bodyClassName,
        onClickClose,
        popupRef = useRef<HTMLDivElement>(null),
    } = props;

    const { isPcScreenSize } = useMediaQuery();
    const [zIndex, setZindex] = useState<number>(100 + index * -1);
    const [popupOverlayDepth, setPopupOverlayDepth] =
        useRecoilState(popupOverlayState);
    const [visibility, setVisibility] = useState<boolean>(true);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true); // 초기 로드 구분
    const [isShuffling, setIsShuffling] = useState<boolean>(false); // 셔플 중인지 구분
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );
    const [controlledPosition, setControlledPosition] = useState({
        x: 0,
        y: 0,
    });

    // increasePopupOverlay를 먼저 정의 (useCallback으로 메모이제이션)
    const increasePopupOverlay = useCallback(() => {
        // 전역 overlay depth를 증가시키고, 그 값을 현재 팝업의 z-index로 설정
        setPopupOverlayDepth((prev) => {
            const newDepth = prev + 1;
            setZindex(newDepth); // 새로운 depth 값을 z-index로 설정
            return newDepth;
        });
        setCurrentActivePopup(popupRef.current);
    }, [setPopupOverlayDepth, setCurrentActivePopup]);

    // 드래그 시작 시 z-index 업데이트 (useCallback으로 메모이제이션)
    const handleDragStart = useCallback(() => {
        isDraggable && increasePopupOverlay();
    }, [isDraggable, increasePopupOverlay]);

    // 드래그 중일 때 위치 업데이트 (useCallback으로 메모이제이션)
    const handleDrag = useCallback((e: any, data: { x: number; y: number }) => {
        setControlledPosition({ x: data.x, y: data.y });
    }, []);

    // 팝업 클릭 핸들러 (useCallback으로 메모이제이션)
    const handlePopupClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            // 링크나 버튼 클릭 시에는 z-index 변경하지 않음
            const target = e.target as HTMLElement;
            const isLink = target.tagName === "A" || target.closest("a");
            const isButton =
                target.tagName === "BUTTON" || target.closest("button");

            if (isDraggable && !isLink && !isButton) {
                increasePopupOverlay();
            }
        },
        [isDraggable, increasePopupOverlay],
    );

    useLayoutEffect(() => {
        if (popupRef.current) {
            // 랜덤 위치가 필요한 경우 초기에 숨김
            if (isRandomPosition !== false) {
                setVisibility(false);

                // index에 따른 지연으로 순차 배치
                const delay = Math.min(index * 5, 100);
                setTimeout(() => {
                    if (popupRef.current) {
                        setPositionRandom(popupRef.current);
                        // Draggable의 내부 state 리셋
                        setControlledPosition({ x: 0, y: 0 });

                        // 위치 설정 후 표시
                        setTimeout(() => {
                            setVisibility(true); // 위치 결정 후 fade-in
                            setIsInitialLoad(false); // 초기 로드 완료
                        }, 50);
                    }
                }, delay);
            } else {
                // 랜덤 위치가 아닌 경우 즉시 초기 로드 완료 처리
                setIsInitialLoad(false);
            }
            if (isActive) {
                setCurrentActivePopup(popupRef.current);
            }
        }
    }, []);

    useEffect(() => {
        // 셔플 버튼으로 isRandomPosition이 변경될 때만 위치 재설정
        // shuffleTrigger가 1 이상일 때만 (초기값 0 제외)
        if (
            popupRef.current &&
            isRandomPosition !== false &&
            isRandomPosition !== true &&
            isRandomPosition !== 0
        ) {
            // 셔플 시작 - transition 클래스 즉시 적용
            setIsShuffling(true);

            // index에 따른 지연 (최대 100ms로 제한)
            const delay = Math.min(index * 5, 100);
            const positionTimer = setTimeout(() => {
                if (popupRef.current) {
                    setPositionRandom(popupRef.current);
                    // Draggable의 내부 state 리셋 (애니메이션 유지)
                    setControlledPosition({ x: 0, y: 0 });
                }
            }, delay);

            // 모든 애니메이션 완료 후 transition 클래스 제거
            // delay + 0.28s animation + 여유 시간
            const transitionTimer = setTimeout(() => {
                setIsShuffling(false);
            }, delay + 300);

            return () => {
                clearTimeout(positionTimer);
                clearTimeout(transitionTimer);
            };
        }
    }, [isRandomPosition, index]);

    useLayoutEffect(() => {
        if (
            popupRef.current === currentActivePopup &&
            currentActivePopup !== null
        ) {
            // 전역 overlay depth를 증가시키고, 그 값을 현재 팝업의 z-index로 설정
            setPopupOverlayDepth((prev) => {
                const newDepth = prev + 1;
                setZindex(newDepth); // 새로운 depth 값을 z-index로 설정
                return newDepth;
            });
            // 스크롤 이동
            scrollToPopup(currentActivePopup);
        }
    }, [currentActivePopup, setPopupOverlayDepth]);

    const onClosePopup = useCallback((popupElement: HTMLDivElement | null) => {
        setVisibility(false);
        if (popupElement !== null) {
            setTimeout(() => {
                popupElement.remove();
            }, 250);
        }
    }, []);

    // Close 버튼 onClick 핸들러 (useCallback으로 메모이제이션)
    const handleCloseClick = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onClickClose ? onClickClose() : onClosePopup(popupRef.current);
        },
        [onClickClose, onClosePopup],
    );

    return (
        <Draggable
            disabled={isPcScreenSize ? false : true}
            bounds="parent"
            position={controlledPosition}
            onStart={handleDragStart}
            onDrag={handleDrag}
            nodeRef={popupRef}
            handle=".draggable-handle"
        >
            <div
                id={props.id}
                className={cn(
                    props.className,
                    "container",
                    !visibility && "hide",
                    isShuffling && "smooth-transition", // 셔플 중에만 smooth transition
                )}
                style={{ ...props.style, zIndex: zIndex, order: index }}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onClick={handlePopupClick}
                ref={popupRef}
            >
                <div
                    className={cn(
                        "header",
                        isDraggable && "draggable-handle",
                        isDraggable && "is-dragging",
                        !isInitialLoad &&
                            currentActivePopup === popupRef.current &&
                            "header--active",
                    )}
                >
                    <h1>{title}</h1>
                    <div className={cn("button__wrapper")}>
                        {buttons &&
                            buttons.map((button, index) => {
                                return (
                                    <Fragment key={index}>{button}</Fragment>
                                );
                            })}
                        <div
                            className={cn("close__button")}
                            onClick={handleCloseClick}
                            onTouchEnd={handleCloseClick}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            <IoMdClose size={isPcScreenSize ? 22 : 20} />
                        </div>
                    </div>
                </div>
                <div className={cn("body", bodyClassName)}>
                    {props.children}
                </div>
            </div>
        </Draggable>
    );
};

export default Popup;
