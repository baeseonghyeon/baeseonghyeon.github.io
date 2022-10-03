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
import { useState } from "react";
import ShuffleButton from "components/shuffleButton/shuffleButton";
import ProfileListItem from "../../components/iconListItem/iconListItem";
import ScrollTargetPopup from "components/popup/scrollTargetPopup/scrollTargetPopup";
const cn = cb.bind(styles);

export interface ProfileProps {}

const Profile: NextPage = (props: ProfileProps) => {
    const {} = props;
    const language = useRecoilValue(languageState);
    const profile: ProfileDTO = profileJson;
    const textProfiles: textProfileType[] = profile.text;
    const listProfiles: listProfileType[] = profile.list;
    const [isRandomPositon, setIsRandomPositon] = useState<boolean>(true);

    return (
        <Layout title="Profile">
            {textProfiles.map((item, idx) => {
                return (
                    <ScrollTargetPopup
                        id={`popup__${item.common}`}
                        title={item.common?.toUpperCase()}
                        isActive={idx === 0}
                        isRandomPositon={isRandomPositon}
                        key={`popup--${item.common}-${item.sort}`}
                        index={Number(item.sort)}
                        className={cn(`popup__${item.common}`)}
                        style={{ order: item.sort }}
                    >
                        <p>{item[language]}</p>
                    </ScrollTargetPopup>
                );
            })}
            {listProfiles.map((item) => {
                return (
                    <ScrollTargetPopup
                        id={`popup__${item.title}`}
                        title={item.title.toUpperCase()}
                        isRandomPositon={isRandomPositon}
                        key={`popup--${item.title}-${item.sort}`}
                        index={Number(item.sort)}
                        className={cn(
                            "popup__list__container",
                            `popup__${item.title}`,
                        )}
                        style={{ order: item.sort }}
                    >
                        <ul>
                            {item.listData.map((list, index) => {
                                return (
                                    <ProfileListItem
                                        listData={list}
                                        key={`${list.title}-${index}-item`}
                                    />
                                );
                            })}
                        </ul>
                    </ScrollTargetPopup>
                );
            })}
            <ShuffleButton
                onClick={() => setIsRandomPositon(!isRandomPositon)}
            />
        </Layout>
    );
};

export default Profile;
