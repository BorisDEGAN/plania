import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import useToast from "@/shared/helpers/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useRequestApi(queryMutationKey?: string) {
    const axiosInstance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        timeout: 60000,
    });

    const toast = useToast()

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
            if (error.response.status === 401) {

                toast.toastError('Votre session est expirée, veuillez vous reconnecter!');

                const url = `${window.location.origin}/sign-in`;

                window.location.replace(url)

            } else {

                const res = error.response && error.response.data;

                if (res && res.message && typeof res.message === "string") {

                    toast.toastError(res.message);
                } else if (res && res.message && typeof res.message === "object") {

                    toast.toastError(res.message[0]);
                }

                return Promise.reject(error);
            }
        }
    );

    function useGetQuery(url: string, params?: any) {
        return useQuery({
            queryKey: [queryMutationKey],
            queryFn: () => axiosInstance.get(url, params).then(res => res.data),
        })
    }

    function usePostQuery(url: string, params?: any) {
        return useMutation({
            mutationKey: [queryMutationKey],
            mutationFn: () => axiosInstance.post(url, params),
        })
    }

    function usePutQuery(url: string, params?: any) {
        return useMutation({
            mutationKey: [queryMutationKey],
            mutationFn: () => axiosInstance.put(url, params),
        })
    }

    function usePatchQuery(url: string, params?: any) {
        return useMutation({
            mutationKey: [queryMutationKey],
            mutationFn: () => axiosInstance.put(url, params),
        })
    }

    function useDelQuery(url: string) {
        return useMutation({
            mutationKey: [queryMutationKey],
            mutationFn: () => axiosInstance.delete(url),
        })
    }

    return {
        useGetQuery,
        usePostQuery,
        usePutQuery,
        useDelQuery,
        usePatchQuery
    };
}
