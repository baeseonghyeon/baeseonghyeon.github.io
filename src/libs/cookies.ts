import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (keyName: string, value: any, option: any) => {
    return cookies.set(keyName, value, { ...option });
};

export const getCookie = (keyName: string) => {
    return cookies.get(keyName);
};

export const darkModeStateCookieKey = "darkModeStateCookie";
