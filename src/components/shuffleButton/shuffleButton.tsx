import cb from "classnames/bind";
import styles from "./shuffleButton.module.scss";
import React, { HtmlHTMLAttributes, useRef, useState } from "react";
import Draggable from "react-draggable";

const cn = cb.bind(styles);

interface ShuffleButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
    onClick: () => void;
}

const ShuffleButton = (props: ShuffleButtonProps) => {
    const { onClick } = props;
    const [visibility, setVisibility] = useState(true);

    const buttonRef = useRef<HTMLDivElement>(null);

    const onCloseButton = (popupElement: HTMLDivElement | null) => {
        setVisibility(!visibility);
    };

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }} grid={[25, 25]}>
            <div className={cn("container", !visibility && "hide")}>
                <div
                    className={cn("close__button")}
                    onClick={() => onCloseButton(buttonRef.current)}
                >
                    <span>×</span>
                </div>

                <div
                    ref={buttonRef}
                    className={cn("wrapper")}
                    onClick={() => visibility && onClick()}
                >
                    shuffle!
                </div>
            </div>
        </Draggable>
    );
};

export default ShuffleButton;
