import styles from "./iconListItem.module.scss";
import cb from "classnames/bind";
import { ListContent } from "interface/dto/profile";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { touchRedirect } from "libs/touchHandler";
import VelogLogoIcon from "components/icons/velogLogoIcon";
import Link from "next/link";
const cn = cb.bind(styles);

export interface IconListItemProps {
    listData: ListContent;
}

const IconListItem = (props: IconListItemProps) => {
    const { listData } = props;
    const language = useRecoilValue(languageState);
    const isIcon = listData && listData.icon !== undefined;

    const listIconHandler = (name?: string) => {
        switch (name) {
            case "Github":
                return <FontAwesomeIcon icon={faGithub} />;
            case "LinkedIn":
                return <FontAwesomeIcon icon={faLinkedin} />;
            default:
                return <VelogLogoIcon />;
        }
    };

    const getListContent = () => {
        return (
            <>
                {listData.title[language]}
                {!isIcon && "("}
                {listData.title["common"]}
                {!isIcon && ")"}
            </>
        );
    };

    if (listData) {
        return (
            <li className={cn(isIcon && "list--has-icon")}>
                {listData.icon && isIcon && (
                    <span className={cn("brand-icon")}>
                        {listIconHandler(listData.title.common)}
                    </span>
                )}

                {listData.url ? (
                    <Link
                        href={listData.url}
                        target="_blank"
                        onTouchStart={() => touchRedirect(listData.url, true)}
                    >
                        {getListContent()}
                    </Link>
                ) : (
                    getListContent()
                )}
            </li>
        );
    } else {
        return null;
    }
};

export default IconListItem;
