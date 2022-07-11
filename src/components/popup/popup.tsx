import styles from "./popup.module.scss";
import cb from "classnames/bind";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import useMediaQuery from "hooks/useMediaQuery";
import { currentPopupState, popupOverlayState } from "recoil/ui";
import { useRecoilState } from "recoil";
const cn = cb.bind(styles);

export interface PopupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    idx: number;
    title?: string;
    isActive?: boolean;
    isRandomPositon?: boolean;
}

const Popup = (props: PopupProps) => {
    const {
        title = "title",
        idx,
        isActive = false,
        isRandomPositon = true,
    } = props;

    const [screenWidth] = useMediaQuery();
    const isPcScreenSize = screenWidth > 768;

    const [zIndex, setZindex] = useState<number>(100 + idx * -1);
    const [popupOverlayDepth, setPopupOverlayDepth] =
        useRecoilState(popupOverlayState);

    const [visibility, setVisibility] = useState<boolean>(true);
    const popupRef = useRef<HTMLDivElement>(null);
    const [currentActivePopup, setCurrentActivePopup] =
        useRecoilState(currentPopupState);

    useEffect(() => {
        if (isRandomPositon && popupRef.current !== null) {
            setPositionRandom(popupRef.current);
        }
        setCurrentActivePopup(null);
    }, []);

    useEffect(() => {
        if (popupRef.current !== null) {
            setPositionRandom(popupRef.current);
        }
    }, [isRandomPositon]);

    const setPositionRandom = (element: HTMLDivElement) => {
        element.style.left = `${
            Math.random() * ((window.innerWidth - element.offsetWidth) * 0.8) +
            window.innerWidth * 0.13
        }px`;
        element.style.top = `${
            Math.random() *
                ((window.innerHeight - element.offsetHeight) * 0.7) +
            window.innerHeight * 0.12
        }px`;
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
            axis="both"
            handle=""
            defaultPosition={{ x: 0, y: 0 }}
            grid={[25, 25]}
            scale={1}
            onDrag={() => increasePopupOveray()}
            onMouseDown={() => increasePopupOveray()}
        >
            <div
                className={cn(
                    "container",
                    !visibility && "hide",
                    props.className,
                )}
                style={(props.style, { zIndex: zIndex, order: idx })}
                ref={popupRef}
            >
                <div
                    className={cn(
                        "header",
                        isActive &&
                            currentActivePopup === null &&
                            "header--active",
                        currentActivePopup === popupRef.current &&
                            "header--active",
                    )}
                >
                    {title}
                    <div
                        className={cn("close__button")}
                        onClick={() => onClosePopup(popupRef.current)}
                        onTouchStart={() =>
                            isPcScreenSize && onClosePopup(popupRef.current)
                        }
                    >
                        ×
                    </div>
                </div>
                <div className={cn("body")}>{props.children}</div>
            </div>
        </Draggable>
    );
};

export default Popup;
