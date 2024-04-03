"use client";

import InputText from "@/components/Form/InputText";
import InputTextArea from "@/components/Form/InputTextArea";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import useText from "@/shared/helpers/useText";
import useToast from "@/shared/helpers/useToast";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";

export default function CreateEditProject({ id }: { id?: string }) {

    const { toastSuccess } = useToast()

    const router = useRouter()

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
        status: "",
    })

    const [loading, setLoading] = React.useState({
        submit: false,
    })

    function getProject() {
        id && projectApi().getProject(id).then((response) => {
            setProject({
                ...project,
                ...response.data
            })
            console.log(response.data)
            console.log(project)
        })
    }

    const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
        initialValues: project,
        validationSchema: null,
        onSubmit: async (values) => {
            setLoading({ ...loading, submit: true })

            await (id
                ? projectApi().createProject(values)
                : projectApi().createProject(values)
            )
                .then((response) => {
                    toastSuccess(response.message)
                    router.push("/projects")
                })
                .finally(() => setLoading({ ...loading, submit: false }))

        }
    })

    const DeleteButton = ({ onClick }: { onClick: () => void }) => {
        return (
            <button onClick={onClick} className="absolute -top-3 -right-1 cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300">
                <Trash2 size={16} className="text-white" />
            </button>
        )
    }

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
                    <div className="space-y-4">
                        {
                            values.outcomes && values.outcomes.length > 0 && values.outcomes.map((_, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`outcomes.${index}`} placeholder={`Objectif ${index + 1}`} value={values.outcomes[index]} onChange={handleChange} errors={errors.outcomes} />
                                    <DeleteButton onClick={() => setFieldValue("outcomes", values.outcomes.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("outcomes", [...values.outcomes, ""])}>Ajouter</Button>
                    </div>
                </div>

                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Activités</h4>
                    </div>
                    <div className="space-y-4">
                        {
                            values.activities && values.activities.length > 0 && values.activities.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`activities.${index}`} placeholder={`Activité ${index + 1}`} value={values.activities[index]} onChange={handleChange} errors={errors.activities} />
                                    <DeleteButton onClick={() => setFieldValue("activities", values.activities.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("activities", [...values.activities, ""])}>Ajouter</Button>
                    </div>
                </div>

                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Etapes</h4>
                    </div>
                    <div className="space-y-4">
                        {
                            values.steps && values.steps.length > 0 && values.steps.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`steps.${index}`} placeholder={`Etape ${index + 1}`} value={values.steps[index]} onChange={handleChange} errors={errors.steps} />
                                    <DeleteButton onClick={() => setFieldValue("steps", values.steps.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("steps", [...values.steps, ""])}>Ajouter</Button>
                    </div>
                </div>

                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Plannification des etapes</h4>
                    </div>
                    <div className="space-y-4">
                        {
                            values.steps_planning && values.steps_planning.length > 0 && values.steps_planning.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`steps_planning.${index}`} placeholder={`Activité ${index + 1}`} value={values.steps_planning[index]} onChange={handleChange} errors={errors.steps_planning} />
                                    <DeleteButton onClick={() => setFieldValue("steps_planning", values.steps_planning.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("steps_planning", [...values.steps_planning, ""])}>Ajouter</Button>
                    </div>
                </div>

                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Budget</h4>
                    </div>
                    <div className="space-y-4">
                        {
                            values.budget && values.budget.length > 0 && values.budget.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`budget.${index}`} placeholder={`Activité ${index + 1}`} value={values.budget[index]} onChange={handleChange} errors={errors.budget} />
                                    <DeleteButton onClick={() => setFieldValue("budget", values.budget.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("budget", [...values.budget, ""])}>Ajouter</Button>
                    </div>
                </div>

                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Notes budget</h4>
                    </div>
                    <div className="space-y-4">
                        {
                            values.budget_notes && values.budget_notes.length > 0 && values.budget_notes.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`budget_notes.${index}`} placeholder={`Activité ${index + 1}`} value={values.budget_notes[index]} onChange={handleChange} errors={errors.budget_notes} />
                                    <DeleteButton onClick={() => setFieldValue("budget_notes", values.budget_notes.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("budget_notes", [...values.budget_notes, ""])}>Ajouter</Button>
                    </div>
                </div>

                <div className="space-y-4 p-2 shadow-meta-5 shadow-1 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Planification budget</h4>
                    </div>
                    <div className="space-y-4">
                        {
                            values.budget_planning && values.budget_planning.length > 0 && values.budget_planning.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`budget_planning.${index}`} placeholder={`Activité ${index + 1}`} value={values.budget_planning[index]} onChange={handleChange} errors={errors.budget_planning} />
                                    <DeleteButton onClick={() => setFieldValue("budget_planning", values.budget_planning.filter((_, i) => i !== index))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("budget_planning", [...values.budget_planning, ""])}>Ajouter</Button>
                    </div>
                </div>

            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
            </div>
        </form>
    );
}
