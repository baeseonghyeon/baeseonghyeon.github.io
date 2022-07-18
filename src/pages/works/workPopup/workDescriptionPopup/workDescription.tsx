import styles from "./workDescription.module.scss";
import cb from "classnames/bind";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { WorkData } from "interface/dto/work";
import Popup from "components/popup/popup";
import useMediaQuery from "hooks/useMediaQuery";
import Link from "next/link";
const cn = cb.bind(styles);

export interface WorkDescriptionProps {
    workData: WorkData;
    idx: number;
}

const WorkDescription = (props: WorkDescriptionProps) => {
    const { workData, idx } = props;
    const language = useRecoilValue(languageState);
    const [screenSize] = useMediaQuery();
    const isPcScreenSize = screenSize > 768;

    const maxLength = 80;
    const descriptionLenght = workData.description[language]?.length;
    const isOverMaxLenght: boolean =
        descriptionLenght !== undefined && descriptionLenght > maxLength;

    return (
        <Popup
            title={`${workData.info.category} - ${workData.info.role}`}
            idx={idx + 1}
            className={cn("container")}
        >
            {workData.description[language]?.substring(0, maxLength)}

            {isOverMaxLenght && (
                <>
                    ...
                    <Link href={`/works/${idx}`}>read more</Link>
                </>
            )}

            {!isOverMaxLenght && (
                <div>
                    <Link href={`/works/${idx}`}>Read More →</Link>
                </div>
            )}
        </Popup>
    );
};

export default WorkDescription;
