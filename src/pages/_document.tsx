import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="ko">
            <Head />
            <body>
                {/* 다크모드 FOUC 방지 - HTML 파싱 전에 즉시 실행 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    function getCookie(name) {
                                        const value = document.cookie.match('(^|;)\\\\s*' + name + '\\\\s*=\\\\s*([^;]+)');
                                        return value ? value.pop() : null;
                                    }
                                    
                                    const darkModeCookie = getCookie('darkModeStateCookie');
                                    const isSystemThemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    
                                    let isDark = false;
                                    if (darkModeCookie === null || darkModeCookie === undefined) {
                                        isDark = isSystemThemeDark;
                                    } else {
                                        isDark = darkModeCookie === 'true';
                                    }
                                    
                                    // 기존 클래스 제거 후 즉시 적용
                                    document.body.className = '';
                                    if (isDark) {
                                        document.body.classList.add('dark-theme');
                                    } else {
                                        document.body.classList.add('bright-theme');
                                    }
                                } catch (e) {
                                    // 에러 발생 시 시스템 설정 따름
                                    console.error('Theme initialization error:', e);
                                }
                            })();
                        `,
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
