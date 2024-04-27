"use client";

import InputChips from "@/components/Form/InputChips";
import InputSelect from "@/components/Form/InputSelect";
import InputText from "@/components/Form/InputText";
import InputTextArea from "@/components/Form/InputTextArea";
import { Card } from "@/components/common/Card/Card";
import { Button } from "@/components/ui/button";
import projectApi from "@/services/project.service";
import useToast from "@/shared/helpers/useToast";
import { IProject } from "@/shared/models";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import readXlsxFile from 'read-excel-file'
import { EmptyProjectData, ProjectData } from "./data";
import { ProjectSchemaValidation } from "./validation";

export default function CreateEditProject({ id }: { id?: string }) {

    const { toastSuccess } = useToast()

    const router = useRouter()

    const [fileContent, setFileContent] = React.useState<any[]>([])

    const [loading, setLoading] = React.useState({
        submit: false,
    })

    const [project, setProject] = React.useState<IProject>(JSON.parse(JSON.stringify(EmptyProjectData)))

    function getProject() {
        id && projectApi().getProject(id).then((response) => {
            setProject({
                ...project,
                ...response.data
            })
        })
    }

    const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
        initialValues: project,
        validationSchema: ProjectSchemaValidation,
        onSubmit: async (values) => {
            console.log(values)
            /* await (id
                setLoading({ ...loading, submit: true })
                ? projectApi().createProject(values)
                : projectApi().createProject(values)
            )
                .then((response) => {
                    toastSuccess(response.message)
                    router.push("/projects")
                })
                .finally(() => setLoading({ ...loading, submit: false })) */
        }
    })

    async function handleAcceptedFiles(event: any) {
        const file = event.target.files[0]
        await readXlsxFile(file, { sheet: 2 }).then((rows: Array<any>) => {
            console.log("rows = ", rows)
            setFileContent([...rows])
        })

    }

    const DeleteButton = ({ onClick }: { onClick: () => void }) => {
        return (
            <button type="button" onClick={onClick} className="absolute -top-3 -right-1 cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300">
                <Trash2 size={16} className="text-white" />
            </button>
        )
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid gap-4">
                <Card title="Informations générales">
                    <div className="grid grid-cols-2 gap-4">
                        <InputText name="title" label="Titre" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="duration" label="Durée (Jours)" type="number" value={values.duration} onChange={handleChange} errors={errors.duration} />
                    </div>
                    <InputTextArea name="description" label="Desription de l'organisation" value={values.description} onChange={handleChange} errors={errors.description} />
                </Card>

                <Card title="Résumé exécutif">
                    <InputTextArea name="overview" label="Résumé exécutif" value={values.overview} onChange={handleChange} errors={errors.overview} />
                </Card>

                <Card title="Contexte">
                    <InputTextArea name="context" label="Contexte" value={values.context} onChange={handleChange} errors={errors.context} />
                </Card>

                <Card title="Justification">
                    <InputTextArea name="justification" label="Justification" value={values.justification} onChange={handleChange} errors={errors.justification} />
                </Card>

                <Card title="Objectif global">
                    <InputTextArea name="global_objective" label="Objectif global" value={values.global_objective} onChange={handleChange} errors={errors.global_objective} />
                </Card>

                <Card title="Objectif spécifique">
                    <InputChips name="objectives" label="Objectif" value={values.objectives} setFieldValue={setFieldValue} errors={errors?.objectives} />
                </Card>

                <Card title="Logique du Projet">
                    <div className="space-y-2">
                        <InputTextArea name={`logical_context.impact`} label={`Impact`} value={values.logical_context.impact} onChange={handleChange} errors={errors?.logical_context?.impact} />
                        {
                            values.logical_context.outcomes && values.logical_context.outcomes.length > 0 && values.logical_context.outcomes.map((outcome, indexOutcome) => (
                                <div className="relative space-y-2 border rounded border-slate-400 p-1" key={indexOutcome} id={`logical_context.outcomes.${indexOutcome}.title`}>
                                    <InputText name={`logical_context.outcomes.${indexOutcome}.intermediate_outcomes`} label={`Résultats intermediaires`} value={outcome.intermediate_outcomes} onChange={handleChange} errors={errors} />
                                    {
                                        values.logical_context.outcomes[indexOutcome].activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid grid-cols-2 gap-4 border rounded border-slate-500 p-1 relative">
                                                <InputText className="col-span-2" name={`logical_context.outcomes.${indexOutcome}.immediate_outcomes`} label={`Résultats immédiats`} value={outcome.immediate_outcomes} onChange={handleChange} errors={errors} />
                                                <InputChips name={`logical_context.outcomes.${indexOutcome}.activities.${indexActivity}.effects`} placeholder={`Extrants`} value={activity.effects} setFieldValue={setFieldValue} errors={errors} />
                                                <InputChips name={`logical_context.outcomes.${indexOutcome}.activities.${indexActivity}.title`} placeholder={`Activités`} value={activity.effects} onChange={handleChange} errors={errors} />
                                                <DeleteButton onClick={() => setFieldValue("logical_context.outcomes", values.logical_context.outcomes.filter((_, i) => i !== indexOutcome))} />
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("logical_context.outcomes", values.logical_context.outcomes.filter((_, i) => i !== indexOutcome))} />
                                </div>
                            ))
                        }
                        <div className="flex justify-end">
                            <Button variant={'outline'}>Ajouter des reultats immediats</Button>
                        </div>
                    </div>

                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("logical_context.outcomes", [...values.logical_context.outcomes, JSON.parse(JSON.stringify(
                            {
                                intermediate_outcomes: [],
                                immediate_outcomes: [],
                                activities: [
                                    {
                                        title: "",
                                        effects: [],
                                    }
                                ],
                            }
                        ))])}>Ajouter une chaine de résultat</Button>
                    </div>
                </Card>

                <Card title="Stratégie d'intervention">
                    <InputChips name="intervention_strategies" label="Stratégies d'intervention" value={values.intervention_strategies} onChange={handleChange} errors={errors?.intervention_strategies} />
                </Card>

                <Card title="Mécanisme de gestion du projet">
                    <div className="space-y-2">

                        <Card title="Structure gestion du projet">
                            <div className="space-y-2 border p-1 rounded border-slate-300 relative">
                                <InputText label="Titre" onChange={handleChange} errors={errors} />
                                <InputTextArea label="Description" onChange={handleChange} errors={errors} />
                                <DeleteButton onClick={() => { }} />
                            </div>
                            <div className="flex justify-end">
                                <Button variant={'outline'}>Ajouter une structure</Button>
                            </div>
                        </Card>

                        <Card title="Parties prenantes">
                            <div className="space-y-2">
                                {
                                    values.partners && values.partners.length > 0 && values.partners.map((partner, indexPartner) => (
                                        <div key={indexPartner} className="relative py-2 border-y border-slate-300">
                                            <div className="space-y-1">
                                                <InputText name={`partners.${indexPartner}.name`} label="Nom" value={partner.name} onChange={handleChange} errors={errors} />
                                                <InputSelect options={[]} name={`partners.${indexPartner}.name`} label="Niveau / Structure de gestion" value={partner.name} onChange={handleChange} errors={errors} />
                                                <InputChips name={`partners.${indexPartner}.abilities`} label="Roles & abilitations" value={partner.abilities} setFieldValue={setFieldValue} errors={errors} />
                                            </div>
                                            <DeleteButton onClick={() => setFieldValue("partners", values.partners.filter((_, i) => i !== indexPartner))} />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="flex justify-end">
                                <Button type="button" variant="outline" onClick={() => setFieldValue("partners", [...values.partners, JSON.parse(JSON.stringify(
                                    {
                                        name: "",
                                        abilities: [],
                                    }
                                ))])}>Ajouter un mécanisme de gestion</Button>
                            </div>
                        </Card>
                    </div>
                </Card>

                <Card title="Mécanisme de suivi de la qualité">
                    <InputChips name="quality_monitoring" value={values.quality_monitoring} onChange={handleChange} errors={errors?.quality_monitoring} />
                </Card>

                <Card title="Matrice de performance">
                    <div className="space-y-2">
                        {
                            values.performance_matrix && values.performance_matrix.length > 0 && values.performance_matrix.map((performance_mtx, indexMtx) => (
                                <div key={indexMtx} className="relative py-2 border-y border-slate-300">
                                    <div className="space-y-1">
                                        <InputText name={`performance_matrix.${indexMtx}.analyse`} label="Analyse" value={performance_mtx.analyse} onChange={handleChange} errors={errors} />
                                        <InputText name={`performance_matrix.${indexMtx}.effect`} label="Effet" value={performance_mtx.effect} onChange={handleChange} errors={errors} />
                                        <InputText name={`performance_matrix.${indexMtx}.frequency`} label="Fréquence" value={performance_mtx.frequency} onChange={handleChange} errors={errors} />
                                        <InputChips name={`performance_matrix.${indexMtx}.collect_tools`} label="Outils de collecte" value={performance_mtx.collect_tools} setFieldValue={setFieldValue} errors={errors} />
                                        <InputChips name={`performance_matrix.${indexMtx}.verification_sources`} label="Sources de verification" value={performance_mtx.verification_sources} setFieldValue={setFieldValue} errors={errors} />
                                    </div>
                                    <DeleteButton onClick={() => setFieldValue("performance_matrix", values.performance_matrix.filter((_, i) => i !== indexMtx))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("performance_matrix", [...values.performance_matrix, JSON.parse(JSON.stringify(
                            {
                                analyse: "",
                                effect: "",
                                frequency: "",
                                collect_tools: [],
                                verification_sources: [],
                            }
                        ))])}>Ajouter un A revoir</Button>
                    </div>
                </Card>

                <Card title="Plan budgetaire">
                    <div className="space-y-2">
                        {
                            values.budget_plan && values.budget_plan.length > 0 && values.budget_plan.map((budget_pln, indexPlan) => (
                                <div className="relative space-y-2 border-y border-slate-300 py-1" key={indexPlan} id={`budget_plan.${indexPlan}.title`}>
                                    <InputText name={`budget_plan.${indexPlan}.section`} placeholder={`Resultats attendus`} value={budget_pln.section} onChange={handleChange} errors={errors} />
                                    {
                                        values.budget_plan && values.budget_plan[indexPlan].activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid grid-cols-2 gap-4">
                                                <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.title`} placeholder={`Titre`} value={activity.title} onChange={handleChange} errors={errors} />
                                                <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.budget`} placeholder={`Budget`} type="number" value={activity.budget} onChange={handleChange} errors={errors} />
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("budget_plan", values.budget_plan.filter((_, i) => i !== indexPlan))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("budget_plan", [...values.budget_plan, JSON.parse(JSON.stringify(
                            {
                                section: "",
                                activities: [
                                    {
                                        budget: 0,
                                        title: "",
                                    }
                                ]
                            }
                        ))])}>Ajouter un plan</Button>
                    </div>
                </Card>

                <Card title="Calendrier">
                    <div className="space-y-2">
                        {
                            values.calendar && values.calendar.length > 0 && values.calendar.map((calend, indexCalendar) => (
                                <div className="relative space-y-2 border-y border-slate-300 py-1" key={indexCalendar} id={`calendar.${indexCalendar}.title`}>
                                    {
                                        values.calendar && values.calendar[indexCalendar].activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid gap-4">
                                                <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.title`} label={`Titre`} value={activity.title} onChange={handleChange} errors={errors} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.start_date`} label={`Date de début`} type="date" value={activity.start_date} onChange={handleChange} errors={errors} />
                                                    <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.end_date`} label={`Date de fin`} type="date" value={activity.end_date} onChange={handleChange} errors={errors} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("calendar", values.calendar.filter((_, i) => i !== indexCalendar))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("calendar", [...values.calendar, JSON.parse(JSON.stringify(
                            {
                                outcome: "",
                                activities: [
                                    {
                                        title: "",
                                        start_date: "",
                                        end_date: "",
                                    }
                                ],
                            }
                        ))])}>Ajouter un calendrier</Button>
                    </div>
                </Card>

            </div>

            <div className="w-full flex justify-end">
                <Button onClick={() => handleSubmit()} type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
            </div>
        </form>
    );
}
