import { IProject } from "@/shared/models";
import useRequestApi from "./use-request.service";

export default function useTestApi() {

    const PROJECTS_KEY = "projects";
    const STATS_KEY = "statistiques";
    const statsRequest = useRequestApi(STATS_KEY);
    const projectsRequest = useRequestApi(PROJECTS_KEY);

    function projectsStats() {
        return statsRequest.useGetQuery(`${STATS_KEY}/projects/count`);
    }

    function projectPlansStats() {
        return statsRequest.useGetQuery(`${STATS_KEY}/project-plans/count`);
    }

    function getProjects() {
        return projectsRequest.useGetQuery(`${PROJECTS_KEY}}`,);
    }

    function getProject(id: number | string) {
        return projectsRequest.useGetQuery(`${PROJECTS_KEY}/${id}`);
    }

    function createProject(params: IProject) {
        return projectsRequest.usePostQuery(PROJECTS_KEY, params);
    }

    function updateProject(
        id: number | string,
        params: IProject
    ) {
        return projectsRequest.usePostQuery(`${PROJECTS_KEY}/${id}`, params);
    }

    function deleteProject(id: number | string) {
        return projectsRequest.useDelQuery(`${PROJECTS_KEY}/${id}`);
    }

    function searchProjects(params: Object) {
        return projectsRequest.usePostQuery(`${PROJECTS_KEY}/search`, params);
    }

    return {
        projectsStats,
        projectPlansStats,
        getProjects,
        getProject,
        createProject,
        updateProject,
        deleteProject,
        searchProjects,
    };
}
