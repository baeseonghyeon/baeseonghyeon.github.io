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
import ProfileListItem from "./profileListItem";

const cn = cb.bind(styles);

export interface ProfileProps {}

const Profile: NextPage = (props: ProfileProps) => {
    const {} = props;
    const language = useRecoilValue(languageState);
    const profile: ProfileDTO = profileJson;
    const textProfiles: textProfileType[] = profile.text;
    const listProfiles: listProfileType[] = profile.list;

    return (
        <Layout title="Profile" className={cn("container")}>
            {textProfiles.map((item, idx) => {
                return (
                    <Popup
                        title={item.common?.toUpperCase()}
                        isHighlight={idx === 0}
                        key={`popup--${item.sort}`}
                        idx={Number(item.sort)}
                        className={cn(`popup__${item.common}`)}
                        style={{ order: item.sort }}
                    >
                        {item[language]}
                    </Popup>
                );
            })}
            {listProfiles.map((item) => {
                return (
                    <Popup
                        title={item.title.toUpperCase()}
                        key={`popup--${item.sort}`}
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
        </Layout>
    );
};

export default Profile;
