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
    isRandomPositon?: boolean;
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
        isRandomPositon = true,
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
            if (isRandomPositon) {
                setPositionRandom(popupRef.current);
            }
            if (isActive) {
                setCurrentActivePopup(popupRef.current);
            }
        }
    }, []);

    useEffect(() => {
        if (popupRef.current) {
            setPositionRandom(popupRef.current);
        }
    }, [isRandomPositon]);

    useLayoutEffect(() => {
        if (popupRef.current === currentActivePopup) {
            increasePopupOveray();
            scrollToPopup(currentActivePopup);
        }
    }, [currentActivePopup]);

    const increasePopupOveray = () => {
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
            onDrag={() => isDraggable && increasePopupOveray()}
            onMouseDown={() => isDraggable && increasePopupOveray()}
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
                            onClick={
                                onClickClose
                                    ? onClickClose
                                    : () => onClosePopup(popupRef.current)
                            }
                            onTouchStart={
                                onClickClose
                                    ? onClickClose
                                    : () =>
                                          isPcScreenSize &&
                                          onClosePopup(popupRef.current)
                            }
                        >
                            <IoMdClose size={17.5} />
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
