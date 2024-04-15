"use client";;
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DocumentPrinter } from "@/components/Document/Index";
import PageLoad from "@/components/Loader/PageLoad";
import { Badge } from "@/components/ui/badge";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { PROJECT_STATE } from "@/shared/types";
import { useEffect, useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [project, setProject] = useState<IProject>({
        title: "Creation du PAC",
        description: `Project Description lorem Imports: We import necessary components from react-pdf and react-pdf-tailwind.
createTw: We create a Tailwind configuration using createTw (optional, customize as needed).
ProjectSummary Component: This component takes the projectData object as props.
Document Structure:
The document has a single A4 page styled with p-4 class (Tailwind padding).
A header displays the project title and "Project Summary" subtitle.
Project Description:
Displays the project description under a dedicated section.
Key Project Details:
Displays context, justification, duration (with "years" label), and global objective in a two-column grid.
Additional Sections:
This example shows a section for partners. It checks if there are partners and conditionally renders a list or a message.
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`,
        context: `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
createTw: We create a Tailwind configuration using createTw (optional, customize as needed).
ProjectSummary Component: This component takes the projectData object as props.
Document Structure:
The document has a single A4 page styled with p-4 class (Tailwind padding).
A header displays the project title and "Project Summary" subtitle.
Project Description:
Displays the project description under a dedicated section.
Key Project Details:
Displays context, justification, duration (with "years" label), and global objective in a two-column grid.
Additional Sections:
This example shows a section for partners. It checks if there are partners and conditionally renders a list or a message.
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`,
        justification: `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
createTw: We create a Tailwind configuration using createTw (optional, customize as needed).
ProjectSummary Component: This component takes the projectData object as props.
Document Structure:
The document has a single A4 page styled with p-4 class (Tailwind padding).
A header displays the project title and "Project Summary" subtitle.
Project Description:
Displays the project description under a dedicated section.
Key Project Details:
Displays context, justification, duration (with "years" label), and global objective in a two-column grid.
Additional Sections:
This example shows a section for partners. It checks if there are partners and conditionally renders a list or a message.
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`,
        duration: 12,
        global_objective: "Global Objective",
        objectives: ["Objective 1", "Objective 2"],
        outcomes: [
            {
                title: "Outcome 1",
                activities: ["Activity 1", "Activity 2"]
            },
            {
                title: "Outcome 2",
                activities: ["Activity 3", "Activity 4"]
            }
        ],
        activities: ["Activity 1", "Activity 2"],
        logical_context: {
            budget: 50000,
            objectives: ["Objective 1", "Objective 2"],
            outcomes: [
                {
                    title: "Outcome 1",
                    activities: [
                        {
                            title: "Activity 1",
                            intermediate_outcomes: ["Intermediate Outcome 1"],
                            efects: ["Effect 1"],
                            impacts: ["Impact 1"]
                        },
                        {
                            title: "Activity 2",
                            intermediate_outcomes: ["Intermediate Outcome 2"],
                            efects: ["Effect 2"],
                            impacts: ["Impact 2"]
                        }
                    ]
                },
                {
                    title: "Outcome 2",
                    activities: [
                        {
                            title: "Activity 3",
                            intermediate_outcomes: ["Intermediate Outcome 3"],
                            efects: ["Effect 3"],
                            impacts: ["Impact 3"]
                        }
                    ]
                }
            ]
        },
        intervention_strategy: "Intervention Strategy",
        partners: [
            {
                name: "Partner 1",
                abilities: ["Ability 1", "Ability 2"]
            },
            {
                name: "Partner 2",
                abilities: ["Ability 3", "Ability 4"]
            }
        ],
        quality_monitoring: "Quality Monitoring",
        performance_matrix: [
            {
                effect: "Effect 1",
                verification_sources: ["Source 1"],
                collect_tools: ["Tool 1"],
                frequency: "Monthly",
                analyse: "Analysis 1"
            }
        ],
        budget_plan: [
            {
                section: "Section 1",
                activities: [
                    {
                        title: "Activity 1",
                        budget: 10000
                    }
                ]
            }
        ],
        budget_currency: "USD",
        calendar: [
            {
                outcome: "Outcome 1",
                activities: [
                    {
                        title: "Activity 1",
                        start_date: "2024-01-01",
                        end_date: "2024-01-31"
                    }
                ]
            }
        ]
    } as IProject)

    const [loading, setLoading] = useState(false)

    function getProject() {
        setLoading(true)
        projectApi().getProject(id).then((response) => {
            setProject(response.data)
        }).finally(() => setLoading(false))
    }

    function resolveStatus(status: string): { variant: "default" | "destructive" | "outline" | "secondary" | "warning" | "success" | "danger" | null | undefined, text: string } {
        switch (status) {
            case PROJECT_STATE.PENDING_STATE:
                return { variant: 'warning', text: 'En attente' }
            case PROJECT_STATE.STARTED_STATE:
                return { variant: 'success', text: 'Accepté' }
            case PROJECT_STATE.CANCELED_STATE:
                return { variant: 'danger', text: 'Annulé' }
            case PROJECT_STATE.FINISHED_STATE:
                return { variant: 'secondary', text: 'Terminé' }
            default:
                return { variant: 'outline', text: 'En attente' }
        }
    }

    useEffect(() => {
        // getProject()
    }, [params.id])

    return (
        loading
            ? <PageLoad />
            : <>
                <div>
                    <DocumentPrinter project={project} />
                    <Breadcrumb pageName={project.title as string} />

                    <div className="p-2 border-slate-300 shadow rounded space-y-3 text-justify">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl">{project.title}</h3>
                            <Badge variant={resolveStatus(project.status as string).variant}>{resolveStatus(project.status as string).text}</Badge>
                        </div>
                        <div>{project.description}</div>
                        <div>{project.context}</div>

                    </div>
                </div>
            </>
    );
}
