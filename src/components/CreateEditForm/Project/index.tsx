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
import React, { ChangeEvent, useEffect, useMemo } from "react";
import { EmptyProjectData, ProjectData } from "./data";
import ProjectSchemaValidation from "./validation";
import InputSelect from "@/components/Form/InputSelect";
import { InputDate } from "@/components/Form/InputDate";
import useThrottleFn from "@/shared/helpers/useThrottleFn";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PageLoad from "@/components/Loader/PageLoad";

export default function CreateEditProject({ id }: { id?: string }) {

    enum SAVING_STATUS {
        SAVING = "saving",
        SAVED = "saved",
        ERROR = "error"
    }

    const { toastSuccess } = useToast()
    const router = useRouter()
    const [project] = React.useState<IProject>(structuredClone(EmptyProjectData))
    const [loading, setLoading] = React.useState({
        submit: false,
        project: false,
        saving: SAVING_STATUS.SAVED
    })

    const { handleSubmit, handleChange, setFieldValue, values, errors, setValues } = useFormik({
        initialValues: project,
        validationSchema: ProjectSchemaValidation,
        onSubmit: async (values) => {
            setLoading({ ...loading, saving: SAVING_STATUS.SAVING, submit: true })
            await (id ? projectApi().updateProject(id, values) : projectApi().createProject(values))
                .then((response) => {
                    toastSuccess(response.message)
                    router.push("/projects")
                    setLoading({ ...loading, saving: SAVING_STATUS.SAVED, submit: false })
                })
                .catch(() => setLoading({ ...loading, saving: SAVING_STATUS.ERROR, submit: false }))
        }
    })

    function unNullify(obj: any): any {
        if (obj === null) {
            return '';
        }

        if (Array.isArray(obj)) {
            return obj.map(item => unNullify(item));
        }

        if (typeof obj === 'object' && obj !== null) {
            const newObj: any = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = unNullify(obj[key]);
                }
            }
            return newObj;
        }

        return obj;
    }

    function getProject() {
        if (id) {
            setLoading({ ...loading, project: true })
            projectApi().getProject(id)
                .then((response) => {
                    setValues({ ...structuredClone(EmptyProjectData), ...unNullify(response.data) })
                })
                .finally(() => setLoading({ ...loading, project: false }))
        }
    }

    async function saveProject() {
        if (loading.saving === SAVING_STATUS.SAVING) return
        if (Object.keys(errors).length > 0) return
        setLoading((prev) => ({ ...prev, saving: SAVING_STATUS.SAVING }))
        await (id ? projectApi(true).updateProject(id, values) : projectApi(true).createProject(values))
            .then((response) => {
                !id && router.push(`/projects/edit/${response.data.id}`)
                setLoading((prev) => ({ ...prev, saving: SAVING_STATUS.SAVED }))
            })
            .catch(() => setLoading((prev) => ({ ...prev, saving: SAVING_STATUS.ERROR })))
    }

    const intermediateOutcomes = useMemo(() => {
        return values.logical_context?.intermediate_outcomes?.map((outcome, index) => ({
            title: outcome.title ? outcome.title : `Résultat ${index}`,
            ...outcome
        }))
    }, [values.logical_context])

    const withoutAlreadyAddedIntermediateOutcomesMatrix = (currentItem: string) => {
        return [
            ...intermediateOutcomes?.filter((outcome) => {
                return !values.performance_matrix?.find((matrix) => matrix.outcome === outcome.title) || outcome.title === currentItem
            }),
            { title: "Autre" }
        ]
    }

    const withoutAlreadyAddedIntermediateOutcomesCalendar = (currentItem: string) => {
        return [
            ...intermediateOutcomes?.filter((outcome) => {
                return !values.calendar?.find((matrix) => matrix.outcome === outcome.title) || outcome.title === currentItem
            }),
            { title: "Autre" }
        ]
    }

    const selectedOutcomeActivities = (outcome: string) => {
        const selectedOutcome = intermediateOutcomes?.find((o) => o.title === outcome)
        if (selectedOutcome && selectedOutcome.immediate_outcomes) {
            return selectedOutcome.immediate_outcomes.flatMap((immediateOutcome) => immediateOutcome.activities || [])
        }
        return []
    }

    const DeleteButton = ({ onClick }: { onClick: () => void }) => (
        <button
            type="button"
            onClick={onClick}
            className="absolute -top-3 -end-3 scale-50 hover:scale-100 cursor-pointer rounded-full bg-red p-2 hover:bg-red/80 duration-300"
        >
            <Trash2 size={16} className="text-white" />
        </button>
    )

    const { run } = useThrottleFn(saveProject, { wait: 30000, leading: false, trailing: true })

    useEffect(() => {
        run()
    }, [values])

    useEffect(() => {
        getProject()
    }, [id])

    return (
        loading.project
            ? <PageLoad />
            : <form onSubmit={(e) => e.preventDefault()} className="space-y-4 relative">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="fixed top-22 right-10 z-[9999]">
                                <div className={`absolute w-4 h-4 rounded-full animate-pulse ${loading.saving === SAVING_STATUS.SAVED ? "bg-green-500" : loading.saving === SAVING_STATUS.SAVING ? "bg-yellow-500" : "bg-rose-500"}`} />
                                <div className={`absolute w-4 h-4 rounded-full animate-ping ${loading.saving === SAVING_STATUS.SAVED ? "bg-green-500" : loading.saving === SAVING_STATUS.SAVING ? "bg-yellow-500" : "bg-rose-500"}`} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="z-[99999]">
                            <p>
                                {loading.saving === SAVING_STATUS.SAVED ? "Sauvegardé !" : loading.saving === SAVING_STATUS.SAVING ? "Sauvegarde..." : "Une erreur est survenue"}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="grid gap-4">
                    <Card title="Informations générales">
                        <div className="grid grid-cols-2 gap-4">
                            <InputText name="title" label="Titre" value={values.title} onChange={handleChange} errors={errors.title} />
                            <InputText name="duration" label="Durée (Jours)" type="number" min={0} value={values.duration} onChange={handleChange} errors={errors.duration} />
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

                    <Card title="Objectifs spécifiques">
                        <InputChips name="objectives" label="Objectifs" value={values.objectives} setFieldValue={setFieldValue} errors={errors?.objectives} />
                    </Card>

                    <Card title="Portée">
                        <div className="space-y-2">
                            {
                                values.scopes && values.scopes?.map((scope, indexScope) => (
                                    <div key={`scopes.${indexScope}`} className="relative space-y-4 border rounded border-slate-400 p-1 grid md:grid-cols-3 gap-4 items-end">
                                        <InputText className="col-span-1" label="Zone d'intervention" name={`scopes.${indexScope}.intervention_zone`} value={scope.intervention_zone} onChange={handleChange} errors={errors} />
                                        <InputText type="number" min={0} className="col-span-1" label="Bénéficiaire homme" name={`scopes.${indexScope}.male_beneficiary`} value={scope.male_beneficiary} onChange={async (e) => {
                                            handleChange(e);
                                            setFieldValue(`scopes.${indexScope}.total_beneficiary`, e.target.valueAsNumber + scope.female_beneficiary)
                                        }} errors={errors} />
                                        <InputText type="number" min={0} className="col-span-1" label="Bénéficiaire femme" name={`scopes.${indexScope}.female_beneficiary`} value={scope.female_beneficiary} onChange={async (e) => {
                                            handleChange(e);
                                            await setFieldValue(`scopes.${indexScope}.total_beneficiary`, e.target.valueAsNumber + scope.male_beneficiary)
                                        }} errors={errors} />
                                        <InputText type="number" min={0} className="col-span-1" label="Total bénéficiaire" name={`scopes.${indexScope}.total_beneficiary`} value={scope.total_beneficiary} errors={errors} disabled />
                                        <DeleteButton onClick={() => setFieldValue("scopes", values.scopes.filter((_, i) => i !== indexScope))} />
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <Button variant="secondary" type="button" onClick={() => setFieldValue("scopes", [...values.scopes, JSON.parse(JSON.stringify({
                                intervention_zone: "",
                                male_beneficiary: "",
                                female_beneficiary: "",
                            }))])}>Ajouter une portée</Button>
                        </div>
                    </Card >

                    <Card title="Logique du Projet">
                        <div className="space-y-2">
                            <InputTextArea name={`logical_context.impact`} label={`Impact`} value={values.logical_context.impact} onChange={handleChange} errors={errors?.logical_context?.impact} />
                            {
                                values.logical_context.intermediate_outcomes && values.logical_context.intermediate_outcomes.length > 0 && values.logical_context.intermediate_outcomes.map((outcome, indexOutcome) => (
                                    <div className="relative space-y-4 border rounded border-slate-400 p-1" key={`logical_context.intermediate_outcomes.${indexOutcome}`} id={`logical_context.intermediate_outcomes.${indexOutcome}`}>
                                        <InputText name={`logical_context.intermediate_outcomes.${indexOutcome}.title`} label={`Résultat intermédiaire`} value={outcome.title} onChange={handleChange} errors={errors} />
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
                                                                <InputText className="col-span-1" name={`logical_context.intermediate_outcomes.${indexOutcome}.immediate_outcomes.${indexImOutcome}.activities.${indexActivity}.effect`} label={`Activité`} value={activiy.effect} onChange={handleChange} errors={errors} />
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
                                        ]
                                    }
                                ))])}>Ajouter une chaine de résultat</Button>
                            </div>
                        </div>

                    </Card>

                    <Card title="Stratégie d'intervention">
                        <InputChips name="intervention_strategies" id="intervention_strategies" label="Stratégies d'intervention" value={values.intervention_strategies} setFieldValue={setFieldValue} errors={errors?.intervention_strategies} />
                    </Card>

                    <Card title="Plan des acquisitions">
                        <div className="space-y-2">
                            {
                                values.acquisition_plan && values.acquisition_plan?.map((acquisition, indexAcquisition) => (
                                    <div key={`acquisition_plan.${indexAcquisition}`} className="relative border rounded border-slate-400 p-1 grid md:grid-cols-2 gap-2 items-end">
                                        <InputDate label="Date de début" name={`acquisition_plan.${indexAcquisition}.period.from`} value={acquisition.period.from} setFieldValue={setFieldValue} errors={errors} />
                                        <InputDate label="Date de fin" name={`acquisition_plan.${indexAcquisition}.period.to`} value={acquisition.period.to} setFieldValue={setFieldValue} errors={errors} />
                                        {
                                            acquisition.acquisitions?.map((acquisition, indexAcquisition) => (
                                                <div key={`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}`} className="relative grid grid-cols-2 gap-4 border rounded border-slate-600 p-1 col-span-2">
                                                    <InputText label="Type d'acquisitions" name={`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}.type`} value={acquisition.type} onChange={handleChange} />
                                                    <InputText type="number" min={0} label="Quantité" name={`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}.quantity`} value={acquisition.quantity} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setFieldValue(`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}.total_price`, e.target.valueAsNumber * acquisition.unit_price) }} />
                                                    <InputText type="number" min={0} label="Prix unitaire" name={`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}.unit_price`} value={acquisition.unit_price} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setFieldValue(`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}.total_price`, e.target.valueAsNumber * acquisition.quantity) }} />
                                                    <InputText type="number" min={0} label="Coût total" name={`acquisition_plan.${indexAcquisition}.acquisitions.${indexAcquisition}.total_price`} value={acquisition.total_price} onChange={handleChange} disabled />
                                                    <DeleteButton onClick={() => setFieldValue(`acquisition_plan.${indexAcquisition}.acquisitions`, values.acquisition_plan[indexAcquisition].acquisitions.filter((_, index) => index !== indexAcquisition))} />
                                                </div>
                                            ))
                                        }
                                        <DeleteButton onClick={() => setFieldValue(`acquisition_plan`, values.acquisition_plan.filter((_, index) => index !== indexAcquisition))} />
                                        <div className="flex justify-end col-span-2">
                                            <Button variant="outline" type="button" onClick={() => setFieldValue(`acquisition_plan.${indexAcquisition}.acquisitions`, [...values.acquisition_plan[indexAcquisition].acquisitions, structuredClone({
                                                type: "",
                                                quantity: "",
                                                unit_price: "",
                                                total_price: ""
                                            })])}>Ajouter une acquisition</Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <Button variant="secondary" type="button" onClick={() => setFieldValue("acquisition_plan", [...values.acquisition_plan, structuredClone({
                                period: {
                                    from: new Date(),
                                    to: new Date()
                                },
                                acquisitions: [
                                    {
                                        type: "",
                                        quantity: "",
                                        unit_price: "",
                                        total_price: ""
                                    }
                                ]
                            })])}>Ajouter une chaine d&apos;acquisitions</Button>
                        </div>
                    </Card>

                    <Card title="Plan des infrastructures">
                        <div className="space-y-2">
                            {
                                values.infrastructures_plan && values.infrastructures_plan?.map((infrastructure, indexInfrastructure) => (
                                    <div key={`infrastructures_plan.${indexInfrastructure}`} className="relative border rounded border-slate-400 p-1 grid md:grid-cols-2 gap-2 items-end">
                                        <InputText label="Localité" name={`infrastructures_plan.${indexInfrastructure}.locality`} value={infrastructure.locality} onChange={handleChange} errors={errors} />
                                        <InputText label="Type d'infrastructure" name={`infrastructures_plan.${indexInfrastructure}.type`} value={infrastructure.type} onChange={handleChange} errors={errors} />
                                        <InputDate label="Période" mode="range" name={`infrastructures_plan.${indexInfrastructure}.period`} value={infrastructure.period} setFieldValue={setFieldValue} errors={errors} />
                                        <InputText label="Coût / Montant" name={`infrastructures_plan.${indexInfrastructure}.cost`} value={infrastructure.cost} onChange={handleChange} errors={errors} />
                                        <InputTextArea className="col-span-2" label="Description détaillée" name={`infrastructures_plan.${indexInfrastructure}.description`} value={infrastructure.description} onChange={handleChange} errors={errors} />
                                        <DeleteButton onClick={() => setFieldValue(`infrastructures_plan`, values.infrastructures_plan.filter((_, index) => index !== indexInfrastructure))} />
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <Button variant="secondary" type="button" onClick={() => setFieldValue("infrastructures_plan", [...values.infrastructures_plan, structuredClone({
                                locality: "",
                                type: "",
                                period: {
                                    from: new Date(),
                                    to: new Date()
                                },
                                cost: "",
                                description: "",
                            })])}>Ajouter une infrastructure</Button>
                        </div>
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
                                                            <div key={`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders.${indexStakeholder}`} className="relative p-1 border rounded border-slate-500 grid md:grid-cols-2 gap-4">
                                                                <InputChips type="string" name={`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders.${indexStakeholder}.name`} label="Nom" value={stakeholder.name} setFieldValue={setFieldValue} errors={errors} />
                                                                <InputChips type="string" name={`partners.${indexPartner}.managment_levels.${indexLevel}.stakeholders.${indexStakeholder}.abilities`} label="Rôles & responsabilités" value={stakeholder.abilities} setFieldValue={setFieldValue} errors={errors} />
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
                                                        ))])}>Ajouter une partie prenante</Button>
                                                    </div>
                                                </div>
                                                <DeleteButton onClick={() => setFieldValue("partners", values.partners.filter((_, i) => i !== indexPartner))} />
                                            </div>
                                        ))
                                    }
                                    <div className="flex justify-end col-span-2">
                                        <Button type="button" variant="outline" onClick={() => setFieldValue(`partners.${indexPartner}.managment_levels`, [...values.partners[indexPartner].managment_levels, structuredClone({
                                            title: "",
                                            level: "",
                                            stakeholders: [
                                                {
                                                    name: [],
                                                    abilities: [],
                                                }
                                            ]
                                        })])}>Ajouter un niveau de Structure</Button>
                                    </div>
                                </div>
                            ))
                        }
                        <div>
                            <Button type="button" variant="secondary" onClick={() => setFieldValue(`partners`, [...values.partners, structuredClone({
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
                            })])}>Ajouter un niveau de gestion</Button>
                        </div>
                    </Card>

                    <Card title="Mécanisme de suivi de la qualité">
                        <InputChips name="quality_monitoring" value={values.quality_monitoring} setFieldValue={setFieldValue} errors={errors?.quality_monitoring} />
                    </Card>

                    <Card title="Matrice de performance">
                        <div className="space-y-2">
                            {
                                values.performance_matrix && values.performance_matrix.length > 0 && values.performance_matrix.map((performance_mtx, indexMtx) => (
                                    <div key={indexMtx} className="relative space-y-1 p-1 border rounded border-slate-300">
                                        <div className="space-y-1 p-1 border rounded border-slate-300">
                                            <InputSelect options={withoutAlreadyAddedIntermediateOutcomesMatrix(performance_mtx.outcome)} optionLabel="title" optionValue="title" name={`performance_matrix.${indexMtx}.outcome`} label="Résultat" value={performance_mtx.outcome} setFieldValue={setFieldValue} errors={errors} />
                                            {
                                                performance_mtx.indicateur && performance_mtx.indicateur?.map((indicateur, indexIndicateur) => (
                                                    <div key={indexIndicateur} className="relative space-y-1 p-1 border rounded border-slate-400">
                                                        <InputText name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.title`} label="Indicateur" value={indicateur.title} onChange={handleChange} errors={errors} />
                                                        <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.baseline`} label="Données de base" value={indicateur.props.baseline} setFieldValue={setFieldValue} errors={errors} />
                                                        <InputText name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.target`} label="Cible" value={indicateur.props.target} onChange={handleChange} errors={errors} />
                                                        <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.data_souces`} label="Sources de données" value={indicateur.props.data_souces} setFieldValue={setFieldValue} errors={errors} />
                                                        <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.collect_tools`} label="Méthodes de collecte" value={indicateur.props.collect_tools} setFieldValue={setFieldValue} errors={errors} />
                                                        <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.frequency`} label="Fréquences" value={indicateur.props.frequency} setFieldValue={setFieldValue} errors={errors} />
                                                        <InputChips name={`performance_matrix.${indexMtx}.indicateur.${indexIndicateur}.props.managers`} label="Responsables" value={indicateur.props.managers} setFieldValue={setFieldValue} errors={errors} />
                                                        <DeleteButton onClick={() => setFieldValue(`performance_matrix.${indexMtx}.indicateur`, values.performance_matrix[indexMtx].indicateur.filter((_, i) => i !== indexIndicateur))} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <DeleteButton onClick={() => setFieldValue("performance_matrix", values.performance_matrix.filter((_, i) => i !== indexMtx))} />
                                        <div className="flex justify-end">
                                            <Button variant="outline" type="button" onClick={() => setFieldValue(`performance_matrix.${indexMtx}.indicateur`, [...values.performance_matrix[indexMtx].indicateur, JSON.parse(JSON.stringify(
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

                    <Card title="Plan budgétaire">
                        <div className="space-y-2">
                            {
                                values.budget_plan && values.budget_plan.length > 0 && values.budget_plan.map((budget_pln, indexPlan) => (
                                    <div className="relative space-y-2 border-slate-300 border p-1 rounded" key={indexPlan} id={`budget_plan.${indexPlan}.title`}>
                                        <InputText name={`budget_plan.${indexPlan}.section`} label={`Rubrique`} value={budget_pln.section} onChange={handleChange} errors={errors} />
                                        {
                                            budget_pln && budget_pln.activities.map((activity, indexActivity) => (
                                                <div key={indexActivity} className="grid md:grid-cols-2 gap-4 relative border border-slate-400 p-1 rounded">
                                                    <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.title`} label={`Titre`} value={activity.title} onChange={handleChange} errors={errors} />
                                                    <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.unit`} label={`Unité`} value={activity.unit} onChange={handleChange} errors={errors} />
                                                    <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.frequency`} label={`Fréquence`} type="number" min={0} value={activity.frequency} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setFieldValue(`budget_plan.${indexPlan}.activities.${indexActivity}.amount`, activity.unit_price * e.target.valueAsNumber * activity.quantity) }} errors={errors} />
                                                    <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.quantity`} label={`Quantité`} type="number" min={0} value={activity.quantity} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setFieldValue(`budget_plan.${indexPlan}.activities.${indexActivity}.amount`, activity.unit_price * e.target.valueAsNumber * activity.frequency) }} errors={errors} />
                                                    <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.unit_price`} label={`Prix unitaire`} type="number" min={0} value={activity.unit_price} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e); setFieldValue(`budget_plan.${indexPlan}.activities.${indexActivity}.amount`, e.target.valueAsNumber * activity.quantity) }} errors={errors} />
                                                    <InputText name={`budget_plan.${indexPlan}.activities.${indexActivity}.amount`} label={`Montant`} type="number" min={0} value={activity.amount} onChange={handleChange} errors={errors} disabled />
                                                    <DeleteButton onClick={() => setFieldValue(`budget_plan.${indexPlan}.activities`, values.budget_plan[indexPlan].activities.filter((_, i) => i !== indexActivity))} />
                                                </div>
                                            ))
                                        }
                                        <DeleteButton onClick={() => setFieldValue("budget_plan", values.budget_plan.filter((_, i) => i !== indexPlan))} />
                                        <div className="flex justify-end">
                                            <Button variant="outline" type="button" onClick={() => setFieldValue(`budget_plan.${indexPlan}.activities`, [...values.budget_plan[indexPlan].activities, JSON.parse(JSON.stringify(
                                                {
                                                    title: "",
                                                    unit: "",
                                                    frequency: "",
                                                    quantity: 0,
                                                    unit_price: 0,
                                                    amount: 0,
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
                                            title: "",
                                            unit: "",
                                            frequency: "",
                                            quantity: 0,
                                            unit_price: 0,
                                            amount: 0,
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
                                        <InputSelect options={withoutAlreadyAddedIntermediateOutcomesCalendar(calendar.outcome)} optionLabel="title" optionValue="title" name={`calendar.${indexCalendar}.outcome`} label="Résultat" value={calendar.outcome} setFieldValue={setFieldValue} onChange={(outcome: any) => {
                                            if (outcome === "Autre") {
                                                setFieldValue(`calendar.${indexCalendar}.activities`, []);
                                                return;
                                            }
                                            const activities = selectedOutcomeActivities(outcome).map((activity) => {
                                                return structuredClone({ title: activity?.effect, period: [{ from: "", to: "", }] });
                                            });
                                            setFieldValue(`calendar.${indexCalendar}.activities`, activities);
                                        }} errors={errors} />
                                        {
                                            calendar && calendar.activities.map((activity, indexActivity) => (
                                                <div key={`calendar.${indexCalendar}.activities.${indexActivity}`} className="grid md:grid-cols-2 gap-4 border border-slate-400 p-1 rounded relative">
                                                    <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.title`} label={`Titre`} value={activity.title} onChange={handleChange} errors={errors} disabled={calendar.outcome !== "Autre"} />
                                                    <InputText name={`calendar.${indexCalendar}.activities.${indexActivity}.responsible`} label={`Responsable`} value={activity.responsible} onChange={handleChange} errors={errors} />
                                                    {
                                                        activity.period && activity.period.map((period, indexPeriod) => (
                                                            <div key={indexPeriod} className="grid grid-cols-2 gap-4 col-span-2 relative p-1 border border-slate-500 rounded">
                                                                <InputDate name={`calendar.${indexCalendar}.activities.${indexActivity}.period.${indexPeriod}.from`} label={`Date de début`} mode="single" value={period.from} setFieldValue={setFieldValue} errors={errors} />
                                                                <InputDate name={`calendar.${indexCalendar}.activities.${indexActivity}.period.${indexPeriod}.to`} label={`Date de fin`} mode="single" value={period.to} setFieldValue={setFieldValue} errors={errors} />
                                                                <DeleteButton onClick={() => setFieldValue(`calendar.${indexCalendar}.activities.${indexActivity}.period`, values.calendar[indexCalendar].activities[indexActivity].period.filter((_, i) => i !== indexPeriod))} />
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="flex justify-end col-span-2">
                                                        <Button variant="outline" type="button" onClick={() => setFieldValue(`calendar.${indexCalendar}.activities.${indexActivity}.period`, [...values.calendar[indexCalendar].activities[indexActivity].period, JSON.parse(JSON.stringify(
                                                            {
                                                                from: "",
                                                                to: "",
                                                            }
                                                        ))])}>Ajouter une période</Button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <DeleteButton onClick={() => setFieldValue("calendar", values.calendar.filter((_, i) => i !== indexCalendar))} />
                                        {
                                            calendar.outcome === "Autre" &&
                                            <div className="flex justify-end">
                                                <Button variant="outline" type="button" onClick={() => setFieldValue(`calendar.${indexCalendar}.activities`, [...values.calendar[indexCalendar].activities, structuredClone({
                                                    title: "",
                                                    responsible: "",
                                                    period: [
                                                        {
                                                            from: "",
                                                            to: "",
                                                        }
                                                    ]
                                                })])}>Ajouter une activité</Button>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <Button variant="secondary" type="button" onClick={() => setFieldValue("calendar", [...values.calendar, structuredClone({
                                outcome: "",
                                activities: [
                                    {
                                        title: "",
                                        period: [
                                            {
                                                from: "",
                                                to: "",
                                            }
                                        ]
                                    }
                                ],
                            })])}>Ajouter un calendrier</Button>
                        </div>
                    </Card>
                </div >

                <div className="w-full flex justify-end">
                    <Button onClick={() => handleSubmit()} type="submit" variant="default" loading={loading.submit}>Enregistrer</Button>
                </div>
            </form >
    );
}
