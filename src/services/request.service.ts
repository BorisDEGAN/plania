import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import useToast from "@/shared/helpers/useToast";

export default function requestApi(queryMutationKey?: string) {
    const axiosInstance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        timeout: 60000,
    });

    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            if (
                true /* Un hook pour verifier si on est connecté a internet */
            ) {
                const token = Cookies.get("auth_token");
                if (token) {
                    config.headers.set("Authorization", `Bearer ${token}`);
                }
                return config;
            } else {
                useToast().toastError(`Vous n'etes pas connecté à internet!`);
                throw new Error("Vous n'etes pas connecté à internet!");
            }
        },
        error => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        response => response.data,
        async error => {
            /**
             * Plus besoin de handle les notifications d'erreur pour chaque requete effectue,
             * ca se fera automatiquement ici
             * */

            if (error.response && error.response.data && error.response.data.message === "Token has expired" && error.response.data.statusCode === 401) {

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
                console.log("❌❌❌ Error request", queryMutationKey, error);

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
