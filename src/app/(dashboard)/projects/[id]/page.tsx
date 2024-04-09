"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PageLoad from "@/components/Loader/PageLoad";
import { Badge } from "@/components/ui/badge";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { PROJECT_STATE } from "@/shared/types";
import { useEffect, useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [project, setProject] = useState<IProject>({} as IProject)

    const [loading, setLoading] = useState(false)

    function getProject() {
        setLoading(true)
        projectApi().getProject(id).then((response) => {
            setProject(response.data)
        }).finally(() => setLoading(false))
    }

    function resolveStatus(status: string): { variant: "default" | "destructive" | "outline" | "secondary" | "warning" | "success" | "danger" | null | undefined, text: string } {
       switch (status) {
            case PROJECT_STATE.PENDING_STATE:
                return { variant: 'warning', text: 'En attente' }
            case PROJECT_STATE.STARTED_STATE:
                return { variant: 'success', text: 'Accepté' }
            case PROJECT_STATE.CANCELED_STATE:
                return { variant: 'danger', text: 'Annulé' }
            case PROJECT_STATE.FINISHED_STATE:
                return { variant: 'secondary', text: 'Terminé' }
            default:
                return { variant: 'outline', text: 'En attente' }
        }
    }

    useEffect(() => {
        getProject()
    })

    return (
        loading
            ? <PageLoad />
            : <>
                <div>
                    <Breadcrumb pageName={project.title as string} />
                    {/* <PDFViewer html={project.description} /> */}

                    <div className="p-2 shadow-meta-5 shadow rounded space-y-3 text-justify">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl">{project.title}</h3>
                            <Badge variant={resolveStatus(project.status as string).variant}>{resolveStatus(project.status as string).text}</Badge>
                        </div>
                        <div>{project.description}</div>
                        <div>{project.context}</div>

                    </div>
                </div>
            </>
    );
}
