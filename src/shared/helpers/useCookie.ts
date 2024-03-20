import Cookies from "js-cookie";

export default function useCookie(): {
    getCookie: (key: string) => string | undefined;
    setCookie: (
        key: string,
        value: string,
        options?: Cookies.CookieAttributes
    ) => void;
    removeCookie: (key: string) => void;
} {
    function getCookie(key: string) {
        return Cookies.get(key);
    }

    function setCookie(
        key: string,
        value: string,
        options?: Cookies.CookieAttributes
    ) {
        Cookies.set(key, value, options);
    }

    function removeCookie(key: string) {
        Cookies.remove(key);
    }

    return { getCookie, setCookie, removeCookie };
}
