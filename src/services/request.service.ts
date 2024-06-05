import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import useToast from "@/shared/helpers/useToast";

export default function requestApi(queryMutationKey?: string) {
    const axiosInstance = axios.create({
        baseURL: `https://plan.wazemi.net/api`,
        timeout: 60000,
    });

    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = Cookies.get("auth_token");
            if (token) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }
            return config;
        },
        error => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        response => response.data,
        async error => {
            console.log('error', error)
            if (error.response.status === 401) {
                try {
                    const res: any = await axiosInstance.post("/auth/refresh/tokens", {
                        token: Cookies.get("refresh_token")
                    });

                    error.config.headers['Authorization'] = `Bearer ${res.auth_token}`;

                    Cookies.set('auth_token', res.auth_token)

                    return axiosInstance(error.config);

                } catch (error) {
                    Cookies.remove('auth_token');

                    Cookies.remove('refresh_token');

                    useToast().toastError('Votre session est expirée, veuillez vous reconnecter!');

                    const url = `${window.location.origin}/sign-in`;

                    window.location.replace(url)
                }

            } else {

                const res = error.response && error.response.data;

                if (res && res.message && typeof res.message === "string") {

                    useToast().toastError(res.message);
                } else if (res && res.message && typeof res.message === "object") {

                    useToast().toastError(res.message[0]);
                }

                return Promise.reject(error);
            }
        }
    );

    function get(url: string, params?: Object) {
        return axiosInstance.get(url, { params });
    }

    function post(url: string, data: Object | undefined) {
        return axiosInstance.post(url, data);
    }

    function put(url: string, data: Object | undefined) {
        return axiosInstance.put(url, data);
    }

    function patch(url: string, data: Object | undefined) {
        return axiosInstance.patch(url, data);
    }

    function del(url: string) {
        return axiosInstance.delete(url);
    }

    return {
        get,
        post,
        put,
        del,
        patch,
    };
}
