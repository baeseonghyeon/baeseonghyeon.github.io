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
    useMemo,
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
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );
    const [dragBounds, setDragBounds] = useState({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    });
    const [controlledPosition, setControlledPosition] = useState({
        x: 0,
        y: 0,
    });

    // 드래그 경계 업데이트 함수 (useCallback으로 메모이제이션)
    const updateDragBounds = useCallback(() => {
        if (popupRef.current) {
            const popup = popupRef.current;
            const rect = popup.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // 현재 위치를 기준으로 이동 가능한 범위 계산
            setDragBounds({
                left: -rect.left,
                top: -rect.top,
                right: viewportWidth - rect.left - rect.width,
                bottom: viewportHeight - rect.top - rect.height,
            });
        }
    }, []);

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

    // 드래그 시작 시 경계 계산 (useCallback으로 메모이제이션)
    const handleDragStart = useCallback(() => {
        updateDragBounds();
        isDraggable && increasePopupOverlay();
    }, [isDraggable, updateDragBounds, increasePopupOverlay]);

    // 드래그 중일 때 위치 업데이트 (useCallback으로 메모이제이션)
    const handleDrag = useCallback((e: any, data: { x: number; y: number }) => {
        setControlledPosition({ x: data.x, y: data.y });
    }, []);

    useLayoutEffect(() => {
        if (popupRef.current) {
            // 초기 렌더 시 위치 설정 (렌더 전에 동기적으로 실행)
            if (isRandomPosition !== false) {
                // index에 따른 지연으로 순차 배치 (셔플과 동일하게)
                // 충돌 감지가 정확하도록 충분한 간격 확보
                const delay = Math.min(index * 5, 100);
                setTimeout(() => {
                    if (popupRef.current) {
                        setPositionRandom(popupRef.current);
                        // Draggable의 내부 state 리셋
                        setControlledPosition({ x: 0, y: 0 });

                        // 위치 설정 후 드래그 경계 계산
                        setTimeout(() => {
                            updateDragBounds();
                        }, 50);
                    }
                }, delay);
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
            // index에 따른 지연 (최대 100ms로 제한)
            const delay = Math.min(index * 5, 100);
            const timer = setTimeout(() => {
                if (popupRef.current) {
                    setPositionRandom(popupRef.current);
                    // Draggable의 내부 state 리셋 (애니메이션 유지)
                    setControlledPosition({ x: 0, y: 0 });

                    // 위치 재설정 후 드래그 경계도 업데이트
                    setTimeout(() => {
                        updateDragBounds();
                    }, 50); // 위치가 완전히 적용된 후 bounds 계산
                }
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isRandomPosition, index, updateDragBounds]);

    useLayoutEffect(() => {
        if (popupRef.current === currentActivePopup && currentActivePopup !== null) {
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

    return (
        <Draggable
            disabled={isPcScreenSize ? false : true}
            grid={[50, 50]}
            bounds={dragBounds}
            position={controlledPosition}
            onStart={handleDragStart}
            onDrag={handleDrag}
            nodeRef={popupRef}
        >
            <div
                id={props.id}
                className={cn(
                    props.className,
                    "container",
                    !visibility && "hide",
                )}
                style={{ ...props.style, zIndex: zIndex, order: index }}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onClick={(e) => {
                    e.stopPropagation();
                    // 링크나 버튼 클릭 시에는 z-index 변경하지 않음
                    const target = e.target as HTMLElement;
                    const isLink = target.tagName === 'A' || target.closest('a');
                    const isButton = target.tagName === 'BUTTON' || target.closest('button');
                    
                    if (isDraggable && !isLink && !isButton) {
                        increasePopupOverlay();
                    }
                }}
                ref={popupRef}
            >
                <div
                    className={cn(
                        "header",
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
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClickClose
                                    ? onClickClose()
                                    : onClosePopup(popupRef.current);
                            }}
                            onTouchEnd={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClickClose
                                    ? onClickClose()
                                    : onClosePopup(popupRef.current);
                            }}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
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
