import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { withRouter } from "next/router";
import { useScrollInitializer } from "hooks/useScrollInitializer";

function MyApp({ Component, pageProps }: AppProps) {
    const ScrollInit = withRouter(useScrollInitializer);

    return (
        <RecoilRoot>
            <ScrollInit />
            <Component {...pageProps} />
        </RecoilRoot>
    );
}

export default MyApp;
