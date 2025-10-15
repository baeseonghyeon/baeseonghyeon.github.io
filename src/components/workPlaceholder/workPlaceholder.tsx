import styles from "./workPlaceholder.module.scss";
import cb from "classnames/bind";

const cn = cb.bind(styles);

export interface WorkPlaceholderProps {
    title: string;
    category: string;
    className?: string;
    style?: React.CSSProperties;
}

// DOM 렌더링용 컴포넌트
const WorkPlaceholder = ({
    title,
    category,
    className,
    style,
}: WorkPlaceholderProps) => {
    return (
        <div className={cn("placeholder__content", className)} style={style}>
            <div className={cn("placeholder__group")}>
                <img
                    src="/favicon/apple-touch-icon.png"
                    alt="logo"
                    className={cn("placeholder__icon")}
                />
                <div className={cn("speech-bubbles")}>
                    <div className={cn("speech-bubble")}>
                        <p>{title}.</p>
                    </div>
                    <div className={cn("speech-bubble")}>
                        <p>{category}.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkPlaceholder;
