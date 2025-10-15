import { useRouter } from "next/router";
import { useCallback } from "react";

const useClearQueryString = () => {
    const router = useRouter();
    return useCallback(() => {
        if (window.location.search) {
            router.replace(window.location.pathname, undefined, {
                shallow: true,
            });
        }
    }, [router]);
};

export default useClearQueryString;
