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
import { getLocalizedText } from "libs/languageHelper";
import { useMemo, useCallback, memo } from "react";
const cn = cb.bind(styles);

export interface IconListItemProps {
    listData: ListContent;
}

const IconListItem = (props: IconListItemProps) => {
    const { listData } = props;
    const language = useRecoilValue(languageState);
    const isIcon = listData && listData.icon !== undefined;

    // listIconHandler를 useCallback으로 메모이제이션
    const listIconHandler = useCallback((name?: string) => {
        switch (name) {
            case "Github":
                return <FontAwesomeIcon icon={faGithub} />;
            case "LinkedIn":
                return <FontAwesomeIcon icon={faLinkedin} />;
            default:
                return <VelogLogoIcon />;
        }
    }, []);

    // 텍스트 관련 값들을 useMemo로 메모이제이션
    const { localizedText, commonText, showCommon } = useMemo(() => {
        const localizedText = getLocalizedText(listData.title, language);
        const commonText = listData.title["common"];
        const showCommon = localizedText !== commonText;

        return { localizedText, commonText, showCommon };
    }, [listData.title, language]);

    // getListContent를 useMemo로 메모이제이션
    const listContent = useMemo(() => {
        return (
            <>
                {localizedText}
                {!isIcon && showCommon && "("}
                {!isIcon && showCommon && commonText}
                {!isIcon && showCommon && ")"}
            </>
        );
    }, [localizedText, commonText, showCommon, isIcon]);

    if (listData) {
        return (
            <li className={cn(isIcon && "list--has-icon")}>
                {listData.icon && isIcon && (
                    <span className={cn("brand-icon")}>
                        {listIconHandler(listData.title.common)}
                    </span>
                )}

                {listData.url ? (
                    <Link href={listData.url} target="_blank">
                        {listContent}
                    </Link>
                ) : (
                    listContent
                )}
            </li>
        );
    } else {
        return null;
    }
};

export default memo(IconListItem);
