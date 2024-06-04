import { AppResponseType } from "@/shared/types";
import requestApi from "./request.service";
import { IProject } from "@/shared/models";


export default function projectApi() {
    const URL_KEY = "projects";
    const request = requestApi(URL_KEY);

    function getProjects(params?: Object): AppResponseType<IProject[]> {
        return request.get(`${URL_KEY}`, params);
    }

    function getProject(id: number | string): AppResponseType<IProject> {
        return request.get(`${URL_KEY}/${id}`);
    }

    function createProject(data: IProject): AppResponseType<IProject> {
        return request.post(URL_KEY, data);
    }

    function updateProject(
        id: number | string,
        data: IProject
    ): AppResponseType<IProject> {
        return request.put(`${URL_KEY}/${id}`, data);
    }

    function deleteProject(id: number | string): AppResponseType<IProject> {
        return request.del(`${URL_KEY}/${id}`);
    }

    function searchProjects(data: Object): AppResponseType<IProject[]> {
        return request.post(`${URL_KEY}/search`, data);
    }

    return {
        getProjects,
        getProject,
        createProject,
        updateProject,
        deleteProject,
        searchProjects,
    };
}
