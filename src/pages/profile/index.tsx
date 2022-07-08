import { NextPage } from "next";
import styles from "./profile.module.scss";
import cb from "classnames/bind";
import Layout from "components/layout/layout";
import { ProfileDTO } from "interface/dto/profile";
import profileJson from "data/profile.json";
import { useEffect } from "react";
import { languageState } from "recoil/ui";
import { useRecoilValue } from "recoil";
import Popup from "components/popup/popup";

const cn = cb.bind(styles);

export interface ProfileProps {}

const Profile: NextPage = (props: ProfileProps) => {
    const {} = props;
    const profile: ProfileDTO = profileJson;
    const language = useRecoilValue(languageState);

    useEffect(() => {
        console.log(profile.data);
        // const entry = Object.entries(profile.data);
        // const aMap = new Array(entry);
        // console.log(aMap);
    }, []);

    return (
        <Layout title="Profile">
            <Popup title="Title" idx={123}>
                {profile.data.description[language]}
            </Popup>
        </Layout>
    );
};

export default Profile;
