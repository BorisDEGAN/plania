"use client";

import InputText from "@/components/Form/InputText";
import InputTextArea from "@/components/Form/InputTextArea";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import React from "react";

export default function CreateEditProject({ id }: { id?: string }) {

    const [project, setProject] = React.useState<IProject>({
        description: "",
        title: "",
    })

    const [loading, setLoading] = React.useState({
        submit: false,
    })

    function getProject() {
        id && projectApi().getProject(id).then((response) => {
            setProject(response.data)
        })
    }

    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: project,
        validationSchema: null,
        onSubmit: () => {

            setLoading({
                ...loading,
                submit: true
            })

            setTimeout(() => {

                setLoading({
                    ...loading,
                    submit: false
                })
            }, 3000);
        }
    })
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
                <InputText name="title" label="Titre du projet" placeholder="Titre du projet" value={values.title} onChange={handleChange} errors={errors.title} />
                <InputTextArea name="description" label="Titre du projet" placeholder="Titre du projet" value={values.description} onChange={handleChange} errors={errors.description} />
            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
            </div>
        </form>
    );
}
