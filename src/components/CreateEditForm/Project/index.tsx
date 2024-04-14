"use client";;
import InputText from "@/components/Form/InputText";
import InputTextArea from "@/components/Form/InputTextArea";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import useToast from "@/shared/helpers/useToast";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import { PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import readXlsxFile from 'read-excel-file'

export default function CreateEditProject({ id }: { id?: string }) {

    const { toastSuccess } = useToast()

    const router = useRouter()

    const [project, setProject] = React.useState<IProject>({
        title: "",
        description: "",
        context: "",
        objectives: [
            {
                title: "",
                outcomes: [
                    {
                        title: "",
                        activities: [
                            {
                                end_date: "",
                                start_date: "",
                                title: "",
                            }
                        ],
                    }
                ],
            }
        ],
        budget_plan: [
            {
                objectives: [
                    {

                    }
                ]
            }
        ],
        calendar: [
            {
                outcomes: [
                    {}
                ]
            }
        ],
    })

    const [loading, setLoading] = React.useState({
        submit: false,
    })

    const [fileContent, setFileContent] = React.useState<any[]>([])

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

    async function handleAcceptedFiles(event: any) {
        const file = event.target.files[0]
        await readXlsxFile(file, { sheet: 2 }).then((rows: Array<any>) => {
            console.log("rows = ", rows)
            setFileContent([...rows])
        })

    }

    React.useEffect(() => {
        getProject()
    })

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="files" className="shadow-1 border border-dashed hover:shadow-meta-5 border-slate-300 h-44 rounded flex items-center justify-center">
                <div className="flex flex-col items-center text-slate-400 font-semibold justify-center gap-2">
                    <PlusCircle size={24} className="text-slate-400" />
                    <h6>Ajouter un fichier</h6>
                </div>
                <input type="file" name="files" id="files" className="hidden" onChange={handleAcceptedFiles} />
            </label>

            <div className="grid gap-4">
                <div className="space-y-4 p-2 border border-slate-300 rounded">
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
                            values.outcomes && values.outcomes.length > 0 && values.outcomes.map((outcome, index) => (
                                <div key={index} className="relative">
                                    <InputTextArea name={`outcomes.${index}`} placeholder={`Activité ${index + 1}`} value={values.outcomes[index]} onChange={handleChange} errors={errors.outcomes} />
                                    <DeleteButton onClick={() => values.outcomes.splice(index, 1)} />
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
