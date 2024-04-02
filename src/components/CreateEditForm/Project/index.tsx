"use client";

import InputText from "@/components/Form/InputText";
import InputTextArea from "@/components/Form/InputTextArea";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import useText from "@/shared/helpers/useText";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import React from "react";

export default function CreateEditProject({ id }: { id?: string }) {

    const [project, setProject] = React.useState<IProject>({
        title: "",
        description: "",
        context: "",
        activities: [],
        budget: [],
        budget_notes: [],
        budget_planning: [],
        outcomes: [],
        steps: [],
        steps_planning: [],
        user_id: 0,
    })

    const [loading, setLoading] = React.useState({
        submit: false,
    })

    function getProject() {
        id && projectApi().getProject(id).then((response) => {
            setProject({
                ...response.data
            })
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

    React.useEffect(() => {
        getProject()
    }, [])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Informations principales</h4>
                    </div>
                    <InputText name="title" label="Titre" value={values.title} onChange={handleChange} errors={errors.title} />
                    <InputTextArea name="description" label="Desription" value={values.description} onChange={handleChange} errors={errors.description} />
                    <InputTextArea name="context" label="Contexte" value={values.context} onChange={handleChange} errors={errors.description} />
                </div>
                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Objectifs</h4>
                    </div>
                    <div className="space-y-2">
                        {
                            values.outcomes && values.outcomes.length > 0 && values.outcomes.map((outcome, index) => (
                                <div key={index}>
                                    <InputTextArea name={`outcomes.${index}`} placeholder={`Objectif ${index + 1}`} value={values.outcomes[index]} onChange={handleChange} errors={errors.outcomes} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => values.outcomes.push("")}>Ajouter</Button>
                    </div>
                </div>
                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Etapes</h4>
                    </div>
                    <div className="space-y-2">
                        {
                            values.steps && values.steps.length > 0 && values.steps.map((outcome, index) => (
                                <div key={index}>
                                    <InputTextArea name={`steps.${index}`} placeholder={`Etape ${index + 1}`} value={values.steps[index]} onChange={handleChange} errors={errors.steps} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => values.steps.push("")}>Ajouter</Button>
                    </div>
                </div>
                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Activités</h4>
                    </div>
                    <div className="space-y-2">
                        {
                            values.activities && values.activities.length > 0 && values.activities.map((outcome, index) => (
                                <div key={index}>
                                    <InputTextArea name={`activities.${index}`} placeholder={`Activité ${index + 1}`} value={values.activities[index]} onChange={handleChange} errors={errors.activities} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => values.activities.push("")}>Ajouter</Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
            </div>
        </form>
    );
}
