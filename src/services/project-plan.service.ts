import { AppResponseType } from "@/shared/types";
import requestApi from "./request.service";
import { IProjectPlan } from "@/shared/models";


export default function projectPlanApi() {
    const URL_KEY = "project-plans";
    const request = requestApi(URL_KEY);

    function getProjectPlans(params?: Object): AppResponseType<IProjectPlan[]> {
        return request.get(`${URL_KEY}/all`, params);
    }

    function getProjectPlan(id: number | string): AppResponseType<IProjectPlan> {
        return request.get(`${URL_KEY}/${id}`);
    }

    function createProjectPlan(data: any): AppResponseType<IProjectPlan> {
        return request.post(URL_KEY, data);
    }

    function updateProjectPlan(
        id: number | string,
        data: IProjectPlan
    ): AppResponseType<IProjectPlan> {
        return request.put(`${URL_KEY}/${id}`, data);
    }

    function deleteProjectPlan(id: number | string): AppResponseType<IProjectPlan> {
        return request.del(`${URL_KEY}/${id}`);
    }

    function searchProjectPlans(data: Object): AppResponseType<IProjectPlan[]> {
        return request.post(`${URL_KEY}/search`, data);
    }

    return {
        getProjectPlans,
        getProjectPlan,
        createProjectPlan,
        updateProjectPlan,
        deleteProjectPlan,
        searchProjectPlans,
    };
}
