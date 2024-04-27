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
import DocText from "./DocText";
import DocHeader from "./DocHeader";
import PageLoad from "../Loader/PageLoad";
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from "./src";
import DocPage from "./DocPage";

const tw = createTw({});

export const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <PageLoad />,
    }
);

export const DocumentPrinter = ({ project }: { project: IProject }) => (
    <PDFViewer style={tw("w-full h-[80vh]")} >
        <Document title={project.title} subject={project.title} creator="Made with Plania" author="Plania" producer="Plania">

           {/*  <DocPage>

                <Text style={tw("mb-4 text-center text-2xl")}>Sommaire</Text>

                <DocHeader text="I. INTRODUCTION" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Bref aperçu du projet" heading="h4" />
                    <DocHeader text="B. Contexte et Justification" heading="h4" />
                    <DocHeader text="C. Description du projet : Objectifs et portée" heading="h4" />
                </View>

                <DocHeader text="II. RÉSULTATS ATTENDUS" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Cadre Logique" heading="h4" />
                    <DocHeader text="B. Structure de découpage du projet (WBS)" heading="h4" />
                    <DocHeader text="C. Axes stratégiques du projet" heading="h4" />
                </View>

                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Description des partenaires et de leur rôle" heading="h4" />
                    <DocHeader text="B. Plan de communication avec les partenaires" heading="h4" />
                </View>

                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES " heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Plan de gestion des acquisitions" heading="h4" />
                    <DocHeader text="B. Plan de gestion des travaux de construction" heading="h4" />
                </View>

                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES " heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Mécanismes de contrôle qualité" heading="h4" />
                    <DocHeader text="B. Matrice de performance du projet" heading="h4" />
                </View>

                <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Calendrier pluriannuel d’exécution/ Diagramme de GANTT" heading="h4" />
                </View>

                <DocHeader text="VII. PLAN DE GESTION DES RISQUES" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Matrice de gestion des risques" heading="h4" />
                </View>

                <DocHeader text="VIII. Estimation des coûts" heading="h4" />
                <View style={tw("ml-4")}>
                    <DocHeader text="A. Budget du projet" heading="h4" />
                </View>


                <Text break />
                <DocHeader text="I. INTRODUCTION" subline />

                <DocHeader text="A. Bref aperçu du projet" heading="h4" />
                <DocText text={project.overview} />

                <DocHeader text="B. Contexte et Justification" heading="h4" />
                <DocText text={project.context} />
                <DocText text={project.justification} />

                <DocHeader text="C. Description du projet : Objectifs et portée" heading="h4" />
                <DocText text={project.description} />
                {
                    project.objectives && project.objectives.map((objectif, index) => (
                        <View key={index}>
                            <DocText key={index} text={'- ' + objectif} />
                        </View>
                    ))
                }

            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="II. RÉSULTATS ATTENDUS" subline />

                <DocHeader text="A. Cadre Logique" heading="h4" />
                <Table
                    zebra
                    data={project.logical_context.outcomes}
                >
                    <TableHeader textAlign="center">
                        <TableCell>
                            ACTIVITES
                        </TableCell>
                        <TableCell>
                            EXTRANTS
                        </TableCell>
                        <TableCell>
                            RESULTATS IMMEDIATS
                        </TableCell>
                        <TableCell>
                            RESULTATS INTERMEDIAIRES
                        </TableCell>
                        <TableCell>
                            IMPACT
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell textAlign="center" getContent={(outcome) => (
                            outcome.activities.map((activity: { title: string; }, indexActivity: number) => (
                                    <DocText key={indexActivity} text={`${indexActivity}.0 ${activity.title}`} />
                            ))
                        )} />
                        <DataTableCell textAlign="center" getContent={(outcome) => (
                            outcome.activities.map((activity: { effects: string[]; }, indexActivity: number) => (
                                activity.effects.map((effect: string, indexEffect: number) => (
                                    <DocText key={indexEffect} text={`${indexActivity}.${indexEffect} ${effect}`} />
                                ))
                            ))
                        )} />
                        <DataTableCell textAlign="center" getContent={(outcome) => (
                            outcome.immediate_outcomes.map((outcome: string, indexOutcome: number) => (
                                <DocText key={indexOutcome} text={`- ${outcome}`} />
                            ))
                        )} />
                        <DataTableCell textAlign="center" getContent={(outcome) => (
                            outcome.intermediate_outcomes.map((outcome: string, indexOutcome: number) => (
                                <DocText key={indexOutcome} text={`- ${outcome}`} />
                            ))
                        )} />
                        <DataTableCell textAlign="center" getContent={(outcome) => (
                            outcome.impacts.map((impact: string, indexImpact: number) => (
                                <DocText key={indexImpact} text={`- ${impact}`} />
                            ))
                        )} />
                    </TableBody>
                </Table>

            </DocPage>

            <DocPage orientation="portrait">
                <DocHeader text="B. Structure de découpage du projet (WBS)" heading="h4" />
                {
                    project.outcomes && project.outcomes.map((outcome, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${outcome.title}`} heading="h4" />
                            {
                                outcome.activities.map((activity, index) => (
                                    <DocText key={index} text={'- ' + activity} />
                                ))
                            }
                        </View>
                    ))
                }

                <DocHeader text="C. Axes stratégiques du projet" heading="h4" />


                <Text break />
                <DocHeader text="III. STRATEGIE DE COORDINATION DES PARTENAIRES" subline />

                <DocHeader text="A. Description des partenaires et de leur rôle" heading="h4" />
                {
                    project.partners && project.partners.map((partner, index) => (
                        <View key={index} style={tw("border")}>
                            <View style={tw("p-2 bg-red-300 border-b")}>
                                <DocText text={partner.name} />
                            </View>
                            <View style={tw("p-2")}>
                                {
                                    partner.abilities && partner.abilities.map((ability, index) => (
                                        <DocText key={index} text={'- ' + ability} />
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
                {
                    project.partners && project.partners.map((partner, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${partner.name}`} heading="h4" />
                            {
                                partner.abilities && partner.abilities.map((ability, index) => (
                                    <DocText key={index} text={' ' + ability} />
                                ))
                            }
                        </View>
                    ))
                }


                <DocHeader text="B. Plan de communication avec les partenaires" heading="h4" />

                <Text break />
                <DocHeader text="IV. PASSATION DES MARCHÉS ET TRAVAUX PHYSIQUES" subline />

                <DocHeader text="A. Plan de gestion des acquisitions" heading="h4" />
                {
                    project.budget_plan && project.budget_plan.map((section, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${section.section}`} heading="h4" />
                            {
                                section.activities.map((activity, index) => (
                                    <DocText key={index} text={activity.title} />
                                ))
                            }
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="V. CADRE DE MESURE DES PERFORMANCES" subline />

                <DocHeader text="A. Mécanismes de contrôle qualité" heading="h4" />
                {
                    project.quality_monitoring && project.quality_monitoring.map((monitoring, index) => (
                        <DocText key={index} text={monitoring} />
                    ))
                }

            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="B. Matrice de performance du projet" heading="h4" />

                <Table
                    data={project.performance_matrix || []}
                >
                    <TableHeader textAlign="center">
                        <TableCell>
                            RESULTATS ATTENDUS
                        </TableCell>
                        <TableCell>
                            INDICATEURS
                        </TableCell>
                        <TableCell>
                            DE BASE
                        </TableCell>
                        <TableCell>
                            CIBLE
                        </TableCell>
                        <TableCell>
                            SOURCE DE DONNES
                        </TableCell>
                        <TableCell>
                            METHODE DE COLLECTE
                        </TableCell>
                        <TableCell>
                            FREQUENCE
                        </TableCell>
                        <TableCell>
                            RESPONSABLE
                        </TableCell>
                    </TableHeader>
                    <TableBody textAlign="center">
                        <DataTableCell getContent={(matrix) => matrix.effect} />
                        <DataTableCell getContent={(matrix) => matrix.effect} />
                        <DataTableCell getContent={(matrix) => matrix.effect} />
                        <DataTableCell getContent={(matrix) => matrix.effect} />
                        <DataTableCell getContent={(matrix) => (
                            matrix.verification_sources.map((source: string, indexSource: number) => (
                                <DocText key={indexSource} text={`- ${source}`} />
                            ))
                        )} />
                        <DataTableCell getContent={(matrix) => (
                            matrix.collect_tools.map((tool: string, indexTool: number) => (
                                <DocText key={indexTool} text={`- ${tool}`} />
                            ))
                        )} />
                        <DataTableCell getContent={(matrix) => matrix.frequency} />
                        <DataTableCell getContent={(matrix) => matrix.analyse} />
                    </TableBody>
                </Table>

            </DocPage>

            <DocPage orientation="portrait">
                <DocHeader text="VI. PLAN DE TRAVAIL ANNUEL" subline />

                <DocHeader text="A. Calendrier pluriannuel d’exécution/ Diagramme de GANTT" heading="h4" />
                {
                    project.calendar && project.calendar.map((calendar, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${calendar.outcome}`} heading="h4" />
                            {
                                calendar.activities.map((activity, index) => (
                                    <DocText key={index} text={activity.title} />
                                ))
                            }
                        </View>
                    ))
                }

                <Text break />
                <DocHeader text="VII. PLAN DE GESTION DES RISQUES" />

                <DocHeader text="A. Matrice de gestion des risques" heading="h4" />
                {
                    project.intervention_strategies && project.intervention_strategies.map((strategy, index) => (
                        <DocText key={index} text={strategy} />
                    ))
                }

            </DocPage>

            <DocPage orientation="landscape">
                <DocHeader text="VIII. Estimation des coûts" heading="h4" />

                <DocHeader text="A. Budget du projet" heading="h4" />
                <Text style={tw("border text-center")}>RUBRIQUE</Text>
                <Table
                    data={project.budget_plan || []}
                >
                    <TableHeader textAlign="center">
                        <TableCell textAlign="center">
                            RUBRIQUES
                        </TableCell>
                        <TableCell>
                            ANNEE
                        </TableCell>
                        <TableCell>
                            MONTANT
                        </TableCell>
                        <TableCell>
                            COMMENTAIRE
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => 'WERTZUIO COKOJEWDI'} />
                    </TableBody>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.section} />
                        <DataTableCell getContent={(r) => r.section} />
                        <DataTableCell getContent={(r) => r.section} />
                        <DataTableCell getContent={(r) => r.section} />
                    </TableBody>
                </Table>

                {
                    project.budget_plan && project.budget_plan.map((section, index) => (
                        <View key={index}>
                            <DocHeader text={`${index + 1}. ${section.section}`} heading="h4" />
                            {
                                section.activities.map((activity, index) => (
                                    <DocText key={index} text={activity.title} />
                                ))
                            }
                        </View>
                    ))
                }

            </DocPage> */}
        </Document>
    </PDFViewer >
);
