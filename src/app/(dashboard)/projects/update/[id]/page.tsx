"use client";

import InputText from "@/components/Form/InputText";
import { Card } from "@/components/common/Card/Card";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import React from "react";
import { useFormState } from "react-dom";

export default function Create({ params }: { params: { id: string } }) {

    const [project, setProject] = React.useState<Partial<IProject>>({})
    const [projectX, setProjectX] = React.useState<Partial<IProject>>({})
    const [loading, setLoading] = React.useState(false)

    const { values, handleChange, errors, handleSubmit } = useFormik({
        initialValues: project,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    function getProject() {
        setLoading(true)
        projectApi().getProject(params.id).then((response) => {
            setProjectX(response.data)
        }).finally(() => setLoading(false))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Card title={`Actualiser les données de ${projectX.title}`}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputText name="budget" label="Budget" value={values.context} onChange={handleChange} errors={errors.context} />
                        <InputText name="duration" label="Durée (Jours)" type="number" value={values.duration} onChange={handleChange} errors={errors.duration} />
                    </div>
                </Card>
            </form>
        </div>
    );
}
