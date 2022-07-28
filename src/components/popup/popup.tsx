import styles from "./popup.module.scss";
import cb from "classnames/bind";
import {
    HtmlHTMLAttributes,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import Draggable from "react-draggable";
import useMediaQuery from "hooks/useMediaQuery";
import { currentActivePopupState, popupOverlayState } from "recoil/ui";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosClose, IoMdClose } from "react-icons/io";
const cn = cb.bind(styles);

export interface PopupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    idx: number;
    title?: string;
    isActive?: boolean;
    isDraggable?: boolean;
    isRandomPositon?: boolean;
    buttons?: ReactNode[];
    bodyClassName?: string;
}

const Popup = (props: PopupProps) => {
    const {
        title = "title",
        idx,
        isActive = false,
        isDraggable = true,
        isRandomPositon = true,
        buttons = null,
        bodyClassName,
    } = props;

    const { isPcScreenSize } = useMediaQuery();
    const [zIndex, setZindex] = useState<number>(100 + idx * -1);
    const [popupOverlayDepth, setPopupOverlayDepth] =
        useRecoilState(popupOverlayState);

    const [visibility, setVisibility] = useState<boolean>(true);
    const popupRef = useRef<HTMLDivElement>(null);
    const [currentActivePopup, setCurrentActivePopup] = useRecoilState(
        currentActivePopupState,
    );

    useEffect(() => {
        if (popupRef.current !== null) {
            if (isRandomPositon) {
                setPositionRandom(popupRef.current);
            }
            if (isActive) {
                setCurrentActivePopup(popupRef.current);
            }
        }
    }, []);

    useEffect(() => {
        if (popupRef.current === currentActivePopup) {
            increasePopupOveray();
        }
    }, [currentActivePopup]);

    useEffect(() => {
        if (popupRef.current !== null) {
            setPositionRandom(popupRef.current);
        }
    }, [isRandomPositon]);

    const setPositionRandom = (element: HTMLDivElement) => {
        element.style.left = `${Math.floor(
            Math.random() * (window.innerWidth - element.offsetWidth),
        )}px`;
        element.style.top = `${Math.floor(
            Math.random() * (window.innerHeight - element.offsetHeight),
        )}px`;
    };

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
        >
            <div
                id={props.id}
                className={cn(
                    "container",
                    !visibility && "hide",
                    props.className,
                )}
                style={(props.style, { zIndex: zIndex, order: idx })}
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
                        {buttons !== null &&
                            buttons.map((button) => {
                                return button;
                            })}
                        <div
                            className={cn("close__button")}
                            onClick={() => onClosePopup(popupRef.current)}
                            onTouchStart={() =>
                                isPcScreenSize && onClosePopup(popupRef.current)
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
