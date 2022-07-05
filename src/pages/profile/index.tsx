import { NextPage } from 'next';
import styles from './profile.module.scss';
import cb from 'classnames/bind';
import Layout from 'components/layout/layout';
const cn = cb.bind(styles);

export interface ProfileProps {}

const Profile: NextPage = (props: ProfileProps) => {
    const {} = props;

    return (
        <Layout title="Profile">
            <h1>profile</h1>
        </Layout>
    );
};

export default Profile;
