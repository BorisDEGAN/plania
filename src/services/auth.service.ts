import { AppResponseType } from "@/shared/types";
import requestApi from "./request.service";

export default function authApi() {
    const AUTHENTICATION_URL = "";

    const { post, del } = requestApi(AUTHENTICATION_URL);

    function signIn(credentials: object): AppResponseType<object> {
        return post(`${AUTHENTICATION_URL}/login`, credentials);
    }

    function signUp(data: object): AppResponseType<object> {
        return post(`${AUTHENTICATION_URL}/register`, data);
    }

    function signOut(): AppResponseType<object> {
        return del(`${AUTHENTICATION_URL}/logout`);
    }

    function forgotPassword(email: string): AppResponseType<object> {
        return post(`${AUTHENTICATION_URL}/password/forgot`, { email });
    }

    function resendVerificationMail(email: string): AppResponseType<object> {
        return post(`${AUTHENTICATION_URL}/resend/verification/mail`, {
            email,
        });
    }

    function confirmMailToken(token: string): AppResponseType<object> {
        return post(`${AUTHENTICATION_URL}/confirm/email`, {
            token,
        });
    }

    function resetPassword(data: {
        password: string;
        token: string;
    }): AppResponseType<object> {
        return post(`${AUTHENTICATION_URL}/reset/password`, data);
    }

    return {
        signIn,
        signUp,
        signOut,
        forgotPassword,
        resendVerificationMail,
        confirmMailToken,
        resetPassword,
    };
}
