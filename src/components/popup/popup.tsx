import styles from "./popup.module.scss";
import cb from "classnames/bind";
import { HtmlHTMLAttributes, useRef, useState } from "react";
import Draggable from "react-draggable";
import useMediaQuery from "hooks/useMediaQuery";
const cn = cb.bind(styles);

export interface PopupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    idx: number;
    title: string;
}

const Popup = (props: PopupProps) => {
    const { title, idx } = props;
    const [screenWidth] = useMediaQuery();
    const popupRef = useRef<HTMLDivElement>(null);
    const [visibility, setVisibility] = useState<boolean>(true);
    const [zIndex, setZindex] = useState<number>();

    const onClosePopup = (popupId: number) => {
        setVisibility(false);
    };

    return (
        <Draggable
            disabled={screenWidth > 768 ? false : true}
            axis="both"
            handle=""
            defaultPosition={{ x: 0, y: 0 }}
            // position={undefined}
            grid={[25, 25]}
            scale={1}
            onDrag={() => setZindex(9999)}
            // onStop={() => setZindex(highlight ? 100 : 5 + id)}
        >
            <div
                className={cn(
                    "container",
                    !visibility && "hide",
                    props.className,
                )}
            >
                <div className={cn("header")}>
                    {title}
                    <div
                        className={cn("close__button")}
                        onClick={() => onClosePopup(idx)}
                        onTouchStart={() => onClosePopup(idx)}
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
