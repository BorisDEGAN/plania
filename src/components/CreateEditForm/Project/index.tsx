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

    const [fileContent, setFileContent] = React.useState([])

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
        await readXlsxFile(file).then((rows) => {
            console.log("rows = ", rows)
            setFileContent([...rows])
        })

    }

    React.useEffect(() => {
        getProject()
    }, [])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {JSON.parse(JSON.stringify(fileContent))}
            <div className="grid gap-4">
                <div className="space-y-4 p-2 border border-slate-300 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Informations principales</h4>
                    </div>
                    <InputText name="title" label="Titre" value={values.title} onChange={handleChange} errors={errors.title} />
                    <InputTextArea name="description" label="Desription" value={values.description} onChange={handleChange} errors={errors.description} />
                    <InputTextArea name="context" label="Contexte" value={values.context} onChange={handleChange} errors={errors.description} />
                </div>

                <div className="space-y-4 p-2 border border-slate-300 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Cout</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText name="title" label="Budget" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Ressources humaines" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Ressources matérielle" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Bien immeubles" value={values.title} onChange={handleChange} errors={errors.title} />
                    </div>
                </div>

                <div className="space-y-4 p-2 border border-slate-300 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Portée</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText name="title" label="Cadre de résultat" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Activités" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Béneficiaires" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Zone de couverture" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Objectifs" value={values.title} onChange={handleChange} errors={errors.title} />
                    </div>
                </div>

                <div className="space-y-4 p-2 border border-slate-300 rounded">
                    <div className="flex items-center justify-between my-2">
                        <h4 className="font-semibold">Temps</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputText name="title" label="Début" type="date" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Fin" type="date" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="title" label="Calendrier de mise en oeuvre" value={values.title} onChange={handleChange} errors={errors.title} />
                    </div>
                </div>
                <label htmlFor="files" className="shadow-1 border border-slate-300 h-44 rounded flex items-center justify-center">
                    <div className="flex flex-col items-center text-slate-400 font-semibold justify-center gap-2">
                        <PlusCircle size={24} className="text-slate-400" />
                        <h6>Ajouter un fichier</h6>
                    </div>
                    <input type="file" name="files" id="files" className="hidden" onChange={handleAcceptedFiles} />
                </label>

            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
            </div>
        </form>
    );
}
