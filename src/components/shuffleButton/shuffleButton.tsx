import cb from "classnames/bind";
import styles from "./shuffleButton.module.scss";
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
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
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (buttonRef.current !== null) {
            setPositionRandom(buttonRef.current);
        }
    }, []);

    const onCloseButton = () => {
        setVisibility(!visibility);
    };

    return (
        <Draggable grid={[50, 50]} bounds="div">
            <div
                className={cn("container", !visibility && "hide")}
                ref={buttonRef}
            >
                <div
                    className={cn("close__button")}
                    onClick={() => onCloseButton()}
                    onTouchStart={() => onCloseButton()}
                >
                    <IoMdClose size={17.5} />
                </div>

                <div
                    className={cn("wrapper")}
                    onClick={() => visibility && onClick()}
                    onTouchStart={() => visibility && onClick()}
                />
            </div>
        </Draggable>
    );
};

export default ShuffleButton;
