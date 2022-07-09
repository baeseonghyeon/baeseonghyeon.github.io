import styles from "./popup.module.scss";
import cb from "classnames/bind";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import useMediaQuery from "hooks/useMediaQuery";
const cn = cb.bind(styles);

export interface PopupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    idx: number;
    title?: string;
    isHighlight?: boolean;
    isRandomPositon?: boolean;
}

const Popup = (props: PopupProps) => {
    const {
        title = "title",
        idx,
        isHighlight = false,
        isRandomPositon = true,
    } = props;

    const [screenWidth] = useMediaQuery();
    const isPcScreenSize = screenWidth > 768;

    const popupOrder = idx + (isHighlight ? 100 : 5);
    const [zIndex, setZindex] = useState<number>(popupOrder);

    const [visibility, setVisibility] = useState<boolean>(true);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRandomPositon && popupRef.current !== null) {
            setPositionRandom(popupRef.current);
        }
    }, []);

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
            onDrag={() => setZindex(9999)}
            onStop={() => setZindex(popupOrder)}
        >
            <div
                className={cn(
                    "container",
                    !visibility && "hide",
                    props.className,
                )}
                style={(props.style, { zIndex: zIndex })}
                ref={popupRef}
                onMouseEnter={() => isPcScreenSize && setZindex(999)}
                onMouseLeave={() => isPcScreenSize && setZindex(popupOrder)}
            >
                <div
                    className={cn("header", isHighlight && "header--highlight")}
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
