import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "recoil/ui";

const useDarkMode = () => {
    const [darkMode] = useRecoilState(darkModeState);

    useEffect(() => {
        // Recoil 상태에 따라 클래스 토글
        // _document.tsx의 스크립트가 이미 초기 클래스를 설정했으므로
        // 이 effect는 상태 변경 시에만 실행됨
        if (darkMode) {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("bright-theme");
        } else {
            document.body.classList.add("bright-theme");
            document.body.classList.remove("dark-theme");
        }
    }, [darkMode]);

    return darkMode;
};

export default useDarkMode;
