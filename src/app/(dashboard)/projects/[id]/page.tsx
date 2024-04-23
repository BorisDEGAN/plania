"use client";

import { DocumentPrinter } from "@/components/Document/Index";
import PageLoad from "@/components/Loader/PageLoad";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { PROJECT_STATE } from "@/shared/types";
import React, { useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [project, setProject] = useState<IProject | null>(null)

    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        (() => {
            setLoading(true)
            projectApi().getProject(id).then((response) => {
                setProject(response.data)
            }).finally(() => setLoading(false))
        })()
    }, [id])

    return (
        loading
            ? <PageLoad />
            : <>
                {
                    project && <div>
                        <DocumentPrinter project={project} />
                    </div>
                }
            </>
    );
}
