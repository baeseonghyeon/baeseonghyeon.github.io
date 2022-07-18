import styles from "./profileListItem.module.scss";
import cb from "classnames/bind";
import { ListContent } from "interface/dto/profile";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
const cn = cb.bind(styles);

export interface ProfileListItemProps {
    listData: ListContent;
}

const ProfileListItem = (props: ProfileListItemProps) => {
    const { listData } = props;
    const language = useRecoilValue(languageState);
    const isIcon = listData.icon !== undefined;

    const listIconHandler = (name?: string) => {
        switch (name) {
            case "Github":
                return <FontAwesomeIcon icon={faGithub} />;
            case "Linkedin":
                return <FontAwesomeIcon icon={faLinkedin} />;
            default:
                return <FontAwesomeIcon icon={faInstagram} />;
        }
    };

    return (
        <li className={cn(isIcon && "list--has-icon")}>
            {listData.icon && isIcon && (
                <span className={cn("brand-icon")}>
                    {listIconHandler(listData.title.common)}
                </span>
            )}

            <a href={listData.url} target="_blank">
                {listData.title[language]}
                {!isIcon && "("}
                {listData.title["common"]}
                {!isIcon && ")"}
            </a>
        </li>
    );
};

export default ProfileListItem;
