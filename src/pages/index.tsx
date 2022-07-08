import useDarkMode from "hooks/useDarkMode";
import type { NextPage } from "next";
import { useEffect } from "react";
import styles from "styles/Home.module.css";
import Profile from "./profile";

const Home: NextPage = () => {
    return <Profile />;
};

export default Home;
