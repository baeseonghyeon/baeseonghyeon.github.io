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
import Popup from "components/popup/popup";
import { useState } from "react";
import ShuffleButton from "components/shuffleButton/shuffleButton";
import ProfileListItem from "../../components/profileListItem/profileListItem";

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
        <Layout title="Profile" className={cn("container")}>
            {textProfiles.map((item, idx) => {
                return (
                    <Popup
                        title={item.common?.toUpperCase()}
                        isActive={idx === 0}
                        isRandomPositon={isRandomPositon}
                        key={`popup--${item.common}-${item.sort}`}
                        idx={Number(item.sort)}
                        className={cn(`popup__${item.common}`)}
                        style={{ order: item.sort }}
                    >
                        <p>{item[language]}</p>
                    </Popup>
                );
            })}
            {listProfiles.map((item) => {
                return (
                    <Popup
                        title={item.title.toUpperCase()}
                        isRandomPositon={isRandomPositon}
                        key={`popup--${item.title}-${item.sort}`}
                        idx={Number(item.sort)}
                        className={cn(
                            "popup__list__container",
                            `popup__${item.title}`,
                        )}
                        style={{ order: item.sort }}
                    >
                        <ul>
                            {item.listData.map((list) => {
                                return <ProfileListItem listData={list} />;
                            })}
                        </ul>
                    </Popup>
                );
            })}
            <ShuffleButton
                onClick={() => setIsRandomPositon(!isRandomPositon)}
            />
        </Layout>
    );
};

export default Profile;
