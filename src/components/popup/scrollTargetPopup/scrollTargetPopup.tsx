import styles from "./scrollTargetPopup.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { currentActivePopupState } from "recoil/ui";
import Popup, { PopupProps } from "components/popup/popup";
import { useLayoutEffect, useRef, useState } from "react";
import useMediaQuery from "hooks/useMediaQuery";
const cn = cb.bind(styles);

export interface ScrollTargetPopupProps extends PopupProps {
    id: string;
}

const ScrollTargetPopup = (props: ScrollTargetPopupProps) => {
    const {
        title = "title",
        index,
        isActive = false,
        isRandomPositon = true,
        bodyClassName,
        onClickClose,
    } = props;

    const currentActivePopup = useRecoilValue(currentActivePopupState);
    const popupRef = useRef<HTMLDivElement>(null);
    const { isPcScreenSize } = useMediaQuery();
    const [innerPopupVisibility, setInnerPopupVisibility] = useState(false);

    useLayoutEffect(() => {
        if (currentActivePopup === popupRef.current) {
            setInnerPopupVisibility(true);
        } else {
            setInnerPopupVisibility(false);
        }
    }, [currentActivePopup]);

    return (
        <Popup
            title={title}
            isActive={isActive}
            isRandomPositon={isRandomPositon}
            index={index + 1}
            onMouseEnter={() => isPcScreenSize && setInnerPopupVisibility(true)}
            onMouseLeave={() =>
                isPcScreenSize &&
                !(currentActivePopup === popupRef.current) &&
                setInnerPopupVisibility(false)
            }
            onClickClose={onClickClose}
            className={props.className}
            bodyClassName={bodyClassName}
            popupRef={popupRef}
        >
            {props.children}
            <Popup
                title=""
                className={cn(
                    "target-popup",
                    `target-popup${!innerPopupVisibility && "--hide"}`,
                )}
                index={index}
            />
        </Popup>
    );
};

export default ScrollTargetPopup;
