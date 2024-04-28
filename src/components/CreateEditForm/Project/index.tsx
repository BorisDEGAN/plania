"use client";

import InputChips from "@/components/Form/InputChips";
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
import ProjectSchemaValidation from "./validation";
import InputSelect from "@/components/Form/InputSelect";

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
            setLoading({ ...loading, submit: true })
            await (id
                ? projectApi().createProject(values)
                : projectApi().createProject(values))
                .then((response) => {
                    toastSuccess(response.message)
                    router.push("/projects")
                })
                .finally(() => setLoading({ ...loading, submit: false }))

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
                            values.logical_context.intermediate_outcomes && values.logical_context.intermediate_outcomes.length > 0 && values.logical_context.intermediate_outcomes.map((outcome, indexOutcome) => (
                                <div className="relative space-y-4 border rounded border-slate-400 p-1" key={`logical_context.intermediate_outcomes.${indexOutcome}`} id={`logical_context.intermediate_outcomes.${indexOutcome}`}>
                                    <InputText name={`logical_context.intermediate_outcomes${indexOutcome}.title`} label={`Résultat intermédiaire`} value={outcome.title} onChange={handleChange} errors={errors} />
                                    {
                                        values.logical_context.intermediate_outcomes[indexOutcome].immediate_outcomes.map((imOutcome, indexImOutcome) => (
                                            <div key={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}`}
                                                id={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}`}
                                                className="grid grid-cols-2 gap-4 border rounded border-slate-500 p-1 relative">
                                                <InputText className="col-span-2" name={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.title`} label={`Résultat immédiat`} value={imOutcome.title} onChange={handleChange} errors={errors} />
                                                {
                                                    values.logical_context.intermediate_outcomes[indexOutcome].immediate_outcomes[indexImOutcome].activities.map((activiy, indexActivity) => (
                                                        <div key={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities.${indexActivity}`}
                                                            id={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities.${indexActivity}`}
                                                            className="grid grid-cols-2 gap-4 border rounded border-slate-600 p-1 relative col-span-2">
                                                            <InputText className="col-span-1" name={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities.${indexActivity}.title`} label={`Extrant`} value={activiy.title} onChange={handleChange} errors={errors} />
                                                            <InputText className="col-span-1" name={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities.${indexActivity}.efffect`} label={`Activité`} value={activiy.effect} onChange={handleChange} errors={errors} />
                                                            <DeleteButton onClick={() => setFieldValue(`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities`, values.logical_context.intermediate_outcomes[indexOutcome].immediate_outcomes[indexImOutcome].activities.filter((_, i) => i !== indexActivity))} />
                                                        </div>
                                                    ))
                                                }
                                                <DeleteButton onClick={() => setFieldValue(`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes`, values.logical_context.intermediate_outcomes[indexOutcome].immediate_outcomes.filter((_, i) => i !== indexImOutcome))} />
                                                <div className="flex justify-end col-span-2">
                                                    <Button variant="outline" type="button" onClick={() => setFieldValue(`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities`, [...values.logical_context.intermediate_outcomes[indexOutcome].immediate_outcomes[indexImOutcome].activities, JSON.parse(JSON.stringify(
                                                        {
                                                            title: "",
                                                            effect: ""
                                                        }
                                                    ))])}>Ajouter des extrants</Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("logical_context.intermediate_outcomes", values.logical_context.intermediate_outcomes.filter((_, i) => i !== indexOutcome))} />
                                    <div className="flex justify-end">
                                        <Button variant="outline" type="button" onClick={() => setFieldValue(`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes`, [...values.logical_context.intermediate_outcomes[indexOutcome].immediate_outcomes, JSON.parse(JSON.stringify(
                                            {
                                                title: "",
                                                activities: [
                                                    {
                                                        title: "",
                                                        effect: ""
                                                    }
                                                ]
                                            }
                                        ))])}>Ajouter une chaine de résultat immediat</Button>
                                    </div>
                                </div>
                            ))
                        }
                        <div>
                            <Button variant="secondary" type="button" onClick={() => setFieldValue("logical_context.intermediate_outcomes", [...values.logical_context.intermediate_outcomes, JSON.parse(JSON.stringify(
                                {
                                    title: "",
                                    immediate_outcomes: [
                                        {
                                            title: "",
                                            activities: [
                                                {
                                                    title: "",
                                                    effect: ""
                                                }
                                            ]
                                        }
                                    ],
                                }
                            ))])}>Ajouter une chaine de résultat</Button>
                        </div>
                    </div>

                </Card>

                <Card title="Stratégie d'intervention">
                    <InputChips name="intervention_strategies" label="Stratégies d'intervention" value={values.intervention_strategies} onChange={handleChange} errors={errors?.intervention_strategies} />
                </Card>

                <Card title="Mécanisme de gestion du projet">
                    {
                        values.partners && values.partners.length > 0 && values.partners.map((partner, indexPartner) => (
                            <div key={`partners.${indexPartner}`} className="space-y-2 border rounded border-slate-300 p-1">
                                {
                                    partner.managment_levels && partner.managment_levels.length > 0 && partner.managment_levels.map((level, indexLevel) => (
                                        <div key={`partners.${indexPartner}.managment_levels.${indexLevel}`} className="relative space-y-2">
                                            <div className="relative p-1 border rounded border-slate- space-y-2">
                                                <InputText name={`partners.${indexPartner}.managment_levels.${indexLevel}.title`} label="Titre" value={level.title} onChange={handleChange} errors={errors} />
                                                <InputText name={`partners.${indexPartner}.managment_levels.${indexLevel}.level`} label="Niveau / Structure de gestion" value={level.level} onChange={handleChange} errors={errors} />
                                                {
                                                    level.stakeholders && level.stakeholders.length > 0 && level.stakeholders.map((stakeholder, indexStakeholder) => (
                                                        <div key={`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders.${indexStakeholder}`} className="relative p-1 border rounded border-slate-500 grid grid-cols-2 gap-4">
                                                            <InputChips name={`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders.${indexStakeholder}.name`} label="Titre" value={stakeholder.name} setFieldValue={setFieldValue} errors={errors} />
                                                            <InputChips name={`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders.${indexStakeholder}.abilities`} label="Titre" value={stakeholder.abilities} setFieldValue={setFieldValue} errors={errors} />
                                                            <DeleteButton onClick={() => setFieldValue(`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders`, values.partners[indexPartner].managment_levels[indexLevel].stakeholders.filter((_, i) => i !== indexStakeholder))} />
                                                        </div>
                                                    ))
                                                }
                                                <DeleteButton onClick={() => setFieldValue(`partners.${indexPartner}.managment_levels`, values.partners[indexPartner].managment_levels.filter((_, i) => i !== indexLevel))} />
                                                <div className="flex justify-end col-span-2">
                                                    <Button type="button" variant="outline" onClick={() => setFieldValue(`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders`, [...values.partners[indexPartner].managment_levels[indexLevel].stakeholders, JSON.parse(JSON.stringify(
                                                        {
                                                            name: [],
                                                            abilities: [],
                                                        }
                                                    ))])}>Ajouter un niveau de gestion</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <DeleteButton onClick={() => setFieldValue("partners", values.partners.filter((_, i) => i !== indexPartner))} />
                                <div className="flex justify-end col-span-2">
                                    <Button type="button" variant="outline" onClick={() => setFieldValue(`partners.${indexPartner}.managment_levels`, [...values.partners[indexPartner].managment_levels, JSON.parse(JSON.stringify(
                                        {
                                            title: "",
                                            level: "",
                                            stakeholders: [
                                                {
                                                    name: [],
                                                    abilities: [],
                                                }
                                            ]
                                        }
                                    ))])}>Ajouter un niveau de gestion</Button>
                                </div>
                            </div>
                        ))
                    }
                    <div>
                        <Button type="button" variant="secondary" onClick={() => setFieldValue(`partners`, [...values.partners, JSON.parse(JSON.stringify(
                            {
                                managment_levels: [
                                    {
                                        title: "",
                                        level: "",
                                        stakeholders: [
                                            {
                                                name: [],
                                                abilities: [],
                                            }
                                        ]
                                    }
                                ]
                            }
                        ))])}>Ajouter partie prenante</Button>
                    </div>
                </Card>

                <Card title="Mécanisme de suivi de la qualité">
                    <InputChips name="quality_monitoring" value={values.quality_monitoring} onChange={handleChange} errors={errors?.quality_monitoring} />
                </Card>

                <Card title="Matrice de performance">
                    <div className="space-y-2">
                        {
                            values.performance_matrix && values.performance_matrix.length > 0 && values.performance_matrix.map((performance_mtx, indexMtx) => (
                                <div key={indexMtx} className="relative space-y-1 p-1 border rounded border-slate-300">
                                    <div className="space-y-1 p-1 border rounded border-slate-300">
                                        <InputSelect options={values.logical_context.intermediate_outcomes} optionLabel="title" optionValue="title" name={`performance_matrix.${indexMtx}.outcome`} label="Resultat" value={performance_mtx.outcome} onChange={handleChange} errors={errors} />
                                        {
                                            performance_mtx.indicateur.map((indicateur, indexIndicateur) => (
                                                <div key={indexIndicateur} className="relative space-y-1 p-1 border rounded border-slate-400">
                                                    <InputText name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.title`} label="Titre" value={indicateur.title} onChange={handleChange} errors={errors} />
                                                    <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.baseline`} label="Données de base" value={indicateur.props.baseline} onChange={handleChange} errors={errors} />
                                                    <InputText name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.target`} label="Cible" value={indicateur.props.target} onChange={handleChange} errors={errors} />
                                                    <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.data_souces`} label="Sources de données" value={indicateur.props.data_souces} setFieldValue={setFieldValue} errors={errors} />
                                                    <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.collect_tools`} label="Méthodes de collecte" value={indicateur.props.collect_tools} setFieldValue={setFieldValue} errors={errors} />
                                                    <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.frequency`} label="Fréquences" value={indicateur.props.frequency} setFieldValue={setFieldValue} errors={errors} />
                                                    <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.managers`} label="Responsables" value={indicateur.props.managers} setFieldValue={setFieldValue} errors={errors} />
                                                    <DeleteButton onClick={() => setFieldValue(`performance_matrix${indexMtx}.indicateur`, values.performance_matrix[indexMtx].indicateur.filter((_, i) => i !== indexIndicateur))} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <DeleteButton onClick={() => setFieldValue("performance_matrix", values.performance_matrix.filter((_, i) => i !== indexMtx))} />
                                    <div className="flex justify-end">
                                        <Button variant="outline" type="button" onClick={() => setFieldValue(`performance_matrix${indexMtx}.indicateur`, [...values.performance_matrix[indexMtx].indicateur, JSON.parse(JSON.stringify(
                                            {
                                                title: "",
                                                props: {
                                                    target: "",
                                                    baseline: [],
                                                    data_souces: [],
                                                    managers: [],
                                                    collect_tools: [],
                                                    frequency: [],
                                                }
                                            }
                                        ))])}>Ajouter un indicateur</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("performance_matrix", [...values.performance_matrix, JSON.parse(JSON.stringify(
                            {
                                outcome: "",
                                indicateur: [
                                    {
                                        title: "",
                                        props: {
                                            target: "",
                                            baseline: [],
                                            data_souces: [],
                                            managers: [],
                                            collect_tools: [],
                                            frequency: [],
                                        }
                                    }
                                ]
                            }
                        ))])}>Ajouter un niveau de résultat</Button>
                    </div>
                </Card>

                <Card title="Plan budgetaire">
                    <div className="space-y-2">
                        {
                            values.budget_plan && values.budget_plan.length > 0 && values.budget_plan.map((budget_pln, indexPlan) => (
                                <div className="relative space-y-2 border-slate-300 border p-1 rounded" key={indexPlan} id={`budget_plan.${indexPlan}.title`}>
                                    <InputText name={`budget_plan.${indexPlan}.section`} label={`Rubrique`} value={budget_pln.section} onChange={handleChange} errors={errors} />
                                    {
                                        budget_pln && budget_pln.activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid grid-cols-2 gap-4 relative border border-slate-400 p-1 rounded">
                                                <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.title`} label={`Titre`} value={activity.title} onChange={handleChange} errors={errors} />
                                                <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.budget`} label={`Budget`} type="number" value={activity.budget} onChange={handleChange} errors={errors} />
                                                <DeleteButton onClick={() => setFieldValue(`budget_plan.${indexPlan}.activities`, values.budget_plan.filter((_, i) => i !== indexActivity))} />
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("budget_plan", values.budget_plan.filter((_, i) => i !== indexPlan))} />
                                    <div className="flex justify-end">
                                        <Button variant="outline" type="button" onClick={() => setFieldValue(`budget_plan.${indexPlan}.activities`, [...values.budget_plan[indexPlan].activities, JSON.parse(JSON.stringify(
                                            {
                                                budget: 0,
                                                title: "",
                                            }
                                        ))])}>Ajouter une activité</Button>
                                    </div>
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
                        ))])}>Ajouter une rubrique</Button>
                    </div>
                </Card>

                <Card title="Calendrier">
                    <div className="space-y-2">
                        {
                            values.calendar && values.calendar.length > 0 && values.calendar.map((calendar, indexCalendar) => (
                                <div className="relative space-y-2 border rounded border-slate-300 p-1" key={`calendar.${indexCalendar}`} id={`calendar.${indexCalendar}.title`}>
                                    <InputSelect options={values.logical_context.intermediate_outcomes} optionLabel="title" optionValue="title" name={`calendar.${indexCalendar}.outcome`} label="Effet" value={calendar.outcome} onChange={handleChange} errors={errors} />
                                    {
                                        calendar && calendar.activities.map((activity, indexActivity) => (
                                            <div key={`calendar.${indexCalendar}.activities.${indexActivity}`} className="grid gap-4 border border-slate-400 p-1 rounded relative">
                                                <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.title`} label={`Titre`} value={activity.title} onChange={handleChange} errors={errors} />
                                                {
                                                    activity && activity.period.map((period, indexPeriod) => (
                                                        <div key={indexPeriod} className="grid grid-cols-2 gap-4 relative p-1 border border-slate-500 rounded">
                                                            <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.period.${indexPeriod}.start_date`} label={`Date de début`} type="date" value={period.start_date} onChange={handleChange} errors={errors} />
                                                            <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.period.${indexPeriod}.end_date`} label={`Date de fin`} type="date" value={period.end_date} onChange={handleChange} errors={errors} />
                                                            <DeleteButton onClick={() => setFieldValue(`calendar.${indexCalendar}.activities.${indexActivity}.period`, values.calendar[indexCalendar].activities[indexActivity].period.filter((_, i) => i !== indexPeriod))} />
                                                        </div>
                                                    ))
                                                }
                                                <DeleteButton onClick={() => setFieldValue(`calendar.${indexCalendar}.activities`, values.calendar[indexCalendar].activities.filter((_, i) => i !== indexActivity))} />
                                                <div className="flex justify-end">
                                                    <Button variant="outline" type="button" onClick={() => setFieldValue(`calendar.${indexCalendar}.activities.${indexActivity}.period`, [...values.calendar[indexCalendar].activities[indexActivity].period, JSON.parse(JSON.stringify(
                                                        {
                                                            start_date: "",
                                                            end_date: "",
                                                        }
                                                    ))])}>Ajouter une période</Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("calendar", values.calendar.filter((_, i) => i !== indexCalendar))} />
                                    <div className="flex justify-end">
                                        <Button variant="outline" type="button" onClick={() => setFieldValue(`calendar.${indexCalendar}.activities`, [...values.calendar[indexCalendar].activities, JSON.parse(JSON.stringify(
                                            {
                                                title: "",
                                                period: [
                                                    {
                                                        start_date: "",
                                                        end_date: "",
                                                    }
                                                ]
                                            }
                                        ))])}>Ajouter une activité</Button>
                                    </div>
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
                                        period: [
                                            {
                                                start_date: "",
                                                end_date: "",
                                            }
                                        ]
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
