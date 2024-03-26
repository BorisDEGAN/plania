import { AppResponseType } from "@/shared/types";
import requestApi from "./request.service";
import { IUser } from "@/shared/models";


export default function userApi() {
    const USER_URL = "users";
    const request = requestApi(USER_URL);

    function getUsers(params?: Object): AppResponseType<IUser[]> {
        return request.get(`${USER_URL}/all`, params);
    }

    function getUser(id: number | string): AppResponseType<IUser> {
        return request.get(`${USER_URL}/${id}`);
    }

    function createUser(data: IUser): AppResponseType<IUser> {
        return request.post(USER_URL, data);
    }

    function updateUser(
        id: number | string,
        data: IUser
    ): AppResponseType<IUser> {
        return request.put(`${USER_URL}/${id}`, data);
    }

    function deleteUser(id: number | string): AppResponseType<IUser> {
        return request.del(`${USER_URL}/${id}`);
    }

    function searchUsers(data: Object): AppResponseType<IUser[]> {
        return request.post(`${USER_URL}/search`, data);
    }

    return {
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        searchUsers,
    };
}
