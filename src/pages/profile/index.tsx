import { NextPage } from "next";
import styles from "./profile.module.scss";
import cb from "classnames/bind";
import Layout from "components/layout/layout";
import {
    listProfileType,
    ProfileDTO,
    textProfileType,
} from "interface/dto/profile";
import profileJson from "data/profile.json";
import { languageState } from "recoil/ui";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import ShuffleButton from "components/shuffleButton/shuffleButton";
import ProfileListItem from "../../components/iconListItem/iconListItem";
import ScrollTargetPopup from "components/popup/scrollTargetPopup/scrollTargetPopup";
import { getLocalizedText } from "libs/languageHelper";
import { clearAllPositions } from "libs/positionHandler";
const cn = cb.bind(styles);

export interface ProfileProps {}

const Profile: NextPage = (props: ProfileProps) => {
    const {} = props;
    const language = useRecoilValue(languageState);
    const profile = profileJson as ProfileDTO;
    const textProfiles: textProfileType[] = profile.text;
    const listProfiles: listProfileType[] = profile.list;
    const [shuffleTrigger, setShuffleTrigger] = useState<number>(0);

    // 페이지 마운트 시 위치 초기화 (깨끗한 상태에서 시작)
    useEffect(() => {
        clearAllPositions();
    }, []);

    return (
        <Layout title="Profile">
            {textProfiles.map((item, idx) => (
                <ScrollTargetPopup
                    id={`popup__${item.common}`}
                    title={`${item.common?.toUpperCase()}`}
                    isActive={idx === 0}
                    isRandomPosition={shuffleTrigger}
                    key={`popup--${item.common}-${idx}`}
                    index={item.sort ?? idx}
                    className={cn(`popup__${item.common}`)}
                    style={{ order: idx }}
                >
                    <p>{getLocalizedText(item, language)}</p>
                </ScrollTargetPopup>
            ))}
            {listProfiles.map((item, idx) => (
                <ScrollTargetPopup
                    id={`popup__${item.title}`}
                    title={`${item.title.toUpperCase()}`}
                    isRandomPosition={shuffleTrigger}
                    key={`popup--${item.title}-${idx + textProfiles.length}`}
                    index={item.sort ?? idx + textProfiles.length}
                    className={cn(
                        "popup__list__container",
                        `popup__${item.title}`,
                    )}
                    style={{ order: idx + textProfiles.length }}
                >
                    <ul>
                        {item.listData.map((list, listIdx) => (
                            <ProfileListItem
                                listData={list}
                                key={`${list.title}-${listIdx}-item`}
                            />
                        ))}
                    </ul>
                </ScrollTargetPopup>
            ))}
            <ShuffleButton
                onClick={() => {
                    clearAllPositions();
                    setShuffleTrigger((prev) => prev + 1);
                }}
            />
        </Layout>
    );
};

export default Profile;
