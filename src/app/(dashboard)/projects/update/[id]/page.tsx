"use client";

import InputText from "@/components/Form/InputText";
import { Card } from "@/components/common/Card/Card";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import React from "react";
import { useFormState } from "react-dom";

export default function Create({ params }: { params: { id: string } }) {

    const [project, setProject] = React.useState<Partial<IProject>>({})

    const { values, handleChange, errors, handleSubmit } = useFormik({
        initialValues: project,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Card title="Mettre a jour les données">
                    <div className="grid grid-cols-2 gap-4">
                        <InputText name="budget" label="Budget" value={values.budget} onChange={handleChange} errors={errors.budget} />
                        <InputText name="duration" label="Durée (Jours)" type="number" value={values.duration} onChange={handleChange} errors={errors.duration} />
                    </div>
                </Card>
            </form>
        </div>
    );
}
