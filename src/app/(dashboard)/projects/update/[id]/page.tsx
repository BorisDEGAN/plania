"use client";

import InputText from "@/components/Form/InputText";
import { Card } from "@/components/common/Card/Card";
import { Button } from "@/components/ui/button";
import projectPlanApi from "@/services/project-plan.service";
import useToast from "@/shared/helpers/useToast";
import { useFormik } from "formik";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import * as yup from "yup";

export default function Create({ params }: { params: { id: string } }) {

    const [loading, setLoading] = React.useState(false)

    const router = useRouter()

    const { toastSuccess } = useToast()

    const [project] = React.useState<{ project_id: string | number, new_duration: number, new_budget: number }>({
        project_id: params.id,
        new_budget: 0,
        new_duration: 0
    })

    const { values, handleChange, errors, handleSubmit } = useFormik({
        initialValues: project,
        validationSchema: yup.object().shape({
            project_id: yup.number().required(),
            new_budget: yup.string().required(),
            new_duration: yup.number().required()
        }),
        onSubmit: (values) => {
            setLoading(true)
            projectPlanApi().createProjectPlan(values).then((response) => {
                toastSuccess(response.message)
                router.push("/projects")
            }).finally(() => setLoading(false))
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Card title={`Actualiser les données`}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputText name="new_budget" label="Budget" value={values.new_budget} onChange={handleChange} errors={errors.new_budget} />
                        <InputText name="new_duration" label="Durée (Jours)" type="number" value={values.new_duration} onChange={handleChange} errors={errors.new_duration} />
                    </div>
                </Card>
                <div className="w-full flex justify-end">
                    <Button type="submit" variant="default" loading={loading}>Actualiser</Button>
                </div>
            </form>
        </div>
    );
}
