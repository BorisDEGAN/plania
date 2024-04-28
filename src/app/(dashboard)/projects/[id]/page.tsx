"use client";

import CardLoad from "@/components/Card/CardLoad";
import { CardPip } from "@/components/Card/CardPip";
import PageLoad from "@/components/Loader/PageLoad";
import { Button } from "@/components/ui/button";
import projectPlanApi from "@/services/project-plan.service";
import projectApi from "@/services/project.service";
import useToast from "@/shared/helpers/useToast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { IProject, IProjectPlan } from "@/shared/models";
import React, { useState } from "react";
import { Ellipsis, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const router = useRouter()

    const { toastSuccess } = useToast()

    const [project, setProject] = useState<IProject | null>(null)

    const [projectPlans, setProjectPlans] = useState<IProjectPlan[]>([])

    const [loading, setLoading] = useState({
        project: false,
        project_plan: false
    })

    function getProjectPlans() {
        setLoading({
            ...loading,
            project_plan: true
        })
        projectPlanApi().searchProjectPlans({ project_id: id }).then((response) => {
            setProjectPlans(response.data)
        }).finally(() => setLoading({
            ...loading,
            project_plan: false
        }))
    }

    async function generateProjectPlan() {
        setLoading({
            ...loading,
            project_plan: true
        })
        await projectPlanApi().createProjectPlan({ project_id: id }).then((response) => {
            toastSuccess(response.message)
            getProjectPlans()
        }).finally(() => setLoading({
            ...loading,
            project_plan: false
        }))
    }

    function MenuOption(project: IProject) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-2">
                    <DropdownMenuItem onClick={() => { router.push(`/generate-pip/${project.id}`) }} className="outline-0 w-full flex justify-start">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <EyeIcon className="text-blue-500" size={18} />
                            <span>Afficher</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }


    React.useEffect(() => {
        (() => {
            setLoading({
                ...loading,
                project: true
            })
            projectApi().getProject(id).then((response) => {
                setProject(response.data)
            }).finally(() => {
                getProjectPlans()
                setLoading({
                    ...loading,
                    project: false
                })
            })
        })()
    }, [id])

    return (
        loading.project
            ? <PageLoad />
            : <>
                {
                    project &&
                    <div className="container mx-auto py-8">
                        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                        <p className="text-lg text-justify mb-4">{project.overview}</p>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Context</h2>
                            <p className="text-justify">{project.context}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Justification</h2>
                            <p className="text-justify">{project.justification}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-justify">{project.description}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Global Objective</h2>
                            <p className="text-justify">{project.global_objective}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Objectives</h2>
                            <ul>
                                {project.objectives.map((objective, index) => (
                                    <li key={index}>{objective}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Duration</h2>
                            <p className="text-justify">{project.duration} Months</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Budget</h2>
                            <p className="text-justify">{project.budget} {project.budget_currency}</p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Logical Context</h2>
                            <p className="text-justify">Impact: {project.logical_context.impact}</p>
                            {project.logical_context.intermediate_outcomes.map((outcome, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold mt-4 mb-2">{outcome.title}</h3>
                                    {outcome.immediate_outcomes.map((immediateOutcome, i) => (
                                        <div key={i}>
                                            <h4 className="text-md font-semibold mt-2 mb-1">{immediateOutcome.title}</h4>
                                            <ul>
                                                {immediateOutcome.activities && immediateOutcome.activities.map((activity, j) => (
                                                    <li key={j}>{activity.title}: {activity.effect}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Intervention Stratégies</h2>
                            <ul>
                                {project.intervention_strategies.map((strategy, index) => (
                                    <li key={index}>{strategy}</li>
                                ))}
                            </ul>
                        </div>

                        {/* <div className="border-t border-b border-gray-200 py-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Partners</h2>
                            {project.partners && project.partners.map((partner, index) => (
                                <div key={index}>
                                    {partner.managment_levels && partner.managment_levels.map((level, i) => (
                                        <div key={i}>
                                            <h3 className="text-lg font-semibold mt-4 mb-2">{level.title}</h3>
                                            {level.stakeholders.map((stakeholder, j) => (
                                                <div key={j}>
                                                    <h4 className="text-md font-semibold mt-2 mb-1">Stakeholder: {stakeholder.name.join(", ")}</h4>
                                                    <p className="text-justify">Abilities: {stakeholder.abilities.join(", ")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div> */}

                        <div className="flex justify-end">
                            <Button onClick={generateProjectPlan} loading={loading.project_plan}>Générer le PiP</Button>
                        </div>
                    </div>
                }

                {
                    projectPlans.length > 0 && <>
                        <h3 className="text-lg font-semibold mb-4">Historique des PiPs générés</h3>
                        <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4 border rounded p-2 border-slate-300">
                            {
                                loading.project_plan
                                    ? [1, 2, 3, 4, 5, 6].map((item) => <CardLoad key={item} />)
                                    : projectPlans.map((project) => <CardPip key={project.id} project={project} menuOptions={MenuOption(project)} />)
                            }
                        </div>
                    </>
                }
            </>
    );
}
