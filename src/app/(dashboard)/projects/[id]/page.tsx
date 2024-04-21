"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DocumentPrinter } from "@/components/Document/Index";
import PageLoad from "@/components/Loader/PageLoad";
import { Badge } from "@/components/ui/badge";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { PROJECT_STATE } from "@/shared/types";
import React, { useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [project, setProject] = useState<IProject | null>(null)

    const [loading, setLoading] = useState(false)

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

    React.useEffect(() => {
        (() => {
            setLoading(true)
            projectApi().getProject(id).then((response) => {
                setProject(response.data)
                console.log(response.data)
            }).finally(() => setLoading(false))
        })()
    }, [id])

    return (
        loading
            ? <PageLoad />
            : <>
                {
                    project && <div>
                        <Breadcrumb pageName={project.title as string} />

                        <DocumentPrinter project={project} />
                    </div>
                }
            </>
    );
}
