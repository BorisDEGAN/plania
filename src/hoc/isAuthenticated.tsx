"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Cookies from "js-cookie";
import useToast from "@/shared/helpers/useToast";

interface RequireAuthProps {
    isAuthenticated: boolean;
}

const isAuthenticated = <P,>(WrappedComponent: NextPage<P>) => {
    const WithAuth: NextPage<P & RequireAuthProps> = props => {

        const router = useRouter();

        const isAuthenticated = !!Cookies.get("auth_token");

        useEffect(() => {
            if (!isAuthenticated) {
                router.push("/signin");
            }

        }, [isAuthenticated, router]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return WithAuth;
};

export default isAuthenticated;