"use client";

import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Link,
    Font,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { IProject } from "@/shared/models";
import { createTw } from "react-pdf-tailwind";
import DocPage from "./DocPage";
import DocText from "./DocText";
import DocHeader from "./DocHeader";

const tw = createTw({});

export const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Chargement...</p>,
    }
);

export const DocumentPrinter = ({ project }: { project: IProject }) => (
    <PDFViewer style={tw("w-full h-[100vh]")} >
        <Document title={project.title} subject={project.title} creator="Made with Plania" author="Plania" producer="Plania">
            <DocPage>
                <View style={tw("h-full w-full flex justify-center items-center")}>
                    <View>
                        <Text style={tw("text-5xl")}>{project.title}</Text>
                        <Text style={tw("text-sm")}>Made by Plania</Text>
                    </View>
                </View>
            </DocPage>

            <DocPage>
                <View style={tw("h-full w-full")}>
                    <Text style={tw("mb-2")}>Sommaire</Text>
                    <View style={tw("w-full h-[0.6px] bg-slate-300 mb-8")}></View>
                    <View style={tw("ml-4")}>
                        {
                            [1, 2, 3, 4,].map((item) => (
                                <View key={item} style={tw("mt-4")}>
                                    <Text style={tw("text-md text-base")}>{item}. INTRODUCTION</Text>
                                    <View style={tw("ml-2 text-sm space-y-2")}>
                                        <Text>{item}.1. OBJECTIFS</Text>
                                        <Text>{item}.2. OBJECTIFS</Text>
                                        <Text>{item}.3. OBJECTIFS</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </DocPage>

            <DocPage>
                <DocHeader text="I. INTRODUCTION" />
                <DocText text={project.description} />
                <DocText text={project.description} />
                <DocText text={project.description} />
                <DocText text={project.description} />
                <DocText text={project.description} />
                <DocText text={project.description} />
                <DocText text={project.description} />
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Context</Text>
                <Text style={tw("text-xs mt-1")}>{project.context}</Text>
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Justification</Text>
                <Text style={tw("text-xs mt-1")}>{project.justification}</Text>
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Objectif global</Text>
                <Text style={tw("text-xs mt-1")}>{project.global_objective}</Text>
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Objectifs</Text>
                {
                    project.objectives && project.objectives.length > 0 && project.objectives.map((objective, indexObjective) => (
                        <Text key={indexObjective} style={tw("text-xs mt-2")}>{objective}</Text>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Resultats attendus</Text>
                {
                    project.outcomes && project.outcomes.length > 0 && project.outcomes.map((outcome, indexOutcome) => (
                        <View key={indexOutcome} style={tw("mt-4")}>
                            <Text style={tw("text-lg")}>{outcome.title}</Text>
                            <View>
                                {
                                    outcome.activities && outcome.activities.length > 0 && outcome.activities.map((activity, indexActivity) => (
                                        <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity}</Text>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Activités</Text>
                {
                    project.objectives && project.objectives.length > 0 && project.objectives.map((objective, indexObjective) => (
                        <Text key={indexObjective} style={tw("text-xs mt-2")}>{objective}</Text>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Context logique</Text>
                {
                    project.logical_context.objectives && project.logical_context.objectives.length > 0 && project.logical_context.objectives.map((objective, indexObjective) => (
                        <Text key={indexObjective} style={tw("text-xs mt-2")}>{objective}</Text>
                    ))
                }
                {
                    project.logical_context.outcomes && project.logical_context.outcomes.length > 0 && project.logical_context.outcomes.map((outcome, indexOutcome) => (
                        <View key={indexOutcome} style={tw("mt-4")}>
                            <Text style={tw("text-lg")}>{outcome.title}</Text>
                            <View>
                                {
                                    outcome.activities && outcome.activities.length > 0 && outcome.activities.map((activity, indexActivity) => (
                                        <View key={indexActivity}>
                                            <Text style={tw("text-xs mt-2")}>{activity.title}</Text>
                                            {
                                                activity.intermediate_outcomes && activity.intermediate_outcomes.length > 0 && activity.intermediate_outcomes.map((intermediateOutcome, indexIntermediateOutcome) => (
                                                    <Text key={indexIntermediateOutcome} style={tw("text-xs mt-2")}>{intermediateOutcome}</Text>
                                                ))
                                            }
                                            {
                                                activity.efects && activity.efects.length > 0 && activity.efects.map((effect, indexEffect) => (
                                                    <Text key={indexEffect} style={tw("text-xs mt-2")}>{effect}</Text>
                                                ))
                                            }
                                            {
                                                activity.impacts && activity.impacts.length > 0 && activity.impacts.map((impact, indexImpact) => (
                                                    <Text key={indexImpact} style={tw("text-xs mt-2")}>{impact}</Text>
                                                ))
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Partenaires</Text>
                {
                    project.partners && project.partners.length > 0 && project.partners.map((outcome, indexOutcome) => (
                        <View key={indexOutcome} style={tw("mt-4")}>
                            <Text style={tw("text-lg")}>{outcome.name}</Text>
                            <View>
                                {
                                    outcome.abilities && outcome.abilities.length > 0 && outcome.abilities.map((activity, indexActivity) => (
                                        <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity}</Text>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Matrixe de performance</Text>
                {
                    project.performance_matrix && project.performance_matrix.length > 0 && project.performance_matrix.map((outcome, indexOutcome) => (
                        <View key={indexOutcome} style={tw("mt-4")}>
                            <Text style={tw("text-lg")}>{outcome.effect}</Text>
                            <Text style={tw("text-lg")}>{outcome.frequency}</Text>
                            <Text style={tw("text-lg")}>{outcome.analyse}</Text>
                            <View>
                                {
                                    outcome.verification_sources && outcome.verification_sources.length > 0 && outcome.verification_sources.map((activity, indexActivity) => (
                                        <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity}</Text>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Plan budgetaire</Text>
                {
                    project.budget_plan && project.budget_plan.length > 0 && project.budget_plan.map((objective, indexObjective) => (
                        <Text key={indexObjective} style={tw("text-xs mt-2")}>{objective.section}</Text>
                    ))
                }
                {
                    project.budget_plan && project.budget_plan.length > 0 && project.budget_plan.map((outcome, indexOutcome) => (
                        <View key={indexOutcome} style={tw("mt-4")}>
                            <Text style={tw("text-lg")}>{outcome.section}</Text>
                            <View>
                                {
                                    outcome.activities && outcome.activities.length > 0 && outcome.activities.map((activity, indexActivity) => (
                                        <View key={indexActivity}>
                                            <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity.title}</Text>
                                            <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity.budget}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </DocPage>

            <DocPage>
                <Text style={tw("text-lg")}>Calendrier des evenements</Text>
                {
                    project.calendar && project.calendar.length > 0 && project.calendar.map((outcome, indexOutcome) => (
                        <View key={indexOutcome} style={tw("mt-4")}>
                            <Text style={tw("text-lg")}>{outcome.outcome}</Text>
                            <View>
                                {
                                    outcome.activities && outcome.activities.length > 0 && outcome.activities.map((activity, indexActivity) => (
                                        <View key={indexActivity}>
                                            <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity.title}</Text>
                                            <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity.start_date}</Text>
                                            <Text key={indexActivity} style={tw("text-xs mt-2")}>{activity.end_date}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </DocPage>
        </Document>
    </PDFViewer>
);
