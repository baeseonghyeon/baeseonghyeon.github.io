import styles from "./popup.module.scss";
import cb from "classnames/bind";
import {
    Fragment,
    HtmlHTMLAttributes,
    ReactNode,
    RefObject,
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
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );

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
        if (
            popupRef.current &&
            isRandomPosition !== false &&
            isRandomPosition !== true &&
            isRandomPosition !== 0
        ) {
            // shuffleTrigger가 1 이상일 때만 (초기값 0 제외)
            // index에 따른 지연 (최대 100ms로 제한)
            const delay = Math.min(index * 5, 100);
            const timer = setTimeout(() => {
                if (popupRef.current) {
                    setPositionRandom(popupRef.current);
                }
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isRandomPosition]);

    useLayoutEffect(() => {
        if (popupRef.current === currentActivePopup) {
            increasePopupOverlay();
            scrollToPopup(currentActivePopup);
        }
    }, [currentActivePopup]);

    const increasePopupOverlay = () => {
        setZindex(popupOverlayDepth + 1);
        setPopupOverlayDepth(popupOverlayDepth + 1);
        setCurrentActivePopup(popupRef.current);
    };

    const onClosePopup = (popupElement: HTMLDivElement | null) => {
        setVisibility(false);
        if (popupElement !== null) removePopup(popupElement);
    };

    const removePopup = (popupElement: HTMLDivElement) => {
        setTimeout(() => {
            popupElement.remove();
        }, 250);
    };

    return (
        <Draggable
            disabled={isPcScreenSize ? false : true}
            grid={[50, 50]}
            bounds="div"
            onDrag={() => isDraggable && increasePopupOverlay()}
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
                    isDraggable && increasePopupOverlay();
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
                                e.stopPropagation(); // Prevent event propagation
                                onClickClose
                                    ? onClickClose()
                                    : onClosePopup(popupRef.current);
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation(); // Prevent event propagation
                                onClickClose
                                    ? onClickClose()
                                    : isPcScreenSize &&
                                      onClosePopup(popupRef.current);
                            }}
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
