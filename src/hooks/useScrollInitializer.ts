import { useRouter } from "next/router";
import { useEffect } from "react";

export const useScrollInitializer = (props: any) => {
    const { pathname } = useRouter();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return props.children;
};
