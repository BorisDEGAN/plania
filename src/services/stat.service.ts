import { AppResponseType } from "@/shared/types";
import requestApi from "./request.service";

export default function statApi() {
    const URL_KEY = "statistiques";
    const request = requestApi(URL_KEY);

    function projectsStats(): AppResponseType<any> {
        return request.get(`${URL_KEY}/projects/count`);
    }

    function projectPlansStats(): AppResponseType<any> {
        return request.get(`${URL_KEY}/project-plans/count`);
    }

    return {
        projectsStats,
        projectPlansStats
    };
}
