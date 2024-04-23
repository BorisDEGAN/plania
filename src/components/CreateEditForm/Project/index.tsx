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
import { ProjectData } from "./data";
import { ProjectSchemaValidation } from "./validation";

export default function CreateEditProject({ id }: { id?: string }) {

    const { toastSuccess } = useToast()

    const router = useRouter()

    const [fileContent, setFileContent] = React.useState<any[]>([])

    const [loading, setLoading] = React.useState({
        submit: false,
    })

    const [project, setProject] = React.useState<IProject>(JSON.parse(JSON.stringify(ProjectData)))

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
        // validationSchema: ProjectSchemaValidation,
        onSubmit: async (values) => {
            setLoading({ ...loading, submit: true })
            console.log(values)
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


    async function handleAcceptedFiles(event: any) {
        const file = event.target.files[0]
        await readXlsxFile(file, { sheet: 2 }).then((rows: Array<any>) => {
            console.log("rows = ", rows)
            setFileContent([...rows])
        })

    }

    const DeleteButton = ({ onClick }: { onClick: () => void }) => {
        return (
            <button onClick={onClick} className="absolute -top-3 -right-1 cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300">
                <Trash2 size={16} className="text-white" />
            </button>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* <label htmlFor="files" className="shadow-1 border border-dashed hover:shadow-meta-5 border-slate-300 h-44 rounded flex items-center justify-center">
                <div className="flex flex-col items-center text-slate-400 font-semibold justify-center gap-2">
                    <PlusCircle size={24} className="text-slate-400" />
                    <h6>Ajouter un fichier</h6>
                </div>
                <input type="file" name="files" id="files" className="hidden" onChange={handleAcceptedFiles} />
            </label> */}

            <div className="grid gap-4">
                <Card title="Informations générales">
                    <div className="grid grid-cols-2 gap-4">
                        <InputText name="title" label="Titre" value={values.title} onChange={handleChange} errors={errors.title} />
                        <InputText name="duration" label="Durée (Jours)" type="number" value={values.duration} onChange={handleChange} errors={errors.duration} />
                    </div>
                    <InputTextArea name="overview" label="Apercu" value={values.overview} onChange={handleChange} errors={errors.overview} />
                    <InputTextArea name="description" label="Desription" value={values.description} onChange={handleChange} errors={errors.description} />
                    <InputTextArea name="context" label="Contexte" value={values.context} onChange={handleChange} errors={errors.context} />
                    <InputTextArea name="justification" label="Justification" value={values.justification} onChange={handleChange} errors={errors.justification} />
                    <InputTextArea name="global_objective" label="Objectif global" value={values.global_objective} onChange={handleChange} errors={errors.global_objective} />
                </Card>

                <Card title="Objectif spécifique">
                    <InputChips name="objectives" label="Objectif" value={values.objectives} setFieldValue={setFieldValue} errors={errors?.objectives} />
                </Card>

                <Card title="Résultats attendus">
                    <div className="space-y-2">
                        {
                            values.outcomes && values.outcomes.length > 0 && values.outcomes.map((outcome, indexOutcome) => (
                                <div key={indexOutcome} className="relative py-2 border-y border-slate-300">
                                    <div className="space-y-1">
                                        <InputText name={`outcomes.${indexOutcome}.title`} label="Titre" value={outcome.title} onChange={handleChange} errors={errors?.outcomes?.[indexOutcome]} />
                                        <InputChips name={`outcomes.${indexOutcome}.activities`} label="Activités" value={outcome.activities} setFieldValue={setFieldValue} errors={errors?.outcomes?.[indexOutcome]} />
                                    </div>
                                    <DeleteButton onClick={() => setFieldValue("outcomes", values.outcomes.filter((_, i) => i !== indexOutcome))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("outcomes", [...values.outcomes, JSON.parse(JSON.stringify(
                            {
                                title: "",
                                activities: []
                            }
                        ))])}>Ajouter un résultat</Button>
                    </div>
                </Card>

                <Card title="Contexte logique">
                    <div className="grid grid-cols-2 gap-2">
                        <InputText name="logical_context.budget" label="Budget" type="number" value={values.logical_context.budget} onChange={handleChange} errors={errors.logical_context?.budget} />
                        <InputSelect name="logical_context.budget_currency" label="Devise du budget" options={[{ value: "EUR" }, { value: "XOF" }, { value: "USD" }]} optionLabel="value" optionValue="value" value={values.logical_context.budget_currency} onChange={handleChange} errors={errors.logical_context?.budget_currency} />
                    </div>

                    <InputChips name="logical_context.objectives" label="Axe d'interventions" value={values.logical_context.objectives} setFieldValue={setFieldValue} errors={errors.logical_context?.objectives} />

                    <div className="space-y-2">
                        {
                            values.logical_context.outcomes && values.logical_context.outcomes.length > 0 && values.logical_context.outcomes.map((outcome, indexOutcome) => (
                                <div className="relative space-y-2 border-y border-slate-300 py-1" key={indexOutcome} id={`logical_context.outcomes.${indexOutcome}.title`}>
                                    <InputText name={`logical_context.outcomes.${indexOutcome}.title`} placeholder={`Resultats attendus`} value={outcome.title} onChange={handleChange} errors={errors?.logical_context?.outcomes?.[indexOutcome]?.title} />
                                    <InputChips name={`logical_context.outcomes.${indexOutcome}.impacts`} placeholder={`Impacts`} value={outcome.impacts} setFieldValue={setFieldValue} errors={errors?.logical_context?.outcomes?.[indexOutcome]?.impacts} />
                                    <InputChips name={`logical_context.outcomes.${indexOutcome}.intermediate_outcomes`} placeholder={`Résultats intermediaires`} value={outcome.intermediate_outcomes} setFieldValue={setFieldValue} errors={errors?.logical_context?.outcomes?.[indexOutcome]?.intermediate_outcomes} />
                                    <InputChips name={`logical_context.outcomes.${indexOutcome}.immediate_outcomes`} placeholder={`Résultats immédiats`} value={outcome.immediate_outcomes} setFieldValue={setFieldValue} errors={errors?.logical_context?.outcomes?.[indexOutcome]?.immediate_outcomes} />
                                    {
                                        values.logical_context.outcomes[indexOutcome].activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid grid-cols-2 gap-4">
                                                <InputText name={`logical_context.outcomes.${indexOutcome}.activities.${indexActivity}.title`} placeholder={`Activité`} value={activity.title} onChange={handleChange} errors={errors?.logical_context?.outcomes?.[indexOutcome]?.activities?.[indexActivity]?.title} />
                                                <InputChips name={`logical_context.outcomes.${indexOutcome}.activities.${indexActivity}.effects`} placeholder={`Effets`} value={activity.effects} setFieldValue={setFieldValue} errors={errors?.logical_context?.outcomes?.[indexOutcome]?.activities?.[indexActivity]?.effects} />
                                            </div>
                                        ))
                                    }
                                    <DeleteButton onClick={() => setFieldValue("logical_context.outcomes", values.logical_context.outcomes.filter((_, i) => i !== indexOutcome))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("logical_context.outcomes", [...values.logical_context.outcomes, JSON.parse(JSON.stringify(
                            {
                                title: "",
                                impacts: [],
                                intermediate_outcomes: [],
                                immediate_outcomes: [],
                                activities: [
                                    {
                                        title: "",
                                        effects: [],
                                    }
                                ],
                            }
                        ))])}>Ajouter un resultat</Button>
                    </div>
                </Card>

                <Card title="Stratégie d'intervention">
                    <InputChips name="intervention_strategies" label="Stratégie d'intervention" value={values.intervention_strategies} onChange={handleChange} errors={errors?.intervention_strategies} />
                </Card>

                <Card title="Partenaires">
                    <div className="space-y-2">
                        {
                            values.partners && values.partners.length > 0 && values.partners.map((partner, indexPartner) => (
                                <div key={indexPartner} className="relative py-2 border-y border-slate-300">
                                    <div className="space-y-1">
                                        <InputText name={`partners.${indexPartner}.name`} label="Nom" value={partner.name} onChange={handleChange} errors={errors?.partners?.[indexPartner]?.name} />
                                        <InputChips name={`partners.${indexPartner}.abilities`} label="Roles & abilitations" value={partner.abilities} setFieldValue={setFieldValue} errors={errors?.partners?.[indexPartner]?.abilities} />
                                    </div>
                                    <DeleteButton onClick={() => setFieldValue("partners", values.partners.filter((_, i) => i !== indexPartner))} />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <Button variant="secondary" type="button" onClick={() => setFieldValue("partners", [...values.partners, JSON.parse(JSON.stringify(
                            {
                                name: "",
                                abilities: [],
                            }
                        ))])}>Ajouter un partenaire</Button>
                    </div>
                </Card>

                <Card title="Mécanisme de suivi de la qualité">
                    <InputChips name="quality_monitoring" value={values.quality_monitoring} onChange={handleChange} errors={errors?.quality_monitoring} />
                </Card>

                <Card title="Matrix de performance">
                    <div className="space-y-2">
                        {
                            values.performance_matrix && values.performance_matrix.length > 0 && values.performance_matrix.map((performance_mtx, indexMtx) => (
                                <div key={indexMtx} className="relative py-2 border-y border-slate-300">
                                    <div className="space-y-1">
                                        <InputText name={`performance_matrix.${indexMtx}.analyse`} label="Analyse" value={performance_mtx.analyse} onChange={handleChange} errors={errors?.performance_matrix?.[indexMtx]?.analyse} />
                                        <InputText name={`performance_matrix.${indexMtx}.effect`} label="Effet" value={performance_mtx.effect} onChange={handleChange} errors={errors?.performance_matrix?.[indexMtx]?.effect} />
                                        <InputText name={`performance_matrix.${indexMtx}.frequency`} label="Fréquence" value={performance_mtx.frequency} onChange={handleChange} errors={errors?.performance_matrix?.[indexMtx]?.frequency} />
                                        <InputChips name={`performance_matrix.${indexMtx}.collect_tools`} label="Outils de collect" value={performance_mtx.collect_tools} setFieldValue={setFieldValue} errors={errors?.performance_matrix?.[indexMtx]?.collect_tools} />
                                        <InputChips name={`performance_matrix.${indexMtx}.verification_sources`} label="Sources de verification" value={performance_mtx.verification_sources} setFieldValue={setFieldValue} errors={errors?.performance_matrix?.[indexMtx]?.verification_sources} />
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
                        ))])}>Ajouter une matrix de performance</Button>
                    </div>
                </Card>

                <Card title="Plan budgetaire">
                    <div className="space-y-2">
                        {
                            values.budget_plan && values.budget_plan.length > 0 && values.budget_plan.map((budget_pln, indexPlan) => (
                                <div className="relative space-y-2 border-y border-slate-300 py-1" key={indexPlan} id={`budget_plan.${indexPlan}.title`}>
                                    <InputText name={`budget_plan.${indexPlan}.section`} placeholder={`Resultats attendus`} value={budget_pln.section} onChange={handleChange} errors={errors?.budget_plan?.[indexPlan]?.section} />
                                    {
                                        values.budget_plan && values.budget_plan[indexPlan].activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid grid-cols-2 gap-4">
                                                <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.title`} placeholder={`Titre`} value={activity.title} onChange={handleChange} errors={errors?.budget_plan?.[indexPlan]?.activities?.[indexActivity]?.title} />
                                                <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.budget`} placeholder={`Budget`} type="number" value={activity.budget} onChange={handleChange} errors={errors?.budget_plan?.[indexPlan]?.activities?.[indexActivity]?.budget} />
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
                                    <InputText name={`calendar.${indexCalendar}.outcome`} placeholder={`Resultats attendus`} value={calend.outcome} onChange={handleChange} errors={errors?.calendar?.[indexCalendar]?.outcome} />
                                    {
                                        values.calendar && values.calendar[indexCalendar].activities.map((activity, indexActivity) => (
                                            <div key={indexActivity} className="grid gap-4">
                                                <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.title`} placeholder={`Titre`} value={activity.title} onChange={handleChange} errors={errors?.calendar?.[indexCalendar]?.activities?.[indexActivity]?.title} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.start_date`} placeholder={`Budget`} type="date" value={activity.start_date} onChange={handleChange} errors={errors?.calendar?.[indexCalendar]?.activities?.[indexActivity]?.start_date} />
                                                    <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.end_date`} placeholder={`Budget`} type="date" value={activity.end_date} onChange={handleChange} errors={errors?.calendar?.[indexCalendar]?.activities?.[indexActivity]?.end_date} />
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

            <div>
                {JSON.stringify(errors)}
            </div>
            <div className="w-full flex justify-end">
                <Button type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
            </div>
        </form>
    );
}
