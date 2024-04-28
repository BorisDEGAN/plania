"use client";;
import { DocumentPrinter } from "@/components/Document/Index";
import PageLoad from "@/components/Loader/PageLoad";
import projectPlanApi from "@/services/project-plan.service";
import { IProjectPlan } from "@/shared/models";
import React, { useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [projectPlan, setProjectPlan] = useState<IProjectPlan | null>(null)

    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        (() => {
            setLoading(true)
            projectPlanApi().getProjectPlan(id).then((response) => {
                setProjectPlan(response.data)
            }).finally(() => setLoading(false))
        })()
    }, [id])

    return (
        loading
            ? <PageLoad />
            : <>
                {
                    projectPlan && <div>
                        <DocumentPrinter project={projectPlan} />
                    </div>
                }
            </>
    );
}
