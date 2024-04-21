"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DocumentPrinter } from "@/components/Document/Index";
import PageLoad from "@/components/Loader/PageLoad";
import { Badge } from "@/components/ui/badge";
import projectApi from "@/services/project.service";
import { IProject } from "@/shared/models";
import { PROJECT_STATE } from "@/shared/types";
import { useState } from "react";

export default function Project({ params }: { params: { id: string } }) {

    const { id } = params

    const [project, setProject] = useState<IProject>({
        title: "Creation du PAC",
        beneficiaries: ["FCVGBHNJMK", "FCVGBHNJMK", "FCVGBHNJMK"],
        intervention_zone: "Cotonou",
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
        global_objective: `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
        objectives: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
        outcomes: [
            {
                title: "Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.",
                activities: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., fo`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., fo`]
            },
            {
                title: "createTw: We create a Tailwind configuration using createTw (optional, customize as needed).",
                activities: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., fo`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., fo`]
            }
        ],
        activities: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
        logical_context: {
            budget: 50000,
            objectives: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
            outcomes: [
                {
                    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, nemo!",
                    activities: [
                        {
                            title: "Generation du document apres listage",
                            intermediate_outcomes: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                            efects: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                            impacts: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`]
                        },
                        {
                            title: "Generation du document apres listage",
                            intermediate_outcomes: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                            efects: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                            impacts: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`]
                        }
                    ]
                },
                {
                    title: "Résultats attendus",
                    activities: [
                        {
                            title: "Generation du document apres listage",
                            intermediate_outcomes: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                            efects: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                            impacts: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`]
                        }
                    ]
                }
            ]
        },
        intervention_strategy: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
        partners: [
            {
                name: "ONG MAGLOIRE",
                abilities: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`]
            },
            {
                name: "ONG MAGLOIRE",
                abilities: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`, `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`]
            }
        ],
        quality_monitoring: "Quality Monitoring",
        performance_matrix: [
            {
                effect: `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
                verification_sources: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                collect_tools: [`Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`],
                frequency: "Monthly",
                analyse: `Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.
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
You can add more sections for other properties like intervention_strategy, budget summary, etc., following the same structure and styling them with Tailwind classes.`
            }
        ],
        budget_plan: [
            {
                section: "Budget Section",
                activities: [
                    {
                        title: "Generation du document apres listage",
                        budget: 10000
                    }
                ]
            }
        ],
        budget_currency: "USD",
        calendar: [
            {
                outcome: "Project Context Imports: We import necessary components from react-pdf and react-pdf-tailwind.",
                activities: [
                    {
                        title: "Generation du document apres listage",
                        start_date: "2024-01-01",
                        end_date: "2024-01-31"
                    }
                ]
            }
        ]
    } as IProject)

    const [loading, setLoading] = useState(false)

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

    function getProject() {
        setLoading(true)
        projectApi().getProject(id).then((response) => {
            console.log(response.data)
            setProject(response.data)
        }).finally(() => setLoading(false))
    }

    return (
        loading
            ? <PageLoad />
            : <>
                <div>
                    <Breadcrumb pageName={project.title as string} />

                    <DocumentPrinter project={project} />

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
