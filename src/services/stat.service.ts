import { AppResponseType } from "@/shared/types";
import requestApi from "./request.service";


export default function statApi() {
    const URL_KEY = "stats";
    const request = requestApi(URL_KEY);

    function projectsStats(): AppResponseType<any> {
        return request.get(`${URL_KEY}/projects-stats`);
    }

    return {
        projectsStats,
    };
}
